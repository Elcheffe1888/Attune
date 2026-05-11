// content/situations.js
// 72 situations: 18 original + 54 variants across 12 KCs
// L3 conflict pairs exported separately — handled via dialogue, not BKT

export const SITUATIONS = [

  // ════════════════════════════════════════════════════════════════════════
  // DOMAIN: HONESTY — L1 Recognition (4 situations)
  // ════════════════════════════════════════════════════════════════════════

  {
    id: 'H-L1-orig',
    kcId: 'H-L1', domain: 'H', level: 1,
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
    id: 'H-L1-A',
    kcId: 'H-L1', domain: 'H', level: 1,
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
    kcId: 'H-L1', domain: 'H', level: 1,
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
    kcId: 'H-L1', domain: 'H', level: 1,
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

  // ── HONESTY L2 Application (4 situations) ────────────────────────────────

  {
    id: 'H-L2-orig',
    kcId: 'H-L2', domain: 'H', level: 2,
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

  {
    id: 'H-L2-A',
    kcId: 'H-L2', domain: 'H', level: 2,
    context: 'Friend group',
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

  {
    id: 'H-L2-B',
    kcId: 'H-L2', domain: 'H', level: 2,
    context: 'Family dynamics',
    setup: "You've been telling your family you're fine with a situation — that a decision they made for the family doesn't bother you. It does bother you. They've been making further decisions based on the assumption that you're okay with it.",
    options: {
      A: "Keep going — naming it now creates a problem that didn't exist before",
      B: "Find a way to show you're bothered without saying it directly — maybe they'll notice",
      C: "Tell them honestly that you're not actually fine with it, even though you've said you are",
      D: "Wait until the situation naturally ends and bring it up as a lesson learned",
    },
    correct: 'C',
    feedback: {
      whatWasHappening: "Option A lets a false premise compound — every further decision they make is built on something untrue. Option B uses behavior to communicate something you could say directly. Option D defers the honesty until it can't change anything.",
      whyCorrect: "Telling them you're not actually fine corrects the record while there's still something to do about it. Yes, it creates a conversation that didn't exist before — but the conversation needs to happen.",
      producesOverTime: "Family relationships where people can say 'actually I wasn't okay with that' — even when they said otherwise — develop better than ones where everyone manages each other's feelings by saying what's easiest.",
      distractors: {
        A: "The problem already exists. You naming it doesn't create it — it just makes it visible.",
        B: "Hoping they'll notice is not a strategy. It usually doesn't work and it builds resentment.",
        D: "Waiting until it can't change anything converts the honesty into a complaint rather than something useful.",
      },
    },
  },

  {
    id: 'H-L2-C',
    kcId: 'H-L2', domain: 'H', level: 2,
    context: 'School / team',
    setup: "You're on a team and someone is taking credit for work that was genuinely collaborative — positioning their contribution as larger than it was in front of people whose opinion matters. You were part of the project.",
    options: {
      A: "Say nothing — picking this fight publicly makes you look bad too",
      B: "Correct the record privately with the person afterward",
      C: "Name your contribution clearly in the moment — not to attack them, but to give an accurate account",
      D: "Go to the person in charge separately to make sure they know the full picture",
    },
    correct: 'C',
    feedback: {
      whatWasHappening: "Option A absorbs an inaccuracy to avoid discomfort. Option B corrects it privately but after the false picture has already been established. Option D goes around the person rather than speaking directly.",
      whyCorrect: "Naming your contribution in the moment — clearly, without drama — is the honest move. You're not attacking them. You're giving an accurate account of what happened.",
      producesOverTime: "The person on a team who can raise something directly — before it becomes a bigger problem — becomes the person people want on difficult projects.",
      distractors: {
        A: "Staying quiet to avoid looking bad still leaves the inaccurate picture standing. The cost of silence is the false record.",
        B: "Private correction after the fact doesn't change what the audience in the room now believes.",
        D: "Going to someone in charge separately puts you in the position of complaining about a colleague rather than speaking directly.",
      },
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  // DOMAIN: COURAGE — L1 Recognition (4 situations)
  // ════════════════════════════════════════════════════════════════════════

  {
    id: 'Co-L1-orig',
    kcId: 'Co-L1', domain: 'Co', level: 1,
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
      whyCorrect: "Correcting a factual error respectfully is exactly what that moment calls for. A good teacher will appreciate it. A defensive teacher will make it uncomfortable. Either way, the class learns the correct thing.",
      producesOverTime: "The person who will say something accurate when it's uncomfortable to say it becomes someone people pay attention to. Not because they're always right, but because they're willing to say what they think is true.",
      distractors: {
        A: "Staying quiet because it's awkward means everyone in the room walks out with the wrong information. The awkwardness is real but it passes. The wrong information stays.",
        B: "Telling a friend quietly is a way of being right without taking any risk. It doesn't fix the problem.",
        D: "Looking it up and staying quiet anyway is the clearest version of knowing what's right and choosing not to say it.",
      },
    },
  },

  {
    id: 'Co-L1-A',
    kcId: 'Co-L1', domain: 'Co', level: 1,
    context: 'Online / social media',
    setup: "A group chat starts piling on someone who isn't in it — sharing screenshots, adding jokes. The person hasn't done anything that justifies this. The chat is moving fast. You have the ability to say something. You know that saying something will make you the target of at least a few minutes of the same energy.",
    options: {
      A: "Stay quiet — one person saying something won't change anything",
      B: "Leave the chat without saying anything",
      C: "Send a laughing reaction so you don't stick out, then feel bad about it later",
      D: "Say something that interrupts the pile — it doesn't have to be a speech, just enough to break the momentum",
    },
    correct: 'D',
    feedback: {
      whatWasHappening: "Option A underestimates what one person can do. Option B removes you but leaves the situation running. Option C is comfort-seeking — you participate just enough to stay invisible, then absorb the cost privately.",
      whyCorrect: "One sentence — 'this is getting out of hand' — is sufficient to interrupt the momentum. The courage is the specific courage of being the first person to say a thing everyone else has decided not to say.",
      producesOverTime: "The person in a group chat who occasionally says 'okay, that's enough' becomes someone people recalibrate around.",
      distractors: {
        A: "One person saying something changes what's possible. The pile often stops when one person steps out of it.",
        B: "Leaving removes you from the situation but doesn't interrupt anything for the person being piled on.",
        C: "Participating to stay invisible is still participating. You've now added to what the person will see.",
      },
    },
  },

  {
    id: 'Co-L1-B',
    kcId: 'Co-L1', domain: 'Co', level: 1,
    context: 'School / team',
    setup: "You're in class. A teacher asks a question and a classmate gives a clearly wrong answer — and the class laughs. The teacher doesn't correct it and moves on. You know the right answer.",
    options: {
      A: "Stay quiet — your classmate is already embarrassed and you don't want to make it worse",
      B: "Raise your hand and give the right answer",
      C: "Tell your classmate quietly after class",
      D: "Wait for the teacher to circle back to it — it's their job to correct it",
    },
    correct: 'B',
    feedback: {
      whatWasHappening: "The wrong information is now in the room and the teacher has moved on. Option A prioritizes your classmate's embarrassment over the class learning the right thing. Option C tells one person after the fact. Option D defers to the teacher who already didn't correct it.",
      whyCorrect: "Raising your hand gives the class the right answer. It's not an attack on your classmate — it's just what the learning environment requires. Done matter-of-factly, it redirects without piling on.",
      producesOverTime: "Classrooms where people will say the correct thing — even after an uncomfortable moment — learn better than ones where everyone protects the silence.",
      distractors: {
        A: "Your classmate's embarrassment is real but it doesn't change what the right answer is. Everyone in the room has now heard the wrong one.",
        C: "Telling them after class is kind but it doesn't correct the false information the rest of the class is now carrying.",
        D: "The teacher had the chance to correct it and didn't. Waiting for them to come back to it is waiting for something that probably won't happen.",
      },
    },
  },

  {
    id: 'Co-L1-C',
    kcId: 'Co-L1', domain: 'Co', level: 1,
    context: 'Family dynamics',
    setup: "A family member says something at the dinner table that you know is factually wrong — something about a group of people. Nobody else pushes back. They seem confident. Saying something will create tension.",
    options: {
      A: "Stay quiet — it's not worth the argument",
      B: "Change the subject to move past it",
      C: "Say something directly but calmly — 'Actually, I think that's not quite right'",
      D: "Bring it up with them privately afterward",
    },
    correct: 'C',
    feedback: {
      whatWasHappening: "Option A and B let a false statement go unchallenged at the table. Option D defers the correction until after the moment when it could actually matter.",
      whyCorrect: "Saying something directly — calmly, without making it a bigger moment than it needs to be — is what that situation calls for. The courage is the willingness to create a little tension rather than let something inaccurate stand.",
      producesOverTime: "Family conversations where people will calmly correct things that are wrong — without it becoming a fight — develop differently than ones where everyone avoids friction by staying quiet.",
      distractors: {
        A: "Staying quiet lets the false statement go unchallenged. Other people at the table heard it too.",
        B: "Changing the subject doesn't address the inaccuracy — it just moves everyone away from it.",
        D: "Bringing it up privately after is better than nothing, but it doesn't correct the false impression in front of everyone who was at the table.",
      },
    },
  },

  // ── COURAGE L2 Application (4 situations) ────────────────────────────────

  {
    id: 'Co-L2-orig',
    kcId: 'Co-L2', domain: 'Co', level: 2,
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

  {
    id: 'Co-L2-A',
    kcId: 'Co-L2', domain: 'Co', level: 2,
    context: 'Online / social media',
    setup: "A post is circulating in your circles that you think is wrong — not just wrong but unfair to a real person. Most people in your feed are agreeing with it. Saying something publicly means going against a clear consensus and probably getting pushback.",
    options: {
      A: "Stay quiet — you can't fight every battle online",
      B: "Like a counterpoint someone else has made without saying anything yourself",
      C: "Post your own response — what you actually think, clearly stated",
      D: "Message a few close friends your disagreement but don't say anything publicly",
    },
    correct: 'C',
    feedback: {
      whatWasHappening: "Option A protects you from pushback at the cost of the person being treated unfairly. Option B outsources your position to someone else's voice. Option D shares your view with people who already agree with you.",
      whyCorrect: "Posting what you actually think — clearly, directly — is the courage move. The pushback is real. Doing it anyway is the point.",
      producesOverTime: "The person who will say publicly what they think privately — even when the consensus is against them — becomes someone whose public positions mean something.",
      distractors: {
        A: "Not every battle online is worth fighting. But this one involves a real person being treated unfairly. That's different.",
        B: "Liking someone else's counterpoint is a way of showing disagreement without actually owning it.",
        D: "Messaging friends your real view while staying silent publicly means you get credit for being right without taking any risk.",
      },
    },
  },

  {
    id: 'Co-L2-B',
    kcId: 'Co-L2', domain: 'Co', level: 2,
    context: 'Romantic relationship',
    setup: "You've been in a relationship that isn't working. You know it isn't working. You keep finding reasons not to end it — timing is bad, they'd be devastated, maybe it'll get better. Every week you don't end it, you're both more invested.",
    options: {
      A: "Keep going — it might get better and ending it now feels cruel",
      B: "Create distance gradually and hope it fades on its own",
      C: "Have the direct conversation now — it's not working and they deserve to know",
      D: "Wait for a natural break point — a trip, a school change, something external",
    },
    correct: 'C',
    feedback: {
      whatWasHappening: "Option A uses hope to avoid a hard conversation. Option B withdraws without honesty — they feel it but don't know what's happening. Option D delays the inevitable and usually makes it worse.",
      whyCorrect: "Having the conversation directly is the hardest option and the right one. The other person deserves clarity over continued uncertainty.",
      producesOverTime: "Ending something cleanly — even when it's hard — builds a different kind of integrity than letting things fade or waiting for a better time that doesn't come.",
      distractors: {
        A: "Hope is not a plan. If you know it isn't working, waiting for it to get better usually just means more cost when it eventually ends.",
        B: "Creating distance without saying anything is a form of dishonesty. They experience the change without understanding why.",
        D: "External break points rarely make these conversations easier. They usually just delay the same conversation.",
      },
    },
  },

  {
    id: 'Co-L2-C',
    kcId: 'Co-L2', domain: 'Co', level: 2,
    context: 'School / team',
    setup: "You saw something at school that was genuinely wrong — a student being mistreated. You're not the target. Speaking to someone in authority means becoming visible as the person who reported it, which could have social consequences.",
    options: {
      A: "Stay out of it — it's not your situation and getting involved makes things complicated",
      B: "Tell a friend you trust but don't report it officially",
      C: "Report it to someone who can actually do something — and accept the social cost if there is one",
      D: "Wait and see if it happens again before deciding",
    },
    correct: 'C',
    feedback: {
      whatWasHappening: "Option A uses 'not my situation' to avoid a real cost. Option B shares the information without acting on it. Option D waits for further harm before deciding to do anything.",
      whyCorrect: "Reporting something wrong to the person who can address it — and accepting whatever social cost comes — is exactly what courage looks like in an institutional context.",
      producesOverTime: "Schools where students will report things that are wrong — even when it costs them something — are different from ones where everyone protects themselves by staying quiet.",
      distractors: {
        A: "It became your situation when you saw it. Deciding it's not yours is a decision to let it continue.",
        B: "Telling a trusted friend moves the knowledge but doesn't address the situation.",
        D: "Waiting for it to happen again means another instance of harm before you decide to act.",
      },
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  // DOMAIN: FAIRNESS — L1 Recognition (4 situations)
  // ════════════════════════════════════════════════════════════════════════

  {
    id: 'Fa-L1-orig',
    kcId: 'Fa-L1', domain: 'Fa', level: 1,
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
    id: 'Fa-L1-A',
    kcId: 'Fa-L1', domain: 'Fa', level: 1,
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
      whatWasHappening: "The pull toward the group default is strong. Option B turns you into a full advocate which changes the group dynamic. Option D is kind but doesn't address the pattern.",
      whyCorrect: "Naming what you've noticed — that this person gets left out, that it has a cost — gives the group the information it needs to make a different decision. That's different from lobbying or going around them.",
      producesOverTime: "Friend groups where someone will name what's happening — 'this person gets left out a lot' — make different decisions than ones where it's never named.",
      distractors: {
        A: "Not making it complicated is a way of protecting your standing at the cost of the person being left out.",
        B: "Advocating strongly can make it about your position rather than about the person. It often backfires.",
        D: "Including them in something separate is kind but doesn't change the group pattern.",
      },
    },
  },

  {
    id: 'Fa-L1-B',
    kcId: 'Fa-L1', domain: 'Fa', level: 1,
    context: 'Online / social media',
    setup: "A story is going around about someone you know. You're not sure if it's entirely accurate. The person it's about isn't in the conversation and can't respond. People are treating it as confirmed.",
    options: {
      A: "Share it — if it's circulating this widely there's probably something to it",
      B: "Stay quiet — you don't know enough to say anything",
      C: "Say that you don't know if the story is accurate and the person isn't there to respond",
      D: "Message the person privately to give them a heads up",
    },
    correct: 'C',
    feedback: {
      whatWasHappening: "Option A treats circulation as confirmation. Option B stays quiet and lets it run. Option D is kind but doesn't interrupt the conversation that's already happening.",
      whyCorrect: "Saying 'I don't know if this is accurate and they're not here to respond' doesn't require you to defend the person. It just names what's true about the conversation everyone is in.",
      producesOverTime: "The person who says 'we're missing part of this story' — in a conversation where everyone has already decided — is the person whose judgment people trust when it actually matters.",
      distractors: {
        A: "Stories circulate because they're interesting or confirm what people already think, not necessarily because they're true.",
        B: "Staying quiet lets a possibly false narrative build without challenge. Your silence reads as agreement.",
        D: "Telling the person privately is kind but doesn't address the public conversation.",
      },
    },
  },

  {
    id: 'Fa-L1-C',
    kcId: 'Fa-L1', domain: 'Fa', level: 1,
    context: 'Romantic relationship',
    setup: "You and your partner are making a decision together. You realize partway through that you've been framing the situation in a way that makes your preference look more reasonable than it is. Your partner is about to agree based on your framing.",
    options: {
      A: "Let it run — your preference is probably right anyway",
      B: "Add a disclaimer that maybe you're biased but don't correct the framing",
      C: "Name that your framing has been skewed and give a more accurate account",
      D: "Ask them what they actually think before going further",
    },
    correct: 'C',
    feedback: {
      whatWasHappening: "Option A uses 'probably right anyway' to justify letting a biased framing stand. Option B acknowledges the bias without correcting for it. Option D is better than A or B but avoids naming the specific distortion.",
      whyCorrect: "Naming that your framing has been skewed — and correcting it — is what fairness to the other person requires here. You're making a decision together. They deserve to make it based on accurate information.",
      producesOverTime: "Relationships where people will name their own biases — even when it costs them something — make better decisions together than ones where whoever frames the situation wins.",
      distractors: {
        A: "'Probably right anyway' is a way of deciding the outcome before the process. That's not a joint decision.",
        B: "Noting possible bias without correcting the framing leaves the distorted picture standing.",
        D: "Asking what they think is good but doesn't address the fact that you've already skewed the frame they're thinking within.",
      },
    },
  },

  // ── FAIRNESS L2 Application (4 situations) ───────────────────────────────

  {
    id: 'Fa-L2-orig',
    kcId: 'Fa-L2', domain: 'Fa', level: 2,
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
      whatWasHappening: "Once a narrative forms, the social pressure to accept it is real. Options A and B both let it run. Option D is good but it's downstream of the moment. The person the story is about has no voice in this conversation. The version of them being constructed here is what people will carry forward, and they have no way to correct it.",
      whyCorrect: "Saying 'I don't know if this is accurate and they're not here to respond' doesn't require you to defend the person or know what happened. It just names what's actually true about the conversation everyone is in.",
      producesOverTime: "The person who will say 'we're missing part of this story' — in a conversation where everyone else has already decided — is the person whose judgment people trust when it actually matters.",
      distractors: {
        A: "Stories circulate because they're interesting or confirm what people already think — not necessarily because they're true. Sharing without knowing amplifies the problem.",
        B: "Staying quiet lets a possibly false narrative build without challenge. Your silence reads as agreement.",
        D: "Messaging the person privately is kind, but it doesn't interrupt the conversation that's already happening.",
      },
    },
  },

  {
    id: 'Fa-L2-A',
    kcId: 'Fa-L2', domain: 'Fa', level: 2,
    context: 'Friend group',
    setup: "Your friend group made a group decision that affected someone who wasn't included in the conversation. The decision disadvantaged that person in a way that's now visible. They haven't complained but you can see the cost.",
    options: {
      A: "Say nothing — the decision is made and reopening it creates more problems",
      B: "Raise it with the group — name that the decision affected someone who wasn't at the table",
      C: "Fix it quietly yourself — absorb some of the cost so they're less affected",
      D: "Wait for the person to say something before addressing it",
    },
    correct: 'B',
    feedback: {
      whatWasHappening: "Option A uses 'it's decided' to avoid the discomfort of naming an unfairness after the fact. Option C tries to repair the outcome without addressing the process. Option D waits for the affected person to advocate for themselves.",
      whyCorrect: "Raising it with the group — naming that someone was affected who wasn't at the table — doesn't undo the decision but it does address the structural gap. Groups that learn to notice this become fairer over time.",
      producesOverTime: "Friend groups where someone will name 'we made this decision without the person it affected most' develop a different awareness than ones where everyone protects the comfort of the decision already made.",
      distractors: {
        A: "A decision being made doesn't mean an unfairness in how it was made can't be named. Those are different things.",
        C: "Absorbing the cost personally is kind but doesn't address the group process that produced the unfair outcome.",
        D: "Waiting for the affected person to raise it puts the burden on the person who was already disadvantaged.",
      },
    },
  },

  {
    id: 'Fa-L2-B',
    kcId: 'Fa-L2', domain: 'Fa', level: 2,
    context: 'School / team',
    setup: "You're being undermined by a teammate — they're taking small opportunities to make you look less competent in front of people whose opinion matters. You have a choice between a measured professional response or matching their energy.",
    options: {
      A: "Match their energy — if they're going to undermine you, you can undermine them",
      B: "Raise it with them directly — 'I've noticed what's been happening and I'd like to talk about it'",
      C: "Document it and take it to someone in charge",
      D: "Outperform them visibly enough that it becomes irrelevant",
    },
    correct: 'B',
    feedback: {
      whatWasHappening: "Option A converts a problem into a cycle. Option C escalates before the direct conversation has happened. Option D avoids the interpersonal problem by trying to make it irrelevant through performance.",
      whyCorrect: "Raising it directly — naming what you've noticed, without drama — gives the other person the chance to stop, explain, or acknowledge it. That's the fair process before escalation.",
      producesOverTime: "Addressing undermining behavior directly — before going around the person — is the move that respects both the relationship and the situation.",
      distractors: {
        A: "Matching their energy confirms the dynamic and makes you part of the problem.",
        C: "Going to someone in charge before the direct conversation skips a step and often makes things worse.",
        D: "Outperforming doesn't address the behavior. It may reduce the impact but it doesn't stop the pattern.",
      },
    },
  },

  {
    id: 'Fa-L2-C',
    kcId: 'Fa-L2', domain: 'Fa', level: 2,
    context: 'Family dynamics',
    setup: "You're in a conflict with a family member. In the middle of it, you realize your version of events is leaving out something that makes them look less unreasonable. You've been framing yourself as more wronged than you actually are.",
    options: {
      A: "Keep your version — the overall situation is still unfair to you even if some details are complicated",
      B: "Correct the record completely — tell them everything you've been leaving out",
      C: "Acknowledge specifically what your version has been missing — even though it costs you ground in the conflict",
      D: "Wait until the conflict is resolved and bring it up then",
    },
    correct: 'C',
    feedback: {
      whatWasHappening: "Option A uses the overall framing to absorb the specific distortion. Option B overcorrects. Option D defers honesty until after the conflict, meaning the conflict gets resolved on a distorted basis.",
      whyCorrect: "Acknowledging specifically what your version has been missing — in the middle of a conflict, when it costs you something — is the fairness move that's hardest to make.",
      producesOverTime: "Family relationships where people can say 'I've been leaving something out' — in the middle of a disagreement — become capable of things that managed relationships can't manage.",
      distractors: {
        A: "Using the overall situation to absorb the specific distortion is how small unfairnesses grow into larger ones.",
        B: "A complete inventory is less useful than naming the specific thing that changed the picture.",
        D: "Waiting until the conflict is resolved means resolving it on a distorted basis — and the correction afterward doesn't undo that.",
      },
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  // DOMAIN: RESTRAINT — L1 Recognition (4 situations)
  // ════════════════════════════════════════════════════════════════════════

  {
    id: 'Re-L1-orig',
    kcId: 'Re-L1', domain: 'Re', level: 1,
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
    id: 'Re-L1-A',
    kcId: 'Re-L1', domain: 'Re', level: 1,
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

  {
    id: 'Re-L1-B',
    kcId: 'Re-L1', domain: 'Re', level: 1,
    context: 'Friend group',
    setup: "A friend is going through a hard time. You know something about the situation that they haven't shared with the group — something that would explain their behavior and get them more sympathy. Sharing it would help them socially. But it was shared with you privately.",
    options: {
      A: "Share it — you're trying to help them and it's for a good reason",
      B: "Share it in a general way without the specific details",
      C: "Hold it — it wasn't yours to share, even with good intentions",
      D: "Ask them if it's okay to share it first",
    },
    correct: ['C', 'D'],
    feedback: {
      whatWasHappening: "Option A uses good intentions to override the fact that the information wasn't yours to share. Option B shares the general direction without the specifics — still a violation of the confidence, just a smaller one.",
      whyCorrect: "Holding private information — even when sharing it would help the person — is what respecting a confidence requires. Option D is the right path if you genuinely want to help: ask permission first.",
      producesOverTime: "Being the person who holds private information even when sharing it would feel helpful is how you become the person people actually tell things to.",
      distractors: {
        A: "Good intentions don't override the fact that the information was shared with you in confidence. The road to broken trust is paved with helpful intentions.",
        B: "Sharing in a general way is still sharing. You're giving the group a direction to look in.",
      },
    },
  },

  {
    id: 'Re-L1-C',
    kcId: 'Re-L1', domain: 'Re', level: 1,
    context: 'Family dynamics',
    setup: "A family member told you something about another family member — something they explicitly said was between the two of you. Now a family decision is being made that would be influenced by that information. You could change the outcome by sharing it.",
    options: {
      A: "Share it — the decision is too important and they deserve to know",
      B: "Tell the person who told you what you're considering before doing anything",
      C: "Hold it — you were told it in confidence and that holds even when it's inconvenient",
      D: "Find a way to steer the conversation toward the issue without sharing the specific information",
    },
    correct: ['B', 'C'],
    feedback: {
      whatWasHappening: "Option A uses the importance of the decision to justify overriding the confidence. Option D finds a workaround that uses the information without technically sharing it.",
      whyCorrect: "Holding a confidence holds even when it's inconvenient — that's exactly when it matters. Option B is the right path if you genuinely believe the information needs to be in the room: ask permission from the person who trusted you with it.",
      producesOverTime: "Families where confidences hold — even when something important is at stake — develop a different quality of trust than ones where information travels freely whenever someone decides the stakes are high enough.",
      distractors: {
        A: "The importance of the decision is exactly the justification everyone uses when they break a confidence. 'It was too important not to share' is not a principle — it's an exception that swallows the rule.",
        D: "Steering the conversation using private information without sharing it directly is still using private information. The ethical structure is the same.",
      },
    },
  },

  // ── RESTRAINT L2 Application (4 situations) ──────────────────────────────

  {
    id: 'Re-L2-orig',
    kcId: 'Re-L2', domain: 'Re', level: 2,
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
      whyCorrect: "Not responding publicly when you could — and when you have something devastating ready — is one of the hardest forms of restraint there is. The post will stop mattering much faster if you don't feed it.",
      producesOverTime: "The person who doesn't escalate, who doesn't respond to every provocation, who picks their moments — that person conserves energy that others burn. Over time they become harder to provoke and harder to damage.",
      distractors: {
        A: "Sending the devastating response feels like justice but it feeds the situation. Now there are two posts, more people involved, and it's harder to end.",
        B: "A milder response is still a response. It still extends the situation and signals that it got to you.",
        D: "Sharing it with friends brings more people into it without resolving anything.",
      },
    },
  },

  {
    id: 'Re-L2-A',
    kcId: 'Re-L2', domain: 'Re', level: 2,
    context: 'Friend group',
    setup: "A friend treated you badly in front of other people. You have screenshots and receipts — things they've said that would make their behavior look much worse to the people who were there. You could share them. The case would be airtight.",
    options: {
      A: "Share the receipts — you have evidence and people should know the full story",
      B: "Hold the receipts but let your friends know you have them",
      C: "Don't deploy the receipts — address the situation directly with the person instead",
      D: "Share them only with the people who were there",
    },
    correct: 'C',
    feedback: {
      whatWasHappening: "Options A and D use documented evidence to win a social conflict. Option B holds the weapon while making sure people know you have it — almost as corrosive as using it.",
      whyCorrect: "Having airtight evidence doesn't make deploying it the right move. Restraint here means choosing direct address over public case-building, even when you'd win.",
      producesOverTime: "The person who has receipts and doesn't use them — who goes directly to the person instead — develops a reputation for handling things with integrity that no number of wins in public conflicts can build.",
      distractors: {
        A: "Having evidence is different from having permission to use it. The 'full story' framing makes sharing feel like truth-telling when it's actually retaliation.",
        B: "Letting people know you have them is using the threat of the receipts without technically sharing them. Same structural problem.",
        D: "Sharing with only the people who were there reduces the audience but doesn't change the nature of the act.",
      },
    },
  },

  {
    id: 'Re-L2-B',
    kcId: 'Re-L2', domain: 'Re', level: 2,
    context: 'School / team',
    setup: "A classmate publicly challenged something you said in a way that was dismissive and a little condescending. You have a response that would clearly establish you were right and make them look bad for how they said it. The class is watching.",
    options: {
      A: "Deploy the response — they were condescending and the class should see you're right",
      B: "Correct the factual point without addressing how they said it",
      C: "Let it go — responding to the tone escalates it and responding to the content gives it more air than it deserves",
      D: "Address how they said it directly but leave the content alone",
    },
    correct: 'B',
    feedback: {
      whatWasHappening: "Option A responds to both the substance and the tone — using the content to establish dominance. Option C lets both go. Option D addresses the interpersonal dynamic without addressing the factual question.",
      whyCorrect: "Correcting the factual point without addressing the condescension is the clean move. It's restraint in the specific form of not matching the energy of how something was said.",
      producesOverTime: "The person who responds to substance and ignores tone — consistently — becomes someone who's hard to bait. They control what the conversation is about.",
      distractors: {
        A: "Using the content to make them look bad for their delivery conflates two separate things. You can be right about the facts and still wrong to use that to punish the tone.",
        C: "Letting the factual error stand isn't restraint — it's avoidance. The point needed correcting.",
        D: "Addressing how they said it directly usually makes you look more reactive than the original condescension did.",
      },
    },
  },

  {
    id: 'Re-L2-C',
    kcId: 'Re-L2', domain: 'Re', level: 2,
    context: 'Romantic relationship',
    setup: "Your partner said something that really hurt you. You have a response that's true, that they need to hear, and that you know would land hard. The conversation is at a point where saying it would almost certainly end the argument in your favor.",
    options: {
      A: "Say it — it's true and they need to hear it",
      B: "Say a softened version — land the point without the full impact",
      C: "Hold it — choose to say something honest about how you're feeling instead of what would land hardest",
      D: "Stay quiet — wait for a better moment when you're both calmer",
    },
    correct: 'C',
    feedback: {
      whatWasHappening: "Option A uses truth as a weapon. Option B softens the weapon. Option D delays the conversation without addressing what you actually need to say.",
      whyCorrect: "Choosing to say something honest about how you're feeling — rather than the thing that would land hardest — is restraint as a deliberate choice of vulnerability over damage.",
      producesOverTime: "Relationships where people can hold back the devastating response and say what they're actually feeling instead become capable of things that combat-oriented relationships can't reach.",
      distractors: {
        A: "'It's true' is not sufficient justification for saying something at the moment it would do the most damage. Timing is part of honesty.",
        B: "Softening the weapon is still deploying it. The intent is the same.",
        D: "Waiting for a calmer moment can be right, but in this case you have something honest to say now — saying it now is better than strategic delay.",
      },
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  // DOMAIN: HUMILITY — L1 Recognition (4 situations)
  // ════════════════════════════════════════════════════════════════════════

  {
    id: 'Hu-L1-orig',
    kcId: 'Hu-L1', domain: 'Hu', level: 1,
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
      whyCorrect: "Saying 'that's a good point — it changes my thinking' is what intellectual honesty looks like in public. It's harder than either stubbornness or automatic agreement.",
      producesOverTime: "The person who will say 'I think you're right' in public — when they were wrong — becomes someone whose opinions people take seriously. Not because they're always right, but because they're not protecting their position.",
      distractors: {
        A: "Staying with your answer when someone has made a better argument isn't consistency — it's stubbornness. The class saw the argument. Staying with the wrong answer is what actually looks weak.",
        B: "Agreeing immediately without thinking through their point isn't humility — it's a different kind of avoidance.",
        D: "Asking the teacher to settle it avoids engaging with the other student's actual argument.",
      },
    },
  },

  {
    id: 'Hu-L1-A',
    kcId: 'Hu-L1', domain: 'Hu', level: 1,
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

  {
    id: 'Hu-L1-B',
    kcId: 'Hu-L1', domain: 'Hu', level: 1,
    context: 'Online / social media',
    setup: "You posted something that got a lot of agreement. Then you find out it was based on information that wasn't quite accurate — not catastrophically wrong, but enough that your original point doesn't fully hold. Most people who engaged don't know this yet.",
    options: {
      A: "Leave the post up — the main thrust was right even if some details were off",
      B: "Delete it quietly — less embarrassing than a public correction",
      C: "Post a correction that says what you got wrong and why it matters",
      D: "Edit the post with a small amendment and hope people see it",
    },
    correct: 'C',
    feedback: {
      whatWasHappening: "Option A uses 'the main thrust was right' to avoid correcting a real inaccuracy. Option B removes the error without correcting the false impression already created. Option D adds a quiet amendment to a post that already got significant traction.",
      whyCorrect: "The audience that engaged with the original is owed the update in the same place and at the same volume as the original. A clear correction is what intellectual honesty looks like in public.",
      producesOverTime: "People share the posts of the person who updates because they know the update will come if it's needed.",
      distractors: {
        A: "'The main thrust was right' is often true. It doesn't eliminate the obligation to correct what was wrong.",
        B: "Deleting it removes the error but leaves everyone who shared it holding something they don't know is gone.",
        D: "A quiet amendment on a post with real traction isn't the same as a clear account of what changed and why.",
      },
    },
  },

  {
    id: 'Hu-L1-C',
    kcId: 'Hu-L1', domain: 'Hu', level: 1,
    context: 'Family dynamics',
    setup: "You're the older sibling, the one the family has generally deferred to on a particular kind of question. You made a judgment and the family organized around it. It turned out your judgment was wrong in a way that's now visible. The family hasn't formally named that your judgment was wrong.",
    options: {
      A: "Let it go unaddressed — the outcome speaks for itself and naming it just makes it a bigger moment than it needs to be",
      B: "Name it generally — acknowledge things went differently than expected without connecting it specifically to your judgment",
      C: "Name it specifically — you made this call, you were confident, you were wrong, and you want to say so clearly",
      D: "Wait for someone else to name it — if it comes up naturally, acknowledge it then",
    },
    correct: 'C',
    feedback: {
      whatWasHappening: "Option A uses 'the outcome speaks for itself' to avoid the accountability a named judgment requires. Option B names the situation without naming your role. Option D waits for someone else to do the work.",
      whyCorrect: "Naming it specifically — in a family context, from a position of authority, without being prompted — gives up the protection that authority usually provides. It also changes what authority means in your family.",
      producesOverTime: "Families where the person with the most authority will name their own mistakes — specifically, without prompting — develop a different relationship to that authority.",
      distractors: {
        A: "Letting the outcome speak for itself allows the family to draw their own conclusions without you owning your role in producing it.",
        B: "Naming the situation without naming your role is a way of acknowledging what happened while protecting yourself from the accountability.",
        D: "Waiting for someone else to name it puts the family in the position of either letting it go or saying something uncomfortable to someone with authority.",
      },
    },
  },

  // ── HUMILITY L2 Application (4 situations) ───────────────────────────────

  {
    id: 'Hu-L2-orig',
    kcId: 'Hu-L2', domain: 'Hu', level: 2,
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
        D: "Offering to help without naming your role is generous but incomplete.",
      },
    },
  },

  {
    id: 'Hu-L2-A',
    kcId: 'Hu-L2', domain: 'Hu', level: 2,
    context: 'School / team',
    setup: "You're working on something with a group. You made an early call that shaped the direction of the project. Partway through, it becomes clear your call was wrong and the project needs to be reworked. The group has been following your direction.",
    options: {
      A: "Find a way to adjust the direction that doesn't require naming your original call was wrong",
      B: "Name directly that the original call was yours, that it was wrong, and that the project needs to change course",
      C: "Attribute the problem to unclear information rather than to your judgment",
      D: "Let someone else notice and name it so it doesn't come from you",
    },
    correct: 'B',
    feedback: {
      whatWasHappening: "Option A changes the direction without accountability. Option C reframes a judgment error as an information problem. Option D waits for someone else to do the uncomfortable naming.",
      whyCorrect: "Naming directly that the call was yours and that it was wrong — in a group context, where others have been following your direction — is the clean move. The team can reset much faster when the person who made the call names it clearly.",
      producesOverTime: "Teams where someone will say 'that was my call and it was wrong' in the debrief — rather than letting it dissolve into vague collective reflection — make fewer of the same mistakes twice.",
      distractors: {
        A: "Adjusting direction without naming your role preserves your position at the cost of the team's ability to learn what happened.",
        C: "Attributing a judgment error to insufficient information is a reframe that protects you at the expense of accuracy.",
        D: "Waiting for someone else to name it puts the team in the position of either letting a wrong call go unaddressed or saying something uncomfortable to someone in a leadership position.",
      },
    },
  },

  {
    id: 'Hu-L2-B',
    kcId: 'Hu-L2', domain: 'Hu', level: 2,
    context: 'Romantic relationship',
    setup: "You and your partner are disagreeing about something. You're emotionally invested in your position — it touches on something about how you see yourself. Partway through the conversation, you realize they might actually be right. Acknowledging it would require admitting something that goes beyond just this argument.",
    options: {
      A: "Keep defending your position — you're not sure enough to change it and you're still upset",
      B: "Change the subject to something you agree on",
      C: "Say that their point is making you think differently, even though it's uncomfortable to say",
      D: "Ask for more time — tell them you need to think before you respond",
    },
    correct: 'C',
    feedback: {
      whatWasHappening: "Option A holds the position because you're emotionally invested, not because you've evaluated the argument. Option B changes the subject to avoid the discomfort. Option D creates space but can be used to avoid saying something that needs to be said now.",
      whyCorrect: "Saying 'this is making me think differently, even though it's uncomfortable' is the honest response. It's harder when the position touches something personal — which is exactly when the acknowledgment matters most.",
      producesOverTime: "Relationships where people can update their position in real time — even when the position touched something personal — develop a different quality of trust than ones where position-changes have to happen privately.",
      distractors: {
        A: "Being emotionally invested in a position is exactly the situation where humility is hardest and most important. Staying with a position because you're upset is not the same as having good reasons for it.",
        B: "Changing the subject avoids the moment of acknowledgment that the conversation was actually building toward.",
        D: "Asking for more time is sometimes right. When you can see you're wrong but are avoiding saying it, it's a delay.",
      },
    },
  },

  {
    id: 'Hu-L2-C',
    kcId: 'Hu-L2', domain: 'Hu', level: 2,
    context: 'Friend group',
    setup: "A friend corrects you in front of the group about something you said with confidence. They're right. You were wrong. The group is watching to see how you respond.",
    options: {
      A: "Defend your original position — conceding in public feels like losing face",
      B: "Say 'okay, maybe' — acknowledge uncertainty without fully conceding",
      C: "Acknowledge clearly that they're right, even with the group watching",
      D: "Change the subject so the moment passes without anyone having to stay in the discomfort",
    },
    correct: 'C',
    feedback: {
      whatWasHappening: "Option A holds a position that's been shown to be wrong to protect face. Option B hedges — 'maybe' is a way of not fully acknowledging while appearing to engage. Option D moves the group past the moment without resolution.",
      whyCorrect: "Saying clearly 'you're right, I was wrong' — in front of the group, when it's uncomfortable — is the only response that actually matches what's true. The social cost is real. Paying it anyway is the point.",
      producesOverTime: "The person who will say 'you're right' publicly — when they were wrong — becomes someone the group trusts. Not because they're always right, but because they're not protecting their position.",
      distractors: {
        A: "Defending a position that's been shown to be wrong to protect face converts a minor correction into a prolonged public problem.",
        B: "'Maybe' is a hedge that lets you avoid the full acknowledgment. Everyone in the group can see what 'maybe' actually means.",
        D: "Changing the subject leaves the false impression from your original statement uncorrected.",
      },
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  // DOMAIN: CARE FOR OTHERS — L1 Recognition (4 situations)
  // ════════════════════════════════════════════════════════════════════════

  {
    id: 'Ca-L1-orig',
    kcId: 'Ca-L1', domain: 'Ca', level: 1,
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
      producesOverTime: "Care that's honest about its limits is more sustainable and more trustworthy than care that performs unlimited availability and then disappears.",
      distractors: {
        A: "Continuing past your capacity often leads to a harder withdrawal later — one that's less explained and more abrupt.",
        B: "Pulling back without saying anything is the hardest thing for the other person. They feel the distance but don't know what happened.",
        D: "Redirecting without explanation feels like rejection. They came to you specifically.",
      },
    },
  },

  {
    id: 'Ca-L1-A',
    kcId: 'Ca-L1', domain: 'Ca', level: 1,
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
      whatWasHappening: "Option A waits for them to initiate. Option B puts them on the spot in public. Option D creates a conversation about them without them.",
      whyCorrect: "A private check-in — simple, direct, without pressure — is the thing that actually reaches people who are off. It gives them the chance to say something if they want to, without requiring it.",
      producesOverTime: "The person who notices and says something privately — without making it a big deal — becomes the person people reach out to when they're struggling.",
      distractors: {
        A: "Some people never bring things up themselves, even when they need someone to notice. Waiting for them to initiate can mean waiting indefinitely.",
        B: "Asking in front of the group puts them in the position of either performing 'I'm fine' or opening up publicly, which many people can't do.",
        D: "Talking to other friends about it without talking to them creates a situation where everyone knows something is off except the person you're actually worried about.",
      },
    },
  },

  {
    id: 'Ca-L1-B',
    kcId: 'Ca-L1', domain: 'Ca', level: 1,
    context: 'School / team',
    setup: "A teammate is struggling with something that's affecting the group's work. They haven't asked for help. Their contribution has been dropping and others in the group are noticing and getting frustrated.",
    options: {
      A: "Let the group frustration build — they'll address it in their own way",
      B: "Talk to them privately — check in on how they're doing before getting into the work issue",
      C: "Raise the work issue with the group without naming the teammate specifically",
      D: "Go to whoever is in charge and flag the situation",
    },
    correct: 'B',
    feedback: {
      whatWasHappening: "Option A lets frustration build without anyone addressing what might be causing the problem. Option C discusses the issue publicly without giving the person a chance to respond. Option D escalates before the direct conversation has happened.",
      whyCorrect: "Checking in privately on how someone is doing — before raising the work issue — is care that's also honest. It creates the possibility that the work problem and the personal situation can be addressed together.",
      producesOverTime: "The teammate who checks in before escalating becomes the person the team trusts to handle difficult situations with integrity.",
      distractors: {
        A: "Group frustration addressed without care for the person causing it usually makes things worse, not better.",
        C: "Raising the issue without naming the person is transparent to everyone in the room. It's a way of addressing them publicly while appearing not to.",
        D: "Escalating before the direct conversation skips the step most likely to actually resolve the situation.",
      },
    },
  },

  {
    id: 'Ca-L1-C',
    kcId: 'Ca-L1', domain: 'Ca', level: 1,
    context: 'Online / social media',
    setup: "Someone you follow posts something that suggests they're having a really hard time — not explicitly asking for help, but the subtext is clear. You've never talked to them privately. You don't know them well. You could respond publicly or say nothing.",
    options: {
      A: "Say nothing — you don't know them well enough and it's not your place",
      B: "Leave a public comment of support — at least they'll know someone noticed",
      C: "Send a brief private message — 'I saw your post. I don't know you well but I wanted to check in'",
      D: "Share the post with a 'thinking of you' comment so more people can offer support",
    },
    correct: 'C',
    feedback: {
      whatWasHappening: "Option A uses not knowing them well as a reason not to reach out. Option B offers public support without creating the possibility of an actual conversation. Option D amplifies the post publicly, which the person may not have wanted.",
      whyCorrect: "A brief private message — acknowledging you don't know them well but saw and cared — is the care move that requires the least from them and offers the most.",
      producesOverTime: "The person who sends the private message — even when they don't know the person well — becomes someone whose care feels real rather than performed.",
      distractors: {
        A: "Not knowing someone well has never been a reason not to be kind. It just changes the form the kindness takes.",
        B: "A public comment creates a record that the person may not have wanted and doesn't create space for them to respond honestly.",
        D: "Sharing the post publicly takes away the person's control over who sees them in a vulnerable moment.",
      },
    },
  },

  // ── CARE FOR OTHERS L2 Application (4 situations) ────────────────────────

  {
    id: 'Ca-L2-orig',
    kcId: 'Ca-L2', domain: 'Ca', level: 2,
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
      whyCorrect: "Naming what you're seeing — once, clearly, without demanding agreement — is the thing that treats them as someone capable of hearing hard things. You're not diagnosing them. You're saying what you've noticed.",
      producesOverTime: "The person who names hard things once — and then lets the other person decide what to do with it — becomes someone whose observations people take seriously.",
      distractors: {
        A: "Continuing to help manage the consequences of a pattern can make it easier for the pattern to continue. Care that removes all consequence isn't always care.",
        B: "Stopping without explanation reads as abandonment. They don't know why you've changed.",
        D: "Talking to someone else about it is sometimes useful, but it doesn't address the situation.",
      },
    },
  },

  {
    id: 'Ca-L2-A',
    kcId: 'Ca-L2', domain: 'Ca', level: 2,
    context: 'Friend group',
    setup: "A friend has been leaning on you heavily — more than you can sustain. You care about them and want to keep showing up, but you can feel yourself resenting the dynamic. You haven't said anything about your capacity.",
    options: {
      A: "Keep absorbing it — they need you more than you need the relief",
      B: "Pull back sharply — they'll figure out from your behavior that something has shifted",
      C: "Have a direct conversation — 'I want to keep being here for you and I need to be honest about what I can actually do'",
      D: "Redirect them to a therapist or other resource instead of having the conversation",
    },
    correct: 'C',
    feedback: {
      whatWasHappening: "Option A continues past the point where the care is genuine. Option B withdraws without honesty — they feel the change but don't understand it. Option D can be the right move eventually, but used here it avoids the direct conversation about what's changed.",
      whyCorrect: "Telling a friend honestly what you can offer — before resentment makes it harder — is the care move that protects both of you. It treats them as someone who can handle the truth.",
      producesOverTime: "Friendships where people can name their capacity honestly — before resentment builds — develop differently than ones where care collapses suddenly.",
      distractors: {
        A: "Care given past your genuine capacity often becomes care that feels withdrawn when it eventually stops. Better to name the limit before that.",
        B: "Withdrawing through behavior without explanation leaves your friend confused and hurt about something they can't address because you haven't named it.",
        D: "Redirecting to a therapist is sometimes exactly right — but not as a substitute for the direct conversation about what you can offer.",
      },
    },
  },

  {
    id: 'Ca-L2-B',
    kcId: 'Ca-L2', domain: 'Ca', level: 2,
    context: 'Romantic relationship',
    setup: "Your partner keeps making the same kind of decision that ends badly for them — and every time, they come to you for support. You've supported them through three versions of the same situation. They haven't asked for your perspective on the pattern.",
    options: {
      A: "Keep supporting them the same way — they didn't ask for your analysis",
      B: "Withdraw support until they change the behavior — the natural consequence is the only thing that will work",
      C: "Say once, directly: 'I've noticed a pattern here and I want to name it. I'll keep supporting you — and I think this is worth looking at'",
      D: "Support the immediate situation while letting them know the pattern is becoming hard for you",
    },
    correct: 'C',
    feedback: {
      whatWasHappening: "Option A provides support without ever naming what you've observed. Option B withdraws care as leverage. Option D addresses your experience without directly naming the pattern to the other person.",
      whyCorrect: "Naming the pattern once — clearly, with care, without withdrawal — is the most honest form of support. You're not diagnosing them or demanding they change. You're saying what you see.",
      producesOverTime: "The partner who says 'I've noticed this and I want to name it once' — and then keeps showing up — becomes someone whose observations carry real weight.",
      distractors: {
        A: "Supporting through a repeated pattern without ever naming it is a form of helping that can make the pattern easier to continue.",
        B: "Withdrawing support as leverage converts care into a transaction. That's a different relationship than the one you started with.",
        D: "Sharing that the pattern is becoming hard for you centers your experience rather than directly addressing the observation you have about them.",
      },
    },
  },

  {
    id: 'Ca-L2-C',
    kcId: 'Ca-L2', domain: 'Ca', level: 2,
    context: 'School / team',
    setup: "A teammate's pattern of not following through is affecting the whole group. Others are quietly absorbing the slack. You care about the team and you care about the teammate — you can see they're struggling with something. Nobody has named it directly.",
    options: {
      A: "Keep absorbing their work — confronting them might make things worse",
      B: "Raise it with the group and let the collective pressure do the work",
      C: "Talk to them directly — name what you've noticed, ask if they're okay, and say what needs to change",
      D: "Go to whoever is in charge and let them handle it",
    },
    correct: 'C',
    feedback: {
      whatWasHappening: "Option A continues absorbing the problem without addressing it. Option B uses group pressure instead of a direct conversation. Option D escalates before the direct conversation has happened.",
      whyCorrect: "Talking to them directly — naming the pattern, asking if they're okay, and saying what needs to change — is the move that holds both care and accountability simultaneously.",
      producesOverTime: "The teammate who can say 'I've noticed this, I want to understand what's happening, and here's what needs to be different' — with care and directness together — builds something that neither pure care nor pure accountability can build alone.",
      distractors: {
        A: "Absorbing the problem indefinitely doesn't help the teammate see the impact of their pattern.",
        B: "Group pressure without a direct conversation first is often experienced as an attack rather than a call to change.",
        D: "Escalating before the direct conversation often makes the teammate feel ambushed and makes the situation harder to resolve.",
      },
    },
  },

];

// ══════════════════════════════════════════════════════════════════════════
// L3 CONFLICT PAIRS — handled via dialogue, not BKT
// ══════════════════════════════════════════════════════════════════════════

export const L3_CONFLICTS = [
  { id: 'L3-01', domains: ['H', 'Ca'], title: "Someone you care about is doing something that's hurting them", setup: "Someone you care about is doing something that's hurting them. You've watched it go on long enough to know it's not a phase. You also know that if you say something directly, there's a real chance they pull away. They haven't asked for your take. You haven't been invited in.", openingPrompt: "You can see something they can't — or won't." },
  { id: 'L3-02', domains: ['H', 'Co'], title: "You know something that would help someone, but saying it will cost you", setup: "You have information that would genuinely help someone — but sharing it means admitting something you'd rather not admit, or saying something that could turn people against you. The easier thing is to stay quiet. The honest thing has a real price.", openingPrompt: "You know something. Saying it costs you something. Not saying it costs them something." },
  { id: 'L3-03', domains: ['H', 'Fa'], title: "Being fully honest would hurt someone who doesn't deserve it", setup: "You're in a situation where telling the complete truth would be fair to one person but harmful to another — someone who isn't responsible for the situation. You can be honest or you can protect someone, but right now you can't do both fully.", openingPrompt: "The truth is clear. What it would do isn't simple." },
  { id: 'L3-04', domains: ['Co', 'Re'], title: "Saying something now might make things worse", setup: "You see something that should be named — something real that others are either not noticing or not saying. But the timing is wrong, or the person isn't in a state to hear it, or saying it now would escalate something that's already fragile.", openingPrompt: "You know what should be said. The question is when — or whether." },
  { id: 'L3-05', domains: ['Co', 'Fa'], title: "Standing up for someone might make their situation worse", setup: "Someone is being treated unfairly. You can see it. You have the standing to say something. But intervening might actually make things harder for the person you're trying to help — it might draw more attention to them, or make them look like they need defending.", openingPrompt: "You want to help. Helping might not be what they need." },
  { id: 'L3-06', domains: ['Co', 'Ca'], title: "Being honest with someone might damage your ability to help them", setup: "Someone you care about is doing something you think is harmful. Saying something directly — the courageous thing — might push them away and end your ability to be there for them at all. Staying quiet keeps you in the relationship but means watching something continue that you think is hurting them.", openingPrompt: "Speaking up might close the door. Staying quiet keeps it open — but at what cost?" },
  { id: 'L3-07', domains: ['Co', 'Hu'], title: "You're not sure you're right, but staying quiet feels like cowardice", setup: "You have a strong sense that something should be said — that someone is wrong, or that a situation is being misread. But you're not certain. You might be missing something. Saying something risks being confidently wrong in public. Not saying something means letting something you believe is real go unchallenged.", openingPrompt: "You have a strong instinct. You're not certain. Both things are true." },
  { id: 'L3-08', domains: ['Fa', 'Ca'], title: "Being fair to one person means being harder on someone you care about", setup: "A decision is being made that affects multiple people. The fair outcome isn't the one that's best for the person you're closest to. You can advocate for fairness, or you can advocate for the person you care about — but not fully both.", openingPrompt: "What's fair and what's kind to the person you love aren't the same thing right now." },
  { id: 'L3-09', domains: ['Fa', 'Re'], title: "You have information that would correct an unfair situation, but sharing it causes harm", setup: "Someone is being treated unfairly based on a false or incomplete picture. You have information that would correct it. But sharing the information would cause harm — to someone else, or to a relationship, or to something you've been trusted to keep private.", openingPrompt: "You could make this fairer. It would cost something to do it." },
  { id: 'L3-10', domains: ['Fa', 'Hu'], title: "You're the one with the power, and fairness might require you to give some of it up", setup: "You're in a position where you have more access, more voice, or more standing than others in the same situation. Being fair might mean using your position to lift something that reduces your own relative advantage. You might be wrong about what fairness requires here.", openingPrompt: "You have more than they do. Fairness might require noticing that." },
  { id: 'L3-11', domains: ['Re', 'Ca'], title: "Holding back protects you, but the other person needs you to act", setup: "Restraint — not saying, not doing, not escalating — is usually the stronger move. But right now someone needs you to step in, to say something, to do something. Holding back here isn't strength — it might be its own kind of abandonment.", openingPrompt: "The instinct is to hold back. But holding back might be what leaves them alone." },
  { id: 'L3-12', domains: ['Re', 'Hu'], title: "You think you're right. Restraint might mean letting the wrong thing stand.", setup: "You're confident in your position. Restraint would mean not pressing it — letting the other person's view stand, letting the moment pass without insisting. But you think they're wrong, and staying quiet means the wrong thing doesn't get corrected.", openingPrompt: "You're probably right. Acting on it might still be the wrong move." },
  { id: 'L3-13', domains: ['Hu', 'Ca'], title: "Admitting you were wrong might undermine someone's confidence in you when they need it", setup: "You made a mistake — a judgment, a piece of advice, a decision. Being honest about it is the humble thing. But the person who trusted you is in a vulnerable moment, and admitting you were wrong might remove the stability they're depending on.", openingPrompt: "You were wrong. They need to trust you right now. Both things are true." },
  { id: 'L3-14', domains: ['H', 'Re'], title: "The honest thing would do damage that can't be undone", setup: "You know something true that, if said, would change things permanently — for someone else, for a relationship, for a situation. The truth has a right to be said. But saying it might cause harm that outlasts any benefit the honesty provides.", openingPrompt: "It's true. Saying it might cause more harm than holding it." },
  { id: 'L3-15', domains: ['H', 'Hu'], title: "You might be wrong about what's true", setup: "You have a strong sense of what's actually happening — what someone meant, what the situation is, what the facts are. But you might be missing something. Saying what you believe to be true with confidence could be honest if you're right and harmful if you're wrong.", openingPrompt: "You're confident in your read. You might be missing something." },
];
