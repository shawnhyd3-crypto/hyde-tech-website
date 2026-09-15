(()=>{'use strict';
const reduced={matches:false,addEventListener(){}};
const ease=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
function phase(t){if(t<900)return 0;if(t<4300)return ease((t-900)/3400);if(t<8500)return 1;if(t<11900)return 1-ease((t-8500)/3400);return 0}
async function mount(host){
const kind=host.dataset.assembly,canvas=document.createElement('canvas');canvas.width=canvas.height=1000;canvas.setAttribute('role','img');canvas.setAttribute('aria-label','Exploded '+({support:'laptop',phone:'handset',network:'WiFi access point',switch:'network switch'}[kind])+' illustration');host.append(canvas);
let amount=0,time=0,last=0,raf=0,running=false,visible=false,started=false,manual=false,paused=document.body.classList.contains('studio-paused');
let materialImage=null;try{materialImage=await window.HydeDeviceMaterials.load(kind)}catch{}
const model=window.HydeDeviceGeometry.create(kind,canvas,materialImage);
function render(a){amount=a;const state=model.draw(a);host.dataset.progress=a.toFixed(3);host.dataset.geometryScale=state.scale.toFixed(6);host.dataset.layerZ=state.layers.join(',');if(slider&&document.activeElement!==slider)slider.value=Math.round(a*100)}
 function tick(now){raf=0;if(!running||paused||(!visible&&!manual)||document.hidden){last=0;return}if(last)time+=Math.min(60,now-last);last=now;render(phase(time));if(time>=12300){running=false;manual=false;last=0;return}raf=requestAnimationFrame(tick)}
 function wake(){if(running&&!paused&&(visible||manual)&&!document.hidden&&!raf)raf=requestAnimationFrame(tick)}
 function replay(explicit=false){
 if(!explicit&&reduced.matches){render(1);return}if(!explicit&&paused)return;
 if(explicit){manual=true;if(paused){const globalPause=document.querySelector('#pause');if(globalPause?.getAttribute('aria-pressed')==='true')globalPause.click();paused=false;}host.scrollIntoView({block:'nearest',behavior:'instant'});}
 time=explicit?650:0;last=0;running=true;render(0);wake()
 }
 const play=host.parentElement.querySelector('[data-replay]');if(play)play.addEventListener('click',()=>replay(true));
 const slider=host.parentElement.querySelector('[data-separation]');if(slider)slider.addEventListener('input',()=>{running=false;render(Number(slider.value)/100)});
 host.addEventListener('pointerenter',()=>{if(!running)replay()});host.addEventListener('focusin',()=>{if(!running)replay()});
 new IntersectionObserver(es=>{visible=es[0].isIntersecting;if(visible&&!started){started=true;replay()}wake()},{threshold:.25}).observe(host);
 document.addEventListener('hts-site-pause',e=>{paused=e.detail.paused;last=0;wake()});
 document.addEventListener('visibilitychange',()=>{last=0;wake()});
 reduced.addEventListener('change',()=>{paused=reduced.matches;if(paused){running=false;render(1)}else wake()});
 host.classList.add('assembly-ready');render(amount);
 host.assembly={replay,render,get running(){return running},get amount(){return amount}};
}
document.querySelectorAll('[data-assembly]').forEach(mount);
})();