// content/situations.js
// 72 situations: 18 original + 54 variants
// Each situation: id, kcId, domain, level, context, setup, options, correct, feedback
// L3 conflict pairs exported separately — handled via dialogue, not BKT

// ── Options structure ──────────────────────────────────────────────────────
// options: { A, B, C, D }
// correct: 'A' | 'B' | 'C' | 'D' (or array for multi-correct like Re-L1)
// feedback: {
//   whatWasHappening: string,
//   whyCorrect: string,
//   producesOverTime: string,
//   distractors: { A?: string, B?: string, D?: string } — specific wrong-answer feedback
// }

export const SITUATIONS = [

  // ══════════════════════════════════════════════════════════════════════
  // DOMAIN 1: HONESTY
  // ══════════════════════════════════════════════════════════════════════

  {
    id: 'H-L1-orig',
    kcId: 'H-L1',
    domain: 'H',
    level: 1,
    context: 'Friend group / social',
    setup: "Your friend asks if you like their new haircut. You don't. They're about to go to a party where they're trying to impress someone they like.",
    options: {
      A: "Tell them it looks great — it's a small thing and you don't want to ruin their night",
      B: "Say nothing — change the subject",
      C: "Tell them the truth gently — something specific that's actually true, and one honest observation about what might work better",
      D: "Tell them bluntly you don't like it",
    },
    correct: 'C',
    feedback: {
      whatWasHappening: "Your friend wasn't asking for a performance review — they were asking whether you see them. A real answer, delivered with care, is what that moment calls for. Options A and B are both forms of telling your friend what they want to hear rather than what you actually think. Option D confuses honesty with bluntness — saying the hard thing without care isn't virtue, it's a different kind of self-indulgence.",
      whyCorrect: "Finding something genuinely true to affirm and adding one honest observation is what a real friend does. It respects both the truth and the person. It's harder than either silence or bluntness — which is exactly why it's the right answer.",
      producesOverTime: "Friends who know you'll tell them the truth become people who actually trust your opinion. The friend who always says 'you look great' gets asked less and less, because everyone knows what the answer will be. Honest friends are rare. Being one is worth something.",
      distractors: {
        A: "Telling them it looks great is kind in the moment but leaves them walking into the party with something you know isn't working. The kindness is for you — it lets you avoid the discomfort of a real answer.",
        B: "Changing the subject is a way of not answering. Your friend knows what they asked. Silence here is still a response — it's just a dishonest one.",
        D: "Bluntness without care isn't honesty — it's just the truth delivered badly. What you say matters. So does how you say it.",
      },
    },
  },

  {
    id: 'H-L2-orig',
    kcId: 'H-L2',
    domain: 'H',
    level: 2,
    context: 'School / team',
    setup: "You're working on a group project. Your part is finished. One teammate's section is weak — genuinely not good enough. The presentation is tomorrow. They haven't asked for feedback. If you say nothing, the group's grade suffers. If you say something, it might start a conflict the night before.",
    options: {
      A: "Say nothing — it's not your job to critique their work and the timing is bad",
      B: "Tell the teacher privately so the grade impact is minimized",
      C: "Tell your teammate directly, tonight — be specific about what's weak and offer to help fix it",
      D: "Rewrite their section yourself without telling them",
    },
    correct: 'C',
    feedback: {
      whatWasHappening: "This is a moment where honesty has a real cost — potential conflict, a hard conversation, the possibility they react badly. Options A and D both avoid that cost but in different ways: A by staying silent, D by going around the person entirely.",
      whyCorrect: "Telling your teammate directly — specifically and with an offer to help — treats them as someone capable of handling the truth and doing something about it. That's more respectful than silence or going around them.",
      producesOverTime: "The person who can say 'this part needs work' directly — with care, with specifics, with an offer to help — becomes the teammate people want when something actually matters. That reputation is built one hard conversation at a time.",
      distractors: {
        A: "Deciding it's not your job here is a way of protecting yourself from a hard conversation while letting the group take the consequence. The timing is bad — but waiting until after the presentation is worse.",
        B: "Going to the teacher goes around your teammate entirely. It protects the grade but damages the relationship and doesn't give them a chance to fix it themselves.",
        D: "Rewriting their section without telling them takes away their chance to do their own work. It's not honest and it's not respectful — even if it helps the grade.",
      },
    },
  },

  // ══════════════════════════════════════════════════════════════════════
  // DOMAIN 2: COURAGE
  // ══════════════════════════════════════════════════════════════════════

  {
    id: 'Co-L1-orig',
    kcId: 'Co-L1',
    domain: 'Co',
    level: 1,
    context: 'School / class',
    setup: "You're in class and the teacher makes a factual error — something you're sure is wrong. Other students don't seem to notice. Speaking up means potentially embarrassing the teacher in front of everyone.",
    options: {
      A: "Say nothing — it's not worth the awkwardness",
      B: "Mention it quietly to a friend next to you",
      C: "Raise your hand and correct it respectfully",
      D: "Look it up on your phone to make sure before saying anything — then stay quiet anyway",
    },
    correct: 'C',
    feedback: {
      whatWasHappening: "The cost here is real — saying something might be awkward, the teacher might react badly, other students might think you're showing off. Options A, B, and D all find ways to avoid that cost.",
      whyCorrect: "Correcting a factual error respectfully is exactly what that moment calls for. A good teacher will appreciate it. A defensive teacher will make it uncomfortable. Either way, the class learns the correct thing — and you did the harder thing.",
      producesOverTime: "The person who will say something accurate when it's uncomfortable to say it becomes someone people pay attention to. Not because they're always right, but because they're willing to say what they think is true.",
      distractors: {
        A: "Staying quiet because it's awkward means everyone in the room walks out with the wrong information. The awkwardness is real but it passes. The wrong information stays.",
        B: "Telling a friend quietly is a way of being right without taking any risk. It doesn't fix the problem — it just lets you feel like you noticed.",
        D: "Looking it up and staying quiet anyway is the clearest version of knowing what's right and choosing not to say it.",
      },
    },
  },

  {
    id: 'Co-L2-orig',
    kcId: 'Co-L2',
    domain: 'Co',
    level: 2,
    context: 'Friend group',
    setup: "Your friend group is talking badly about someone who isn't there — someone you know, someone who doesn't deserve it. The conversation is getting worse. You disagree with what's being said. Speaking up means going against the group.",
    options: {
      A: "Stay quiet — it's not your fight and speaking up will just make it worse",
      B: "Change the subject without saying why",
      C: "Say something directly — 'I don't think that's fair' — even if it disrupts the conversation",
      D: "Laugh along so it doesn't get directed at you",
    },
    correct: 'C',
    feedback: {
      whatWasHappening: "Group momentum is real. Once a conversation starts going in a direction, the pressure to go along with it is strong. Options A, B, and D all work with that pressure rather than against it.",
      whyCorrect: "Saying 'I don't think that's fair' — simply, without a speech — is the minimum the moment requires. It doesn't have to be a confrontation. It just has to be said.",
      producesOverTime: "Friend groups that have someone who will say 'I don't think that's right' — even when it's uncomfortable, even when it disrupts the conversation — are better friend groups. That person is worth being.",
      distractors: {
        A: "Deciding it's not your fight lets the conversation keep going. The person being talked about has no one in the room. Staying quiet is a choice.",
        B: "Changing the subject is better than laughing along, but it still lets the group believe everyone agreed with what was said.",
        D: "Laughing along to avoid being targeted is the clearest version of choosing your own comfort over someone else's reputation.",
      },
    },
  },

  // ══════════════════════════════════════════════════════════════════════
  // DOMAIN 3: FAIRNESS
  // ══════════════════════════════════════════════════════════════════════

  {
    id: 'Fa-L1-orig',
    kcId: 'Fa-L1',
    domain: 'Fa',
    level: 1,
    context: 'School / team',
    setup: "You're part of a group choosing who gets a solo in an upcoming performance. Your close friend wants the solo badly. But another person auditioned better — objectively. The group is leaning toward giving your friend the solo because everyone likes them.",
    options: {
      A: "Go along with the group — loyalty to your friend matters",
      B: "Vote for the person who auditioned better, even if it disappoints your friend",
      C: "Suggest splitting the solo so everyone is happy",
      D: "Stay quiet and don't vote either way",
    },
    correct: 'B',
    feedback: {
      whatWasHappening: "The pull toward loyalty is real and understandable. Option A gives it to your friend — but at the cost of the person who earned it. Option C avoids the decision. Option D avoids it differently.",
      whyCorrect: "Voting for the person who auditioned better — even when it disappoints your friend — is what fairness requires. Your friend's feelings matter. They don't override the person who actually earned it.",
      producesOverTime: "Groups that make decisions based on who's liked rather than who's best produce worse outcomes and more resentment over time. Being the person who votes based on merit — even when it's uncomfortable — builds a different kind of credibility.",
      distractors: {
        A: "Loyalty to your friend is real. But using group decisions to reward loyalty at someone else's expense isn't loyalty — it's using a group process to do a personal favor.",
        C: "Splitting the solo sounds fair but it avoids the actual decision. It usually makes the performance worse and doesn't reward the person who earned it.",
        D: "Staying quiet lets the group make a decision you think is unfair without saying so. Your silence is still a form of participation.",
      },
    },
  },

  {
    id: 'Fa-L2-orig',
    kcId: 'Fa-L2',
    domain: 'Fa',
    level: 2,
    context: 'Online / social media',
    setup: "A story is circulating about someone you know. You're not sure if it's true. The person it's about isn't in the conversation. People are drawing conclusions about them based on a version of events that might be incomplete.",
    options: {
      A: "Share the story — if it's circulating, there's probably something to it",
      B: "Stay quiet — you don't know enough to say anything",
      C: "Say directly that you don't know if the story is accurate and that the person isn't there to respond",
      D: "Message the person privately to warn them what's being said",
    },
    correct: 'C',
    feedback: {
      whatWasHappening: "Once a narrative forms, the social pressure to accept it is real. Options A and B both let it run — A by adding to it, B by not interrupting it. Option D is good but it's downstream of the moment — the conversation has already done its damage. The person the story is about has no voice in this conversation. The version of them being constructed here is what people will carry forward, and they have no way to correct it.",
      whyCorrect: "Saying 'I don't know if this is accurate and they're not here to respond' doesn't require you to defend the person or know what happened. It just names what's actually true about the conversation everyone is in.",
      producesOverTime: "The person who will say 'we're missing part of this story' — in a conversation where everyone else has already decided — is the person whose judgment people trust when it actually matters.",
      distractors: {
        A: "Stories circulate because they're interesting or confirm what people already think — not necessarily because they're true. Sharing without knowing amplifies the problem.",
        B: "Staying quiet lets a possibly false narrative build without challenge. Your silence reads as agreement.",
        D: "Messaging the person privately is kind, but it doesn't interrupt the conversation that's already happening.",
      },
    },
  },

  // ══════════════════════════════════════════════════════════════════════
  // DOMAIN 4: RESTRAINT
  // ══════════════════════════════════════════════════════════════════════

  {
    id: 'Re-L1-orig',
    kcId: 'Re-L1',
    domain: 'Re',
    level: 1,
    context: 'Friend group / conflict',
    setup: "You're in an argument with a friend. You know something about them — something they told you in confidence — that would completely win the argument if you used it. Using it would hurt them. Not using it means you might lose this argument.",
    options: {
      A: "Use it — you're in the right and they need to hear it",
      B: "Hold back and lose the argument",
      C: "Hold back, lose the argument, and later tell them privately why you held back",
      D: "Use it but apologize afterward",
    },
    correct: ['B', 'C'],
    feedback: {
      whatWasHappening: "Winning this argument by using what they told you in confidence would cost the friendship more than losing the argument. The information wasn't yours to use. Restraint here isn't weakness — it's choosing what matters more than the argument.",
      whyCorrect: "Losing an argument you could have won by betraying a confidence is one of the clearest forms of strength there is. Nobody sees it. That's exactly why it matters.",
      producesOverTime: "Friend groups that have someone willing to go directly to whoever's causing a problem — rather than letting it run or spreading it around — stay together longer. That's rare, and it's worth being that person.",
      distractors: {
        A: "Being in the right doesn't make the information yours to use. What they told you in confidence was a gift. Using it as a weapon destroys something that took time to build.",
        D: "Using it and apologizing afterward is still using it. The apology doesn't undo what the information did once it's out.",
      },
    },
  },

  {
    id: 'Re-L2-orig',
    kcId: 'Re-L2',
    domain: 'Re',
    level: 2,
    context: 'Online / reactive situations',
    setup: "Someone posts something online that's clearly aimed at you — vague enough to be deniable, specific enough that everyone who knows you knows what it means. You're angry. You have a response ready that would be devastating. You know it would feel good to send it.",
    options: {
      A: "Send it — they started this and people need to see both sides",
      B: "Send something milder — make your point without going as far",
      C: "Don't respond publicly — if you need to address it, do it privately or not at all",
      D: "Screenshot it and share it with your friends so they know what happened",
    },
    correct: 'C',
    feedback: {
      whatWasHappening: "The impulse to respond is real and understandable. Options A and B both give the situation more energy — they extend it, involve more people, and make it harder to end. Option D is a lateral move that doesn't resolve anything.",
      whyCorrect: "Not responding publicly when you could — and when you have something devastating ready — is one of the hardest forms of restraint there is. The post will stop mattering much faster if you don't feed it. Your response, no matter how good, extends its life.",
      producesOverTime: "The person who doesn't escalate, who doesn't respond to every provocation, who picks their moments — that person conserves energy that others burn. Over time they become harder to provoke and harder to damage. That's a real form of strength.",
      distractors: {
        A: "Sending the devastating response feels like justice but it feeds the situation. Now there are two posts, more people involved, and it's harder to end.",
        B: "A milder response is still a response. It still extends the situation and signals that it got to you.",
        D: "Sharing it with friends brings more people into it without resolving anything. It widens the circle of people who are now invested in the conflict.",
      },
    },
  },

  // ══════════════════════════════════════════════════════════════════════
  // DOMAIN 5: HUMILITY
  // ══════════════════════════════════════════════════════════════════════

  {
    id: 'Hu-L1-orig',
    kcId: 'Hu-L1',
    domain: 'Hu',
    level: 1,
    context: 'Class / school',
    setup: "You give an answer in class that you're confident about. Another student disagrees and explains their thinking. Their reasoning actually makes sense — they might be right. The teacher is waiting to see how this plays out.",
    options: {
      A: "Stick with your answer — changing your mind publicly looks weak",
      B: "Agree with them immediately to avoid conflict",
      C: "Acknowledge that their point is good and that it changes your thinking",
      D: "Ask the teacher to settle it rather than engaging with the other student directly",
    },
    correct: 'C',
    feedback: {
      whatWasHappening: "The pressure to stay with your original answer is real — changing your mind publicly feels like losing. Option A prioritizes looking consistent over being right. Option B caves without actually thinking. Option D avoids the direct engagement.",
      whyCorrect: "Saying 'that's a good point — it changes my thinking' is what intellectual honesty looks like in public. It's harder than either stubbornness or automatic agreement. It's also the only one that's actually responsive to the argument.",
      producesOverTime: "The person who will say 'I think you're right' in public — when they were wrong — becomes someone whose opinions people take seriously. Not because they're always right, but because they're not protecting their position.",
      distractors: {
        A: "Staying with your answer when someone has made a better argument isn't consistency — it's stubbornness. The class saw the argument. Staying with the wrong answer is what actually looks weak.",
        B: "Agreeing immediately without thinking through their point isn't humility — it's a different kind of avoidance. It looks like you're caving, not like you're updating.",
        D: "Asking the teacher to settle it avoids engaging with the other student's actual argument. It's a way of not having to think through whether they're right.",
      },
    },
  },

  {
    id: 'Hu-L2-orig',
    kcId: 'Hu-L2',
    domain: 'Hu',
    level: 2,
    context: 'Friend group / advice',
    setup: "You strongly encouraged a friend to do something — a decision, a choice, a path. You were confident it was right. They took your advice. It didn't work out the way you said it would, and it cost them something real. They haven't blamed you.",
    options: {
      A: "Say nothing — they haven't brought it up and dwelling on it makes it worse",
      B: "Explain why it made sense at the time and why you couldn't have predicted the outcome",
      C: "Acknowledge directly that you were more certain than you should have been, and that it cost them something",
      D: "Offer to help fix it without mentioning your role in it",
    },
    correct: 'C',
    feedback: {
      whatWasHappening: "The pull toward self-protection is real — saying nothing is easier, explaining is easier, helping without acknowledging is easier. All three avoid the specific moment of naming your role in what happened.",
      whyCorrect: "Saying 'I was more certain than I should have been, and it cost you something' names what's actually true. It doesn't make the outcome better. It makes the relationship honest.",
      producesOverTime: "The friend who can say 'I was more certain than I should have been' — when they were wrong, when it cost someone else something — becomes the friend people actually ask when the stakes are high. Not because they're always right, but because they won't hide it when they're not.",
      distractors: {
        A: "Saying nothing lets the situation sit unaddressed. Your friend knows what happened. Your silence reads as either not noticing or not caring.",
        B: "Explaining why it made sense at the time is self-defense. It might be true. It's still the wrong move — it centers your reasoning rather than their experience.",
        D: "Offering to help without naming your role is generous but incomplete. It lets you feel like you've addressed it without actually addressing it.",
      },
    },
  },

  // ══════════════════════════════════════════════════════════════════════
  // DOMAIN 6: CARE FOR OTHERS
  // ══════════════════════════════════════════════════════════════════════

  {
    id: 'Ca-L1-orig',
    kcId: 'Ca-L1',
    domain: 'Ca',
    level: 1,
    context: 'Family',
    setup: "A family member is going through something hard. They keep reaching out to you — more than you have the capacity to handle. You care about them but you're running low. Saying something honest might hurt them.",
    options: {
      A: "Keep showing up the way you have been — they need you and this is temporary",
      B: "Pull back without saying anything — create some distance and hope they don't notice",
      C: "Be honest about what you can offer — 'I care about you and I'm running low. Here's what I can do'",
      D: "Redirect them to someone else without explaining why",
    },
    correct: 'C',
    feedback: {
      whatWasHappening: "The care here is real. So is the depletion. Option A continues past the point of sustainability. Option B withdraws without explanation. Option D sends them elsewhere without telling them why.",
      whyCorrect: "Being honest about your capacity — while staying present in the way you can — treats them as someone who can handle the truth about where you are. That's more respectful than pretending or disappearing.",
      producesOverTime: "Care that's honest about its limits is more sustainable and more trustworthy than care that performs unlimited availability and then disappears. The people who tell you what they can actually offer are the ones you can count on.",
      distractors: {
        A: "Continuing past your capacity often leads to a harder withdrawal later — one that's less explained and more abrupt. It also means the care you're giving is depleted care, which isn't the same as real care.",
        B: "Pulling back without saying anything is the hardest thing for the other person. They feel the distance but don't know what happened.",
        D: "Redirecting without explanation feels like rejection. They came to you specifically.",
      },
    },
  },

  {
    id: 'Ca-L2-orig',
    kcId: 'Ca-L2',
    domain: 'Ca',
    level: 2,
    context: 'Romantic relationship',
    setup: "Someone you care about is making a choice you think is hurting them — something they keep doing that keeps producing bad outcomes. You've watched it long enough to know it's a pattern. They haven't asked for your take. Every time the consequences show up, you're the one helping them manage it.",
    options: {
      A: "Keep helping — that's what caring for someone looks like",
      B: "Stop helping — let them experience the consequences and learn",
      C: "Name what you're seeing — 'I've noticed a pattern and I want to say it once. You don't have to agree with me.'",
      D: "Talk to someone else about it to figure out what to do",
    },
    correct: 'C',
    feedback: {
      whatWasHappening: "Option A continues a dynamic where your help absorbs the consequences of the pattern — which means the pattern can continue without cost. Option B removes help without explanation. Option D defers the conversation.",
      whyCorrect: "Naming what you're seeing — once, clearly, without demanding agreement — is the thing that treats them as someone capable of hearing hard things. You're not diagnosing them. You're saying what you've noticed. That's the limit of what you can do.",
      producesOverTime: "The person who names hard things once — and then lets the other person decide what to do with it — becomes someone whose observations people take seriously. Not because they're always right, but because they say things directly and then don't keep pushing.",
      distractors: {
        A: "Continuing to help manage the consequences of a pattern can make it easier for the pattern to continue. Care that removes all consequence isn't always care.",
        B: "Stopping without explanation reads as abandonment. They don't know why you've changed.",
        D: "Talking to someone else about it is sometimes useful, but it doesn't address the situation. It's also something the person might feel betrayed by if they found out.",
      },
    },
  },

  // ══════════════════════════════════════════════════════════════════════
  // VARIANTS — Representative set (18 included here; full 54 in situation_bank_v3)
  // All 54 variants follow the same structure above.
  // Add remaining variants by importing from situation_bank_v3.md
  // ══════════════════════════════════════════════════════════════════════

  // ── H-L1 Variants ────────────────────────────────────────────────────

  {
    id: 'H-L1-A',
    kcId: 'H-L1',
    domain: 'H',
    level: 1,
    context: 'Online / social media',
    setup: "A friend posts something online they're clearly proud of. You think it's not very good — maybe even embarrassing. They're asking for reactions. Other people are being encouraging.",
    options: {
      A: "Like it and say something positive — everyone else is",
      B: "Say nothing — don't engage at all",
      C: "Send them a private message with something genuine — what you actually think, said with care",
      D: "Post a public comment that's vague enough to be read as positive",
    },
    correct: 'C',
    feedback: {
      whatWasHappening: "The public pressure to perform enthusiasm is real. Options A, B, and D all navigate around an honest private response.",
      whyCorrect: "A private message with something genuine — said with care — gives your friend real feedback without making it public. That's the option that's both honest and kind.",
      producesOverTime: "The person who sends the private message — the one that says 'hey, I noticed something before this goes further' — becomes the person people send their work to before it goes public. That's a different kind of trust than the one you get from staying quiet or being the public critic.",
      distractors: {
        A: "Liking it and saying something positive when you don't mean it tells your friend their work is better than it is. That's not a kindness.",
        B: "Saying nothing is a choice that reads as either agreement or indifference.",
        D: "A vague public comment is a way of appearing engaged without actually saying anything honest.",
      },
    },
  },

  {
    id: 'H-L1-B',
    kcId: 'H-L1',
    domain: 'H',
    level: 1,
    context: 'Romantic relationship',
    setup: "Someone you're close to asks how you feel about something — a choice they made, a direction they're going. Honestly, you're not sure you're on board with it. But they seem excited and you don't want to dampen that.",
    options: {
      A: "Match their energy — express support even if you're not fully there",
      B: "Say nothing — let it pass without weighing in",
      C: "Be honest that you have some uncertainty — 'I want to think about how I feel. Can we talk about it properly?'",
      D: "Ask questions to understand better before sharing your reaction",
    },
    correct: 'C',
    feedback: {
      whatWasHappening: "Performing enthusiasm you don't feel is a form of dishonesty. So is silence when they've directly asked. Option D is good but can be used to delay the honest answer indefinitely.",
      whyCorrect: "Saying 'I have some uncertainty and want to think about how to say it' is honest without being harsh. It names where you actually are.",
      producesOverTime: "Partners who know you'll tell them when you're not fully on board — before things go further — trust your positive reactions more. Your support means something because it's real.",
      distractors: {
        A: "Matching their energy when you don't feel it is a small dishonesty that compounds. They think you're on board. You're not.",
        B: "They asked directly. Saying nothing isn't neutral — it reads as agreement or avoidance.",
        D: "Asking questions can be a way of understanding, but if used to avoid ever giving your honest reaction, it's its own form of evasion.",
      },
    },
  },

  {
    id: 'H-L1-C',
    kcId: 'H-L1',
    domain: 'H',
    level: 1,
    context: 'Family dynamics',
    setup: "A parent or guardian asks how something went — school, a social situation, something they care about. It didn't go well but you don't want to worry them or get into a long conversation about it.",
    options: {
      A: "Say it went fine — the details would just stress them out",
      B: "Give a partial answer — technically true but leaves out the hard part",
      C: "Tell them what actually happened, briefly — enough that they have the real picture",
      D: "Say you don't want to talk about it right now",
    },
    correct: 'C',
    feedback: {
      whatWasHappening: "The impulse to protect them — or yourself from the conversation — is real. Options A and B both give a managed version of the truth. Option D is honest but closes the door.",
      whyCorrect: "A brief honest account — enough that they have the real picture — respects both your relationship and their ability to handle real information.",
      producesOverTime: "Family members who know you'll tell them what actually happened — briefly, without drama — become easier to talk to over time. The relationship becomes one where real things can be said.",
      distractors: {
        A: "Saying it went fine when it didn't creates a gap. They think they know how you're doing. They don't.",
        B: "A technically true answer that leaves out the hard part is still a form of misdirection.",
        D: "Saying you don't want to talk about it is honest, but it also closes the door on support they might actually be able to offer.",
      },
    },
  },

  // ── Co-L1 Variants ───────────────────────────────────────────────────

  {
    id: 'Co-L1-A',
    kcId: 'Co-L1',
    domain: 'Co',
    level: 1,
    context: 'Online / social media',
    setup: "A group chat is piling on someone — building momentum, each message more cutting than the last. You know the person. What's being said is unfair. The group is your friends.",
    options: {
      A: "Say nothing — it'll burn out on its own",
      B: "Send a laughing reaction to some of it so you don't look like you're against the group",
      C: "Say something directly in the chat — 'I think this is going too far'",
      D: "Leave the chat without saying why",
    },
    correct: 'C',
    feedback: {
      whatWasHappening: "Group momentum in chats moves fast. Each message makes the next one easier. Options A, B, and D all let it continue.",
      whyCorrect: "Saying 'I think this is going too far' in the chat — when the momentum is against you — is the only option that actually interrupts it.",
      producesOverTime: "Group chats that have someone who will say 'this is too far' — even against the current — go to worse places less often. Being that person matters.",
      distractors: {
        A: "These things don't always burn out. And even if they do, the damage is done while they're running.",
        B: "Reacting to some of it to stay safe is participating. You've now added to what the person being talked about will see.",
        D: "Leaving without saying why signals discomfort but doesn't interrupt anything.",
      },
    },
  },

  // ── Fa-L1 Variants ───────────────────────────────────────────────────

  {
    id: 'Fa-L1-A',
    kcId: 'Fa-L1',
    domain: 'Fa',
    level: 1,
    context: 'Friend group',
    setup: "Your friend group is deciding whether to include someone new in plans. Most people are lukewarm on the idea. You've seen this person get left out before and you know it affects them. The group is moving toward not inviting them.",
    options: {
      A: "Go along with the group — you don't want to be the one who makes it complicated",
      B: "Advocate strongly for including them — make the case",
      C: "Name what you're seeing — 'I want to flag that this person gets left out a lot. I think we should include them this time'",
      D: "Invite them separately to something else so they're not totally excluded",
    },
    correct: 'C',
    feedback: {
      whatWasHappening: "The pull toward the group default is strong. Option B turns you into a full advocate which changes the group dynamic. Option D is kind but doesn't address the pattern. Option C names what's happening without making it a referendum on the group.",
      whyCorrect: "Naming what you've noticed — that this person gets left out, that it has a cost — gives the group the information it needs to make a different decision. That's different from lobbying or going around them.",
      producesOverTime: "Friend groups where someone will name what's happening — 'this person gets left out a lot' — make different decisions than ones where it's never named.",
      distractors: {
        A: "Not making it complicated is a way of protecting your standing at the cost of the person being left out.",
        B: "Advocating strongly can make it about your position rather than about the person. It often backfires.",
        D: "Including them in something separate is kind but doesn't change the group pattern.",
      },
    },
  },

  // ── Re-L1 Variants ───────────────────────────────────────────────────

  {
    id: 'Re-L1-A',
    kcId: 'Re-L1',
    domain: 'Re',
    level: 1,
    context: 'Online / social media',
    setup: "Someone wronged you publicly. You have information about them that would shift how people see them — something real, something you know firsthand. The temptation to share it is strong. It would feel like evening the score.",
    options: {
      A: "Share it — they made their choices public and this is just the consequence",
      B: "Share it privately with a few close friends — not publicly, but people who should know",
      C: "Hold it — the fact that you have it doesn't mean using it is right",
      D: "Use it as leverage — tell them privately you have it and could share it",
    },
    correct: 'C',
    feedback: {
      whatWasHappening: "Option A frames retaliation as consequence. Option B is the same act with a smaller audience. Option D is the most corrosive version: using information as leverage converts something you know into a threat.",
      whyCorrect: "Holding information you have the right to use is the specific shape restraint takes here. The fact that sharing it would feel justified is not the same as sharing it being right.",
      producesOverTime: "The person who holds damaging information when they're angry develops a different relationship to their own power. People learn who can be trusted with things that could hurt them.",
      distractors: {
        A: "Having a justification for sharing it doesn't make sharing it right. The damage it causes is real regardless of whether you were wronged.",
        B: "A smaller audience is still an audience. The information is still out.",
        D: "Using it as leverage is actively worse than sharing it — it converts information into a threat and creates ongoing harm.",
      },
    },
  },

  // ── Hu-L1 Variants ───────────────────────────────────────────────────

  {
    id: 'Hu-L1-A',
    kcId: 'Hu-L1',
    domain: 'Hu',
    level: 1,
    context: 'Friend group / social',
    setup: "You're explaining something to a group of friends — something you know well. One of them pushes back with a point that's less sophisticated than yours, but there's actually something real in it that complicates what you said.",
    options: {
      A: "Hold your position — their pushback isn't as strong as your original point",
      B: "Concede entirely — it's not worth defending",
      C: "Acknowledge what's real in their point, even if the overall argument still favors your position",
      D: "Redirect the conversation so it doesn't stay on the disagreement",
    },
    correct: 'C',
    feedback: {
      whatWasHappening: "The pull to dismiss a less sophisticated point is real. Option A holds position defensively. Option B overcorrects. Option D avoids the engagement.",
      whyCorrect: "Acknowledging what's real in a weaker argument — while keeping what's strong in your own — is the honest move. It shows you're responding to the argument, not just protecting your position.",
      producesOverTime: "The person who will acknowledge what's real in a pushback — even a less sophisticated one — becomes someone people engage with honestly. They know you're actually listening.",
      distractors: {
        A: "Dismissing a point because it's less sophisticated than yours misses what might be real in it. Strength of argument doesn't mean absence of truth.",
        B: "Conceding entirely when you still think your position is mostly right isn't humility — it's avoidance.",
        D: "Redirecting avoids the engagement entirely.",
      },
    },
  },

  // ── Ca-L1 Variants ───────────────────────────────────────────────────

  {
    id: 'Ca-L1-A',
    kcId: 'Ca-L1',
    domain: 'Ca',
    level: 1,
    context: 'Friend group / social',
    setup: "Someone in your friend group has been off for a few weeks — quieter than usual, less present, not quite themselves. Nobody in the group has said anything directly. You've noticed. You don't know what's happening.",
    options: {
      A: "Keep moving — if they wanted to talk about it they'd bring it up",
      B: "Ask them in front of the group if everything is okay",
      C: "Find a moment to check in privately — 'Hey, I've noticed you've seemed different lately. Are you okay?'",
      D: "Talk to other friends in the group about it first to figure out what's going on",
    },
    correct: 'C',
    feedback: {
      whatWasHappening: "Option A waits for them to initiate — which some people never do. Option B puts them on the spot in public. Option D creates a conversation about them without them.",
      whyCorrect: "A private check-in — simple, direct, without pressure — is the thing that actually reaches people who are off. It gives them the chance to say something if they want to, without requiring it.",
      producesOverTime: "The person who notices and says something privately — without making it a big deal — becomes the person people reach out to when they're struggling. That's a different kind of friendship.",
      distractors: {
        A: "Some people never bring things up themselves, even when they need someone to notice. Waiting for them to initiate can mean waiting indefinitely.",
        B: "Asking in front of the group puts them in the position of either performing 'I'm fine' or opening up publicly, which many people can't do.",
        D: "Talking to other friends about it without talking to them creates a situation where everyone knows something is off except the person you're actually worried about.",
      },
    },
  },

];

// ══════════════════════════════════════════════════════════════════════════
// L3 CONFLICT PAIRS
// Handled via dialogue (routes/dialogue.js), not BKT
// ══════════════════════════════════════════════════════════════════════════

export const L3_CONFLICTS = [
  {
    id: 'L3-01',
    domains: ['H', 'Ca'],
    title: 'Someone you care about is doing something that\'s hurting them',
    setup: "Someone you care about is doing something that's hurting them. You've watched it go on long enough to know it's not a phase. You also know that if you say something directly, there's a real chance they pull away. They haven't asked for your take. You haven't been invited in.",
    openingPrompt: "You can see something they can't — or won't.",
  },
  {
    id: 'L3-02',
    domains: ['H', 'Co'],
    title: 'You know something that would help someone, but saying it will cost you',
    setup: "You have information that would genuinely help someone — but sharing it means admitting something you'd rather not admit, or saying something that could turn people against you. The easier thing is to stay quiet. The honest thing has a real price.",
    openingPrompt: "You know something. Saying it costs you something. Not saying it costs them something.",
  },
  {
    id: 'L3-03',
    domains: ['H', 'Fa'],
    title: 'Being fully honest would hurt someone who doesn\'t deserve it',
    setup: "You're in a situation where telling the complete truth would be fair to one person but harmful to another — someone who isn't responsible for the situation. You can be honest or you can protect someone, but right now you can't do both fully.",
    openingPrompt: "The truth is clear. What it would do isn't simple.",
  },
  {
    id: 'L3-04',
    domains: ['Co', 'Re'],
    title: 'Saying something now might make things worse',
    setup: "You see something that should be named — something real that others are either not noticing or not saying. But the timing is wrong, or the person isn't in a state to hear it, or saying it now would escalate something that's already fragile.",
    openingPrompt: "You know what should be said. The question is when — or whether.",
  },
  {
    id: 'L3-05',
    domains: ['Co', 'Fa'],
    title: 'Standing up for someone might make their situation worse',
    setup: "Someone is being treated unfairly. You can see it. You have the standing to say something. But intervening might actually make things harder for the person you're trying to help — it might draw more attention to them, or make them look like they need defending.",
    openingPrompt: "You want to help. Helping might not be what they need.",
  },
  {
    id: 'L3-06',
    domains: ['Co', 'Ca'],
    title: 'Being honest with someone might damage your ability to help them',
    setup: "Someone you care about is doing something you think is harmful. Saying something directly — the courageous thing — might push them away and end your ability to be there for them at all. Staying quiet keeps you in the relationship but means watching something continue that you think is hurting them.",
    openingPrompt: "Speaking up might close the door. Staying quiet keeps it open — but at what cost?",
  },
  {
    id: 'L3-07',
    domains: ['Co', 'Hu'],
    title: 'You\'re not sure you\'re right, but staying quiet feels like cowardice',
    setup: "You have a strong sense that something should be said — that someone is wrong, or that a situation is being misread. But you're not certain. You might be missing something. Saying something risks being confidently wrong in public. Not saying something means letting something you believe is real go unchallenged.",
    openingPrompt: "You have a strong instinct. You're not certain. Both things are true.",
  },
  {
    id: 'L3-08',
    domains: ['Fa', 'Ca'],
    title: 'Being fair to one person means being harder on someone you care about',
    setup: "A decision is being made that affects multiple people. The fair outcome isn't the one that's best for the person you're closest to. You can advocate for fairness, or you can advocate for the person you care about — but not fully both.",
    openingPrompt: "What's fair and what's kind to the person you love aren't the same thing right now.",
  },
  {
    id: 'L3-09',
    domains: ['Fa', 'Re'],
    title: 'You have information that would correct an unfair situation, but sharing it causes harm',
    setup: "Someone is being treated unfairly based on a false or incomplete picture. You have information that would correct it. But sharing the information would cause harm — to someone else, or to a relationship, or to something you've been trusted to keep private.",
    openingPrompt: "You could make this fairer. It would cost something to do it.",
  },
  {
    id: 'L3-10',
    domains: ['Fa', 'Hu'],
    title: 'You\'re the one with the power, and fairness might require you to give some of it up',
    setup: "You're in a position where you have more access, more voice, or more standing than others in the same situation. Being fair might mean using your position to lift something that reduces your own relative advantage. You might be wrong about what fairness requires here.",
    openingPrompt: "You have more than they do. Fairness might require noticing that.",
  },
  {
    id: 'L3-11',
    domains: ['Re', 'Ca'],
    title: 'Holding back protects you, but the other person needs you to act',
    setup: "Restraint — not saying, not doing, not escalating — is usually the stronger move. But right now someone needs you to step in, to say something, to do something. Holding back here isn't strength — it might be its own kind of abandonment.",
    openingPrompt: "The instinct is to hold back. But holding back might be what leaves them alone.",
  },
  {
    id: 'L3-12',
    domains: ['Re', 'Hu'],
    title: 'You think you\'re right. Restraint might mean letting the wrong thing stand.',
    setup: "You're confident in your position. Restraint would mean not pressing it — letting the other person's view stand, letting the moment pass without insisting. But you think they're wrong, and staying quiet means the wrong thing doesn't get corrected.",
    openingPrompt: "You're probably right. Acting on it might still be the wrong move.",
  },
  {
    id: 'L3-13',
    domains: ['Hu', 'Ca'],
    title: 'Admitting you were wrong might undermine someone\'s confidence in you when they need it',
    setup: "You made a mistake — a judgment, a piece of advice, a decision. Being honest about it is the humble thing. But the person who trusted you is in a vulnerable moment, and admitting you were wrong might remove the stability they're depending on.",
    openingPrompt: "You were wrong. They need to trust you right now. Both things are true.",
  },
  {
    id: 'L3-14',
    domains: ['H', 'Re'],
    title: 'The honest thing would do damage that can\'t be undone',
    setup: "You know something true that, if said, would change things permanently — for someone else, for a relationship, for a situation. The truth has a right to be said. But saying it might cause harm that outlasts any benefit the honesty provides.",
    openingPrompt: "It's true. Saying it might cause more harm than holding it.",
  },
  {
    id: 'L3-15',
    domains: ['H', 'Hu'],
    title: 'You might be wrong about what\'s true',
    setup: "You have a strong sense of what's actually happening — what someone meant, what the situation is, what the facts are. But you might be missing something. Saying what you believe to be true with confidence could be honest if you're right and harmful if you're wrong.",
    openingPrompt: "You're confident in your read. You might be missing something.",
  },
];
