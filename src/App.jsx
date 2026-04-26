import { useState, useEffect, useRef } from "react";
import { ShoppingCart, X, ChevronDown, Check, Star, Menu, Instagram, Facebook, Linkedin, Youtube, MapPin, MessageCircle, Send, Phone, Mail, Zap, ArrowRight, AlertCircle, Heart, Wind, Baby, User, Users } from "lucide-react";

// ─── LOGO ────────────────────────────────────────────────────────
const Logo = ({ white=false, size=34 }) => (
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

// ─── FOTOS LATINAS/CAUCÁSICAS NATURALES ─────────────────────────
const HERO_SLIDES = [
  { img:"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1400", tag:"Prevención", title:"Tu salud,", accent:"sin trámites.", sub:"Órdenes médicas oficiales en 5 minutos. Sin citas, sin filas." },
  { img:"https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=1400", tag:"Laboratorio", title:"Exámenes en", accent:"cualquier lab.", sub:"Órdenes válidas en +200 laboratorios de todo Chile." },
  { img:"https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&q=80&w=1400", tag:"Interpretación IA", title:"Resultados que", accent:"entiendes.", sub:"Un médico revisa tus exámenes y te explica qué significan." },
  { img:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1400", tag:"Salud Preventiva", title:"Cuida tu salud", accent:"hoy.", sub:"Kits preventivos diseñados por médicos al mejor precio." },
];

const PREV_PHOTOS = [
  { img:"https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=600", label:"Consulta preventiva" },
  { img:"https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=600", label:"Atención profesional" },
  { img:"https://images.unsplash.com/photo-1579684453423-f84349ef60b0?auto=format&fit=crop&q=80&w=600", label:"Resultados rápidos" },
  { img:"https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&q=80&w=600", label:"Tecnología médica" },
];

// ─── BANNERS ESTACIONALES ────────────────────────────────────────
const SEASONAL_BANNERS = [
  {
    id:"mayo",
    month:"Mayo — Mes de la Mujer",
    color:"linear-gradient(135deg,#BE185D,#9D174D)",
    icon:"🌸",
    title:"Cuida tu salud femenina",
    desc:"Detección temprana salva vidas. Paquetes especiales para mujeres este mes.",
    exams:["Mamografía Bilateral","Ecografía Mamaria","Densitometría Ósea","PAP + Test VPH"],
    discount:"20% OFF",
    badge:"Mes de la Mujer",
    cta:"Ver pack mujer →"
  },
  {
    id:"junio",
    month:"Junio — Infecciones Respiratorias",
    color:"linear-gradient(135deg,#0369A1,#0B3D6B)",
    icon:"🫁",
    title:"Protege tus pulmones",
    desc:"Temporada de gripe e infecciones. Diagnóstico rápido y certero.",
    exams:["Rx Tórax AP + Lateral","Panel Viral Respiratorio","Procalcitonina","Hemograma + PCR"],
    discount:"15% OFF",
    badge:"Temporada Respiratoria",
    cta:"Ver pack respiratorio →"
  },
  {
    id:"julio",
    month:"Julio — Salud Cardiovascular",
    color:"linear-gradient(135deg,#DC2626,#991B1B)",
    icon:"❤️",
    title:"Tu corazón importa",
    desc:"Las enfermedades cardiovasculares son la principal causa de muerte en Chile.",
    exams:["Electrocardiograma","Perfil Lipídico","PCR Ultrasensible","Homocisteína"],
    discount:"40% OFF",
    badge:"Oferta Relámpago",
    cta:"Ver kit cardiovascular →"
  },
  {
    id:"agosto",
    month:"Agosto — Salud Masculina",
    color:"linear-gradient(135deg,#1565C0,#0B3D6B)",
    icon:"💪",
    title:"Pack Hombre Adulto",
    desc:"Exámenes esenciales para el bienestar masculino. Próstata, hormonas y más.",
    exams:["Antígeno Prostático (PSA Total y Libre)","Testosterona Total y Libre","Hemograma completo","Perfil lipídico"],
    discount:"25% OFF",
    badge:"Pack Hombre",
    cta:"Ver pack hombre →"
  },
];

// ─── DATOS ───────────────────────────────────────────────────────
const LABS = [
  { id:1, name:"Lab. RedSalud Providencia",  addr:"Av. Providencia 1234, Providencia", km:"0.4 km", open:"07:30", rating:4.8, convenio:true },
  { id:2, name:"Clínica Bupa Santiago",       addr:"Av. Ricardo Lyon 45, Providencia",  km:"0.9 km", open:"07:00", rating:4.6, convenio:true },
  { id:3, name:"UC Christus Lab Express",     addr:"Marchant Pereira 221, Ñuñoa",       km:"1.2 km", open:"07:30", rating:4.7, convenio:true },
  { id:4, name:"Clínica Alemana Lab",         addr:"Av. Vitacura 5951, Vitacura",        km:"3.1 km", open:"06:00", rating:4.9, convenio:true },
  { id:5, name:"Megasalud Ñuñoa",            addr:"Av. Irarrázaval 3956, Ñuñoa",        km:"1.8 km", open:"08:00", rating:4.4, convenio:false },
];

const KITS = [
  { id:"empa",   name:"Kit EMPA Preventivo",   price:29990, orig:49990, badge:"Más popular",   bc:"#2EAA6E", desc:"Hemograma, Glicemia, Lípidos, Orina, TSH. Chequeo anual completo." },
  { id:"cardio", name:"Kit Cardiovascular",     price:45990, orig:76650, badge:"❤️ Corazón",    bc:"#C62828", desc:"ECG, PCR Ultrasensible, Lípidos, Homocisteína, HbA1c." },
  { id:"mujer",  name:"Pack Mujer Integral",    price:49990, orig:83320, badge:"🌸 Mujer",       bc:"#BE185D", desc:"PAP, VPH, Mamografía, Perfil hormonal, Densitometría ósea." },
  { id:"hombre", name:"Pack Hombre Adulto",     price:44990, orig:74985, badge:"💪 Hombre",      bc:"#1565C0", desc:"PSA Total/Libre, Testosterona, Hemograma, Perfil lipídico, ECG." },
  { id:"deporte",name:"Kit Deportista Pro",     price:38990, orig:64985, badge:"⚡ Deporte",     bc:"#0891B2", desc:"Hemograma, Electrolitos, Hierro, Vitamina D, EKG de esfuerzo." },
  { id:"diabetes",name:"Pack Diabético",        price:33990, orig:56650, badge:"🩺 Control",     bc:"#0B3D6B", desc:"HbA1c, Insulina basal, HOMA-IR, Microalbuminuria, Perfil renal." },
  { id:"resp",   name:"Pack Respiratorio",      price:24990, orig:41650, badge:"🫁 Respiratorio", bc:"#0369A1", desc:"Rx Tórax, Panel viral, Procalcitonina, Hemograma, PCR." },
  { id:"fertil", name:"Pack Fertilidad Mujer",  price:52990, orig:88320, badge:"🌺 Fertilidad",  bc:"#7C3AED", desc:"AMH, Perfil hormonal completo, FSH, LH, Estradiol, Progesterona." },
];

const EXAM_CATS = [
  { cat:"🩸 Perfiles de Laboratorio", items:[
    { id:"bioq16", name:"Perfil Bioquímico 16 parámetros", price:12000, top:true, desc:"Glucosa, urea, ácido úrico, colesterol, calcio, fósforo y más" },
    { id:"lip",    name:"Perfil Lipídico Completo",         price:8500,  top:true, desc:"Col. total, HDL, LDL, triglicéridos, VLDL" },
    { id:"hepat",  name:"Perfil Hepático",                  price:10500, top:true, desc:"Transaminasas, bilirrubina, fosfatasas alcalinas, GGT" },
    { id:"hemo",   name:"Hemograma con VHS",                price:6500,  top:true, desc:"Serie roja, blanca, plaquetas y velocidad de sedimentación" },
    { id:"elp",    name:"Electrolitos Plasmáticos (ELP)",   price:5500,  top:false, desc:"Sodio, Potasio, Cloro — hipertensión y deportistas" },
    { id:"uri",    name:"Orina Completa y Sedimento",       price:4000,  top:true, desc:"Análisis físico-químico y microscópico" },
    { id:"glic",   name:"Glicemia en Ayunas",               price:3500,  top:true, desc:"Nivel de glucosa (8 horas de ayuno)" },
    { id:"hba1c",  name:"Hemoglobina Glicosilada HbA1c",    price:7500,  top:true, desc:"Control glicémico promedio últimos 3 meses" },
  ]},
  { cat:"👨 Perfil Masculino", items:[
    { id:"psa_tl", name:"PSA Total y Libre",             price:16500, top:true, desc:"Cribado cáncer próstata — >40 años" },
    { id:"test_tl",name:"Testosterona Total y Libre",    price:19000, top:true, desc:"Bienestar hormonal masculino" },
    { id:"creat",  name:"Creatinina y Uremia",           price:5000,  top:false, desc:"Función renal completa" },
    { id:"ekg",    name:"Electrocardiograma (ECG)",      price:15000, top:true, desc:"Evaluación cardíaca basal" },
  ]},
  { cat:"👩 Perfil Femenino", items:[
    { id:"pap_vph",name:"PAP + Test VPH",               price:22000, top:true, desc:"Tamizaje cáncer cervicouterino — estándar 2026" },
    { id:"amh",    name:"Hormona Antimülleriana (AMH)",  price:28000, top:true, desc:"Reserva ovárica — planificación de fertilidad" },
    { id:"hrm",    name:"Perfil Hormonal Ginecológico",  price:24000, top:true, desc:"FSH, LH, Estradiol, Progesterona" },
    { id:"mamog",  name:"Mamografía Bilateral",          price:35000, top:true, desc:"Screening cáncer de mama >40 años" },
    { id:"eco_mam",name:"Ecografía Mamaria",             price:28000, top:false, desc:"Complemento mamografía — mamas densas" },
    { id:"densi",  name:"Densitometría Ósea (DEXA)",    price:40000, top:false, desc:"Osteoporosis y osteopenia" },
  ]},
  { cat:"🦋 Perfil Tiroideo", items:[
    { id:"tsh",    name:"TSH Ultrasensible",             price:7000,  top:true, desc:"Cribado función tiroidea" },
    { id:"t4l",    name:"T4 Libre",                      price:8000,  top:true, desc:"Hormona tiroidea activa" },
    { id:"antitpo",name:"Anti-TPO (Hashimoto)",          price:12000, top:false, desc:"Tiroiditis autoinmune" },
    { id:"eco_tir",name:"Ecografía Tiroidea",            price:28000, top:false, desc:"Nódulos y bocio" },
  ]},
  { cat:"🛡️ Reumatología e Inflamación", items:[
    { id:"fr_accp",name:"Factor Reumatoide + Anti-CCP",  price:18000, top:true, desc:"Artritis reumatoide — diagnóstico precoz" },
    { id:"ana",    name:"ANA (Anticuerpos Antinucleares)",price:15000, top:false, desc:"Portal para Lupus y Sjögren" },
    { id:"pcrus",  name:"PCR Ultrasensible (hs-CRP)",    price:9000,  top:true, desc:"Inflamación crónica y riesgo cardíaco" },
    { id:"vitd",   name:"Vitamina D (25-OH)",            price:13500, top:true, desc:"Déficit crónico en Chile — huesos y articulaciones" },
    { id:"vhs",    name:"VHS (Sedimentación)",           price:3500,  top:false, desc:"Inflamación y enfermedades autoinmunes" },
  ]},
  { cat:"🩻 Imagenología", items:[
    { id:"rx_tor", name:"Rx Tórax AP + Lateral",         price:18000, top:true, desc:"Pulmones, corazón, vías aéreas" },
    { id:"eco_abd",name:"Ecografía Abdominal Superior",  price:30000, top:true, desc:"Hígado, vesícula, riñones, páncreas" },
    { id:"tc_tor", name:"TC de Tórax",                   price:85000, top:false, desc:"Post-pandemia — secuelas respiratorias" },
    { id:"tc_abd", name:"TC Abdomen y Pelvis c/contraste",price:120000,top:false, desc:"Urgencias y dolor crónico" },
    { id:"rm_col", name:"RM Columna Lumbar",             price:120000,top:true, desc:"Lumbalgia — alta prevalencia en Chile" },
    { id:"rm_rod", name:"RM Rodilla",                    price:110000,top:false, desc:"Meniscos, ligamentos, cartílago" },
    { id:"rm_hom", name:"RM Hombro",                     price:110000,top:false, desc:"Lesiones traumáticas y deportivas" },
  ]},
  { cat:"🫁 Respiratorio e Infecciones", items:[
    { id:"pcalc",  name:"Procalcitonina",                price:18000, top:true, desc:"Diferencia bacteriano de viral — clave en neumonía" },
    { id:"panel_v",name:"Panel Viral Respiratorio (PCR)",price:45000, top:false, desc:"Influenza, COVID, VRS, Adenovirus" },
    { id:"vih",    name:"VIH 1+2 (ELISA 4ta gen.)",     price:11000, top:true, desc:"Tamizaje combinado Ag/Ac" },
    { id:"sifilis",name:"Sífilis VDRL + TPHA",          price:8000,  top:true, desc:"Screening y confirmación" },
    { id:"hpyl",   name:"H. Pylori en Heces",           price:12000, top:false, desc:"Detección y control erradicación" },
  ]},
];

// Preguntas del verificador de síntomas
const SYMPTOM_CHECKER = {
  "dolor de espalda": {
    questions:[
      { q:"¿El dolor aumenta con el esfuerzo o movimiento?", yes:"inflamatorio", no:"vascular" },
      { q:"¿Es intermitente o constante?", yes:"mecánico", no:"neuropático" },
      { q:"¿Tienes pérdida de fuerza en piernas o brazos?", yes:"URGENTE-neurologico", no:"muscular" },
    ],
    result: { exams:["RM Columna Lumbar","Rx Columna AP+Lat"], urgency:"normal", msg:"Basado en tus síntomas recomendamos evaluación de columna." }
  },
  "cansancio": {
    questions:[],
    result: { exams:["Hemograma con VHS","Perfil Tiroideo (TSH + T4L)","Vitamina D","Hierro + Ferritina","Vitamina B12"], urgency:"normal", msg:"El cansancio crónico suele tener origen en anemia, tiroides o déficit vitamínico." }
  },
  "dolor articular": {
    questions:[],
    result: { exams:["Factor Reumatoide + Anti-CCP","ANA","PCR Ultrasensible","Vitamina D","Ácido úrico"], urgency:"normal", msg:"Los síntomas articulares pueden indicar condición autoinmune. Evaluación recomendada." }
  },
};

const SUBS = [
  { name:"Control Básico",  price:4990,  orig:8320,  color:"#1565C0", ft:["2 órdenes de control/mes","Recordatorio email","Historial digital","Soporte por chat"] },
  { name:"Control Crónico", price:9900,  orig:16500, color:"#1A7F64", ft:["Órdenes ilimitadas de control","Alertas valores críticos","1 informe médico/mes","Soporte 24/7","IA de seguimiento personalizada"], best:true },
  { name:"Plan Familiar",   price:18900, orig:31500, color:"#0B3D6B", ft:["Hasta 4 integrantes","Todo el plan Crónico x4","Médico de cabecera asignado","Historial familiar unificado","20% OFF en todos los exámenes"] },
];

const CHAT_SYSTEM = `Eres MedIA, el asistente virtual de SaludIntegral, plataforma chilena de telemedicina. Eres empático, profesional y claro. Siempre respondes en español chileno.

REGLAS ESTRICTAS:
- NUNCA diagnostiques enfermedades. Orienta hacia exámenes y servicios.
- Cuando el usuario describe síntomas, sugiere exámenes específicos del catálogo.
- Si hay síntomas de ALARMA (pérdida de fuerza, dolor pecho, dificultad respiratoria severa), indica ir a urgencias.
- Sé conciso: máximo 4 oraciones por respuesta.
- Al sugerir exámenes, menciona que puede agregarlos al carrito en la plataforma.
- Si preguntan por resultados alterados, sugiere derivación médica presencial.

CATÁLOGO DISPONIBLE:
- Perfil Bioquímico 16p $12.000 | Perfil Lipídico $8.500 | Hemograma c/VHS $6.500
- TSH $7.000 | T4 Libre $8.000 | Vitamina D $13.500 | Vitamina B12 $9.500
- Glicemia $3.500 | HbA1c $7.500 | PCR Ultrasensible $9.000
- Hierro + Ferritina $9.000 | Electrolitos ELP $5.500
- PSA Total y Libre $16.500 | Testosterona T+L $19.000
- PAP + VPH $22.000 | AMH $28.000 | Perfil Hormonal $24.000
- Mamografía $35.000 | Ecografía Mamaria $28.000 | Densitometría $40.000
- ECG $15.000 | Rx Tórax $18.000 | Procalcitonina $18.000
- Factor Reumatoide + Anti-CCP $18.000 | ANA $15.000
- RM Columna Lumbar $120.000 | TC Tórax $85.000
- VIH $11.000 | Sífilis $8.000
KITS: EMPA $29.990 | Cardiovascular $45.990 | Mujer $49.990 | Hombre $44.990 | Deportista $38.990 | Diabético $33.990
Interpretación médica de resultados: $9.990
Certificados desde $7.990

EJEMPLOS DE RESPUESTA:
- Usuario "control anual": Sugiere Kit EMPA o Perfil Bioquímico + Hemograma + TSH + Orina.
- Usuario "mujer 25 años antecedentes cáncer mama": Sugiere Ecografía Mamaria + PAP + VPH, explica que la detección temprana es clave.
- Usuario "cansancio": Sugiere Hemograma + TSH + Vitamina D + Hierro.
- Usuario "dolor articular mañanas": Sugiere FR + Anti-CCP + ANA + Vitamina D.
- Si resultado alterado: "Te recomiendo consultar con un médico presencialmente. ¿Quieres que te ayude a encontrar un especialista?"`;

const fmt = (n) => `$${n.toLocaleString("es-CL")}`;

// ════════════════════════════════════════════════════════════════════
export default function SaludIntegralV8() {
  const [view, setView]           = useState("home");
  const [menu, setMenu]           = useState(false);
  const [cartOpen, setCartOpen]   = useState(false);
  const [chatOpen, setChatOpen]   = useState(false);
  const [cart, setCart]           = useState([]);
  const [slide, setSlide]         = useState(0);
  const [bannerSlide, setBannerSlide] = useState(0);
  const [selLab, setSelLab]       = useState(LABS[0]);
  const [userLoc, setUserLoc]     = useState(null);
  const [locLoad, setLocLoad]     = useState(false);
  const [subNav, setSubNav]       = useState({});
  const [promoEmail, setPromoEmail] = useState("");
  const [promoDone, setPromoDone] = useState(false);
  const [promoOn, setPromoOn]     = useState(false);
  const [subEmail, setSubEmail]   = useState("");
  const [subDone, setSubDone]     = useState(false);
  const [msgs, setMsgs]           = useState([]);
  const [chatIn, setChatIn]       = useState("");
  const [chatLoad, setChatLoad]   = useState(false);
  const [activeCat, setActiveCat] = useState(0);
  const [billType, setBillType]   = useState("boleta");
  const [pat, setPat]             = useState({ nombre:"", rut:"", email:"", prev:"Fonasa A" });
  const [orderDone, setOrderDone] = useState(false);
  const [symptom, setSymptom]     = useState("");
  const [symptomResult, setSymptomResult] = useState(null);
  const [cd, setCd]               = useState({ h:19, m:33, s:42 });
  const histRef = useRef([]);
  const endRef  = useRef(null);

  useEffect(() => { const t = setInterval(() => setCd(p => { if(p.s>0)return{...p,s:p.s-1}; if(p.m>0)return{...p,m:p.m-1,s:59}; if(p.h>0)return{h:p.h-1,m:59,s:59}; return p; }), 1000); return ()=>clearInterval(t); }, []);
  useEffect(() => { const t = setInterval(() => setSlide(p => (p+1)%HERO_SLIDES.length), 5200); return ()=>clearInterval(t); }, []);
  useEffect(() => { const t = setInterval(() => setBannerSlide(p => (p+1)%SEASONAL_BANNERS.length), 6000); return ()=>clearInterval(t); }, []);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs]);
  useEffect(() => { if(chatOpen && msgs.length===0) startChat(); }, [chatOpen]);

  const startChat = async () => {
    setChatLoad(true);
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:500, system:CHAT_SYSTEM, messages:[{role:"user",content:"Hola"}] }) });
      const d = await r.json();
      const bot = d.content[0].text;
      histRef.current = [{role:"user",content:"Hola"},{role:"assistant",content:bot}];
      setMsgs([{ role:"assistant", text:bot, t:new Date() }]);
    } catch {
      const greeting = "¡Hola! Soy MedIA 👋 Tu asistente de salud. Puedo ayudarte a encontrar los exámenes que necesitas. ¿Qué síntomas tienes o qué tipo de control estás buscando?";
      histRef.current = [{role:"user",content:"Hola"},{role:"assistant",content:greeting}];
      setMsgs([{ role:"assistant", text:greeting, t:new Date() }]);
    }
    setChatLoad(false);
  };

  const sendChat = async () => {
    const m = chatIn.trim(); if(!m || chatLoad) return;
    setChatIn(""); setMsgs(p => [...p, { role:"user", text:m, t:new Date() }]);
    histRef.current.push({ role:"user", content:m }); setChatLoad(true);
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:500, system:CHAT_SYSTEM, messages:histRef.current }) });
      const d = await r.json();
      const bot = d.content[0].text;
      histRef.current.push({ role:"assistant", content:bot });
      setMsgs(p => [...p, { role:"assistant", text:bot, t:new Date() }]);
    } catch {
      setMsgs(p => [...p, { role:"assistant", text:"Hubo un error técnico. Por favor intenta de nuevo.", t:new Date() }]);
    }
    setChatLoad(false);
  };

  const checkSymptom = () => {
    const s = symptom.toLowerCase().trim();
    let result = null;
    if(s.includes("espalda") || s.includes("columna") || s.includes("lumbar")) result = SYMPTOM_CHECKER["dolor de espalda"].result;
    else if(s.includes("cansa") || s.includes("fatiga") || s.includes("sueño")) result = SYMPTOM_CHECKER["cansancio"].result;
    else if(s.includes("articular") || s.includes("articulacion") || s.includes("rodilla") || s.includes("dolor")) result = SYMPTOM_CHECKER["dolor articular"].result;
    else result = { exams:["Hemograma con VHS","Perfil Bioquímico 16 parámetros","Glicemia"], urgency:"normal", msg:"Basado en tu consulta, estos exámenes de base son un buen punto de partida." };
    setSymptomResult(result);
  };

  const addItem  = (item) => { if(!cart.find(c=>c.id===item.id)) setCart(p=>[...p,item]); };
  const rmItem   = (id)   => setCart(p=>p.filter(c=>c.id!==id));
  const has      = (id)   => cart.some(c=>c.id===id);
  const subTotal = cart.reduce((s,i)=>s+i.price,0);
  const disc     = promoOn ? Math.round(subTotal*0.5) : 0;
  const total    = subTotal - disc;
  const go       = (v) => { setView(v); setMenu(false); window.scrollTo(0,0); };

  const getLocation = () => {
    setLocLoad(true);
    navigator.geolocation?.getCurrentPosition(
      p => { setUserLoc({lat:p.coords.latitude,lng:p.coords.longitude}); setLocLoad(false); },
      () => { setUserLoc({lat:-33.4489,lng:-70.6693}); setLocLoad(false); }
    );
  };

  const mapUrl = selLab
    ? `https://maps.google.com/maps?q=${encodeURIComponent(selLab.name+", "+selLab.addr)}&output=embed&z=15`
    : `https://maps.google.com/maps?q=Santiago+Chile&output=embed&z=12`;

  const dirUrl = (lab) => userLoc
    ? `https://www.google.com/maps/dir/${userLoc.lat},${userLoc.lng}/${encodeURIComponent(lab.addr)}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lab.addr)}`;

  const SOC = [
    { icon:<Instagram size={16}/>, href:"https://instagram.com/saludintegral.cl", label:"Instagram" },
    { icon:<Facebook size={16}/>,  href:"https://facebook.com/saludintegralcl",   label:"Facebook"  },
    { icon:<Linkedin size={16}/>,  href:"https://linkedin.com/company/saludintegral", label:"LinkedIn" },
    { icon:<Youtube size={16}/>,   href:"https://youtube.com/@saludintegralcl",   label:"YouTube"   },
  ];

  const NAV = [
    { label:"Exámenes de sangre", view:"examenes" },
    { label:"Kits preventivos", view:"kits" },
    { label:"Exámenes especializados", view:"examenes", sub:["Perfil Bioquímico","Perfil Hormonal","Reumatología","Imagenología","Respiratorio"] },
    { label:"Interpretación de resultados", view:"interpretacion" },
    { label:"Certificados médicos", view:"certificados" },
    { label:"Laboratorios cercanos", view:"labs" },
    { label:"Suscripción", view:"suscripcion" },
    { label:"Empresas", view:"empresas" },
  ];

  const banner = SEASONAL_BANNERS[bannerSlide];

  return (
  <div style={{ fontFamily:"'Instrument Sans','Segoe UI',sans-serif", background:"#F5F7FA", color:"#0F1E2E", minHeight:"100vh" }}>
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;1,9..144,600&family=Instrument+Sans:wght@400;500;600;700&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    a{text-decoration:none;color:inherit;}button,input,select,textarea{font-family:inherit;outline:none;}img{display:block;}
    ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#F0F4F8}::-webkit-scrollbar-thumb{background:#C5D5E8;border-radius:4px}
    .drawer{position:fixed;top:0;left:0;height:100vh;width:280px;background:white;z-index:600;transform:translateX(-100%);transition:transform .26s cubic-bezier(.4,0,.2,1);box-shadow:3px 0 22px rgba(11,61,107,.1);display:flex;flex-direction:column;overflow-y:auto;}
    .drawer.open{transform:translateX(0);}
    .cpanel{position:fixed;top:0;right:0;height:100vh;width:330px;background:white;z-index:600;transform:translateX(100%);transition:transform .26s cubic-bezier(.4,0,.2,1);box-shadow:-3px 0 22px rgba(11,61,107,.1);display:flex;flex-direction:column;}
    .cpanel.open{transform:translateX(0);}
    .chatbox{position:fixed;bottom:78px;right:18px;width:350px;height:500px;background:white;z-index:700;border-radius:18px;box-shadow:0 10px 44px rgba(11,61,107,.18);display:flex;flex-direction:column;border:1px solid #E0EAF4;overflow:hidden;transform:scale(.94) translateY(8px);opacity:0;pointer-events:none;transition:all .22s cubic-bezier(.4,0,.2,1);}
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
    .cb{padding:10px 13px;border-radius:13px;font-size:13px;line-height:1.6;max-width:84%;}
    .cbot{background:#F0F4F8;color:#0F1E2E;border-bottom-left-radius:4px;}
    .cuser{background:#1565C0;color:white;border-bottom-right-radius:4px;}
    .pl{animation:pla 2s infinite;}@keyframes pla{0%,100%{opacity:1}50%{opacity:.5}}
    .cdb{background:rgba(255,255,255,.13);border:1px solid rgba(255,255,255,.22);border-radius:6px;padding:5px 9px;text-align:center;min-width:42px;}
    .banner-slide{transition:opacity .6s ease;}
    .quick-pill{background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);color:white;padding:5px 12px;border-radius:100px;font-size:12px;font-weight:600;cursor:pointer;transition:all .15s;}
    .quick-pill:hover{background:rgba(255,255,255,.25);}
    .cat-pill{padding:7px 16px;border-radius:100px;font-size:12px;font-weight:600;border:none;cursor:pointer;white-space:nowrap;transition:all .15s;}
    .cat-pill.on{background:#1565C0;color:white;}.cat-pill.off{background:white;color:#4A6380;border:1.5px solid #E0EAF4;}.cat-pill.off:hover{border-color:#1565C0;color:#1565C0;}
  `}</style>

  {/* URGENCY BAR */}
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

  {/* DRAWER */}
  {(menu||cartOpen)&&<div className="overlay" onClick={()=>{setMenu(false);setCartOpen(false);}}/>}
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

  {/* CART PANEL */}
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
        {promoOn&&<div style={{display:"flex",justifyContent:"space-between",fontSize:12,fontWeight:600,color:"#1A7F64",background:"#E8F5EE",borderRadius:8,padding:"6px 9px",marginBottom:8}}><span>🎁 50% OFF primera orden</span><span>−{fmt(disc)}</span></div>}
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:12,fontSize:16,fontWeight:700}}><span>Total</span><span style={{color:"#1565C0"}}>{fmt(total)}</span></div>
        <button className="btn bg" style={{width:"100%",padding:"12px",fontSize:14}} onClick={()=>{setCartOpen(false);go("checkout");}}>Pagar y generar orden →</button>
        <button onClick={()=>setCart([])} style={{width:"100%",background:"none",border:"none",color:"#8AA3BA",fontSize:11,padding:"6px",cursor:"pointer",marginTop:3}}>Vaciar carrito</button>
      </div>
    )}
  </div>

  {/* CHATBOT MedIA */}
  <div className={`chatbox ${chatOpen?"open":""}`}>
    <div style={{background:"linear-gradient(135deg,#0B3D6B,#1565C0)",padding:"13px 15px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
      <div style={{display:"flex",alignItems:"center",gap:9}}>
        <div style={{width:36,height:36,borderRadius:"50%",background:"rgba(255,255,255,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17}}>🤖</div>
        <div>
          <div style={{color:"white",fontWeight:700,fontSize:14}}>MedIA — Asistente</div>
          <div style={{color:"rgba(255,255,255,.6)",fontSize:11,display:"flex",alignItems:"center",gap:5}}><span className="pl" style={{width:5,height:5,borderRadius:"50%",background:"#2EAA6E",display:"inline-block"}}/>En línea 24/7</div>
        </div>
      </div>
      <button onClick={()=>setChatOpen(false)} style={{background:"none",border:"none",color:"rgba(255,255,255,.7)",cursor:"pointer"}}><X size={15}/></button>
    </div>
    {/* Quick actions */}
    <div style={{background:"#F0F4F8",padding:"8px 11px",display:"flex",gap:6,flexWrap:"wrap",flexShrink:0}}>
      {["Control anual","Soy mujer 25 años","Estoy cansado/a","Dolor articular","Antecedentes cardíacos"].map(q=>(
        <button key={q} onClick={()=>{setChatIn(q);}} style={{fontSize:11,fontWeight:600,background:"white",border:"1px solid #E0EAF4",color:"#1565C0",padding:"4px 10px",borderRadius:100,cursor:"pointer",whiteSpace:"nowrap"}}>{q}</button>
      ))}
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
      <input className="fi" value={chatIn} onChange={e=>setChatIn(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendChat()} placeholder="Describe tus síntomas o consulta..." style={{flex:1,fontSize:13,padding:"8px 11px"}}/>
      <button className="btn bb" onClick={sendChat} disabled={chatLoad} style={{padding:"8px 11px",opacity:chatLoad?.6:1,flexShrink:0}}><Send size={14}/></button>
    </div>
  </div>

  {/* CHAT FAB */}
  <button onClick={()=>setChatOpen(p=>!p)} style={{position:"fixed",bottom:18,right:18,zIndex:700,width:52,height:52,borderRadius:"50%",background:chatOpen?"#0B3D6B":"linear-gradient(135deg,#1565C0,#0B3D6B)",color:"white",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 5px 18px rgba(21,101,192,.32)",transition:"all .16s"}}>
    {chatOpen?<X size={21}/>:<MessageCircle size={21}/>}
  </button>

  {cart.length>0&&!cartOpen&&(
    <button onClick={()=>setCartOpen(true)} style={{position:"fixed",bottom:18,right:80,zIndex:650,background:"linear-gradient(135deg,#0B3D6B,#1565C0)",color:"white",padding:"10px 16px",borderRadius:100,fontSize:13,fontWeight:700,boxShadow:"0 4px 16px rgba(21,101,192,.28)",display:"flex",alignItems:"center",gap:7,border:"none",cursor:"pointer"}}>
      <span style={{background:"#2EAA6E",borderRadius:"50%",width:18,height:18,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800}}>{cart.length}</span>
      {fmt(total)}
    </button>
  )}

  {/* ══ HOME ════════════════════════════════════════════════════ */}
  {view==="home"&&(
  <div className="fade">

    {/* HERO SLIDESHOW */}
    <section style={{position:"relative",height:520,overflow:"hidden",background:"#0B3D6B"}}>
      {HERO_SLIDES.map((s,i)=>(
        <div key={i} className="hslide" style={{position:"absolute",inset:0,opacity:i===slide?1:0}}>
          <img src={s.img} alt={s.title} style={{width:"100%",height:"100%",objectFit:"cover",opacity:.3}}/>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,rgba(11,61,107,.97) 38%,rgba(11,61,107,.35) 100%)"}}/>
        </div>
      ))}
      <div style={{position:"relative",zIndex:2,maxWidth:560,padding:"68px 40px 60px",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:7,background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.18)",borderRadius:100,padding:"4px 12px",marginBottom:18,width:"fit-content"}}>
          <span className="pl" style={{width:6,height:6,borderRadius:"50%",background:"#2EAA6E",display:"inline-block"}}/>
          <span style={{color:"rgba(255,255,255,.88)",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em"}}>{HERO_SLIDES[slide].tag}</span>
        </div>
        <h1 style={{fontFamily:"Fraunces,serif",fontSize:"clamp(34px,5.5vw,56px)",fontWeight:700,color:"white",lineHeight:1.06,marginBottom:13}}>
          {HERO_SLIDES[slide].title}<br/><em style={{color:"#A8D8B9"}}>{HERO_SLIDES[slide].accent}</em>
        </h1>
        <p style={{color:"rgba(255,255,255,.7)",fontSize:15,lineHeight:1.65,marginBottom:26,maxWidth:400}}>{HERO_SLIDES[slide].sub}</p>
        <div style={{display:"flex",gap:9,flexWrap:"wrap"}}>
          <button className="btn bg" style={{fontSize:14,padding:"12px 22px"}} onClick={()=>go("examenes")}>Ver exámenes →</button>
          <button className="btn" style={{background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.22)",color:"white",padding:"12px 18px",borderRadius:9,fontSize:13,fontWeight:600}} onClick={()=>go("kits")}>Ver kits</button>
        </div>
      </div>
      <div style={{position:"absolute",bottom:18,left:40,zIndex:3,display:"flex",gap:6}}>
        {HERO_SLIDES.map((_,i)=><button key={i} onClick={()=>setSlide(i)} style={{width:i===slide?20:6,height:6,borderRadius:3,background:i===slide?"#2EAA6E":"rgba(255,255,255,.32)",border:"none",cursor:"pointer",padding:0,transition:"all .28s"}}/>)}
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

    {/* BANNER ESTACIONAL DINÁMICO */}
    <section style={{padding:"0",background:banner.color,overflow:"hidden"}}>
      <div className="sec" style={{padding:"28px 20px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:24,alignItems:"center"}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
              <span style={{fontSize:28}}>{banner.icon}</span>
              <div>
                <div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,.6)",textTransform:"uppercase",letterSpacing:".1em"}}>{banner.month}</div>
                <h3 style={{fontFamily:"Fraunces,serif",fontSize:"clamp(18px,2.5vw,26px)",fontWeight:700,color:"white",lineHeight:1.1}}>{banner.title}</h3>
              </div>
              <span style={{background:"rgba(255,255,255,.2)",color:"white",fontSize:12,fontWeight:800,padding:"4px 12px",borderRadius:100,border:"1px solid rgba(255,255,255,.3)",marginLeft:"auto"}}>{banner.discount}</span>
            </div>
            <p style={{color:"rgba(255,255,255,.75)",fontSize:13,marginBottom:12}}>{banner.desc}</p>
            <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:14}}>
              {banner.exams.map(e=><span key={e} className="quick-pill">{e}</span>)}
            </div>
            <button className="btn" style={{background:"white",color:banner.color.includes("BE185D")?"#BE185D":banner.color.includes("DC2626")?"#DC2626":banner.color.includes("0B3D6B")?"#1565C0":"#0369A1",padding:"9px 20px",borderRadius:9,fontSize:13,fontWeight:700}} onClick={()=>go("kits")}>
              {banner.cta}
            </button>
          </div>
          <div style={{display:"flex",gap:6,flexShrink:0}}>
            {SEASONAL_BANNERS.map((_,i)=>(
              <button key={i} onClick={()=>setBannerSlide(i)} style={{width:i===bannerSlide?22:7,height:7,borderRadius:4,background:i===bannerSlide?"rgba(255,255,255,.9)":"rgba(255,255,255,.3)",border:"none",cursor:"pointer",padding:0,transition:"all .25s"}}/>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* VERIFICADOR DE SÍNTOMAS */}
    <section style={{background:"linear-gradient(135deg,#EBF3FB,#E8F5EE)",padding:"40px 20px",borderBottom:"1px solid #D6E4F0"}}>
      <div style={{maxWidth:660,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:20}}>
          <h2 style={{fontFamily:"Fraunces,serif",fontSize:22,fontWeight:700,marginBottom:6,color:"#0B3D6B"}}>🔍 Verificador de Síntomas</h2>
          <p style={{color:"#4A6380",fontSize:13}}>Describe tu síntoma y te sugerimos los exámenes correctos</p>
        </div>
        <div style={{display:"flex",gap:9,marginBottom:16}}>
          <input className="fi" value={symptom} onChange={e=>{setSymptom(e.target.value);setSymptomResult(null);}} placeholder="Ej: dolor de espalda, cansancio crónico, dolor articular..." onKeyDown={e=>e.key==="Enter"&&checkSymptom()} style={{flex:1}}/>
          <button className="btn bg" onClick={checkSymptom} style={{flexShrink:0,padding:"10px 16px",fontSize:13}}>Consultar</button>
        </div>
        <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:symptomResult?16:0}}>
          {["Dolor de espalda","Cansancio","Dolor articular","Control anual","Mujer 30 años"].map(s=>(
            <button key={s} onClick={()=>{setSymptom(s);setSymptomResult(null);}} style={{fontSize:11,fontWeight:600,background:"white",border:"1.5px solid #BBCFE8",color:"#1565C0",padding:"5px 12px",borderRadius:100,cursor:"pointer"}}>{s}</button>
          ))}
        </div>
        {symptomResult&&(
          <div className="fade" style={{background:"white",borderRadius:14,padding:"18px",border:"1.5px solid #BBCFE8",boxShadow:"0 3px 14px rgba(21,101,192,.09)"}}>
            <div style={{fontSize:14,fontWeight:700,color:"#0B3D6B",marginBottom:8}}>🩺 {symptomResult.msg}</div>
            <div style={{fontSize:12,color:"#4A6380",marginBottom:12}}>Exámenes recomendados:</div>
            <div style={{display:"flex",flexDirection:"column",gap:7}}>
              {symptomResult.exams.map(e=>{
                const found = EXAM_CATS.flatMap(c=>c.items).find(i=>i.name.toLowerCase().includes(e.toLowerCase().split(" ")[0]) || e.toLowerCase().includes(i.name.toLowerCase().split(" ")[0]));
                return (
                  <div key={e} style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:"#F5F7FA",borderRadius:9,padding:"9px 12px",border:"1px solid #E0EAF4"}}>
                    <div>
                      <div style={{fontSize:13,fontWeight:600}}>{e}</div>
                      {found&&<div style={{fontSize:11,color:"#8AA3BA"}}>{found.desc}</div>}
                    </div>
                    <div style={{display:"flex",gap:7,alignItems:"center"}}>
                      {found&&<span style={{fontSize:13,fontWeight:700,color:"#1565C0"}}>{fmt(found.price)}</span>}
                      <button className="btn bg" style={{padding:"6px 12px",fontSize:12}} onClick={()=>found&&addItem({id:found.id,name:found.name,price:found.price})}>
                        {found&&has(found.id)?"✓":"+ Agregar"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            {cart.length>0&&<div className="fade" style={{marginTop:12,background:"#EBF3FB",borderRadius:9,padding:"9px 12px",fontSize:13,fontWeight:600,color:"#1565C0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span>🛒 {cart.length} examen{cart.length>1?"es":""} en carrito — {fmt(total)}</span>
              <button className="btn bb" style={{padding:"6px 14px",fontSize:12}} onClick={()=>{setCartOpen(false);go("checkout");}}>Pagar ahora →</button>
            </div>}
          </div>
        )}
      </div>
    </section>

    {/* 50% OFF */}
    <section style={{background:"white",padding:"40px 20px",borderBottom:"1px solid #E8EEF6"}}>
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
          <div className="fade" style={{display:"inline-flex",alignItems:"center",gap:8,background:"#E8F5EE",borderRadius:10,padding:"10px 16px",border:"1.5px solid #B2DFCC"}}>
            <Check size={14} color="#1A7F64"/><span style={{fontWeight:700,color:"#1A7F64",fontSize:14}}>¡Descuento activado! 🎉</span>
          </div>
        )}
      </div>
    </section>

    {/* BANNER PREVENCIÓN */}
    <section style={{padding:"56px 20px",background:"#F5F7FA",borderBottom:"1px solid #E8EEF6"}}>
      <div className="sec">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:44,alignItems:"center"}}>
          <div>
            <div style={{background:"#E8F5EE",border:"1px solid #B2DFCC",borderRadius:100,padding:"4px 12px",display:"inline-block",marginBottom:16}}>
              <span style={{fontSize:11,fontWeight:700,color:"#1A7F64",textTransform:"uppercase",letterSpacing:".08em"}}>✦ Prevención es salud</span>
            </div>
            <h2 style={{fontFamily:"Fraunces,serif",fontSize:"clamp(24px,3.5vw,36px)",fontWeight:700,color:"#0B3D6B",lineHeight:1.12,marginBottom:14}}>
              Detecta antes.<br/><em style={{color:"#2EAA6E"}}>Vive mejor.</em>
            </h2>
            <p style={{color:"#4A6380",fontSize:14,lineHeight:1.7,marginBottom:20}}>El 80% de las enfermedades crónicas son prevenibles. Un chequeo anual puede salvarte la vida.</p>
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

    {/* KITS */}
    <section style={{padding:"52px 20px",background:"white",borderTop:"1px solid #E8EEF6"}}>
      <div className="sec">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
          <h2 style={{fontFamily:"Fraunces,serif",fontSize:26,fontWeight:700}}>Kits de Salud</h2>
          <button className="btn bo" onClick={()=>go("kits")} style={{fontSize:12}}>Ver todos →</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(225px,1fr))",gap:15}}>
          {KITS.slice(0,4).map(k=>(
            <div key={k.id} className="kc">
              <div style={{padding:"15px 15px 0"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:9}}>
                  <span className="tg" style={{background:k.bc+"18",color:k.bc,border:`1px solid ${k.bc}30`}}>{k.badge}</span>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:10,color:"#8AA3BA",textDecoration:"line-through"}}>{fmt(k.orig)}</div>
                    <div style={{fontSize:18,fontWeight:800,color:"#1565C0"}}>{fmt(k.price)}</div>
                    <div style={{fontSize:9,background:"#E8F5EE",color:"#1A7F64",padding:"1px 5px",borderRadius:4,fontWeight:700}}>Ahorras {fmt(k.orig-k.price)}</div>
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

    {/* LABS MAP PREVIEW */}
    <section style={{padding:"52px 20px",background:"#F5F7FA",borderTop:"1px solid #E8EEF6"}}>
      <div className="sec">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
          <div><h2 style={{fontFamily:"Fraunces,serif",fontSize:24,fontWeight:700,marginBottom:3}}>Laboratorios cercanos</h2><p style={{color:"#4A6380",fontSize:13}}>Presenta tu orden donde prefieras</p></div>
          <button className="btn bo" onClick={()=>go("labs")} style={{fontSize:12}}>Ver mapa completo →</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1.4fr",gap:14,alignItems:"start"}}>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {LABS.slice(0,3).map(lab=>(
              <div key={lab.id} className={`lc ${selLab?.id===lab.id?"on":""}`} onClick={()=>setSelLab(lab)}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><div style={{fontSize:13,fontWeight:700}}>{lab.name}</div><div style={{fontSize:13,fontWeight:700,color:"#1565C0"}}>{lab.km}</div></div>
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
    <section style={{padding:"52px 20px",background:"white"}}>
      <div className="sec">
        <div style={{textAlign:"center",marginBottom:30}}>
          <h2 style={{fontFamily:"Fraunces,serif",fontSize:24,fontWeight:700,marginBottom:6}}>Pacientes satisfechos</h2>
          <div style={{display:"flex",justifyContent:"center",gap:3,marginBottom:5}}>{[...Array(5)].map((_,i)=><Star key={i} size={16} fill="#F59E0B" color="#F59E0B"/>)}</div>
          <p style={{color:"#4A6380",fontSize:13}}>4.9/5 · +1.200 reseñas verificadas</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(265px,1fr))",gap:12}}>
          {[
            {n:"Valentina M.",a:"VM",s:5,d:"hace 2 semanas",t:"Pedí mis exámenes a las 11pm y tuve la orden en minutos. El médico confirmó que todo estaba bien.",e:"Kit EMPA"},
            {n:"Carlos R.",a:"CR",s:5,d:"hace 1 mes",t:"La IA me sugirió los exámenes correctos y detecté hipotiroidismo a tiempo. Proceso impecable.",e:"TSH + T4 Libre"},
            {n:"Ana P.",a:"AP",s:4,d:"hace 3 semanas",t:"El verificador de síntomas me sugirió el examen correcto. Informe médico en menos de 24h.",e:"Perfil Lipídico"},
            {n:"Diego F.",a:"DF",s:5,d:"hace 5 días",t:"El mapa me mostró un lab a 400m de mi trabajo. Kit Deportista perfecto antes del maratón.",e:"Kit Deportista"},
            {n:"Sofía L.",a:"SL",s:5,d:"hace 1 semana",t:"Tengo antecedentes de cáncer en mi familia. El chatbot me orientó perfecto hacia los exámenes preventivos.",e:"Pack Mujer"},
            {n:"Rodrigo T.",a:"RT",s:4,d:"hace 2 meses",t:"Orden perfectamente válida en Clínica Alemana. Rápido y muy profesional.",e:"Kit EMPA"},
          ].map(r=>(
            <div key={r.n} style={{background:"#F5F7FA",borderRadius:12,padding:"15px",border:"1.5px solid #E8EEF6"}}>
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
        <p style={{color:"rgba(255,255,255,.3)",fontSize:11,marginTop:10}}>También en <a href="https://instagram.com/saludintegral.cl" target="_blank" rel="noreferrer" style={{color:"rgba(255,255,255,.5)",fontWeight:700}}>Instagram</a> · <a href="https://facebook.com/saludintegralcl" target="_blank" rel="noreferrer" style={{color:"rgba(255,255,255,.5)",fontWeight:700}}>Facebook</a> · <a href="https://youtube.com/@saludintegralcl" target="_blank" rel="noreferrer" style={{color:"rgba(255,255,255,.5)",fontWeight:700}}>YouTube</a></p>
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
            ["Contacto",[<span key="t"><Phone size={10} style={{verticalAlign:"middle",marginRight:3}}/>+56 2 2900 0000</span>,<span key="e"><Mail size={10} style={{verticalAlign:"middle",marginRight:3}}/>hola@saludintegral.cl</span>]]
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
          <div style={{display:"flex",gap:9}}>{["🔒 SSL","✅ WebPay","🏥 Médico Habilitado"].map(t=><span key={t} style={{fontSize:10,background:"rgba(255,255,255,.07)",padding:"3px 8px",borderRadius:5,fontWeight:700}}>{t}</span>)}</div>
        </div>
      </div>
    </footer>
  </div>
  )}

  {/* ══ LABS ═══════════════════════════════════════════════════ */}
  {view==="labs"&&(
  <div className="fade" style={{padding:"34px 20px"}}>
    <div className="sec">
      <h2 style={{fontFamily:"Fraunces,serif",fontSize:24,fontWeight:700,marginBottom:4}}>Laboratorios cercanos</h2>
      <p style={{color:"#4A6380",fontSize:13,marginBottom:20}}>Presenta tu orden médica en cualquiera de estos centros.</p>
      {!userLoc?(
        <div style={{background:"linear-gradient(135deg,#EBF3FB,#E8F5EE)",border:"1px solid #BBCFE8",borderRadius:11,padding:"14px 18px",marginBottom:18,display:"flex",alignItems:"center",justifyContent:"space-between",gap:11,flexWrap:"wrap"}}>
          <div><div style={{fontWeight:700,fontSize:14,marginBottom:2}}>📍 Activa tu ubicación</div><div style={{fontSize:12,color:"#4A6380"}}>Para mostrarte los laboratorios más cercanos a ti.</div></div>
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
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selLab.addr)}`} target="_blank" rel="noreferrer" style={{display:"block",background:"#1A7F64",color:"white",padding:"8px",borderRadius:9,fontSize:13,fontWeight:700,textAlign:"center"}}>Abrir en Google Maps ↗</a>
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
      {promoOn&&<div className="fade" style={{background:"#EBF3FB",border:"1.5px solid #BBCFE8",borderRadius:10,padding:"11px 14px",marginBottom:18,fontSize:13,fontWeight:600,color:"#0B3D6B"}}>🎁 50% OFF activado — se aplica al finalizar la compra</div>}
      <div style={{display:"flex",gap:8,marginBottom:20,overflowX:"auto",paddingBottom:4}}>
        {EXAM_CATS.map((c,i)=><button key={c.cat} className={`cat-pill ${activeCat===i?"on":"off"}`} onClick={()=>setActiveCat(i)}>{c.cat}</button>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(265px,1fr))",gap:8}}>
        {EXAM_CATS[activeCat].items.map(ex=>(
          <div key={ex.id} className={`er ${has(ex.id)?"in":""}`}>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:2}}>
                <span style={{fontSize:13,fontWeight:600}}>{ex.name}</span>
                {ex.top&&<span className="tg" style={{background:"#E8F5EE",color:"#1A7F64",border:"1px solid #B2DFCC"}}>TOP</span>}
              </div>
              <div style={{fontSize:11,color:"#8AA3BA",marginBottom:2}}>{ex.desc}</div>
              <div style={{fontSize:13,fontWeight:700,color:"#1565C0"}}>{fmt(ex.price)}</div>
            </div>
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
      <p style={{color:"#4A6380",fontSize:13,marginBottom:20}}>Packs completos diseñados por médicos. Ahorro garantizado.</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:15}}>
        {KITS.map(k=>(
          <div key={k.id} className="kc">
            <div style={{padding:"16px 16px 0"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:9}}>
                <span className="tg" style={{background:k.bc+"18",color:k.bc,border:`1px solid ${k.bc}30`}}>{k.badge}</span>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:10,color:"#8AA3BA",textDecoration:"line-through"}}>{fmt(k.orig)}</div>
                  <div style={{fontSize:18,fontWeight:800,color:"#1565C0"}}>{fmt(k.price)}</div>
                  <div style={{fontSize:9,background:"#E8F5EE",color:"#1A7F64",padding:"1px 5px",borderRadius:4,fontWeight:700}}>Ahorras {fmt(k.orig-k.price)}</div>
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

  {/* ══ SUSCRIPCIÓN ════════════════════════════════════════════ */}
  {view==="suscripcion"&&(
  <div className="fade" style={{maxWidth:800,margin:"34px auto",padding:"0 20px"}}>
    <div style={{textAlign:"center",marginBottom:32}}>
      <h2 style={{fontFamily:"Fraunces,serif",fontSize:24,fontWeight:700,marginBottom:6}}>Planes de Suscripción</h2>
      <p style={{color:"#4A6380",fontSize:14}}>40% de descuento permanente. Salud continua.</p>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:15}}>
      {SUBS.map(p=>(
        <div key={p.name} style={{background:"white",border:`2px solid ${p.best?p.color:"#E8EEF6"}`,borderRadius:15,padding:"20px",position:"relative",boxShadow:p.best?`0 6px 22px ${p.color}22`:"none"}}>
          {p.best&&<div style={{position:"absolute",top:-11,left:"50%",transform:"translateX(-50%)",background:"#F59E0B",color:"white",padding:"3px 12px",borderRadius:100,fontSize:11,fontWeight:800,whiteSpace:"nowrap"}}>⭐ Más popular</div>}
          <div style={{fontSize:10,background:"#FEF3C7",color:"#92400E",padding:"2px 9px",borderRadius:100,fontWeight:800,display:"inline-block",marginBottom:10}}>40% OFF</div>
          <h3 style={{fontSize:14,fontWeight:700,marginBottom:4}}>{p.name}</h3>
          <div style={{display:"flex",alignItems:"baseline",gap:6,marginBottom:4}}>
            <div style={{fontFamily:"Fraunces,serif",fontSize:26,fontWeight:700,color:p.color}}>{fmt(p.price)}<span style={{fontSize:11,fontWeight:400,color:"#8AA3BA"}}>/mes</span></div>
          </div>
          <div style={{fontSize:11,color:"#8AA3BA",textDecoration:"line-through",marginBottom:14}}>Precio normal: {fmt(p.orig)}</div>
          <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:16}}>
            {p.ft.map(f=><div key={f} style={{display:"flex",alignItems:"center",gap:7}}><Check size={10} color={p.color}/><span style={{fontSize:12,color:"#4A6380"}}>{f}</span></div>)}
          </div>
          <button className="btn" style={{width:"100%",padding:"9px",borderRadius:9,border:`1.5px solid ${p.color}`,background:"transparent",color:p.color,fontSize:13,fontWeight:700}}>Suscribirme</button>
        </div>
      ))}
    </div>
  </div>
  )}

  {/* ══ INTERPRETACIÓN ════════════════════════════════════════= */}
  {view==="interpretacion"&&(
  <div className="fade" style={{maxWidth:680,margin:"34px auto",padding:"0 20px"}}>
    <h2 style={{fontFamily:"Fraunces,serif",fontSize:24,fontWeight:700,marginBottom:4}}>Interpretación Profesional</h2>
    <p style={{color:"#4A6380",fontSize:13,marginBottom:22}}>Un médico revisa tus resultados y te envía un informe por correo en menos de 24h.</p>
    <div style={{background:"#FEF3C7",border:"1px solid #F59E0B",borderRadius:10,padding:"12px 14px",marginBottom:20,display:"flex",gap:10,alignItems:"flex-start"}}>
      <AlertCircle size={16} color="#D97706" style={{flexShrink:0,marginTop:1}}/>
      <div style={{fontSize:13,color:"#92400E"}}><strong>Si tus resultados muestran valores muy alterados,</strong> el informe médico indicará si requieres atención presencial urgente.</div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:20}}>
      {[["📤","Sube resultados","PDF o imagen"],["🤖","IA pre-analiza","Detecta valores fuera de rango"],["👨‍⚕️","Médico valida","Redacta y firma"],["📧","Recibes por email","En <24h con recomendaciones"]].map(([ic,t,d])=>(
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
          <div><div style={{fontSize:13,fontWeight:700}}>Informe médico profesional</div><div style={{fontSize:11,color:"#4A6380"}}>Revisión + firma + indicación de derivación si necesario</div></div>
          <div style={{fontSize:19,fontWeight:800,color:"#1565C0"}}>$9.990</div>
        </div>
        <button className="btn bg" style={{padding:"12px",fontSize:13}}>📧 Solicitar informe — $9.990</button>
      </div>
    </div>
  </div>
  )}

  {/* ══ CERTIFICADOS ═══════════════════════════════════════════ */}
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

  {/* ══ EMPRESAS ═══════════════════════════════════════════════ */}
  {view==="empresas"&&(
  <div className="fade" style={{maxWidth:680,margin:"34px auto",padding:"0 20px",textAlign:"center"}}>
    <h2 style={{fontFamily:"Fraunces,serif",fontSize:24,fontWeight:700,marginBottom:9}}>SaludIntegral para Empresas</h2>
    <p style={{color:"#4A6380",fontSize:14,lineHeight:1.7,marginBottom:24,maxWidth:460,margin:"0 auto 24px"}}>Beneficios de salud preventiva para tu equipo. Facturación centralizada, reportes y descuentos por volumen.</p>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:22}}>
      {[["🏢","Gestión centralizada","Panel para todos tus colaboradores"],["💰","Factura empresa","Un documento para RRHH"],["📊","Reportes de salud","Analítica de bienestar del equipo"]].map(([ic,t,d])=>(
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

  {/* ══ CHECKOUT ═══════════════════════════════════════════════ */}
  {view==="checkout"&&(
  <div className="fade" style={{maxWidth:560,margin:"34px auto",padding:"0 20px"}}>
    {!orderDone?(
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
          <input className="fi" type="email" placeholder="Correo electrónico *" value={pat.email} onChange={e=>setPat(p=>({...p,email:e.target.value}))}/>
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
        <button onClick={()=>{if(!pat.nombre||!pat.rut||!pat.email)return;setOrderDone(true);}}
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
          <button className="btn bb" onClick={()=>{go("examenes");setOrderDone(false);}}>Nuevo examen</button>
          <button className="btn bg" onClick={()=>go("interpretacion")}>Subir resultados</button>
        </div>
      </div>
    )}
  </div>
  )}
  </div>
  );
