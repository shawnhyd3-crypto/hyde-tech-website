(()=>{
if(new URLSearchParams(location.search).get('art')==='static')return;
const names={support:'laptop',network:'WiFi access point',phone:'handset',switch:'network switch'};
document.querySelectorAll('img.page-art,img.hero-art').forEach(img=>{
 const kind=Object.keys(names).find(k=>img.getAttribute('src').includes(k));if(!kind||kind==='switch')return;
 const wrapper=document.createElement('div');wrapper.className='assembly-feature';
 const stage=document.createElement('div');stage.className='assembly-stage';stage.dataset.assembly=kind;
 img.replaceWith(wrapper);stage.append(img);wrapper.append(stage);
 const controls=document.createElement('div');controls.className='assembly-controls';
 const button=document.createElement('button');button.type='button';button.dataset.replay='';button.textContent='Replay assembly ↻';button.setAttribute('aria-label','Replay '+names[kind]+' assembly');controls.append(button);wrapper.append(controls);
 if(kind==='switch'){wrapper.classList.add('assembly-hero');wrapper.closest('.hero').classList.add('has-assembly');}
});
})();
