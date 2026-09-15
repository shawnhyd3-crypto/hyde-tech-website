/* Original illustrated surfaces projected onto the shared physical geometry. */
(()=>{
const images=new Map();
async function load(kind){if(!['support','phone','network'].includes(kind))return null;if(!images.has(kind)){const img=new Image();img.src='/'+kind+'-components.webp';images.set(kind,img.decode().then(()=>img))}return images.get(kind)}
function surfaces(kind,layers){const out=[];
const rect=(x,y,z,w,d)=>[[x,y,z],[x+w,y,z],[x+w,y+d,z],[x,y+d,z]];
function add(points,src,dst){out.push({points,color:'#ed5727',stroke:'#163447',width:1,texture:{src,dst},depth:points.reduce((s,p)=>s+p[0]+p[1]+10000*p[2],0)/points.length})}
if(kind==='support'){
const [b,p,t]=layers;
let z=t+12;add(rect(-169,-111,z,338,222),[[20,427],[465,589],[603,447]],[[-169,111,z],[169,111,z],[169,-111,z]]);
z=p+10;add(rect(-162,-104,z,324,208),[[708,349],[1190,539],[1347,364]],[[-162,104,z],[162,104,z],[162,-104,z]]);
z=b+20;add(rect(-157,-99,z,314,198),[[1378,357],[1840,568],[2025,375]],[[-157,99,z],[157,99,z],[157,-99,z]]);
const y=-111.2;add([[-155,y,t+26],[155,y,t+26],[155,y,t+203],[-155,y,t+203]],[[196,305],[603,436],[667,169]],[[-155,y,t+26],[155,y,t+26],[155,y,t+203]]);
}else if(kind==='phone'){
const [b,p,t]=layers;let z=t+15;
add(rect(-75,-150,z,150,300),[[23,145],[170,60],[720,472]],[[-75,-150,z],[75,-150,z],[75,150,z]]);
z=p+10;add(rect(-68,-143,z,136,286),[[695,180],[858,105],[1380,505]],[[-68,-143,z],[68,-143,z],[68,143,z]]);
z=b+19;add(rect(-67,-142,z,134,284),[[1384,176],[1530,93],[2021,490]],[[-67,-142,z],[67,-142,z],[67,142,z]]);
}else if(kind==='network'){
const [b,p,t]=layers;
function circle(r,z,src){const q=r/Math.sqrt(2),points=Array.from({length:64},(_,i)=>[Math.cos(i*Math.PI/32)*r,Math.sin(i*Math.PI/32)*r,z]);add(points,src,[[-q,q,z],[q,-q,z],[q,q,z]])}
circle(127,t+14.8,[[24,326],[674,326],[349,485]]);
circle(129,p+12,[[701,324],[1345,324],[1023,478]]);
circle(129,b+18,[[1394,324],[2020,324],[1707,497]]);
}
return out;
}
function draw(ctx,face,img,project){
const src=face.texture.src.map(([x,y])=>[x*img.width/2048,y*img.height/683]),dst=face.texture.dst.map(project);
const [s,u,v]=src,[t,U,V]=dst,ux=u[0]-s[0],uy=u[1]-s[1],vx=v[0]-s[0],vy=v[1]-s[1],det=ux*vy-vx*uy;
const dx=U[0]-t[0],dy=U[1]-t[1],ex=V[0]-t[0],ey=V[1]-t[1],a=(dx*vy-ex*uy)/det,b=(dy*vy-ey*uy)/det,c=(ex*ux-dx*vx)/det,d=(ey*ux-dy*vx)/det;
ctx.save();ctx.clip();ctx.transform(a,b,c,d,t[0]-a*s[0]-c*s[1],t[1]-b*s[0]-d*s[1]);ctx.drawImage(img,0,0);ctx.restore();
}
window.HydeDeviceMaterials={load,surfaces,draw};
})();
