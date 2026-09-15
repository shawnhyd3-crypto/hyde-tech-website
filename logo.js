(()=>{const $=s=>document.querySelector(s),W=1400,H=1060;
const clean=document.createElement('canvas').getContext('2d'),crt=$('#crt').getContext('2d');clean.canvas.width=W;clean.canvas.height=H;
const make=()=>{const c=document.createElement('canvas');c.width=W;c.height=H;return c};const ink=make(),hot=make(),flare=make();
const solid=document.createElement('canvas');solid.width=904;solid.height=1072;const logoImage=new Image();logoImage.src='/asset-logo-web.webp';const logoReady=logoImage.decode().then(()=>{const s=solid.getContext('2d');s.drawImage(logoImage,548,465,904,1072,0,0,904,1072);s.globalCompositeOperation='source-in';s.fillStyle='#ff4b0b';s.fillRect(0,0,904,1072);});
const specs=[
['M229 158H273V232H327V174L314 160L350 102L386 160L373 174V232H420L426 224V158H471V324L426 358V307L449 283V257','#ff4b0b'],
['M449 257A7 7 0 1 1 448.99 257','#ff6412'],
['M426 358V323L456 292V257','#ff4b0b'],
['M229 158V325L273 358V274H327V354L350 388L373 354V274H409V308L422 295V257L449 227V198','#ff4b0b'],
['M449 198A7 7 0 1 1 448.99 198','#ff6412'],
['M273 232H327M373 232H420M273 274H327M373 274H409','#ff6412']
];
const paths=specs.flatMap(([d,color])=>(d.match(/M[^M]*/g)||[]).map(part=>[part,color])).map(([d,color],i)=>{const p=document.createElementNS('http://www.w3.org/2000/svg','path');p.setAttribute('d',d);const len=p.getTotalLength();return {color,start:.1+i*.17,len,points:Array.from({length:Math.ceil(len)+1},(_,n)=>{const pt=p.getPointAtLength(Math.min(n,len));return [pt.x,pt.y]})}});
let time=0,playing=false,last=0,raf=0;const clamp=v=>Math.max(0,Math.min(1,v));
function reset(c){c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,W,H);c.setTransform(2,0,0,2,0,0);c.lineCap='round';c.lineJoin='round'}
function segment(c,p,a,b,width,color,alpha=1){const first=Math.floor(clamp(a)*p.len),end=Math.min(p.points.length-1,Math.ceil(clamp(b)*p.len));if(end<=first)return;c.globalAlpha=alpha;c.strokeStyle=color;c.lineWidth=width;c.beginPath();c.moveTo(...p.points[first]);for(let j=first+1;j<=end;j++)c.lineTo(...p.points[j]);c.stroke();c.globalAlpha=1}
function render(){const c=ink.getContext('2d'),h=hot.getContext('2d');reset(c);reset(h);const fill=clamp((time-2.4)/.8);const solidMix=fill*fill*(3-2*fill);paths.forEach(p=>{const progress=(time-p.start)/1.35,v=clamp(progress);segment(c,p,0,v,7.5,p.color,1-solidMix);if(true&&progress>0&&progress<1.24){for(let j=10;j>=0;j--){const age=j*.018,a=clamp(progress-age-.023),b=clamp(progress-age);const fade=Math.exp(-age/0.055)*clamp((1.24-progress)/.24);segment(h,p,a,b,3,'#ffb35c',fade*.8)}if(progress<1){const pt=p.points[Math.min(p.points.length-1,Math.floor(v*p.len))];h.fillStyle='#ffd08a';h.beginPath();h.arc(pt[0],pt[1],3.3,0,Math.PI*2);h.fill()}}});
c.globalAlpha=solidMix;c.drawImage(solid,229,102,242,286);c.globalAlpha=1;
// A single bright ignition per line, then a smooth return to the warm hold colour.
const f=flare.getContext('2d');reset(f);const ignition=start=>{const age=time-start;return age<=0?0:clamp(age/.16)*Math.pow(1-clamp((age-.16)/.95),2)};
const nameFlash=ignition(2.2),subFlash=ignition(2.6),warm=(base,p)=>`rgb(${base.map(v=>Math.round(v+(255-v)*p)).join(',')})`;
const name=clamp((time-2.2)/.18);c.globalAlpha=name;c.fillStyle=warm([255,210,161],nameFlash);c.textAlign='center';c.font='700 70px Barlow';c.fillText('HYDE TECH',350,431);
f.globalAlpha=nameFlash;f.fillStyle='#fffbed';f.textAlign='center';f.font='700 70px Barlow';f.fillText('HYDE TECH',350,431);
c.globalAlpha=clamp((time-2.6)/.18);c.fillStyle=warm([255,201,161],subFlash);c.font='16px Arial';f.globalAlpha=subFlash;f.font='16px Arial';const subtitle='SOLUTIONS',spacing=8,total=c.measureText(subtitle).width+(subtitle.length-1)*spacing;let x=350-total/2;c.textAlign='left';f.textAlign='left';for(const ch of subtitle){c.fillText(ch,x,470);f.fillText(ch,x,470);x+=c.measureText(ch).width+spacing}c.globalAlpha=1;f.globalAlpha=1;
for(const ctx of [clean,crt]){ctx.setTransform(1,0,0,1,0,0);ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;ctx.filter='none';ctx.fillStyle='#020302';ctx.fillRect(0,0,W,H)}clean.drawImage(ink,0,0);
// Add light at three scales, retaining a sharp source. No scanline or dot mask.
const strength=1;crt.drawImage(ink,0,0);crt.globalCompositeOperation='lighter';for(const [radius,weight] of [[23,.13],[7,.24],[1.3,.20]]){crt.filter=`blur(${radius*2}px)`;crt.globalAlpha=weight*strength;crt.drawImage(ink,0,0)}crt.globalAlpha=1;crt.filter='none';crt.drawImage(hot,0,0);crt.filter='blur(8px)';crt.globalAlpha=.7*strength;crt.drawImage(hot,0,0);
for(const [radius,weight] of [[2,.85],[10,.8],[30,.42]]){crt.filter=`blur(${radius*2}px)`;crt.globalAlpha=Math.min(1,weight*strength);crt.drawImage(flare,0,0)}
crt.globalCompositeOperation='source-over';crt.globalAlpha=1;crt.filter='none';}
const surface=document.querySelector('#crt');
let paused=false,visible=false,ready=false,elapsed=0;
surface.tabIndex=0;surface.setAttribute('role','button');surface.setAttribute('aria-label','Replay Hyde Tech Solutions logo animation');surface.style.cursor='pointer';
function mark(){surface.dataset.logoTime=time.toFixed(2)}
function tick(now){raf=0;if(!ready||paused||!visible||document.hidden||elapsed>=5){last=0;return}if(last)elapsed=Math.min(5,elapsed+Math.min(100,now-last)/1000);last=now;time=elapsed;render();mark();if(elapsed<5)raf=requestAnimationFrame(tick)}
function start(){if(ready&&!paused&&visible&&!document.hidden&&!raf&&elapsed<5){last=0;raf=requestAnimationFrame(tick)}}
function replayLogo(){const control=document.querySelector('#pause');if(control?.getAttribute('aria-pressed')==='true')control.click();paused=false;elapsed=0;time=0;last=0;if(ready){render();mark();start()}}
surface.addEventListener('click',replayLogo);surface.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();replayLogo()}});
document.addEventListener('hts-site-pause',e=>{paused=e.detail.paused;last=0;start()});
new IntersectionObserver(es=>{visible=es[0].isIntersecting;last=0;start()},{threshold:.15}).observe(surface);
document.addEventListener('visibilitychange',()=>{last=0;start()});
Promise.all([document.fonts.load('700 70px Barlow'),logoReady]).then(()=>{ready=true;paused=document.body.classList.contains('studio-paused');render();mark();start()}).catch(()=>{document.querySelector('.note').textContent='Hyde Tech Solutions';});
})();