import { useState, useEffect, useRef } from "react";
import { ShoppingCart, X, ChevronDown, Check, Star, Menu, Instagram, Facebook, Linkedin, Youtube, MapPin, MessageCircle, Send, Plus, Phone, Mail, Shield, Zap } from "lucide-react";

const Logo = ({ white = false, size = 34 }) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
    <circle cx="22" cy="22" r="20" fill={white?"rgba(255,255,255,.12)":"#EBF3FB"} stroke={white?"rgba(255,255,255,.5)":"#1565C0"} strokeWidth="1.5"/>
    <rect x="18.5" y="10" width="7" height="24" rx="3.5" fill={white?"white":"#1565C0"}/>
    <rect x="10" y="18.5" width="24" height="7" rx="3.5" fill={white?"white":"#1565C0"}/>
    <circle cx="32" cy="12" r="5" fill={white?"#A8D8B9":"#2EAA6E"}/>
  </svg>
);
const LogoFull = ({ white=false }) => (
  <div style={{display:"flex",alignItems:"center",gap:9,cursor:"pointer",userSelect:"none"}}>
    <Logo white={white}/>
    <div>
      <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:19,fontWeight:700,lineHeight:1,color:white?"white":"#0B3D6B",letterSpacing:"-0.02em"}}>
        Salud<span style={{color:white?"#A8D8B9":"#2EAA6E"}}>Integral</span>
      </div>
      <div style={{fontSize:8,fontWeight:700,letterSpacing:"0.18em",color:white?"rgba(255,255,255,.45)":"#8AA3BA",textTransform:"uppercase"}}>Telemedicina · IA</div>
    </div>
  </div>
);

const SLIDES=[
  {img:"https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1400",tag:"Prevención",title:"Tu salud,",accent:"sin trámites.",sub:"Órdenes médicas oficiales en 5 minutos. Sin citas, sin filas."},
  {img:"https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=1400",tag:"Interpretación IA",title:"Resultados que",accent:"entiendes.",sub:"Un médico revisa tus exámenes y te explica qué significan en 24h."},
  {img:"https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=1400",tag:"Prevención",title:"Cuida tu salud",accent:"hoy.",sub:"Kits preventivos diseñados por médicos al mejor precio."},
  {img:"https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1400",tag:"Laboratorio",title:"Exámenes en",accent:"cualquier lab.",sub:"Órdenes válidas en +200 laboratorios de todo Chile."},
];

const PREV_PHOTOS=[
  {img:"https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=600",label:"Chequeo preventivo"},
  {img:"https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=600",label:"Atención personalizada"},
  {img:"https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=600",label:"Resultados rápidos"},
  {img:"https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=600",label:"Tecnología médica"},
];

const LABS=[
  {id:1,name:"Lab. RedSalud Providencia",addr:"Av. Providencia 1234, Providencia",km:"0.4 km",open:"07:30",rating:4.8,convenio:true},
  {id:2,name:"Clínica Bupa Santiago",addr:"Av. Ricardo Lyon 45, Providencia",km:"0.9 km",open:"07:00",rating:4.6,convenio:true},
  {id:3,name:"UC Christus Lab Express",addr:"Marchant Pereira 221, Ñuñoa",km:"1.2 km",open:"07:30",rating:4.7,convenio:true},
  {id:4,name:"Clínica Alemana Lab",addr:"Av. Vitacura 5951, Vitacura",km:"3.1 km",open:"06:00",rating:4.9,convenio:true},
  {id:5,name:"Megasalud Ñuñoa",addr:"Av. Irarrázaval 3956, Ñuñoa",km:"1.8 km",open:"08:00",rating:4.4,convenio:false},
];

const KITS=[
  {id:"empa",name:"Kit EMPA Preventivo",price:29990,orig:49990,badge:"Más popular",bc:"#2EAA6E",desc:"Hemograma, Glicemia, Lípidos, Orina, TSH. Para >35 años."},
  {id:"cardio",name:"Kit Cardiovascular",price:45990,orig:72000,badge:"❤️ Corazón",bc:"#C62828",desc:"ECG, PCR, Lípidos, Homocisteína, HbA1c."},
  {id:"deporte",name:"Kit Deportista Pro",price:38990,orig:62000,badge:"⚡ Deporte",bc:"#1565C0",desc:"Hemograma, Electrolitos, Hierro, Vitamina D, EKG."},
  {id:"diabetes",name:"Pack Diabético",price:33990,orig:55000,badge:"🩺 Control",bc:"#0B3D6B",desc:"HbA1c, Insulina, HOMA-IR, Microalbuminuria."},
];

const EXAMS=[
  {id:"hemo",name:"Hemograma Completo",price:6500},
  {id:"glic",name:"Glicemia en Ayunas",price:3500},
  {id:"hba1c",name:"Hemoglobina Glicosilada HbA1c",price:7500},
  {id:"lip",name:"Perfil Lipídico Completo",price:8500},
  {id:"tsh",name:"TSH Ultrasensible",price:7000},
  {id:"vitd",name:"Vitamina D (25-OH)",price:13500},
  {id:"vitb12",name:"Vitamina B12",price:9500},
  {id:"ekg",name:"Electrocardiograma (ECG)",price:15000},
  {id:"uri",name:"Orina Completa y Sedimento",price:4000},
  {id:"creat",name:"Creatinina + BUN",price:5000},
  {id:"fe",name:"Hierro + Ferritina",price:9000},
  {id:"psa",name:"PSA Total (Próstata)",price:11000},
  {id:"vih",name:"VIH 1+2 (4ta generación)",price:11000},
  {id:"pcrus",name:"PCR Ultrasensible",price:9000},
];

const CHAT_SYS=`Eres MedIA, el asistente virtual de SaludIntegral, plataforma chilena de telemedicina. Eres empático, profesional y conciso. Respondes siempre en español.
REGLAS: Nunca diagnostiques. Solo orienta sobre exámenes y servicios. Máximo 3-4 oraciones. Sé breve y claro.
Precios: Hemograma $6.500, Glicemia $3.500, HbA1c $7.500, Perfil Lipídico $8.500, TSH $7.000, Vitamina D $13.500, ECG $15.000, Orina $4.000, Hierro+Ferritina $9.000, PSA $11.000.
Kits: EMPA $29.990, Cardiovascular $45.990, Deportista $38.990, Diabético $33.990. Interpretación médica: $9.990. Certificados desde $7.990.`;

const fmt=(n)=>`$${n.toLocaleString("es-CL")}`;

export default function App(){
  const [view,setView]=useState("home");
  const [menu,setMenu]=useState(false);
  const [cartOpen,setCartOpen]=useState(false);
  const [chatOpen,setChatOpen]=useState(false);
  const [cart,setCart]=useState([]);
  const [slide,setSlide]=useState(0);
  const [selLab,setSelLab]=useState(LABS[0]);
  const [userLoc,setUserLoc]=useState(null);
  const [locLoad,setLocLoad]=useState(false);
  const [subNav,setSubNav]=useState({});
  const [promoEmail,setPromoEmail]=useState("");
  const [promoDone,setPromoDone]=useState(false);
  const [promoOn,setPromoOn]=useState(false);
  const [subEmail,setSubEmail]=useState("");
  const [subDone,setSubDone]=useState(false);
  const [msgs,setMsgs]=useState([]);
  const [chatIn,setChatIn]=useState("");
  const [chatLoad,setChatLoad]=useState(false);
  const [billType,setBillType]=useState("boleta");
  const [pat,setPat]=useState({nombre:"",rut:"",email:"",prev:"Fonasa A"});
  const [done,setDone]=useState(false);
  const histRef=useRef([]);
  const endRef=useRef(null);
  const [cd,setCd]=useState({h:19,m:33,s:42});

  useEffect(()=>{const t=setInterval(()=>setCd(p=>{if(p.s>0)return{...p,s:p.s-1};if(p.m>0)return{...p,m:p.m-1,s:59};if(p.h>0)return{h:p.h-1,m:59,s:59};return p;}),1000);return()=>clearInterval(t);},[]);
  useEffect(()=>{const t=setInterval(()=>setSlide(p=>(p+1)%SLIDES.length),5200);return()=>clearInterval(t);},[]);
  useEffect(()=>{endRef.current?.scrollIntoView({behavior:"smooth"});},[msgs]);
  useEffect(()=>{if(chatOpen&&msgs.length===0)startChat();},[chatOpen]);

  const startChat=async()=>{
    setChatLoad(true);
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:300,system:CHAT_SYS,messages:[{role:"user",content:"Hola"}]})});
      const d=await r.json();const bot=d.content[0].text;
      histRef.current=[{role:"user",content:"Hola"},{role:"assistant",content:bot}];
      setMsgs([{role:"assistant",text:bot,t:new Date()}]);
    }catch{setMsgs([{role:"assistant",text:"¡Hola! Soy MedIA 👋 ¿En qué puedo ayudarte hoy?",t:new Date()}]);}
    setChatLoad(false);
  };

  const sendChat=async()=>{
    const m=chatIn.trim();if(!m||chatLoad)return;
    setChatIn("");setMsgs(p=>[...p,{role:"user",text:m,t:new Date()}]);
    histRef.current.push({role:"user",content:m});setChatLoad(true);
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:300,system:CHAT_SYS,messages:histRef.current})});
      const d=await r.json();const bot=d.content[0].text;
      histRef.current.push({role:"assistant",content:bot});
      setMsgs(p=>[...p,{role:"assistant",text:bot,t:new Date()}]);
    }catch{setMsgs(p=>[...p,{role:"assistant",text:"Hubo un error técnico. Intenta de nuevo.",t:new Date()}]);}
    setChatLoad(false);
  };

  const addItem=(item)=>{if(!cart.find(c=>c.id===item.id))setCart(p=>[...p,item]);};
  const rmItem=(id)=>setCart(p=>p.filter(c=>c.id!==id));
  const has=(id)=>cart.some(c=>c.id===id);
  const sub=cart.reduce((s,i)=>s+i.price,0);
  const disc=promoOn?Math.round(sub*0.5):0;
  const total=sub-disc;
  const go=(v)=>{setView(v);setMenu(false);window.scrollTo(0,0);};

  const getLocation=()=>{
    setLocLoad(true);
    navigator.geolocation?.getCurrentPosition(
      p=>{setUserLoc({lat:p.coords.latitude,lng:p.coords.longitude});setLocLoad(false);},
      ()=>{setUserLoc({lat:-33.4489,lng:-70.6693});setLocLoad(false);}
    );
  };

  const mapUrl=selLab
    ?`https://maps.google.com/maps?q=${encodeURIComponent(selLab.name+", "+selLab.addr)}&output=embed&z=15`
    :`https://maps.google.com/maps?q=Santiago+Chile&output=embed&z=12`;

  const dirUrl=(lab)=>userLoc
    ?`https://www.google.com/maps/dir/${userLoc.lat},${userLoc.lng}/${encodeURIComponent(lab.addr)}`
    :`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lab.addr)}`;

  const SOC=[
    {icon:<Instagram size={16}/>,href:"https://instagram.com/saludintegral.cl",label:"Instagram"},
    {icon:<Facebook size={16}/>,href:"https://facebook.com/saludintegralcl",label:"Facebook"},
    {icon:<Linkedin size={16}/>,href:"https://linkedin.com/company/saludintegral",label:"LinkedIn"},
    {icon:<Youtube size={16}/>,href:"https://youtube.com/@saludintegralcl",label:"YouTube"},
  ];
  const NAV=[
    {label:"Exámenes de sangre",view:"examenes"},
    {label:"Kits preventivos",view:"kits"},
    {label:"Exámenes especializados",view:"examenes",sub:["Perfil Tiroideo","Perfil Hepático","Marcadores","Cardiovascular"]},
    {label:"Interpretación de resultados",view:"interpretacion"},
    {label:"Certificados médicos",view:"certificados"},
    {label:"Laboratorios cercanos",view:"labs"},
    {label:"Suscripción",view:"suscripcion"},
    {label:"Empresas",view:"empresas"},
  ];

  return(
  <div style={{fontFamily:"'Instrument Sans','Segoe UI',sans-serif",background:"#F5F7FA",color:"#0F1E2E",minHeight:"100vh"}}>
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;1,9..144,600&family=Instrument+Sans:wght@400;500;600;700&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    a{text-decoration:none;color:inherit;}button,input,select,textarea{font-family:inherit;outline:none;}img{display:block;}
    ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#F0F4F8}::-webkit-scrollbar-thumb{background:#C5D5E8;border-radius:4px}
    .drawer{position:fixed;top:0;left:0;height:100vh;width:280px;background:white;z-index:600;transform:translateX(-100%);transition:transform .26s cubic-bezier(.4,0,.2,1);box-shadow:3px 0 22px rgba(11,61,107,.1);display:flex;flex-direction:column;overflow-y:auto;}
    .drawer.open{transform:translateX(0);}
    .cpanel{position:fixed;top:0;right:0;height:100vh;width:330px;background:white;z-index:600;transform:translateX(100%);transition:transform .26s cubic-bezier(.4,0,.2,1);box-shadow:-3px 0 22px rgba(11,61,107,.1);display:flex;flex-direction:column;}
    .cpanel.open{transform:translateX(0);}
    .chatbox{position:fixed;bottom:78px;right:18px;width:330px;height:460px;background:white;z-index:700;border-radius:18px;box-shadow:0 10px 44px rgba(11,61,107,.16);display:flex;flex-direction:column;border:1px solid #E0EAF4;overflow:hidden;transform:scale(.94) translateY(8px);opacity:0;pointer-events:none;transition:all .22s cubic-bezier(.4,0,.2,1);}
    .chatbox.open{transform:scale(1) translateY(0);opacity:1;pointer-events:all;}
    .overlay{position:fixed;inset:0;background:rgba(11,61,107,.33);z-index:590;backdrop-filter:blur(2px);}
    .fade{animation:fi .32s ease;}@keyframes fi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
    .hslide{transition:opacity .85s ease;}
    .ni{display:flex;align-items:center;justify-content:space-between;padding:11px 16px;font-size:14px;font-weight:500;cursor:pointer;transition:background .12s;border:none;background:none;width:100%;text-align:left;color:#0F1E2E;}
    .ni:hover{background:#F5F7FA;}.ni.on{background:#EBF3FB;color:#1565C0;font-weight:600;}
    .si{padding:8px 16px 8px 30px;font-size:12px;color:#4A6380;display:block;cursor:pointer;transition:background .11s;}
    .si:hover{background:#F5F7FA;color:#1565C0;}
    .btn{border:none;cursor:pointer;font-family:inherit;font-weight:600;transition:all .15s;display:inline-flex;align-items:center;justify-content:center;gap:6px;}
    .bn{background:#0B3D6B;color:white;padding:11px 20px;border-radius:9px;font-size:14px;}.bn:hover{background:#093257;box-shadow:0 4px 14px rgba(11,61,107,.25);}
    .bb{background:#1565C0;color:white;padding:11px 20px;border-radius:9px;font-size:14px;}.bb:hover{background:#0d52a8;box-shadow:0 4px 14px rgba(21,101,192,.25);}
    .bg{background:#1A7F64;color:white;padding:11px 20px;border-radius:9px;font-size:14px;}.bg:hover{background:#166554;box-shadow:0 4px 14px rgba(26,127,100,.25);}
    .bo{background:transparent;color:#1565C0;border:1.5px solid #BBCFE8;padding:9px 16px;border-radius:9px;font-size:13px;}.bo:hover{background:#EBF3FB;}
    .fi{width:100%;padding:10px 13px;border:1.5px solid #D6E4F0;border-radius:9px;font-size:14px;color:#0F1E2E;background:white;transition:border-color .15s;}.fi:focus{border-color:#1565C0;}
    .kc{background:white;border-radius:15px;border:1.5px solid #E0EAF4;transition:all .16s;overflow:hidden;}.kc:hover{box-shadow:0 6px 22px rgba(21,101,192,.09);border-color:#BBCFE8;transform:translateY(-2px);}
    .er{display:flex;align-items:center;gap:9px;padding:10px 12px;border-radius:9px;background:white;border:1.5px solid #E0EAF4;transition:all .13s;}.er:hover{border-color:#1565C0;}.er.in{background:#EBF3FB;border-color:#1565C0;}
    .lc{background:white;border-radius:12px;border:1.5px solid #E0EAF4;padding:13px;cursor:pointer;transition:all .14s;}.lc:hover,.lc.on{border-color:#1565C0;box-shadow:0 2px 12px rgba(21,101,192,.09);}
    .sc{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;transition:all .13s;cursor:pointer;}
    .tg{font-size:10px;font-weight:700;padding:2px 7px;border-radius:5px;letter-spacing:.03em;}
    .sec{max-width:1040px;margin:0 auto;padding:0 20px;}
    .cb{padding:10px 12px;border-radius:13px;font-size:13px;line-height:1.55;max-width:82%;}
    .cbot{background:#F0F4F8;color:#0F1E2E;border-bottom-left-radius:4px;}
    .cuser{background:#1565C0;color:white;border-bottom-right-radius:4px;}
    .pl{animation:pla 2s infinite;}@keyframes pla{0%,100%{opacity:1}50%{opacity:.5}}
    .cdb{background:rgba(255,255,255,.13);border:1px solid rgba(255,255,255,.22);border-radius:6px;padding:5px 9px;text-align:center;min-width:42px;}
  `}</style>

  {/* URGENCY */}
  <div style={{background:"#0B3D6B",padding:"7px 16px",display:"flex",alignItems:"center",justifyContent:"center",gap:14,flexWrap:"wrap"}}>
    <span style={{color:"rgba(255,255,255,.8)",fontSize:12,fontWeight:600,display:"flex",alignItems:"center",gap:5}}>
      <Zap size={11} color="#A8D8B9"/>Kit Cardiovascular 40% OFF · Termina en
    </span>
    <div style={{display:"flex",gap:4}}>
      {[["h",cd.h],["m",cd.m],["s",cd.s]].map(([l,v])=>(
        <div key={l} className="cdb">
          <div style={{color:"white",fontSize:13,fontWeight:800,lineHeight:1}}>{String(v).padStart(2,"0")}</div>
          <div style={{color:"rgba(255,255,255,.45)",fontSize:8,textTransform:"uppercase"}}>{l}</div>
        </div>
      ))}
    </div>
  </div>

  {/* NAVBAR */}
  <nav style={{background:"white",borderBottom:"1px solid #E8EEF6",height:58,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 18px",position:"sticky",top:0,zIndex:400,boxShadow:"0 1px 6px rgba(11,61,107,.05)"}}>
    <div style={{display:"flex",alignItems:"center",gap:10}}>
      <button className="btn" onClick={()=>setMenu(true)} style={{background:"none",padding:"7px",borderRadius:8,color:"#4A6380"}}><Menu size={21}/></button>
      <div onClick={()=>go("home")}><LogoFull/></div>
    </div>
    <div style={{display:"flex",alignItems:"center",gap:8}}>
      <div style={{display:"flex",gap:3}}>
        {SOC.map(s=>(
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="sc" style={{background:"#F5F7FA",color:"#4A6380"}} title={s.label}
            onMouseEnter={e=>{e.currentTarget.style.background="#EBF3FB";e.currentTarget.style.color="#1565C0";}}
            onMouseLeave={e=>{e.currentTarget.style.background="#F5F7FA";e.currentTarget.style.color="#4A6380";}}>
            {s.icon}
          </a>
        ))}
      </div>
      <button className="btn bo" onClick={()=>go("examenes")} style={{fontSize:13,padding:"7px 13px"}}>Exámenes</button>
      <button onClick={()=>setCartOpen(true)} style={{position:"relative",background:cart.length?"#EBF3FB":"#F5F7FA",border:`1.5px solid ${cart.length?"#BBCFE8":"#E0EAF4"}`,padding:"7px 11px",borderRadius:9,cursor:"pointer",display:"flex",alignItems:"center",gap:5,fontSize:13,fontWeight:600,color:cart.length?"#1565C0":"#4A6380",transition:"all .13s"}}>
        <ShoppingCart size={16}/>
        {cart.length>0&&<><span style={{background:"#C62828",color:"white",borderRadius:"50%",width:17,height:17,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800}}>{cart.length}</span><span>{fmt(total)}</span></>}
      </button>
    </div>
  </nav>

  {/* OVERLAYS */}
  {(menu||cartOpen)&&<div className="overlay" onClick={()=>{setMenu(false);setCartOpen(false);}}/>}

  {/* DRAWER */}
  <div className={`drawer ${menu?"open":""}`}>
    <div style={{padding:"14px 16px",borderBottom:"1px solid #E8EEF6",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
      <LogoFull/><button onClick={()=>setMenu(false)} style={{background:"none",border:"none",cursor:"pointer",color:"#4A6380",padding:4}}><X size={16}/></button>
    </div>
    <div style={{flex:1}}>
      {NAV.map(item=>(
        <div key={item.label}>
          <button className={`ni ${view===item.view?"on":""}`} onClick={()=>item.sub?setSubNav(p=>({...p,[item.label]:!p[item.label]})):go(item.view)}>
            <span>{item.label}</span>
            {item.sub&&<ChevronDown size={12} style={{transform:subNav[item.label]?"rotate(180deg)":"none",transition:"transform .18s",flexShrink:0}}/>}
          </button>
          {item.sub&&subNav[item.label]&&item.sub.map(s=><a key={s} className="si" onClick={()=>go(item.view)}>{s}</a>)}
        </div>
      ))}
    </div>
    <div style={{padding:"16px",borderTop:"1px solid #E8EEF6",flexShrink:0}}>
      <div style={{fontSize:10,fontWeight:700,color:"#8AA3BA",textTransform:"uppercase",letterSpacing:".1em",marginBottom:9}}>Síguenos</div>
      <div style={{display:"flex",gap:7,marginBottom:12}}>
        {SOC.map(s=>(
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="sc" style={{background:"#EBF3FB",color:"#1565C0",border:"1px solid #BBCFE8"}}
            onMouseEnter={e=>{e.currentTarget.style.background="#1565C0";e.currentTarget.style.color="white";}}
            onMouseLeave={e=>{e.currentTarget.style.background="#EBF3FB";e.currentTarget.style.color="#1565C0";}}>
            {s.icon}
          </a>
        ))}
      </div>
      <p style={{fontSize:10,color:"#8AA3BA"}}>© 2025 SaludIntegral · Ley 19.628</p>
    </div>
  </div>

  {/* CART */}
  <div className={`cpanel ${cartOpen?"open":""}`}>
    <div style={{padding:"14px 16px",borderBottom:"1px solid #E8EEF6",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
      <div><div style={{fontFamily:"Fraunces,serif",fontSize:16,fontWeight:600}}>Mi carrito</div><div style={{fontSize:11,color:"#8AA3BA"}}>{cart.length} ítem{cart.length!==1?"s":""}</div></div>
      <button onClick={()=>setCartOpen(false)} style={{background:"none",border:"none",cursor:"pointer",color:"#4A6380"}}><X size={16}/></button>
    </div>
    <div style={{flex:1,overflowY:"auto",padding:"11px 16px",display:"flex",flexDirection:"column",gap:7}}>
      {cart.length===0?(<div style={{textAlign:"center",padding:"40px 0",color:"#8AA3BA"}}><ShoppingCart size={26} style={{opacity:.3,marginBottom:8}}/><p style={{fontSize:13}}>Carrito vacío</p></div>)
        :cart.map(item=>(
          <div key={item.id} style={{display:"flex",gap:9,padding:"9px 11px",background:"#F5F7FA",borderRadius:9,border:"1px solid #E8EEF6"}}>
            <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600}}>{item.name}</div><div style={{fontSize:13,fontWeight:700,color:"#1565C0",marginTop:2}}>{fmt(item.price)}</div></div>
            <button onClick={()=>rmItem(item.id)} style={{background:"none",border:"none",color:"#C62828",cursor:"pointer"}}><X size={12}/></button>
          </div>
        ))}
    </div>
    {cart.length>0&&(
      <div style={{padding:"12px 16px",borderTop:"1px solid #E8EEF6",flexShrink:0}}>
        {promoOn&&<div style={{display:"flex",justifyContent:"space-between",fontSize:12,fontWeight:600,color:"#1A7F64",background:"#E8F5EE",borderRadius:8,padding:"6px 9px",marginBottom:8}}><span>🎁 50% OFF</span><span>−{fmt(disc)}</span></div>}
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:12,fontSize:16,fontWeight:700}}><span>Total</span><span style={{color:"#1565C0"}}>{fmt(total)}</span></div>
        <button className="btn bg" style={{width:"100%",padding:"12px",fontSize:14}} onClick={()=>{setCartOpen(false);go("checkout");}}>Pagar y generar orden →</button>
        <button onClick={()=>setCart([])} style={{width:"100%",background:"none",border:"none",color:"#8AA3BA",fontSize:11,padding:"6px",cursor:"pointer",marginTop:3}}>Vaciar</button>
      </div>
    )}
  </div>

  {/* CHATBOT */}
  <div className={`chatbox ${chatOpen?"open":""}`}>
    <div style={{background:"linear-gradient(135deg,#0B3D6B,#1565C0)",padding:"13px 15px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
      <div style={{display:"flex",alignItems:"center",gap:9}}>
        <div style={{width:36,height:36,borderRadius:"50%",background:"rgba(255,255,255,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17}}>🤖</div>
        <div>
          <div style={{color:"white",fontWeight:700,fontSize:14}}>MedIA — Asistente</div>
          <div style={{color:"rgba(255,255,255,.6)",fontSize:11,display:"flex",alignItems:"center",gap:5}}>
            <span className="pl" style={{width:5,height:5,borderRadius:"50%",background:"#2EAA6E",display:"inline-block"}}/>En línea
          </div>
        </div>
      </div>
      <button onClick={()=>setChatOpen(false)} style={{background:"none",border:"none",color:"rgba(255,255,255,.7)",cursor:"pointer"}}><X size={15}/></button>
    </div>
    <div style={{flex:1,overflowY:"auto",padding:"13px 11px",display:"flex",flexDirection:"column",gap:11}}>
      {msgs.map((m,i)=>(
        <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",gap:7,alignItems:"flex-end"}}>
          {m.role==="assistant"&&<div style={{width:24,height:24,borderRadius:"50%",background:"#EBF3FB",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,flexShrink:0}}>🤖</div>}
          <div className={`cb ${m.role==="assistant"?"cbot":"cuser"}`}>{m.text}</div>
        </div>
      ))}
      {chatLoad&&(
        <div style={{display:"flex",gap:7,alignItems:"flex-end"}}>
          <div style={{width:24,height:24,borderRadius:"50%",background:"#EBF3FB",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>🤖</div>
          <div className="cb cbot" style={{display:"flex",gap:4}}>{[0,1,2].map(i=><span key={i} style={{width:6,height:6,borderRadius:"50%",background:"#8AA3BA",animation:`pla ${.7+i*.15}s infinite alternate`}}/>)}</div>
        </div>
      )}
      <div ref={endRef}/>
    </div>
    <div style={{padding:"9px 11px",borderTop:"1px solid #E8EEF6",display:"flex",gap:7,flexShrink:0}}>
      <input className="fi" value={chatIn} onChange={e=>setChatIn(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendChat()} placeholder="Escribe tu pregunta..." style={{flex:1,fontSize:13,padding:"8px 11px"}}/>
      <button className="btn bb" onClick={sendChat} disabled={chatLoad} style={{padding:"8px 11px",opacity:chatLoad?.6:1,flexShrink:0}}><Send size={14}/></button>
    </div>
  </div>

  {/* CHAT FAB */}
  <button onClick={()=>setChatOpen(p=>!p)} style={{position:"fixed",bottom:18,right:18,zIndex:700,width:52,height:52,borderRadius:"50%",background:chatOpen?"#0B3D6B":"linear-gradient(135deg,#1565C0,#0B3D6B)",color:"white",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 5px 18px rgba(21,101,192,.32)",transition:"all .16s"}}>
    {chatOpen?<X size={21}/>:<MessageCircle size={21}/>}
  </button>

  {/* CART FAB */}
  {cart.length>0&&!cartOpen&&(
    <button onClick={()=>setCartOpen(true)} style={{position:"fixed",bottom:18,right:80,zIndex:650,background:"linear-gradient(135deg,#0B3D6B,#1565C0)",color:"white",padding:"10px 16px",borderRadius:100,fontSize:13,fontWeight:700,boxShadow:"0 4px 16px rgba(21,101,192,.28)",display:"flex",alignItems:"center",gap:7,border:"none",cursor:"pointer"}}>
      <span style={{background:"#2EAA6E",borderRadius:"50%",width:18,height:18,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800}}>{cart.length}</span>
      {fmt(total)}
    </button>
  )}

  {/* ══ HOME ═════════════════════════════════════════════════════ */}
  {view==="home"&&(
  <div className="fade">

    {/* HERO SLIDESHOW */}
    <section style={{position:"relative",height:520,overflow:"hidden",background:"#0B3D6B"}}>
      {SLIDES.map((s,i)=>(
        <div key={i} className="hslide" style={{position:"absolute",inset:0,opacity:i===slide?1:0}}>
          <img src={s.img} alt={s.title} style={{width:"100%",height:"100%",objectFit:"cover",opacity:.32}}/>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,rgba(11,61,107,.96) 38%,rgba(11,61,107,.35) 100%)"}}/>
        </div>
      ))}
      <div style={{position:"relative",zIndex:2,maxWidth:560,padding:"68px 40px 60px",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:7,background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.18)",borderRadius:100,padding:"4px 12px",marginBottom:18,width:"fit-content"}}>
          <span className="pl" style={{width:6,height:6,borderRadius:"50%",background:"#2EAA6E",display:"inline-block"}}/>
          <span style={{color:"rgba(255,255,255,.88)",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em"}}>{SLIDES[slide].tag}</span>
        </div>
        <h1 style={{fontFamily:"Fraunces,serif",fontSize:"clamp(34px,5.5vw,56px)",fontWeight:700,color:"white",lineHeight:1.06,marginBottom:13}}>
          {SLIDES[slide].title}<br/><em style={{color:"#A8D8B9"}}>{SLIDES[slide].accent}</em>
        </h1>
        <p style={{color:"rgba(255,255,255,.7)",fontSize:15,lineHeight:1.65,marginBottom:26,maxWidth:400}}>{SLIDES[slide].sub}</p>
        <div style={{display:"flex",gap:9}}>
          <button className="btn bg" style={{fontSize:14,padding:"12px 22px"}} onClick={()=>go("examenes")}>Ver exámenes →</button>
          <button className="btn" style={{background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.22)",color:"white",padding:"12px 18px",borderRadius:9,fontSize:13,fontWeight:600}} onClick={()=>go("kits")}>Ver kits</button>
        </div>
      </div>
      <div style={{position:"absolute",bottom:18,left:40,zIndex:3,display:"flex",gap:6}}>
        {SLIDES.map((_,i)=>(
          <button key={i} onClick={()=>setSlide(i)} style={{width:i===slide?20:6,height:6,borderRadius:3,background:i===slide?"#2EAA6E":"rgba(255,255,255,.32)",border:"none",cursor:"pointer",padding:0,transition:"all .28s"}}/>
        ))}
      </div>
      <div style={{position:"absolute",bottom:0,right:0,zIndex:3,background:"rgba(11,61,107,.82)",backdropFilter:"blur(8px)",padding:"16px 24px",display:"flex",gap:24}}>
        {[["98%","Satisfacción"],["+8.000","Órdenes"],["5 min","Promedio"],["24/7","Disponible"]].map(([v,l])=>(
          <div key={l} style={{textAlign:"center"}}>
            <div style={{fontFamily:"Fraunces,serif",fontSize:20,fontWeight:700,color:"white"}}>{v}</div>
            <div style={{fontSize:9,color:"rgba(255,255,255,.5)",textTransform:"uppercase",letterSpacing:".05em"}}>{l}</div>
          </div>
        ))}
      </div>
    </section>

    {/* TRUST BAR */}
    <div style={{background:"white",borderBottom:"1px solid #E8EEF6",padding:"10px 16px"}}>
      <div className="sec" style={{display:"flex",gap:20,justifyContent:"center",flexWrap:"wrap"}}>
        {[["🔒","Pago seguro WebPay"],["⚖️","Validez legal en Chile"],["🏥","Médico Colegio Médico"],["↩️","Garantía o devolución"]].map(([ic,t])=>(
          <div key={t} style={{display:"flex",alignItems:"center",gap:6,fontSize:12,fontWeight:600,color:"#4A6380"}}><span>{ic}</span>{t}</div>
        ))}
      </div>
    </div>

    {/* BANNER PREVENCIÓN */}
    <section style={{padding:"60px 20px",background:"white",borderBottom:"1px solid #E8EEF6"}}>
      <div className="sec">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:44,alignItems:"center"}}>
          <div>
            <div style={{background:"#E8F5EE",border:"1px solid #B2DFCC",borderRadius:100,padding:"4px 12px",display:"inline-block",marginBottom:16}}>
              <span style={{fontSize:11,fontWeight:700,color:"#1A7F64",textTransform:"uppercase",letterSpacing:".08em"}}>✦ Prevención es salud</span>
            </div>
            <h2 style={{fontFamily:"Fraunces,serif",fontSize:"clamp(24px,3.5vw,36px)",fontWeight:700,color:"#0B3D6B",lineHeight:1.12,marginBottom:14}}>
              Detecta antes.<br/><em style={{color:"#2EAA6E"}}>Vive mejor.</em>
            </h2>
            <p style={{color:"#4A6380",fontSize:14,lineHeight:1.7,marginBottom:20}}>El 80% de las enfermedades crónicas son prevenibles con detección temprana. Un chequeo anual puede salvarte la vida.</p>
            <div style={{display:"flex",flexDirection:"column",gap:9,marginBottom:22}}>
              {["Órdenes médicas en 5 minutos, a cualquier hora","Válido en +200 laboratorios de todo Chile","Informe médico profesional en menos de 24h"].map(t=>(
                <div key={t} style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:19,height:19,borderRadius:"50%",background:"#E8F5EE",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Check size={10} color="#1A7F64"/></div>
                  <span style={{fontSize:13,color:"#4A6380"}}>{t}</span>
                </div>
              ))}
            </div>
            <button className="btn bn" style={{fontSize:13,padding:"11px 20px"}} onClick={()=>go("kits")}>Ver kits preventivos →</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11}}>
            {PREV_PHOTOS.map((p,i)=>(
              <div key={p.label} style={{borderRadius:13,overflow:"hidden",position:"relative",transform:i%2===1?"translateY(13px)":"none",boxShadow:"0 7px 24px rgba(11,61,107,.11)"}}>
                <img src={p.img} alt={p.label} style={{width:"100%",height:155,objectFit:"cover"}}/>
                <div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent,rgba(11,61,107,.7))",padding:"18px 9px 9px"}}>
                  <span style={{color:"white",fontSize:11,fontWeight:700}}>{p.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* 50% OFF */}
    <section style={{background:"linear-gradient(135deg,#EBF3FB,#E8F5EE)",padding:"42px 20px",borderBottom:"1px solid #D6E4F0"}}>
      <div style={{maxWidth:540,margin:"0 auto",textAlign:"center"}}>
        <div style={{fontSize:34,marginBottom:9}}>🎁</div>
        <h2 style={{fontFamily:"Fraunces,serif",fontSize:24,fontWeight:700,marginBottom:7,color:"#0B3D6B"}}>50% OFF en tu primera orden</h2>
        <p style={{color:"#4A6380",fontSize:14,marginBottom:18}}>Deja tu correo y activa el descuento. Sin letra chica.</p>
        {!promoDone?(
          <div style={{display:"flex",gap:8,maxWidth:350,margin:"0 auto"}}>
            <input className="fi" value={promoEmail} onChange={e=>setPromoEmail(e.target.value)} placeholder="tucorreo@gmail.com" type="email" style={{flex:1}}/>
            <button className="btn bg" onClick={()=>{if(promoEmail.includes("@")){setPromoDone(true);setPromoOn(true);}}}>Activar</button>
          </div>
        ):(
          <div className="fade" style={{display:"inline-flex",alignItems:"center",gap:8,background:"white",borderRadius:10,padding:"10px 16px",border:"1.5px solid #B2DFCC"}}>
            <Check size={14} color="#1A7F64"/><span style={{fontWeight:700,color:"#1A7F64",fontSize:14}}>¡Descuento activado! 🎉</span>
          </div>
        )}
      </div>
    </section>

    {/* KITS */}
    <section style={{padding:"52px 20px"}}>
      <div className="sec">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
          <h2 style={{fontFamily:"Fraunces,serif",fontSize:26,fontWeight:700}}>Kits de Salud</h2>
          <button className="btn bo" onClick={()=>go("kits")} style={{fontSize:12}}>Ver todos →</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(225px,1fr))",gap:15}}>
          {KITS.map(k=>(
            <div key={k.id} className="kc">
              <div style={{padding:"15px 15px 0"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:9}}>
                  <span className="tg" style={{background:k.bc+"18",color:k.bc,border:`1px solid ${k.bc}30`}}>{k.badge}</span>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:10,color:"#8AA3BA",textDecoration:"line-through"}}>{fmt(k.orig)}</div>
                    <div style={{fontSize:18,fontWeight:800,color:"#1565C0"}}>{fmt(k.price)}</div>
                  </div>
                </div>
                <h3 style={{fontSize:14,fontWeight:700,marginBottom:4}}>{k.name}</h3>
                <p style={{fontSize:12,color:"#4A6380",lineHeight:1.5,marginBottom:11}}>{k.desc}</p>
              </div>
              <div style={{padding:"10px 15px 13px",borderTop:"1px solid #F0F5FB"}}>
                <button className="btn bb" style={{width:"100%",padding:"8px",fontSize:12}} onClick={()=>{addItem({id:k.id,name:k.name,price:k.price});setCartOpen(true);}}>
                  {has(k.id)?"✓ En carrito":"Agregar al carrito"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* LABS PREVIEW */}
    <section style={{padding:"52px 20px",background:"white",borderTop:"1px solid #E8EEF6"}}>
      <div className="sec">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
          <div><h2 style={{fontFamily:"Fraunces,serif",fontSize:24,fontWeight:700,marginBottom:3}}>Laboratorios cercanos</h2><p style={{color:"#4A6380",fontSize:13}}>Presenta tu orden donde prefieras</p></div>
          <button className="btn bo" onClick={()=>go("labs")} style={{fontSize:12}}>Ver mapa completo →</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1.4fr",gap:14,alignItems:"start"}}>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {LABS.slice(0,3).map(lab=>(
              <div key={lab.id} className={`lc ${selLab?.id===lab.id?"on":""}`} onClick={()=>setSelLab(lab)}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <div style={{fontSize:13,fontWeight:700}}>{lab.name}</div>
                  <div style={{fontSize:13,fontWeight:700,color:"#1565C0"}}>{lab.km}</div>
                </div>
                <div style={{fontSize:11,color:"#8AA3BA",marginBottom:5}}>{lab.addr}</div>
                <div style={{display:"flex",gap:7,alignItems:"center",flexWrap:"wrap"}}>
                  <span style={{fontSize:11,fontWeight:600,color:"#4A6380"}}>⭐ {lab.rating}</span>
                  <span style={{fontSize:11,color:"#8AA3BA"}}>· Abre {lab.open}</span>
                  {lab.convenio&&<span className="tg" style={{background:"#E8F5EE",color:"#1A7F64",border:"1px solid #B2DFCC"}}>Convenio</span>}
                </div>
              </div>
            ))}
          </div>
          <div style={{borderRadius:13,overflow:"hidden",border:"1px solid #E0EAF4",height:280,boxShadow:"0 3px 14px rgba(11,61,107,.07)"}}>
            <iframe src={mapUrl} width="100%" height="280" style={{display:"block",border:"none"}} loading="lazy" title="Mapa"/>
          </div>
        </div>
      </div>
    </section>

    {/* REVIEWS */}
    <section style={{padding:"52px 20px",background:"#F5F7FA"}}>
      <div className="sec">
        <div style={{textAlign:"center",marginBottom:30}}>
          <h2 style={{fontFamily:"Fraunces,serif",fontSize:24,fontWeight:700,marginBottom:6}}>Pacientes satisfechos</h2>
          <div style={{display:"flex",justifyContent:"center",gap:3,marginBottom:5}}>{[...Array(5)].map((_,i)=><Star key={i} size={16} fill="#F59E0B" color="#F59E0B"/>)}</div>
          <p style={{color:"#4A6380",fontSize:13}}>4.9/5 · +1.200 reseñas verificadas</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(265px,1fr))",gap:12}}>
          {[
            {n:"Valentina M.",a:"VM",s:5,d:"hace 2 semanas",t:"Pedí mis exámenes a las 11pm y tuve la orden en minutos. El médico confirmó que todo estaba bien.",e:"Kit EMPA"},
            {n:"Carlos R.",a:"CR",s:5,d:"hace 1 mes",t:"Detecté hipotiroidismo a tiempo gracias a la sugerencia de la IA. Proceso impecable.",e:"TSH + T4 Libre"},
            {n:"Ana P.",a:"AP",s:4,d:"hace 3 semanas",t:"Informe médico en menos de 24h con recomendaciones claras. Muy profesional.",e:"Perfil Lipídico"},
            {n:"Diego F.",a:"DF",s:5,d:"hace 5 días",t:"El mapa me mostró un lab a 400m de mi trabajo. Kit Deportista perfecto antes del maratón.",e:"Kit Deportista"},
            {n:"Sofía L.",a:"SL",s:5,d:"hace 1 semana",t:"El 50% OFF fue el gancho, la calidad del servicio me dejó como cliente fija.",e:"Hemograma"},
            {n:"Rodrigo T.",a:"RT",s:4,d:"hace 2 meses",t:"Orden perfectamente válida en Clínica Alemana. Rápido y muy profesional.",e:"Kit EMPA"},
          ].map(r=>(
            <div key={r.n} style={{background:"white",borderRadius:12,padding:"15px",border:"1.5px solid #E8EEF6"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,#1565C0,#1A7F64)",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800}}>{r.a}</div>
                  <div><div style={{fontSize:13,fontWeight:700}}>{r.n}</div><div style={{fontSize:10,color:"#8AA3BA"}}>{r.d}</div></div>
                </div>
                <div style={{display:"flex",gap:2}}>{[...Array(r.s)].map((_,i)=><Star key={i} size={11} fill="#F59E0B" color="#F59E0B"/>)}</div>
              </div>
              <p style={{fontSize:12,color:"#374151",lineHeight:1.58,marginBottom:8}}>"{r.t}"</p>
              <span className="tg" style={{background:"#EBF3FB",color:"#1565C0"}}>🧪 {r.e}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* NEWSLETTER */}
    <section style={{background:"linear-gradient(135deg,#0B3D6B,#1A7F64)",padding:"42px 20px"}}>
      <div style={{maxWidth:460,margin:"0 auto",textAlign:"center"}}>
        <h2 style={{fontFamily:"Fraunces,serif",fontSize:22,fontWeight:700,color:"white",marginBottom:7}}>Boletín de salud preventiva</h2>
        <p style={{color:"rgba(255,255,255,.62)",fontSize:13,marginBottom:18}}>Consejos mensuales. Sin spam.</p>
        {!subDone?(
          <div style={{display:"flex",gap:7,maxWidth:330,margin:"0 auto"}}>
            <input className="fi" value={subEmail} onChange={e=>setSubEmail(e.target.value)} placeholder="tucorreo@gmail.com" type="email" style={{flex:1}}/>
            <button onClick={()=>{if(subEmail.includes("@"))setSubDone(true);}} style={{background:"#2EAA6E",color:"white",padding:"10px 14px",borderRadius:9,border:"none",cursor:"pointer",fontWeight:700,fontSize:13}}>Unirme</button>
          </div>
        ):(
          <div className="fade" style={{display:"inline-flex",alignItems:"center",gap:7,background:"rgba(255,255,255,.1)",borderRadius:9,padding:"9px 15px",border:"1px solid rgba(168,216,185,.32)"}}>
            <Check size={13} color="#A8D8B9"/><span style={{color:"#A8D8B9",fontWeight:700,fontSize:13}}>¡Suscrito! 🎉</span>
          </div>
        )}
      </div>
    </section>

    {/* FOOTER */}
    <footer style={{background:"#071F38",color:"rgba(255,255,255,.52)",padding:"30px 20px"}}>
      <div className="sec">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:26,marginBottom:24}}>
          <div>
            <LogoFull white/>
            <p style={{fontSize:11,color:"rgba(255,255,255,.35)",marginTop:9,lineHeight:1.62}}>Plataforma de telemedicina con IA. Médico habilitado Colegio Médico Chile.</p>
            <div style={{display:"flex",gap:6,marginTop:12}}>
              {SOC.map(s=>(
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" title={s.label}
                  style={{width:29,height:29,borderRadius:7,background:"rgba(255,255,255,.07)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,.48)",transition:"all .13s"}}
                  onMouseEnter={e=>{e.currentTarget.style.background="#1565C0";e.currentTarget.style.color="white";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.07)";e.currentTarget.style.color="rgba(255,255,255,.48)";}}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          {[
            ["Servicios",["Exámenes","Kits Preventivos","Certificados","Interpretación IA","Laboratorios"]],
            ["Empresa",["Quiénes Somos","Blog de Salud","Para Empresas","Trabaja con Nosotros"]],
            ["Contacto",[<span key="t"><Phone size={10} style={{verticalAlign:"middle",marginRight:3}}/>+56 2 2900 0000</span>,<span key="e"><Mail size={10} style={{verticalAlign:"middle",marginRight:3}}/>hola@saludintegral.cl</span>,<span key="m"><MapPin size={10} style={{verticalAlign:"middle",marginRight:3}}/>Santiago, Chile</span>]]
          ].map(([title,items])=>(
            <div key={title}>
              <div style={{fontSize:9,fontWeight:700,color:"rgba(255,255,255,.35)",textTransform:"uppercase",letterSpacing:".1em",marginBottom:11}}>{title}</div>
              <div style={{display:"flex",flexDirection:"column",gap:7}}>
                {items.map((item,i)=>(
                  <span key={i} style={{fontSize:12,cursor:"pointer",transition:"color .12s",lineHeight:1.5}}
                    onMouseEnter={e=>e.currentTarget.style.color="white"}
                    onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,.52)"}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,.07)",paddingTop:16,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:9}}>
          <p style={{fontSize:10,color:"rgba(255,255,255,.25)"}}>© 2025 SaludIntegral · Ley 19.628 · Emergencias: 131</p>
          <div style={{display:"flex",gap:9}}>
            {["🔒 SSL","✅ WebPay","🏥 Médico Habilitado"].map(t=>(
              <span key={t} style={{fontSize:10,background:"rgba(255,255,255,.07)",padding:"3px 8px",borderRadius:5,fontWeight:700}}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  </div>
  )}

  {/* ══ LABS ═════════════════════════════════════════════════════ */}
  {view==="labs"&&(
  <div className="fade" style={{padding:"34px 20px"}}>
    <div className="sec">
      <h2 style={{fontFamily:"Fraunces,serif",fontSize:24,fontWeight:700,marginBottom:4}}>Laboratorios cercanos</h2>
      <p style={{color:"#4A6380",fontSize:13,marginBottom:20}}>Presenta tu orden médica en cualquiera de estos centros.</p>
      {!userLoc?(
        <div style={{background:"linear-gradient(135deg,#EBF3FB,#E8F5EE)",border:"1px solid #BBCFE8",borderRadius:11,padding:"14px 18px",marginBottom:18,display:"flex",alignItems:"center",justifyContent:"space-between",gap:11,flexWrap:"wrap"}}>
          <div><div style={{fontWeight:700,fontSize:14,marginBottom:2}}>📍 Activa tu ubicación</div><div style={{fontSize:12,color:"#4A6380"}}>Para mostrarte los laboratorios más cercanos.</div></div>
          <button className="btn bb" onClick={getLocation} disabled={locLoad} style={{flexShrink:0,fontSize:13,padding:"9px 16px"}}>{locLoad?"Buscando...":"Usar mi ubicación"}</button>
        </div>
      ):(
        <div className="fade" style={{background:"#E8F5EE",border:"1px solid #B2DFCC",borderRadius:9,padding:"8px 13px",marginBottom:14,fontSize:13,fontWeight:600,color:"#1A7F64"}}>✓ Ubicación detectada</div>
      )}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1.5fr",gap:14,alignItems:"start"}}>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {LABS.map(lab=>(
            <div key={lab.id} className={`lc ${selLab?.id===lab.id?"on":""}`} onClick={()=>setSelLab(lab)}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:5}}>
                <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,marginBottom:2}}>{lab.name}</div><div style={{fontSize:11,color:"#8AA3BA"}}>{lab.addr}</div></div>
                <div style={{fontSize:14,fontWeight:800,color:"#1565C0",marginLeft:9,flexShrink:0}}>{lab.km}</div>
              </div>
              <div style={{display:"flex",gap:7,alignItems:"center",marginBottom:8,flexWrap:"wrap"}}>
                <span style={{fontSize:11,fontWeight:600,color:"#4A6380"}}>⭐ {lab.rating}</span>
                <span style={{fontSize:11,color:"#8AA3BA"}}>· Abre {lab.open}</span>
                {lab.convenio&&<span className="tg" style={{background:"#E8F5EE",color:"#1A7F64",border:"1px solid #B2DFCC"}}>✓ Convenio</span>}
              </div>
              <div style={{display:"flex",gap:6}}>
                <a href={dirUrl(lab)} target="_blank" rel="noreferrer" style={{flex:1,background:"#0B3D6B",color:"white",padding:"7px",borderRadius:8,fontSize:12,fontWeight:700,textAlign:"center",display:"block"}}>🗺 Cómo llegar</a>
                <a href="tel:+56229000000" style={{background:"#EBF3FB",color:"#1565C0",padding:"7px 10px",borderRadius:8,fontSize:12,fontWeight:700,border:"1px solid #BBCFE8",display:"block"}}>📞</a>
              </div>
            </div>
          ))}
        </div>
        <div style={{position:"sticky",top:70}}>
          <div style={{borderRadius:14,overflow:"hidden",border:"1.5px solid #E0EAF4",boxShadow:"0 4px 18px rgba(11,61,107,.08)"}}>
            <div style={{background:"#0B3D6B",padding:"10px 14px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <span style={{color:"white",fontSize:13,fontWeight:700}}>📍 {selLab?.name||"Santiago, Chile"}</span>
              {selLab&&<button onClick={()=>setSelLab(null)} style={{background:"rgba(255,255,255,.12)",color:"white",border:"none",borderRadius:6,padding:"3px 8px",fontSize:11,cursor:"pointer"}}>Ver todos</button>}
            </div>
            <iframe src={mapUrl} width="100%" height="360" style={{display:"block",border:"none"}} loading="lazy" title="Mapa laboratorios"/>
            {selLab&&(
              <div style={{padding:"12px 14px",borderTop:"1px solid #E8EEF6"}}>
                <div style={{fontSize:13,fontWeight:700,marginBottom:4}}>{selLab.name}</div>
                <div style={{fontSize:12,color:"#4A6380",marginBottom:7}}>{selLab.addr} · ⭐ {selLab.rating}</div>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selLab.addr)}`} target="_blank" rel="noreferrer"
                  style={{display:"block",background:"#1A7F64",color:"white",padding:"8px",borderRadius:9,fontSize:13,fontWeight:700,textAlign:"center"}}>
                  Abrir en Google Maps ↗
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
  )}

  {/* ══ EXÁMENES ════════════════════════════════════════════════ */}
  {view==="examenes"&&(
  <div className="fade" style={{padding:"34px 20px"}}>
    <div className="sec">
      <h2 style={{fontFamily:"Fraunces,serif",fontSize:24,fontWeight:700,marginBottom:4}}>Catálogo de Exámenes</h2>
      <p style={{color:"#4A6380",fontSize:13,marginBottom:20}}>Selecciona, paga y recibe tu orden firmada digitalmente.</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:7}}>
        {EXAMS.map(ex=>(
          <div key={ex.id} className={`er ${has(ex.id)?"in":""}`}>
            <div style={{flex:1}}><div style={{fontSize:14,fontWeight:600}}>{ex.name}</div><div style={{fontSize:13,fontWeight:700,color:"#1565C0",marginTop:2}}>{fmt(ex.price)}</div></div>
            <button style={{width:27,height:27,borderRadius:7,border:"none",cursor:"pointer",fontSize:17,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",background:has(ex.id)?"#FEF2F2":"#E8F5EE",color:has(ex.id)?"#C62828":"#1A7F64",transition:"all .12s"}} onClick={()=>has(ex.id)?rmItem(ex.id):addItem(ex)}>
              {has(ex.id)?"−":"+"}
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
  )}

  {/* ══ KITS ════════════════════════════════════════════════════ */}
  {view==="kits"&&(
  <div className="fade" style={{padding:"34px 20px"}}>
    <div className="sec">
      <h2 style={{fontFamily:"Fraunces,serif",fontSize:24,fontWeight:700,marginBottom:4}}>Kits de Salud</h2>
      <p style={{color:"#4A6380",fontSize:13,marginBottom:20}}>Packs diseñados por médicos. Ahorro garantizado.</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:15}}>
        {KITS.map(k=>(
          <div key={k.id} className="kc">
            <div style={{padding:"16px 16px 0"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:9}}>
                <span className="tg" style={{background:k.bc+"18",color:k.bc,border:`1px solid ${k.bc}30`}}>{k.badge}</span>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:10,color:"#8AA3BA",textDecoration:"line-through"}}>{fmt(k.orig)}</div>
                  <div style={{fontSize:18,fontWeight:800,color:"#1565C0"}}>{fmt(k.price)}</div>
                  <div style={{fontSize:10,background:"#E8F5EE",color:"#1A7F64",padding:"1px 6px",borderRadius:4,fontWeight:700}}>Ahorras {fmt(k.orig-k.price)}</div>
                </div>
              </div>
              <h3 style={{fontSize:14,fontWeight:700,marginBottom:4}}>{k.name}</h3>
              <p style={{fontSize:12,color:"#4A6380",lineHeight:1.5,marginBottom:11}}>{k.desc}</p>
            </div>
            <div style={{padding:"10px 16px 13px",borderTop:"1px solid #F0F5FB"}}>
              <button className="btn bb" style={{width:"100%",padding:"9px",fontSize:12}} onClick={()=>{addItem({id:k.id,name:k.name,price:k.price});setCartOpen(true);}}>
                {has(k.id)?"✓ En carrito":"Agregar al carrito"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  )}

  {/* ══ INTERPRETACIÓN ══════════════════════════════════════════ */}
  {view==="interpretacion"&&(
  <div className="fade" style={{maxWidth:680,margin:"34px auto",padding:"0 20px"}}>
    <h2 style={{fontFamily:"Fraunces,serif",fontSize:24,fontWeight:700,marginBottom:4}}>Interpretación Profesional</h2>
    <p style={{color:"#4A6380",fontSize:13,marginBottom:22}}>Un médico revisa tus resultados y te envía un informe por correo en menos de 24h.</p>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:20}}>
      {[["📤","Sube resultados","PDF o imagen"],["🤖","IA pre-analiza","Detecta valores fuera de rango"],["👨‍⚕️","Médico valida","Redacta y firma el informe"],["📧","Recibes por email","En <24h con recomendaciones"]].map(([ic,t,d])=>(
        <div key={t} style={{display:"flex",gap:9,background:"white",borderRadius:10,padding:"11px",border:"1px solid #E8EEF6"}}>
          <span style={{fontSize:20}}>{ic}</span><div><div style={{fontSize:13,fontWeight:700,marginBottom:2}}>{t}</div><div style={{fontSize:11,color:"#4A6380"}}>{d}</div></div>
        </div>
      ))}
    </div>
    <div style={{background:"white",borderRadius:13,padding:"20px",border:"1.5px solid #E8EEF6"}}>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
          <div><label style={{fontSize:10,fontWeight:700,color:"#8AA3BA",display:"block",marginBottom:4,textTransform:"uppercase",letterSpacing:".06em"}}>Nombre *</label><input className="fi" placeholder="Tu nombre completo"/></div>
          <div><label style={{fontSize:10,fontWeight:700,color:"#8AA3BA",display:"block",marginBottom:4,textTransform:"uppercase",letterSpacing:".06em"}}>Email *</label><input className="fi" type="email" placeholder="tu@correo.cl"/></div>
        </div>
        <div>
          <label style={{fontSize:10,fontWeight:700,color:"#8AA3BA",display:"block",marginBottom:4,textTransform:"uppercase",letterSpacing:".06em"}}>Adjunta tus resultados</label>
          <div style={{border:"2px dashed #D6E4F0",borderRadius:9,padding:"18px",textAlign:"center",background:"#F5F7FA",cursor:"pointer"}}>
            <div style={{fontSize:22,marginBottom:4}}>📁</div>
            <div style={{fontWeight:600,fontSize:13}}>Haz clic o arrastra tu archivo</div>
            <div style={{fontSize:11,color:"#8AA3BA"}}>PDF, JPG, PNG — máx. 10MB</div>
          </div>
        </div>
        <div style={{background:"#EBF3FB",borderRadius:9,padding:"11px 13px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><div style={{fontSize:13,fontWeight:700}}>Informe médico profesional</div><div style={{fontSize:11,color:"#4A6380"}}>Revisión + firma digital · En &lt;24h</div></div>
          <div style={{fontSize:19,fontWeight:800,color:"#1565C0"}}>$9.990</div>
        </div>
        <button className="btn bg" style={{padding:"12px",fontSize:13}}>📧 Solicitar informe — $9.990</button>
      </div>
    </div>
  </div>
  )}

  {/* ══ CERTIFICADOS ════════════════════════════════════════════ */}
  {view==="certificados"&&(
  <div className="fade" style={{maxWidth:760,margin:"34px auto",padding:"0 20px"}}>
    <h2 style={{fontFamily:"Fraunces,serif",fontSize:24,fontWeight:700,marginBottom:4}}>Certificados Médicos</h2>
    <p style={{color:"#4A6380",fontSize:13,marginBottom:22}}>Válidos legalmente. Firmados digitalmente. Entregados por correo.</p>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(195px,1fr))",gap:12}}>
      {[["🛏️","Reposo","Para empleador. 1–7 días.",8990],["🏃","Aptitud Física","Deportes o trabajo.",9990],["💼","Salud General","Trámites laborales.",7990],["🦠","No Contagio","Descarta enfermedades.",9990],["💍","Prenupcial","Registro Civil.",12990],["🎓","Estudiantil","Instituciones educativas.",7990]].map(([ic,nm,de,pr])=>(
        <div key={nm} style={{background:"white",border:"1.5px solid #E8EEF6",borderRadius:12,padding:"15px",transition:"all .14s"}}
          onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 3px 14px rgba(21,101,192,.09)";e.currentTarget.style.borderColor="#BBCFE8";}}
          onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.borderColor="#E8EEF6";}}>
          <div style={{fontSize:26,marginBottom:8}}>{ic}</div>
          <h3 style={{fontSize:13,fontWeight:700,marginBottom:3}}>{nm}</h3>
          <p style={{fontSize:11,color:"#4A6380",lineHeight:1.5,marginBottom:8}}>{de}</p>
          <div style={{fontSize:15,fontWeight:800,color:"#1565C0",marginBottom:8}}>{fmt(pr)}</div>
          <button className="btn bb" style={{width:"100%",padding:"7px",fontSize:12}}>Solicitar →</button>
        </div>
      ))}
    </div>
  </div>
  )}

  {/* ══ SUSCRIPCIÓN ═════════════════════════════════════════════ */}
  {view==="suscripcion"&&(
  <div className="fade" style={{maxWidth:780,margin:"34px auto",padding:"0 20px"}}>
    <div style={{textAlign:"center",marginBottom:28}}>
      <h2 style={{fontFamily:"Fraunces,serif",fontSize:24,fontWeight:700,marginBottom:5}}>Planes de Suscripción</h2>
      <p style={{color:"#4A6380",fontSize:13}}>Salud continua con ingreso predecible.</p>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
      {[
        {name:"Control Básico",price:5000,color:"#1565C0",ft:["2 órdenes/mes","Recordatorio email","Historial digital"]},
        {name:"Control Crónico",price:9900,color:"#1A7F64",ft:["Órdenes ilimitadas","Alertas críticas","1 informe médico/mes","Soporte 24/7"],best:true},
        {name:"Plan Familiar",price:18900,color:"#0B3D6B",ft:["Hasta 4 integrantes","Todo el plan Crónico x4","Médico de cabecera"]},
      ].map(p=>(
        <div key={p.name} style={{background:"white",border:`2px solid ${p.best?p.color:"#E8EEF6"}`,borderRadius:14,padding:"18px",position:"relative",boxShadow:p.best?`0 5px 20px ${p.color}22`:"none"}}>
          {p.best&&<div style={{position:"absolute",top:-10,left:"50%",transform:"translateX(-50%)",background:"#F59E0B",color:"white",padding:"2px 11px",borderRadius:100,fontSize:11,fontWeight:800,whiteSpace:"nowrap"}}>⭐ Más popular</div>}
          <h3 style={{fontSize:14,fontWeight:700,marginBottom:5}}>{p.name}</h3>
          <div style={{fontFamily:"Fraunces,serif",fontSize:24,fontWeight:700,color:p.color,marginBottom:13}}>{fmt(p.price)}<span style={{fontSize:11,fontWeight:400,color:"#8AA3BA"}}>/mes</span></div>
          <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:14}}>
            {p.ft.map(f=><div key={f} style={{display:"flex",alignItems:"center",gap:6}}><Check size={10} color={p.color}/><span style={{fontSize:12,color:"#4A6380"}}>{f}</span></div>)}
          </div>
          <button className="btn" style={{width:"100%",padding:"9px",borderRadius:9,border:`1.5px solid ${p.color}`,background:"transparent",color:p.color,fontSize:12,fontWeight:700}}>Elegir plan</button>
        </div>
      ))}
    </div>
  </div>
  )}

  {/* ══ EMPRESAS ════════════════════════════════════════════════ */}
  {view==="empresas"&&(
  <div className="fade" style={{maxWidth:680,margin:"34px auto",padding:"0 20px",textAlign:"center"}}>
    <h2 style={{fontFamily:"Fraunces,serif",fontSize:24,fontWeight:700,marginBottom:9}}>SaludIntegral para Empresas</h2>
    <p style={{color:"#4A6380",fontSize:14,lineHeight:1.7,marginBottom:24,maxWidth:460,margin:"0 auto 24px"}}>Beneficios de salud preventiva para tu equipo. Facturación centralizada, reportes y descuentos por volumen.</p>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:22}}>
      {[["🏢","Gestión centralizada","Panel para todos tus colaboradores"],["💰","Factura a la empresa","Un documento para RRHH"],["📊","Reportes de salud","Analítica de bienestar del equipo"]].map(([ic,t,d])=>(
        <div key={t} style={{background:"white",borderRadius:11,padding:"15px",border:"1.5px solid #E8EEF6"}}>
          <div style={{fontSize:26,marginBottom:7}}>{ic}</div>
          <div style={{fontSize:13,fontWeight:700,marginBottom:3}}>{t}</div>
          <div style={{fontSize:12,color:"#4A6380",lineHeight:1.5}}>{d}</div>
        </div>
      ))}
    </div>
    <button className="btn bn" style={{fontSize:13,padding:"12px 24px"}}>Contactar a ventas →</button>
  </div>
  )}

  {/* ══ CHECKOUT ════════════════════════════════════════════════ */}
  {view==="checkout"&&(
  <div className="fade" style={{maxWidth:560,margin:"34px auto",padding:"0 20px"}}>
    {!done?(
      <div style={{background:"white",borderRadius:15,padding:"24px",border:"1.5px solid #E8EEF6",boxShadow:"0 2px 16px rgba(11,61,107,.05)"}}>
        <h2 style={{fontFamily:"Fraunces,serif",fontSize:20,fontWeight:700,marginBottom:18}}>Finalizar compra</h2>
        <div style={{background:"#F5F7FA",borderRadius:9,padding:"11px",marginBottom:16}}>
          {cart.map(item=>(
            <div key={item.id} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",fontSize:13,borderBottom:"1px solid #E8EEF6"}}>
              <span style={{fontWeight:500}}>{item.name}</span><span style={{fontWeight:700,color:"#1565C0"}}>{fmt(item.price)}</span>
            </div>
          ))}
          {promoOn&&<div style={{display:"flex",justifyContent:"space-between",padding:"4px 0",fontSize:13,color:"#1A7F64",fontWeight:700}}><span>🎁 50% OFF</span><span>−{fmt(disc)}</span></div>}
          <div style={{display:"flex",justifyContent:"space-between",marginTop:7,paddingTop:7,borderTop:"1.5px solid #E8EEF6",fontSize:15,fontWeight:800}}><span>Total</span><span style={{color:"#1565C0"}}>{fmt(total)}</span></div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
          <div style={{fontSize:10,fontWeight:700,color:"#8AA3BA",textTransform:"uppercase",letterSpacing:".06em"}}>Datos del paciente</div>
          <input className="fi" placeholder="Nombre completo *" value={pat.nombre} onChange={e=>setPat(p=>({...p,nombre:e.target.value}))}/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            <input className="fi" placeholder="RUT (12345678-9) *" value={pat.rut} onChange={e=>setPat(p=>({...p,rut:e.target.value}))}/>
            <select className="fi" value={pat.prev} onChange={e=>setPat(p=>({...p,prev:e.target.value}))}>
              {["Fonasa A","Fonasa B","Fonasa C","Fonasa D","Isapre","Particular"].map(o=><option key={o}>{o}</option>)}
            </select>
          </div>
          <input className="fi" type="email" placeholder="Correo (recibirás la orden aquí) *" value={pat.email} onChange={e=>setPat(p=>({...p,email:e.target.value}))}/>
        </div>
        <div style={{marginBottom:14}}>
          <div style={{fontSize:10,fontWeight:700,color:"#8AA3BA",textTransform:"uppercase",letterSpacing:".06em",marginBottom:7}}>Documento tributario</div>
          <div style={{display:"flex",gap:7}}>
            {["boleta","factura"].map(t=>(
              <label key={t} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6,cursor:"pointer",padding:"8px",borderRadius:9,border:`1.5px solid ${billType===t?"#1565C0":"#E8EEF6"}`,background:billType===t?"#EBF3FB":"white",fontWeight:700,fontSize:12,transition:"all .12s"}}>
                <input type="radio" checked={billType===t} onChange={()=>setBillType(t)} style={{accentColor:"#1565C0"}}/>{t.charAt(0).toUpperCase()+t.slice(1)}
              </label>
            ))}
          </div>
        </div>
        <div style={{background:"#F5F7FA",border:"2px dashed #D6E4F0",borderRadius:11,padding:"16px",textAlign:"center",marginBottom:11}}>
          <p style={{fontFamily:"Fraunces,serif",fontSize:26,fontWeight:700,color:"#1565C0",marginBottom:8}}>{fmt(total)}</p>
          <p style={{fontSize:11,color:"#8AA3BA"}}>🔒 Pago seguro WebPay / Transbank</p>
        </div>
        <button onClick={()=>{if(!pat.nombre||!pat.rut||!pat.email)return;setDone(true);}}
          style={{width:"100%",padding:"12px",fontSize:13,background:(!pat.nombre||!pat.rut||!pat.email)?"#CBD5E1":"#1A7F64",color:"white",borderRadius:9,border:"none",cursor:(!pat.nombre||!pat.rut||!pat.email)?"not-allowed":"pointer",fontWeight:700,fontFamily:"inherit",transition:"background .16s"}}>
          Pagar y recibir orden en mi email →
        </button>
        <button onClick={()=>go("examenes")} style={{width:"100%",background:"none",border:"none",color:"#8AA3BA",fontSize:11,padding:"6px",cursor:"pointer",marginTop:3}}>← Volver al catálogo</button>
      </div>
    ):(
      <div className="fade" style={{background:"white",borderRadius:15,padding:"38px 24px",textAlign:"center",border:"1.5px solid #E8EEF6"}}>
        <div style={{width:56,height:56,background:"linear-gradient(135deg,#1A7F64,#2EAA6E)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,margin:"0 auto 13px"}}>✓</div>
        <h2 style={{fontFamily:"Fraunces,serif",fontSize:20,fontWeight:700,marginBottom:7}}>¡Orden generada!</h2>
        <p style={{color:"#4A6380",fontSize:14,marginBottom:16}}>Enviada a <strong>{pat.email}</strong>. Firmada digitalmente.</p>
        <div style={{display:"flex",gap:8,justifyContent:"center"}}>
          <button className="btn bb" onClick={()=>{go("examenes");setDone(false);}}>Nuevo examen</button>
          <button className="btn bg" onClick={()=>go("interpretacion")}>Subir resultados</button>
        </div>
      </div>
    )}
  </div>
  )}
  </div>
  );
}
