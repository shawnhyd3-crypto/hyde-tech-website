/* Shared orthographic geometry. All components use one projection and physical units. */
(()=>{'use strict';
const ink='#163447',orange='#ee5727',cream='#fff0d5',board='#23495b',metal='#a3b3b6';
const project=([x,y,z])=>[(x-y)*.8660254,(x+y)*.43-z];
function scene(kind,open){const faces=[];
 function face(points,color,stroke=ink,width=1){faces.push({id:faces.length,points,color,stroke,width,depth:points.reduce((s,p)=>s+p[0]+p[1]+10000*p[2],0)/points.length})}
 function box(x,y,z,w,d,h,color=orange){const p=[[x,y,z],[x+w,y,z],[x+w,y+d,z],[x,y+d,z]],q=p.map(v=>[v[0],v[1],z+h]);face([p[0],p[1],q[1],q[0]],shade(color,.7));face([p[1],p[2],q[2],q[1]],shade(color,.76));face([p[2],p[3],q[3],q[2]],shade(color,.87));face([p[3],p[0],q[0],q[3]],shade(color,.7));face(q,color)}
 function plane(x,y,z,w,d,color){face([[x,y,z],[x+w,y,z],[x+w,y+d,z],[x,y+d,z]],color)}
 function disk(x,y,z,r,h,color,segments=56){const a=Array.from({length:segments},(_,i)=>{const t=i*Math.PI*2/segments;return [x+Math.cos(t)*r,y+Math.sin(t)*r,z]});for(let i=0;i<segments;i++){const j=(i+1)%segments;face([a[i],a[j],[a[j][0],a[j][1],z+h],[a[i][0],a[i][1],z+h]],shade(color,.72+.12*Math.sin(i/segments*Math.PI*2)),null)}face(a.map(p=>[p[0],p[1],z+h]),color)}
 function screw(x,y,z){disk(x,y,z,3.5,1,metal,12);plane(x-2,y-.5,z+1.1,4,1,ink)}
 function chip(x,y,z,w=24,d=20){box(x,y,z,w,d,4,ink);for(let k=3;k<w;k+=5){plane(x+k,y-3,z+.7,2,3,metal);plane(x+k,y+d,z+.7,2,3,metal)}for(let k=3;k<d;k+=5){plane(x-3,y+k,z+.7,3,2,metal);plane(x+w,y+k,z+.7,3,2,metal)}}
 function trace(x,y,z,w,d){plane(x,y,z,w,1.1,'#b59855');plane(x+w-1,y,z,1.1,d,'#b59855')}
 const gap=kind==='support'?105:kind==='phone'?115:110;
 const layers=kind==='support'?[0,21+gap*open,32+gap*2*open]:kind==='phone'?[0,19+gap*open,30+gap*2*open]:kind==='network'?[0,18+gap*open,35+gap*2*open]:[0,20+gap*open,42+gap*2*open,62+gap*3*open];
 if(kind==='support'){
  const [b,p,t]=layers;
  box(-170,-112,b,340,224,15);box(-170,-112,b+15,340,5,17);box(-170,107,b+15,340,5,17);box(-170,-107,b+15,5,214,17);box(165,-107,b+15,5,214,17);plane(-157,-100,b+15.1,314,200,shade(orange,.72));
  for(const x of [-150,150])for(const y of [-93,93]){disk(x,y,b+15,5,5,orange,12);screw(x,y,b+20)}
  box(-163,-105,p,326,210,3,board);const z=p+3;
  box(-147,30,z,294,62,5,'#24313b');for(let k=0;k<3;k++)plane(-140+k*96,35,z+5.2,89,51,'#344957');
  disk(-108,-56,z,33,4,metal);disk(-108,-56,z+4,25,.5,ink);for(let i=0;i<16;i++){const a=i*Math.PI/8;face([[-108,-56,z+5],[-108+Math.cos(a)*23,-56+Math.sin(a)*23,z+5],[-108+Math.cos(a+.13)*18,-56+Math.sin(a+.13)*18,z+5]],'#496673',null)}
  chip(-25,-62,z,48,40);plane(-75,-62,z+5,50,10,'#cc884e');plane(-83,-60,z+5,9,34,'#cc884e');
  for(let i=0;i<2;i++){box(45,-82+i*32,z,90,24,3,'#37665e');for(let j=0;j<4;j++)box(50+j*20,-78+i*32,z+3,14,15,2,ink)}
  for(let i=0;i<12;i++){trace(-145+i*24,-15,z+.2,13,25);box(-144+i*24,17,z,7,4,2,metal)}
  for(let i=0;i<3;i++)box(144,-76+i*32,z,19,23,6,metal);
  box(-170,-112,t,340,224,9);const top=t+9;
  for(let row=0;row<5;row++)for(let col=0;col<13;col++)box(-143+col*22,-86+row*22,top,18,16,2,cream);
  box(-64,34,top+.2,128,58,.5,shade(orange,.87));
  // Screen is rigidly hinged to the rear edge of the keyboard assembly.
  const screenY=-112;box(-166,screenY-9,top,332,9,207,orange);
  face([[-155,screenY+.2,top+17],[155,screenY+.2,top+17],[155,screenY+.2,top+194],[-155,screenY+.2,top+194]],ink);
  face([[-145,screenY+.4,top+27],[145,screenY+.4,top+27],[145,screenY+.4,top+184],[-145,screenY+.4,top+184]],'#284d61');
  face([[-145,screenY+.5,top+184],[40,screenY+.5,top+184],[-145,screenY+.5,top+45]],'#335c6d',null);
  for(const x of [-135,110])box(x,-115,top,25,11,7,ink);
 }else if(kind==='phone'){
  const [b,p,t]=layers;box(-76,-151,b,152,302,15);box(-76,-151,b+15,152,5,15);box(-76,146,b+15,152,5,15);box(-76,-146,b+15,5,292,15);box(71,-146,b+15,5,292,15);plane(-68,-143,b+15.1,136,286,shade(orange,.74));
  box(-54,-60,b+15,108,125,3,metal);
  box(-69,-144,p,138,288,3,board);const z=p+3;disk(0,-112,z,26,5,metal);disk(0,-112,z+5,20,.5,ink);
  box(-52,-75,z,104,64,4,ink);plane(-47,-70,z+4.1,94,54,'#456879');chip(-30,20,z,43,43);
  for(let i=0;i<5;i++){trace(-58+i*24,70,z+.1,12,47);box(-56+i*24,120,z,8,8,3,metal)}
  box(-76,-151,t,152,302,12);const top=t+12;
  for(let row=0;row<3;row++)for(let col=0;col<7;col++)disk(-30+col*10,-129+row*10,top+.2,2.4,.2,ink,10);
  box(-57,-85,top,114,76,1,ink);plane(-50,-78,top+1.1,100,62,'#41677d');
  disk(0,15,top,20,2,ink);disk(0,15,top+2,11,1,'#446274');
  for(let row=0;row<4;row++)for(let col=0;col<3;col++)box(-56+col*39,48+row*22,top,31,16,2,cream);
  for(const x of [-53,33])box(x,4,top,20,12,2,cream);
 }else if(kind==='network'){
  const [b,p,t]=layers;disk(0,0,b,140,12,orange);
  for(let i=0;i<56;i++){const a=i*Math.PI/28,c=(i+1)*Math.PI/28,outer=t=>[140*Math.cos(t),140*Math.sin(t)],inner=t=>[133*Math.cos(t),133*Math.sin(t)];const u=outer(a),v=outer(c),r=inner(a),s=inner(c);face([[...u,b+12],[...v,b+12],[...v,b+35],[...u,b+35]],shade(orange,.82),null);face([[...u,b+35],[...v,b+35],[...s,b+35],[...r,b+35]],orange);}
disk(0,0,b+12,130,2,shade(orange,.75));
  for(let i=0;i<4;i++){const a=i*Math.PI/2;disk(Math.cos(a)*108,Math.sin(a)*108,b+14,6,3,orange);}
  disk(0,0,p,130,3,board);const z=p+3;
  chip(-23,-23,z,46,46);for(let i=0;i<4;i++){const a=i*Math.PI/2,x=Math.cos(a)*77,y=Math.sin(a)*77;box(x-19,y-16,z,38,32,6,metal);trace(x-23,y+20,z+.2,41,20)}
  for(let i=0;i<18;i++){const a=i*Math.PI/9;box(Math.cos(a)*112-3,Math.sin(a)*112-3,z,6,6,3,'#c19b52')}
  box(-28,91,z,56,27,9,metal);plane(-22,95,z+9.1,44,19,ink);
  disk(0,0,t,140,7,cream);disk(0,0,t+7,136,4,cream);disk(0,0,t+11,128,3,cream);
  disk(0,0,t+14.1,30,.2,'#ed5828');disk(0,0,t+14.4,27,.2,cream);
 }else{
  const [b,p,h,t]=layers;box(-170,-105,b,340,210,16);box(-160,-95,p,320,190,3,board);
  for(let i=0;i<4;i++){box(-130+i*65,54,p+3,50,40,23,metal);face([[-126+i*65,94,p+7],[-84+i*65,94,p+7],[-84+i*65,94,p+22],[-126+i*65,94,p+22]],ink)}
  for(let i=0;i<3;i++)chip(-120+i*88,-66,p+3,45,40);
  box(-155,-90,h,310,180,5,metal);for(let i=0;i<17;i++)box(-147+i*18,-86,h+5,4,171,15,metal);
  box(-170,-105,t,340,210,8);box(160,-105,t-35,10,210,35);box(-170,-105,t-35,10,210,35);
  for(let row=0;row<9;row++)for(let col=0;col<19;col++)disk(-143+col*16,-75+row*18,t+8.1,3,.1,ink,8);
 }
 return {faces:faces.sort((a,b)=>a.depth-b.depth),layers};
}
function shade(hex,f){return '#'+[1,3,5].map(i=>Math.round(parseInt(hex.slice(i,i+2),16)*f).toString(16).padStart(2,'0')).join('')}
function create(kind,canvas,materialImage){const ctx=canvas.getContext('2d'),full=scene(kind,1),projected=full.faces.flatMap(f=>f.points.map(project));
 const xs=projected.map(p=>p[0]),ys=projected.map(p=>p[1]);const bounds={x0:Math.min(...xs),x1:Math.max(...xs),y0:Math.min(...ys),y1:Math.max(...ys)};
 const scale=Math.min(850/(bounds.x1-bounds.x0),860/(bounds.y1-bounds.y0));
 const pattern=document.createElement('canvas');pattern.width=pattern.height=9;const pc=pattern.getContext('2d');pc.fillStyle='rgba(17,43,59,.17)';pc.fillRect(1,1,1,1);pc.fillRect(5,5,1,1);const grain=ctx.createPattern(pattern,'repeat');
 function draw(open){const s=scene(kind,open);if(materialImage){const mats=HydeDeviceMaterials.surfaces(kind,s.layers);s.faces.push(...mats);s.faces.sort((a,b)=>a.depth-b.depth)}ctx.clearRect(0,0,1000,1000);ctx.save();
 const points=s.faces.flatMap(f=>f.points.map(project)),min=Math.min(...points.map(p=>p[1])),max=Math.max(...points.map(p=>p[1]));
 ctx.translate(500,490);ctx.scale(scale,scale);ctx.translate(-(bounds.x0+bounds.x1)/2,-(min+max)/2);
 for(const f of s.faces){ctx.beginPath();f.points.map(project).forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fillStyle=f.color;ctx.fill();if(f.texture&&materialImage)HydeDeviceMaterials.draw(ctx,f,materialImage,project);if(f.stroke){ctx.strokeStyle=f.stroke;ctx.lineWidth=f.width/scale;ctx.stroke()}if(!f.texture){ctx.fillStyle=grain;ctx.fill()}}
 ctx.restore();return {layers:s.layers,scale,projection:'orthographic',open};}
 return {draw,scale,bounds};
}
window.HydeDeviceGeometry={create,project,scene};
})();
