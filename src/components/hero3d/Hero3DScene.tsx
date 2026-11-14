import { useEffect, useId, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from 'react';
import { Icon } from '@/components/Icon';
import { heroScenes, type Hero3DVariant, type ObjectKind } from './heroScenes';
import islands from './philippines.json';
import './hero3d.css';
export type { Hero3DVariant } from './heroScenes';

const initialView={x:14,y:-22};
const clamp=(value:number,min:number,max:number)=>Math.max(min,Math.min(max,value));

/** A demand-rendered CSS camera: no perpetual JavaScript frame loop. */
export function Hero3DStage({children,variant}:{children:ReactNode;variant:Hero3DVariant}) {
 const ref=useRef<HTMLElement>(null);
 const view=useRef({...initialView});
 const drag=useRef<{id:number;x:number;y:number;view:{x:number;y:number}}|null>(null);
 const frame=useRef(0);
 const hintId=useId();
 const scene=heroScenes[variant];
 const rotate=(x:number,y:number)=>{
  view.current={x:clamp(x,-32,48),y:clamp(y,-65,65)};
  cancelAnimationFrame(frame.current);
  frame.current=requestAnimationFrame(()=>{
   ref.current?.style.setProperty('--view-x',`${view.current.x}deg`);
   ref.current?.style.setProperty('--view-y',`${view.current.y}deg`);
  });
 };
 const endDrag=(event:PointerEvent<HTMLDivElement>)=>{
  if(drag.current?.id!==event.pointerId)return;
  drag.current=null;
  if(event.currentTarget.hasPointerCapture?.(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);
  ref.current?.removeAttribute('data-dragging');
 };
 useEffect(()=>{
  const element=ref.current;if(!element)return;
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  let visible=!('IntersectionObserver' in window);
  const sync=()=>{element.dataset.active=String(visible&&!document.hidden&&!preference.matches)};
  const observer='IntersectionObserver' in window?new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting??false;sync()}):null;
  observer?.observe(element);
  preference.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);sync();
  return()=>{observer?.disconnect();preference.removeEventListener('change',sync);document.removeEventListener('visibilitychange',sync);cancelAnimationFrame(frame.current);drag.current=null};
 },[]);
 return <figure ref={ref} className={`hero3d-stage hero3d-stage--${variant}`} data-hero-scene={variant} data-object-kind={scene.kind}
   style={{'--scene-accent':('accent' in scene?scene.accent:'#72e4d4'),'--view-x':`${initialView.x}deg`,'--view-y':`${initialView.y}deg`} as CSSProperties}>
  <div className="hero3d-viewport" tabIndex={0} role="group" aria-label={`${scene.title} — interactive 3D object`} aria-describedby={hintId}
   onPointerDown={event=>{if(!event.isPrimary||event.button!==0||(event.target as Element).closest('button'))return;drag.current={id:event.pointerId,x:event.clientX,y:event.clientY,view:{...view.current}};event.currentTarget.setPointerCapture(event.pointerId);ref.current?.setAttribute('data-dragging','true')}}
   onPointerMove={event=>{const start=drag.current;if(!start||start.id!==event.pointerId)return;rotate(start.view.x-(event.clientY-start.y)*.18,start.view.y+(event.clientX-start.x)*.25)}}
   onPointerUp={endDrag} onPointerCancel={endDrag} onLostPointerCapture={()=>{drag.current=null;ref.current?.removeAttribute('data-dragging')}}
   onKeyDown={event=>{if(event.target!==event.currentTarget)return;const steps:Record<string,[number,number]>={ArrowLeft:[0,-10],ArrowRight:[0,10],ArrowUp:[-8,0],ArrowDown:[8,0]};if(event.key==='Home'){event.preventDefault();rotate(initialView.x,initialView.y)}else if(steps[event.key]){event.preventDefault();const[x,y]=steps[event.key];rotate(view.current.x+x,view.current.y+y)}}}>
   <div className="hero3d-floor" aria-hidden="true"/>
   <div className="hero3d-rig">{children}</div>
   {variant==='philippines'&&<span className="hero3d-object-label" aria-hidden="true">PHILIPPINES</span>}
  </div>
  <figcaption className="hero3d-caption"><strong>{scene.title}</strong><span id={hintId}>Drag to turn · Arrow keys to rotate</span></figcaption>
  <div className="hero3d-controls" aria-label="3D view controls">
   {([['left',0,-10,180],['up',-8,0,-90],['down',8,0,90],['right',0,10,0]] as const).map(([direction,x,y,angle])=><button key={direction} type="button" aria-label={`Rotate object ${direction}`} onClick={()=>rotate(view.current.x+x,view.current.y+y)}><Icon name="arrow" size={16} style={{transform:`rotate(${angle}deg)`}}/></button>)}
   <button type="button" className="hero3d-reset" aria-label="Reset 3D view" onClick={()=>rotate(initialView.x,initialView.y)}><Icon name="refresh" size={16}/><span>Reset</span></button>
  </div>
 </figure>;
}

const regions=[{id:'luzon',name:'Luzon',x:44,y:27,detail:'Northern island group'},{id:'visayas',name:'Visayas',x:65,y:56,detail:'Central island group'},{id:'mindanao',name:'Mindanao',x:79,y:81,detail:'Southern island group'}];
export function PhilippinesMap() {
 const [selected,setSelected]=useState('luzon');
 const id=useId().replace(/:/g,'');
 const region=regions.find(item=>item.id===selected)!;
 return <>
  <div className="hero3d-map" data-map-region={selected}>
   {[-24,-20,-16,-12,-8,-4,0].map((depth,index)=><svg key={depth} viewBox="0 0 365 530" aria-hidden="true" focusable="false" className="hero3d-map-layer" data-map-layer={depth===0?'surface':index} style={{transform:`translateZ(${depth}px)`}}>
    {depth===0&&<defs><linearGradient id={`${id}-land`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#8cf5df" stopOpacity=".9"/><stop offset=".5" stopColor="#178ba4"/><stop offset="1" stopColor="#0e385e"/></linearGradient></defs>}
    {islands.map((island,i)=><path key={i} d={island.d} data-region={island.region} className={selected===island.region?'is-selected':''} fill={depth===0?`url(#${id}-land)`:'#0b4962'}/>)}
   </svg>)}
   {regions.map(item=><button key={item.id} type="button" className="hero3d-map-pin" style={{left:`${item.x}%`,top:`${item.y}%`}} aria-label={`Explore ${item.name}`} aria-pressed={item.id===selected} onClick={()=>setSelected(item.id)}><i/><span>{item.name}</span></button>)}
   <span className="hero3d-map-coordinate" aria-hidden="true">LUZON · VISAYAS · MINDANAO</span>
  </div>
  <div className="hero3d-map-detail" role="status"><strong>{region.name}</strong><span>{region.detail} · Geographic view</span></div>
 </>;
}

function Prism({children,className='',style}:{children?:ReactNode;className?:string;style?:CSSProperties}) {
 return <div className={`object-prism ${className}`} style={style}>{['back','left','right','top','bottom'].map(face=><div key={face} className={`prism-face prism-${face}`}/>)}<div className="prism-face prism-front">{children}</div></div>;
}
function Model({kind,variant}:{kind:ObjectKind;variant:Hero3DVariant}) {
 const scene=heroScenes[variant];
 const symbol=<Icon name={scene.icon} size={56}/>;
 switch(kind){
  case 'database':return <div className="object-database">{[0,1,2].map(i=><div className="database-cylinder" key={i} style={{top:i*53,transform:`translateZ(${i*12}px)`}}><span/><i/><b/><em/></div>)}</div>;
  case 'cube':return <Prism className="object-cube">{symbol}<div className="neural-nodes">{Array.from({length:9},(_,i)=><i key={i}/>)}</div></Prism>;
  case 'browser':return <div className="object-browsers">{[0,1,2].map(i=><Prism key={i} className="object-browser" style={{transform:`translate3d(${(i-1)*35}px,${(i-1)*-28}px,${i*24}px)`}}><div className="browser-top"><i/><i/><i/><span>gmg</span></div><div className="browser-layout"><b/><div><span/><span/><em/></div></div></Prism>)}</div>;
  case 'calendar':return <Prism className="object-calendar"><div className="calendar-binding"><i/><i/></div><div className="calendar-title">YOUR NEXT STEP</div><div className="calendar-grid">{Array.from({length:21},(_,i)=><span key={i} className={i===10?'selected':''}>{i===10?<Icon name="check" size={22}/>:''}</span>)}</div></Prism>;
  case 'messages':return <div className="object-messages">{[0,1,2].map(i=><Prism key={i} className="object-message" style={{transform:`translate3d(${(i-1)*45}px,${(i-1)*-68}px,${i*26}px)`}}><Icon name={i===1?'check':'message'} size={27}/><div><span/><span/></div></Prism>)}</div>;
  case 'hub':return <div className="object-network"><div className="network-ring ring-a"/><div className="network-ring ring-b"/><Prism className="network-core">{symbol}</Prism>{[0,1,2,3].map((i)=><span key={i} className={`network-node node-${i}`}><Icon name={['database','mail','calendar','users'][i] as 'database'|'mail'|'calendar'|'users'} size={24}/></span>)}</div>;
  case 'buildings':case 'steps':case 'tiers':return <div className={`object-columns object-${kind}`}>{[0,1,2].map(i=><Prism key={i} className="object-column" style={{'--height':`${80+i*55}px`,'--width':'76px','--depth':'42px',left:`${i*85}px`,bottom:0} as CSSProperties}><Icon name={kind==='buildings'?'building':kind==='tiers'?'chart':'check'} size={24}/><span>{kind==='tiers'?['Launch','Growth','Scale'][i]:`0${i+1}`}</span>{kind==='buildings'&&<div className="building-windows">{Array.from({length:6},(_,j)=><i key={j}/>)}</div>}</Prism>)}</div>;
  case 'globe':return <div className="object-globe"><div className="globe-sphere"><i/><i/><i/><b/><b/><span>GMG</span></div><div className="globe-ring"/></div>;
  case 'headset':return <div className="object-headset"><div className="headset-band"/><Prism className="headset-ear ear-left"/><Prism className="headset-ear ear-right"/><div className="headset-mic"/><span className="headset-center"><Icon name="users" size={48}/></span></div>;
  case 'book':return <div className="object-book"><Prism className="book-left"><span className="book-line"/><span className="book-line"/>{symbol}<span className="book-line short"/></Prism><Prism className="book-right"><span className="book-line"/><span className="book-line"/><span className="book-line short"/><span className="book-mark"><Icon name="check" size={28}/></span></Prism></div>;
  case 'shield':return <div className="object-shield">{[-24,-18,-12,-6,0].map(z=><svg key={z} viewBox="0 0 200 240" style={{transform:`translateZ(${z}px)`}}><path d="M100 10 184 44v65c0 55-38 93-84 121-46-28-84-66-84-121V44Z"/></svg>)}<span>{symbol}</span></div>;
  case 'document':return <Prism className="object-document"><span className="document-seal">{symbol}</span>{Array.from({length:5},(_,i)=><span key={i} className="book-line"/>)}</Prism>;
  case 'calculator':return <Prism className="object-calculator"><div className="calculator-display"><span>ESTIMATE</span><b>$ —</b></div><div className="calculator-keys">{Array.from({length:12},(_,i)=><span key={i}>{i===11?'=':i===10?'+':i===9?'0':String(i+1)}</span>)}</div></Prism>;
  case 'briefcase':return <div className="object-case"><div className="case-handle"/><Prism className="case-body">{symbol}<span className="case-latch"/></Prism></div>;
  case 'envelope':return <div className="object-envelope"><Prism className="envelope-letter"><Icon name={scene.icon} size={44}/><span className="book-line"/><span className="book-line short"/></Prism><Prism className="envelope-pocket"><span/></Prism></div>;
  case 'coin':case 'compass':return <div className={`object-disc object-${kind}`}>{[-28,-21,-14,-7,0].map(z=><div className="disc-layer" key={z} style={{transform:`translateZ(${z}px)`}}/>)}<span>{kind==='compass'?<i className="compass-needle"/>:symbol}</span></div>;
  default:return null;
 }
}
export function Hero3DScene({variant}:{variant:Hero3DVariant}) {
 const scene=heroScenes[variant];
 return <Hero3DStage variant={variant}>{scene.kind==='map'?<PhilippinesMap/>:<><div className={`hero3d-object hero3d-object--${scene.kind}`} aria-hidden="true"><Model kind={scene.kind} variant={variant}/></div><div className="hero3d-chips" aria-hidden="true">{scene.labels.map((label,index)=><span className={`hero3d-chip chip-${index}`} key={label}><i/>{label}</span>)}</div></>}</Hero3DStage>;
}
export function Hero3DLayout({children}:{children:ReactNode;variant?:Hero3DVariant}) {return <div className="hero-page-layout is-text"><div className="hero-page-copy">{children}</div></div>}
export default Hero3DScene;
