// content/stories.js
// 18 stories across 6 virtue domains, 3 per domain.
// Story Ca-3 uses Jaime Escalante (QA audit replacement for González).

export const STORIES = [

  // ── HONESTY ───────────────────────────────────────────────────────────────

  {
    id: 'H-1',
    domain: 'H',
    personName: 'Vaclav Havel',
    title: 'The playwright who wouldn\'t pretend',
    context: 'Playwright and dissident. Czechoslovakia under Soviet rule, 1970s–1989.',
    tagline: 'Telling the truth when silence was survival',
    situation: 'Havel was one of Czechoslovakia\'s most celebrated playwrights when the Soviet-backed government decided his work was too dangerous. He was blacklisted, surveilled, and repeatedly imprisoned. The deal on offer — implicit but clear — was this: stop speaking publicly and you can have your life back. Many people around him made that deal. He didn\'t.',
    whatTheyDid: 'He kept writing and kept signing. He was a founding signatory of Charter 77, a human rights declaration that the government called subversive and that cost its signatories jobs, travel rights, and freedom. He wrote essays from prison. He kept saying publicly what he believed privately, for two decades, at sustained personal cost. In 1989, when the regime finally collapsed in the Velvet Revolution, he became the country\'s first post-Communist president. He said later that the only thing he had been trying to do was live in truth — to refuse the performance of agreement when he didn\'t agree.',
    pullQuote: 'The truth is not simply what you think it is; it is also the circumstances in which it is said, and to whom, and why.',
    unpackPrompt: 'Havel kept saying what he believed even when it kept costing him. Is there something you believe that you\'ve gone quiet about — because saying it would cost you something?',
  },

  {
    id: 'H-2',
    domain: 'H',
    personName: 'Ida B. Wells',
    title: 'The journalist who named the lie',
    context: 'Journalist and activist. American South, 1892.',
    tagline: 'Publishing the truth when everyone with power preferred silence',
    situation: 'Three of Wells\'s friends — Black business owners in Memphis — were lynched by a white mob after their store competed successfully with a white-owned one. The official story, repeated in white newspapers, was that they had been a threat to public safety. Everyone around Wells knew the real story. The easy path was to grieve privately and stay alive. Speaking publicly meant losing her newspaper, her home, and possibly her life.',
    whatTheyDid: 'Wells published the truth. She documented that the men had been murdered for economic competition — that the lynching had nothing to do with safety and everything to do with suppressing Black success. She named the lie publicly. Her press was destroyed. She was driven out of Memphis with death threats. She kept writing and publishing from the North, eventually producing Southern Horrors — a documented record that forced the conversation into the open when everyone with power preferred silence. She continued for the rest of her life, telling the truth about things that were dangerous to say.',
    pullQuote: 'The way to right wrongs is to turn the light of truth upon them.',
    unpackPrompt: 'Have you ever known something was true that nobody around you was saying out loud? What did it cost you to say it — or not say it?',
  },

  {
    id: 'H-3',
    domain: 'H',
    personName: 'Erin Brockovich',
    title: 'The clerk who kept pulling the thread',
    context: 'Legal clerk. Hinkley, California, 1993.',
    tagline: 'Following the truth when no one said it was her job',
    situation: 'Brockovich was a single mother with no law degree working as a clerk at a small law firm when she came across medical records in a real estate file that didn\'t belong there. She started asking questions and found that Pacific Gas & Electric had been contaminating the local water supply for decades, and the company knew. Residents were getting sick. The company was offering settlements and quietly denying any connection. The easy path was to file the real estate case and move on.',
    whatTheyDid: 'She kept pulling the thread. She drove out to Hinkley herself, knocked on doors, and started building trust with residents who had been told their health problems weren\'t related to the water. She wasn\'t a lawyer. She had no formal authority. When people inside the firm questioned whether she belonged on the case, she stayed anyway. Her investigation eventually led to the largest settlement ever paid in a direct-action lawsuit in US history — $333 million — and held the company accountable for harm it had been covering up for thirty years.',
    pullQuote: 'They\'re people, and they deserve to know the truth.',
    unpackPrompt: 'Think of a time you noticed something that felt wrong and almost let it go. What made you look away — and what made someone like Brockovich keep looking?',
  },

  // ── COURAGE ───────────────────────────────────────────────────────────────

  {
    id: 'Co-1',
    domain: 'Co',
    personName: 'Fred Rogers',
    title: 'The quiet man in the Senate',
    context: 'Television host. US Senate hearing, 1969.',
    tagline: 'Speaking for something no one thought needed defending',
    situation: 'The US Senate was considering cutting $20 million from the Corporation for Public Broadcasting budget. Fred Rogers, the host of a small public television program for children, asked to speak. He had six minutes. The senator chairing the hearing, John Pastore, was known for being tough and impatient. The easy path was to send a written statement. Rogers showed up.',
    whatTheyDid: 'He sat in front of the committee and talked about what his program was trying to do — help children understand their feelings, feel less alone, know that they were loved. He quoted the words of one of his songs. He wasn\'t eloquent in the conventional sense. He was just direct and true. Senator Pastore, who had started the hearing visibly irritated, told Rogers: "I think it\'s wonderful. Looks like you just earned the $20 million." The funding was restored. The courage wasn\'t physical. It was the willingness to stand up for something quiet and unglamorous in a room that rewarded toughness, and to do it by being exactly himself.',
    pullQuote: 'You\'ve made this day a special day by just your being you. There\'s no person in the whole world like you.',
    unpackPrompt: 'Rogers walked into a room where his kind of thing wasn\'t valued — and didn\'t pretend to be something else. Is there something you believe in that you\'ve been downplaying because the room didn\'t seem like the right place for it?',
  },

  {
    id: 'Co-2',
    domain: 'Co',
    personName: 'Malala Yousafzai',
    title: 'The student who kept speaking',
    context: 'Student and activist. Swat Valley, Pakistan, 2009–2012.',
    tagline: 'Saying out loud what was dangerous to say',
    situation: 'When the Taliban took control of the Swat Valley, they banned girls from attending school. Malala was 11. She began writing an anonymous blog describing daily life under the ban — what it felt like to be a girl who wanted to learn and was being told she had no right to. She was later publicly identified. She kept speaking. In 2012, on her school bus, she was shot in the head. The easy path was silence. She had been warned. She knew she was a target.',
    whatTheyDid: 'She didn\'t stop after the attack. She survived, recovered, and continued speaking — at the United Nations at age 16, in front of governments, in every public forum she could reach. She became the youngest Nobel Peace Prize laureate in history. The courage was not the single dramatic moment on the bus — it was the decision, made repeatedly over years, to keep saying out loud what she knew to be true about girls and education, when saying it put her life at risk. She has said she was afraid. She went anyway.',
    pullQuote: 'One child, one teacher, one book, one pen can change the world.',
    unpackPrompt: 'Malala kept speaking even when she knew the risks. Is there something you believe that you\'ve gone quiet about because of what it might cost you? What would it take to say it?',
  },

  {
    id: 'Co-3',
    domain: 'Co',
    personName: 'Witold Pilecki',
    title: 'The soldier who walked in on purpose',
    context: 'Polish resistance fighter. Auschwitz, 1940–1943.',
    tagline: 'Choosing the most dangerous place because someone had to',
    situation: 'In 1940, the Nazi concentration camp at Auschwitz had been operating for months and almost nothing was known about conditions inside. Pilecki, a Polish resistance soldier, proposed something almost no one believed was a real plan: he would voluntarily get himself arrested and sent to Auschwitz to gather intelligence and organize resistance from inside. His commanding officers approved it. In September 1940, he deliberately walked into a German round-up.',
    whatTheyDid: 'He spent nearly three years inside Auschwitz. He organized an underground resistance network within the camp, and he smuggled out detailed reports documenting what was happening — reports that reached Allied governments in London. He eventually escaped in 1943 to deliver his testimony in person. The reports were among the earliest documented evidence of the systematic extermination happening at the camps. He was later captured, tortured, and executed by Communist authorities in 1948, never formally recognized in his lifetime. He walked into one of the most dangerous places in human history on purpose — not because he had no choice, but because he decided the information was worth it.',
    pullQuote: 'I tried to live my life so that in the hour of my death I would rather feel joy than fear.',
    unpackPrompt: 'Pilecki chose something terrifying on purpose because he thought it mattered enough. Have you ever done something hard — not because you had to, but because you decided it was worth it?',
  },

  // ── FAIRNESS ──────────────────────────────────────────────────────────────

  {
    id: 'Fa-1',
    domain: 'Fa',
    personName: 'Paul Farmer',
    title: 'The doctor who stayed',
    context: 'Physician and anthropologist. Haiti from 1983.',
    tagline: 'Building what was missing because it should exist',
    situation: 'Farmer was a Harvard medical student when he first went to Haiti and saw what health care looked like for people without money or connections. Diseases that were easily treatable in wealthy countries were killing people because the treatment didn\'t reach them. The easy path was to finish his degree, take a position at a well-funded hospital, and do good work within systems that already existed.',
    whatTheyDid: 'He kept going back to Haiti. He co-founded Partners in Health, which has now provided health care to millions of people across Haiti, Rwanda, Lesotho, Liberia, Russia, Peru, and Sierra Leone. The organization operates on the principle that the people with the least access to health care deserve the same quality of care as those with the most. He spent his career arguing that poverty is not an excuse for unequal medicine — that a person\'s ability to pay is not a morally defensible reason to give them worse care. He continued seeing patients, training local staff, and building infrastructure until his death in 2022.',
    pullQuote: 'The idea that some lives matter less is the root of all that is wrong with the world.',
    unpackPrompt: 'Farmer kept going back to the place where the need was greatest. Is there a gap between what you think people deserve and what they\'re actually getting — somewhere in your own life or world? What would it take to do something about it?',
  },

  {
    id: 'Fa-2',
    domain: 'Fa',
    personName: 'Bryan Stevenson',
    title: 'The lawyer who built what justice required',
    context: 'Lawyer and founder of the Equal Justice Initiative. Alabama, from 1989.',
    tagline: 'Standing with the people the system had already written off',
    situation: 'Stevenson graduated from Harvard Law School and went to Alabama to represent people on death row who couldn\'t afford lawyers — many of whom had been convicted with little evidence, inadequate representation, or both. The system he was working inside had a long history of racial bias in sentencing and conviction. The easy path was a career at a firm where the pay was better, the cases were cleaner, and the odds were less exhausting.',
    whatTheyDid: 'He stayed. He has won reversals, relief, or release for over 140 wrongfully condemned prisoners. He built the Equal Justice Initiative into an organization that has represented thousands of people. He also built the National Memorial for Peace and Justice — the first memorial in the United States dedicated to the victims of lynching — because he believed that fairness requires looking at history clearly, not selectively. He has argued that the opposite of poverty is not wealth — it\'s justice.',
    pullQuote: 'Each of us is more than the worst thing we\'ve ever done.',
    unpackPrompt: 'Stevenson works for people that most of society has already written off. Is there someone in your life — or in the world — who you think is being treated as less than they actually are?',
  },

  {
    id: 'Fa-3',
    domain: 'Fa',
    personName: 'Claudette Colvin',
    title: 'The student who sat still',
    context: '15-year-old student. Montgomery, Alabama, March 1955.',
    tagline: 'Doing the right thing before anyone called it history',
    situation: 'Nine months before Rosa Parks refused to give up her seat on a Montgomery bus, Claudette Colvin did the same thing. She was 15, coming home from school. When told to give up her seat to a white passenger, she refused and was arrested. She had just been studying the Constitution in school and had been thinking about rights. She knew the law she was being asked to follow was unjust. The easy path was to stand up and move.',
    whatTheyDid: 'She sat still. She was arrested, forcibly removed, and charged. Civil rights leaders initially decided not to make her the face of the bus boycott because she was young, unmarried, and pregnant, and they worried she wouldn\'t be seen as a sympathetic figure by the public. She was essentially set aside by the movement she had helped start. She still testified as a key witness in Browder v. Gayle — the federal case that went to the Supreme Court and resulted in the ruling that desegregated Montgomery\'s buses in 1956. Her testimony was central to winning the case that the boycott was meant to force. She rarely received public credit for decades. Her act of fairness cost her the recognition it deserved — and she did it anyway, because she thought it was right.',
    pullQuote: 'I felt like Sojourner Truth was pushing down on one shoulder and Harriet Tubman was pushing down on the other.',
    unpackPrompt: 'Colvin did the right thing and was still overlooked. Have you ever done something right and not been recognized for it? What kept you from giving up?',
  },

  // ── RESTRAINT ─────────────────────────────────────────────────────────────

  {
    id: 'Re-1',
    domain: 'Re',
    personName: 'Nelson Mandela',
    title: 'The leader who chose further',
    context: 'Political leader. South Africa, 1990–1994.',
    tagline: 'Using power to build rather than to settle the score',
    situation: 'Mandela spent 27 years in prison. He was released in 1990 into a country still under apartheid, with legitimate grievances, enormous moral authority, and a movement behind him that had every reason to want revenge. The world expected him to emerge angry. The path that would have felt most justified — retribution — was also the one that would have destroyed any chance of a functioning country on the other side.',
    whatTheyDid: 'He chose reconciliation over retribution, not once but as a sustained posture across the entire transition to democracy. He worked alongside the people who had imprisoned him. He established the Truth and Reconciliation Commission — a process that asked the country to face what had happened without executing those responsible. He wore the Springboks jersey at the Rugby World Cup in 1995 to signal to white South Africans that the new country included them. The restraint was the constant, daily choice not to use the power and anger he had legitimate access to — because he saw further than the satisfaction of using it.',
    pullQuote: 'Resentment is like drinking poison and then hoping it will kill your enemies.',
    unpackPrompt: 'Mandela had every reason to want revenge and chose not to pursue it. Is there a situation in your life where you\'re holding on to something — anger, a grudge, the right to retaliate — that might be costing you more than letting it go would?',
  },

  {
    id: 'Re-2',
    domain: 'Re',
    personName: 'Simone Biles',
    title: 'The champion who stopped',
    context: 'Gymnast. Tokyo Olympics, 2021.',
    tagline: 'Knowing when not to act takes more strength than acting',
    situation: 'Biles was the most decorated American gymnast in history and the heavy favorite to lead the US team at the Tokyo Olympics. In the team final, she withdrew — mid-competition — citing mental health and a condition called the "twisties," a dangerous disconnection between mind and body that can cause gymnasts to lose spatial awareness mid-air. The easy path would have been to compete anyway. She had trained for this. The whole world was watching.',
    whatTheyDid: 'She stopped. She recognized that continuing in the state she was in would not only put her physical safety at risk but would likely make her team\'s outcome worse. The restraint — the refusal to act on momentum, expectation, and pressure — was harder than competing would have been. She cheered for her teammates from the sidelines. She came back later in the Games to compete in the beam final and won a bronze medal. She had held her own safety and her team\'s interests in balance, and she had chosen both over the performance of being fine.',
    pullQuote: 'We have to protect our mind and our body rather than just going out there and doing what the world wants us to do.',
    unpackPrompt: 'Biles stopped when everything around her said keep going. Is there something in your life you\'ve been pushing through — out of momentum or expectation — when stopping might actually be the stronger choice?',
  },

  {
    id: 'Re-3',
    domain: 'Re',
    personName: 'Warren Buffett',
    title: 'The investor who sat still',
    context: 'Investor. During the dot-com bubble, 1998–2000.',
    tagline: 'Holding to a principle while everyone else is proving you wrong',
    situation: 'In the late 1990s, technology stocks were rising at extraordinary rates. Berkshire Hathaway — Buffett\'s company — was underperforming the market significantly, and investors were publicly questioning whether he had lost his edge. The easy path was to invest in what was working: internet companies whose valuations were soaring. Everyone around him was making money doing exactly that.',
    whatTheyDid: 'He didn\'t invest in what he didn\'t understand. He said he didn\'t understand the valuations of most technology companies — which to him meant he had no business owning them. He sat still while the people around him made money and told him he was wrong. When the bubble collapsed in 2000–2001, Berkshire was largely unaffected. He had protected his investors\' money not by clever maneuvering but by refusing to act when acting felt like the obvious thing to do. The restraint looked like stubbornness from the outside. From the inside it was discipline.',
    pullQuote: 'The stock market is a device for transferring money from the impatient to the patient.',
    unpackPrompt: 'Buffett looked wrong for years before he was proved right. Have you ever held to something you believed was right while the people around you were all doing something different? What made you stay put?',
  },

  // ── HUMILITY ──────────────────────────────────────────────────────────────

  {
    id: 'Hu-1',
    domain: 'Hu',
    personName: 'Katherine Johnson',
    title: 'The mathematician who did the work',
    context: 'Mathematician. NASA, 1962.',
    tagline: 'Competence held without ego',
    situation: 'John Glenn was about to become the first American to orbit the Earth. NASA had installed electronic computers to calculate the flight trajectory. Glenn didn\'t trust them. He asked that Katherine Johnson, one of the human "computers" who had been doing these calculations by hand for years, personally verify the machine\'s numbers. If she said they were right, he\'d go. She was a Black woman working at an agency that had only recently been desegregated. She ran the numbers.',
    whatTheyDid: 'She verified the trajectory manually and confirmed it was correct. Glenn flew. The humility in her story is not in the dramatic moment — it\'s in what came before it: decades of doing the work precisely and without fanfare, in rooms where she was often the only Black person and the only woman, with a level of rigor that meant an astronaut trusted her calculation over a computer\'s. She never performed her competence. She just had it.',
    pullQuote: 'I counted everything. I counted the steps to the road, the steps up to church, the number of dishes and silverware I washed... anything that could be counted, I did.',
    unpackPrompt: 'Johnson\'s humility was in how she did the work, not in dramatic self-sacrifice. Is there something you do well that you\'ve been downplaying — or something you\'ve been overplaying to make sure people notice?',
  },

  {
    id: 'Hu-2',
    domain: 'Hu',
    personName: 'Richard Feynman',
    title: 'The physicist who trusted the evidence',
    context: 'Physicist. Rogers Commission, 1986.',
    tagline: 'Following what\'s true when institutions want a different answer',
    situation: 'The Space Shuttle Challenger had exploded 73 seconds after launch, killing all seven crew members. A presidential commission was convened to find out why. Feynman was appointed to the commission. He quickly suspected the O-ring seals — they may have failed in the cold temperatures of launch day. The commission\'s senior members were under political pressure to reach a measured conclusion. The easy path was to let the process run and sign on to whatever the commission produced.',
    whatTheyDid: 'He ran his own investigation. He talked directly to engineers — not to executives — and they confirmed his suspicion. At a public hearing, he placed a piece of O-ring material into a glass of ice water and demonstrated that it lost its resilience in cold temperatures. One minute of honest, demonstrable evidence cut through weeks of institutional hedging. He later wrote a minority appendix to the commission report when he felt the main report was softening what the evidence showed. Humility, here, meant trusting what the evidence showed more than what the institution wanted to believe.',
    pullQuote: 'For a successful technology, reality must take precedence over public relations, for Nature cannot be fooled.',
    unpackPrompt: 'Feynman trusted the evidence even when powerful people wanted a different answer. Is there a situation in your life where you\'ve been telling yourself a story that the evidence doesn\'t quite support?',
  },

  {
    id: 'Hu-3',
    domain: 'Hu',
    personName: 'Jacinda Ardern',
    title: 'The leader who knew when to stop',
    context: 'Prime Minister of New Zealand. 2023.',
    tagline: 'Knowing your limits and naming them honestly',
    situation: 'Ardern had been Prime Minister of New Zealand since 2017 and was widely regarded as one of the most effective political leaders of her era. In January 2023, she announced her resignation — not because of scandal, not because of electoral defeat, but because she said she no longer had "enough in the tank" to continue doing the job the way it required to be done.',
    whatTheyDid: 'She stepped down voluntarily, publicly acknowledging that leadership requires more than you can produce when you\'re depleted, and that continuing in a diminished state would be worse than leaving. She said she wasn\'t leaving because she\'d stopped caring, but because caring about the role meant knowing when you weren\'t the right person to fill it anymore. The humility was in the honest accounting — not performing strength she didn\'t have, not staying for the status, not pretending the cost of the job wasn\'t real.',
    pullQuote: 'I know what this job takes, and I know that I no longer have enough in the tank to do it justice.',
    unpackPrompt: 'Ardern stepped back not because she failed but because she was honest about what the role required. Is there something you\'re holding onto — a role, a commitment, a self-image — where honesty would mean admitting you\'re running low?',
  },

  // ── CARE FOR OTHERS ───────────────────────────────────────────────────────

  {
    id: 'Ca-1',
    domain: 'Ca',
    personName: 'Nicholas Winton',
    title: 'The man who arranged 669 rescues',
    context: 'Stockbroker. Prague and London, 1938–1939.',
    tagline: 'Seeing a need and simply starting to meet it',
    situation: 'In December 1938, Winton — a 29-year-old London stockbroker — went to Prague instead of a ski holiday to help a friend working with Jewish refugees. He saw that the situation for Jewish children in Czechoslovakia was catastrophic and that no one was organizing a rescue for them specifically. The easy path was to help where he already was and go home.',
    whatTheyDid: 'He started organizing. He set up an office in a hotel in Prague, created a children\'s refugee organization from scratch, identified families willing to take children in Britain, negotiated with the British government for entry permits, raised the money required for transport, and coordinated the trains. Between March and August 1939, he organized eight trains that brought 669 Jewish children out of Czechoslovakia to safety in Britain. The ninth train, scheduled for September 1, 1939, never departed — Germany invaded Poland that day and the borders closed. He told almost no one what he had done for nearly fifty years. His wife found a scrapbook in their attic in 1988. He was 79. He had never called attention to himself.',
    pullQuote: 'If something is not impossible, then there must be a way to do it.',
    unpackPrompt: 'Winton saw people who needed something and just started figuring out how to provide it — no formal role, no permission, no recognition for decades. Is there something you\'ve been waiting for permission to do?',
  },

  {
    id: 'Ca-2',
    domain: 'Ca',
    personName: 'Harriet Tubman',
    title: 'The conductor who kept going back',
    context: 'Freedom fighter. Maryland and the Underground Railroad, 1849–1860.',
    tagline: 'Care that was operational, courageous, and costly',
    situation: 'Tubman escaped slavery in 1849, walking nearly 90 miles at night to reach Philadelphia. She was free. She had no legal obligation to return. The risk of going back was severe — recapture meant re-enslavement, torture, or death. The Fugitive Slave Act of 1850 meant she was also hunted in the North. The easy path was to stay free and rebuild her life.',
    whatTheyDid: 'She went back. Nineteen times over the next decade. She brought out approximately 70 people, including members of her family, using a network of safe houses, disguises, and timing that required military-level precision. She carried a gun — not to threaten slave catchers, but because she had told the people she led that they could not turn back, and she meant it. She never lost a person. She later served as a spy and scout for the Union Army during the Civil War. Her care for others was not passive feeling — it was operational, courageous, and costly.',
    pullQuote: 'I never ran my train off the track and I never lost a passenger.',
    unpackPrompt: 'Tubman went back into danger for other people, repeatedly. Who in your life do you show up for — not when it\'s convenient, but when it actually costs you something?',
  },

  {
    id: 'Ca-3',
    domain: 'Ca',
    personName: 'Jaime Escalante',
    title: 'The teacher who refused low expectations',
    context: 'Mathematics teacher. Garfield High School, East Los Angeles, 1974–1991.',
    tagline: 'Believing in people more than the system did',
    situation: 'Escalante arrived at Garfield High School — a predominantly Latino school in East Los Angeles — in 1974. The school was academically struggling, the neighborhood was poor, and expectations for students were low. The conventional path for a teacher in that environment was to manage the classroom, cover the curriculum, and not overextend. Nobody expected AP Calculus at Garfield. Nobody expected those students to take the exam, let alone pass it.',
    whatTheyDid: 'He started an AP Calculus program anyway. He recruited students personally — many of whom were working jobs, helping support their families, and had never been asked to consider college seriously. He ran before-school and after-school sessions. He demanded more than the system expected and more than the students expected of themselves. In 1982, 18 of his students passed the AP Calculus exam. The Educational Testing Service suspected cheating and invalidated the scores. Escalante gathered his students and they retook the exam. All 12 who retested passed. By 1987, Garfield had more students passing AP Calculus than almost every other school in the country. He had walked into a place where the system had low expectations, and he simply refused to share them.',
    pullQuote: 'The day I stop learning is the day I stop teaching.',
    unpackPrompt: 'Escalante saw more in his students than the system did — and he acted on it at real cost to himself. Is there someone in your life who you think is being asked for less than they\'re capable of? What would it look like to actually believe in them?',
  },
];
