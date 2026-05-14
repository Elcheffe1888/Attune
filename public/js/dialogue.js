// ── public/js/dialogue.js — Think it through mode ─────────────────────────
// Handles the full client-side lifecycle:
//   1. Opening screen — learner describes their situation
//   2. Chat screen — back-and-forth with the thinking partner
//   3. Closure screen — session end acknowledgement

(function () {
  'use strict';

  // ── Read URL params ──────────────────────────────────────────────────────
  // story.html sets: /dialogue.html?from=story&storyId=H-1
  // Main nav sets:   /dialogue.html  (no params)
  const params     = new URLSearchParams(window.location.search);
  const fromStory  = params.get('from') === 'story';
  const storyId    = params.get('storyId') || null;
  const entryPoint = fromStory ? 'post_story' : (params.get('entry') || 'navigation');

  // ── Session state ────────────────────────────────────────────────────────
  let messages      = [];   // [{role, content}] — full history sent to server each turn
  let sessionId     = null; // assigned by server on first turn
  let exchangeCount = 0;    // increments on each assistant reply

  // ── DOM refs ─────────────────────────────────────────────────────────────
  const stateStart   = document.getElementById('state-start');
  const stateChat    = document.getElementById('state-chat');
  const stateClosure = document.getElementById('state-closure');

  const startInput     = document.getElementById('start-input');
  const startSend      = document.getElementById('start-send');
  const startCharLeft  = document.getElementById('start-char-left');

  const chatThread  = document.getElementById('chat-thread');
  const chatInput   = document.getElementById('chat-input');
  const chatSend    = document.getElementById('chat-send');
  const chatCharLeft = document.getElementById('chat-char-left');
  const endBtn      = document.getElementById('end-session-btn');

  // ── Utility: show one state, hide others ─────────────────────────────────
  function showState(state) {
    [stateStart, stateChat, stateClosure].forEach(el => {
      if (el) el.classList.add('hidden');
    });
    const targets = { start: stateStart, chat: stateChat, closure: stateClosure };
    if (targets[state]) targets[state].classList.remove('hidden');
  }

  // ── Utility: character counter ────────────────────────────────────────────
  function wireCharCount(input, counter, limit) {
    if (!input || !counter) return;
    input.addEventListener('input', () => {
      const left = limit - input.value.length;
      counter.textContent = left;
      counter.classList.toggle('warn', left < 80);
    });
  }

  wireCharCount(startInput, startCharLeft, 1000);
  wireCharCount(chatInput,  chatCharLeft,  500);

  // ── Render a message bubble ───────────────────────────────────────────────
  function appendMessage(role, text) {
    const div = document.createElement('div');
    div.className = `chat-bubble chat-bubble--${role}`;
    div.textContent = text;
    chatThread.appendChild(div);
    chatThread.scrollTop = chatThread.scrollHeight;
  }

  // ── Typing indicator ──────────────────────────────────────────────────────
  function showTyping() {
    const el = document.createElement('div');
    el.id = 'typing-indicator';
    el.className = 'chat-bubble chat-bubble--assistant chat-typing';
    el.innerHTML = '<span></span><span></span><span></span>';
    chatThread.appendChild(el);
    chatThread.scrollTop = chatThread.scrollHeight;
  }

  function hideTyping() {
    document.getElementById('typing-indicator')?.remove();
  }

  // ── Enable / disable input controls ──────────────────────────────────────
  function setInputEnabled(enabled) {
    if (chatInput) chatInput.disabled = !enabled;
    if (chatSend)  chatSend.disabled  = !enabled;
    if (enabled && chatInput) chatInput.focus();
  }

  // ── Core: send a turn ─────────────────────────────────────────────────────
  async function sendMessage(userText) {
    userText = userText.trim();
    if (!userText) return;

    // Add to history and render immediately
    messages.push({ role: 'user', content: userText });
    appendMessage('user', userText);
    setInputEnabled(false);
    showTyping();

    try {
      const res = await fetch('/api/dialogue/think', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages,
          sessionId,
          entryPoint,
          storyId,       // server only uses this to build the prompt; safe to send always
        }),
      });

      if (res.status === 401) { window.location.href = '/'; return; }
      if (!res.ok) throw new Error(`Server error ${res.status}`);

      const data = await res.json();

      // Capture session ID on first turn
      if (!sessionId && data.sessionId) sessionId = data.sessionId;

      hideTyping();
      messages.push({ role: 'assistant', content: data.reply });
      appendMessage('assistant', data.reply);
      exchangeCount++;

      // Trim history client-side — keep most recent 20 turns (spec requirement)
      if (messages.length > 20) {
        messages = messages.slice(messages.length - 20);
      }

      // Reveal the "Done thinking" button after 4 exchanges
      if (endBtn && exchangeCount >= 4) {
        endBtn.classList.remove('hidden');
      }

    } catch (err) {
      hideTyping();
      appendMessage('assistant', 'Something went wrong. Try again in a moment.');
      console.error('Dialogue send error:', err);
    } finally {
      setInputEnabled(true);
    }
  }

  // ── Start: submit opening situation ──────────────────────────────────────
  function handleStart() {
    const text = startInput?.value?.trim();
    if (!text) return;
    showState('chat');
    sendMessage(text);
  }

  if (startSend) startSend.addEventListener('click', handleStart);
  if (startInput) {
    startInput.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleStart(); }
    });
  }

  // ── Chat: send subsequent turns ───────────────────────────────────────────
  function handleChatSend() {
    const text = chatInput?.value?.trim();
    if (!text) return;
    chatInput.value = '';
    if (chatCharLeft) chatCharLeft.textContent = 500;
    sendMessage(text);
  }

  if (chatSend) chatSend.addEventListener('click', handleChatSend);
  if (chatInput) {
    chatInput.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleChatSend(); }
    });
  }

  // ── End session ───────────────────────────────────────────────────────────
  // Called by the "Done thinking" button (onclick="endSession()")
  // Also exposed as window.endSession so the HTML button can call it directly.
  async function endSession() {
    if (sessionId) {
      try {
        await fetch('/api/dialogue/think/end', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });
      } catch (_) { /* non-critical — session tracking, not data loss */ }
    }
    showState('closure');
  }

  window.endSession = endSession;

  // ── Init ──────────────────────────────────────────────────────────────────
  showState('start');

})();
