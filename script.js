const R={
F:{t:"Friends",base:62,m:"You two share a warm, easy friendship. Time flies when you are together and the laughs never stop. It is not romance yet, but a true friend is a rare treasure. Cherish it, and who knows what the future holds.",q:"A good friend is a treasure no money can buy."},
L:{t:"Love",base:92,m:"This is DEEP LOVE. You two were made for each other. Their heart skips a beat at the sound of your voice, and nothing can pull you apart. A love that never lets go and cares with all its soul. You have found true love, hold on to it forever.",q:"Two bodies, one soul. Your love will never fade."},
A:{t:"Affection",base:72,m:"There is a sweet, casual spark between you two. You like each other and you care, but it has not bloomed into love just yet. Give it time and keep talking. Little moments can turn into something beautiful.",q:"Small sparks of affection light the biggest love stories."},
M:{t:"Marriage",base:86,m:"Wedding bells are ringing in your future. The two of you are destined to build a beautiful home together. Through joys and storms, you will walk hand in hand for a lifetime. What a perfect pair.",q:"Marriages are made in heaven."},
E:{t:"Enemy",base:24,m:"Uh-oh, this one is an ENEMY match. Looks like you two are made for banter and endless teasing. Do not worry, it is just a fun game. Keep trolling each other, and when the anger comes, say 'get lost' and laugh it off.",q:"Today's rival may be tomorrow's best friend."},
S:{t:"Sister",base:58,m:"This is pure sibling love. You two share a bond like sisters, always there for each other. Every sorrow and every joy gets shared. A beautiful relationship so close to the heart. She is not just a sister, she is family.",q:"A sister is a gift from God."}
};
const $=id=>document.getElementById(id),sleep=ms=>new Promise(r=>setTimeout(r,ms)),rnd=(a,b)=>a+Math.random()*(b-a);
const fx=$('fx');
[['#1e6bff',420,'8%','5%'],['#5ee0ff',320,'70%','30%'],['#3b4658',380,'20%','65%'],['#0d3b8f',460,'75%','75%']].forEach(o=>{const d=document.createElement('div');d.className='orb';d.style.cssText=`width:${o[1]}px;height:${o[1]}px;background:${o[0]};left:${o[2]};top:${o[3]};animation-delay:${rnd(-8,0)}s`;fx.appendChild(d)});
for(let i=0;i<50;i++){const s=document.createElement('div');s.className='star';s.style.cssText=`left:${rnd(0,100)}%;top:${rnd(0,100)}%;animation-delay:${rnd(0,3)}s;animation-duration:${rnd(2,5)}s`;fx.appendChild(s)}
const hs=['💙','🤍','💙','🦋'];
for(let i=0;i<20;i++){const s=document.createElement('span');s.className='rise';s.textContent=hs[i%4];s.style.cssText=`left:${rnd(0,100)}%;font-size:${rnd(14,34)}px;--dx:${rnd(-80,80)}px;animation-duration:${rnd(9,18)}s;animation-delay:${rnd(-16,0)}s`;fx.appendChild(s)}
for(let i=0;i<5;i++){const s=document.createElement('div');s.className='fly';s.innerHTML='<i>🦋</i>';s.style.cssText=`top:${rnd(10,80)}%;font-size:${rnd(22,38)}px;animation-duration:${rnd(16,28)}s;animation-delay:${rnd(-20,0)}s`;fx.appendChild(s)}
let last=0;
function trail(x,y){const n=Date.now();if(n-last<40)return;last=n;const d=document.createElement('div');d.className='dot';d.style.left=x-4+'px';d.style.top=y-4+'px';document.body.appendChild(d);setTimeout(()=>d.remove(),800)}
addEventListener('mousemove',e=>trail(e.clientX,e.clientY));
addEventListener('touchmove',e=>{const t=e.touches[0];trail(t.clientX,t.clientY)},{passive:true});
function chips(el,arr){el.innerHTML='';return arr.map((c,i)=>{const d=document.createElement('div');d.className='ch';d.textContent=c;d.style.animationDelay=i*.05+'s';el.appendChild(d);return d})}
function confetti(set){for(let i=0;i<46;i++){const c=document.createElement('div');c.className='conf';c.textContent=set[i%set.length];c.style.left=rnd(0,100)+'vw';c.style.fontSize=rnd(16,30)+'px';c.style.animationDuration=rnd(2.5,5.5)+'s';document.body.appendChild(c);setTimeout(()=>c.remove(),6000)}}
function burst(){for(let i=0;i<36;i++){const s=document.createElement('span');s.className='bp';s.textContent=i%3?'💙':'🤍';const a=i/36*6.283,d=rnd(120,340);s.style.cssText+=`font-size:${rnd(16,30)}px;--x:${Math.cos(a)*d}px;--y:${Math.sin(a)*d}px`;document.body.appendChild(s);setTimeout(()=>s.remove(),2000)}}
async function type(el,txt){el.textContent='';for(const ch of txt){el.textContent+=ch;await sleep(14)}}
const TIP={F:"Plan a coffee or a movie night together.",L:"Tell them how you feel before the moment passes.",A:"Send a thoughtful message today and see what happens.",M:"Start dreaming together, the future looks bright.",E:"Challenge them to a game and settle the score.",S:"Call her today, sisters love a surprise."};
let AC=null,soundOn=true,hbOn=false,bpm=60,recent=[];
function initAudio(){try{if(!AC)AC=new (window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume()}catch(e){AC=null}}
function tone(f,d,v,type,when){if(!AC||!soundOn)return;const t=AC.currentTime+(when||0),o=AC.createOscillator(),g=AC.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f,t);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.015);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g);g.connect(AC.destination);o.start(t);o.stop(t+d+.05)}
function thump(f,when,v){if(!AC||!soundOn)return;const t=AC.currentTime+when,o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.setValueAtTime(f*2,t);o.frequency.exponentialRampToValueAtTime(f,t+.12);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.015);g.gain.exponentialRampToValueAtTime(.001,t+.25);o.connect(g);g.connect(AC.destination);o.start(t);o.stop(t+.3)}
function beatOnce(){try{navigator.vibrate&&navigator.vibrate([40,70,30])}catch(e){}thump(62,0,.95);thump(48,.17,.7);const p=$('pulse');p.classList.add('on');setTimeout(()=>p.classList.remove('on'),130);setTimeout(()=>{p.classList.add('on');setTimeout(()=>p.classList.remove('on'),110)},170);$('bpm').classList.remove('beat');void $('bpm').offsetWidth;$('bpm').classList.add('beat')}
function hbLoop(){if(!hbOn)return;beatOnce();setTimeout(hbLoop,60000/bpm)}
function startHB(){bpm=60;hbOn=true;$('bpm').style.opacity=1;$('bpm').textContent='60 BPM';hbLoop()}
function stopHB(){hbOn=false;$('bpm').style.opacity=0}
function setBPM(v){bpm=v;$('bpm').textContent=v+' BPM'}
function tick(){tone(900,.12,.15,'triangle')}
function chime(){[523,659,784,1047,1319].forEach((f,i)=>{tone(f,1.2,.18,'sine',i*.12);tone(f*2,.8,.05,'sine',i*.12)})}

let busy=false;
$('go').onclick=async()=>{
  if(busy)return;
  const v1=$('n1').value.trim(),v2=$('n2').value.trim();
  const a=[...v1.toLowerCase().replace(/[^\p{L}]/gu,'')],b=[...v2.toLowerCase().replace(/[^\p{L}]/gu,'')];
  if(!a.length||!b.length){alert('Please enter both names 💙');return}
  initAudio();stopHB();startHB();busy=true;$('go').disabled=true;$('res').style.display='none';$('count').textContent='';$('fl').innerHTML='';
  $('stage').style.display='block';
  const ca=chips($('a'),a),cb=chips($('b'),b);
  $('stage').scrollIntoView({behavior:'smooth',block:'center'});
  await sleep(900);
  const used=new Array(b.length).fill(false),cancelA=new Array(a.length).fill(false);
  for(let i=0;i<a.length;i++){
    for(let j=0;j<b.length;j++){
      if(!used[j]&&a[i]===b[j]){used[j]=true;cancelA[i]=true;ca[i].classList.add('x');cb[j].classList.add('x');tick();setBPM(Math.min(90,bpm+3));await sleep(550);break}
    }
  }
  ca.forEach((c,i)=>{if(!cancelA[i])c.classList.add('left')});
  cb.forEach((c,j)=>{if(!used[j])c.classList.add('left')});
  const n=cancelA.filter(x=>!x).length+used.filter(x=>!x).length;
  await sleep(500);
  for(let k=1;k<=n;k++){$('count').textContent=k;setBPM(Math.min(100,bpm+2));await sleep(120)}
  if(n===0)$('count').textContent='0';
  await sleep(800);
  const fc=chips($('fl'),[...'FLAMES']);
  let list=[0,1,2,3,4,5],idx=0;const step=Math.max(n,1);
  while(list.length>1){
    idx=(idx+step-1)%list.length;const pos=list[idx];
    fc[pos].classList.add('on');tick();setBPM(Math.min(150,bpm+9));await sleep(900);
    fc[pos].classList.remove('on');fc[pos].classList.add('x');await sleep(500);
    list.splice(idx,1);if(idx>=list.length)idx=0;
  }
  const L='FLAMES'[list[0]];fc[list[0]].classList.add('win');setBPM(Math.min(170,bpm+10));await sleep(700);stopHB();chime();
  await sleep(1000);
  const r=R[L];
  let h=0;for(const c of a.join('')+b.join(''))h=(h*31+c.codePointAt(0))%97;
  const pct=Math.min(99,r.base+h%8);
  $('res').innerHTML=`<div class="badge">${L}</div><div class="pair">${v1} 💙 ${v2}</div><h2>${r.t}</h2>
  <div class="meter"><svg width="130" height="130" viewBox="0 0 120 120"><circle class="bg" cx="60" cy="60" r="52"/><circle class="fg" id="fg" cx="60" cy="60" r="52"/></svg><b id="pc">0%</b></div>
  <div class="bars" id="bars"></div><p id="mean"></p><p class="q">“${r.q}” 🦋</p><p class="tip"><b>Tip:</b> ${TIP[L]}</p>
  <button class="btn ghost" id="share">Copy Result</button><button class="btn ghost" id="again">Try Another</button>`;
  $('res').style.display='block';
  $('res').scrollIntoView({behavior:'smooth',block:'center'});
  confetti(L==='E'?['💙','🦋']:['💙','🤍','🦋','💙']);
  setTimeout(()=>{$('fg').style.strokeDashoffset=327*(1-pct/100)},100);
  burst();
  $('bars').innerHTML=['Chemistry','Trust','Understanding','Future'].map((nm,i)=>{const v=Math.min(99,Math.max(8,pct-12+((h*(i+3))%22)));return `<div class="br"><span>${nm}</span><div class="bt"><i data-v="${v}"></i></div><em>${v}%</em></div>`}).join('');
  setTimeout(()=>document.querySelectorAll('#bars i').forEach(e=>e.style.width=e.dataset.v+'%'),200);
  let p=0;const iv=setInterval(()=>{p++;$('pc').textContent=p+'%';if(p>=pct)clearInterval(iv)},2000/pct);
  $('share').onclick=async()=>{try{await navigator.clipboard.writeText(`${v1} + ${v2} = ${r.t} (${pct}%) – MATCH IN FLAMES`);$('share').textContent='Copied!'}catch(e){$('share').textContent='Copy not allowed'}};
  $('again').onclick=()=>{$('n1').value='';$('n2').value='';$('stage').style.display='none';$('res').style.display='none';scrollTo({top:0,behavior:'smooth'});$('n1').focus()};
  busy=false;$('go').disabled=false;
  recent.unshift(`<div class="hc">${v1} + ${v2} = <b>${r.t}</b> ${pct}%</div>`);recent=recent.slice(0,6);$('hist').innerHTML=recent.join('');
  type($('mean'),r.m);
};