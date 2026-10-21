/* =====================================================================
   STORY MODE
   Each of the nine fighters has a four-chapter story against opponents
   that only appear here (they can't be picked in the other modes):
   three chapters against one-round opponents, then a best-of-three boss.
   Dialogue lines are [who, text]: 'n' narrator, 'h' hero, 'e' enemy.
   ===================================================================== */
const NPC_BASE={g:'m',from:'',home:0,bio:'',list:[],chain:{},cmd:{},tech:'dash',bounce:1,size:1,speed:1,power:1,throwName:'THROW',hud:'#d0d0d0',npc:1};
const npc=o=>Object.assign({},NPC_BASE,o);
const SP_RUSH=(name,sup,fx)=>({kind:'rush',name,super:sup,desc:'',s:.12,a:.3,r:.38,dmg:12,range:60,h:'mid',kb:280,stun:.45,pose:'rush',launch:1,fx});
const SP_UPPER=(name,sup,fx)=>({kind:'uppercut',name,super:sup,desc:'',s:.09,a:.2,r:.42,dmg:14,range:80,h:'mid',kb:260,stun:.5,pose:'dragon',limb:'aF',launch:1,fx});
const SP_SLIDE=(name,sup,fx)=>({kind:'slide',name,super:sup,desc:'',s:.09,a:.3,r:.34,dmg:11,range:70,h:'low',kb:220,stun:.45,pose:'slide',limb:'lF',launch:1,crouch:1,fx});
const SP_PROJ=(name,sup,proj,fx,extra)=>Object.assign({kind:'proj',name,super:sup,desc:'',s:.16,a:.05,r:.34,dmg:9,h:'mid',kb:160,stun:.4,pose:'cast',limb:'aF',proj,fx},extra||{});
const SP_TELE=(name,sup,fx)=>({kind:'teleport',name,super:sup,desc:'',s:.22,a:.1,r:.32,dmg:12,range:95,h:'mid',kb:220,stun:.45,pose:'kick',limb:'lF',launch:1,fx});
const NPCS={
  // ---- one-round opponents
  bandi:npc({id:'bandi',name:'BANDI',hud:'#9fb4d8',col:'#1d2b4f',skin:'#b98058',pants:'#1d2b4f',shoe:'#f2f2f2',trim:'#f2f2f2',sash:'#1d2b4f',vest:{col:'#2b3f6e',trim:'#f2f2f2'},
    hat:'bandana',hatCol:'#c8102e',face:'stubble',speed:1.05,power:.92,throwName:'POCKET CHECK',sp:SP_RUSH('Bandi Rush','NO MERCY','#9fb4d8')}),
  contra:npc({id:'contra',name:'CONTRABANDI',hud:'#c9a27a',col:'#5a3a22',arm:'#5a3a22',fore:'#a8704a',skin:'#a8704a',pants:'#2a2a2a',shoe:'#1b1b1b',trim:'#c9a27a',sash:'#2a2a2a',
    face:'mustache',hair:{type:'short',col:'#1b120c'},size:1.04,speed:.95,power:.98,throwName:'BACK ALLEY',sp:SP_UPPER('Crate Breaker','BLACK MARKET','#c9a27a')}),
  legion:npc({id:'legion',name:'LEGIONARY',hud:'#e07a6a',col:'#8a8f98',arm:'#b07a52',fore:'#b07a52',skin:'#c48a5c',pants:'#c48a5c',greave:'#8a8f98',shoe:'#5a3a22',trim:'#c9c9d2',sash:'#9e1b28',
    hat:'helmet',shield:1,sword:1,face:'stubble',robe:{len:.6,col:'#9e1b28',trim:'#c9c9d2',strips:1},basic:{lp:'n_shield',rp:'n_slash',lk:'n_teep',rk:'n_knee'},speed:.92,power:.95,throwName:'SHIELD SHOVE',sp:SP_RUSH('Testudo','PILUM VOLLEY','#e07a6a')}),
  guard:npc({id:'guard',name:'TYRIAN GUARD',hud:'#b58ad8',col:'#a8925a',arm:'#c08a5e',fore:'#c08a5e',skin:'#c08a5e',pants:'#c08a5e',greave:'#a8925a',shoe:'#5a3a22',trim:'#e8c66a',sash:'#5b2a7a',
    hat:'helmet',shield:1,sword:1,face:'beard',beardCol:'#1f1510',robe:{len:.62,col:'#5b2a7a',trim:'#e8c66a',strips:1},basic:{lp:'n_shield',rp:'n_slash',lk:'n_teep',rk:'n_knee'},speed:.95,power:.95,throwName:'KING\'S ORDER',sp:SP_RUSH('Phoenician Charge','PURPLE TIDE','#b58ad8')}),
  raider:npc({id:'raider',name:'DUNE RAIDER',hud:'#e0c08a',col:'#4a3f36',skin:'#9c5f3a',pants:'#3a322b',shoe:'#3a2a1e',trim:'#8a7660',sash:'#8a2b1e',
    hat:'chech',hatCol:'#3a322b',face:'stubble',robe:{len:1.3,col:'#4a3f36',trim:'#6b5a4a'},tech:'airdash',speed:1.08,power:.95,throwName:'SAND TRAP',sp:SP_SLIDE('Dune Ambush','SANDSTORM','#e0c08a')}),
  sharper:npc({id:'sharper',name:'CARD SHARK',hud:'#d6d68a',col:'#2d2d3a',skin:'#c49a72',pants:'#2d2d3a',shoe:'#1b1b1b',trim:'#c9b05a',sash:'#2d2d3a',vest:{col:'#7a1f2b',trim:'#c9b05a'},
    face:'mustache',hair:{type:'short',col:'#151515'},glasses:1,cards:1,tech:'shuffle',speed:.98,power:.92,throwName:'MARKED DECK',sp:SP_PROJ('Ace Up the Sleeve','FULL DECK','card','#f6f1e7',{dmg:8})}),
  sailor:npc({id:'sailor',name:'SAILOR',hud:'#8fc8e8',col:'#d9cfb8',skin:'#c99a6e',pants:'#c99a6e',shoe:'#6b4628',trim:'#3a6fa8',sash:'#3a6fa8',
    hat:'bandana',hatCol:'#3a6fa8',face:'beard',beardCol:'#4a3020',robe:{len:.7,col:'#d9cfb8',trim:'#3a6fa8'},tech:'roll',speed:1.02,power:.94,throwName:'OVERBOARD',sp:SP_PROJ('Ship\'s Net','HEAVE HO','net','#e9dcc0',{dmg:7,kb:0,stun:.7,pull:1})}),
  // ---- bosses
  elboss:npc({id:'elboss',name:'EL BOSS',hud:'#f2f2f2',col:'#efefea',skin:'#b98058',pants:'#efefea',shoe:'#8a5a32',trim:'#c9a46a',sash:'#2a2a2a',vest:{col:'#d8d2c4',trim:'#c9a46a'},
    face:'mustache',hair:{type:'short',col:'#8a8a8a'},glasses:1,size:1.1,speed:.98,power:1.12,throwName:'EVERYBODY PAYS',sp:SP_UPPER('Kingpin Uppercut','HOSTILE TAKEOVER','#f2c14e')}),
  rais:npc({id:'rais',name:'RAIS EL BAHR',hud:'#ff8a6a',col:'#7a1f2b',arm:'#7a1f2b',fore:'#a8704a',skin:'#a8704a',pants:'#2a2a2a',shoe:'#1b1b1b',trim:'#e8c66a',sash:'#e8c66a',
    hat:'bandana',hatCol:'#1b1b1b',face:'beard',beardCol:'#1b1b1b',sword:1,cape:{col:'#1b1b1b',edge:'#e8c66a',front:false},size:1.1,speed:1,power:1.12,throwName:'WALK THE PLANK',sp:SP_RUSH('Boarding Rush','CORSAIR STORM','#ff8a6a')}),
  pygmalion:npc({id:'pygmalion',name:'PYGMALION',hud:'#c79bff',col:'#3e1f6b',skin:'#cf9c74',pants:'#e8c66a',shoe:'#e8c66a',trim:'#e8c66a',sash:'#e8c66a',
    hat:'crown',face:'beard',beardCol:'#1b120c',cape:{col:'#e8c66a',edge:'#3e1f6b',front:false},robe:{len:1.5,col:'#3e1f6b',trim:'#e8c66a'},size:1.1,speed:.96,power:1.12,throwName:'TYRE\'S GREED',sp:SP_PROJ('Tyrian Fire','GOLD OF TYRE','flame','#b26bff',{dmg:10})}),
  odysseus:npc({id:'odysseus',name:'ODYSSEUS',hud:'#9fd8ff',col:'#b9a27a',arm:'#c99a6e',fore:'#c99a6e',skin:'#c99a6e',pants:'#c99a6e',greave:'#b9a27a',shoe:'#6b4628',trim:'#e8c66a',sash:'#2f5f9f',
    hat:'helmet',shield:1,sword:1,face:'beard',beardCol:'#6b4020',cape:{col:'#2f5f9f',edge:'#e8c66a',front:false},robe:{len:.65,col:'#2f5f9f',trim:'#e8c66a',strips:1},
    basic:{lp:'n_shield',rp:'n_slash',lk:'n_teep',rk:'n_knee'},size:1.08,speed:1.02,power:1.1,throwName:'TROJAN TRICK',sp:SP_TELE('Trojan Trick','WINE-DARK SEA','#9fd8ff')}),
  irongen:npc({id:'irongen',name:'IRON GENERAL',hud:'#c9c9d2',col:'#5b6470',arm:'#5b6470',fore:'#b07a52',skin:'#b07a52',pants:'#3a3f48',greave:'#5b6470',shoe:'#2a2a2a',trim:'#c9c9d2',sash:'#7a1f2b',
    hat:'helmet',shield:1,sword:1,face:'beard',beardCol:'#2a1d17',cape:{col:'#7a1f2b',edge:'#c9c9d2',front:false},robe:{len:.6,col:'#3a3f48',trim:'#c9c9d2',strips:1},
    basic:{lp:'n_shield',rp:'n_slash',lk:'n_teep',rk:'n_knee'},size:1.12,speed:.92,power:1.15,throwName:'IRON GRIP',sp:SP_RUSH('Iron March','SIEGE ENGINE','#c9c9d2')}),
  ghoul:npc({id:'ghoul',name:'EL GHOUL',hud:'#a8d88a',col:'#3b2f2a',skin:'#7e8f6a',pants:'#3b2f2a',shoe:'#3b2f2a',trim:'#5a4a3a',sash:'#5a4a3a',hair:{type:'loose',col:'#e8e2d0'},
    face:'beard',beardCol:'#e8e2d0',robe:{len:1.6,col:'#3b2f2a',trim:'#5a4a3a'},size:1.2,speed:.95,power:1.15,tech:'float',throwName:'SAND SWALLOW',sp:SP_PROJ('Ghoul Fire','NIGHT OF THE DUNES','flame','#b26bff',{dmg:10})}),
  ghachach:npc({id:'ghachach',name:'EL GHACHACH',hud:'#f2c14e',col:'#1f1f26',skin:'#c49a72',pants:'#1f1f26',shoe:'#8a5a32',trim:'#f2c14e',sash:'#1f1f26',vest:{col:'#f2c14e',trim:'#1f1f26'},
    face:'mustache',glasses:1,cards:1,tech:'shuffle',size:1.1,speed:1,power:1.1,throwName:'HOUSE ALWAYS WINS',sp:SP_PROJ('Loaded Deal','STACKED DECK','card','#f2c14e',{dmg:10})}),
  consul:npc({id:'consul',name:'THE CONSUL',hud:'#ff8a8a',col:'#f0ece0',arm:'#c48a5c',fore:'#c48a5c',skin:'#c48a5c',pants:'#c48a5c',greave:'#c9c9d2',shoe:'#5a3a22',trim:'#9e1b28',sash:'#9e1b28',
    hat:'helmet',shield:1,sword:1,face:'stubble',cape:{col:'#9e1b28',edge:'#e8c66a',front:false},robe:{len:.75,col:'#f0ece0',trim:'#9e1b28',strips:1},
    basic:{lp:'n_shield',rp:'n_slash',lk:'n_teep',rk:'n_knee'},size:1.1,speed:.96,power:1.14,throwName:'SPQR',sp:SP_RUSH('Legion Charge','ROME ETERNAL','#ff8a8a')}),
  ghoula:npc({id:'ghoula',name:'EL GHOULA',g:'f',hud:'#b8e0a0',col:'#2f2a3a',skin:'#8a9a78',pants:'#2f2a3a',shoe:'#2f2a3a',trim:'#6a5a7a',sash:'#6a5a7a',hair:{type:'loose',col:'#151318'},
    earring:1,robe:{len:1.65,col:'#2f2a3a',trim:'#6a5a7a'},size:1.18,speed:.98,power:1.15,tech:'float',throwName:'BEDTIME',sp:SP_PROJ('Ghoula Fire','NO DINNER FOR YOU','flame','#b26bff',{dmg:10})}),
};
// chapter: [opponent, stage index, title, lines]; the last chapter is the boss (best of three)
// Side characters who only talk in the comic pages (they never fight).
const CAMEOS={
  hedi:npc({id:'hedi',name:'3AM HEDI',hud:'#e8d6a0',col:'#6b5a8a',skin:'#b98058',pants:'#3a3a48',shoe:'#5a3a22',trim:'#e8d6a0',sash:'#3a3a48',vest:{col:'#3a3a48',trim:'#e8d6a0'},
    hat:'chechia',face:'mustache',glasses:1,hunch:8,robe:{len:1.4,col:'#8a7a9a',trim:'#e8d6a0'}}),
  salem:npc({id:'salem',name:'3AM SALEM',hud:'#9fd0e8',col:'#3a5f8a',skin:'#a8704a',pants:'#3a5f8a',shoe:'#3a2a1e',trim:'#e9dcc0',sash:'#e9dcc0',
    hat:'straw',face:'beard',beardCol:'#e8e2d0',hunch:6}),
  acerbas:npc({id:'acerbas',name:'ACHERBAS',hud:'#f0e6c8',col:'#efe6d0',skin:'#c08a5e',pants:'#efe6d0',shoe:'#8a5a32',trim:'#b58ad8',sash:'#b58ad8',
    hat:'silverband',face:'beard',beardCol:'#2a1d17',robe:{len:1.6,col:'#efe6d0',trim:'#5b2a7a'}}),
  khalid:npc({id:'khalid',name:'KHALID',hud:'#a8d0ff',col:'#e9e2d0',skin:'#b98058',pants:'#e9e2d0',shoe:'#5a3a22',trim:'#2b4a8c',sash:'#2b4a8c',
    hat:'turban',face:'stubble',robe:{len:1.3,col:'#e9e2d0',trim:'#2b4a8c'}}),
  hamilcar:npc({id:'hamilcar',name:'HAMILCAR',hud:'#ffb36b',col:'#8a6a3a',arm:'#b07a52',fore:'#b07a52',skin:'#b07a52',pants:'#b07a52',greave:'#b8862e',shoe:'#5a3a22',trim:'#e8c66a',sash:'#5b2a7a',
    hat:'helmet',face:'beard',beardCol:'#4a4040',cape:{col:'#5b2a7a',edge:'#e8c66a',front:false},robe:{len:.65,col:'#5b2a7a',trim:'#e8c66a',strips:1},size:1.08}),
  kid:npc({id:'kid',name:'WLID KMAR',hud:'#ffd36b',col:'#d23a3a',skin:'#c08a62',pants:'#2b4a8c',shoe:'#f2f2f2',trim:'#f2f2f2',sash:'#2b4a8c',
    hair:{type:'short',col:'#1b120c'},size:.66}),
  boussaadia:npc({id:'boussaadia',name:'BOUSSAADIA',hud:'#ff6b6b',col:'#c8102e',arm:'#e8c66a',fore:'#5a3a22',skin:'#5a3a22',pants:'#2b4a8c',shoe:'#5a3a22',trim:'#e8c66a',sash:'#2f8f5a',
    hat:'chech',hatCol:'#f2c14e',face:'beard',beardCol:'#f2f2f2',robe:{len:1.5,col:'#c8102e',trim:'#2f8f5a',dots:'#f2c14e'},bangle:1,bangleCol:'#f2f2f2'}),
};
/* Comic stories. A line is [who, text, hints]:
   who  'n' caption, 'h' hero, 'e' this chapter's opponent, or a CAMEOS id.
   hints (optional, space separated): night snow fog (panel mood), empty (no one in the picture),
   with:<cameo> (put a side character in the picture), pose:<pose> (speaker), opp:<pose> (the other one),
   kid (draw the hero as a child), bg:<stage> (other background), sfx:<WORD>.
   A chapter is [opponent, stage, title, lines before the fight, lines after you win]. */
const STORIES={
  hamma:{intro:[
      ['n','Sidi Bou Said, on the cliff above the Gulf of Tunis. The village is named after a saint, Abu Said al-Baji, who came to this hill 800 years ago to pray and watch the sea.','empty'],
      ['n','A century ago a baron made it a rule: every wall white, every door and window blue. Painters like Paul Klee came for the light.'],
      ['hedi','Hamma! They smashed your café! The tables, the bird cages, the tea glasses... everything!'],
      ['h','Who did this, 3am Hedi?','pose:hitHigh'],
      ['hedi','Men in tracksuits. A man called El Boss wants every shop on the hill to pay him. Or he paints the whole village grey.'],
      ['h','Grey? In Sidi Bou Said?! Brew a fresh pot of tea, with pine nuts. I\'ll be back before it\'s cold.','pose:win']],
    ch:[['bandi',0,'The blue door',[
          ['n','Place des Nattes. One of El Boss\'s men waits by the café steps with a bucket of paint.'],
          ['e','Nice blue door. Shame if someone painted it grey.'],
          ['h','That blue is older than your grandfather.'],
          ['e','El Boss says grey is the new blue.'],
          ['h','Touch that door and you\'ll swim home.','pose:jab']],[
          ['e','Okay, okay! The money goes down to the Medina. A shop behind the chechia makers!'],
          ['h','Then that\'s where I\'m having lunch.']]],
        ['contra',1,'Down in the Medina',[
          ['n','The Medina of Tunis. Behind Souk Ech-Chaouachine, where chechias have been made since 1691, a smuggler counts the gang\'s money.'],
          ['e','You\'re far from your café, ya Hamma.'],
          ['h','And you\'re far from your excuses.'],
          ['e','Everyone on the hill pays. The jasmine sellers, the bambalouni stand, everyone.'],
          ['h','Not anymore.','pose:rush']],[
          ['e','El Boss plays cards every night at Café M\'Rabet. Don\'t tell him I told you!'],
          ['h','I\'ll tell him you were very helpful.']]],
        ['bandi',5,'Café M\'Rabet',[
          ['n','Café M\'Rabet, the oldest café in Tunis. El Boss\'s bodyguard blocks the stairs.'],
          ['e','El Boss is busy. Leave a message.'],
          ['h','I\'ll leave it on your face.','pose:jab']],[
          ['n','Under the card table, a plan: a giant hotel on the cliff, and every blue door painted over.'],
          ['h','He wants to sell the view. The view isn\'t his to sell.']]],
        ['elboss',0,'El Boss',[
          ['n','Night on the cliff. The lighthouse hill, Jbel el-Menar, glows with the headlights of El Boss\'s paint trucks.','night empty'],
          ['e','Everyone pays. Even the sea pays me to stay blue.','night'],
          ['h','The sea was blue before you, and it will be blue after you.','night'],
          ['e','Grey hotels, grey doors, grey money. It\'s modern, ya Hamma.','night'],
          ['h','Today you pay the bill.','night pose:rush']]]],
    end:[['n','The paint trucks roll back down the hill, empty.'],
      ['hedi','Your tea, Hamma. Still hot.','pose:win'],
      ['h','Free tea for everyone this week. Sidi Bou Said stays blue.','pose:win']]},

  brik:{intro:[
      ['n','La Goulette, the port of Tunis. Tunisians, Sicilians and Maltese have fished and cooked side by side on this quay for generations.','empty bg:4'],
      ['n','Mokhtar, called Brik, has unloaded boats here for twenty years.'],
      ['salem','Brik, my crates are gone again. Third night this week.'],
      ['h','Fish don\'t walk, 3am Salem. Somebody is carrying them.'],
      ['salem','In my grandfather\'s time it was the corsairs. They say Barbarossa himself held this port.'],
      ['h','Barbarossa has been dead for five hundred years. Tonight I\'m hunting someone alive.','night pose:win']],
    ch:[['contra',4,'Night shift',[
          ['n','Midnight on the quay. A man in a leather jacket loads crates into a van.','night'],
          ['e','Mind your own crates, dock boy.','night'],
          ['h','I am. They\'re full of my fish.','night'],
          ['e','Fish belong to whoever holds them.','night'],
          ['h','Then hold this.','night pose:jab']],[
          ['e','I only drive the van! The fish go to the souk in the morning!','night'],
          ['h','Then I\'m going shopping.','night']]],
        ['bandi',1,'Fish in the souk',[
          ['n','The stolen fish turn up in the souk, at twice the price.'],
          ['e','Fresh fish! Very fresh! Very cheap!'],
          ['h','Very stolen.'],
          ['e','Every fish looks the same, ya m3allem.'],
          ['h','Not this one. This one has a La Goulette accent.']],[
          ['e','Talk to the bookkeeper! He plays cards at the café!']]],
        ['sharper',5,'The bookkeeper',[
          ['n','The smugglers\' bookkeeper spends their money on cards.'],
          ['e','One hand of chkobba, and the debt is yours.'],
          ['h','I don\'t play cards. I play brik.'],
          ['e','Brik? The pastry?'],
          ['h','Crispy outside, soft inside. Except me.','pose:rush']],[
          ['n','In the bookkeeper\'s ledger, one name signed in red ink: Rais el Bahr, the captain of the sea.'],
          ['h','A pirate name. Of course.']]],
        ['rais',4,'Rais el Bahr',[
          ['n','In 1534 the corsair Barbarossa took Tunis and made La Goulette his base. A year later Emperor Charles V sailed in with a huge fleet and took the fort.','empty night'],
          ['n','Tonight a black ship flies a corsair flag over the same water.','night'],
          ['e','La Goulette was a corsair port long before it was yours.','night'],
          ['h','And now it\'s a working port, with working people.','night'],
          ['e','Barbarossa\'s blood runs in my veins!','night'],
          ['h','And fish oil runs in mine. Let\'s see who slips.','night pose:rush']]]],
    end:[['n','The smugglers\' ship is towed back to the quay and the fish go back to the fishermen.'],
      ['salem','Fried fish and brik for the whole quay. On me!'],
      ['h','With an egg inside. And no corsairs.','pose:win']]},

  alyssa:{intro:[
      ['n','Tyre, a rich Phoenician city on the coast of Lebanon, around 814 BC.','empty bg:4'],
      ['acerbas','Elissa, your brother the king asks about my gold every day.'],
      ['h','Pygmalion wants everything, Acherbas. Hide it well.'],
      ['n','That winter, King Pygmalion had Acherbas, priest of Melqart and Elissa\'s husband, murdered for his treasure.','night empty'],
      ['h','He killed you for gold. I will take it far from his reach.','night pose:hitMid']],
    ch:[['guard',4,'Escape from Tyre',[
          ['n','Elissa loads the treasure onto ships. On deck, her sailors throw heavy sacks into the sea: a gift for the dead, they say.','night'],
          ['e','The king wants his gold back.','night'],
          ['h','Those sacks were full of sand. The gold is already gone.','night'],
          ['e','Then you\'ll follow it to the bottom of the sea.','night'],
          ['h','It was never his.','night pose:cast']],[
          ['n','The ships slip out of the harbour. The sailors who stayed loyal sail west with her.','night'],
          ['h','No more tyrants for us. We sail.','night pose:win']]],
        ['raider',3,'A foreign shore',[
          ['n','After a stop in Cyprus, the ships land on the coast of Africa. Local warriors come down to the beach.'],
          ['e','Strangers buy land here. They don\'t take it.'],
          ['h','Then sell me as much as an oxhide can cover.'],
          ['e','One oxhide? Ha! Prove your people are strong enough to keep it.'],
          ['h','Gladly.','pose:cast']],[
          ['n','Elissa cuts the hide into strips as thin as thread and lays them end to end. They go all the way around a hill: Byrsa.'],
          ['e','That is... a very long cow.'],
          ['h','A deal is a deal.']]],
        ['guard',2,'Followed',[
          ['n','The new city grows fast. But Pygmalion\'s soldiers have followed her ships.'],
          ['e','You can\'t hide behind a cow skin, queen.'],
          ['h','Watch me build a city with it.'],
          ['e','Tyre will burn this place to the ground.'],
          ['h','Tyre is far away. Carthage is here.']],[
          ['n','The captured soldier gives up his orders: the king himself has sailed to bring her home in chains.'],
          ['h','Let him come.']]],
        ['pygmalion',0,'Pygmalion',[
          ['n','On the hill of Byrsa, under the new walls, a brother and a sister face each other.'],
          ['e','Sister. Come home, and bring my gold.'],
          ['h','You killed my husband for that gold.'],
          ['e','Gold has no husband. Gold has a king.'],
          ['h','My home is here now. It will be called the new city.','pose:cast']]]],
    end:[['n','The city Elissa founds is called Qart-Hadasht, the new city: Carthage.'],
      ['n','Later, King Iarbas of the Maxitani demands her hand and threatens war. The legend says she stayed loyal to Acherbas to the very end.'],
      ['h','Build walls, build ships, and never bow to a tyrant. That is Carthage.','pose:win']]},

  selma:{intro:[
      ['n','Homer wrote that a storm pushed Odysseus to the land of the Lotus-eaters. His sailors ate the sweet lotus and forgot their way home. Many say that land was Djerba.','empty'],
      ['n','Three thousand years later, Selma lays her clay octopus pots on the sand at dawn, like her grandmother did.'],
      ['h','One pot, one octopus. The sea gives, if you are patient.'],
      ['n','One morning a strange ship anchors off Houmt Souk. By evening every pot on the beach is gone.','night empty'],
      ['h','My pots! Who steals a fisherwoman\'s pots?','night pose:hitHigh']],
    ch:[['sailor',4,'Strangers on the beach',[
          ['e','We only take lotus. And pots. And nets.'],
          ['h','Put them down before I put you down.'],
          ['e','Our captain needs them. He has a long way home.'],
          ['h','Then he can ask. In Djerba we share. We don\'t steal.','pose:cast']],[
          ['e','The captain already sold half of them... to a man near the old fort!'],
          ['h','Then I\'ll buy them back. With my fists.']]],
        ['contra',4,'The buyer',[
          ['n','Near the fort of Borj el Kebir, a smuggler is buying the stolen pots by the dozen.'],
          ['e','Clay is clay. I pay cash.'],
          ['h','Those pots feed families.'],
          ['e','Tourists pay ten dinars each. Decoration!'],
          ['h','An octopus pot is not a vase!','pose:jab']],[
          ['n','The smuggler points to the café by the harbour. The sailors are celebrating.']]],
        ['sailor',5,'Shore leave',[
          ['n','The sailors celebrate in a café, with lotus in their tea.'],
          ['e','Stay a while... forget your nets...'],
          ['h','I never forget a net.'],
          ['e','Why go home... when you can sit here... forever...'],
          ['h','Because the sea is waiting. Wake up!','pose:jab sfx:SPLASH!']],[
          ['e','The captain... he says he beat a Cyclops... and sailed past the Sirens...'],
          ['h','Let\'s see if he can sail past me.']]],
        ['odysseus',4,'The wanderer',[
          ['n','On the deck of the strange ship stands a man with ten years of sea in his eyes.'],
          ['e','I am Odysseus, son of Laertes. I blinded a Cyclops and I sailed past the Sirens.'],
          ['h','And you took my octopus pots.'],
          ['e','A hero needs supplies. My men love octopus.'],
          ['h','You haven\'t met a fisherwoman from Djerba.','pose:cast']]]],
    end:[['n','The pots go back to the sand. Odysseus leaves with a little lotus, and a lot of respect.'],
      ['e','Ithaca is that way, right?'],
      ['h','Keep the sun on your left. And don\'t come back hungry.','pose:win'],
      ['n','Some say Selma\'s net is still in the Odyssey, somewhere between the lines.']]},

  dihya:{intro:[
      ['n','The Aurès mountains, end of the 7th century. Dihya leads the Amazigh tribes. Her enemies call her al-Kahina, the priestess, because they say she can see the future.','empty bg:3'],
      ['n','In 698 she defeats a great army at the river Meskiana and drives it out of the land.'],
      ['khalid','I am your prisoner, queen. Do what you want with me.'],
      ['h','I have two sons. Today I have three. You are my son now, Khalid.'],
      ['n','Legend says she adopted the captured officer with a mother\'s ritual: bsisa of barley and oil, shared like milk.']],
    ch:[['legion',3,'The passes',[
          ['n','Years pass. The army returns, bigger than before, and marches on the mountain passes.'],
          ['e','Your mountains will bow.'],
          ['h','Mountains don\'t bow. Neither do I.','pose:rush']],[
          ['khalid','Mother, they are too many this time. Their general is made of iron.'],
          ['h','Then we leave them nothing to take.']]],
        ['raider',3,'The orchards',[
          ['n','Legend says Dihya burned the land in front of the army so it would find no food. Raiders take the chance to loot.'],
          ['e','No fields, no food, no fight.'],
          ['h','Then I\'ll fight hungry.'],
          ['e','The oasis people curse your name.'],
          ['h','Let them curse. I\'ll still protect them.']],[
          ['n','The towns of the plain turn against her. Her army grows smaller every day.'],
          ['h','Then we fall back. To the stone walls of El Jem.']]],
        ['legion',2,'El Jem',[
          ['n','She falls back to the great amphitheatre of El Jem, built by Rome for 35,000 people.'],
          ['e','These walls won\'t save you.'],
          ['h','I don\'t need walls. I need room.','pose:rush']],[
          ['n','That night Dihya dreams of her own end. She calls her sons to her.','night'],
          ['h','Go to the other camp, my sons. Khalid will keep you safe. The mountains must live, even if I don\'t.','night with:khalid'],
          ['khalid','Mother...','night']]],
        ['irongen',2,'The Iron General',[
          ['n','Dawn. Her hair loose in the wind, the queen stands alone in the arena.'],
          ['e','Your walls are stone. My army is iron.'],
          ['h','Iron rusts. The mountains stay.'],
          ['e','You know how this ends, priestess.'],
          ['h','I know. That\'s why I\'m not afraid.','pose:rush']]]],
    end:[['n','The legend says she fell near a well that still carries her name: Bir al-Kahina.'],
      ['n','Her sons lived on, and in the Aurès they still sing of the queen who never knelt.'],
      ['h','Remember me when the wind blows through the passes.','pose:win']]},

  zied:{intro:[
      ['n','Douz, the gateway to the Sahara. Half a million palm trees, the sweetest deglet nour dates, and after that, only sand.','empty'],
      ['n','Every winter the town holds the Festival of the Sahara, which began in 1910 as a camel festival: camel races, salukis, horses, and poetry under the stars.'],
      ['h','I\'m Zied. I guide tourists across the dunes. I know every one of them by name.'],
      ['n','But this year the guides whisper that something walks the dunes at night and eats the tourists\' sandals: El Ghoul.','night empty'],
      ['h','A ghoul? In my desert? Not during festival week.','night pose:win']],
    ch:[['raider',3,'Desert road',[
          ['n','On the road out of town, raiders stop a group of tourists.'],
          ['e','Your tourists\' wallets are ours.'],
          ['h','In the desert, the guide decides.'],
          ['e','The Ghoul takes their shoes, we take their money. Fair.'],
          ['h','Nothing about this is fair.','pose:rush']],[
          ['e','Our camp... behind the third dune... even the Ghoul doesn\'t go there.']]],
        ['raider',3,'Behind the third dune',[
          ['n','The raiders\' camp is behind the third dune, lit by one small fire.','night'],
          ['e','Nobody finds this camp.','night'],
          ['h','I was born here. I find everything.','night'],
          ['e','Then find your way home, desert boy.','night'],
          ['h','My home is the whole Sahara.','night pose:rush']],[
          ['n','In the camp: a pile of sandals, a saluki\'s collar, and footprints too big for any man.','night'],
          ['h','The prints go back to town. To the café.','night']]],
        ['bandi',5,'Word in the café',[
          ['n','A bandit in the café knows where the Ghoul sleeps.'],
          ['e','Ask nicely.'],
          ['h','I am asking nicely.'],
          ['e','Buy me a tea first.'],
          ['h','I\'ll buy you a pillow. You\'ll need it.','pose:jab']],[
          ['e','The old Roman well... south of the palms... he sleeps there in the day...'],
          ['h','Then tonight I wake him up.']]],
        ['ghoul',3,'El Ghoul',[
          ['n','Midnight under the stars of the Great Erg. Something huge climbs out of the old well.','night empty'],
          ['e','Ghhhrr... sandals...','night'],
          ['h','Find your own sandals!','night'],
          ['e','Ghhh... festival... too loud... Ghoul can\'t sleep...','night'],
          ['h','Then come and dance, or go to sleep. Choose.','night pose:rush']]]],
    end:[['n','El Ghoul runs off into the Sahara with one sandal in his mouth.'],
      ['n','The camels race, the salukis run, and the poets sing until dawn.'],
      ['h','And next year, El Ghoul gets earplugs.','pose:win']]},

  salah:{intro:[
      ['n','Café M\'Rabet, the oldest café in Tunis, opened in the 1600s. On its banquettes, chkobba has been played for centuries.','empty'],
      ['n','In chkobba the seven of diamonds is the most precious card of all. Take it, and you\'re halfway to winning.'],
      ['n','Nobody has beaten Salah at chkobba in forty years. Then a stranger in a shiny suit sits down at the table.'],
      ['hedi','Salah, he has won every game for a week. The regulars have lost their wages!'],
      ['h','Every game? Then he isn\'t lucky. He\'s busy.']],
    ch:[['sharper',5,'A lucky stranger',[
          ['e','The seven of diamonds again? What luck!'],
          ['h','Luck doesn\'t keep two of them up its sleeve.'],
          ['e','Are you calling me a cheat, old man?'],
          ['h','I\'m calling you a beginner. A good cheat hides it better.','pose:cast']],[
          ['e','I just play! The boss gives me the decks... a lookout brings them from the souk.']]],
        ['bandi',1,'The lookout',[
          ['n','The cheats have a lookout in the souk.'],
          ['e','Old man, go home and sleep.'],
          ['h','At my age you sleep less and see more.'],
          ['e','What can you see with those glasses?'],
          ['h','Your next move. And the one after.','pose:jab']],[
          ['n','In the lookout\'s bag: an ink stamp, and new decks of cards still in their paper.'],
          ['h','Marked cards. Printed right here.']]],
        ['sharper',1,'The marked deck',[
          ['n','The deck they play with is marked. The printer works in a back room of the souk.'],
          ['e','A card is a card.'],
          ['h','And a cheat is a cheat.'],
          ['e','Nobody will ever know.'],
          ['h','I knew from the first chkobba.','pose:cast']],[
          ['e','El Ghachach... the big boss... he plays tonight at M\'Rabet, for the whole pot.']]],
        ['ghachach',5,'El Ghachach',[
          ['n','Midnight. The whole café is watching. On the table: every regular\'s wages.','night'],
          ['e','I am El Ghachach. I never lose.','night'],
          ['h','In chkobba, the cards decide. Not you.','night'],
          ['e','Then let\'s play with fists, old man.','night'],
          ['h','Tonight you learn what a chkobba feels like.','night pose:cast']]]],
    end:[['n','The marked decks go into the fire and the regulars get their wages back.'],
      ['hedi','One more game, Salah? A fair one.'],
      ['h','Deal. The seven of diamonds is mine anyway.','pose:win']]},

  hannibal:{intro:[
      ['n','Carthage, 237 BC. Before he leaves for Spain, the general Hamilcar Barca takes his nine-year-old son to the altar.','kid with:hamilcar'],
      ['hamilcar','Swear it, my son. Swear you will never be a friend of Rome.','kid'],
      ['h','I swear it, father. Never.','kid'],
      ['n','Nineteen years later, Rome declares war. Hannibal leaves Spain with about 50,000 soldiers and 37 war elephants.'],
      ['h','They expect us by sea. We go by land. Over the Alps.','pose:win']],
    ch:[['legion',3,'The Alps',[
          ['n','First the river Rhône: the elephants cross on rafts covered with earth, so they think they are still on land.'],
          ['n','Then the Alps. Snow, rockfalls, and fifteen days of climbing.','snow'],
          ['e','Nobody crosses the Alps with elephants.','snow'],
          ['h','Then you\'ll have to tell Rome you were wrong.','snow pose:rush']],[
          ['n','Half his army is lost in the mountains. But Hannibal comes down into Italy, and Rome panics.','snow'],
          ['h','The hardest enemy was the snow. The rest is easy.','snow']]],
        ['legion',4,'Lake Trasimene',[
          ['n','217 BC. Morning fog on Lake Trasimene. Hannibal hides his army in the hills above the shore.','fog empty'],
          ['n','The Romans march straight into the fog.','fog'],
          ['e','Where did they come from?','fog pose:block'],
          ['h','From everywhere.','fog pose:rush']],[
          ['n','In three hours the Roman army is gone. On the march, Hannibal lost an eye to fever. Never his nerve.','fog']]],
        ['legion',3,'The road to Cannae',[
          ['n','Summer, 216 BC, the plain of Cannae. Rome sends its biggest army yet.'],
          ['e','There are eighty thousand of us.'],
          ['h','Then I\'ll need a plan.'],
          ['e','Your centre is thin. We\'ll break right through.'],
          ['h','That is exactly what I want you to do.']],[
          ['n','His thin centre falls back on purpose. The Romans push in, and the African cavalry closes the circle behind them.']]],
        ['consul',2,'The Consul',[
          ['n','In the middle of the circle, a Roman consul refuses to run.'],
          ['e','Rome does not lose.'],
          ['h','Rome has never met Carthage.'],
          ['e','You win battles, Carthaginian. Rome wins wars.'],
          ['h','Then remember this battle forever.','pose:rush']]]],
    end:[['n','Cannae is still taught in military schools as the perfect battle.'],
      ['n','Hannibal never takes Rome. But for years Roman parents scare their children with three words: Hannibal ad portas. Hannibal is at the gates.'],
      ['h','I kept my oath, father.','pose:win']]},

  kmar:{intro:[
      ['n','Tunis, after school. Kmar has five children, a pot of couscous on the stove, and no patience left.','empty'],
      ['kid','Ommi! The bandis took my football!'],
      ['h','Who? Where? Show me.','pose:hitHigh'],
      ['kid','Near the souk... and they laughed at me!'],
      ['h','Nobody laughs at my son. Watch the couscous.','pose:win']],
    ch:[['bandi',1,'The football',[
          ['e','Go home, ya mra.'],
          ['h','Go home, ya wlidi. To YOUR mother.'],
          ['e','What are you going to do, hit me with a slipper?'],
          ['h','Good idea.','pose:cast']],[
          ['e','We sold it! A man in the souk buys everything!']]],
        ['contra',1,'Stolen goods',[
          ['n','The bandis sell stolen footballs in the souk.'],
          ['e','Five dinars, madame. Good price.'],
          ['h','I know that ball. I sewed that ball.'],
          ['e','Ten dinars, then. It\'s an antique.'],
          ['h','I\'ll give you one slipper. Free.','pose:cast']],[
          ['n','The ball is gone, sold to the gang\'s leader, who hides in the café.']]],
        ['sharper',5,'The ringleader',[
          ['n','Their leader hides in the café.'],
          ['e','Women don\'t come in here.'],
          ['h','Mothers go everywhere.'],
          ['e','The ball? I gave it away. To someone who doesn\'t sleep at night...'],
          ['h','Talk clearly or my slipper talks for me.','pose:cast']],[
          ['n','Outside, drums and iron castanets. Boussaadia dances down the street with laughing children behind him.','with:boussaadia'],
          ['boussaadia','I lost my daughter Saadia long ago, lalla. I still look for her in every street. I know where lost things go.'],
          ['boussaadia','El Ghoula has your son\'s ball. She lives where the old stories live: behind the souk, after dark.'],
          ['h','Then I\'m going to visit the old stories.']]],
        ['ghoula',1,'El Ghoula',[
          ['n','Kmar always told her children El Ghoula would come if they didn\'t sleep. Tonight El Ghoula is real, and she has the football.','night'],
          ['e','Hhhh... I eat naughty children!','night'],
          ['h','And I eat ghoulas for breakfast. Barra a9ra!','night'],
          ['e','But your children don\'t sleep! They play football at midnight!','night'],
          ['h','...Okay, that part is true. But the ball is ours.','night pose:cast']]]],
    end:[['n','The football comes home, and El Ghoula goes back into the bedtime stories.'],
      ['kid','Ommi, you beat El Ghoula?!'],
      ['h','Bed. Now. Or I call her back.','pose:win'],
      ['n','Dinner is on the table at eight sharp. Somewhere in the Medina, Boussaadia\'s drums are still looking for Saadia.']]},
};
