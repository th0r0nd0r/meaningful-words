import runSimulation from "./bubbles";


const fileInput = document.getElementById("file-input");
let currentFile;
let text;
let wordCounts = [];
let wordCountsObj = {};
const allWords = [];
let minLength = 5;

// this function gets used to sort words by word count
const compareWordCounts = (word1, word2) => {
  if (wordCountsObj[word1] > wordCountsObj[word2]) {
    return -1;
  } else if (wordCountsObj[word1] < wordCountsObj[word2]) {
    return 1;
  } else {
    return 0;
  }
};


// list of words not to include in the final array
const nonsenseWords = [
  "A", "To", "Too", "If", "Not", "But", "Or", "And", "As", "The", "Of", "Be", "Is", "That",
  "In", "I", "By", "For", "On", "But", "At", "It", "An", "With", "Are", "From", "Let", "can", 
  "Its", "Has", "Off", "Was", "Which", "Would", "Their", "They're", "There"
];


// uses regex to split a file into an array of capitalized words
const splitText = (txt) => {
  let newText = txt.replace(/["”“‘.,\/#!$%\^&\*;:{}=_`\?~()]/g, "");
  newText = newText.replace(/('[^a-z])(’[^a-z])/g, " ");
  newText = newText.replace(/\n/g," ");
  newText = newText.replace(/-+/g, " ");
  return newText.split(" ");
};

const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};


// this function, named after Ruby's hash, not a hashing function, creates an object
// whose keys are words, and whose values are word counts
const hashWords = (txt) => {
  let words = splitText(txt);
  console.log("unsorted words");
  console.log(words);

  for (let i = 0; i < words.length; i++) {
    let word = capitalize(words[i]);
    if (word.slice(-2) === "'s" || word.slice(-2) === "’s") {
      word = word.slice(0, -2);
    }

    if (wordCountsObj[word]) {
      wordCountsObj[word]++;
    } else {
      wordCountsObj[word] = 1;
    }
  }
  console.log("word counts");
  console.log(wordCountsObj);

  // const allWords = Object.keys(wordCountsObj);

  for (var word in wordCountsObj) {
    if  (wordCountsObj.hasOwnProperty(word) && !nonsenseWords.includes(word) && word.length >= minLength) {
      allWords.push(word);
    }
  }
  return allWords.sort(compareWordCounts);
};


// this function gets called when a user uploads a file
const analyze = () => {
  currentFile = fileInput.files[0];
  loadAsText(currentFile);
};


// this uses the File API to read a file asynchronously, then onload
// it calls hashWords to turn the text into a sorted word array. 
// wordCountsObj is globally declared in this file.
const loadAsText = (file) => {
  const reader = new FileReader();
  
  reader.onload = (loadedEvent) => {
    text = loadedEvent.target.result;
    // console.log(text);
    let sorted = hashWords(text);

    console.log("sorted");
    console.log(sorted);
    // document.write(sorted);

    // imported from bubbles, this renders the bubbles to the canvas
    runSimulation(sorted, wordCountsObj);
  };
  
  reader.readAsText(file);
};



window.analyze = analyze;
// window.loadAsText = loadAsText;

// the functions get called in this order, with this data respectively:
// fileinput.onclick => analyze => loadAsText => readAsText => hashWords => splitText => runSimiulation
//         File      =>   File  =>    File    =>    File    =>   text    =>    text   =>  array, POJO



const preloadedTexts = {
  "King": "I am happy to join with you today in what will go down in history as the greatest demonstration for freedom in the history of our nation. Five score years ago, a great American, in whose symbolic shadow we stand today, signed the Emancipation Proclamation. This momentous decree came as a great beacon light of hope to millions of Negro slaves who had been seared in the flames of withering injustice. It came as a joyous daybreak to end the long night of their captivity. But one hundred years later, the Negro still is not free. One hundred years later, the life of the Negro is still sadly crippled by the manacles of segregation and the chains of discrimination. One hundred years later, the Negro lives on a lonely island of poverty in the midst of a vast ocean of material prosperity. One hundred years later, the Negro is still languishing in the corners of American society and finds himself an exile in his own land. So we have come here today to dramatize a shameful condition. In a sense we have come to our nation’s capital to cash a check. When the architects of our republic wrote the magnificent words of the Constitution and the Declaration of Independence, they were signing a promissory note to which every American was to fall heir. This note was a promise that all men, yes, black men as well as white men, would be guaranteed the unalienable rights of life, liberty, and the pursuit of happiness. It is obvious today that America has defaulted on this promissory note insofar as her citizens of color are concerned. Instead of honoring this sacred obligation, America has given the Negro people a bad check, a check which has come back marked “insufficient funds.” But we refuse to believe that the bank of justice is bankrupt. We refuse to believe that there are insufficient funds in the great vaults of opportunity of this nation. So we have come to cash this check — a check that will give us upon demand the riches of freedom and the security of justice. We have also come to this hallowed spot to remind America of the fierce urgency of now. This is no time to engage in the luxury of cooling off or to take the tranquilizing drug of gradualism. Now is the time to make real the promises of democracy. Now is the time to rise from the dark and desolate valley of segregation to the sunlit path of racial justice. Now is the time to lift our nation from the quick sands of racial injustice to the solid rock of brotherhood. Now is the time to make justice a reality for all of God’s children. It would be fatal for the nation to overlook the urgency of the moment. This sweltering summer of the Negro’s legitimate discontent will not pass until there is an invigorating autumn of freedom and equality. Nineteen sixty-three is not an end, but a beginning. Those who hope that the Negro needed to blow off steam and will now be content will have a rude awakening if the nation returns to business as usual. There will be neither rest nor tranquility in America until the Negro is granted his citizenship rights. The whirlwinds of revolt will continue to shake the foundations of our nation until the bright day of justice emerges. But there is something that I must say to my people who stand on the warm threshold which leads into the palace of justice. In the process of gaining our rightful place we must not be guilty of wrongful deeds. Let us not seek to satisfy our thirst for freedom by drinking from the cup of bitterness and hatred. We must forever conduct our struggle on the high plane of dignity and discipline. We must not allow our creative protest to degenerate into physical violence. Again and again we must rise to the majestic heights of meeting physical force with soul force. The marvelous new militancy which has engulfed the Negro community must not lead us to a distrust of all white people, for many of our white brothers, as evidenced by their presence here today, have come to realize that their destiny is tied up with our destiny. They have come to realize that their freedom is inextricably bound to our freedom. We cannot walk alone. As we walk, we must make the pledge that we shall always march ahead. We cannot turn back. There are those who are asking the devotees of civil rights, “When will you be satisfied?” We can never be satisfied as long as the Negro is the victim of the unspeakable horrors of police brutality. We can never be satisfied, as long as our bodies, heavy with the fatigue of travel, cannot gain lodging in the motels of the highways and the hotels of the cities. We cannot be satisfied as long as the Negro’s basic mobility is from a smaller ghetto to a larger one. We can never be satisfied as long as our children are stripped of their selfhood and robbed of their dignity by signs stating “For Whites Only”. We cannot be satisfied as long as a Negro in Mississippi cannot vote and a Negro in New York believes he has nothing for which to vote. No, no, we are not satisfied, and we will not be satisfied until justice rolls down like waters and righteousness like a mighty stream. I am not unmindful that some of you have come here out of great trials and tribulations. Some of you have come fresh from narrow jail cells. Some of you have come from areas where your quest for freedom left you battered by the storms of persecution and staggered by the winds of police brutality. You have been the veterans of creative suffering. Continue to work with the faith that unearned suffering is redemptive. Go back to Mississippi, go back to Alabama, go back to South Carolina, go back to Georgia, go back to Louisiana, go back to the slums and ghettos of our northern cities, knowing that somehow this situation can and will be changed. Let us not wallow in the valley of despair. I say to you today, my friends, so even though we face the difficulties of today and tomorrow, I still have a dream. It is a dream deeply rooted in the American dream. I have a dream that one day this nation will rise up and live out the true meaning of its creed: “We hold these truths to be self-evident: that all men are created equal.” I have a dream that one day on the red hills of Georgia the sons of former slaves and the sons of former slave owners will be able to sit down together at the table of brotherhood. I have a dream that one day even the state of Mississippi, a state sweltering with the heat of injustice, sweltering with the heat of oppression, will be transformed into an oasis of freedom and justice. I have a dream today. I have a dream that one day, down in Alabama, with its vicious racists, with its governor having his lips dripping with the words of interposition and nullification; one day right there in Alabama, little black boys and black girls will be able to join hands with little white boys and white girls as sisters and brothers. I have a dream today. I have a dream that one day every valley shall be exalted, every hill and mountain shall be made low, the rough places will be made plain, and the crooked places will be made straight, and the glory of the Lord shall be revealed, and all flesh shall see it together. This is our hope. This is the faith that I go back to the South with. With this faith we will be able to hew out of the mountain of despair a stone of hope. With this faith we will be able to transform the jangling discords of our nation into a beautiful symphony of brotherhood. With this faith we will be able to work together, to pray together, to struggle together, to go to jail together, to stand up for freedom together, knowing that we will be free one day. This will be the day when all of God’s children will be able to sing with a new meaning, “My country, ‘tis of thee, sweet land of liberty, of thee I sing. Land where my fathers died, land of the pilgrim’s pride, from every mountainside, let freedom ring.” And if America is to be a great nation this must become true. So let freedom ring from the prodigious hilltops of New Hampshire. Let freedom ring from the mighty mountains of New York. Let freedom ring from the heightening Alleghenies of Pennsylvania! Let freedom ring from the snowcapped Rockies of Colorado! Let freedom ring from the curvaceous slopes of California! But not only that; let freedom ring from Stone Mountain of Georgia! Let freedom ring from Lookout Mountain of Tennessee! Let freedom ring from every hill and molehill of Mississippi. From every mountainside, let freedom ring. And when this happens, when we allow freedom to ring, when we let it ring from every village and every hamlet, from every state and every city, we will be able to speed up that day when all of God’s children, black men and white men, Jews and Gentiles, Protestants and Catholics, will be able to join hands and sing in the words of the old Negro spiritual, Free at last! free at last! thank God Almighty, we are free at last!",
  "Hamlet": "To be, or not to be--that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune Or to take arms against a sea of troubles And by opposing end them. To die, to sleep-- No more--and by a sleep to say we end The heartache, and the thousand natural shocks That flesh is heir to. 'Tis a consummation Devoutly to be wished. To die, to sleep-- To sleep--perchance to dream: ay, there's the rub, For in that sleep of death what dreams may come When we have shuffled off this mortal coil, Must give us pause. There's the respect That makes calamity of so long life. For who would bear the whips and scorns of time, Th' oppressor's wrong, the proud man's contumely The pangs of despised love, the law's delay, The insolence of office, and the spurns That patient merit of th' unworthy takes, When he himself might his quietus make With a bare bodkin? Who would fardels bear, To grunt and sweat under a weary life, But that the dread of something after death, The undiscovered country, from whose bourn No traveller returns, puzzles the will, And makes us rather bear those ills we have Than fly to others that we know not of? Thus conscience does make cowards of us all, And thus the native hue of resolution Is sicklied o'er with the pale cast of thought, And enterprise of great pitch and moment With this regard their currents turn awry And lose the name of action. -- Soft you now, The fair Ophelia! -- Nymph, in thy orisons Be all my sins remembered.",
  "Dante": "IN the midway of this our mortal life, I found me in a gloomy wood, astray Gone from the path direct: and e'en to tell It were no easy task, how savage wild That forest, how robust and rough its growth, Which to remember only, my dismay Renews, in bitterness not far from death. Yet to discourse of what there good befell, All else will I relate discover'd there. How first I enter'd it I scarce can say, Such sleepy dullness in that instant weigh'd My senses down, when the true path I left, But when a mountain's foot I reach'd, where clos'd The valley, that had pierc'd my heart with dread, I look'd aloft, and saw his shoulders broad Already vested with that planet's beam, Who leads all wanderers safe through every way.  Then was a little respite to the fear, That in my heart's recesses deep had lain, All of that night, so pitifully pass'd: And as a man, with difficult short breath, Forespent with toiling, 'scap'd from sea to shore, Turns to the perilous wide waste, and stands At gaze; e'en so my spirit, that yet fail'd Struggling with terror, turn'd to view the straits, That none hath pass'd and liv'd.  My weary frame After short pause recomforted, again I journey'd on over that lonely steep,  The hinder foot still firmer.  Scarce the ascent Began, when, lo! a panther, nimble, light, And cover'd with a speckled skin, appear'd, Nor, when it saw me, vanish'd, rather strove To check my onward going; that ofttimes With purpose to retrace my steps I turn'd The hour was morning's prime, and on his way Aloft the sun ascended with those stars, That with him rose, when Love divine first mov'd Those its fair works: so that with joyous hope All things conspir'd to fill me, the gay skin Of that swift animal, the matin dawn And the sweet season.  Soon that joy was chas'd, And by new dread succeeded, when in view A lion came, 'gainst me, as it appear'd,  With his head held aloft and hunger-mad, That e'en the air was fear-struck.  A she-wolf Was at his heels, who in her leanness seem'd Full of all wants, and many a land hath made Disconsolate ere now.  She with such fear O'erwhelmed me, at the sight of her appall'd, That of the height all hope I lost.  As one, Who with his gain elated, sees the time When all unwares is gone, he inwardly Mourns with heart-griping anguish; such was I, Haunted by that fell beast, never at peace, Who coming o'er against me, by degrees Impell'd me where the sun in silence rests.While to the lower space with backward step I fell, my ken discern'd the form one of one  Whose voice seem'd faint through long disuse of speech. When him in that great desert I espied, Have mercy on me!  cried I out aloud, Spirit! or living man! what e'er thou be! He answer'd: Now not man, man once I was, And born of Lombard parents, Mantuana both By country, when the power of Julius yet Was scarcely firm.  At Rome my life was past Beneath the mild Augustus, in the time Of fabled deities and false.  A bard Was I, and made Anchises' upright son The subject of my song, who came from Troy, When the flames prey'd on Ilium's haughty towers. But thou, say wherefore to such perils past Return'st thou?  wherefore not this pleasant mount Ascendest, cause and source of all delight? And art thou then that Virgil, that well-spring, From which such copious floods of eloquence Have issued?  I with front abash'd replied. Glory and light of all the tuneful train! May it avail me that I long with zeal Have sought thy volume, and with love immense Have conn'd it o'er.  My master thou and guide! Thou he from whom alone I have deriv'd That style, which for its beauty into fame Exalts me.  See the beast, from whom I fled. O save me from her, thou illustrious sage! For every vein and pulse throughout my frame She hath made tremble.  He, soon as he saw That I was weeping, answer'd, Thou must needs Another way pursue, if thou wouldst 'scape From out that savage wilderness.  This beast, At whom thou criest, her way will suffer none  To pass, and no less hindrance makes than death: So bad and so accursed in her kind, That never sated is her ravenous will, Still after food more craving than before. To many an animal in wedlock vile She fastens, and shall yet to many more, Until that greyhound come, who shall destroy Her with sharp pain.  He will not life support By earth nor its base metals, but by love, Wisdom, and virtue, and his land shall be The land 'twixt either Feltro.  In his might Shall safety to Italia's plains arise, For whose fair realm, Camilla, virgin pure, Nisus, Euryalus, and Turnus fell. He with incessant chase through every town Shall worry, until he to hell at length Restore her, thence by envy first let loose. I for thy profit pond'ring now devise, That thou mayst follow me, and I thy guide Will lead thee hence through an eternal space, Where thou shalt hear despairing shrieks, and see Spirits of old tormented, who invoke A second death; and those next view, who dwell Content in fire, for that they hope to come, Whene'er the time may be, among the blest, Into whose regions if thou then desire T' ascend, a spirit worthier than I Must lead thee, in whose charge, when I depart, Thou shalt be left: for that Almighty King, Who reigns above, a rebel to his law, Adjudges me, and therefore hath decreed, That to his city none through me should come. He in all parts hath sway; there rules, there holds His citadel and throne.  O happy those, Whom there he chooses! I to him in few: Bard! by that God, whom thou didst not adore, I do beseech thee (that this ill and worse I may escape) to lead me, where thou saidst, That I Saint Peter's gate may view, and those Who as thou tell'st, are in such dismal plight. Onward he mov'd, I close his steps pursu'd." 
};