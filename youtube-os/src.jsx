import React from 'react';
import {AbsoluteFill,Audio,Composition,Sequence,registerRoot,staticFile,useCurrentFrame,interpolate} from 'remotion';
import {Vector3,PerspectiveCamera} from 'three';
const W=1080,H=1920,FPS=30;
const clamp=(n)=>Math.max(0,Math.min(1,n));
const rand=(i)=>{let n=Math.sin(i*127.1+311.7)*43758.5453;return n-Math.floor(n)};
function Art({theme,color,index,f}){
 const t=f/30, k=index%5;
 const camera=new PerspectiveCamera(48,W/H,.1,120);
 camera.position.set(Math.sin(t*.4+index)*1.6,Math.cos(t*.3)*.7,14-1.8*Math.sin(t*.7));camera.lookAt(0,0,0);camera.updateMatrixWorld();
 const project=(x,y,z)=>{const p=new Vector3(x,y,z).project(camera);return [(p.x+1)*W/2,(1-p.y)*H/2]};
 const stars=Array.from({length:100},(_,i)=>{const p=project((rand(i+index*17)-.5)*24,(rand(i+91)-.5)*28,-rand(i+177)*18);return <circle key={i} cx={p[0]} cy={p[1]} r={1+rand(i+48)*3} opacity={.15+rand(i+2)*.65} fill={color}/>});
 const cX=540+Math.sin(t*.9+index)*55,cY=790+Math.cos(t*.7)*45;
 const motif=theme==='city'?<g>{Array.from({length:28},(_,i)=>{const z=-(i%7)*1.7; const x=(i%14-7)*1.35;const a=project(x,-3,z),b=project(x,-3+1+rand(i)*5,z);return <g key={i}><rect x={a[0]} y={b[1]} width={Math.abs(150/(1-z*.14))} height={Math.abs(a[1]-b[1])} fill={i%2?'#15202b':'#26384b'} stroke={color} strokeOpacity=".4"/>{Array.from({length:5},(_,j)=><rect key={j} x={a[0]+12} y={b[1]+j*22+10} width="12" height="9" fill={color} opacity={rand(i*5+j)>.6?.85:.1}/>)}</g>})}</g>:theme==='sun'?<g><circle cx={cX-150} cy={cY} r={220+index*5} fill="url(#disc)"/><circle cx={cX+210} cy={cY-150} r={118+index*3} fill="url(#disc2)"/>{Array.from({length:12},(_,i)=><ellipse key={i} cx={cX} cy={cY} rx={280+i*20} ry={75+i*12} stroke={color} strokeOpacity=".12" fill="none" transform={'rotate('+(-25+index*4)+' '+cX+' '+cY+')'}/>)}</g>:theme==='eye'?<g><ellipse cx={cX} cy={cY} rx="390" ry={160+100*Math.abs(Math.sin(t+index))} fill="#101922" stroke={color} strokeWidth="5"/>{Array.from({length:24},(_,i)=><path key={i} d={'M '+cX+' '+cY+' l '+(Math.cos(i*Math.PI/12+t*.2)*210)+' '+(Math.sin(i*Math.PI/12+t*.2)*140)} stroke={color} opacity=".45" strokeWidth="3"/>)}<circle cx={cX} cy={cY} r={110+25*Math.sin(t*2)} fill="#020507" stroke={color} strokeWidth="6"/></g>:theme==='memory'?<g>{Array.from({length:10},(_,i)=>{const p=project((i%5-2)*1.7,Math.floor(i/5)*2-1,Math.sin(i+index)*2);return <g key={i} transform={'translate('+p[0]+' '+p[1]+') rotate('+Math.sin(t+i)*8+')'}><rect x="-95" y="-120" width="190" height="240" rx="5" fill="#19232c" stroke={color} strokeWidth="3"/><path d="M-65 55 L-65 -20 L0 -70 L65 -20 L65 55Z" fill={i===index%10?color:'#344451'}/><circle cx="42" cy="-78" r="12" fill={color}/></g>})}</g>:<g>{Array.from({length:13},(_,i)=><ellipse key={i} cx={cX} cy={cY} rx={55+i*30+(t*12)%30} ry={25+i*20} fill="none" stroke={color} opacity={.8-i*.05} strokeWidth={i%3===0?4:1}/>)}<path d={'M 100 '+cY+' '+Array.from({length:36},(_,i)=>'L '+(100+i*25)+' '+(cY+Math.sin(i*.65+t*5)*Math.sin(i*.15+index)*90)).join(' ')} fill="none" stroke={color} strokeWidth="5"/></g>;
 return <svg width={W} height={H} viewBox="0 0 1080 1920" style={{position:'absolute',inset:0}}>
 <defs><radialGradient id="bg"><stop stopColor="#23313e"/><stop offset="1" stopColor="#03060c"/></radialGradient><radialGradient id="disc"><stop stopColor="#fff5d4"/><stop offset=".8" stopColor={color}/><stop offset="1" stopColor="#451600"/></radialGradient><radialGradient id="disc2"><stop stopColor="#fff"/><stop offset="1" stopColor="#6d7fa1"/></radialGradient></defs>
 <rect width={W} height={H} fill="url(#bg)"/>{stars}
 <g transform={'translate(540 850) scale('+(1+(k===0?.05:.12)*t)+') translate(-540 -850)'}>{motif}</g>
 {k===1&&<g stroke={color} opacity=".5" fill="none"><rect x="108" y="330" width="864" height="920" strokeWidth="2"/><path d="M540 280 V1380 M50 790 H1030" strokeDasharray="10 20"/></g>}
 {k===2&&<g transform={'translate(0 '+(t*22)+')'} opacity=".35">{Array.from({length:12},(_,i)=><path key={i} d={'M80 '+(300+i*80)+' H1000'} stroke={color}/>)}</g>}
 {k===3&&<g fill={color} opacity=".3">{Array.from({length:20},(_,i)=><rect key={i} x={rand(i+index)*1000} y={rand(i+54)*1100+230} width={12+rand(i)*80} height="3"/>)}</g>}
 {k===4&&<rect x="0" y={300+(t*160)%1000} width={W} height="4" fill={color} opacity=".8"/>}
 <rect x="44" y="44" width="992" height="1832" fill="none" stroke={color} opacity=".2" strokeWidth="2"/>
 </svg>;
}
function Beat({beat,episode,index}){
 const f=useCurrentFrame(),p=clamp(f/8), fade=interpolate(f,[0,6,beat.frames-5,beat.frames],[.45,1,1,.8],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 const words=beat.text.split(' '), shown=Math.min(words.length,Math.max(1,Math.ceil((f+4)/Math.max(1,beat.speechFrames)*words.length)));
 return <AbsoluteFill style={{background:'#03060c',color:'#fff',fontFamily:'Arial, sans-serif',opacity:fade}}>
 <Art theme={episode.theme} color={episode.color} index={index} f={f}/>
 <div style={{position:'absolute',top:120,left:84,right:84,display:'flex',justifyContent:'space-between',fontSize:27,letterSpacing:6,color:episode.color,fontWeight:700}}><span>INVERSE REALITY</span><span>{String(index+1).padStart(2,'0')}</span></div>
 <div style={{position:'absolute',top:192,left:84,right:84,fontSize:38,fontWeight:700,letterSpacing:2,opacity:.8}}>{episode.title.toUpperCase()}</div>
 <div style={{position:'absolute',left:80,right:100,bottom:310,padding:'26px 32px',background:'rgba(0,0,0,.76)',borderLeft:'7px solid '+episode.color,transform:'translateY('+((1-p)*30)+'px)',fontSize:65,lineHeight:1.15,fontWeight:800,textShadow:'0 2px 8px #000'}}>{words.map((w,i)=><span key={i} style={{color:i===shown-1?episode.color:i<shown?'white':'#b0bcc4'}}>{w} </span>)}</div>
 <div style={{position:'absolute',left:84,bottom:220,fontSize:22,letterSpacing:5,color:episode.color}}>ARCHIVO FICTICIO / {episode.id.toUpperCase()}</div>
 <div style={{position:'absolute',left:84,right:84,bottom:185,height:5,background:'#34434c'}}><div style={{height:5,width:(100*(index+f/beat.frames)/episode.beats.length)+'%',background:episode.color}}/></div>
 </AbsoluteFill>;
}
function Episode({episode}){let pos=0;return <AbsoluteFill>{episode.beats.map((b,i)=>{const start=pos;pos+=b.frames;return <Sequence key={i} from={start} durationInFrames={b.frames}><Beat beat={b} episode={episode} index={i}/></Sequence>})}<Audio src={staticFile(episode.audio)}/></AbsoluteFill>}
const sample={id:'preview',title:'Inverse Reality',theme:'radio',color:'#71e9ef',beats:[{text:'Previsualización',frames:90,speechFrames:80}],audio:'mix.wav'};
const Root=()=> <Composition id="Episode" component={Episode} width={W} height={H} fps={FPS} durationInFrames={90} defaultProps={{episode:sample}} calculateMetadata={({props})=>({durationInFrames:props.episode.beats.reduce((n,b)=>n+b.frames,0)})}/>;
registerRoot(Root);
