import { useState, useEffect, useMemo } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTES
// ─────────────────────────────────────────────────────────────────────────────
const STOCK_MINIMO = 100;
const CANALES = ["MercadoLibre","Instagram","WhatsApp","Tienda web","En persona","Feria"];
const ESTADOS = ["Pendiente","En producción","Listo","Enviado","Entregado","Cancelado"];
const ESTADO_COLOR = {
  "Pendiente":"#a07000","En producción":"#1a6b8a","Listo":"#4b7d0b",
  "Enviado":"#6644aa","Entregado":"#2a7a2a","Cancelado":"#cc4444"
};
const BIZ_KEYS = {
  recetas:"lb_recetas",insumos:"lb_insumos",productos:"lb_productos",
  ventas:"lb_ventas",proveedores:"lb_proveedores",
};
const DB_KEY    = "lenga_fil_db";
const MOV_KEY   = "lenga_fil_mov";
const MAEST_KEY = "lenga_maestros";
const LOGO_SRC  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAj8AAADmCAYAAAA6AuT5AAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAACTYklEQVR4nO2dd3xUVdr4n5n0gPr6ru7rrv4ooUPoRTooiChFiigKCtJXyloRUddVYVUUrCgiKtIURFEEBZbeCVV6hwCBJCSkTb3t+f0Rn5NzbyYzd2bukAHO9/OZDyGZuXPuuac856k2EAiuYzp16oRNmzaFTp06QcOGDeF//ud/AADAZrNBTEwMaJrm9/NxcXFw4cIF2L9/P6xcuRJ+/fVXOHPmjO0qNF0gEAgEAoHAPC+88AL+8ccfKMsy8iiKgl6vFyVJQkVRAr68Xi8iou7fL7/8EuvUqYPlfY8CgUAgEAhucGrXro0ff/wxnj9/HiVJQlVV0e12o9PpRKfTiR6PB1VVZYKQpmmmXiT4SJKEly9fRkTEzMxMfP/994UAJBAIBAKB4OpTq1Yt/PzzzzEvL08n3BQUFKARTdNQlmWUJIkJSP5eJPgUFBRgYWEhIiLKsoxXrlxBRMRDhw5hp06dhBAkEAgEAoHg6jB27Fg8c+YMIiLm5ORgYWEhyrKMLpeLmalkWUZVVVFRFJRlGWVZRk3TmBnM34tHVVUsKipiny0qKmIC1fDhw4UAJBAIBAKBIHI0a9YMV69ejaqqotPp1AkqJOAoioKapjEtjtH3h8xg/l4ejwcLCwvR7XaX0iKpqoq5ubnMr2jSpElCABIIBAKBQGA9zzzzDPO9UVUVHQ4HulwunamKd3Qm3x+Xy4WSJDHNDS8YlfXiBSoSsNxuNzocDvY3j8eDTqcTVVXFd999VwhAAoFAIBAIrGPBggVMcHE6ncwnh4QSVVVR0zSUJImZvYzmKxJ6NE0LaPaSZZldgz7HCz1Gp2iXy4Uvv/yyEIAEAoFAIBCER/PmzXH79u2IWOx8TH484b5IM0TCDa8tUhTFtGbI4/EwIamoqEg4QQsEAoFAIAidjh07YkZGBiqKghcvXmQaFiuEH8r3Q1ogr9eLXq9XJxj5e2maxkxgFEmGiLhu3Toh/AgEAoFAIAiefv36sZB1Ml8VFBQwLU24wg+Zrnj4qLBAn6f3kYmNN4H9+9//FgKQQCAQCAQC84wePVrnXOxyuViuHUQ0lafHjNmKBBa3263T+phxiDaaviRJQpfLhYqiYF5eHqampgoBSCAQCAQCQWCGDBmC2dnZTLDgc/eQIGRGOCGHZOPv+fIVRn+fYIQrRNSFwZOgRn+fOnWqEH4EAoFAIBD4p3v37iyBoMvlQo/Ho3NEJu2MGYdkvkyFUfChz5OWx+12Y1FREbrdbtNmL9L48D5C1F6Px4OnTp0Swo9AIBAIBIKyadq0KV65cgVVVWWaHkmSmHbF6/Wy35tJUhhI+OELnBqLoFLovL8X+SHxeYD4pIiyLOPgwYOFACQQCARRhK28GyAQENWrV8fffvsNatSoAU6nEypUqACyLENcXBwAAHg8HoiPjwe73Q6yLENMTEzAa9psJUMcEXX/AgCoqgpHjx6FtLQ0uHTpEvz1r3+FJk2aQO3ateGmm24CTdP8Xl/TNIiJiQGbzQaKooDX64UKFSqAx+MBTdMgOTkZFi9eDP369RNzTSAQCAQCgZ4VK1bofGjIvBXOi3x5KAIrPz+faXh2796N3bp186mVGTRoEPsMOUKTtok+b8YnSNM0vHjxotD8CAQCgUAg0PPJJ5+wEHY+fDxc4cfpdDLhh0Lm8/Ly8MMPPwwokPTt25d9nne2JApp.js--LOGO_TRUNCATED--iVBORw0KGgoAAAANSUhEUgAAAj8AAADmCAYAAAA6AuT5...mm3k/bxajcHQKPweAUr8j4SwzMxOOHDkC+/fvhz179kBaWhocPXpUrMcCwVVCTDaBQHDN0L59e2zUqBE0a9YMqlWrBvXq1YPk5GTm62MUWKgulpkCpWZD7fnfybIMsbGxTKjh/ZKozpaiKJCTkwN79+6FrVu3wsGDB+HEiRNw5MgRsf4KBOWEmHwCgeCa5u6778YaNWpA9erVoWbNmlC5cmX4y1/+AhUrVoTbbrutVAQZ4SvM3vhzWdoh3ieIIteKioogPz8fsrOzISMjA7Kzs2Hfvn1w4MAB2LFjh1hrBYIo4v8DcU6H+Y8UXBMAAAAASUVORK5CYII=";

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function uid() { return Math.random().toString(36).slice(2)+Date.now().toString(36); }
function fmtG(n) { return String(parseFloat(n.toFixed(1))).replace(".",","); }
function fmtARS(n) { return "$"+Math.round(n).toLocaleString("es-AR"); }
function loadLS(key,def) { try{const v=localStorage.getItem(key);return v?JSON.parse(v):def;}catch{return def;} }
function saveLS(key,val) { try{localStorage.setItem(key,JSON.stringify(val));}catch{} }
function parsePosicion(pos) {
  if(!pos) return null;
  const parts=pos.trim().split(/\s+/);
  if(parts.length<2) return {prefix:pos,nums:[]};
  return {prefix:parts[0],nums:parts.slice(1)};
}
function PosicionBadge({posicion,estante}) {
  const EC={"Estante Alto":"#4b7d0b","Estante Medio":"#a07000","Estante Bajo":"#1a6b8a"};
  const ec=EC[estante]||"#555";
  const p=parsePosicion(posicion);
  if(!p) return null;
  return (
    <div style={{display:"flex",flexWrap:"wrap",gap:3,alignItems:"center"}}>
      {estante&&<span style={{fontSize:10,padding:"2px 7px",borderRadius:4,background:`${ec}18`,border:`1px solid ${ec}40`,color:ec,fontWeight:700,letterSpacing:".04em"}}>{estante.replace("Estante ","")}</span>}
      {p.prefix&&<span style={{fontSize:10,padding:"2px 7px",borderRadius:4,background:"#1a1a1a",border:"1px solid #2a2a2a",color:"#888",fontWeight:700,letterSpacing:".04em"}}>{p.prefix}</span>}
      {p.nums.map(n=><span key={n} style={{fontSize:10,padding:"2px 6px",borderRadius:4,background:"#111",border:"1px solid #252525",color:"#666",fontWeight:600}}>{n}</span>)}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CSS GLOBAL
// ─────────────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{zoom:1.25;} body{background:#0d0d0d;font-family:'Montserrat',sans-serif;}
  input,select,textarea{outline:none;-webkit-appearance:none;appearance:none;font-family:'Montserrat',sans-serif;}
  input:focus,select:focus{border-color:#4b7d0b!important;}
  .tab{background:none;border:none;border-bottom:2px solid transparent;padding:10px 14px;font-size:12px;font-weight:600;color:#444;cursor:pointer;letter-spacing:.06em;font-family:Montserrat,sans-serif;transition:color .15s,border-color .15s;white-space:nowrap;}
  .tab.on{color:#4b7d0b;border-bottom-color:#4b7d0b;}
  .tab:hover{color:#8ab840;}
  .card{background:#111;border:1px solid #1c1c1c;border-radius:12px;}
  .inp{background:#0d0d0d;border:1px solid #222;border-radius:8px;padding:9px 12px;font-size:13px;color:#e0e0e0;width:100%;}
  .sel{background:#0d0d0d;border:1px solid #222;border-radius:8px;padding:9px 12px;font-size:13px;color:#e0e0e0;width:100%;cursor:pointer;}
  .lbl{font-size:11px;color:#444;margin-bottom:6px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;}
  .btn{background:#4b7d0b;color:#fff;border:none;border-radius:8px;padding:10px 18px;font-size:12px;font-weight:700;cursor:pointer;letter-spacing:.06em;font-family:Montserrat,sans-serif;transition:background .15s;}
  .btn:hover{background:#5c9a0e;}
  .btn-ghost{background:none;color:#555;border:1px solid #333;border-radius:8px;padding:10px 18px;font-size:12px;font-weight:600;cursor:pointer;font-family:Montserrat,sans-serif;transition:color .15s;}
  .btn-ghost:hover{color:#aaa;}
  .btn-add{background:none;border:1px solid #2a2a2a;border-radius:6px;padding:6px 12px;font-size:12px;color:#4b7d0b;cursor:pointer;font-family:Montserrat,sans-serif;font-weight:600;transition:background .15s;}
  .btn-add:hover{background:#4b7d0b18;}
  .btn-icon{background:none;border:none;cursor:pointer;font-size:14px;padding:4px 6px;font-family:Montserrat,sans-serif;}
  .btn-danger{background:#cc4444;}.btn-danger:hover{background:#dd5555;}
  .section-title{font-size:14px;color:#e0e0e0;font-weight:700;letter-spacing:.04em;margin-bottom:20px;}
  .modal-bg{position:fixed;inset:0;background:#00000099;display:flex;align-items:center;justify-content:center;z-index:1000;padding:20px;}
  .modal-overlay{position:fixed;inset:0;background:#00000099;display:flex;align-items:center;justify-content:center;z-index:1000;padding:20px;}
  .modal{background:#141414;border:1px solid #252525;border-radius:16px;padding:28px;width:100%;max-width:560px;max-height:90vh;overflow-y:auto;}
  .sort-th{display:flex;align-items:center;user-select:none;}
  @media(max-width:700px){
    .charts-grid{grid-template-columns:1fr!important;}
    .stats-grid{grid-template-columns:1fr 1fr!important;}
    .header-inner{flex-direction:column;align-items:flex-start!important;}
    .tabs-row{overflow-x:auto;width:100%;}
    .desktop-row{display:none!important;}
    .mobile-card{display:block!important;}
    .mobile-sort-bar{display:flex!important;}
    .ajuste-grid{grid-template-columns:1fr!important;}
    .form-grid{grid-template-columns:1fr!important;}
    .grid-2{grid-template-columns:1fr!important;}
    .grid-3{grid-template-columns:1fr!important;}
    .grid-4{grid-template-columns:1fr 1fr!important;}
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// MAESTROS DEFAULT & STOCK INICIAL
// ─────────────────────────────────────────────────────────────────────────────
const MAESTROS_DEFAULT = {
  materiales:["PLA","PETG","ABS","TPU","ASA","Support","Resina"],
  tipos:["Normal","Traslucido","Wood","Metal","ART","Fluo","Flex","Boutique"],
  marcas:["Grilon3","Printalot","Bambu Lab","IIID MAX","Ender","Elegoo","Polymaker","eSUN"],
  colores:["Amarillo","Ambar","Arrayan","Blanco","Blanco Calido","Bordo","Caliza","Cobre","Dorado","Dulce de Leche","Gris","Marron","Nafta Super","Naranja","Natural","Negro","Piedra","Piel 720","Pino","Tan","Verde","Verde Militar"],
  estantes:["Estante Alto","Estante Medio","Estante Bajo"],
  posiciones:["AD 1","AD 2","AD 3","AD 4","AD 5","AD 6","AD 7","AD 8","AD 9","AD 10","AT 1","AT 2","AT 3","AT 4","AT 5","AT 6","AT 7","AT 8","AT 9","AT 10","AT 1 2","AT 2 3","AT 3 4","AT 5 6","AT 6 7","AT 7 8","AT 8 9","AT 7 8 9","AT 2 3 4","AD 1 2 3","AD 6 7"],
  bobinas:[
    {marca:"Grilon3",pesoBobina:217.5},{marca:"PrintaLot - Plastico",pesoBobina:155},
    {marca:"PrintaLot - Carton",pesoBobina:200},{marca:"IIID MAX",pesoBobina:142.3},{marca:"Bambu Lab",pesoBobina:216},
  ],
};

const STOCK_INICIAL = [
  {material:"PLA",tipo:"Normal",marca:"Grilon3",color:"Amarillo",stockGramos:561.5,precioUltimo:15000,pesoUnitario:1000,estante:"Estante Bajo",posicion:"AD 5"},
  {material:"PLA",tipo:"Traslucido",marca:"Printalot",color:"Ambar",stockGramos:1000,precioUltimo:15000,pesoUnitario:1000,estante:"Estante Alto",posicion:"AT 5"},
  {material:"PLA",tipo:"Traslucido",marca:"Printalot",color:"Ambar",stockGramos:673,precioUltimo:15000,pesoUnitario:1000,estante:"Estante Alto",posicion:"AT 6"},
  {material:"PLA",tipo:"Wood",marca:"Printalot",color:"Arrayan",stockGramos:882,precioUltimo:18000,pesoUnitario:1000,estante:"Estante Alto",posicion:"AD 5"},
  {material:"PLA",tipo:"Normal",marca:"IIID MAX",color:"Blanco",stockGramos:29.7,precioUltimo:15000,pesoUnitario:1000,estante:"Estante Bajo",posicion:"AT 7"},
  {material:"PLA",tipo:"Normal",marca:"Printalot",color:"Blanco Calido",stockGramos:1000,precioUltimo:15000,pesoUnitario:1000,estante:"Estante Bajo",posicion:"AD 1"},
  {material:"PLA",tipo:"Normal",marca:"Printalot",color:"Blanco Calido",stockGramos:1000,precioUltimo:15000,pesoUnitario:1000,estante:"Estante Bajo",posicion:"AD 2"},
  {material:"PLA",tipo:"Normal",marca:"Printalot",color:"Blanco Calido",stockGramos:140,precioUltimo:15000,pesoUnitario:1000,estante:"Estante Bajo",posicion:"AD 3"},
  {material:"PLA",tipo:"Normal",marca:"Grilon3",color:"Bordo",stockGramos:363.9,precioUltimo:15000,pesoUnitario:1000,estante:"Estante Bajo",posicion:"AD 6"},
  {material:"PLA",tipo:"ART",marca:"Printalot",color:"Caliza",stockGramos:515,precioUltimo:18000,pesoUnitario:1000,estante:"Estante Alto",posicion:"AT 10"},
  {material:"PLA",tipo:"Metal",marca:"Printalot",color:"Cobre",stockGramos:230,precioUltimo:18000,pesoUnitario:1000,estante:"Estante Alto",posicion:"AD 8"},
  {material:"PLA",tipo:"Metal",marca:"Printalot",color:"Dorado",stockGramos:188,precioUltimo:18000,pesoUnitario:1000,estante:"Estante Alto",posicion:"AD 3"},
  {material:"PLA",tipo:"Boutique",marca:"Grilon3",color:"Dulce de Leche",stockGramos:77.5,precioUltimo:20000,pesoUnitario:1000,estante:"Estante Bajo",posicion:"AD 7"},
  {material:"PLA",tipo:"Normal",marca:"Ender",color:"Gris",stockGramos:1000,precioUltimo:15000,pesoUnitario:1000,estante:"Estante Alto",posicion:"AD 1"},
  {material:"PETG",tipo:"Normal",marca:"Printalot",color:"Gris",stockGramos:66,precioUltimo:18000,pesoUnitario:1000,estante:"Estante Bajo",posicion:"AT 3"},
  {material:"PLA",tipo:"Normal",marca:"IIID MAX",color:"Marron",stockGramos:532.7,precioUltimo:15000,pesoUnitario:1000,estante:"Estante Bajo",posicion:"AD 8"},
  {material:"PLA",tipo:"Normal",marca:"Printalot",color:"Nafta Super",stockGramos:511,precioUltimo:15000,pesoUnitario:1000,estante:"Estante Alto",posicion:"AD 4"},
  {material:"PLA",tipo:"Fluo",marca:"Printalot",color:"Naranja",stockGramos:65,precioUltimo:16000,pesoUnitario:1000,estante:"Estante Bajo",posicion:"AD 4"},
  {material:"PLA",tipo:"Traslucido",marca:"Printalot",color:"Natural",stockGramos:1000,precioUltimo:15000,pesoUnitario:1000,estante:"Estante Alto",posicion:"AT 2"},
  {material:"PLA",tipo:"Traslucido",marca:"Printalot",color:"Natural",stockGramos:1000,precioUltimo:15000,pesoUnitario:1000,estante:"Estante Alto",posicion:"AT 3"},
  {material:"PLA",tipo:"Traslucido",marca:"Printalot",color:"Natural",stockGramos:683,precioUltimo:15000,pesoUnitario:1000,estante:"Estante Alto",posicion:"AT 4"},
  {material:"PLA",tipo:"Traslucido",marca:"Grilon3",color:"Natural",stockGramos:303.5,precioUltimo:15000,pesoUnitario:1000,estante:"Estante Alto",posicion:"AT 1"},
  {material:"Support",tipo:"Traslucido",marca:"Bambu Lab",color:"Natural",stockGramos:257,precioUltimo:20000,pesoUnitario:1000,estante:"Estante Bajo",posicion:"AT 2"},
  {material:"PLA",tipo:"Normal",marca:"Printalot",color:"Negro",stockGramos:222,precioUltimo:15000,pesoUnitario:1000,estante:"Estante Bajo",posicion:"AT 8"},
  {material:"ABS",tipo:"Normal",marca:"Grilon3",color:"Negro",stockGramos:238.5,precioUltimo:16000,pesoUnitario:1000,estante:"Estante Bajo",posicion:"AT 4"},
  {material:"PLA",tipo:"Flex",marca:"Printalot",color:"Negro",stockGramos:922,precioUltimo:20000,pesoUnitario:1000,estante:"Estante Bajo",posicion:"AT 1"},
  {material:"PETG",tipo:"Normal",marca:"Printalot",color:"Negro",stockGramos:67,precioUltimo:18000,pesoUnitario:1000,estante:"Estante Bajo",posicion:"AT 5"},
  {material:"PETG",tipo:"Normal",marca:"Grilon3",color:"Negro",stockGramos:78.5,precioUltimo:18000,pesoUnitario:1000,estante:"Estante Medio",posicion:"AT 2"},
  {material:"PLA",tipo:"ART",marca:"Printalot",color:"Piedra",stockGramos:1000,precioUltimo:18000,pesoUnitario:1000,estante:"Estante Alto",posicion:"AT 7"},
  {material:"PLA",tipo:"ART",marca:"Printalot",color:"Piedra",stockGramos:582.5,precioUltimo:18000,pesoUnitario:1000,estante:"Estante Alto",posicion:"AT 8"},
  {material:"PLA",tipo:"Normal",marca:"Grilon3",color:"Piel 720",stockGramos:828.5,precioUltimo:15000,pesoUnitario:1000,estante:"Estante Alto",posicion:"AD 9"},
  {material:"PLA",tipo:"Wood",marca:"Grilon3",color:"Pino",stockGramos:328.5,precioUltimo:18000,pesoUnitario:1000,estante:"Estante Alto",posicion:"AD 6"},
  {material:"PLA",tipo:"Wood",marca:"Bambu Lab",color:"Pino",stockGramos:112,precioUltimo:18000,pesoUnitario:1000,estante:"Estante Alto",posicion:"AD 7"},
  {material:"PLA",tipo:"Normal",marca:"Printalot",color:"Tan",stockGramos:686,precioUltimo:15000,pesoUnitario:1000,estante:"Estante Alto",posicion:"AD 10"},
  {material:"PLA",tipo:"Normal",marca:"Bambu Lab",color:"Verde",stockGramos:72,precioUltimo:15000,pesoUnitario:1000,estante:"Estante Bajo",posicion:"AT 6"},
  {material:"PLA",tipo:"Metal",marca:"Printalot",color:"Verde Militar",stockGramos:956,precioUltimo:18000,pesoUnitario:1000,estante:"Estante Alto",posicion:"AD 2"},
].map((f,i)=>({...f,key:`fil_${i}_${f.material}_${f.color}`.toLowerCase().replace(/\s/g,"_")}));

// ═════════════════════════════════════════════════════════════════════════════
// HUB — PANTALLA DE INICIO
// ═════════════════════════════════════════════════════════════════════════════
function HomeHub({onSelect}) {
  const cards = [
    {
      id:"lenga",label:"Lenga",
      desc:"Gestión de stock de filamento, producción, ventas y negocios",
      color:"#4b7d0b",colorBg:"#4b7d0b18",colorBorder:"#4b7d0b44",
      logo:<img src={LOGO_SRC} alt="Lenga" style={{height:52,objectFit:"contain"}}/>,
    },
    {
      id:"wuly",label:"Wuly",
      desc:"Gestión y operaciones del proyecto Wuly",
      color:"#F5B800",colorBg:"#F5B80018",colorBorder:"#F5B80044",
      logo:(
        <span style={{fontSize:44,fontWeight:900,fontFamily:"'Arial Rounded MT Bold',Arial,sans-serif",color:"#F5B800",
          textShadow:"-2px -2px 0 #000,2px -2px 0 #000,-2px 2px 0 #000,2px 2px 0 #000,-3px 0 0 #000,3px 0 0 #000,0 -3px 0 #000,0 3px 0 #000",
          letterSpacing:"-1px",lineHeight:1}}>wuly</span>
      ),
    },
    {
      id:"granja",label:"Gestión de Granja",
      desc:"Control y administración de la granja",
      color:"#c8882a",colorBg:"#c8882a18",colorBorder:"#c8882a44",
      logo:<span style={{fontSize:52,lineHeight:1}}>🌾</span>,
    },
  ];
  return (
    <div style={{minHeight:"100vh",background:"#0d0d0d",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:"'Montserrat',sans-serif",padding:"40px 20px"}}>
      <style>{CSS}</style>
      <div style={{marginBottom:48,textAlign:"center"}}>
        <div style={{fontSize:11,letterSpacing:"0.25em",color:"#333",fontWeight:700,textTransform:"uppercase",marginBottom:10}}>Panel de control</div>
        <div style={{fontSize:28,fontWeight:800,color:"#e0e0e0",letterSpacing:"-0.02em"}}>Mis Proyectos</div>
      </div>
      <div style={{display:"flex",gap:20,flexWrap:"wrap",justifyContent:"center",maxWidth:900}}>
        {cards.map(card=>(
          <button key={card.id} onClick={()=>onSelect(card.id)}
            style={{background:"#111",border:`1px solid ${card.colorBorder}`,borderRadius:20,padding:"32px 28px",width:240,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:16,transition:"transform 0.15s,box-shadow 0.15s,background 0.15s"}}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.background=card.colorBg;e.currentTarget.style.boxShadow=`0 8px 32px ${card.color}30`;}}
            onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.background="#111";e.currentTarget.style.boxShadow="none";}}>
            <div style={{height:64,display:"flex",alignItems:"center",justifyContent:"center"}}>{card.logo}</div>
            <div style={{fontSize:16,fontWeight:800,color:card.color,letterSpacing:"0.04em"}}>{card.label}</div>
            <div style={{fontSize:11,color:"#555",fontWeight:500,textAlign:"center",lineHeight:1.5}}>{card.desc}</div>
            <div style={{marginTop:4,fontSize:18,color:card.color,opacity:0.6}}>→</div>
          </button>
        ))}
      </div>
      <div style={{marginTop:60,fontSize:10,color:"#222",letterSpacing:"0.15em",fontWeight:600,textTransform:"uppercase"}}>Sistema de gestión</div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// PLACEHOLDER — WULY
// ═════════════════════════════════════════════════════════════════════════════
function AppWuly({onBack}) {
  const BtnBack = ()=>(
    <button onClick={onBack} style={{background:"none",border:"1px solid #252525",borderRadius:8,padding:"6px 14px",color:"#555",cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:"Montserrat,sans-serif",letterSpacing:".06em"}}
      onMouseEnter={e=>{e.currentTarget.style.color="#F5B800";e.currentTarget.style.borderColor="#F5B80044";}}
      onMouseLeave={e=>{e.currentTarget.style.color="#555";e.currentTarget.style.borderColor="#252525";}}>
      ← Inicio
    </button>
  );
  return (
    <div style={{minHeight:"100vh",background:"#0d0d0d",fontFamily:"'Montserrat',sans-serif",color:"#fff"}}>
      <style>{CSS}</style>
      <div style={{borderBottom:"1px solid #1a1a1a",padding:"16px 24px",display:"flex",alignItems:"center",gap:16}}>
        <BtnBack/>
        <span style={{fontSize:34,fontWeight:900,fontFamily:"'Arial Rounded MT Bold',Arial,sans-serif",color:"#F5B800",
          textShadow:"-2px -2px 0 #000,2px -2px 0 #000,-2px 2px 0 #000,2px 2px 0 #000",letterSpacing:"-1px",lineHeight:1}}>wuly</span>
      </div>
      <div style={{maxWidth:800,margin:"0 auto",padding:"80px 24px",display:"flex",flexDirection:"column",alignItems:"center",gap:24,textAlign:"center"}}>
        <div style={{fontSize:64}}>🟡</div>
        <div style={{fontSize:22,fontWeight:800,color:"#F5B800",letterSpacing:"-0.02em"}}>Proyecto Wuly</div>
        <div style={{fontSize:13,color:"#444",fontWeight:500,maxWidth:400,lineHeight:1.7}}>
          Esta sección está lista para desarrollarse. Contame qué necesitás gestionar en Wuly y lo construimos juntos.
        </div>
        <div style={{background:"#F5B80010",border:"1px dashed #F5B80040",borderRadius:12,padding:"18px 32px",fontSize:12,color:"#F5B80088",fontWeight:700,letterSpacing:".08em",textTransform:"uppercase"}}>
          En construcción
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// PLACEHOLDER — GESTIÓN DE GRANJA
// ═════════════════════════════════════════════════════════════════════════════
function AppGranja({onBack}) {
  const BtnBack = ()=>(
    <button onClick={onBack} style={{background:"none",border:"1px solid #252525",borderRadius:8,padding:"6px 14px",color:"#555",cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:"Montserrat,sans-serif",letterSpacing:".06em"}}
      onMouseEnter={e=>{e.currentTarget.style.color="#c8882a";e.currentTarget.style.borderColor="#c8882a44";}}
      onMouseLeave={e=>{e.currentTarget.style.color="#555";e.currentTarget.style.borderColor="#252525";}}>
      ← Inicio
    </button>
  );
  return (
    <div style={{minHeight:"100vh",background:"#0d0d0d",fontFamily:"'Montserrat',sans-serif",color:"#fff"}}>
      <style>{CSS}</style>
      <div style={{borderBottom:"1px solid #1a1a1a",padding:"16px 24px",display:"flex",alignItems:"center",gap:14}}>
        <BtnBack/>
        <span style={{fontSize:24}}>🌾</span>
        <span style={{fontSize:17,fontWeight:800,color:"#c8882a",letterSpacing:"0.04em"}}>Gestión de Granja</span>
      </div>
      <div style={{maxWidth:800,margin:"0 auto",padding:"80px 24px",display:"flex",flexDirection:"column",alignItems:"center",gap:24,textAlign:"center"}}>
        <div style={{fontSize:64}}>🌾</div>
        <div style={{fontSize:22,fontWeight:800,color:"#c8882a",letterSpacing:"-0.02em"}}>Gestión de Granja</div>
        <div style={{fontSize:13,color:"#444",fontWeight:500,maxWidth:400,lineHeight:1.7}}>
          Esta sección está lista para desarrollarse. Contame qué necesitás gestionar en la granja y lo construimos.
        </div>
        <div style={{background:"#c8882a10",border:"1px dashed #c8882a40",borderRadius:12,padding:"18px 32px",fontSize:12,color:"#c8882a88",fontWeight:700,letterSpacing:".08em",textTransform:"uppercase"}}>
          En construcción
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// APP LENGA — COMPLETA
// ═════════════════════════════════════════════════════════════════════════════
function AppLenga({onBack}) {
  const [tab,setTab]               = useState("dashboard");
  const [filamentos,setFilamentos] = useState([]);
  const [movimientos,setMovs]      = useState([]);
  const [maestros,setMaestros]     = useState(MAESTROS_DEFAULT);
  const [loaded,setLoaded]         = useState(false);
  const [toast,setToast]           = useState(null);
  const [showStockMenu,setShowStockMenu]   = useState(false);
  const [showNegocioMenu,setShowNegocioMenu] = useState(false);
  const [recetas,setRecetas]     = useState(()=>loadLS(BIZ_KEYS.recetas,[]));
  const [insumos,setInsumos]     = useState(()=>loadLS(BIZ_KEYS.insumos,[]));
  const [productos,setProductos] = useState(()=>loadLS(BIZ_KEYS.productos,[]));
  const [ventas,setVentas]       = useState(()=>loadLS(BIZ_KEYS.ventas,[]));
  const [proveedores,setProveedores] = useState(()=>loadLS(BIZ_KEYS.proveedores,[]));

  useEffect(()=>{
    const f=loadLS(DB_KEY,null),m=loadLS(MOV_KEY,[]),ma=loadLS(MAEST_KEY,null);
    const filData=f&&f.length>0?f:STOCK_INICIAL;
    if(!f||f.length===0) saveLS(DB_KEY,STOCK_INICIAL);
    setFilamentos(filData); setMovs(m||[]);
    setMaestros(ma?{...ma,bobinas:ma.bobinas||MAESTROS_DEFAULT.bobinas}:MAESTROS_DEFAULT);
    setLoaded(true);
  },[]);

  const saveFil  = d=>{setFilamentos(d);saveLS(DB_KEY,d);};
  const saveMov  = d=>{setMovs(d);saveLS(MOV_KEY,d);};
  const saveMaes = d=>{setMaestros(d);saveLS(MAEST_KEY,d);};
  const saveBiz  = (key,setter)=>d=>{setter(d);saveLS(key,d);};
  const saveRecetas    = saveBiz(BIZ_KEYS.recetas,setRecetas);
  const saveInsumos    = saveBiz(BIZ_KEYS.insumos,setInsumos);
  const saveProductos  = saveBiz(BIZ_KEYS.productos,setProductos);
  const saveVentas_    = saveBiz(BIZ_KEYS.ventas,setVentas);
  const saveProveedores= saveBiz(BIZ_KEYS.proveedores,setProveedores);
  const toast_ = msg=>{setToast(msg);setTimeout(()=>setToast(null),3000);};

  const handleVenta = venta=>{
    saveVentas_([...ventas,{...venta,id:uid(),fecha:new Date().toISOString()}]);
    if(venta.productoId&&venta.cantidad)
      saveProductos(productos.map(p=>p.id===venta.productoId?{...p,stock:Math.max(0,(p.stock||0)-Number(venta.cantidad))}:p));
    toast_("✓ Venta registrada");
  };
  const handleRename=(lista,oldVal,newVal)=>{
    const fm={materiales:"material",tipos:"tipo",marcas:"marca",colores:"color",estantes:"estante",posiciones:"posicion"};
    const field=fm[lista];
    saveFil(filamentos.map(f=>f[field]===oldVal?{...f,[field]:newVal}:f));
    saveMov(movimientos.map(m=>{const mf=field==="tipo"?"tipo_fil":field;return m[mf]===oldVal?{...m,[mf]:newVal}:m;}));
    saveMaes({...maestros,[lista]:maestros[lista].map(x=>x===oldVal?newVal:x)});
    toast_(`✓ "${oldVal}" → "${newVal}" actualizado`);
  };
  const handlePrecioUpdate=(marca,material,tipo,nuevoPrecio)=>{
    const newFils=filamentos.map(f=>f.marca===marca&&f.material===material&&f.tipo===tipo?{...f,precioUltimo:nuevoPrecio}:f);
    saveFil(newFils);
    toast_(`✓ Precio actualizado a ${fmtARS(nuevoPrecio)}`);
  };
  const handleAjuste=(key,nuevoStockNeto)=>{
    const newFils=filamentos.map(f=>f.key===key?{...f,stockGramos:nuevoStockNeto}:f);
    saveFil(newFils);
    const fil=filamentos.find(f=>f.key===key);
    saveMov([...movimientos,{id:Date.now(),tipo:"ajuste",fecha:new Date().toISOString(),key,material:fil.material,tipo_fil:fil.tipo,marca:fil.marca,color:fil.color,gramos:nuevoStockNeto}]);
    toast_(`✓ Stock de ${fil.color} ${fil.material} actualizado a ${fmtG(nuevoStockNeto)}g`);
  };
  const handleCompra=c=>{
    const key=`fil_${Date.now()}`,pesoTotal=c.pesoUnitario*c.cantidad;
    saveFil([...filamentos,{key,material:c.material,tipo:c.tipo,marca:c.marca,color:c.color,stockGramos:pesoTotal,precioUltimo:c.precio,pesoUnitario:c.pesoUnitario,estante:c.estante,posicion:c.posicion}]);
    saveMov([...movimientos,{id:Date.now(),tipo:"compra",fecha:new Date().toISOString(),key,material:c.material,tipo_fil:c.tipo,marca:c.marca,color:c.color,gramos:pesoTotal,precio:c.precio,cantidad:c.cantidad}]);
    toast_(`✓ ${c.cantidad} bobina${c.cantidad>1?"s":""} de ${c.color} ${c.material} agregada${c.cantidad>1?"s":""}`);
  };
  const handleImpresion=lineas=>{
    const newFils=[...filamentos],newMovs=[...movimientos],id=Date.now();
    lineas.forEach((imp,i)=>{
      const idx=newFils.findIndex(f=>f.key===imp.key);
      if(idx>=0) newFils[idx]={...newFils[idx],stockGramos:Math.max(0,newFils[idx].stockGramos-imp.gramos)};
      const fil=filamentos.find(f=>f.key===imp.key);
      newMovs.push({id:id+i,tipo:"impresion",fecha:new Date().toISOString(),key:imp.key,material:fil.material,tipo_fil:fil.tipo,marca:fil.marca,color:fil.color,gramos:imp.gramos,grupoId:id});
    });
    saveFil(newFils);saveMov(newMovs);
    const total=lineas.reduce((a,l)=>a+l.gramos,0);
    toast_(`✓ Impresión: ${lineas.length} filamento${lineas.length>1?"s":""}, ${fmtG(total)}g en total`);
  };

  if(!loaded) return <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:"#0d0d0d",color:"#4b7d0b",fontFamily:"Montserrat,sans-serif",fontSize:13,letterSpacing:"0.1em",fontWeight:600}}>CARGANDO...</div>;

  return (
    <div style={{minHeight:"100vh",background:"#0d0d0d",color:"#ffffff",fontFamily:"'Montserrat',sans-serif"}}>
      <style>{CSS}</style>
      {toast&&<div style={{position:"fixed",top:16,right:16,background:"#0d1a00",border:"1px solid #4b7d0b55",borderRadius:10,padding:"12px 18px",fontSize:12,color:"#6fb010",zIndex:9999,boxShadow:"0 8px 32px #00000077",maxWidth:340,fontWeight:600}}>{toast}</div>}
      <div style={{maxWidth:1060,margin:"0 auto",padding:"0 20px"}}>
        <div style={{borderBottom:"1px solid #1a1a1a",paddingTop:20}}>
          <div className="header-inner" style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8,paddingBottom:0}}>
            {/* Logo + volver */}
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <button onClick={onBack}
                style={{background:"none",border:"1px solid #1a1a1a",borderRadius:7,padding:"5px 10px",color:"#333",cursor:"pointer",fontSize:11,fontWeight:700,fontFamily:"Montserrat,sans-serif",letterSpacing:".06em",transition:"color .15s,border-color .15s"}}
                onMouseEnter={e=>{e.currentTarget.style.color="#4b7d0b";e.currentTarget.style.borderColor="#4b7d0b44";}}
                onMouseLeave={e=>{e.currentTarget.style.color="#333";e.currentTarget.style.borderColor="#1a1a1a";}}>←</button>
              <img src={LOGO_SRC} alt="Lenga" style={{height:44,objectFit:"contain",marginBottom:4,background:"#0d0d0d",padding:"2px 6px",borderRadius:6}}/>
            </div>
            <div className="tabs-row" style={{display:"flex",alignItems:"flex-end"}}>
              {/* Stock dropdown */}
              <div style={{position:"relative"}}>
                <button className={`tab${["dashboard","compra","impresion","ajuste","historial","maestros"].includes(tab)?" on":""}`}
                  onClick={()=>setShowStockMenu(v=>!v)} style={{display:"flex",alignItems:"center",gap:5}}>
                  Stock de filamento <span style={{fontSize:9,opacity:0.6}}>{showStockMenu?"▲":"▼"}</span>
                </button>
                {showStockMenu&&(
                  <div style={{position:"absolute",top:"100%",left:0,background:"#141414",border:"1px solid #252525",borderRadius:10,zIndex:200,minWidth:180,padding:"6px 0",boxShadow:"0 8px 32px #00000088"}}>
                    {[["dashboard","Dashboard"],["compra","Compra"],["impresion","Impresión"],["ajuste","Ajuste stock"],["historial","Historial"],["maestros","Maestros"]].map(([id,label])=>(
                      <button key={id} onClick={()=>{setTab(id);setShowStockMenu(false);}}
                        style={{display:"block",width:"100%",textAlign:"left",background:tab===id?"#4b7d0b18":"none",border:"none",padding:"9px 18px",fontSize:12,fontWeight:600,color:tab===id?"#4b7d0b":"#666",cursor:"pointer",fontFamily:"Montserrat,sans-serif",letterSpacing:".06em",transition:"background .15s"}}
                        onMouseEnter={e=>e.target.style.background=tab===id?"#4b7d0b22":"#1a1a1a"}
                        onMouseLeave={e=>e.target.style.background=tab===id?"#4b7d0b18":"none"}>{label}</button>
                    ))}
                  </div>
                )}
              </div>
              <button className={`tab${tab==="calculadora"?" on":""}`} onClick={()=>{setTab("calculadora");setShowStockMenu(false);}}>Costo de impresión</button>
              {/* Negocio dropdown */}
              <div style={{position:"relative"}}>
                <button className={`tab${["recetas","insumos","productos","ventas","proveedores","finanzas"].includes(tab)?" on":""}`}
                  onClick={()=>{setShowNegocioMenu(v=>!v);setShowStockMenu(false);}} style={{display:"flex",alignItems:"center",gap:5}}>
                  Negocio <span style={{fontSize:9,opacity:0.6}}>{showNegocioMenu?"▲":"▼"}</span>
                </button>
                {showNegocioMenu&&(
                  <div style={{position:"absolute",top:"100%",right:0,background:"#141414",border:"1px solid #252525",borderRadius:10,zIndex:200,minWidth:180,padding:"6px 0",boxShadow:"0 8px 32px #00000088"}}>
                    {[["recetas","🧪 Recetas"],["insumos","📦 Insumos"],["productos","🏷️ Productos"],["ventas","💰 Ventas"],["proveedores","🤝 Proveedores"],["finanzas","📊 Finanzas"]].map(([id,label])=>(
                      <button key={id} onClick={()=>{setTab(id);setShowNegocioMenu(false);}}
                        style={{display:"block",width:"100%",textAlign:"left",background:tab===id?"#4b7d0b18":"none",border:"none",padding:"9px 18px",fontSize:12,fontWeight:600,color:tab===id?"#4b7d0b":"#666",cursor:"pointer",fontFamily:"Montserrat,sans-serif",letterSpacing:".06em",transition:"background .15s"}}
                        onMouseEnter={e=>e.target.style.background=tab===id?"#4b7d0b22":"#1a1a1a"}
                        onMouseLeave={e=>e.target.style.background=tab===id?"#4b7d0b18":"none"}>{label}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div style={{paddingTop:28,paddingBottom:48}}>
          {tab==="dashboard"  && <Dashboard filamentos={filamentos} movimientos={movimientos} onDelete={key=>saveFil(filamentos.filter(f=>f.key!==key))}/>}
          {tab==="compra"     && <FormCompra maestros={maestros} onSubmit={handleCompra}/>}
          {tab==="impresion"  && <FormImpresion filamentos={filamentos} onSubmit={handleImpresion}/>}
          {tab==="historial"  && <Historial movimientos={movimientos}/>}
          {tab==="ajuste"     && <AjusteStock filamentos={filamentos} maestros={maestros} onAjuste={handleAjuste} onDelete={key=>saveFil(filamentos.filter(f=>f.key!==key))}/>}
          {tab==="calculadora"&& <Calculadora filamentos={filamentos}/>}
          {tab==="recetas"    && <Recetas recetas={recetas} onSave={saveRecetas} toast={toast_}/>}
          {tab==="insumos"    && <Insumos insumos={insumos} onSave={saveInsumos} toast={toast_}/>}
          {tab==="productos"  && <Productos productos={productos} recetas={recetas} onSave={saveProductos} toast={toast_}/>}
          {tab==="ventas"     && <Ventas ventas={ventas} productos={productos} onSave={handleVenta} onUpdate={v=>saveVentas_(v)} toast={toast_}/>}
          {tab==="proveedores"&& <Proveedores proveedores={proveedores} insumos={insumos} onSave={saveProveedores} toast={toast_}/>}
          {tab==="finanzas"   && <Finanzas ventas={ventas} productos={productos} insumos={insumos}/>}
          {tab==="maestros"   && <Maestros maestros={maestros} filamentos={filamentos}
            onAdd={(l,v)=>{if(l==="bobinas_update"){saveMaes({...maestros,bobinas:v});}else{const updated=[...maestros[l],v].sort((a,b)=>typeof a==="string"?a.localeCompare(b):0);saveMaes({...maestros,[l]:updated});}}}
            onDelete={(l,v)=>saveMaes({...maestros,[l]:maestros[l].filter(x=>x!==v)})}
            onRename={handleRename} onPrecioUpdate={handlePrecioUpdate}/>}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────
function Dashboard({filamentos,movimientos,onDelete}) {
  const totalStock      = filamentos.reduce((a,f)=>a+f.stockGramos,0);
  const valorInventario = filamentos.reduce((a,f)=>a+(f.precioUltimo/f.pesoUnitario)*f.stockGramos,0);
  const alertas  = filamentos.filter(f=>f.stockGramos>0&&f.stockGramos<STOCK_MINIMO).length;
  const agotados = filamentos.filter(f=>f.stockGramos===0).length;
  const [sortCol,setSortCol]=useState("color");
  const [sortDir,setSortDir]=useState("asc");
  const [searchColor,setSearchColor]=useState("");
  const [searchMarca,setSearchMarca]=useState("");
  const [searchMaterial,setSearchMaterial]=useState("");
  const [showSug,setShowSug]=useState(false);
  const allColors=[...new Set(filamentos.map(f=>f.color))].sort();
  const suggestions=searchColor.length>0?allColors.filter(c=>c.toLowerCase().includes(searchColor.toLowerCase())&&c.toLowerCase()!==searchColor.toLowerCase()):[];
  const toggleSort=col=>{if(sortCol===col)setSortDir(d=>d==="asc"?"desc":"asc");else{setSortCol(col);setSortDir("asc");}};
  const SortArrow=({col})=>{if(sortCol!==col)return<span style={{color:"#2a2a2a",marginLeft:3}}>↕</span>;return<span style={{color:"#4b7d0b",marginLeft:3}}>{sortDir==="asc"?"↑":"↓"}</span>;};
  const TH=({col,label,style={}})=>(<div className="sort-th" style={{fontSize:9,color:"#bbb",letterSpacing:".08em",textTransform:"uppercase",fontWeight:600,cursor:"pointer",...style}} onClick={()=>toggleSort(col)}>{label}<SortArrow col={col}/></div>);
  const cols="1.4fr 0.7fr 0.7fr 0.8fr 1fr 1.6fr 0.7fr 28px";
  const filtered=filamentos.filter(f=>
    (!searchColor||f.color.toLowerCase().includes(searchColor.toLowerCase()))&&
    (!searchMarca||f.marca.toLowerCase().includes(searchMarca.toLowerCase()))&&
    (!searchMaterial||f.material.toLowerCase().includes(searchMaterial.toLowerCase()))
  );
  const sorted=[...filtered].sort((a,b)=>{
    const va=a[sortCol]==="stockGramos"?a.stockGramos:String(a[sortCol]||"");
    const vb=b[sortCol]==="stockGramos"?b.stockGramos:String(b[sortCol]||"");
    if(typeof va==="number"&&typeof vb==="number") return sortDir==="asc"?va-vb:vb-va;
    return sortDir==="asc"?String(va).localeCompare(String(vb)):String(vb).localeCompare(String(va));
  });
  const meses=Array.from({length:6},(_,i)=>{
    const d=new Date();d.setMonth(d.getMonth()-5+i);
    const key=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;
    const label=d.toLocaleString("es-AR",{month:"short"}).toUpperCase();
    const gramos=movimientos.filter(m=>m.tipo==="impresion"&&m.fecha.startsWith(key)).reduce((a,m)=>a+m.gramos,0);
    return {label,gramos};
  });
  const maxGramos=Math.max(...meses.map(m=>m.gramos),1);
  const porMaterial=Object.entries(filamentos.reduce((acc,f)=>{acc[f.material]=(acc[f.material]||0)+f.stockGramos;return acc;},{})).sort((a,b)=>b[1]-a[1]);
  const impresiones=movimientos.filter(m=>m.tipo==="impresion");
  const thisMonth=new Date().toISOString().slice(0,7);
  const consumoMes=impresiones.filter(m=>m.fecha.startsWith(thisMonth)).reduce((a,m)=>a+m.gramos,0);
  const valorConsumido=impresiones.filter(m=>m.fecha.startsWith(thisMonth)).reduce((a,m)=>{const fil=filamentos.find(f=>f.key===m.key);return a+(fil?(fil.precioUltimo/fil.pesoUnitario)*m.gramos:0);},0);
  const costoPorGramo=filamentos.length>0?filamentos.reduce((a,f)=>a+(f.precioUltimo/f.pesoUnitario),0)/filamentos.length:0;
  return (
    <div>
      <div className="section-title">Resumen general</div>
      <div className="stats-grid" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:16}}>
        {[{label:"Stock total",val:`${fmtG(totalStock/1000)} kg`,sub:`${filamentos.length} tipos`,color:"#4b7d0b"},{label:"Valor inventario",val:fmtARS(valorInventario),sub:"ARS estimado",color:"#4b7d0b"},{label:"Stock bajo",val:alertas,sub:"tipos < 100g",color:alertas>0?"#cc4444":"#333"},{label:"Agotados",val:agotados,sub:"sin stock",color:agotados>0?"#cc4444":"#333"}].map((s,i)=>(
          <div key={i} className="card" style={{padding:18}}>
            <div style={{fontSize:26,fontWeight:800,color:s.color,letterSpacing:"-0.02em",lineHeight:1}}>{s.val}</div>
            <div style={{fontSize:10,color:"#bbb",letterSpacing:".08em",textTransform:"uppercase",marginTop:8,fontWeight:600}}>{s.label}</div>
            <div style={{fontSize:10,color:"#888",marginTop:2}}>{s.sub}</div>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:16}}>
        {[{label:"Consumo este mes",val:consumoMes>0?`${fmtG(consumoMes)}g`:"—",sub:"gramos impresos",color:"#4b7d0b"},{label:"Costo consumido mes",val:consumoMes>0?fmtARS(valorConsumido):"—",sub:"en filamento",color:"#4b7d0b"},{label:"Costo/g promedio",val:`${fmtARS(costoPorGramo)}/g`,sub:"sobre todo el inventario",color:"#4b7d0b"}].map((s,i)=>(
          <div key={i} className="card" style={{padding:18}}>
            <div style={{fontSize:22,fontWeight:800,color:s.color,letterSpacing:"-0.02em",lineHeight:1}}>{s.val}</div>
            <div style={{fontSize:10,color:"#555",letterSpacing:".08em",textTransform:"uppercase",marginTop:8,fontWeight:600}}>{s.label}</div>
            <div style={{fontSize:10,color:"#333",marginTop:2}}>{s.sub}</div>
          </div>
        ))}
      </div>
      <div className="charts-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
        <div className="card" style={{padding:18}}>
          <div style={{fontSize:10,color:"#444",letterSpacing:".1em",textTransform:"uppercase",marginBottom:18,fontWeight:600}}>Consumo mensual (g)</div>
          <div style={{display:"flex",gap:6,alignItems:"flex-end",height:80}}>
            {meses.map((m,i)=>(
              <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>
                {m.gramos>0&&<div style={{fontSize:9,color:"#bbb",fontWeight:600}}>{fmtG(m.gramos)}</div>}
                <div style={{width:"100%",borderRadius:3,background:m.gramos>0?"#4b7d0b":"#1a1a1a",height:`${Math.max(4,(m.gramos/maxGramos)*70)}px`,transition:"height .3s"}}/>
                <div style={{fontSize:9,color:"#333",fontWeight:600}}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{padding:18}}>
          <div style={{fontSize:10,color:"#444",letterSpacing:".1em",textTransform:"uppercase",marginBottom:14,fontWeight:600}}>Stock por material</div>
          {porMaterial.slice(0,6).map(([mat,gr])=>(
            <div key={mat} style={{marginBottom:8}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                <span style={{fontSize:11,color:"#888",fontWeight:600}}>{mat}</span>
                <span style={{fontSize:11,color:"#4b7d0b",fontWeight:700}}>{fmtG(gr/1000)}kg</span>
              </div>
              <div style={{height:3,background:"#1a1a1a",borderRadius:2}}><div style={{height:"100%",background:"#4b7d0b",borderRadius:2,width:`${(gr/totalStock)*100}%`}}/></div>
            </div>
          ))}
        </div>
      </div>
      {/* Filtros + tabla */}
      <div style={{marginTop:16,marginBottom:12,display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
        <div style={{position:"relative"}}>
          <input className="inp" style={{width:180,fontSize:12}} placeholder="🔍 Buscar color..." value={searchColor}
            onChange={e=>{setSearchColor(e.target.value);setShowSug(true);}} onFocus={()=>setShowSug(true)} onBlur={()=>setTimeout(()=>setShowSug(false),150)}/>
          {showSug&&suggestions.length>0&&(
            <div style={{position:"absolute",top:"100%",left:0,background:"#141414",border:"1px solid #252525",borderRadius:8,zIndex:100,minWidth:180,padding:"4px 0",boxShadow:"0 8px 24px #000000aa"}}>
              {suggestions.map(s=><div key={s} onMouseDown={()=>{setSearchColor(s);setShowSug(false);}} style={{padding:"7px 14px",fontSize:12,color:"#aaa",cursor:"pointer",fontWeight:500}} onMouseEnter={e=>e.target.style.background="#1a1a1a"} onMouseLeave={e=>e.target.style.background="none"}>{s}</div>)}
            </div>
          )}
        </div>
        <input className="inp" style={{width:160,fontSize:12}} placeholder="Filtrar marca..." value={searchMarca} onChange={e=>setSearchMarca(e.target.value)}/>
        <input className="inp" style={{width:150,fontSize:12}} placeholder="Filtrar material..." value={searchMaterial} onChange={e=>setSearchMaterial(e.target.value)}/>
        {(searchColor||searchMarca||searchMaterial)&&<button onClick={()=>{setSearchColor("");setSearchMarca("");setSearchMaterial("");}} style={{background:"none",border:"1px solid #2a2a2a",borderRadius:6,padding:"8px 12px",color:"#555",cursor:"pointer",fontSize:11,fontFamily:"Montserrat,sans-serif"}}>✕ Limpiar</button>}
        <span style={{fontSize:11,color:"#333",marginLeft:"auto"}}>{sorted.length} de {filamentos.length} filamentos</span>
      </div>
      {/* Desktop table */}
      <div className="card desktop-row" style={{overflow:"hidden"}}>
        <div style={{display:"grid",gridTemplateColumns:cols,gap:0,padding:"10px 16px",borderBottom:"1px solid #1a1a1a"}}>
          <TH col="color" label="Color"/><TH col="material" label="Material"/><TH col="tipo" label="Tipo"/>
          <TH col="marca" label="Marca"/><TH col="stockGramos" label="Stock"/><div style={{fontSize:9,color:"#444",letterSpacing:".08em",textTransform:"uppercase",fontWeight:600}}>Posición</div>
          <TH col="precioUltimo" label="Precio/kg"/><div/>
        </div>
        {sorted.length===0?<div style={{padding:24,textAlign:"center",color:"#333",fontSize:13}}>Sin resultados</div>:
          sorted.map(f=>{
            const bajo=f.stockGramos>0&&f.stockGramos<STOCK_MINIMO,agotado=f.stockGramos===0;
            return(
              <div key={f.key} style={{display:"grid",gridTemplateColumns:cols,gap:0,padding:"10px 16px",borderBottom:"1px solid #111",alignItems:"center",opacity:agotado?0.4:1,background:bajo?"#cc444408":agotado?"#0d0d0d":"transparent"}}>
                <div style={{fontSize:13,color:"#e0e0e0",fontWeight:600}}>{f.color}</div>
                <div style={{fontSize:12,color:"#666"}}>{f.material}</div>
                <div style={{fontSize:11,color:"#444"}}>{f.tipo}</div>
                <div style={{fontSize:11,color:"#555"}}>{f.marca}</div>
                <div style={{fontSize:13,fontWeight:700,color:agotado?"#cc4444":bajo?"#cc8800":"#4b7d0b"}}>{fmtG(f.stockGramos)}g</div>
                <PosicionBadge posicion={f.posicion} estante={f.estante}/>
                <div style={{fontSize:11,color:"#555"}}>{fmtARS(f.precioUltimo)}</div>
                <button onClick={()=>{if(window.confirm(`¿Eliminás ${f.color} ${f.material}?`))onDelete(f.key);}} style={{background:"none",border:"none",cursor:"pointer",color:"#2a2a2a",fontSize:14,padding:0,fontFamily:"Montserrat,sans-serif"}} title="Eliminar">×</button>
              </div>
            );
          })
        }
      </div>
      {/* Mobile cards */}
      <div className="mobile-card" style={{display:"none"}}>
        {sorted.map(f=>{
          const bajo=f.stockGramos>0&&f.stockGramos<STOCK_MINIMO,agotado=f.stockGramos===0;
          return(
            <div key={f.key} className="card" style={{marginBottom:8,padding:"14px 16px",opacity:agotado?0.4:1,borderColor:bajo?"#cc444430":"#1c1c1c"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div>
                  <div style={{fontSize:14,color:"#e0e0e0",fontWeight:700}}>{f.color}</div>
                  <div style={{fontSize:11,color:"#555",marginTop:2}}>{f.material} · {f.tipo} · {f.marca}</div>
                </div>
                <div style={{fontSize:16,fontWeight:800,color:agotado?"#cc4444":bajo?"#cc8800":"#4b7d0b"}}>{fmtG(f.stockGramos)}g</div>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:8}}>
                <PosicionBadge posicion={f.posicion} estante={f.estante}/>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{fontSize:11,color:"#444"}}>{fmtARS(f.precioUltimo/f.pesoUnitario*f.stockGramos)}</div>
                  <button onClick={()=>{if(window.confirm(`¿Eliminás ${f.color} ${f.material}?`))onDelete(f.key);}} style={{background:"none",border:"1px solid #2a2a2a",cursor:"pointer",color:"#444",fontSize:12,padding:"2px 8px",borderRadius:4,fontFamily:"Montserrat,sans-serif"}}>× Eliminar</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STOCK TABLA (shared)
// ─────────────────────────────────────────────────────────────────────────────
function StockTabla({filamentos,onDelete}) {
  const [sortCol,setSortCol]=useState("color");
  const [sortDir,setSortDir]=useState("asc");
  const [searchColor,setSearchColor]=useState("");
  const [searchMarca,setSearchMarca]=useState("");
  const [searchMaterial,setSearchMaterial]=useState("");
  const toggleSort=col=>{if(sortCol===col)setSortDir(d=>d==="asc"?"desc":"asc");else{setSortCol(col);setSortDir("asc");}};
  const SortArrow=({col})=>{if(sortCol!==col)return<span style={{color:"#2a2a2a",marginLeft:3}}>↕</span>;return<span style={{color:"#4b7d0b",marginLeft:3}}>{sortDir==="asc"?"↑":"↓"}</span>;};
  const TH=({col,label,style={}})=>(<div className="sort-th" style={{fontSize:9,color:"#bbb",letterSpacing:".08em",textTransform:"uppercase",fontWeight:600,cursor:"pointer",...style}} onClick={()=>toggleSort(col)}>{label}<SortArrow col={col}/></div>);
  const cols="1.4fr 0.7fr 0.7fr 0.8fr 1fr 1.6fr 0.7fr 28px";
  const filtered=filamentos.filter(f=>
    (!searchColor||f.color.toLowerCase().includes(searchColor.toLowerCase()))&&
    (!searchMarca||f.marca.toLowerCase().includes(searchMarca.toLowerCase()))&&
    (!searchMaterial||f.material.toLowerCase().includes(searchMaterial.toLowerCase()))
  );
  const sorted=[...filtered].sort((a,b)=>{
    const va=sortCol==="stockGramos"?a.stockGramos:String(a[sortCol]||"");
    const vb=sortCol==="stockGramos"?b.stockGramos:String(b[sortCol]||"");
    if(typeof va==="number"&&typeof vb==="number") return sortDir==="asc"?va-vb:vb-va;
    return sortDir==="asc"?String(va).localeCompare(String(vb)):String(vb).localeCompare(String(va));
  });
  return (
    <div style={{marginTop:24}}>
      <div style={{display:"flex",gap:10,flexWrap:"wrap",alignItems:"center",marginBottom:10}}>
        <input className="inp" style={{width:160,fontSize:12}} placeholder="🔍 Color..." value={searchColor} onChange={e=>setSearchColor(e.target.value)}/>
        <input className="inp" style={{width:140,fontSize:12}} placeholder="Marca..." value={searchMarca} onChange={e=>setSearchMarca(e.target.value)}/>
        <input className="inp" style={{width:130,fontSize:12}} placeholder="Material..." value={searchMaterial} onChange={e=>setSearchMaterial(e.target.value)}/>
        <span style={{fontSize:11,color:"#333",marginLeft:"auto"}}>{sorted.length}/{filamentos.length}</span>
      </div>
      <div className="card desktop-row" style={{overflow:"hidden"}}>
        <div style={{display:"grid",gridTemplateColumns:cols,gap:0,padding:"10px 16px",borderBottom:"1px solid #1a1a1a"}}>
          <TH col="color" label="Color"/><TH col="material" label="Material"/><TH col="tipo" label="Tipo"/>
          <TH col="marca" label="Marca"/><TH col="stockGramos" label="Stock"/>
          <div style={{fontSize:9,color:"#444",letterSpacing:".08em",textTransform:"uppercase",fontWeight:600}}>Posición</div>
          <TH col="precioUltimo" label="Precio/kg"/><div/>
        </div>
        {sorted.map(f=>{
          const bajo=f.stockGramos>0&&f.stockGramos<STOCK_MINIMO,agotado=f.stockGramos===0;
          return(
            <div key={f.key} style={{display:"grid",gridTemplateColumns:cols,gap:0,padding:"10px 16px",borderBottom:"1px solid #111",alignItems:"center",opacity:agotado?0.4:1,background:bajo?"#cc444408":"transparent"}}>
              <div style={{fontSize:13,color:"#e0e0e0",fontWeight:600}}>{f.color}</div>
              <div style={{fontSize:12,color:"#666"}}>{f.material}</div>
              <div style={{fontSize:11,color:"#444"}}>{f.tipo}</div>
              <div style={{fontSize:11,color:"#555"}}>{f.marca}</div>
              <div style={{fontSize:13,fontWeight:700,color:agotado?"#cc4444":bajo?"#cc8800":"#4b7d0b"}}>{fmtG(f.stockGramos)}g</div>
              <PosicionBadge posicion={f.posicion} estante={f.estante}/>
              <div style={{fontSize:11,color:"#555"}}>{fmtARS(f.precioUltimo)}</div>
              <button onClick={()=>{if(window.confirm(`¿Eliminás ${f.color} ${f.material} (${f.posicion})?`))onDelete(f.key);}} style={{background:"none",border:"none",cursor:"pointer",color:"#2a2a2a",fontSize:14,padding:0}}>×</button>
            </div>
          );
        })}
      </div>
      <div className="mobile-card" style={{display:"none"}}>
        {sorted.map(f=>{
          const bajo=f.stockGramos>0&&f.stockGramos<STOCK_MINIMO,agotado=f.stockGramos===0;
          return(
            <div key={f.key} className="card" style={{marginBottom:8,padding:"14px 16px",opacity:agotado?0.4:1}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div><div style={{fontSize:14,color:"#e0e0e0",fontWeight:700}}>{f.color}</div><div style={{fontSize:11,color:"#555",marginTop:2}}>{f.material}·{f.tipo}·{f.marca}</div></div>
                <div style={{fontSize:16,fontWeight:800,color:agotado?"#cc4444":bajo?"#cc8800":"#4b7d0b"}}>{fmtG(f.stockGramos)}g</div>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:4}}>
                <PosicionBadge posicion={f.posicion} estante={f.estante}/>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{fontSize:12,color:"#555",fontWeight:500}}>{fmtARS(f.precioUltimo/f.pesoUnitario*f.stockGramos)}</div>
                  <button onClick={()=>{if(window.confirm(`¿Eliminás ${f.color} ${f.material}?`))onDelete(f.key);}} style={{background:"none",border:"1px solid #2a2a2a",cursor:"pointer",color:"#444",fontSize:12,padding:"2px 8px",borderRadius:4,fontFamily:"Montserrat,sans-serif"}}>× Eliminar</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FORM COMPRA
// ─────────────────────────────────────────────────────────────────────────────
function FormCompra({maestros,onSubmit}) {
  const empty={material:"",tipo:"",marca:"",color:"",cantidad:1,pesoUnitario:1000,precio:"",estante:"",posicion:""};
  const [form,setForm]=useState(empty);
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const Sel=({lbl,k,opts})=>(<div><div className="lbl">{lbl}</div><select className="inp" value={form[k]} onChange={e=>set(k,e.target.value)}><option value="">— Seleccioná —</option>{opts.map(o=><option key={o}>{o}</option>)}</select></div>);
  const submit=()=>{
    if(!form.material||!form.tipo||!form.marca||!form.color||!form.estante||!form.posicion||!form.precio) return alert("Completá todos los campos.");
    onSubmit({...form,cantidad:Number(form.cantidad),pesoUnitario:Number(form.pesoUnitario),precio:Number(form.precio)});
    setForm(empty);
  };
  return (
    <div style={{maxWidth:580}}>
      <div className="section-title">Registrar compra</div>
      <div className="card" style={{display:"flex",flexDirection:"column",gap:16,padding:24}}>
        <div className="form-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          <Sel lbl="Material" k="material" opts={maestros.materiales}/>
          <Sel lbl="Tipo" k="tipo" opts={maestros.tipos}/>
          <Sel lbl="Marca" k="marca" opts={maestros.marcas}/>
          <Sel lbl="Color" k="color" opts={maestros.colores}/>
          <div><div className="lbl">Cantidad de bobinas</div><input className="inp" type="number" min={1} value={form.cantidad} onChange={e=>set("cantidad",e.target.value)}/></div>
          <div><div className="lbl">Peso por bobina (g)</div><input className="inp" type="number" min={1} value={form.pesoUnitario} onChange={e=>set("pesoUnitario",e.target.value)}/></div>
          <div><div className="lbl">Precio total pagado (ARS)</div><input className="inp" type="number" min={0} placeholder="Ej: 15000" value={form.precio} onChange={e=>set("precio",e.target.value)}/></div>
          <Sel lbl="Estante" k="estante" opts={maestros.estantes}/>
          <Sel lbl="Posición" k="posicion" opts={maestros.posiciones}/>
        </div>
        <div style={{background:"#0d0d0d",borderRadius:8,padding:"10px 14px",fontSize:12,color:"#555",border:"1px solid #1e1e1e"}}>
          Total a incorporar: <span style={{color:"#4b7d0b",fontWeight:700}}>{Number(form.pesoUnitario||0)*Number(form.cantidad||0)}g</span>
          {form.precio&&Number(form.pesoUnitario)>0&&<span style={{marginLeft:16}}>Precio/g: <span style={{color:"#4b7d0b",fontWeight:700}}>{fmtARS(Number(form.precio)/(Number(form.pesoUnitario)*Number(form.cantidad||1)))}</span></span>}
        </div>
        <button className="btn" onClick={submit}>Registrar compra</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FORM IMPRESION
// ─────────────────────────────────────────────────────────────────────────────
function FormImpresion({filamentos,onSubmit}) {
  const disponibles=filamentos.filter(f=>f.stockGramos>0);
  const emptyLinea={key:"",gramos:""};
  const [lineas,setLineas]=useState([{...emptyLinea}]);
  const setLinea=(i,k,v)=>setLineas(ls=>ls.map((l,idx)=>idx===i?{...l,[k]:v}:l));
  const addLinea=()=>setLineas(ls=>[...ls,{...emptyLinea}]);
  const removeLinea=i=>setLineas(ls=>ls.filter((_,idx)=>idx!==i));
  const totalGramos=lineas.reduce((a,l)=>a+(Number(l.gramos)||0),0);
  const submit=()=>{
    const validas=lineas.filter(l=>l.key&&l.gramos&&Number(l.gramos)>0);
    if(validas.length===0) return alert("Agregá al menos un filamento con gramos.");
    onSubmit(validas.map(l=>({key:l.key,gramos:Number(l.gramos)})));
    setLineas([{...emptyLinea}]);
  };
  return (
    <div style={{maxWidth:620}}>
      <div className="section-title">Registrar impresión</div>
      <div className="card" style={{display:"flex",flexDirection:"column",gap:14,padding:24}}>
        {lineas.map((linea,i)=>{
          const fil=disponibles.find(f=>f.key===linea.key);
          return(
            <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 140px 36px",gap:10,alignItems:"end"}}>
              <div>
                {i===0&&<div className="lbl">Filamento</div>}
                <select className="inp" value={linea.key} onChange={e=>setLinea(i,"key",e.target.value)}>
                  <option value="">— Seleccioná —</option>
                  {disponibles.map(f=><option key={f.key} value={f.key}>{f.color} {f.material} ({fmtG(f.stockGramos)}g)</option>)}
                </select>
              </div>
              <div>
                {i===0&&<div className="lbl">Gramos usados</div>}
                <input className="inp" type="number" min={0} max={fil?.stockGramos||9999} placeholder="g" value={linea.gramos} onChange={e=>setLinea(i,"gramos",e.target.value)}/>
              </div>
              <button onClick={()=>removeLinea(i)} style={{background:"none",border:"1px solid #2a2a2a",borderRadius:6,cursor:"pointer",color:"#555",fontSize:16,height:38,width:36,fontFamily:"Montserrat,sans-serif",marginTop:i===0?20:0}}>×</button>
            </div>
          );
        })}
        <button className="btn-add" onClick={addLinea} style={{alignSelf:"flex-start"}}>+ Agregar filamento</button>
        {totalGramos>0&&<div style={{background:"#0d0d0d",borderRadius:8,padding:"10px 14px",fontSize:12,color:"#555",border:"1px solid #1e1e1e"}}>Total: <span style={{color:"#cc5555",fontWeight:700}}>{fmtG(totalGramos)}g</span></div>}
        <button className="btn" onClick={submit}>Registrar impresión</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HISTORIAL
// ─────────────────────────────────────────────────────────────────────────────
function Historial({movimientos}) {
  const sorted=[...movimientos].sort((a,b)=>new Date(b.fecha)-new Date(a.fecha));
  const rows=useMemo(()=>{
    const out=[];
    const seen=new Set();
    sorted.forEach(m=>{
      if(m.tipo==="impresion_grupo"||seen.has(m.id)) return;
      if(m.tipo==="impresion"&&m.grupoId){
        if(seen.has(m.grupoId)) return;
        seen.add(m.grupoId);
        const grupo=sorted.filter(x=>x.grupoId===m.grupoId);
        grupo.forEach(x=>seen.add(x.id));
        out.push({type:"impresion_grupo",id:m.grupoId,fecha:m.fecha,data:grupo});
      } else {
        seen.add(m.id);
        out.push({type:m.tipo,id:m.id,fecha:m.fecha,data:m});
      }
    });
    return out;
  },[movimientos]);
  return (
    <div>
      <div className="section-title">Historial de movimientos</div>
      {rows.length===0?<div className="card" style={{padding:32,textAlign:"center",color:"#333"}}>Sin movimientos todavía.</div>:(
        <div className="card" style={{padding:"0 16px"}}>
          {rows.map(row=>{
            if(row.type==="ajuste"){const m=row.data;return(
              <div key={m.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderBottom:"1px solid #1a1a1a"}}>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <span style={{fontSize:9,padding:"3px 8px",borderRadius:4,letterSpacing:".06em",fontWeight:700,background:"#1a6b8a18",color:"#1a6b8a",border:"1px solid #1a6b8a33"}}>AJUSTE</span>
                  <div><span style={{fontSize:13,color:"#ffffff",fontWeight:500}}>{m.color} {m.material}</span><span style={{fontSize:11,color:"#444",marginLeft:8}}>{m.tipo_fil}</span><span style={{fontSize:11,color:"#333",marginLeft:8}}>{m.marca}</span></div>
                </div>
                <div style={{textAlign:"right",flexShrink:0,marginLeft:12}}>
                  <div style={{fontSize:13,fontWeight:700,color:"#6688cc"}}>{fmtG(m.gramos)}g</div>
                  <div style={{fontSize:10,color:"#333",marginTop:2}}>{new Date(m.fecha).toLocaleDateString("es-AR",{day:"2-digit",month:"short",year:"numeric"})}</div>
                </div>
              </div>
            );}
            if(row.type==="compra"){const m=row.data;return(
              <div key={m.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderBottom:"1px solid #1a1a1a"}}>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <span style={{fontSize:9,padding:"3px 8px",borderRadius:4,letterSpacing:".06em",fontWeight:700,background:"#4b7d0b18",color:"#4b7d0b",border:"1px solid #4b7d0b33"}}>COMPRA</span>
                  <div><span style={{fontSize:13,color:"#ffffff",fontWeight:500}}>{m.color} {m.material}</span><span style={{fontSize:11,color:"#444",marginLeft:8}}>{m.tipo_fil}</span><span style={{fontSize:11,color:"#333",marginLeft:8}}>{m.marca}</span><span style={{fontSize:10,color:"#444",marginLeft:8}}>{m.cantidad} bobina{m.cantidad>1?"s":""}</span></div>
                </div>
                <div style={{textAlign:"right",flexShrink:0,marginLeft:12}}>
                  <div style={{fontSize:13,fontWeight:700,color:"#4b7d0b"}}>+{fmtG(m.gramos)}g</div>
                  <div style={{fontSize:10,color:"#333",marginTop:2}}>{new Date(m.fecha).toLocaleDateString("es-AR",{day:"2-digit",month:"short",year:"numeric"})}</div>
                </div>
              </div>
            );}
            if(row.type==="impresion_grupo"){const grupo=row.data,total=grupo.reduce((a,x)=>a+x.gramos,0);return(
              <div key={row.id} style={{padding:"12px 0",borderBottom:"1px solid #1a1a1a"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div style={{display:"flex",alignItems:"center",gap:12}}>
                    <span style={{fontSize:9,padding:"3px 8px",borderRadius:4,letterSpacing:".06em",fontWeight:700,background:"#ffffff08",color:"#777",border:"1px solid #252525"}}>IMPRESIÓN</span>
                    <span style={{fontSize:11,color:"#555",fontWeight:500}}>{grupo.length} filamento{grupo.length>1?"s":""}</span>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0,marginLeft:12}}>
                    <div style={{fontSize:13,fontWeight:700,color:"#cc5555"}}>-{fmtG(total)}g</div>
                    <div style={{fontSize:10,color:"#333",marginTop:2}}>{new Date(row.fecha).toLocaleDateString("es-AR",{day:"2-digit",month:"short",year:"numeric"})}</div>
                  </div>
                </div>
                <div style={{marginTop:6,paddingLeft:8,borderLeft:"2px solid #252525",marginLeft:4}}>
                  {grupo.map(x=><div key={x.id} style={{fontSize:11,color:"#555",padding:"2px 0"}}><span style={{color:"#aaa",fontWeight:500}}>{x.color} {x.material}</span><span style={{color:"#cc5555",marginLeft:8,fontWeight:600}}>-{fmtG(x.gramos)}g</span><span style={{color:"#333",marginLeft:8}}>{x.marca}</span></div>)}
                </div>
              </div>
            );}
            const m=row.data;return(
              <div key={m.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderBottom:"1px solid #1a1a1a"}}>
                <div style={{display:"flex",alignItems:"center",gap:12}}><span style={{fontSize:9,padding:"3px 8px",borderRadius:4,letterSpacing:".06em",fontWeight:700,background:"#ffffff08",color:"#777",border:"1px solid #252525"}}>IMPRESIÓN</span><div><span style={{fontSize:13,color:"#ffffff",fontWeight:500}}>{m.color} {m.material}</span></div></div>
                <div style={{textAlign:"right",flexShrink:0,marginLeft:12}}><div style={{fontSize:13,fontWeight:700,color:"#cc5555"}}>-{fmtG(m.gramos)}g</div><div style={{fontSize:10,color:"#333",marginTop:2}}>{new Date(m.fecha).toLocaleDateString("es-AR",{day:"2-digit",month:"short",year:"numeric"})}</div></div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AJUSTE STOCK
// ─────────────────────────────────────────────────────────────────────────────
function AjusteStock({filamentos,maestros,onAjuste,onDelete}) {
  const [selectedKey,setSelectedKey]=useState("");
  const [pesoBrutoCargado,setPesoBrutoCargado]=useState("");
  const [marcaBobina,setMarcaBobina]=useState("");
  const [confirmado,setConfirmado]=useState(false);
  const [filtColor,setFiltColor]=useState("");
  const [filtMaterial,setFiltMaterial]=useState("");
  const [filtTipo,setFiltTipo]=useState("");
  const [filtMarca,setFiltMarca]=useState("");
  const bobinas=maestros.bobinas||[];
  const fil=filamentos.find(f=>f.key===selectedKey);
  const pesoBobin=bobinas.find(b=>b.marca===marcaBobina)?.pesoBobina||0;
  const stockNeto=pesoBrutoCargado&&pesoBobin?Math.max(0,Number(pesoBrutoCargado)-pesoBobin):null;
  const diferencia=fil&&stockNeto!==null?stockNeto-fil.stockGramos:null;
  const reset=()=>{setSelectedKey("");setPesoBrutoCargado("");setMarcaBobina("");setConfirmado(false);setFiltColor("");setFiltMaterial("");setFiltTipo("");setFiltMarca("");};
  const submit=()=>{
    if(!selectedKey||stockNeto===null) return alert("Completá todos los campos.");
    if(stockNeto<0) return alert("El peso neto no puede ser negativo.");
    onAjuste(selectedKey,stockNeto);reset();
  };
  const filtrados=filamentos.filter(f=>
    (!filtColor||f.color===filtColor)&&(!filtMaterial||f.material===filtMaterial)&&(!filtTipo||f.tipo===filtTipo)&&(!filtMarca||f.marca===filtMarca)
  );
  return (
    <div style={{maxWidth:1400}}>
      <div className="section-title">Ajuste de stock</div>
      <div style={{display:"grid",gridTemplateColumns:"500px 1fr",gap:20,alignItems:"start"}} className="ajuste-grid">
        <div>
          <div style={{fontSize:12,color:"#555",marginBottom:20,lineHeight:1.6}}>Ingresá el peso bruto (bobina + filamento) y el sistema descuenta el peso de la bobina vacía automáticamente.</div>
          <div className="card" style={{display:"flex",flexDirection:"column",gap:16,padding:24}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div><div className="lbl">Filtrar por color</div><select className="inp" value={filtColor} onChange={e=>{setFiltColor(e.target.value);setSelectedKey("");setConfirmado(false);}}><option value="">— Todos —</option>{[...new Set(filamentos.map(f=>f.color))].sort().map(c=><option key={c}>{c}</option>)}</select></div>
              <div><div className="lbl">Filtrar por material</div><select className="inp" value={filtMaterial} onChange={e=>{setFiltMaterial(e.target.value);setSelectedKey("");setConfirmado(false);}}><option value="">— Todos —</option>{[...new Set(filamentos.filter(f=>!filtColor||f.color===filtColor).map(f=>f.material))].sort().map(m=><option key={m}>{m}</option>)}</select></div>
              <div><div className="lbl">Filtrar por tipo</div><select className="inp" value={filtTipo} onChange={e=>{setFiltTipo(e.target.value);setSelectedKey("");setConfirmado(false);}}><option value="">— Todos —</option>{[...new Set(filamentos.filter(f=>(!filtColor||f.color===filtColor)&&(!filtMaterial||f.material===filtMaterial)).map(f=>f.tipo))].sort().map(t=><option key={t}>{t}</option>)}</select></div>
              <div><div className="lbl">Filtrar por marca</div><select className="inp" value={filtMarca} onChange={e=>{setFiltMarca(e.target.value);setSelectedKey("");setConfirmado(false);}}><option value="">— Todas —</option>{[...new Set(filamentos.filter(f=>(!filtColor||f.color===filtColor)&&(!filtMaterial||f.material===filtMaterial)&&(!filtTipo||f.tipo===filtTipo)).map(f=>f.marca))].sort().map(m=><option key={m}>{m}</option>)}</select></div>
            </div>
            <div><div className="lbl">Filamento a ajustar</div>
              <select className="inp" value={selectedKey} onChange={e=>{setSelectedKey(e.target.value);setConfirmado(false);}}>
                <option value="">— Seleccioná —</option>
                {filtrados.map(f=><option key={f.key} value={f.key}>{f.color} {f.material} {f.tipo} · {f.marca} · {fmtG(f.stockGramos)}g actual · {f.posicion}</option>)}
              </select>
            </div>
            <div><div className="lbl">Tipo de bobina vacía</div>
              <select className="inp" value={marcaBobina} onChange={e=>{setMarcaBobina(e.target.value);setConfirmado(false);}}>
                <option value="">— Seleccioná —</option>
                {bobinas.map(b=><option key={b.marca} value={b.marca}>{b.marca} ({fmtG(b.pesoBobina)}g)</option>)}
              </select>
            </div>
            <div><div className="lbl">Peso bruto total (bobina + filamento, en gramos)</div><input className="inp" type="number" min={0} placeholder="Ej: 450" value={pesoBrutoCargado} onChange={e=>{setPesoBrutoCargado(e.target.value);setConfirmado(false);}}/></div>
            {stockNeto!==null&&marcaBobina&&(
              <div style={{background:"#0d0d0d",borderRadius:10,padding:"14px 16px",border:"1px solid #252525"}}>
                <div style={{fontSize:11,color:"#555",marginBottom:8,fontWeight:600,letterSpacing:".06em",textTransform:"uppercase"}}>Resumen del ajuste</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
                  <div><div style={{fontSize:10,color:"#444",marginBottom:3}}>Peso bruto</div><div style={{fontSize:15,color:"#aaa",fontWeight:700}}>{fmtG(Number(pesoBrutoCargado))}g</div></div>
                  <div><div style={{fontSize:10,color:"#444",marginBottom:3}}>Bobina vacía</div><div style={{fontSize:15,color:"#cc5555",fontWeight:700}}>−{fmtG(pesoBobin)}g</div></div>
                  <div><div style={{fontSize:10,color:"#444",marginBottom:3}}>Stock neto</div><div style={{fontSize:15,color:"#4b7d0b",fontWeight:700}}>{fmtG(stockNeto)}g</div></div>
                </div>
                {fil&&diferencia!==null&&(
                  <div style={{marginTop:12,paddingTop:12,borderTop:"1px solid #1a1a1a",fontSize:12,color:"#555"}}>
                    Cambio respecto al stock actual: <span style={{marginLeft:8,fontWeight:700,color:diferencia>=0?"#4b7d0b":"#cc5555"}}>{diferencia>=0?"+":""}{fmtG(diferencia)}g</span>
                    {diferencia<0&&<span style={{marginLeft:8,fontSize:10,color:"#cc5555"}}>({fmtG(Math.abs(diferencia))}g de consumo no registrado)</span>}
                  </div>
                )}
                <div style={{marginTop:14}}>
                  <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:12,color:"#666"}}>
                    <input type="checkbox" checked={confirmado} onChange={e=>setConfirmado(e.target.checked)} style={{width:14,height:14,accentColor:"#4b7d0b"}}/>
                    Confirmo que el nuevo stock es <strong style={{color:"#e0e0e0",marginLeft:4}}>{fmtG(stockNeto)}g</strong>
                  </label>
                </div>
              </div>
            )}
            <button className="btn" onClick={submit} style={{opacity:(!confirmado||!selectedKey||stockNeto===null)?0.4:1,cursor:(!confirmado||!selectedKey||stockNeto===null)?"not-allowed":"pointer"}}>Aplicar ajuste de stock</button>
          </div>
        </div>
        <StockTabla filamentos={filamentos} onDelete={onDelete}/>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CALCULADORA
// ─────────────────────────────────────────────────────────────────────────────
function Calculadora({filamentos}) {
  const defaultCfg={precioKwh:140,consumoW:120,hsMaquina:4320,precioRepuestos:150000,margenError:10};
  const [gastos,setGastos]=useState(()=>{try{const v=localStorage.getItem("lenga_calc_cfg");return v?JSON.parse(v):defaultCfg;}catch{return defaultCfg;}});
  const [showGastos,setShowGastos]=useState(false);
  const emptyLinea={key:"",gramos:""};
  const [lineas,setLineas]=useState([{...emptyLinea}]);
  const setLinea=(i,k,v)=>setLineas(ls=>ls.map((l,idx)=>idx===i?{...l,[k]:v}:l));
  const [horas,setHoras]=useState("");const [minutos,setMinutos]=useState("");
  const [insumosCosto,setInsumosCosto]=useState("");
  const [multiplicador,setMultiplicador]=useState(5);
  const [resultado,setResultado]=useState(null);
  const saveGastos=g=>{setGastos(g);try{localStorage.setItem("lenga_calc_cfg",JSON.stringify(g));}catch{}};
  const disponibles=filamentos.filter(f=>f.stockGramos>0);
  const calcular=()=>{
    const tiempoH=(Number(horas)||0)+(Number(minutos)||0)/60;
    const lineasValidas=lineas.filter(l=>l.key&&l.gramos&&Number(l.gramos)>0);
    if(lineasValidas.length===0) return alert("Agregá al menos un filamento con gramos.");
    const costoMaterial=lineasValidas.reduce((a,l)=>{const fil=filamentos.find(f=>f.key===l.key);return a+(fil?(fil.precioUltimo/fil.pesoUnitario)*Number(l.gramos):0);},0);
    const totalGramos=lineasValidas.reduce((a,l)=>a+Number(l.gramos),0);
    const costoLuz=tiempoH>0?(gastos.consumoW/1000)*tiempoH*gastos.precioKwh:0;
    const costoMaquina=tiempoH>0&&gastos.hsMaquina>0?(gastos.precioRepuestos/gastos.hsMaquina)*tiempoH:0;
    const subtotal=costoMaterial+costoLuz+costoMaquina+Number(insumosCosto||0);
    const conMargen=subtotal*(1+gastos.margenError/100);
    const precioFinal=conMargen*multiplicador;
    setResultado({costoMaterial,costoLuz,costoMaquina,insumosCosto:Number(insumosCosto||0),subtotal,conMargen,precioFinal,totalGramos,tiempoH,multiplicador});
  };
  return (
    <div style={{maxWidth:680}}>
      <div className="section-title">Calculadora de costo de impresión</div>
      <div className="card" style={{padding:24,display:"flex",flexDirection:"column",gap:16}}>
        <button className="btn-ghost" onClick={()=>setShowGastos(v=>!v)} style={{alignSelf:"flex-start",fontSize:11}}>{showGastos?"▲":"▼"} Configurar gastos fijos de la máquina</button>
        {showGastos&&(
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,padding:"16px",background:"#0d0d0d",borderRadius:10,border:"1px solid #1e1e1e"}}>
            {[["precioKwh","Precio kWh (ARS)"],["consumoW","Consumo máquina (W)"],["hsMaquina","Vida útil repuestos (hs)"],["precioRepuestos","Costo repuestos (ARS)"],["margenError","Margen de error (%)"]].map(([k,lbl])=>(
              <div key={k}><div className="lbl">{lbl}</div><input className="inp" type="number" value={gastos[k]} onChange={e=>saveGastos({...gastos,[k]:Number(e.target.value)})}/></div>
            ))}
          </div>
        )}
        <div>
          <div className="lbl" style={{marginBottom:10}}>Filamentos utilizados</div>
          {lineas.map((linea,i)=>{
            const fil=disponibles.find(f=>f.key===linea.key);
            return(
              <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 130px 36px",gap:10,alignItems:"end",marginBottom:10}}>
                <div>
                  {i===0&&<div className="lbl">Filamento</div>}
                  <select className="inp" value={linea.key} onChange={e=>setLinea(i,"key",e.target.value)}>
                    <option value="">— Seleccioná —</option>
                    {disponibles.map(f=><option key={f.key} value={f.key}>{f.color} {f.material} ({fmtG(f.stockGramos)}g disponibles)</option>)}
                  </select>
                </div>
                <div>
                  {i===0&&<div className="lbl">Gramos</div>}
                  <input className="inp" type="number" min={0} placeholder="g" value={linea.gramos} onChange={e=>setLinea(i,"gramos",e.target.value)}/>
                </div>
                {lineas.length>1&&<button onClick={()=>setLineas(ls=>ls.filter((_,idx)=>idx!==i))} style={{background:"none",border:"1px solid #2a2a2a",borderRadius:6,cursor:"pointer",color:"#555",fontSize:16,height:38,width:36,marginTop:i===0?20:0}}>×</button>}
              </div>
            );
          })}
          <button className="btn-add" onClick={()=>setLineas(ls=>[...ls,{...emptyLinea}])} style={{marginTop:4}}>+ Agregar filamento</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
          <div><div className="lbl">Horas de impresión</div><input className="inp" type="number" min={0} placeholder="0" value={horas} onChange={e=>setHoras(e.target.value)}/></div>
          <div><div className="lbl">Minutos</div><input className="inp" type="number" min={0} max={59} placeholder="0" value={minutos} onChange={e=>setMinutos(e.target.value)}/></div>
          <div><div className="lbl">Insumos adicionales (ARS)</div><input className="inp" type="number" min={0} placeholder="0" value={insumosCosto} onChange={e=>setInsumosCosto(e.target.value)}/></div>
        </div>
        <div><div className="lbl">Multiplicador de precio de venta (×{multiplicador})</div>
          <input type="range" min={1} max={20} step={0.5} value={multiplicador} onChange={e=>setMultiplicador(Number(e.target.value))} style={{width:"100%",accentColor:"#4b7d0b"}}/>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#333",marginTop:2}}><span>×1</span><span style={{color:"#4b7d0b",fontWeight:700}}>×{multiplicador}</span><span>×20</span></div>
        </div>
        <button className="btn" onClick={calcular}>Calcular costo</button>
        {resultado&&(
          <div style={{background:"#0d0d0d",borderRadius:10,padding:"18px",border:"1px solid #252525"}}>
            <div style={{fontSize:11,color:"#555",marginBottom:14,fontWeight:600,letterSpacing:".06em",textTransform:"uppercase"}}>Resultado</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
              {[["Material",fmtARS(resultado.costoMaterial)],["Electricidad",fmtARS(resultado.costoLuz)],["Desgaste máquina",fmtARS(resultado.costoMaquina)],["Insumos",fmtARS(resultado.insumosCosto)]].map(([k,v])=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"#666"}}><span>{k}</span><span style={{fontWeight:600,color:"#888"}}>{v}</span></div>
              ))}
            </div>
            <div style={{borderTop:"1px solid #1a1a1a",paddingTop:12,display:"flex",flexDirection:"column",gap:6}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:12}}><span style={{color:"#555"}}>Costo base</span><span style={{color:"#aaa",fontWeight:700}}>{fmtARS(resultado.subtotal)}</span></div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:12}}><span style={{color:"#555"}}>Con margen error ({gastos.margenError}%)</span><span style={{color:"#aaa",fontWeight:700}}>{fmtARS(resultado.conMargen)}</span></div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:16,marginTop:6}}><span style={{color:"#e0e0e0",fontWeight:700}}>Precio de venta sugerido</span><span style={{color:"#4b7d0b",fontWeight:800}}>{fmtARS(resultado.precioFinal)}</span></div>
              {resultado.tiempoH>0&&<div style={{fontSize:11,color:"#444",marginTop:4}}>Precio/hora: <strong style={{color:"#666"}}>{resultado.tiempoH>0?fmtARS(resultado.subtotal/resultado.tiempoH):"-"}</strong></span></div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EDIT MODAL
// ─────────────────────────────────────────────────────────────────────────────
function EditModal({value,onSave,onClose}) {
  const [val,setVal]=useState(value);
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div style={{fontSize:13,color:"#aaa",marginBottom:16,fontWeight:600}}>Editar valor</div>
        <input className="inp" value={val} onChange={e=>setVal(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")onSave(val);if(e.key==="Escape")onClose();}} autoFocus/>
        <div style={{display:"flex",gap:8,marginTop:14}}>
          <button onClick={()=>onSave(val)} style={{flex:1,background:"#4b7d0b",color:"#fff",border:"none",borderRadius:8,padding:"10px",fontFamily:"'Montserrat',sans-serif",fontSize:12,cursor:"pointer",fontWeight:700}}>Guardar</button>
          <button onClick={onClose} style={{flex:1,background:"none",color:"#666",border:"1px solid #333",borderRadius:8,padding:"10px",fontFamily:"'Montserrat',sans-serif",fontSize:12,cursor:"pointer"}}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAESTROS
// ─────────────────────────────────────────────────────────────────────────────
function Maestros({maestros,filamentos,onAdd,onDelete,onRename,onPrecioUpdate}) {
  const [newVals,setNewVals]=useState({materiales:"",tipos:"",marcas:"",colores:"",estantes:"",posiciones:""});
  const [editing,setEditing]=useState(null);
  const [newBobina,setNewBobina]=useState({marca:"",pesoBobina:""});
  const [editingBobina,setEditingBobina]=useState(null);
  const [editingPrecio,setEditingPrecio]=useState(null);
  const [precioEdit,setPrecioEdit]=useState("");
  const add=lista=>{const val=newVals[lista].trim();if(!val)return;if(maestros[lista].includes(val))return alert("Ya existe.");onAdd(lista,val);setNewVals(v=>({...v,[lista]:""}));};
  const saveEdit=nv=>{const t=nv.trim();if(!t)return;if(t===editing.value){setEditing(null);return;}if(maestros[editing.lista].includes(t)){alert("Ya existe.");return;}onRename(editing.lista,editing.value,t);setEditing(null);};
  const LISTAS=[["materiales","Materiales"],["tipos","Tipos de filamento"],["marcas","Marcas"],["colores","Colores"],["estantes","Estantes"],["posiciones","Posiciones"]];
  return (
    <div>
      <div className="section-title">Maestros</div>
      {/* Precios */}
      <div className="card" style={{marginBottom:16,padding:20}}>
        <div style={{fontSize:12,color:"#aaa",fontWeight:700,marginBottom:4,letterSpacing:".04em",textTransform:"uppercase"}}>Precios por material</div>
        <div style={{fontSize:11,color:"#333",marginBottom:12}}>El cambio se aplica a todos los filamentos de esa combinación.</div>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
          <thead><tr style={{borderBottom:"1px solid #252525"}}>{["Marca","Material","Tipo","Precio / kg","Rollos",""].map((h,i)=><th key={i} style={{textAlign:"left",padding:"6px 8px",fontSize:10,color:"#444",letterSpacing:".08em",textTransform:"uppercase",fontWeight:600}}>{h}</th>)}</tr></thead>
          <tbody>
            {Object.values((filamentos||[]).reduce((acc,f)=>{const k=`${f.marca}||${f.material}||${f.tipo}`;if(!acc[k])acc[k]={marca:f.marca,material:f.material,tipo:f.tipo,precio:f.precioUltimo,count:0};acc[k].count++;return acc;},{})).sort((a,b)=>a.marca.localeCompare(b.marca)||a.material.localeCompare(b.material)).map((row,i)=>{
              const isEditing=editingPrecio&&editingPrecio.marca===row.marca&&editingPrecio.material===row.material&&editingPrecio.tipo===row.tipo;
              return(
                <tr key={i} style={{borderBottom:"1px solid #1a1a1a"}}>
                  <td style={{padding:"8px",color:"#ccc",fontWeight:500}}>{row.marca}</td>
                  <td style={{padding:"8px",color:"#888"}}>{row.material}</td>
                  <td style={{padding:"8px",color:"#666"}}>{row.tipo}</td>
                  <td style={{padding:"8px 4px"}}>{isEditing?<input className="inp" type="number" style={{padding:"5px 10px",fontSize:12,width:120}} value={precioEdit} onChange={e=>setPrecioEdit(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&precioEdit){onPrecioUpdate(row.marca,row.material,row.tipo,Number(precioEdit));setEditingPrecio(null);}if(e.key==="Escape")setEditingPrecio(null);}} autoFocus/>:<span style={{color:"#4b7d0b",fontWeight:700}}>{fmtARS(row.precio)}</span>}</td>
                  <td style={{padding:"8px",color:"#444",fontSize:11}}>{row.count} rollo{row.count!==1?"s":""}</td>
                  <td style={{padding:"8px 4px"}}>{isEditing?<div style={{display:"flex",gap:6}}><button className="btn-add" onClick={()=>{if(precioEdit){onPrecioUpdate(row.marca,row.material,row.tipo,Number(precioEdit));setEditingPrecio(null);}}} style={{borderColor:"#4b7d0b",color:"#4b7d0b"}}>✓</button><button className="btn-icon" style={{color:"#555"}} onClick={()=>setEditingPrecio(null)}>✕</button></div>:<button className="btn-icon" style={{color:"#4b7d0b"}} onClick={()=>{setEditingPrecio({marca:row.marca,material:row.material,tipo:row.tipo});setPrecioEdit(String(row.precio));}}>✎</button>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Bobinas */}
      <div className="card" style={{marginBottom:16,padding:20}}>
        <div style={{fontSize:12,color:"#aaa",fontWeight:700,marginBottom:14,letterSpacing:".04em",textTransform:"uppercase"}}>Pesos de bobinas vacías</div>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
          <thead><tr style={{borderBottom:"1px solid #252525"}}>{["Marca bobina","Peso (g)",""].map(h=><th key={h} style={{textAlign:"left",padding:"6px 8px",fontSize:10,color:"#444",letterSpacing:".08em",textTransform:"uppercase",fontWeight:600}}>{h}</th>)}</tr></thead>
          <tbody>
            {(maestros.bobinas||[]).map((b,i)=>(
              <tr key={i} style={{borderBottom:"1px solid #1a1a1a"}}>
                {editingBobina===i?(
                  <><td style={{padding:"6px 4px"}}><input className="inp" style={{padding:"6px 10px",fontSize:12}} value={b.marca} onChange={e=>{const nb=[...maestros.bobinas];nb[i]={...nb[i],marca:e.target.value};onAdd("bobinas_update",nb);}}/></td>
                  <td style={{padding:"6px 4px"}}><input className="inp" style={{padding:"6px 10px",fontSize:12,width:100}} type="number" value={b.pesoBobina} onChange={e=>{const nb=[...maestros.bobinas];nb[i]={...nb[i],pesoBobina:Number(e.target.value)};onAdd("bobinas_update",nb);}}/></td>
                  <td style={{padding:"6px 4px"}}><button className="btn-add" onClick={()=>setEditingBobina(null)}>✓ Listo</button></td></>
                ):(
                  <><td style={{padding:"8px",color:"#ccc",fontWeight:500}}>{b.marca}</td>
                  <td style={{padding:"8px",color:"#4b7d0b",fontWeight:700}}>{fmtG(b.pesoBobina)}g</td>
                  <td style={{padding:"8px"}}><div style={{display:"flex",gap:6}}><button className="btn-icon" style={{color:"#4b7d0b"}} onClick={()=>setEditingBobina(i)}>✎</button><button className="btn-icon" style={{color:"#555"}} onClick={()=>{if(window.confirm(`¿Eliminás "${b.marca}"?`)){const nb=maestros.bobinas.filter((_,j)=>j!==i);onAdd("bobinas_update",nb);}}}>×</button></div></td></>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{display:"flex",gap:8,marginTop:14}}>
          <input className="inp" style={{flex:2,padding:"8px 12px",fontSize:12}} placeholder="Marca de bobina..." value={newBobina.marca} onChange={e=>setNewBobina(v=>({...v,marca:e.target.value}))}/>
          <input className="inp" style={{width:110,padding:"8px 12px",fontSize:12}} type="number" placeholder="Peso (g)" value={newBobina.pesoBobina} onChange={e=>setNewBobina(v=>({...v,pesoBobina:e.target.value}))}/>
          <button className="btn-add" onClick={()=>{if(!newBobina.marca||!newBobina.pesoBobina)return;onAdd("bobinas_update",[...(maestros.bobinas||[]),{marca:newBobina.marca,pesoBobina:Number(newBobina.pesoBobina)}]);setNewBobina({marca:"",pesoBobina:""});}}>+ Agregar</button>
        </div>
      </div>
      {/* Listas */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
        {LISTAS.map(([lista,titulo])=>(
          <div key={lista} className="card" style={{padding:16}}>
            <div style={{fontSize:11,color:"#555",fontWeight:700,letterSpacing:".06em",textTransform:"uppercase",marginBottom:12}}>{titulo}</div>
            {maestros[lista].map(item=>(
              <div key={item} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px 0",borderBottom:"1px solid #141414"}}>
                <span style={{fontSize:12,color:"#888"}}>{item}</span>
                <div style={{display:"flex",gap:4}}>
                  <button className="btn-icon" style={{color:"#4b7d0b",fontSize:12}} onClick={()=>setEditing({lista,value:item})}>✎</button>
                  <button className="btn-icon" style={{color:"#444",fontSize:12}} onClick={()=>{if(window.confirm(`¿Eliminás "${item}"?`))onDelete(lista,item);}}>×</button>
                </div>
              </div>
            ))}
            <div style={{display:"flex",gap:6,marginTop:10}}>
              <input className="inp" style={{padding:"7px 10px",fontSize:12}} placeholder={`Nuevo ${titulo.toLowerCase()}...`} value={newVals[lista]} onChange={e=>setNewVals(v=>({...v,[lista]:e.target.value}))} onKeyDown={e=>{if(e.key==="Enter")add(lista);}}/>
              <button className="btn-add" onClick={()=>add(lista)}>+</button>
            </div>
          </div>
        ))}
      </div>
      {editing&&<EditModal value={editing.value} onSave={saveEdit} onClose={()=>setEditing(null)}/>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RECETAS
// ─────────────────────────────────────────────────────────────────────────────
function Recetas({recetas,onSave,toast}) {
  const [modal,setModal]=useState(null);
  const [ver,setVer]=useState(null);
  const [cantidades,setCantidades]=useState({});
  const setCant=(id,v)=>setCantidades(c=>({...c,[id]:v}));
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
        <div className="section-title" style={{marginBottom:0}}>Recetas de productos</div>
        <button className="btn" onClick={()=>setModal({})}>+ Nueva receta</button>
      </div>
      {recetas.length===0?<div className="card" style={{textAlign:"center",padding:40,color:"#333"}}>No hay recetas todavía. Creá la primera.</div>:(
        <div className="grid-3" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
          {recetas.map(r=>{
            const mult=Number(cantidades[r.id])||1;
            return(
              <div key={r.id} className="card" style={{display:"flex",flexDirection:"column",gap:12,padding:16}}>
                {r.foto?<img src={r.foto} alt={r.nombre} style={{width:"100%",height:120,objectFit:"cover",borderRadius:8,marginBottom:4}}/>:<div style={{height:60,background:"#141414",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28}}>🧪</div>}
                <div style={{fontWeight:700,fontSize:14,color:"#e0e0e0"}}>{r.nombre}</div>
                {r.descripcion&&<div style={{fontSize:11,color:"#444"}}>{r.descripcion}</div>}
                {r.pasos&&r.pasos.length>0&&<div style={{fontSize:11,color:"#555",borderTop:"1px solid #1a1a1a",paddingTop:8}}>{r.pasos.length} paso{r.pasos.length!==1?"s":""}</div>}
                <div style={{display:"flex",gap:6}}>
                  <button className="btn-add" style={{flex:1,fontSize:11}} onClick={()=>setVer(r)}>Ver receta</button>
                  <button className="btn-add" style={{flex:1,fontSize:11}} onClick={()=>setModal(r)}>Editar</button>
                  <button className="btn-icon" style={{color:"#444"}} onClick={()=>{if(window.confirm("¿Eliminás esta receta?"))onSave(recetas.filter(x=>x.id!==r.id));}}>×</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {modal!==null&&<RecetaModal receta={modal} onSave={r=>{const nuevo=r.id?recetas.map(x=>x.id===r.id?r:x):[...recetas,{...r,id:uid()}];onSave(nuevo);setModal(null);toast("✓ Receta guardada");}} onClose={()=>setModal(null)}/>}
      {ver&&<RecetaVer receta={ver} onClose={()=>setVer(null)}/>}
    </div>
  );
}
function RecetaModal({receta,onSave,onClose}) {
  const [form,setForm]=useState({nombre:"",descripcion:"",pasos:[],foto:"",...receta});
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const handleFoto=e=>{const file=e.target.files[0];if(!file)return;const r=new FileReader();r.onload=ev=>set("foto",ev.target.result);r.readAsDataURL(file);};
  const addPaso=()=>set("pasos",[...(form.pasos||[]),{id:uid(),texto:""}]);
  const setPaso=(i,v)=>set("pasos",form.pasos.map((p,idx)=>idx===i?{...p,texto:v}:p));
  const removePaso=i=>set("pasos",form.pasos.filter((_,idx)=>idx!==i));
  return(
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div style={{fontSize:15,fontWeight:700,color:"#fff",marginBottom:20}}>{form.id?"Editar receta":"Nueva receta"}</div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div><div className="lbl">Nombre *</div><input className="inp" value={form.nombre} onChange={e=>set("nombre",e.target.value)}/></div>
          <div><div className="lbl">Descripción</div><textarea className="inp" value={form.descripcion} onChange={e=>set("descripcion",e.target.value)} style={{resize:"vertical",minHeight:60}}/></div>
          <div><div className="lbl">Foto</div><input type="file" accept="image/*" onChange={handleFoto} style={{fontSize:11,color:"#666"}}/>{form.foto&&<img src={form.foto} alt="" style={{width:"100%",height:80,objectFit:"cover",borderRadius:6,marginTop:6}}/>}</div>
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}><div className="lbl" style={{marginBottom:0}}>Pasos</div><button className="btn-add" onClick={addPaso}>+ Paso</button></div>
            {(form.pasos||[]).map((p,i)=>(
              <div key={p.id} style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}>
                <span style={{fontSize:11,color:"#444",fontWeight:700,width:20}}>{i+1}.</span>
                <input className="inp" style={{flex:1,fontSize:12}} value={p.texto} onChange={e=>setPaso(i,e.target.value)} placeholder={`Paso ${i+1}...`}/>
                <button className="btn-icon" style={{color:"#555"}} onClick={()=>removePaso(i)}>×</button>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:8,marginTop:8}}>
            <button className="btn" style={{flex:1}} onClick={()=>{if(!form.nombre.trim())return alert("Nombre requerido.");onSave(form);}}>Guardar</button>
            <button className="btn-ghost" onClick={onClose}>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
function RecetaVer({receta,onClose}) {
  return(
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        {receta.foto&&<img src={receta.foto} alt={receta.nombre} style={{width:"100%",height:140,objectFit:"cover",borderRadius:8,marginBottom:16}}/>}
        <div style={{fontSize:16,fontWeight:800,color:"#e0e0e0",marginBottom:8}}>{receta.nombre}</div>
        {receta.descripcion&&<div style={{fontSize:12,color:"#555",marginBottom:16}}>{receta.descripcion}</div>}
        {receta.pasos&&receta.pasos.length>0&&(
          <div>
            <div style={{fontSize:11,color:"#444",letterSpacing:".08em",textTransform:"uppercase",fontWeight:700,marginBottom:10}}>Pasos</div>
            {receta.pasos.map((p,i)=><div key={p.id} style={{display:"flex",gap:10,marginBottom:8,alignItems:"flex-start"}}><span style={{fontSize:11,color:"#4b7d0b",fontWeight:800,width:20,flexShrink:0}}>{i+1}.</span><span style={{fontSize:12,color:"#888"}}>{p.texto}</span></div>)}
          </div>
        )}
        <button className="btn-ghost" onClick={onClose} style={{marginTop:16,width:"100%"}}>Cerrar</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INSUMOS
// ─────────────────────────────────────────────────────────────────────────────
const CATEGORIAS_INS=["Packaging","Limpieza","Herramientas","Electrónica","Otros"];
function Insumos({insumos,onSave,toast}) {
  const [modal,setModal]=useState(null);
  const [movModal,setMovModal]=useState(null);
  const handleMov=(ins,tipo)=>setMovModal({...ins,movTipo:tipo});
  const saveMov=(id,tipo,cantidad,nota)=>{
    const nuevos=insumos.map(ins=>{
      if(ins.id!==id) return ins;
      const nuevo=tipo==="entrada"?(Number(ins.stock)||0)+Number(cantidad):Math.max(0,(Number(ins.stock)||0)-Number(cantidad));
      return {...ins,stock:nuevo,movimientos:[...(ins.movimientos||[]),{tipo,cantidad:Number(cantidad),nota,fecha:new Date().toISOString()}]};
    });
    onSave(nuevos);toast("✓ Movimiento registrado");setMovModal(null);
  };
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
        <div className="section-title" style={{marginBottom:0}}>Control de insumos</div>
        <button className="btn" onClick={()=>setModal({})}>+ Nuevo insumo</button>
      </div>
      {CATEGORIAS_INS.map(cat=>{
        const items=insumos.filter(i=>i.categoria===cat);
        if(items.length===0) return null;
        return(
          <div key={cat} style={{marginBottom:24}}>
            <div style={{fontSize:11,color:"#555",letterSpacing:".1em",textTransform:"uppercase",fontWeight:700,marginBottom:10}}>{cat}</div>
            <div className="card" style={{padding:0}}>
              {items.map((ins,idx)=>{
                const bajo=ins.stockMinimo&&(Number(ins.stock)||0)<Number(ins.stockMinimo);
                return(
                  <div key={ins.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 20px",borderBottom:idx<items.length-1?"1px solid #1a1a1a":"none"}}>
                    <div>
                      <div style={{fontSize:13,color:"#e0e0e0",fontWeight:600}}>{ins.nombre}</div>
                      {ins.proveedor&&<div style={{fontSize:11,color:"#444",marginTop:2}}>{ins.proveedor}</div>}
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:12}}>
                      <div style={{textAlign:"right"}}>
                        <div style={{fontSize:14,color:bajo?"#cc4444":"#4b7d0b",fontWeight:700}}>{fmtG(Number(ins.stock)||0)} {ins.unidad}</div>
                        {bajo&&<div style={{fontSize:10,color:"#cc4444"}}>Stock bajo</div>}
                      </div>
                      <div style={{display:"flex",gap:4}}>
                        <button className="btn-add" style={{fontSize:11,color:"#4b7d0b",borderColor:"#4b7d0b33"}} onClick={()=>handleMov(ins,"entrada")}>+ Entrada</button>
                        <button className="btn-add" style={{fontSize:11,color:"#cc5555",borderColor:"#cc555533"}} onClick={()=>handleMov(ins,"salida")}>- Salida</button>
                        <button className="btn-icon" style={{color:"#4b7d0b",fontSize:12}} onClick={()=>setModal(ins)}>✎</button>
                        <button className="btn-icon" style={{color:"#444",fontSize:12}} onClick={()=>{if(window.confirm("¿Eliminás este insumo?"))onSave(insumos.filter(x=>x.id!==ins.id));}}>×</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      {insumos.filter(i=>!i.categoria||!CATEGORIAS_INS.includes(i.categoria)).length>0&&(
        <div style={{marginBottom:24}}>
          <div style={{fontSize:11,color:"#555",letterSpacing:".1em",textTransform:"uppercase",fontWeight:700,marginBottom:10}}>Sin categoría</div>
          <div className="card" style={{padding:0}}>
            {insumos.filter(i=>!i.categoria||!CATEGORIAS_INS.includes(i.categoria)).map((ins,idx,arr)=>(
              <div key={ins.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 20px",borderBottom:idx<arr.length-1?"1px solid #1a1a1a":"none"}}>
                <div style={{fontSize:13,color:"#e0e0e0",fontWeight:600}}>{ins.nombre}</div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{fontSize:14,color:"#4b7d0b",fontWeight:700}}>{fmtG(Number(ins.stock)||0)} {ins.unidad}</div>
                  <button className="btn-icon" style={{color:"#4b7d0b",fontSize:12}} onClick={()=>setModal(ins)}>✎</button>
                  <button className="btn-icon" style={{color:"#444",fontSize:12}} onClick={()=>{if(window.confirm("¿Eliminás?"))onSave(insumos.filter(x=>x.id!==ins.id));}}>×</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {insumos.length===0&&<div className="card" style={{textAlign:"center",padding:40,color:"#333"}}>No hay insumos cargados.</div>}
      {modal!==null&&(
        <div className="modal-bg" onClick={()=>setModal(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:15,fontWeight:700,color:"#fff",marginBottom:20}}>{modal.id?"Editar insumo":"Nuevo insumo"}</div>
            <InsumoForm insumo={modal} onSave={ins=>{const nuevo=ins.id?insumos.map(x=>x.id===ins.id?ins:x):[...insumos,{...ins,id:uid(),stock:Number(ins.stockInicial||0),movimientos:[]}];onSave(nuevo);setModal(null);toast("✓ Guardado");}} onClose={()=>setModal(null)}/>
          </div>
        </div>
      )}
      {movModal&&<MovModal item={movModal} onSave={(cant,nota)=>saveMov(movModal.id,movModal.movTipo,cant,nota)} onClose={()=>setMovModal(null)}/>}
    </div>
  );
}
function InsumoForm({insumo,onSave,onClose}) {
  const [form,setForm]=useState({nombre:"",unidad:"unidad",categoria:"",proveedor:"",stockMinimo:"",precioUnitario:"",stockInicial:"",...insumo});
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <div className="grid-2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <div style={{gridColumn:"1/-1"}}><div className="lbl">Nombre *</div><input className="inp" value={form.nombre} onChange={e=>set("nombre",e.target.value)}/></div>
        <div><div className="lbl">Unidad</div><input className="inp" placeholder="unidad / kg / litro..." value={form.unidad} onChange={e=>set("unidad",e.target.value)}/></div>
        <div><div className="lbl">Categoría</div><select className="inp" value={form.categoria} onChange={e=>set("categoria",e.target.value)}><option value="">—</option>{CATEGORIAS_INS.map(c=><option key={c}>{c}</option>)}</select></div>
        <div><div className="lbl">Proveedor</div><input className="inp" value={form.proveedor} onChange={e=>set("proveedor",e.target.value)}/></div>
        <div><div className="lbl">Stock mínimo (alerta)</div><input className="inp" type="number" value={form.stockMinimo} onChange={e=>set("stockMinimo",e.target.value)}/></div>
        <div><div className="lbl">Precio unitario (ARS)</div><input className="inp" type="number" value={form.precioUnitario} onChange={e=>set("precioUnitario",e.target.value)}/></div>
        {!form.id&&<div><div className="lbl">Stock inicial</div><input className="inp" type="number" value={form.stockInicial||""} onChange={e=>set("stockInicial",e.target.value)}/></div>}
      </div>
      <div style={{display:"flex",gap:8,marginTop:8}}>
        <button className="btn" style={{flex:1}} onClick={()=>{if(!form.nombre.trim())return alert("Nombre requerido.");onSave(form);}}>Guardar</button>
        <button className="btn-ghost" onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}
function MovModal({item,onSave,onClose}) {
  const [cant,setCant]=useState("");const [nota,setNota]=useState("");
  return(
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" style={{maxWidth:360}} onClick={e=>e.stopPropagation()}>
        <div style={{fontSize:14,fontWeight:700,color:"#fff",marginBottom:4}}>{item.movTipo==="entrada"?"+ Entrada":"- Salida"}: {item.nombre}</div>
        <div style={{fontSize:12,color:"#555",marginBottom:20}}>Stock actual: <span style={{color:"#4b7d0b",fontWeight:700}}>{fmtG(Number(item.stock)||0)} {item.unidad}</span></div>
        <div style={{marginBottom:12}}><div className="lbl">Cantidad ({item.unidad})</div><input className="inp" type="number" min={0} autoFocus value={cant} onChange={e=>setCant(e.target.value)}/></div>
        <div style={{marginBottom:16}}><div className="lbl">Nota (opcional)</div><input className="inp" value={nota} onChange={e=>setNota(e.target.value)} placeholder="Ej: Compra en ferretería"/></div>
        <div style={{display:"flex",gap:8}}><button className="btn" style={{flex:1}} onClick={()=>{if(!cant)return;onSave(cant,nota);}}>Confirmar</button><button className="btn-ghost" onClick={onClose}>Cancelar</button></div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCTOS TERMINADOS
// ─────────────────────────────────────────────────────────────────────────────
function Productos({productos,recetas,onSave,toast}) {
  const [modal,setModal]=useState(null);
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
        <div className="section-title" style={{marginBottom:0}}>Stock de productos terminados</div>
        <button className="btn" onClick={()=>setModal({})}>+ Nuevo producto</button>
      </div>
      {productos.length===0?<div className="card" style={{textAlign:"center",padding:40,color:"#333"}}>No hay productos cargados.</div>:(
        <div className="grid-4" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
          {productos.map(p=>{
            const bajo=p.stockMinimo&&(Number(p.stock)||0)<Number(p.stockMinimo);
            const receta=recetas.find(r=>r.id===p.recetaId);
            return(
              <div key={p.id} className="card" style={{padding:0,overflow:"hidden"}}>
                {p.foto?<img src={p.foto} alt={p.nombre} style={{width:"100%",height:100,objectFit:"cover"}}/>:<div style={{height:70,background:"#141414",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28}}>🏷️</div>}
                <div style={{padding:"12px 14px",display:"flex",flexDirection:"column",gap:8}}>
                  <div style={{fontWeight:700,fontSize:13,color:"#e0e0e0"}}>{p.nombre}</div>
                  {p.variante&&<div style={{fontSize:11,color:"#555"}}>{p.variante}</div>}
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontSize:14,fontWeight:800,color:bajo?"#cc4444":"#4b7d0b"}}>{p.stock||0} u</span>
                    {p.precioVenta&&<span style={{fontSize:12,color:"#555",fontWeight:600}}>{fmtARS(p.precioVenta)}</span>}
                  </div>
                  {receta&&<div style={{fontSize:10,color:"#444"}}>Receta: {receta.nombre}</div>}
                  <div style={{display:"flex",gap:4}}>
                    <button className="btn-add" style={{flex:1,fontSize:11}} onClick={()=>setModal(p)}>✎ Editar</button>
                    <button className="btn-icon" style={{color:"#444"}} onClick={()=>{if(window.confirm("¿Eliminás?"))onSave(productos.filter(x=>x.id!==p.id));}}>×</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {modal!==null&&(
        <div className="modal-bg" onClick={()=>setModal(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:15,fontWeight:700,color:"#fff",marginBottom:20}}>{modal.id?"Editar producto":"Nuevo producto terminado"}</div>
            <ProductoForm producto={modal} recetas={recetas} onSave={p=>{const nuevo=p.id?productos.map(x=>x.id===p.id?p:x):[...productos,{...p,id:uid(),stock:Number(p.stockInicial||0)}];onSave(nuevo);setModal(null);toast("✓ Guardado");}} onClose={()=>setModal(null)}/>
          </div>
        </div>
      )}
    </div>
  );
}
function ProductoForm({producto,recetas,onSave,onClose}) {
  const [form,setForm]=useState({nombre:"",variante:"",recetaId:"",precioVenta:"",stockMinimo:"",foto:"",...producto});
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const handleFoto=e=>{const file=e.target.files[0];if(!file)return;const r=new FileReader();r.onload=ev=>set("foto",ev.target.result);r.readAsDataURL(file);};
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <div className="grid-2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <div style={{gridColumn:"1/-1"}}><div className="lbl">Nombre *</div><input className="inp" value={form.nombre} onChange={e=>set("nombre",e.target.value)}/></div>
        <div><div className="lbl">Variante</div><input className="inp" placeholder="Ej: Negro 20cm" value={form.variante} onChange={e=>set("variante",e.target.value)}/></div>
        <div><div className="lbl">Receta asociada</div><select className="inp" value={form.recetaId} onChange={e=>set("recetaId",e.target.value)}><option value="">— Ninguna —</option>{recetas.map(r=><option key={r.id} value={r.id}>{r.nombre}</option>)}</select></div>
        <div><div className="lbl">Precio de venta (ARS)</div><input className="inp" type="number" value={form.precioVenta} onChange={e=>set("precioVenta",e.target.value)}/></div>
        <div><div className="lbl">Stock mínimo (alerta)</div><input className="inp" type="number" value={form.stockMinimo} onChange={e=>set("stockMinimo",e.target.value)}/></div>
        {!form.id&&<div><div className="lbl">Stock inicial</div><input className="inp" type="number" value={form.stockInicial||""} onChange={e=>set("stockInicial",e.target.value)}/></div>}
        <div style={{gridColumn:"1/-1"}}><div className="lbl">Foto</div><input type="file" accept="image/*" onChange={handleFoto} style={{fontSize:11,color:"#666"}}/>{form.foto&&<img src={form.foto} alt="" style={{width:"100%",height:80,objectFit:"cover",borderRadius:6,marginTop:6}}/>}</div>
      </div>
      <div style={{display:"flex",gap:8,marginTop:8}}>
        <button className="btn" style={{flex:1}} onClick={()=>{if(!form.nombre.trim())return alert("Nombre requerido.");onSave(form);}}>Guardar</button>
        <button className="btn-ghost" onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VENTAS
// ─────────────────────────────────────────────────────────────────────────────
function Ventas({ventas,productos,onSave,onUpdate,toast}) {
  const [modal,setModal]=useState(false);
  const [filtroEstado,setFiltroEstado]=useState("");
  const [filtroCanal,setFiltroCanal]=useState("");
  const sorted=[...ventas].sort((a,b)=>new Date(b.fecha)-new Date(a.fecha));
  const filtradas=sorted.filter(v=>(!filtroEstado||v.estado===filtroEstado)&&(!filtroCanal||v.canal===filtroCanal));
  const totalMes=()=>{const m=new Date().toISOString().slice(0,7);return ventas.filter(v=>v.fecha?.startsWith(m)&&v.estado!=="Cancelado").reduce((a,v)=>a+Number(v.precioTotal||0),0);};
  const updateEstado=(id,estado)=>onUpdate(ventas.map(v=>v.id===id?{...v,estado}:v));
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12,marginBottom:20}}>
        <div>
          <div className="section-title" style={{marginBottom:2}}>Ventas</div>
          <div style={{fontSize:12,color:"#4b7d0b",fontWeight:700}}>Este mes: {fmtARS(totalMes())}</div>
        </div>
        <button className="btn" onClick={()=>setModal(true)}>+ Nueva venta</button>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
        <select className="inp" style={{width:160,fontSize:12}} value={filtroEstado} onChange={e=>setFiltroEstado(e.target.value)}><option value="">Todos los estados</option>{ESTADOS.map(s=><option key={s}>{s}</option>)}</select>
        <select className="inp" style={{width:160,fontSize:12}} value={filtroCanal} onChange={e=>setFiltroCanal(e.target.value)}><option value="">Todos los canales</option>{CANALES.map(c=><option key={c}>{c}</option>)}</select>
      </div>
      {filtradas.length===0?<div className="card" style={{padding:32,textAlign:"center",color:"#333"}}>No hay ventas con ese filtro.</div>:(
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {filtradas.map(v=>{
            const ec=ESTADO_COLOR[v.estado]||"#555";
            const prod=productos.find(p=>p.id===v.productoId);
            return(
              <div key={v.id} className="card" style={{padding:"14px 18px",borderLeft:`3px solid ${ec}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}>
                  <div>
                    <div style={{fontSize:13,color:"#e0e0e0",fontWeight:700}}>{prod?.nombre||v.productoNombre||"Venta"}{v.variante?` · ${v.variante}`:""}</div>
                    <div style={{fontSize:11,color:"#444",marginTop:2}}>{v.canal} · {new Date(v.fecha).toLocaleDateString("es-AR",{day:"2-digit",month:"short",year:"numeric"})}</div>
                    {v.clienteNombre&&<div style={{fontSize:11,color:"#333",marginTop:2}}>{v.clienteNombre}{v.clienteContacto?` · ${v.clienteContacto}`:""}</div>}
                    {v.notas&&<div style={{fontSize:11,color:"#333",marginTop:2,fontStyle:"italic"}}>{v.notas}</div>}
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:15,fontWeight:800,color:"#4b7d0b"}}>{fmtARS(v.precioTotal||0)}</div>
                      <div style={{fontSize:11,color:"#444"}}>{v.cantidad} u · {fmtARS(v.precioUnitario||0)} c/u</div>
                    </div>
                    <select className="inp" style={{fontSize:11,padding:"5px 8px",width:140,color:ec,background:"#141414",border:`1px solid ${ec}44`,fontWeight:600}} value={v.estado} onChange={e=>updateEstado(v.id,e.target.value)}>
                      {ESTADOS.map(s=><option key={s} style={{color:"#e0e0e0"}}>{s}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {modal&&<VentaModal productos={productos} onSave={v=>{onSave(v);setModal(false);}} onClose={()=>setModal(false)}/>}
    </div>
  );
}
function VentaModal({productos,onSave,onClose}) {
  const [form,setForm]=useState({canal:"MercadoLibre",productoId:"",variante:"",cantidad:1,precioUnitario:"",costoEnvio:0,estado:"Pendiente",clienteNombre:"",clienteContacto:"",notas:""});
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const prod=productos.find(p=>p.id===form.productoId);
  const precioTotal=(Number(form.precioUnitario)||0)*Number(form.cantidad)+Number(form.costoEnvio||0);
  return(
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div style={{fontSize:15,fontWeight:700,color:"#fff",marginBottom:20}}>Nueva venta</div>
        <div className="grid-2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <div><div className="lbl">Canal</div><select className="inp" value={form.canal} onChange={e=>set("canal",e.target.value)}>{CANALES.map(c=><option key={c}>{c}</option>)}</select></div>
          <div><div className="lbl">Estado</div><select className="inp" value={form.estado} onChange={e=>set("estado",e.target.value)}>{ESTADOS.map(s=><option key={s}>{s}</option>)}</select></div>
          <div style={{gridColumn:"1/-1"}}><div className="lbl">Producto</div><select className="inp" value={form.productoId} onChange={e=>set("productoId",e.target.value)}><option value="">— Seleccioná —</option>{productos.map(p=><option key={p.id} value={p.id}>{p.nombre}{p.variante?` · ${p.variante}`:""}</option>)}</select></div>
          {prod&&<div style={{gridColumn:"1/-1",background:"#0d0d0d",borderRadius:8,padding:"8px 12px",fontSize:11,color:"#555",border:"1px solid #1e1e1e"}}>Stock disponible: <span style={{color:"#4b7d0b",fontWeight:700}}>{prod.stock||0} u</span></div>}
          <div><div className="lbl">Cantidad</div><input className="inp" type="number" min={1} value={form.cantidad} onChange={e=>set("cantidad",e.target.value)}/></div>
          <div><div className="lbl">Precio unitario (ARS)</div><input className="inp" type="number" value={form.precioUnitario} onChange={e=>set("precioUnitario",e.target.value)}/></div>
          <div><div className="lbl">Costo de envío (ARS)</div><input className="inp" type="number" value={form.costoEnvio} onChange={e=>set("costoEnvio",e.target.value)}/></div>
          <div style={{display:"flex",alignItems:"flex-end"}}><div style={{padding:"10px 14px",background:"#0d0d0d",borderRadius:8,border:"1px solid #1e1e1e",fontSize:12,color:"#4b7d0b",fontWeight:700,width:"100%"}}>Total: {fmtARS(precioTotal)}</div></div>
          <div><div className="lbl">Nombre del cliente</div><input className="inp" value={form.clienteNombre} onChange={e=>set("clienteNombre",e.target.value)}/></div>
          <div><div className="lbl">Contacto (tel / IG / ML)</div><input className="inp" value={form.clienteContacto} onChange={e=>set("clienteContacto",e.target.value)}/></div>
          <div style={{gridColumn:"1/-1"}}><div className="lbl">Notas</div><input className="inp" value={form.notas} onChange={e=>set("notas",e.target.value)} placeholder="Personalización, dirección, etc."/></div>
        </div>
        <div style={{display:"flex",gap:8,marginTop:20}}>
          <button className="btn" style={{flex:1}} onClick={()=>{if(!form.productoId&&!form.precioUnitario)return alert("Completá los campos requeridos.");onSave({...form,precioTotal,productoNombre:prod?.nombre||""});}}>Registrar venta</button>
          <button className="btn-ghost" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROVEEDORES
// ─────────────────────────────────────────────────────────────────────────────
const TIPOS_PROV=["Filamento","Insumos","Servicios","Otros"];
function Proveedores({proveedores,insumos,onSave,toast}) {
  const [modal,setModal]=useState(null);
  const [pedidoModal,setPedidoModal]=useState(null);
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
        <div className="section-title" style={{marginBottom:0}}>Proveedores</div>
        <button className="btn" onClick={()=>setModal({})}>+ Nuevo proveedor</button>
      </div>
      {proveedores.length===0?<div className="card" style={{padding:32,textAlign:"center",color:"#333"}}>No hay proveedores cargados.</div>:(
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
          {proveedores.map(p=>(
            <div key={p.id} className="card" style={{padding:16,display:"flex",flexDirection:"column",gap:10}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div>
                  <div style={{fontSize:14,fontWeight:700,color:"#e0e0e0"}}>{p.nombre}</div>
                  {p.tipo&&<div style={{fontSize:10,color:"#555",marginTop:2,letterSpacing:".06em",textTransform:"uppercase"}}>{p.tipo}</div>}
                </div>
                <div style={{display:"flex",gap:4}}>
                  <button className="btn-icon" style={{color:"#4b7d0b"}} onClick={()=>setModal(p)}>✎</button>
                  <button className="btn-icon" style={{color:"#444"}} onClick={()=>{if(window.confirm("¿Eliminás?"))onSave(proveedores.filter(x=>x.id!==p.id));}}>×</button>
                </div>
              </div>
              {p.contacto&&<div style={{fontSize:11,color:"#555"}}>{p.contacto}</div>}
              {p.web&&<a href={p.web.startsWith("http")?p.web:"https://"+p.web} target="_blank" rel="noreferrer" style={{fontSize:11,color:"#4b7d0b",textDecoration:"none"}}>{p.web}</a>}
              {p.productos&&<div style={{fontSize:11,color:"#444",borderTop:"1px solid #1a1a1a",paddingTop:8}}>{p.productos}</div>}
              {p.notas&&<div style={{fontSize:11,color:"#333",fontStyle:"italic"}}>{p.notas}</div>}
              {p.pedidos&&p.pedidos.filter(x=>!x.recibido).length>0&&(
                <div style={{fontSize:11,color:"#a07000",background:"#a0700018",borderRadius:6,padding:"6px 10px"}}>
                  {p.pedidos.filter(x=>!x.recibido).length} pedido{p.pedidos.filter(x=>!x.recibido).length!==1?"s":""} pendiente{p.pedidos.filter(x=>!x.recibido).length!==1?"s":""}
                </div>
              )}
              <button className="btn-add" style={{fontSize:11}} onClick={()=>setPedidoModal(p)}>+ Registrar pedido</button>
            </div>
          ))}
        </div>
      )}
      {modal!==null&&(
        <div className="modal-bg" onClick={()=>setModal(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:15,fontWeight:700,color:"#fff",marginBottom:20}}>{modal.id?"Editar proveedor":"Nuevo proveedor"}</div>
            <ProveedorForm proveedor={modal} onSave={p=>{const nuevo=p.id?proveedores.map(x=>x.id===p.id?p:x):[...proveedores,{...p,id:uid(),pedidos:[]}];onSave(nuevo);setModal(null);toast("✓ Guardado");}} onClose={()=>setModal(null)}/>
          </div>
        </div>
      )}
      {pedidoModal&&<PedidoModal proveedor={pedidoModal} onSave={(desc,monto)=>{const nuevo=proveedores.map(p=>p.id===pedidoModal.id?{...p,pedidos:[...(p.pedidos||[]),{id:uid(),desc,monto:Number(monto||0),fecha:new Date().toISOString(),recibido:false}]}:p);onSave(nuevo);setPedidoModal(null);toast("✓ Pedido registrado");}} onClose={()=>setPedidoModal(null)}/>}
    </div>
  );
}
function ProveedorForm({proveedor,onSave,onClose}) {
  const [form,setForm]=useState({nombre:"",tipo:"",contacto:"",web:"",productos:"",notas:"",...proveedor});
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <div className="grid-2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <div style={{gridColumn:"1/-1"}}><div className="lbl">Nombre *</div><input className="inp" value={form.nombre} onChange={e=>set("nombre",e.target.value)}/></div>
        <div><div className="lbl">Tipo</div><select className="inp" value={form.tipo} onChange={e=>set("tipo",e.target.value)}><option value="">—</option>{TIPOS_PROV.map(t=><option key={t}>{t}</option>)}</select></div>
        <div><div className="lbl">Contacto</div><input className="inp" placeholder="Tel / email / IG" value={form.contacto} onChange={e=>set("contacto",e.target.value)}/></div>
        <div style={{gridColumn:"1/-1"}}><div className="lbl">Sitio web / tienda</div><input className="inp" value={form.web} onChange={e=>set("web",e.target.value)}/></div>
        <div style={{gridColumn:"1/-1"}}><div className="lbl">Productos que vende</div><input className="inp" placeholder="Ej: PLA, PETG, filamentos especiales" value={form.productos} onChange={e=>set("productos",e.target.value)}/></div>
        <div style={{gridColumn:"1/-1"}}><div className="lbl">Notas</div><textarea className="inp" value={form.notas} onChange={e=>set("notas",e.target.value)} placeholder="Condiciones, descuentos, plazos..." style={{resize:"vertical",minHeight:60}}/></div>
      </div>
      <div style={{display:"flex",gap:8,marginTop:8}}><button className="btn" style={{flex:1}} onClick={()=>{if(!form.nombre.trim())return alert("Nombre requerido.");onSave(form);}}>Guardar</button><button className="btn-ghost" onClick={onClose}>Cancelar</button></div>
    </div>
  );
}
function PedidoModal({proveedor,onSave,onClose}) {
  const [desc,setDesc]=useState("");const [monto,setMonto]=useState("");
  return(
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" style={{maxWidth:380}} onClick={e=>e.stopPropagation()}>
        <div style={{fontSize:14,fontWeight:700,color:"#fff",marginBottom:4}}>Nuevo pedido a {proveedor.nombre}</div>
        <div style={{fontSize:12,color:"#555",marginBottom:20}}>Se registra como pendiente hasta que lo marcás como recibido.</div>
        <div style={{marginBottom:12}}><div className="lbl">Descripción del pedido</div><input className="inp" autoFocus value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Ej: 3 rollos PLA negro 1kg"/></div>
        <div style={{marginBottom:16}}><div className="lbl">Monto estimado (ARS)</div><input className="inp" type="number" value={monto} onChange={e=>setMonto(e.target.value)}/></div>
        <div style={{display:"flex",gap:8}}><button className="btn" style={{flex:1}} onClick={()=>{if(!desc.trim())return;onSave(desc,monto);}}>Registrar pedido</button><button className="btn-ghost" onClick={onClose}>Cancelar</button></div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FINANZAS
// ─────────────────────────────────────────────────────────────────────────────
function Finanzas({ventas,productos,insumos}) {
  const [periodo,setPeriodo]=useState("mes");
  const filtrar=vs=>{
    const now=new Date();
    return vs.filter(v=>{
      if(!v.fecha||v.estado==="Cancelado") return false;
      const d=new Date(v.fecha);
      if(periodo==="mes") return d.getMonth()===now.getMonth()&&d.getFullYear()===now.getFullYear();
      if(periodo==="3m") return (now-d)<90*24*60*60*1000;
      if(periodo==="año") return d.getFullYear()===now.getFullYear();
      return true;
    });
  };
  const ventasFiltradas=filtrar(ventas);
  const ingresoTotal=ventasFiltradas.reduce((a,v)=>a+Number(v.precioTotal||0),0);
  const cantidadVentas=ventasFiltradas.length;
  const ticketPromedio=cantidadVentas>0?ingresoTotal/cantidadVentas:0;
  const porCanal=CANALES.map(c=>({canal:c,total:ventasFiltradas.filter(v=>v.canal===c).reduce((a,v)=>a+Number(v.precioTotal||0),0),count:ventasFiltradas.filter(v=>v.canal===c).length})).filter(c=>c.count>0).sort((a,b)=>b.total-a.total);
  const meses=Array.from({length:6},(_,i)=>{
    const d=new Date();d.setMonth(d.getMonth()-5+i);
    const key=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;
    const label=d.toLocaleString("es-AR",{month:"short"}).toUpperCase();
    const total=ventas.filter(v=>v.fecha?.startsWith(key)&&v.estado!=="Cancelado").reduce((a,v)=>a+Number(v.precioTotal||0),0);
    return {label,total};
  });
  const maxTotal=Math.max(...meses.map(m=>m.total),1);
  const valorInventario=productos.reduce((a,p)=>a+(Number(p.stock)||0)*(Number(p.precioVenta)||0),0);
  const valorInsumos=insumos.reduce((a,ins)=>a+(Number(ins.stock)||0)*(Number(ins.precioUnitario)||0),0);
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
        <div className="section-title" style={{marginBottom:0}}>Resumen financiero</div>
        <div style={{display:"flex",gap:6}}>
          {[["mes","Este mes"],["3m","3 meses"],["año","Este año"],["todo","Todo"]].map(([v,l])=>(
            <button key={v} onClick={()=>setPeriodo(v)}
              style={{background:periodo===v?"#4b7d0b18":"none",border:`1px solid ${periodo===v?"#4b7d0b44":"#252525"}`,borderRadius:6,padding:"5px 12px",fontSize:11,color:periodo===v?"#4b7d0b":"#444",cursor:"pointer",fontFamily:"Montserrat,sans-serif",fontWeight:600}}>{l}</button>
          ))}
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:16}}>
        {[{label:"Ingresos",val:fmtARS(ingresoTotal),sub:`${cantidadVentas} venta${cantidadVentas!==1?"s":""}`,color:"#4b7d0b"},{label:"Ticket promedio",val:fmtARS(ticketPromedio),sub:"por venta",color:"#4b7d0b"},{label:"Inventario productos",val:fmtARS(valorInventario),sub:"valor stock terminado",color:"#6644aa"}].map((s,i)=>(
          <div key={i} className="card" style={{padding:18}}>
            <div style={{fontSize:24,fontWeight:800,color:s.color,letterSpacing:"-0.02em",lineHeight:1}}>{s.val}</div>
            <div style={{fontSize:10,color:"#555",letterSpacing:".08em",textTransform:"uppercase",marginTop:8,fontWeight:600}}>{s.label}</div>
            <div style={{fontSize:10,color:"#333",marginTop:2}}>{s.sub}</div>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <div className="card" style={{padding:18}}>
          <div style={{fontSize:10,color:"#444",letterSpacing:".1em",textTransform:"uppercase",marginBottom:18,fontWeight:600}}>Ventas mensuales (ARS)</div>
          <div style={{display:"flex",gap:6,alignItems:"flex-end",height:80}}>
            {meses.map((m,i)=>(
              <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>
                {m.total>0&&<div style={{fontSize:9,color:"#bbb",fontWeight:600}}>{fmtARS(m.total).replace("$","")}</div>}
                <div style={{width:"100%",borderRadius:3,background:m.total>0?"#4b7d0b":"#1a1a1a",height:`${Math.max(4,(m.total/maxTotal)*70)}px`,transition:"height .3s"}}/>
                <div style={{fontSize:9,color:"#333",fontWeight:600}}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{padding:18}}>
          <div style={{fontSize:10,color:"#444",letterSpacing:".1em",textTransform:"uppercase",marginBottom:14,fontWeight:600}}>Ventas por canal</div>
          {porCanal.length===0?<div style={{fontSize:12,color:"#333",padding:"20px 0",textAlign:"center"}}>Sin ventas en este período</div>:porCanal.map(c=>(
            <div key={c.canal} style={{marginBottom:8}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                <span style={{fontSize:11,color:"#888",fontWeight:600}}>{c.canal}</span>
                <span style={{fontSize:11,color:"#4b7d0b",fontWeight:700}}>{fmtARS(c.total)}</span>
              </div>
              <div style={{height:3,background:"#1a1a1a",borderRadius:2}}><div style={{height:"100%",background:"#4b7d0b",borderRadius:2,width:`${(c.total/ingresoTotal)*100}%`}}/></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// APP RAÍZ — ROUTER PRINCIPAL
// ═════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [screen,setScreen]=useState("home");
  if(screen==="lenga")  return <AppLenga  onBack={()=>setScreen("home")}/>;
  if(screen==="wuly")   return <AppWuly   onBack={()=>setScreen("home")}/>;
  if(screen==="granja") return <AppGranja onBack={()=>setScreen("home")}/>;
  return <HomeHub onSelect={setScreen}/>;
}