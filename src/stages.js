const STAGES=[
  {id:'sbs',name:'Sidi Bou Said',sub:'Blue and white since the 1920s, bougainvillea on the walls',draw:t=>{stageSBS(t);extraSBS(t)}},
  {id:'medina',name:'Medina of Tunis',sub:'Souk Ech-Chaouachine, chechia makers since 1691',draw:t=>{stageMedina(t);extraMedina(t)}},
  {id:'eljem',name:'El Jem',sub:'Amphitheatre for 35,000, built around 238 AD. Dihya\'s last stand.',draw:stageElJem},
  {id:'sahara',name:'Douz Dunes',sub:'Gateway to the Sahara. Salukis race at the festival.',draw:t=>{stageSahara(t);extraSahara(t)}},
  {id:'djerba',name:'Djerba Harbor',sub:'Fishing boats, gulls and clay octopus pots',draw:t=>{stageDjerba(t);extraDjerba(t)}},
  {id:'cafe',name:'Café M\'Rabet',sub:'The oldest café in Tunis, early 1600s. Chkobba on the banquette.',draw:stageCafe},
];
let crowd=0;

function arch(x,y,w,h){ctx.beginPath();ctx.moveTo(x,y+h);ctx.lineTo(x,y+w/2);ctx.arc(x+w/2,y+w/2,w/2,Math.PI,0);ctx.lineTo(x+w,y+h);ctx.closePath()}
function grille(x,y,w,h){ctx.fillStyle='#1c63b0';arch(x,y,w,h);ctx.fill();ctx.strokeStyle='#124a86';ctx.lineWidth=1.2;ctx.beginPath();
  for(let i=1;i<4;i++){ctx.moveTo(x+w*i/4,y+3);ctx.lineTo(x+w*i/4,y+h)}for(let j=1;j<5;j++){ctx.moveTo(x,y+h*j/5);ctx.lineTo(x+w,y+h*j/5)}ctx.stroke()}
function lgrad(y0,y1,stops,bands=9){
  const rgb=c=>[parseInt(c.slice(1,3),16),parseInt(c.slice(3,5),16),parseInt(c.slice(5,7),16)],cs=stops.map(rgb),g=ctx.createLinearGradient(0,y0,0,y1);
  for(let i=0;i<bands;i++){const t=i/(bands-1)*(cs.length-1),j=Math.min(cs.length-2,Math.floor(t)),u=t-j,c=cs[j].map((v,k)=>Math.round(v+(cs[j+1][k]-v)*u));
    const col=`rgb(${c[0]},${c[1]},${c[2]})`;g.addColorStop(i/bands,col);g.addColorStop(Math.min(1,(i+1)/bands-1e-4),col)}
  return g}
function palm(x,y,h,t,col='#2f7d4f',trunk='#7a5532'){const sway=Math.sin(t*.9+x)*3,tx=x+h*.12+sway,ty=y-h;
  ctx.strokeStyle=trunk;ctx.lineWidth=h/20;ctx.beginPath();ctx.moveTo(x,y);ctx.quadraticCurveTo(x-h*.06,y-h*.5,tx,ty);ctx.stroke();
  ctx.strokeStyle=col;ctx.lineWidth=h/36;for(let i=0;i<8;i++){const a=-Math.PI/2+(i-3.5)*.45+Math.sin(t*1.3+i)*.04,L=h*(.32+(i%3)*.05);
    ctx.beginPath();ctx.moveTo(tx,ty);ctx.quadraticCurveTo(tx+Math.cos(a)*L*.6,ty+Math.sin(a)*L*.6-h*.08,tx+Math.cos(a)*L,ty+Math.sin(a)*L+h*.1);ctx.stroke()}}
function zellige(y){const tiles=['#1c63b0','#f2c14e','#2f8a5b','#f6efe3','#c8102e','#f2c14e'];
  for(let x=-300,i=0;x<SW+300;x+=14,i++){ctx.fillStyle=tiles[i%tiles.length];ctx.beginPath();ctx.moveTo(x+7,y);ctx.lineTo(x+14,y+7);ctx.lineTo(x+7,y+14);ctx.lineTo(x,y+7);ctx.fill()}
  ctx.fillStyle='#1c63b0';ctx.fillRect(-300,y-4,SW+600,3);ctx.fillRect(-300,y+15,SW+600,2)}
function lanterns(x0,x1,y0,t){const ly=x=>y0+Math.sin((x-x0)/(x1-x0)*Math.PI)*22;
  ctx.strokeStyle='rgba(60,40,30,.6)';ctx.lineWidth=1.2;ctx.beginPath();for(let x=x0;x<=x1;x+=10)x===x0?ctx.moveTo(x,ly(x)):ctx.lineTo(x,ly(x));ctx.stroke();
  for(let x=x0+50;x<x1;x+=70){const b=ly(x),s=Math.sin(t*1.6+x)*2;ctx.fillStyle='rgba(255,210,120,.35)';ctx.beginPath();ctx.arc(x+s,b+12,11,0,7);ctx.fill();
    ctx.fillStyle='#e8a33d';ctx.beginPath();ctx.moveTo(x+s,b+2);ctx.lineTo(x+s+5,b+9);ctx.lineTo(x+s+4,b+18);ctx.lineTo(x+s-4,b+18);ctx.lineTo(x+s-5,b+9);ctx.fill()}}
function floorTiles(c,line){ctx.fillStyle=c;ctx.fillRect(-300,GROUND,SW+600,200);ctx.strokeStyle=line;ctx.lineWidth=1.5;
  for(let i=-8;i<24;i++){ctx.beginPath();ctx.moveTo(i*50,GROUND);ctx.lineTo(i*50+(i*50-SW/2)*.35,SH+60);ctx.stroke()}
  for(const y of [GROUND+16,GROUND+38]){ctx.beginPath();ctx.moveTo(-300,y);ctx.lineTo(SW+300,y);ctx.stroke()}
  ctx.fillStyle='rgba(255,255,255,.25)';ctx.fillRect(-300,GROUND,SW+600,2)}

function stageSBS(t){
  const WHITE='#f6efe3',WS='#e3d3bf';
  ctx.fillStyle=lgrad(0,270,['#5e9ccf','#f2c4a0','#f7a463']);ctx.fillRect(-300,-200,SW+600,480);
  ctx.fillStyle='rgba(255,225,160,.45)';ctx.beginPath();ctx.arc(170,246,56,0,7);ctx.fill();ctx.fillStyle='#ffe3a3';ctx.beginPath();ctx.arc(170,246,32,0,7);ctx.fill();
  ctx.fillStyle='#b88da0';ctx.beginPath();ctx.moveTo(-300,268);for(let x=-300;x<=SW+300;x+=40)ctx.lineTo(x,260-Math.sin(x*.012)*7-Math.sin(x*.031)*4);ctx.lineTo(SW+300,270);ctx.fill();
  ctx.fillStyle=lgrad(264,370,['#3b86bf','#16507f']);ctx.fillRect(-300,264,SW+600,130);
  ctx.strokeStyle='rgba(255,226,170,.7)';ctx.lineWidth=2;for(let i=0;i<7;i++){const y=270+i*8,w=48-i*4+Math.sin(t*2+i)*6;ctx.beginPath();ctx.moveTo(170-w,y);ctx.lineTo(170+w,y);ctx.stroke()}
  const fx=((t*9)%1100)-150;ctx.fillStyle='#3a2a20';ctx.beginPath();ctx.moveTo(fx-16,282);ctx.lineTo(fx+16,282);ctx.lineTo(fx+11,288);ctx.lineTo(fx-11,288);ctx.fill();
  ctx.fillStyle=WHITE;ctx.beginPath();ctx.moveTo(fx-2,281);ctx.lineTo(fx+2,256);ctx.lineTo(fx+15,281);ctx.fill();
  ctx.fillStyle='#8a9a5b';ctx.beginPath();ctx.moveTo(300,370);ctx.quadraticCurveTo(440,262,SW+300,272);ctx.lineTo(SW+300,370);ctx.fill();
  ctx.beginPath();ctx.moveTo(-300,370);ctx.lineTo(-300,300);ctx.quadraticCurveTo(40,292,140,370);ctx.fill();
  for(const[x,w,h,kind,win] of [[330,70,62,1,0],[396,58,84,0,1],[448,30,150,2,0],[474,66,70,0,1],[536,54,96,1,0],[586,74,58,0,1],[-20,60,52,0,1],[34,48,74,1,0]]){
    const base=352,top=base-h;
    if(kind===2){ctx.fillStyle=WHITE;ctx.fillRect(x,top,w,h);ctx.fillStyle=WS;ctx.fillRect(x+w-7,top,7,h);ctx.fillStyle=WHITE;ctx.fillRect(x-4,top+20,w+8,6);ctx.fillRect(x+4,top-18,w-8,18);
      ctx.fillStyle='#2f8a5b';ctx.beginPath();ctx.moveTo(x+1,top-18);ctx.lineTo(x+w/2,top-34);ctx.lineTo(x+w-1,top-18);ctx.fill();grille(x+9,top+40,12,20);continue}
    ctx.fillStyle=WHITE;ctx.fillRect(x,top,w,h);ctx.fillStyle=WS;ctx.fillRect(x+w-8,top,8,h);
    if(kind===1){ctx.fillStyle=WHITE;ctx.beginPath();ctx.arc(x+w*.4,top,w*.26,Math.PI,0);ctx.fill()}
    grille(x+10,top+14,13,20);if(win)grille(x+w-28,top+14,13,20);ctx.fillStyle='#1c63b0';arch(x+w*.42,base-26,13,26);ctx.fill()}
  lanterns(120,660,214,t);
  ctx.fillStyle=WHITE;ctx.fillRect(-300,350,SW+600,GROUND-350);zellige(354);
  ctx.fillStyle=WHITE;ctx.fillRect(668,196,SW+300,GROUND-196);ctx.fillStyle=WS;ctx.fillRect(668,196,6,GROUND-196);
  ctx.fillStyle='#1c63b0';arch(704,282,62,GROUND-282);ctx.fill();ctx.strokeStyle='#124a86';ctx.lineWidth=3;arch(704,282,62,GROUND-282);ctx.stroke();
  ctx.fillStyle=INK;for(let r=0;r<5;r++)for(let c=0;c<4;c++)ctx.fillRect(712+c*14+(r%2)*7,318+r*14,2.5,2.5);
  ctx.beginPath();ctx.arc(735,312,9,0,7);ctx.strokeStyle=INK;ctx.lineWidth=3;ctx.stroke();grille(712,216,46,46);
  for(const[x,y,r] of [[668,198,16],[690,194,14],[652,212,13],[676,226,12],[660,240,10],[700,206,10],[648,258,8],[686,248,7]]){
    ctx.fillStyle='#2f7d4f';ctx.beginPath();ctx.arc(x+3,y+3,r,0,7);ctx.fill();ctx.fillStyle='#d6336c';ctx.beginPath();ctx.arc(x,y,r*.85,0,7);ctx.fill();ctx.fillStyle='#f06595';ctx.beginPath();ctx.arc(x-r*.3,y-r*.3,r*.35,0,7);ctx.fill()}
  palm(70,372,180,t);ctx.fillStyle='#b5582c';ctx.beginPath();ctx.moveTo(46,350);ctx.lineTo(96,350);ctx.lineTo(88,GROUND);ctx.lineTo(54,GROUND);ctx.fill();ctx.fillStyle='#8f4320';ctx.fillRect(44,348,54,6);
  floorTiles('#d4875a','#b46a3e');
}

function stageMedina(t){
  ctx.fillStyle='#2a1a12';ctx.fillRect(-300,-200,SW+600,GROUND+200);
  ctx.fillStyle='#d9b98a';ctx.fillRect(-300,60,SW+600,GROUND-60);
  ctx.strokeStyle='#4a2f1e';ctx.lineWidth=10;for(let x=-280;x<SW+300;x+=90){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,60);ctx.stroke()}
  ctx.fillStyle='#4a2f1e';ctx.fillRect(-300,52,SW+600,12);
  for(let i=-1;i<7;i++){const x=i*130+10,w=96,top=120;
    ctx.fillStyle='#5a3b25';arch(x,top,w,GROUND-top-38);ctx.fill();
    ctx.fillStyle='rgba(255,190,90,.18)';arch(x,top,w,GROUND-top-38);ctx.fill();
    for(let r=0;r<3;r++){const sy=top+60+r*52;ctx.fillStyle='#3b2416';ctx.fillRect(x+6,sy+22,w-12,4);
      for(let k=0;k<5;k++){const cx=x+16+k*17,kind=((i+2)+r+k)%4;
        if(kind===0){ctx.fillStyle=['#1c63b0','#f2c14e','#2f8a5b'][(k+r)%3];ctx.beginPath();ctx.arc(cx,sy+12,8,0,7);ctx.fill();ctx.fillStyle='#f6efe3';ctx.beginPath();ctx.arc(cx,sy+12,3,0,7);ctx.fill()}
        else if(kind===1){ctx.fillStyle=['#c0392b','#e67e22','#d4ac0d'][(k+i+3)%3];ctx.beginPath();ctx.moveTo(cx-8,sy+22);ctx.quadraticCurveTo(cx,sy+2,cx+8,sy+22);ctx.fill()}
        else if(kind===2){ctx.fillStyle=RED;ctx.fillRect(cx-6,sy+8,12,14);ctx.fillStyle='#9e0c24';ctx.fillRect(cx-6,sy+8,12,3)}
        else{ctx.fillStyle='#b5582c';ctx.beginPath();ctx.ellipse(cx,sy+14,6,8,0,0,7);ctx.fill()}}}
    const cx=x+w+17;for(let s=0;s<14;s++){ctx.fillStyle=s%2?'#2f8a5b':RED;ctx.fillRect(cx-7,120+s*18,14,18)}
    ctx.fillStyle=GOLD;ctx.fillRect(cx-10,114,20,8);
  }
  const kx=SW/2,ky=74;ctx.fillStyle='#8f1d1d';ctx.fillRect(kx-50,ky,100,40);
  for(let i=0;i<5;i++){ctx.fillStyle=i%2?GOLD:'#f6efe3';ctx.beginPath();const dx=kx-50+i*20;ctx.moveTo(dx,ky+20);ctx.lineTo(dx+10,ky+8);ctx.lineTo(dx+20,ky+20);ctx.lineTo(dx+10,ky+32);ctx.fill()}
  for(let i=0;i<5;i++){const x=80+i*160,sw=Math.sin(t*1.2+i)*4,y=96;
    ctx.strokeStyle='#3b2416';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(x,64);ctx.lineTo(x+sw,y);ctx.stroke();
    const glow=.35+.08*Math.sin(t*9+i*2);ctx.fillStyle=`rgba(255,200,110,${glow})`;ctx.beginPath();ctx.arc(x+sw,y+14,26,0,7);ctx.fill();
    ctx.fillStyle='#c9952f';ctx.beginPath();ctx.moveTo(x+sw,y);ctx.lineTo(x+sw+9,y+10);ctx.lineTo(x+sw+6,y+26);ctx.lineTo(x+sw-6,y+26);ctx.lineTo(x+sw-9,y+10);ctx.fill();
    ctx.fillStyle='#ffe3a3';ctx.fillRect(x+sw-3,y+12,6,9)}
  ctx.fillStyle='#c4a274';ctx.fillRect(-300,GROUND-38,SW+600,38);ctx.fillStyle='#a8875c';ctx.fillRect(-300,GROUND-38,SW+600,4);
  ctx.fillStyle='#9c8b72';ctx.fillRect(-300,GROUND,SW+600,200);
  ctx.fillStyle='#8a7a62';for(let r=0;r<4;r++)for(let i=-6;i<30;i++){const w=34,x=i*w+(r%2)*w/2,y=GROUND+4+r*14;ctx.beginPath();ctx.ellipse(x,y+5,w/2-3,5,0,0,7);ctx.fill()}
  // a medina cat strolls along the wall now and then
  const cyc=(t%24)/24;if(cyc<.55){const cx=-60+cyc/.55*(SW+120),cy=GROUND-38,leg=Math.sin(t*12)*3;
    ctx.fillStyle='#2a1d17';ctx.beginPath();ctx.ellipse(cx,cy-9,13,6,0,0,7);ctx.fill();ctx.beginPath();ctx.arc(cx+13,cy-13,5,0,7);ctx.fill();
    ctx.beginPath();ctx.moveTo(cx+10,cy-17);ctx.lineTo(cx+12,cy-22);ctx.lineTo(cx+14,cy-17);ctx.moveTo(cx+14,cy-17);ctx.lineTo(cx+17,cy-21);ctx.lineTo(cx+17,cy-15);ctx.fill();
    ctx.strokeStyle='#2a1d17';ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(cx-12,cy-10);ctx.quadraticCurveTo(cx-22,cy-26,cx-16,cy-28);ctx.stroke();
    ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(cx-8,cy-5);ctx.lineTo(cx-8+leg,cy);ctx.moveTo(cx+8,cy-5);ctx.lineTo(cx+8-leg,cy);ctx.stroke()}
}

function stageElJem(t){
  ctx.fillStyle=lgrad(-100,300,['#3d7cc4','#9ccbea','#f2dfb8']);ctx.fillRect(-300,-200,SW+600,600);
  ctx.fillStyle='rgba(255,255,255,.7)';for(const[x,y,w] of [[120,50,90],[540,34,120],[700,80,70]]){const xx=(x+t*4)%(SW+200)-100;ctx.beginPath();ctx.ellipse(xx,y,w/2,12,0,0,7);ctx.ellipse(xx+20,y-8,w/3,12,0,0,7);ctx.fill()}
  const bulge=x=>Math.pow((x-SW/2)/(SW*.75),2)*60;
  const COLS=[RED,'#1c63b0','#f6efe3','#2f8a5b',GOLD],SKIN=['#c98b5e','#a8673f','#d7a27a'];
  [[90,70,'#c9925a','#7a4a26'],[160,72,'#d6a066','#8a5530'],[232,74,'#e0ab70','#96603a']].forEach(([top,h,stone,dark],ti)=>{
    ctx.fillStyle=stone;ctx.beginPath();ctx.moveTo(-300,top+bulge(-300)+h);
    for(let x=-300;x<=SW+300;x+=20)ctx.lineTo(x,top+bulge(x)-(ti===0?(Math.sin(x*.07)*6+((Math.abs(x)*7)%23<6?10:0)):0));
    ctx.lineTo(SW+300,top+bulge(SW+300)+h);ctx.fill();
    for(let x=-280,n=0;x<SW+300;x+=52,n++){const y=top+bulge(x)+10;ctx.fillStyle=dark;arch(x,y,34,h-16);ctx.fill();
      if(ti>0)for(let k=0;k<2;k++){const jump=Math.max(0,Math.sin(t*14+n*1.7+k))*crowd*8,hx=x+9+k*16,hy=y+h-30-((n+k)%2)*3-jump;
        const c=COLS[(n*3+k+ti)%5];ctx.fillStyle=c;ctx.fillRect(hx-6,hy+6,12,14);
        if(crowd>.3&&k===0){ctx.strokeStyle=c;ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(hx-5,hy+8);ctx.lineTo(hx-9,hy-6);ctx.stroke()}
        ctx.fillStyle=SKIN[(n+k)%3];ctx.beginPath();ctx.arc(hx,hy,5,0,7);ctx.fill()}}
    ctx.fillStyle='rgba(0,0,0,.12)';ctx.fillRect(-300,top+bulge(0)+h-4,SW+600,4);
  });
  for(const x of [110,690]){ctx.fillStyle='#8f1d1d';ctx.beginPath();ctx.moveTo(x-18,96);ctx.lineTo(x+18,96);ctx.lineTo(x+18,186);ctx.lineTo(x,174+Math.sin(t*3)*3);ctx.lineTo(x-18,186);ctx.fill();
    ctx.strokeStyle=GOLD;ctx.lineWidth=2;ctx.beginPath();ctx.arc(x,128,9,0,7);ctx.stroke()}
  ctx.fillStyle='#b98450';ctx.fillRect(-300,GROUND-44,SW+600,44);ctx.fillStyle='#9a6a3c';for(let x=-300;x<SW+300;x+=40)ctx.fillRect(x,GROUND-44,2,44);
  ctx.fillStyle='#e6c38a';ctx.fillRect(-300,GROUND,SW+600,200);
  ctx.strokeStyle='rgba(150,100,50,.3)';ctx.lineWidth=1.5;for(let i=0;i<14;i++){const x=(i*97)%SW,y=GROUND+8+(i*31)%46;ctx.beginPath();ctx.moveTo(x,y);ctx.quadraticCurveTo(x+14,y-3,x+28,y);ctx.stroke()}
}

function stageSahara(t){
  ctx.fillStyle=lgrad(-100,330,['#2d1b4e','#a8406a','#e8743b','#f6c063']);ctx.fillRect(-300,-200,SW+600,600);
  ctx.fillStyle='rgba(255,255,255,.8)';for(let i=0;i<24;i++){const x=(i*173)%SW,y=(i*61)%110;ctx.fillRect(x,y,1.5,1.5)}
  ctx.fillStyle='rgba(255,220,150,.4)';ctx.beginPath();ctx.arc(560,300,80,0,7);ctx.fill();ctx.fillStyle='#ffd27a';ctx.beginPath();ctx.arc(560,300,46,0,7);ctx.fill();
  const dune=(base,amp,f,ph,col)=>{ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(-300,SH+50);for(let x=-300;x<=SW+300;x+=10)ctx.lineTo(x,base-Math.sin(x*f+ph)*amp-Math.sin(x*f*2.3+ph)*amp*.3);ctx.lineTo(SW+300,SH+50);ctx.fill()};
  dune(300,22,.006,1,'#b9603a');
  for(let k=0;k<4;k++){const x=((t*12+k*46)%(SW+300))-150,y=300-Math.sin(x*.006+1)*22-Math.sin(x*.0138+1)*6.6,leg=Math.sin(t*5+k)*3;
    ctx.fillStyle='#3b1f2b';ctx.beginPath();ctx.ellipse(x,y-14,13,7,0,0,7);ctx.fill();ctx.beginPath();ctx.arc(x-2,y-20,6,Math.PI,0);ctx.fill();
    ctx.strokeStyle='#3b1f2b';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x+10,y-16);ctx.quadraticCurveTo(x+18,y-20,x+18,y-30);ctx.stroke();ctx.beginPath();ctx.arc(x+20,y-31,3.5,0,7);ctx.fill();
    ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x-8,y-8);ctx.lineTo(x-8+leg,y+4);ctx.moveTo(x+8,y-8);ctx.lineTo(x+8-leg,y+4);ctx.stroke();
    if(k===0){ctx.fillStyle='#3b1f2b';ctx.fillRect(x-4,y-34,6,12);ctx.beginPath();ctx.arc(x-1,y-37,4,0,7);ctx.fill()}}
  dune(340,18,.009,2.4,'#d07a45');
  palm(30,350,120,t,'#2c4a2a','#4a2f1e');palm(84,356,96,t,'#2c4a2a','#4a2f1e');palm(724,352,110,t,'#2c4a2a','#4a2f1e');
  dune(372,10,.012,4,'#e09358');
  ctx.fillStyle='#efb877';ctx.fillRect(-300,GROUND,SW+600,200);
  ctx.strokeStyle='rgba(180,110,50,.35)';ctx.lineWidth=2;for(let r=0;r<4;r++){ctx.beginPath();for(let x=-300;x<=SW+300;x+=12)ctx.lineTo(x,GROUND+10+r*13+Math.sin(x*.04+r)*2);ctx.stroke()}
  ctx.strokeStyle='rgba(255,230,180,.45)';ctx.lineWidth=1.5;for(let i=0;i<18;i++){const x=((i*157+t*260)%(SW+200))-100,y=230+(i*37)%160;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+30,y-2);ctx.stroke()}
}

function stageDjerba(t){
  ctx.fillStyle=lgrad(-100,280,['#4fa8e0','#bfe6f7']);ctx.fillRect(-300,-200,SW+600,500);
  ctx.fillStyle='#fff7d6';ctx.beginPath();ctx.arc(640,70,30,0,7);ctx.fill();
  ctx.strokeStyle='#2a3b4c';ctx.lineWidth=2;for(let i=0;i<4;i++){const x=((t*30+i*190)%(SW+100))-50,y=70+i*18+Math.sin(t*2+i)*8,f=Math.sin(t*8+i)*4;
    ctx.beginPath();ctx.moveTo(x-9,y-f);ctx.quadraticCurveTo(x-4,y-6,x,y);ctx.quadraticCurveTo(x+4,y-6,x+9,y-f);ctx.stroke()}
  ctx.fillStyle='#d9c6a0';ctx.fillRect(-300,232,SW+600,20);
  ctx.fillStyle='#fbf6ec';ctx.fillRect(500,196,70,40);ctx.beginPath();ctx.arc(535,196,22,Math.PI,0);ctx.fill();ctx.fillRect(590,210,40,26);
  ctx.fillStyle='#1c63b0';ctx.fillRect(528,214,10,22);palm(470,240,70,t);palm(660,240,60,t);
  ctx.fillStyle=lgrad(250,380,['#2bc0cf','#1590a6']);ctx.fillRect(-300,250,SW+600,140);
  ctx.strokeStyle='rgba(255,255,255,.5)';ctx.lineWidth=2;for(let i=0;i<12;i++){const x=((i*131+t*20)%(SW+100))-50,y=262+(i*19)%110;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+18,y);ctx.stroke()}
  for(const[x,y,c] of [[150,300,'#1c63b0'],[330,322,'#2f8a5b'],[610,296,'#1c63b0']]){const b=Math.sin(t*1.8+x)*3,r=Math.sin(t*1.4+x)*.04;
    ctx.save();ctx.translate(x,y+b);ctx.rotate(r);ctx.fillStyle='#fbf6ec';ctx.beginPath();ctx.moveTo(-48,-8);ctx.lineTo(48,-12);ctx.lineTo(36,10);ctx.lineTo(-38,10);ctx.closePath();ctx.fill();
    ctx.fillStyle=c;ctx.fillRect(-44,-4,84,5);ctx.fillStyle=RED;ctx.fillRect(-40,3,76,3);ctx.fillStyle='#fbf6ec';ctx.fillRect(-10,-28,24,18);ctx.fillStyle=c;ctx.fillRect(-6,-24,6,6);ctx.fillRect(4,-24,6,6);
    ctx.strokeStyle='#5c3f24';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(24,-12);ctx.lineTo(24,-50);ctx.stroke();ctx.restore()}
  ctx.fillStyle='#6b4a2e';ctx.fillRect(-300,GROUND-14,SW+600,14);for(let x=-280;x<SW+300;x+=80)ctx.fillRect(x,GROUND-40,10,40);
  for(const[x,y] of [[660,GROUND-14],[690,GROUND-14],[720,GROUND-14],[675,GROUND-34],[705,GROUND-34],[690,GROUND-54],[40,GROUND-14],[68,GROUND-14],[54,GROUND-34]]){
    ctx.fillStyle='#b5582c';ctx.beginPath();ctx.ellipse(x,y-9,12,11,0,0,7);ctx.fill();ctx.fillStyle='#8f4320';ctx.fillRect(x-5,y-22,10,5);ctx.fillStyle='#d47a46';ctx.fillRect(x-8,y-12,4,6)}
  ctx.fillStyle='#d9c6a0';ctx.beginPath();ctx.ellipse(130,GROUND-8,36,12,0,Math.PI,0);ctx.fill();ctx.strokeStyle='#a89670';ctx.lineWidth=1;
  for(let i=-30;i<34;i+=7){ctx.beginPath();ctx.moveTo(130+i,GROUND-2);ctx.lineTo(130+i+6,GROUND-18);ctx.stroke()}
  ctx.fillStyle='#a47148';ctx.fillRect(-300,GROUND,SW+600,200);ctx.strokeStyle='#7d5333';ctx.lineWidth=2;
  for(let y=GROUND+12;y<SH+40;y+=13){ctx.beginPath();ctx.moveTo(-300,y);ctx.lineTo(SW+300,y);ctx.stroke()}
  for(let i=0;i<30;i++){const x=(i*113)%(SW+100)-50,y=GROUND+(i%4)*13;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,y+12);ctx.stroke()}
}


/* ---- cultural details (references: Wikipedia articles on Sidi Bou Said, the Medina of Tunis,
   the chechia, Douz and its Festival of the Sahara, the hamsa and the sefseri) ---- */
function khamsa(x,y,s,c){ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,4*s,0,7);ctx.fill();for(let i=-2;i<=2;i++)ctx.fillRect(x+i*2*s-.8*s,y-(i===-2||i===2?7:9)*s,1.8*s,6*s);ctx.fillStyle='#1c63b0';ctx.beginPath();ctx.arc(x,y,1.5*s,0,7);ctx.fill()}
function extraSBS(t){khamsa(735,352,1.6,'#d8d8e0')}
function extraMedina(t){
  // studded medina door in the second arch, with a khamsa knocker
  const x=150,y=180,w=76,h=GROUND-38-y;ctx.fillStyle='#e8d3a8';arch(x-6,y-6,w+12,h+6);ctx.fill();ctx.fillStyle='#2a6fb0';arch(x,y,w,h);ctx.fill();
  ctx.fillStyle='#1d1410';for(let r=0;r<8;r++)for(let c=0;c<5;c++)ctx.fillRect(x+10+c*14,y+40+r*14,3,3);khamsa(x+w/2,y+h*.55,1.4,'#c9952f');
  // a sign for the chechia makers' souk: a red chechia hanging from a bracket
  const sx=SW*.5,sy=136;ctx.fillStyle='#3b2416';ctx.fillRect(sx-30,sy-6,60,4);ctx.fillRect(sx-2,sy-10,4,10);
  ctx.fillStyle=RED;ctx.beginPath();ctx.moveTo(sx-16,sy+24);ctx.lineTo(sx-13,sy+4);ctx.quadraticCurveTo(sx,sy-2,sx+13,sy+4);ctx.lineTo(sx+16,sy+24);ctx.fill();ctx.fillStyle='#1d1410';ctx.fillRect(sx-1,sy,2,18);
  // a woman in a cream sefseri crossing now and then
  const cyc=((t+9)%30)/30;if(cyc<.6){const px=SW+60-cyc/.6*(SW+120),py=GROUND-38,b=Math.sin(t*8)*1.5;
    ctx.fillStyle='#efe6d2';ctx.beginPath();ctx.moveTo(px-10,py);ctx.quadraticCurveTo(px-14,py-30,px-6,py-52+b);ctx.quadraticCurveTo(px,py-60+b,px+6,py-52+b);ctx.quadraticCurveTo(px+13,py-30,px+11,py);ctx.closePath();ctx.fill();
    ctx.fillStyle='#d9ccb0';ctx.fillRect(px-2,py-36,12,3);ctx.fillStyle='#b77a52';ctx.fillRect(px-8,py-52+b,5,6);ctx.fillStyle='#3b2416';ctx.fillRect(px-5,py-3,4,3);ctx.fillRect(px+3,py-3,4,3)}
}
function extraSahara(t){
  // a saluki sprinting across, as in the festival races
  const cyc=(t%14)/14;if(cyc<.35){const x=-60+cyc/.35*(SW+120),y=376,l=Math.sin(t*30)*6;
    ctx.fillStyle='#d9b27c';ctx.fillRect(x-14,y-12,28,7);ctx.fillRect(x+12,y-18,5,8);ctx.fillRect(x+15,y-18,9,4);ctx.fillStyle='#b88a55';ctx.fillRect(x+12,y-20,4,8);
    ctx.fillStyle='#d9b27c';ctx.fillRect(x-12+l,y-6,3,8);ctx.fillRect(x-8-l,y-6,3,8);ctx.fillRect(x+8+l,y-6,3,8);ctx.fillRect(x+4-l,y-6,3,8);
    ctx.strokeStyle='#d9b27c';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x-14,y-10);ctx.quadraticCurveTo(x-24,y-16,x-26,y-8);ctx.stroke()}
}
function extraDjerba(t){
  // an octopus peeking out of the top pot
  const x=690,y=GROUND-72,b=Math.sin(t*2)*2;ctx.fillStyle='#c4506a';ctx.beginPath();ctx.ellipse(x,y+b,9,8,0,Math.PI,0);ctx.fill();ctx.fillRect(x-9,y+b,18,4);
  ctx.fillStyle='#fff';ctx.fillRect(x-5,y-3+b,3,3);ctx.fillRect(x+2,y-3+b,3,3);ctx.fillStyle='#1d1410';ctx.fillRect(x-4,y-2+b,2,2);ctx.fillRect(x+3,y-2+b,2,2);
  ctx.strokeStyle='#c4506a';ctx.lineWidth=3;for(const d of [-1,1]){ctx.beginPath();ctx.moveTo(x+d*8,y+3);ctx.quadraticCurveTo(x+d*16,y+2+Math.sin(t*3+d)*4,x+d*18,y+10);ctx.stroke()}
}

/* ---- Café M'Rabet, Medina of Tunis: founded at the start of the 17th century (oldest café in Tunisia),
   known for its large central banquette and its columns. Old men play chkobba over mint tea. ---- */
function seatedMan(x,y,face,robe,slap,t){
  // cross-legged on the mat; slap: 0..1 arm animation for slapping a card down
  ctx.fillStyle=shade(robe,.8);ctx.beginPath();ctx.ellipse(x,y-4,20,7,0,0,7);ctx.fill();
  ctx.fillStyle=robe;ctx.beginPath();ctx.moveTo(x-13,y-6);ctx.lineTo(x+13,y-6);ctx.lineTo(x+9,y-40);ctx.lineTo(x-9,y-40);ctx.closePath();ctx.fill();
  ctx.fillStyle='#b98a62';ctx.beginPath();ctx.arc(x+face*1,y-48,8,0,7);ctx.fill();
  ctx.fillStyle='#d9d4c8';ctx.fillRect(x+face*3-(face>0?0:6),y-45,6,2);
  ctx.fillStyle='#8e1b28';ctx.fillRect(x-7,y-58,14,8);ctx.fillStyle='#6e1520';ctx.fillRect(x-7,y-52,14,2);
  const ang=slap>0?(slap<.5?-1.9+slap*2:-.9-(slap-.5)*.5):-.5;   // raise, then slam down
  ctx.strokeStyle=robe;ctx.lineWidth=6;ctx.lineCap='round';const sx=x+face*6,sy=y-36;
  const ex=sx+Math.cos(ang)*face*16,ey=sy-Math.sin(-ang)*-14+(slap>.5?10:0);
  ctx.beginPath();ctx.moveTo(sx,sy);ctx.lineTo(ex,ey);ctx.stroke();ctx.fillStyle='#b98a62';ctx.beginPath();ctx.arc(ex,ey,3,0,7);ctx.fill();
  if(slap>0&&slap<.55){ctx.fillStyle='#fff';ctx.fillRect(ex-3,ey-8,7,10);ctx.fillStyle=RED;ctx.fillRect(ex-1,ey-5,3,3)}
}
function stageCafe(t){
  const WALL='#efe5cf',WS='#d9cbb0',WOOD='#5a3a22';
  ctx.fillStyle=WALL;ctx.fillRect(-300,-200,SW+600,GROUND+200);
  // painted wooden ceiling beams
  ctx.fillStyle=WOOD;ctx.fillRect(-300,0,SW+600,46);
  for(let x=-280;x<SW+300;x+=40){ctx.fillStyle='#3e2716';ctx.fillRect(x,0,10,46);ctx.fillStyle=(x/40|0)%2?'#2f6f5a':'#9e2a2a';ctx.fillRect(x+14,14,18,18);ctx.fillStyle=GOLD;ctx.fillRect(x+20,20,6,6)}
  ctx.fillStyle='#3e2716';ctx.fillRect(-300,44,SW+600,6);
  // arches with lattice windows and light
  const cols=[-40,150,400,650,840];
  for(let i=0;i<cols.length-1;i++){const x0=cols[i]+14,x1=cols[i+1]-14,w=x1-x0,top=96;
    ctx.fillStyle=WS;ctx.beginPath();ctx.moveTo(x0,GROUND-70);ctx.lineTo(x0,top+w*.5);ctx.arc(x0+w/2,top+w*.5,w/2,Math.PI,0);ctx.lineTo(x1,GROUND-70);ctx.closePath();ctx.fill();
    const wx=x0+w/2-26,wy=top+w*.5-10;ctx.fillStyle='#2b4a6b';arch(wx,wy,52,70);ctx.fill();
    ctx.strokeStyle='#e8d3a8';ctx.lineWidth=2;ctx.beginPath();for(let k=1;k<4;k++){ctx.moveTo(wx+k*13,wy+4);ctx.lineTo(wx+k*13,wy+70)}for(let k=1;k<6;k++){ctx.moveTo(wx,wy+k*12);ctx.lineTo(wx+52,wy+k*12)}ctx.stroke();
    ctx.fillStyle='rgba(255,240,200,.10)';ctx.beginPath();ctx.moveTo(wx,wy+30);ctx.lineTo(wx+52,wy+30);ctx.lineTo(wx+120,GROUND);ctx.lineTo(wx+10,GROUND);ctx.closePath();ctx.fill()}
  // zellige dado along the wall
  for(const y of [GROUND-118,GROUND-100]){const tiles=['#1c63b0','#f2c14e','#2f8a5b','#f6efe3','#c8102e','#2f8a5b'];
    for(let x=-300,i=(y/18|0);x<SW+300;x+=18,i++){ctx.fillStyle=tiles[i%tiles.length];ctx.beginPath();ctx.moveTo(x+9,y);ctx.lineTo(x+18,y+9);ctx.lineTo(x+9,y+18);ctx.lineTo(x,y+9);ctx.fill()}}
  ctx.fillStyle='#2f6f5a';ctx.fillRect(-300,GROUND-122,SW+600,4);ctx.fillRect(-300,GROUND-82,SW+600,4);
  // the characteristic columns, painted in red and green bands
  for(const x of cols){ctx.fillStyle=WS;ctx.fillRect(x-14,80,28,10);
    for(let y=90,k=0;y<GROUND-70;y+=16,k++){ctx.fillStyle=k%2?'#2f6f5a':'#9e2a2a';ctx.fillRect(x-10,y,20,16);ctx.fillStyle='rgba(255,255,255,.18)';ctx.fillRect(x-10,y,5,16)}
    ctx.fillStyle=GOLD;ctx.fillRect(x-13,86,26,5);ctx.fillRect(x-13,GROUND-74,26,5)}
  // lanterns
  for(let i=0;i<4;i++){const x=40+i*240,sw=Math.sin(t*1.1+i)*3;ctx.strokeStyle='#3e2716';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(x,50);ctx.lineTo(x+sw,78);ctx.stroke();
    ctx.fillStyle='rgba(255,205,120,.32)';ctx.beginPath();ctx.arc(x+sw,94,22,0,7);ctx.fill();ctx.fillStyle='#c9952f';ctx.beginPath();ctx.moveTo(x+sw,78);ctx.lineTo(x+sw+8,88);ctx.lineTo(x+sw+6,104);ctx.lineTo(x+sw-6,104);ctx.lineTo(x+sw-8,88);ctx.fill();ctx.fillStyle='#ffe3a3';ctx.fillRect(x+sw-3,88,6,10)}
  // the great central banquette, covered with straw mats
  const by=GROUND-70;ctx.fillStyle='#d9cbb0';ctx.fillRect(-300,by,SW+600,70);
  ctx.fillStyle='#c9ad74';ctx.fillRect(-300,by-6,SW+600,10);
  ctx.fillStyle='#b0925c';for(let x=-300;x<SW+300;x+=8)ctx.fillRect(x,by-6,2,10);
  for(let x=-300,i=0;x<SW+300;x+=22,i++){ctx.fillStyle=i%2?'#1c63b0':'#f6efe3';ctx.beginPath();ctx.moveTo(x+11,by+14);ctx.lineTo(x+22,by+25);ctx.lineTo(x+11,by+36);ctx.lineTo(x,by+25);ctx.fill()}
  ctx.fillStyle='#b9a37e';ctx.fillRect(-300,by+46,SW+600,3);
  // chkobba players at a low table, with mint tea
  const tx=118,ty=by-6;
  ctx.fillStyle='#a87b3c';ctx.beginPath();ctx.ellipse(tx,ty-14,30,6,0,0,7);ctx.fill();ctx.fillStyle='#7a5328';ctx.fillRect(tx-3,ty-14,6,10);
  const cyc=t%3.2,slapL=cyc<.5?cyc/.5:0,slapR=cyc>1.6&&cyc<2.1?(cyc-1.6)/.5:0;
  ctx.fillStyle='#fff';for(const[ox,oy,r] of [[-12,-19,.2],[0,-20,-.1],[10,-19,.3]]){ctx.save();ctx.translate(tx+ox,ty+oy);ctx.rotate(r);ctx.fillRect(-4,-2,8,4);ctx.restore()}
  ctx.fillStyle=RED;ctx.fillRect(tx-1,ty-21,2,2);
  for(const gx of [tx-24,tx+22]){ctx.fillStyle='rgba(200,240,210,.85)';ctx.fillRect(gx-2,ty-26,5,8);ctx.fillStyle='#3f8f4f';ctx.fillRect(gx-1,ty-28,3,2)}
  seatedMan(tx-50,ty,1,'#7b6a52',slapL,t);seatedMan(tx+50,ty,-1,'#4a5a72',slapR,t);
  // a second group further along, drinking tea
  ctx.fillStyle='#a87b3c';ctx.beginPath();ctx.ellipse(712,ty-12,22,5,0,0,7);ctx.fill();
  ctx.fillStyle='#c9952f';ctx.fillRect(706,ty-24,10,10);ctx.fillRect(709,ty-28,4,4);   // brass teapot
  steam(711,ty-30,t,.6);steam(tx-23,ty-29,t,0);steam(tx+23,ty-29,t,.35);
  seatedMan(677,ty,1,'#efe7d4',0,t);seatedMan(748,ty,-1,'#6b4a2e',0,t);
  // floor: cream and terracotta tiles
  ctx.fillStyle='#c9a27a';ctx.fillRect(-300,GROUND,SW+600,200);
  for(let r=0;r<4;r++)for(let i=-12;i<28;i++)if((i+r)%2){ctx.fillStyle='#e8dcc4';const x=i*40+(r%2)*0,y=GROUND+r*16;ctx.fillRect(x,y,40,16)}
  ctx.fillStyle='rgba(0,0,0,.12)';ctx.fillRect(-300,GROUND,SW+600,3);
}

/* ---- atmosphere: light, colour grading and ambient motion on top of each stage ---- */
const fr=i=>{const x=Math.sin(i*91.7+12.3)*43758.5453;return x-Math.floor(x)};
function grade(top,bottom,a){ctx.save();ctx.globalCompositeOperation='overlay';ctx.globalAlpha=a;const g=ctx.createLinearGradient(0,0,0,SH);g.addColorStop(0,top);g.addColorStop(1,bottom);ctx.fillStyle=g;ctx.fillRect(-300,-200,SW+600,SH+400);ctx.restore()}
function rays(x,y,col,n,len,spread,t,a){ctx.save();ctx.globalCompositeOperation='lighter';ctx.translate(x,y);ctx.fillStyle=col;
  for(let i=0;i<n;i++){const ang=-Math.PI/2+(i-(n-1)/2)*spread+Math.sin(t*.25+i)*.03;ctx.globalAlpha=a*(.55+.45*Math.sin(t*.6+i*1.7));
    ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.cos(ang-.04)*len,Math.sin(ang-.04)*len);ctx.lineTo(Math.cos(ang+.04)*len,Math.sin(ang+.04)*len);ctx.fill()}ctx.restore()}
function beams(x0,col,t,a){ctx.save();ctx.globalCompositeOperation='lighter';ctx.fillStyle=col;
  for(let i=0;i<4;i++){const x=x0+i*190,w=46+fr(i)*30;ctx.globalAlpha=a*(.6+.4*Math.sin(t*.5+i*2));ctx.beginPath();ctx.moveTo(x,-40);ctx.lineTo(x+w,-40);ctx.lineTo(x+w+150,GROUND);ctx.lineTo(x+150,GROUND);ctx.fill()}ctx.restore()}
function motes(n,col,t,y0,y1,drift,size){ctx.fillStyle=col;for(let i=0;i<n;i++){const x=((fr(i)*(SW+200)+t*drift*(.5+fr(i+3)))%(SW+200))-100,y=y0+((fr(i+7)*(y1-y0)+Math.sin(t*.8+i)*12+t*6*fr(i+1))%(y1-y0));
  ctx.globalAlpha=.35+.45*Math.abs(Math.sin(t*1.5+i));ctx.fillRect(x,y,size,size)}ctx.globalAlpha=1}
function gulls(n,t,y,col){ctx.strokeStyle=col;ctx.lineWidth=2;for(let i=0;i<n;i++){const x=((t*(22+i*5)+i*260)%(SW+200))-100,yy=y+i*22+Math.sin(t*1.4+i)*10,f=Math.sin(t*7+i*2)*5;
  ctx.beginPath();ctx.moveTo(x-10,yy-f);ctx.quadraticCurveTo(x-5,yy-7,x,yy);ctx.quadraticCurveTo(x+5,yy-7,x+10,yy-f);ctx.stroke()}}
function glints(n,t,x0,x1,y0,y1){ctx.fillStyle='#ffffff';for(let i=0;i<n;i++){const k=Math.sin(t*3+i*2.7);if(k<.6)continue;const x=x0+fr(i)*(x1-x0)+Math.sin(t*.3+i)*20,y=y0+fr(i+5)*(y1-y0);ctx.globalAlpha=(k-.6)*2.5;ctx.fillRect(x-3,y,7,1.5);ctx.fillRect(x,y-2,1.5,5)}ctx.globalAlpha=1}
function petals(n,t,cols,wind){for(let i=0;i<n;i++){const x=((fr(i)*(SW+300)+t*wind*(.6+fr(i+2)*.6))%(SW+300))-150,y=((fr(i+4)*(SH+60)+t*(30+fr(i+6)*30))%(SH+60))-30,r=t*2+i;
  ctx.fillStyle=cols[i%cols.length];ctx.save();ctx.translate(x+Math.sin(t*2+i)*8,y);ctx.rotate(r);ctx.fillRect(-3,-2,6,4);ctx.restore()}}
function steam(x,y,t,k){ctx.fillStyle='rgba(255,255,255,.5)';for(let i=0;i<5;i++){const p=((t*.6+i/5+k)%1),yy=y-p*44,xx=x+Math.sin(p*7+k*3)*5;ctx.globalAlpha=(1-p)*.55;ctx.beginPath();ctx.arc(xx,yy,2+p*5,0,7);ctx.fill()}ctx.globalAlpha=1}
function vignette(col,a){const v=col+Math.round(a*255).toString(16).padStart(2,'0');if(vignette.last!==v){vignette.last=v;const el=document.getElementById('vig');if(el)el.style.setProperty('--vig',v)}return;const g=ctx.createRadialGradient(SW/2,SH*.55,SH*.35,SW/2,SH*.55,SW*.72);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,col);ctx.save();ctx.globalAlpha=a;ctx.fillStyle=g;ctx.fillRect(-300,-200,SW+600,SH+400);ctx.restore()}
const ATMOS={
  sbs:{back:t=>{rays(170,246,'#ffd9a0',9,520,.2,t,.16);glints(26,t,-100,SW+100,272,368);gulls(3,t,60,'#3a3040');grade('#ffd6a8','#2a6fb0',.35)},
       fore:t=>{petals(14,t,['#e0457b','#ff7eb3','#f6efe3'],40);vignette('#3b1f3a',.35)}},
  medina:{back:t=>{beams(-60,'#ffe2a8',t,.12);motes(40,'#fff1c9',t,40,GROUND,6,2);grade('#ffe0b0','#5a2c1a',.3)},
       fore:t=>{motes(10,'#fff1c9',t,60,GROUND+30,10,3);vignette('#2a120a',.4)}},
  eljem:{back:t=>{rays(400,-60,'#fff0c8',7,520,.16,t,.08);gulls(2,t,40,'#4a3a30');grade('#ffe2b0','#6a3a1a',.3)},
       fore:t=>{if(crowd>.2)petals(Math.round(24*crowd),t,['#c8102e','#f2c14e','#f6efe3','#2f8a5b'],60);motes(14,'#f5deb0',t,GROUND-60,GROUND+30,30,2);vignette('#3a1a0a',.35)}},
  sahara:{back:t=>{rays(560,300,'#ffcf7a',11,640,.17,t,.14);grade('#ffb36b','#8a2f3a',.32)},
       fore:t=>{ctx.strokeStyle='rgba(255,226,170,.5)';ctx.lineWidth=1.5;for(let i=0;i<22;i++){const x=((fr(i)*SW+t*(320+fr(i+1)*200))%(SW+300))-150,y=GROUND-120+fr(i+2)*160;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+26+fr(i)*20,y-1);ctx.stroke()}
         motes(30,'#f3cf8f',t,GROUND-40,GROUND+40,140,2);vignette('#4a1420',.4)}},
  djerba:{back:t=>{rays(640,70,'#fffbe0',8,420,.22,t,.1);glints(34,t,-100,SW+100,256,384);ctx.fillStyle='rgba(255,255,255,.75)';
         for(let i=0;i<3;i++){const x=((t*8+i*330)%(SW+300))-150,y=30+i*26;ctx.beginPath();ctx.ellipse(x,y,46,12,0,0,7);ctx.ellipse(x+28,y-8,26,12,0,0,7);ctx.fill()}
         grade('#e8fbff','#1a6a8a',.3)},
       fore:t=>{vignette('#0a2a3a',.3)}},
  cafe:{back:t=>{beams(40,'#fff2c8',t,.1);grade('#ffd9a0','#4a2010',.3)},
       fore:t=>{ctx.fillStyle='rgba(230,225,215,.12)';for(let i=0;i<5;i++){const x=((t*14+i*200)%(SW+300))-150,y=150+i*30+Math.sin(t*.7+i)*14;ctx.beginPath();ctx.ellipse(x,y,70,16,0,0,7);ctx.fill()}vignette('#2a1008',.45)}},
};
const RIM={sbs:['#ffd9a0',-1,-1,.6],medina:['#ffe9b8',-1,-1,.5],eljem:['#fff0c8',0,-1,.55],sahara:['#ffc070',1,-1,.65],djerba:['#ffffff',1,-1,.5],cafe:['#ffe2a8',-1,-1,.45]};
for(const st of STAGES){st.rim=RIM[st.id];const A=ATMOS[st.id],d0=st.draw;if(!A)continue;st.draw=t=>{d0(t);A.back(t)};st.fore=A.fore}
