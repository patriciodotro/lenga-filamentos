import { useState, useEffect, useMemo } from "react";

const STOCK_MINIMO = 100;
const DB_KEY    = "lenga_fil_db";
const MOV_KEY   = "lenga_fil_mov";
const MAEST_KEY = "lenga_maestros";
const LOGO_SRC  = "data:image/jpeg;base64,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";

const MAESTROS_DEFAULT = {
  materiales: ["PLA", "PETG", "ABS", "TPU", "ASA", "Support", "Resina"],
  tipos:      ["Normal", "Traslucido", "Wood", "Metal", "ART", "Fluo", "Flex", "Boutique"],
  marcas:     ["Grilon3", "PrintaLot", "Bamboo", "Elegoo", "Polymaker", "eSUN"],
  colores:    ["Amarillo","Ambar","Arrayan","Blanco","Blanco Calido","Bordo","Caliza","Cobre","Dorado","Dulce de Leche","Gris","Marron","Nafta Super","Naranja","Natural","Negro","Piedra","Piel 720","Pino","Tan","Verde","Verde Militar"],
  estantes:   ["Estante Alto", "Estante Medio", "Estante Bajo"],
  posiciones: ["AD 1","AD 2","AD 3","AD 4","AD 5","AD 6","AD 7","AD 8","AD 9","AD 10","AT 1","AT 2","AT 3","AT 4","AT 5","AT 6","AT 7","AT 8","AT 9","AT 10","AT 1 2","AT 2 3","AT 3 4","AT 5 6","AT 6 7","AT 7 8","AT 8 9","AT 7 8 9","AT 2 3 4","AD 1 2 3","AD 6 7"],
};

const STOCK_INICIAL = [
  { material:"PLA",     tipo:"Normal",     marca:"Grilon3", color:"Amarillo",        stockGramos:561.5,  precioUltimo:15000, pesoUnitario:1000, estante:"Estante Bajo",  posicion:"AD 5" },
  { material:"PLA",     tipo:"Traslucido", marca:"Grilon3", color:"Ambar",           stockGramos:1673,   precioUltimo:15000, pesoUnitario:1000, estante:"Estante Alto",  posicion:"AT 5 6" },
  { material:"PLA",     tipo:"Wood",       marca:"Grilon3", color:"Arrayan",         stockGramos:882,    precioUltimo:18000, pesoUnitario:1000, estante:"Estante Alto",  posicion:"AD 5" },
  { material:"PLA",     tipo:"Normal",     marca:"Grilon3", color:"Blanco",          stockGramos:29.7,   precioUltimo:15000, pesoUnitario:1000, estante:"Estante Bajo",  posicion:"AT 7" },
  { material:"PLA",     tipo:"Normal",     marca:"Grilon3", color:"Blanco Calido",   stockGramos:2140,   precioUltimo:15000, pesoUnitario:1000, estante:"Estante Bajo",  posicion:"AD 1 2 3" },
  { material:"PLA",     tipo:"Normal",     marca:"Grilon3", color:"Bordo",           stockGramos:363.9,  precioUltimo:15000, pesoUnitario:1000, estante:"Estante Bajo",  posicion:"AD 6" },
  { material:"PLA",     tipo:"ART",        marca:"Grilon3", color:"Caliza",          stockGramos:515,    precioUltimo:18000, pesoUnitario:1000, estante:"Estante Alto",  posicion:"AT 10" },
  { material:"PLA",     tipo:"Metal",      marca:"Grilon3", color:"Cobre",           stockGramos:230,    precioUltimo:18000, pesoUnitario:1000, estante:"Estante Alto",  posicion:"AD 8" },
  { material:"PLA",     tipo:"Metal",      marca:"Grilon3", color:"Dorado",          stockGramos:188,    precioUltimo:18000, pesoUnitario:1000, estante:"Estante Alto",  posicion:"AD 3" },
  { material:"PLA",     tipo:"Boutique",   marca:"Grilon3", color:"Dulce de Leche",  stockGramos:77.5,   precioUltimo:20000, pesoUnitario:1000, estante:"Estante Bajo",  posicion:"AD 7" },
  { material:"PLA",     tipo:"Normal",     marca:"Grilon3", color:"Gris",            stockGramos:1000,   precioUltimo:15000, pesoUnitario:1000, estante:"Estante Alto",  posicion:"AD 1" },
  { material:"PETG",    tipo:"Normal",     marca:"Grilon3", color:"Gris",            stockGramos:66,     precioUltimo:18000, pesoUnitario:1000, estante:"Estante Bajo",  posicion:"AT 3" },
  { material:"PLA",     tipo:"Normal",     marca:"Grilon3", color:"Marron",          stockGramos:532.7,  precioUltimo:15000, pesoUnitario:1000, estante:"Estante Bajo",  posicion:"AD 8" },
  { material:"PLA",     tipo:"Normal",     marca:"Grilon3", color:"Nafta Super",     stockGramos:511,    precioUltimo:15000, pesoUnitario:1000, estante:"Estante Alto",  posicion:"AD 4" },
  { material:"PLA",     tipo:"Fluo",       marca:"Grilon3", color:"Naranja",         stockGramos:65,     precioUltimo:16000, pesoUnitario:1000, estante:"Estante Bajo",  posicion:"AD 4" },
  { material:"PLA",     tipo:"Traslucido", marca:"Grilon3", color:"Natural",         stockGramos:2683,   precioUltimo:15000, pesoUnitario:1000, estante:"Estante Alto",  posicion:"AT 2 3 4" },
  { material:"PLA",     tipo:"Traslucido", marca:"Grilon3", color:"Natural",         stockGramos:303.5,  precioUltimo:15000, pesoUnitario:1000, estante:"Estante Alto",  posicion:"AT 1" },
  { material:"Support", tipo:"Traslucido", marca:"Grilon3", color:"Natural",         stockGramos:257,    precioUltimo:20000, pesoUnitario:1000, estante:"Estante Bajo",  posicion:"AT 2" },
  { material:"PLA",     tipo:"Normal",     marca:"Grilon3", color:"Negro",           stockGramos:222,    precioUltimo:15000, pesoUnitario:1000, estante:"Estante Bajo",  posicion:"AT 8" },
  { material:"ABS",     tipo:"Normal",     marca:"Grilon3", color:"Negro",           stockGramos:238.5,  precioUltimo:16000, pesoUnitario:1000, estante:"Estante Bajo",  posicion:"AT 4" },
  { material:"PLA",     tipo:"Flex",       marca:"Grilon3", color:"Negro",           stockGramos:922,    precioUltimo:20000, pesoUnitario:1000, estante:"Estante Bajo",  posicion:"AT 1" },
  { material:"PETG",    tipo:"Normal",     marca:"Grilon3", color:"Negro",           stockGramos:67,     precioUltimo:18000, pesoUnitario:1000, estante:"Estante Bajo",  posicion:"AT 5" },
  { material:"PETG",    tipo:"Normal",     marca:"Grilon3", color:"Negro",           stockGramos:78.5,   precioUltimo:18000, pesoUnitario:1000, estante:"Estante Medio", posicion:"AT 2 3" },
  { material:"PLA",     tipo:"ART",        marca:"Grilon3", color:"Piedra",          stockGramos:1582.5, precioUltimo:18000, pesoUnitario:1000, estante:"Estante Alto",  posicion:"AT 7 8 9" },
  { material:"PLA",     tipo:"Normal",     marca:"Grilon3", color:"Piel 720",        stockGramos:828.5,  precioUltimo:15000, pesoUnitario:1000, estante:"Estante Alto",  posicion:"AD 9" },
  { material:"PLA",     tipo:"Wood",       marca:"Grilon3", color:"Pino",            stockGramos:440.5,  precioUltimo:18000, pesoUnitario:1000, estante:"Estante Alto",  posicion:"AD 6 7" },
  { material:"PLA",     tipo:"Normal",     marca:"Grilon3", color:"Tan",             stockGramos:686,    precioUltimo:15000, pesoUnitario:1000, estante:"Estante Alto",  posicion:"AD 10" },
  { material:"PLA",     tipo:"Normal",     marca:"Grilon3", color:"Verde",           stockGramos:72,     precioUltimo:15000, pesoUnitario:1000, estante:"Estante Bajo",  posicion:"AT 6" },
  { material:"PLA",     tipo:"Metal",      marca:"Grilon3", color:"Verde Militar",   stockGramos:956,    precioUltimo:18000, pesoUnitario:1000, estante:"Estante Alto",  posicion:"AD 2" },
].map((f,i) => ({ ...f, key: `fil_${i}_${f.material}_${f.color}`.toLowerCase().replace(/\s/g,"_") }));

function fmtG(n) { return String(parseFloat(n.toFixed(1))).replace(".",","); }
function fmtARS(n) { return "$" + Math.round(n).toLocaleString("es-AR"); }
function loadLS(key, def) { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch { return def; } }
function saveLS(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }

// Parse "AD 1 2 3" → { prefix:"AD", nums:["1","2","3"] }
function parsePosicion(pos) {
  if (!pos) return null;
  const parts = pos.trim().split(/\s+/);
  if (parts.length < 2) return { prefix: pos, nums: [] };
  const prefix = parts[0];
  const nums = parts.slice(1);
  return { prefix, nums };
}

function PosicionBadge({ posicion, estante }) {
  const ESTANTE_COLOR = { "Estante Alto":"#4b7d0b", "Estante Medio":"#a07000", "Estante Bajo":"#1a6b8a" };
  const ec = ESTANTE_COLOR[estante] || "#555";
  const parsed = parsePosicion(posicion);
  if (!parsed) return null;
  return (
    <div style={{display:"flex",flexWrap:"wrap",gap:3,alignItems:"center"}}>
      {estante && (
        <span style={{fontSize:10,padding:"2px 7px",borderRadius:4,background:`${ec}18`,border:`1px solid ${ec}40`,color:ec,fontWeight:700,letterSpacing:".04em"}}>
          {estante.replace("Estante ","")}
        </span>
      )}
      {parsed.prefix && (
        <span style={{fontSize:10,padding:"2px 7px",borderRadius:4,background:"#1a1a1a",border:"1px solid #2a2a2a",color:"#888",fontWeight:700,letterSpacing:".04em"}}>
          {parsed.prefix}
        </span>
      )}
      {parsed.nums.map(n => (
        <span key={n} style={{fontSize:10,padding:"2px 6px",borderRadius:4,background:"#111",border:"1px solid #252525",color:"#666",fontWeight:600}}>
          {n}
        </span>
      ))}
    </div>
  );
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0d0d0d; font-family: 'Montserrat', sans-serif; }
  input, select, textarea { outline: none; -webkit-appearance: none; appearance: none; font-family: 'Montserrat', sans-serif; }
  input:focus, select:focus { border-color: #4b7d0b !important; box-shadow: 0 0 0 3px #4b7d0b22 !important; }
  .tab { background: none; border: none; cursor: pointer; font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 600; padding: 14px 16px; color: #444; transition: all .2s; letter-spacing: .06em; border-bottom: 2px solid transparent; white-space: nowrap; text-transform: uppercase; }
  .tab.on { color: #4b7d0b; border-bottom-color: #4b7d0b; }
  .tab:hover { color: #aaa; }
  .card { background: #141414; border: 1px solid #1e1e1e; border-radius: 12px; padding: 24px; }
  .lbl { font-size: 10px; letter-spacing: .1em; color: #555; margin-bottom: 7px; text-transform: uppercase; font-weight: 600; }
  .inp { width: 100%; background: #0d0d0d; border: 1px solid #252525; border-radius: 8px; padding: 11px 14px; color: #e0e0e0; font-family: 'Montserrat', sans-serif; font-size: 13px; transition: all .2s; }
  .inp::placeholder { color: #333; }
  select.inp option { background: #141414; color: #e0e0e0; }
  .btn { background: #4b7d0b; color: #fff; border: none; border-radius: 8px; padding: 13px 28px; font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 700; cursor: pointer; letter-spacing: .06em; text-transform: uppercase; transition: all .2s; width: 100%; }
  .btn:hover { background: #5d9a0e; transform: translateY(-1px); }
  .btn:active { transform: translateY(0); }
  .btn-add { background: none; border: 1px solid #333; border-radius: 6px; padding: 6px 12px; color: #666; font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 600; cursor: pointer; transition: all .2s; display: flex; align-items: center; gap: 5px; white-space: nowrap; }
  .btn-add:hover { border-color: #4b7d0b; color: #4b7d0b; }
  .btn-icon { background: none; border: none; cursor: pointer; padding: 3px 6px; font-size: 13px; transition: all .2s; line-height: 1; border-radius: 4px; }
  .btn-icon:hover { background: #1a1a1a; }
  .btn-sm { background: none; border: 1px solid #cc444433; color: #cc6666; border-radius: 6px; padding: 5px 10px; font-size: 11px; font-family: 'Montserrat', sans-serif; cursor: pointer; transition: all .2s; font-weight: 600; }
  .btn-sm:hover { background: #cc333311; }
  .sort-th { cursor: pointer; user-select: none; transition: color .15s; }
  .sort-th:hover { color: #aaa !important; }
  .bar { height: 3px; background: #1a1a1a; border-radius: 2px; overflow: hidden; margin-top: 8px; }
  .bar-fill { height: 100%; border-radius: 2px; transition: width .6s; }
  .tag { display: inline-flex; align-items: center; gap: 4px; background: #1a1a1a; border: 1px solid #252525; border-radius: 6px; padding: 4px 4px 4px 10px; font-size: 12px; color: #aaa; }
  .section-title { font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 20px; letter-spacing: -.01em; }
  .modal-overlay { position: fixed; inset: 0; background: #000000cc; z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; }
  .modal { background: #141414; border: 1px solid #2a2a2a; border-radius: 14px; padding: 28px; width: 100%; max-width: 380px; }
  .imp-row { background: #0d0d0d; border: 1px solid #222; border-radius: 10px; padding: 14px; margin-bottom: 10px; }
  .search-suggestion { padding: 8px 14px; cursor: pointer; font-size: 13px; color: #aaa; transition: background .15s; }
  .search-suggestion:hover { background: #1a1a1a; color: #e0e0e0; }
  ::-webkit-scrollbar { width: 3px; } ::-webkit-scrollbar-track { background: #0d0d0d; } ::-webkit-scrollbar-thumb { background: #222; border-radius: 2px; }
  @media (max-width: 640px) {
    .stats-grid { grid-template-columns: 1fr 1fr !important; }
    .charts-grid { grid-template-columns: 1fr !important; }
    .form-grid { grid-template-columns: 1fr !important; }
    .maest-grid { grid-template-columns: 1fr !important; }
    .header-inner { flex-direction: column; align-items: flex-start !important; }
    .tabs-row { overflow-x: auto; width: 100%; }
  }
`;

export default function App() {
  const [tab, setTab]               = useState("dashboard");
  const [filamentos, setFilamentos] = useState([]);
  const [movimientos, setMovs]      = useState([]);
  const [maestros, setMaestros]     = useState(MAESTROS_DEFAULT);
  const [loaded, setLoaded]         = useState(false);
  const [toast, setToast]           = useState(null);

  useEffect(() => {
    const f  = loadLS(DB_KEY, null);
    const m  = loadLS(MOV_KEY, []);
    const ma = loadLS(MAEST_KEY, null);
    // Migration: fix color names that had position appended in old versions
    const COLOR_FIX = {
      "Natural AT1":"Natural","Natural AT2-3-4":"Natural","Natural (Alto)":"Natural","Natural (Bajo)":"Natural",
      "Negro AT5":"Negro","Negro AT2-3":"Negro","Negro (Bajo)":"Negro","Negro (Medio)":"Negro",
    };
    const fixColor = c => COLOR_FIX[c] || c;
    const filData = f && f.length > 0 ? f.map(x=>({...x,color:fixColor(x.color)})) : STOCK_INICIAL;
    const movData = (m||[]).map(x=>({...x,color:fixColor(x.color)}));
    saveLS(DB_KEY, filData); saveLS(MOV_KEY, movData);
    setFilamentos(filData); setMovs(movData);
    setMaestros(ma || MAESTROS_DEFAULT);
    setLoaded(true);
  }, []);

  const saveFil  = d => { setFilamentos(d); saveLS(DB_KEY, d); };
  const saveMov  = d => { setMovs(d);       saveLS(MOV_KEY, d); };
  const saveMaes = d => { setMaestros(d);   saveLS(MAEST_KEY, d); };
  const toast_   = msg => { setToast(msg);  setTimeout(() => setToast(null), 3000); };

  const handleRename = (lista, oldVal, newVal) => {
    const fm = { materiales:"material", tipos:"tipo", marcas:"marca", colores:"color", estantes:"estante", posiciones:"posicion" };
    const field = fm[lista];
    saveFil(filamentos.map(f => f[field]===oldVal ? {...f,[field]:newVal} : f));
    saveMov(movimientos.map(m => { const mf=field==="tipo"?"tipo_fil":field; return m[mf]===oldVal?{...m,[mf]:newVal}:m; }));
    saveMaes({...maestros,[lista]:maestros[lista].map(x=>x===oldVal?newVal:x)});
    toast_(`✓ "${oldVal}" → "${newVal}" actualizado en todos los registros`);
  };

  const handleCompra = c => {
    const key = `fil_${Date.now()}`;
    const pesoTotal = c.pesoUnitario * c.cantidad;
    saveFil([...filamentos,{key,material:c.material,tipo:c.tipo,marca:c.marca,color:c.color,stockGramos:pesoTotal,precioUltimo:c.precio,pesoUnitario:c.pesoUnitario,estante:c.estante,posicion:c.posicion}]);
    saveMov([...movimientos,{id:Date.now(),tipo:"compra",fecha:new Date().toISOString(),key,material:c.material,tipo_fil:c.tipo,marca:c.marca,color:c.color,gramos:pesoTotal,precio:c.precio,cantidad:c.cantidad}]);
    toast_(`✓ ${c.cantidad} bobina${c.cantidad>1?"s":""} de ${c.color} ${c.material} agregada${c.cantidad>1?"s":""}`);
  };

  const handleImpresion = (lineas) => {
    const newFils=[...filamentos]; const newMovs=[...movimientos]; const id=Date.now();
    lineas.forEach((imp,i)=>{
      const idx=newFils.findIndex(f=>f.key===imp.key);
      if(idx>=0) newFils[idx]={...newFils[idx],stockGramos:Math.max(0,newFils[idx].stockGramos-imp.gramos)};
      const fil=filamentos.find(f=>f.key===imp.key);
      newMovs.push({id:id+i,tipo:"impresion",fecha:new Date().toISOString(),key:imp.key,material:fil.material,tipo_fil:fil.tipo,marca:fil.marca,color:fil.color,gramos:imp.gramos,grupoId:id});
    });
    saveFil(newFils); saveMov(newMovs);
    const total=lineas.reduce((a,l)=>a+l.gramos,0);
    toast_(`✓ Impresión: ${lineas.length} filamento${lineas.length>1?"s":""}, ${fmtG(total)}g en total`);
  };

  if (!loaded) return <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:"#0d0d0d",color:"#4b7d0b",fontFamily:"Montserrat,sans-serif",fontSize:13,letterSpacing:"0.1em",fontWeight:600}}>CARGANDO...</div>;

  return (
    <div style={{minHeight:"100vh",background:"#0d0d0d",color:"#e0e0e0",fontFamily:"'Montserrat',sans-serif"}}>
      <style>{CSS}</style>
      {toast && <div style={{position:"fixed",top:16,right:16,background:"#0d1a00",border:"1px solid #4b7d0b55",borderRadius:10,padding:"12px 18px",fontSize:12,color:"#6fb010",zIndex:9999,boxShadow:"0 8px 32px #00000077",maxWidth:340,fontWeight:600}}>{toast}</div>}
      <div style={{maxWidth:1060,margin:"0 auto",padding:"0 20px"}}>
        <div style={{borderBottom:"1px solid #1a1a1a",paddingTop:20}}>
          <div className="header-inner" style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8,paddingBottom:0}}>
            <img src={LOGO_SRC} alt="Lenga" style={{height:44,objectFit:"contain",marginBottom:4}}/>
            <div className="tabs-row" style={{display:"flex"}}>
              {[["dashboard","Dashboard"],["compra","Compra"],["impresion","Impresión"],["historial","Historial"],["maestros","Maestros"]].map(([id,label])=>(
                <button key={id} className={`tab${tab===id?" on":""}`} onClick={()=>setTab(id)}>{label}</button>
              ))}
            </div>
          </div>
        </div>
        <div style={{paddingTop:28,paddingBottom:48}}>
          {tab==="dashboard"  && <Dashboard filamentos={filamentos} movimientos={movimientos}/>}
          {tab==="compra"     && <FormCompra maestros={maestros} onSubmit={handleCompra}/>}
          {tab==="impresion"  && <FormImpresion filamentos={filamentos} onSubmit={handleImpresion}/>}
          {tab==="historial"  && <Historial movimientos={movimientos}/>}
          {tab==="maestros"   && <Maestros maestros={maestros}
            onAdd={(l,v)=>saveMaes({...maestros,[l]:[...maestros[l],v]})}
            onDelete={(l,v)=>saveMaes({...maestros,[l]:maestros[l].filter(x=>x!==v)})}
            onRename={handleRename}/>}
        </div>
      </div>
    </div>
  );
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function Dashboard({ filamentos, movimientos }) {
  const totalStock      = filamentos.reduce((a,f)=>a+f.stockGramos,0);
  const valorInventario = filamentos.reduce((a,f)=>a+(f.precioUltimo/f.pesoUnitario)*f.stockGramos,0);
  const alertas  = filamentos.filter(f=>f.stockGramos>0&&f.stockGramos<STOCK_MINIMO).length;
  const agotados = filamentos.filter(f=>f.stockGramos===0).length;

  const meses = Array.from({length:6},(_,i)=>{
    const d=new Date(); d.setMonth(d.getMonth()-5+i);
    const key=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;
    const label=d.toLocaleString("es-AR",{month:"short"}).toUpperCase();
    const gramos=movimientos.filter(m=>m.tipo==="impresion"&&m.fecha.startsWith(key)).reduce((a,m)=>a+m.gramos,0);
    return {label,gramos};
  });
  const maxG=Math.max(...meses.map(m=>m.gramos),1);
  const porMat=filamentos.reduce((acc,f)=>{acc[f.material]=(acc[f.material]||0)+f.stockGramos;return acc;},{});

  // Sort & filter state
  const [sortCol,setSortCol] = useState("color");
  const [sortDir,setSortDir] = useState("asc");
  const [searchColor,setSearchColor] = useState("");
  const [searchMarca,setSearchMarca] = useState("");
  const [searchTipo,setSearchTipo]   = useState("");
  const [showSug,setShowSug]         = useState(false);

  const allColors = [...new Set(filamentos.map(f=>f.color))].sort();
  const suggestions = searchColor.length > 0
    ? allColors.filter(c=>c.toLowerCase().includes(searchColor.toLowerCase()))
    : [];

  const filtered = useMemo(()=>{
    return filamentos.filter(f=>{
      const mc = !searchColor || f.color.toLowerCase().includes(searchColor.toLowerCase());
      const mm = !searchMarca || f.marca.toLowerCase().includes(searchMarca.toLowerCase());
      const mt = !searchTipo  || f.tipo.toLowerCase().includes(searchTipo.toLowerCase());
      return mc && mm && mt;
    });
  },[filamentos,searchColor,searchMarca,searchTipo]);

  const sorted = useMemo(()=>{
    const arr=[...filtered];
    arr.sort((a,b)=>{
      let va=a[sortCol], vb=b[sortCol];
      if(sortCol==="stockGramos"||sortCol==="precioUltimo"){ va=Number(va); vb=Number(vb); }
      else { va=String(va).toLowerCase(); vb=String(vb).toLowerCase(); }
      if(va<vb) return sortDir==="asc"?-1:1;
      if(va>vb) return sortDir==="asc"?1:-1;
      return 0;
    });
    return arr;
  },[filtered,sortCol,sortDir]);

  const toggleSort = col => {
    if(sortCol===col) setSortDir(d=>d==="asc"?"desc":"asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const SortArrow = ({col}) => {
    if(sortCol!==col) return <span style={{color:"#2a2a2a",marginLeft:3}}>↕</span>;
    return <span style={{color:"#4b7d0b",marginLeft:3}}>{sortDir==="asc"?"↑":"↓"}</span>;
  };

  const TH = ({col,label,style={}}) => (
    <div className="sort-th" style={{fontSize:9,color:"#444",letterSpacing:".08em",textTransform:"uppercase",fontWeight:600,cursor:"pointer",...style}} onClick={()=>toggleSort(col)}>
      {label}<SortArrow col={col}/>
    </div>
  );

  const cols = "1.4fr 0.7fr 0.7fr 0.8fr 1fr 1.6fr 0.7fr";

  return (
    <div>
      <div className="section-title">Resumen general</div>
      <div className="stats-grid" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:16}}>
        {[
          {label:"Stock total",      val:`${fmtG(totalStock/1000)} kg`,sub:`${filamentos.length} tipos`,color:"#4b7d0b"},
          {label:"Valor inventario", val:fmtARS(valorInventario),sub:"ARS estimado",color:"#4b7d0b"},
          {label:"Stock bajo",       val:alertas,  sub:"tipos < 100g",color:alertas>0?"#cc4444":"#333"},
          {label:"Agotados",         val:agotados, sub:"sin stock",   color:agotados>0?"#cc4444":"#333"},
        ].map((s,i)=>(
          <div key={i} className="card" style={{padding:18}}>
            <div style={{fontSize:26,fontWeight:800,color:s.color,letterSpacing:"-0.02em",lineHeight:1}}>{s.val}</div>
            <div style={{fontSize:10,color:"#555",letterSpacing:".08em",textTransform:"uppercase",marginTop:8,fontWeight:600}}>{s.label}</div>
            <div style={{fontSize:10,color:"#333",marginTop:2}}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="charts-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
        <div className="card">
          <div style={{fontSize:10,color:"#444",letterSpacing:".1em",textTransform:"uppercase",marginBottom:18,fontWeight:600}}>Consumo mensual (g)</div>
          <div style={{display:"flex",gap:6,alignItems:"flex-end",height:80}}>
            {meses.map((m,i)=>(
              <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>
                {m.gramos>0&&<div style={{fontSize:9,color:"#666",fontWeight:600}}>{fmtG(m.gramos)}</div>}
                <div style={{width:"100%",borderRadius:3,background:m.gramos>0?"#4b7d0b":"#1a1a1a",height:`${Math.max(m.gramos>0?8:3,(m.gramos/maxG)*60)}px`,transition:"height .6s"}}/>
                <div style={{fontSize:9,color:"#444",fontWeight:600}}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div style={{fontSize:10,color:"#444",letterSpacing:".1em",textTransform:"uppercase",marginBottom:16,fontWeight:600}}>Stock por material</div>
          {Object.entries(porMat).map(([mat,g])=>(
            <div key={mat} style={{marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:5}}>
                <span style={{color:"#aaa",fontWeight:500}}>{mat}</span>
                <span style={{color:"#4b7d0b",fontWeight:600}}>{fmtG(g)}g</span>
              </div>
              <div className="bar"><div className="bar-fill" style={{width:`${Math.min(100,(g/totalStock)*100)||0}%`,background:"#4b7d0b"}}/></div>
            </div>
          ))}
          {filamentos.length===0&&<div style={{color:"#333",fontSize:12}}>Sin datos</div>}
        </div>
      </div>

      <div className="card">
        {/* Search bar */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:16}}>
          <div style={{position:"relative"}}>
            <div className="lbl">Buscar por color</div>
            <input className="inp" style={{padding:"8px 12px",fontSize:12}} placeholder="Ej: Negro..." value={searchColor}
              onChange={e=>{setSearchColor(e.target.value);setShowSug(true);}}
              onFocus={()=>setShowSug(true)}
              onBlur={()=>setTimeout(()=>setShowSug(false),150)}
            />
            {showSug&&suggestions.length>0&&(
              <div style={{position:"absolute",top:"100%",left:0,right:0,background:"#141414",border:"1px solid #252525",borderRadius:8,zIndex:100,maxHeight:180,overflowY:"auto",marginTop:2}}>
                {suggestions.map(s=>(
                  <div key={s} className="search-suggestion" onMouseDown={()=>{setSearchColor(s);setShowSug(false);}}>{s}</div>
                ))}
              </div>
            )}
          </div>
          <div>
            <div className="lbl">Filtrar por marca</div>
            <input className="inp" style={{padding:"8px 12px",fontSize:12}} placeholder="Ej: Grilon3..." value={searchMarca} onChange={e=>setSearchMarca(e.target.value)}/>
          </div>
          <div>
            <div className="lbl">Filtrar por tipo</div>
            <input className="inp" style={{padding:"8px 12px",fontSize:12}} placeholder="Ej: Wood..." value={searchTipo} onChange={e=>setSearchTipo(e.target.value)}/>
          </div>
        </div>
        {(searchColor||searchMarca||searchTipo)&&(
          <div style={{marginBottom:12,display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:11,color:"#555"}}>{sorted.length} resultado{sorted.length!==1?"s":""}</span>
            <button onClick={()=>{setSearchColor("");setSearchMarca("");setSearchTipo("");}} style={{fontSize:10,background:"none",border:"1px solid #333",borderRadius:4,padding:"2px 8px",color:"#666",cursor:"pointer",fontFamily:"Montserrat,sans-serif"}}>Limpiar filtros</button>
          </div>
        )}

        <div style={{display:"grid",gridTemplateColumns:cols,gap:10,padding:"0 0 10px",borderBottom:"1px solid #1e1e1e",marginBottom:2}}>
          <TH col="color"        label="Color"/>
          <TH col="material"     label="Material"/>
          <TH col="tipo"         label="Tipo"/>
          <TH col="marca"        label="Marca"/>
          <TH col="stockGramos"  label="Stock"/>
          <div style={{fontSize:9,color:"#333",letterSpacing:".08em",textTransform:"uppercase",fontWeight:600}}>Ubicación</div>
          <TH col="precioUltimo" label="Valor" style={{textAlign:"right"}}/>
        </div>

        {sorted.length===0
          ?<div style={{color:"#333",fontSize:13,textAlign:"center",padding:"20px 0"}}>Sin resultados.</div>
          :sorted.map(f=>{
            const pct=Math.min(100,(f.stockGramos/f.pesoUnitario)*100);
            const bajo=f.stockGramos>0&&f.stockGramos<STOCK_MINIMO;
            return (
              <div key={f.key} style={{display:"grid",gridTemplateColumns:cols,gap:10,alignItems:"center",borderBottom:"1px solid #1a1a1a",padding:"12px 0"}}>
                <div style={{fontSize:13,color:"#e0e0e0",fontWeight:600}}>{f.color}</div>
                <div style={{fontSize:11,color:"#666",fontWeight:500}}>{f.material}</div>
                <div style={{fontSize:10,color:"#444",fontWeight:500}}>{f.tipo}</div>
                <div style={{fontSize:11,color:"#666",fontWeight:500}}>{f.marca}</div>
                <div>
                  <div style={{fontSize:13,color:bajo?"#cc4444":f.stockGramos===0?"#aa2222":"#4b7d0b",fontWeight:700}}>
                    {fmtG(f.stockGramos)}g
                    {bajo&&<span style={{fontSize:9,marginLeft:4,color:"#cc4444"}}>⚠</span>}
                    {f.stockGramos===0&&<span style={{fontSize:9,marginLeft:4}}>AGOTADO</span>}
                  </div>
                  <div className="bar"><div className="bar-fill" style={{width:`${pct}%`,background:bajo?"#cc4444":"#4b7d0b"}}/></div>
                </div>
                <PosicionBadge posicion={f.posicion} estante={f.estante}/>
                <div style={{fontSize:11,color:"#444",textAlign:"right",fontWeight:500}}>{fmtARS(f.precioUltimo/f.pesoUnitario*f.stockGramos)}</div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

// ── FORM COMPRA ───────────────────────────────────────────────────────────────
function FormCompra({ maestros, onSubmit }) {
  const empty = {material:"",tipo:"",marca:"",color:"",cantidad:1,pesoUnitario:1000,precio:"",estante:"",posicion:""};
  const [form,setForm] = useState(empty);
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const Sel=({lbl,k,opts})=>(
    <div><div className="lbl">{lbl}</div>
      <select className="inp" value={form[k]} onChange={e=>set(k,e.target.value)}>
        <option value="">— Seleccioná —</option>
        {opts.map(o=><option key={o}>{o}</option>)}
      </select>
    </div>
  );
  const submit=()=>{
    if(!form.material||!form.tipo||!form.marca||!form.color||!form.estante||!form.posicion||!form.precio) return alert("Completá todos los campos.");
    onSubmit({...form,cantidad:Number(form.cantidad),pesoUnitario:Number(form.pesoUnitario),precio:Number(form.precio)});
    setForm(empty);
  };
  return (
    <div style={{maxWidth:580}}>
      <div className="section-title">Registrar compra</div>
      <div className="card" style={{display:"flex",flexDirection:"column",gap:16}}>
        <div className="form-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          <Sel lbl="Material"  k="material"  opts={maestros.materiales}/>
          <Sel lbl="Tipo"      k="tipo"       opts={maestros.tipos}/>
          <Sel lbl="Marca"     k="marca"      opts={maestros.marcas}/>
          <Sel lbl="Color"     k="color"      opts={maestros.colores}/>
          <div><div className="lbl">Cantidad de bobinas</div><input className="inp" type="number" min={1} value={form.cantidad} onChange={e=>set("cantidad",e.target.value)}/></div>
          <div><div className="lbl">Peso por bobina (g)</div><input className="inp" type="number" min={1} value={form.pesoUnitario} onChange={e=>set("pesoUnitario",e.target.value)}/></div>
          <div><div className="lbl">Precio total pagado (ARS)</div><input className="inp" type="number" min={0} placeholder="Ej: 15000" value={form.precio} onChange={e=>set("precio",e.target.value)}/></div>
          <Sel lbl="Estante"   k="estante"    opts={maestros.estantes}/>
          <Sel lbl="Posición"  k="posicion"   opts={maestros.posiciones}/>
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

// ── FORM IMPRESION ────────────────────────────────────────────────────────────
function FormImpresion({ filamentos, onSubmit }) {
  const disponibles = filamentos.filter(f=>f.stockGramos>0);
  const emptyLinea = {key:"",gramos:""};
  const [lineas,setLineas] = useState([{...emptyLinea}]);
  const setLinea=(i,k,v)=>setLineas(ls=>ls.map((l,idx)=>idx===i?{...l,[k]:v}:l));
  const addLinea=()=>setLineas(ls=>[...ls,{...emptyLinea}]);
  const removeLinea=i=>setLineas(ls=>ls.filter((_,idx)=>idx!==i));
  const totalGramos=lineas.reduce((a,l)=>a+(Number(l.gramos)||0),0);
  const submit=()=>{
    const validas=lineas.filter(l=>l.key&&l.gramos&&Number(l.gramos)>0);
    if(validas.length===0) return alert("Agregá al menos un filamento con gramos.");
    for(const l of validas){ const fil=filamentos.find(f=>f.key===l.key); if(Number(l.gramos)>fil.stockGramos) return alert(`Stock insuficiente para ${fil.color}. Disponible: ${fmtG(fil.stockGramos)}g`); }
    onSubmit(validas.map(l=>({key:l.key,gramos:Number(l.gramos)})));
    setLineas([{...emptyLinea}]);
  };
  return (
    <div style={{maxWidth:560}}>
      <div className="section-title">Registrar impresión</div>
      <div className="card" style={{display:"flex",flexDirection:"column",gap:14}}>
        {disponibles.length===0
          ?<div style={{color:"#444",fontSize:13,padding:"8px 0"}}>No hay filamentos con stock disponible.</div>
          :<>
            {lineas.map((linea,i)=>{
              const fil=filamentos.find(f=>f.key===linea.key);
              const restante=fil&&linea.gramos?Math.max(0,fil.stockGramos-Number(linea.gramos)):null;
              return (
                <div key={i} className="imp-row">
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                    <span style={{fontSize:11,color:"#555",fontWeight:700,letterSpacing:".06em"}}>FILAMENTO {i+1}</span>
                    {lineas.length>1&&<button className="btn-sm" onClick={()=>removeLinea(i)}>Quitar</button>}
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    <div style={{gridColumn:"1/-1"}}>
                      <div className="lbl">Filamento</div>
                      <select className="inp" value={linea.key} onChange={e=>setLinea(i,"key",e.target.value)}>
                        <option value="">— Seleccioná —</option>
                        {disponibles.map(f=><option key={f.key} value={f.key}>{f.color} · {f.tipo} · {f.material} · {f.marca} ({fmtG(f.stockGramos)}g){f.posicion?` — ${f.posicion}`:""}</option>)}
                      </select>
                    </div>
                    <div>
                      <div className="lbl">Gramos utilizados</div>
                      <input className="inp" type="number" min={1} placeholder="Ej: 45" value={linea.gramos} onChange={e=>setLinea(i,"gramos",e.target.value)}/>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
                      {fil&&<div style={{fontSize:11,color:"#555",padding:"11px 14px",background:"#141414",borderRadius:8,border:"1px solid #1e1e1e"}}>
                        Stock: <span style={{color:"#4b7d0b",fontWeight:700}}>{fmtG(fil.stockGramos)}g</span>
                        {fil.posicion&&<span style={{marginLeft:10,color:"#444"}}>📍 {fil.posicion}</span>}
                      </div>}
                    </div>
                  </div>
                  {fil&&linea.gramos&&restante!==null&&(
                    <div style={{marginTop:8,fontSize:11,color:"#555",padding:"8px 12px",background:"#141414",borderRadius:6,border:`1px solid ${restante<STOCK_MINIMO?"#cc444433":"#1e1e1e"}`}}>
                      Restante: <span style={{color:restante<STOCK_MINIMO?"#cc4444":"#4b7d0b",fontWeight:700}}>{fmtG(restante)}g</span>
                      {restante<STOCK_MINIMO&&<span style={{color:"#cc4444",marginLeft:8,fontSize:10}}>⚠ quedará bajo stock</span>}
                    </div>
                  )}
                </div>
              );
            })}
            <button className="btn-add" style={{alignSelf:"flex-start"}} onClick={addLinea}>+ Agregar otro filamento</button>
            {lineas.length>1&&totalGramos>0&&(
              <div style={{fontSize:12,color:"#555",padding:"10px 14px",background:"#0d0d0d",borderRadius:8,border:"1px solid #1e1e1e"}}>
                Total impresión: <span style={{color:"#4b7d0b",fontWeight:700}}>{fmtG(totalGramos)}g</span>
              </div>
            )}
            <button className="btn" onClick={submit}>Registrar impresión</button>
          </>
        }
      </div>
    </div>
  );
}

// ── HISTORIAL ─────────────────────────────────────────────────────────────────
function Historial({ movimientos }) {
  const sorted=[...movimientos].sort((a,b)=>new Date(b.fecha)-new Date(a.fecha));
  const rows=[]; const seen=new Set();
  sorted.forEach(m=>{
    if(m.tipo==="compra"){rows.push({type:"compra",data:m});return;}
    if(m.grupoId){ if(seen.has(m.grupoId))return; seen.add(m.grupoId); const grupo=sorted.filter(x=>x.grupoId===m.grupoId); rows.push({type:"impresion_grupo",data:grupo,fecha:m.fecha,id:m.grupoId}); }
    else { rows.push({type:"impresion",data:m}); }
  });
  return (
    <div>
      <div className="section-title">Historial de movimientos</div>
      <div className="card">
        {rows.length===0
          ?<div style={{color:"#333",fontSize:13,textAlign:"center",padding:"20px 0"}}>Sin movimientos registrados.</div>
          :rows.map((row,ri)=>{
            if(row.type==="compra"){const m=row.data;return(
              <div key={m.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderBottom:"1px solid #1a1a1a"}}>
                <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
                  <span style={{fontSize:9,padding:"3px 8px",borderRadius:4,letterSpacing:".06em",fontWeight:700,background:"#4b7d0b18",color:"#4b7d0b",border:"1px solid #4b7d0b33"}}>COMPRA</span>
                  <div><span style={{fontSize:13,color:"#ccc",fontWeight:500}}>{m.color} {m.material}</span><span style={{fontSize:11,color:"#444",marginLeft:8}}>{m.tipo_fil}</span><span style={{fontSize:11,color:"#333",marginLeft:8}}>{m.marca}</span><span style={{fontSize:10,color:"#444",marginLeft:8}}>{m.cantidad} bobina{m.cantidad>1?"s":""}</span></div>
                </div>
                <div style={{textAlign:"right",flexShrink:0,marginLeft:12}}>
                  <div style={{fontSize:13,fontWeight:700,color:"#4b7d0b"}}>+{fmtG(m.gramos)}g</div>
                  <div style={{fontSize:10,color:"#333",marginTop:2}}>{new Date(m.fecha).toLocaleDateString("es-AR",{day:"2-digit",month:"short",year:"numeric"})}</div>
                </div>
              </div>
            );}
            if(row.type==="impresion_grupo"){const grupo=row.data;const total=grupo.reduce((a,x)=>a+x.gramos,0);return(
              <div key={row.id} style={{padding:"12px 0",borderBottom:"1px solid #1a1a1a"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div style={{display:"flex",alignItems:"center",gap:12}}><span style={{fontSize:9,padding:"3px 8px",borderRadius:4,letterSpacing:".06em",fontWeight:700,background:"#ffffff08",color:"#777",border:"1px solid #252525"}}>IMPRESIÓN</span><span style={{fontSize:11,color:"#555",fontWeight:500}}>{grupo.length} filamento{grupo.length>1?"s":""}</span></div>
                  <div style={{textAlign:"right",flexShrink:0,marginLeft:12}}>
                    <div style={{fontSize:13,fontWeight:700,color:"#cc5555"}}>-{fmtG(total)}g</div>
                    <div style={{fontSize:10,color:"#333",marginTop:2}}>{new Date(row.fecha).toLocaleDateString("es-AR",{day:"2-digit",month:"short",year:"numeric"})}</div>
                  </div>
                </div>
                <div style={{marginTop:6,paddingLeft:8,borderLeft:"2px solid #252525",marginLeft:4}}>
                  {grupo.map(x=>(<div key={x.id} style={{fontSize:11,color:"#555",padding:"2px 0"}}><span style={{color:"#aaa",fontWeight:500}}>{x.color} {x.material}</span><span style={{color:"#cc5555",marginLeft:8,fontWeight:600}}>-{fmtG(x.gramos)}g</span><span style={{color:"#333",marginLeft:8}}>{x.marca}</span></div>))}
                </div>
              </div>
            );}
            const m=row.data;return(
              <div key={m.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderBottom:"1px solid #1a1a1a"}}>
                <div style={{display:"flex",alignItems:"center",gap:12}}><span style={{fontSize:9,padding:"3px 8px",borderRadius:4,letterSpacing:".06em",fontWeight:700,background:"#ffffff08",color:"#777",border:"1px solid #252525"}}>IMPRESIÓN</span><div><span style={{fontSize:13,color:"#ccc",fontWeight:500}}>{m.color} {m.material}</span></div></div>
                <div style={{textAlign:"right",flexShrink:0,marginLeft:12}}><div style={{fontSize:13,fontWeight:700,color:"#cc5555"}}>-{fmtG(m.gramos)}g</div><div style={{fontSize:10,color:"#333",marginTop:2}}>{new Date(m.fecha).toLocaleDateString("es-AR",{day:"2-digit",month:"short",year:"numeric"})}</div></div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

// ── EDIT MODAL ────────────────────────────────────────────────────────────────
function EditModal({ value, onSave, onClose }) {
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

// ── MAESTROS ──────────────────────────────────────────────────────────────────
function Maestros({ maestros, onAdd, onDelete, onRename }) {
  const [newVals,setNewVals]=useState({materiales:"",tipos:"",marcas:"",colores:"",estantes:"",posiciones:""});
  const [editing,setEditing]=useState(null);
  const add=lista=>{const val=newVals[lista].trim();if(!val)return;if(maestros[lista].includes(val))return alert("Ya existe.");onAdd(lista,val);setNewVals(v=>({...v,[lista]:""}));};
  const saveEdit=nv=>{const t=nv.trim();if(!t)return;if(t===editing.value){setEditing(null);return;}if(maestros[editing.lista].includes(t)){alert("Ya existe.");return;}onRename(editing.lista,editing.value,t);setEditing(null);};
  const LISTAS=[{key:"materiales",label:"Materiales"},{key:"tipos",label:"Tipos de filamento"},{key:"marcas",label:"Marcas"},{key:"colores",label:"Colores"},{key:"estantes",label:"Estantes"},{key:"posiciones",label:"Posiciones"}];
  return (
    <div>
      {editing&&<EditModal value={editing.value} onSave={saveEdit} onClose={()=>setEditing(null)}/>}
      <div className="section-title">Maestros</div>
      <div className="maest-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        {LISTAS.map(({key,label})=>(
          <div key={key} className="card">
            <div style={{fontSize:12,color:"#aaa",fontWeight:700,marginBottom:14,letterSpacing:".04em",textTransform:"uppercase"}}>{label}</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14,minHeight:32}}>
              {maestros[key].map(item=>(
                <span key={item} className="tag">
                  {item}
                  <button className="btn-icon" title="Editar" onClick={()=>setEditing({lista:key,value:item})} style={{color:"#4b7d0b"}}>✎</button>
                  <button className="btn-icon" title="Eliminar" onClick={()=>{if(window.confirm(`¿Eliminás "${item}"?`))onDelete(key,item);}} style={{color:"#555"}}>×</button>
                </span>
              ))}
              {maestros[key].length===0&&<span style={{fontSize:11,color:"#333"}}>Sin elementos</span>}
            </div>
            <div style={{display:"flex",gap:8}}>
              <input className="inp" style={{flex:1,padding:"8px 12px",fontSize:12}} placeholder={`Agregar ${label.toLowerCase()}...`} value={newVals[key]} onChange={e=>setNewVals(v=>({...v,[key]:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&add(key)}/>
              <button className="btn-add" onClick={()=>add(key)}>+ Agregar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
