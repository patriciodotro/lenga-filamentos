import { useState, useEffect } from "react";

const STOCK_MINIMO = 100;
const DB_KEY    = "lenga_fil_db";
const MOV_KEY   = "lenga_fil_mov";
const MAEST_KEY = "lenga_maestros";

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

function loadLS(key, def) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch { return def; }
}
function saveLS(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0a0a; }
  input, select, textarea { outline: none; -webkit-appearance: none; appearance: none; }
  input:focus, select:focus { border-color: #e8ff00 !important; box-shadow: 0 0 0 3px #e8ff0015 !important; }
  .tab { background: none; border: none; cursor: pointer; font-family: 'DM Mono', monospace; font-size: 12px; padding: 14px 16px; color: #444; transition: all .2s; letter-spacing: .08em; border-bottom: 2px solid transparent; white-space: nowrap; }
  .tab.on { color: #e8ff00; border-bottom-color: #e8ff00; }
  .tab:hover { color: #aaa; }
  .card { background: #111; border: 1px solid #1e1e1e; border-radius: 14px; padding: 24px; }
  .lbl { font-size: 10px; letter-spacing: .12em; color: #555; margin-bottom: 7px; text-transform: uppercase; font-family: 'DM Mono', monospace; }
  .inp { width: 100%; background: #0a0a0a; border: 1px solid #222; border-radius: 8px; padding: 11px 14px; color: #e0e0e0; font-family: 'DM Mono', monospace; font-size: 13px; transition: all .2s; }
  .inp::placeholder { color: #333; }
  .inp-sm { background: #0a0a0a; border: 1px solid #222; border-radius: 6px; padding: 5px 10px; color: #e0e0e0; font-family: 'DM Mono', monospace; font-size: 12px; transition: all .2s; }
  .inp-sm:focus { border-color: #e8ff00 !important; outline: none; }
  select.inp option { background: #111; color: #e0e0e0; }
  .btn { background: #e8ff00; color: #0a0a0a; border: none; border-radius: 8px; padding: 13px 28px; font-family: 'DM Mono', monospace; font-size: 12px; font-weight: 500; cursor: pointer; letter-spacing: .06em; transition: all .2s; width: 100%; }
  .btn:hover { background: #fff; transform: translateY(-1px); }
  .btn:active { transform: translateY(0); }
  .btn-add { background: none; border: 1px solid #333; border-radius: 6px; padding: 6px 12px; color: #666; font-family: 'DM Mono', monospace; font-size: 11px; cursor: pointer; transition: all .2s; display: flex; align-items: center; gap: 5px; white-space: nowrap; }
  .btn-add:hover { border-color: #e8ff00; color: #e8ff00; }
  .btn-icon { background: none; border: none; cursor: pointer; padding: 3px 6px; font-size: 13px; transition: all .2s; line-height: 1; border-radius: 4px; }
  .btn-icon:hover { background: #1a1a1a; }
  .bar { height: 3px; background: #1a1a1a; border-radius: 2px; overflow: hidden; margin-top: 8px; }
  .bar-fill { height: 100%; border-radius: 2px; transition: width .6s; }
  .loc-badge { display: inline-flex; align-items: center; gap: 4px; border-radius: 5px; padding: 2px 7px; font-size: 10px; letter-spacing: .05em; font-family: 'DM Mono', monospace; }
  .tag { display: inline-flex; align-items: center; gap: 4px; background: #161616; border: 1px solid #222; border-radius: 6px; padding: 4px 4px 4px 10px; font-size: 12px; color: #aaa; }
  .section-title { font-family: 'Syne', sans-serif; font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 20px; }
  .modal-overlay { position: fixed; inset: 0; background: #000000cc; z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; }
  .modal { background: #111; border: 1px solid #2a2a2a; border-radius: 14px; padding: 28px; width: 100%; max-width: 360px; }
  ::-webkit-scrollbar { width: 3px; } ::-webkit-scrollbar-track { background: #0a0a0a; } ::-webkit-scrollbar-thumb { background: #222; border-radius: 2px; }
  @media (max-width: 640px) {
    .stats-grid { grid-template-columns: 1fr 1fr !important; }
    .charts-grid { grid-template-columns: 1fr !important; }
    .tbl-row { grid-template-columns: 1fr 1fr !important; }
    .form-grid { grid-template-columns: 1fr !important; }
    .maest-grid { grid-template-columns: 1fr !important; }
    .header-inner { flex-direction: column; align-items: flex-start !important; }
    .tabs-row { overflow-x: auto; width: 100%; }
  }
`;

const ESTANTE_COLOR = { "Estante Alto":"#e8ff00", "Estante Medio":"#ffaa00", "Estante Bajo":"#66aaff" };

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
    setFilamentos(f && f.length > 0 ? f : STOCK_INICIAL);
    if (!f || f.length === 0) saveLS(DB_KEY, STOCK_INICIAL);
    setMovs(m);
    setMaestros(ma || MAESTROS_DEFAULT);
    setLoaded(true);
  }, []);

  const saveFil  = d => { setFilamentos(d); saveLS(DB_KEY, d); };
  const saveMov  = d => { setMovs(d);       saveLS(MOV_KEY, d); };
  const saveMaes = d => { setMaestros(d);   saveLS(MAEST_KEY, d); };
  const toast_   = msg => { setToast(msg);  setTimeout(() => setToast(null), 2800); };

  // Rename propagates to filamentos + movimientos
  const handleRename = (lista, oldVal, newVal) => {
    const fieldMap = {
      materiales: "material",
      tipos:      "tipo",
      marcas:     "marca",
      colores:    "color",
      estantes:   "estante",
      posiciones: "posicion",
    };
    const field = fieldMap[lista];
    const newFils = filamentos.map(f => f[field] === oldVal ? { ...f, [field]: newVal } : f);
    const newMovs = movimientos.map(m => {
      const mField = field === "tipo" ? "tipo_fil" : field;
      return m[mField] === oldVal ? { ...m, [mField]: newVal } : m;
    });
    saveFil(newFils);
    saveMov(newMovs);
    const newMaest = { ...maestros, [lista]: maestros[lista].map(x => x === oldVal ? newVal : x) };
    saveMaes(newMaest);
    toast_(`✓ "${oldVal}" renombrado a "${newVal}" en todos los registros`);
  };

  const handleDelete = (lista, val) => {
    const newMaest = { ...maestros, [lista]: maestros[lista].filter(x => x !== val) };
    saveMaes(newMaest);
  };

  const handleAdd = (lista, val) => {
    const newMaest = { ...maestros, [lista]: [...maestros[lista], val] };
    saveMaes(newMaest);
  };

  const handleCompra = c => {
    const key = `fil_${Date.now()}`;
    const pesoTotal = c.pesoUnitario * c.cantidad;
    saveFil([...filamentos, { key, material:c.material, tipo:c.tipo, marca:c.marca, color:c.color, stockGramos:pesoTotal, precioUltimo:c.precio, pesoUnitario:c.pesoUnitario, estante:c.estante, posicion:c.posicion }]);
    saveMov([...movimientos, { id:Date.now(), tipo:"compra", fecha:new Date().toISOString(), key, material:c.material, tipo_fil:c.tipo, marca:c.marca, color:c.color, gramos:pesoTotal, precio:c.precio, cantidad:c.cantidad }]);
    toast_(`✓ ${c.cantidad} bobina${c.cantidad>1?"s":""} de ${c.color} ${c.material} agregada${c.cantidad>1?"s":""}`);
  };

  const handleImpresion = imp => {
    const fil = filamentos.find(f => f.key === imp.key);
    saveFil(filamentos.map(f => f.key===imp.key ? {...f, stockGramos:Math.max(0,f.stockGramos-imp.gramos)} : f));
    saveMov([...movimientos, { id:Date.now(), tipo:"impresion", fecha:new Date().toISOString(), key:imp.key, material:fil.material, tipo_fil:fil.tipo, marca:fil.marca, color:fil.color, gramos:imp.gramos }]);
    toast_(`✓ ${imp.gramos}g descontados de ${fil.color} ${fil.material}`);
  };

  if (!loaded) return <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:"#0a0a0a",color:"#e8ff00",fontFamily:"monospace",fontSize:13,letterSpacing:"0.1em"}}>CARGANDO...</div>;

  return (
    <div style={{minHeight:"100vh",background:"#0a0a0a",color:"#e0e0e0",fontFamily:"'DM Mono',monospace"}}>
      <style>{CSS}</style>
      {toast && <div style={{position:"fixed",top:16,right:16,background:"#0f1a00",border:"1px solid #e8ff0033",borderRadius:10,padding:"12px 18px",fontSize:12,color:"#e8ff00",zIndex:9999,letterSpacing:"0.04em",boxShadow:"0 8px 32px #00000066",maxWidth:320}}>{toast}</div>}

      <div style={{maxWidth:980,margin:"0 auto",padding:"0 20px"}}>
        <div style={{borderBottom:"1px solid #161616",paddingTop:24}}>
          <div className="header-inner" style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
            <div style={{paddingBottom:16}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,color:"#e8ff00",letterSpacing:"-0.02em",lineHeight:1}}>LENGA</div>
              <div style={{fontSize:10,color:"#333",letterSpacing:".14em",marginTop:3}}>FILAMENT TRACKER</div>
            </div>
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
          {tab==="maestros"   && <Maestros maestros={maestros} onAdd={handleAdd} onDelete={handleDelete} onRename={handleRename}/>}
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

  return (
    <div>
      <div className="section-title">Resumen general</div>
      <div className="stats-grid" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:16}}>
        {[
          {label:"Stock total",      val:`${(totalStock/1000).toFixed(2)} kg`,sub:`${filamentos.length} tipos`,color:"#e8ff00"},
          {label:"Valor inventario", val:`$${Math.round(valorInventario).toLocaleString("es-AR")}`,sub:"ARS estimado",color:"#e8ff00"},
          {label:"Stock bajo",       val:alertas,  sub:"tipos < 100g",color:alertas>0?"#ff6b6b":"#333"},
          {label:"Agotados",         val:agotados, sub:"sin stock",   color:agotados>0?"#ff6b6b":"#333"},
        ].map((s,i)=>(
          <div key={i} className="card" style={{padding:18}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:26,fontWeight:800,color:s.color,letterSpacing:"-0.02em",lineHeight:1}}>{s.val}</div>
            <div style={{fontSize:10,color:"#555",letterSpacing:".1em",textTransform:"uppercase",marginTop:6}}>{s.label}</div>
            <div style={{fontSize:10,color:"#333",marginTop:2}}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="charts-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
        <div className="card">
          <div style={{fontSize:10,color:"#444",letterSpacing:".12em",textTransform:"uppercase",marginBottom:18}}>Consumo mensual (g)</div>
          <div style={{display:"flex",gap:6,alignItems:"flex-end",height:72}}>
            {meses.map((m,i)=>(
              <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>
                {m.gramos>0&&<div style={{fontSize:9,color:"#666"}}>{m.gramos}</div>}
                <div style={{width:"100%",borderRadius:3,background:m.gramos>0?"#e8ff00":"#1a1a1a",height:`${Math.max(m.gramos>0?8:3,(m.gramos/maxG)*52)}px`,transition:"height .6s"}}/>
                <div style={{fontSize:9,color:"#444"}}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div style={{fontSize:10,color:"#444",letterSpacing:".12em",textTransform:"uppercase",marginBottom:16}}>Stock por material</div>
          {Object.entries(porMat).map(([mat,g])=>(
            <div key={mat} style={{marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:5}}>
                <span style={{color:"#aaa"}}>{mat}</span><span style={{color:"#e8ff00"}}>{g}g</span>
              </div>
              <div className="bar"><div className="bar-fill" style={{width:`${Math.min(100,(g/totalStock)*100)||0}%`,background:"#e8ff00"}}/></div>
            </div>
          ))}
          {filamentos.length===0&&<div style={{color:"#333",fontSize:12}}>Sin datos</div>}
        </div>
      </div>

      <div className="card">
        <div style={{fontSize:10,color:"#444",letterSpacing:".12em",textTransform:"uppercase",marginBottom:14}}>Detalle de stock</div>
        <div style={{display:"grid",gridTemplateColumns:"1.4fr 0.7fr 0.7fr 0.8fr 1fr 1.4fr 0.7fr",gap:10,padding:"0 0 10px",borderBottom:"1px solid #1a1a1a",marginBottom:2}}>
          {["Color","Material","Tipo","Marca","Stock","Ubicación","Valor"].map(h=>(
            <div key={h} style={{fontSize:9,color:"#333",letterSpacing:".1em",textTransform:"uppercase"}}>{h}</div>
          ))}
        </div>
        {filamentos.length===0
          ?<div style={{color:"#333",fontSize:13,textAlign:"center",padding:"16px 0"}}>Cargá tu primer filamento usando la pestaña Compra.</div>
          :filamentos.map(f=>{
            const pct=Math.min(100,(f.stockGramos/f.pesoUnitario)*100);
            const bajo=f.stockGramos>0&&f.stockGramos<STOCK_MINIMO;
            const ec=ESTANTE_COLOR[f.estante]||"#555";
            return (
              <div key={f.key} className="tbl-row" style={{display:"grid",gridTemplateColumns:"1.4fr 0.7fr 0.7fr 0.8fr 1fr 1.4fr 0.7fr",gap:10,alignItems:"center",borderBottom:"1px solid #161616",padding:"11px 0"}}>
                <div style={{fontSize:13,color:"#e0e0e0",fontWeight:500}}>{f.color}</div>
                <div style={{fontSize:11,color:"#555"}}>{f.material}</div>
                <div style={{fontSize:10,color:"#444"}}>{f.tipo}</div>
                <div style={{fontSize:10,color:"#444"}}>{f.marca}</div>
                <div>
                  <div style={{fontSize:13,color:bajo?"#ff6b6b":f.stockGramos===0?"#ff4444":"#e8ff00",fontWeight:500}}>
                    {f.stockGramos}g
                    {bajo&&<span style={{fontSize:9,marginLeft:4}}>⚠</span>}
                    {f.stockGramos===0&&<span style={{fontSize:9,marginLeft:4}}>AGOTADO</span>}
                  </div>
                  <div className="bar"><div className="bar-fill" style={{width:`${pct}%`,background:bajo?"#ff3b3b":"#e8ff00"}}/></div>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:3}}>
                  {f.estante&&<span className="loc-badge" style={{background:`${ec}15`,border:`1px solid ${ec}33`,color:ec}}>{f.estante.replace("Estante ","")}</span>}
                  {f.posicion&&<span className="loc-badge" style={{background:"#161616",border:"1px solid #222",color:"#666"}}>📍 {f.posicion}</span>}
                </div>
                <div style={{fontSize:11,color:"#333",textAlign:"right"}}>${Math.round(f.precioUltimo/f.pesoUnitario*f.stockGramos).toLocaleString()}</div>
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

  const submit=()=>{
    if(!form.material||!form.tipo||!form.marca||!form.color||!form.estante||!form.posicion||!form.precio)
      return alert("Completá todos los campos.");
    onSubmit({...form,cantidad:Number(form.cantidad),pesoUnitario:Number(form.pesoUnitario),precio:Number(form.precio)});
    setForm(empty);
  };

  const Sel=({lbl,k,opts})=>(
    <div>
      <div className="lbl">{lbl}</div>
      <select className="inp" value={form[k]} onChange={e=>set(k,e.target.value)}>
        <option value="">— Seleccioná —</option>
        {opts.map(o=><option key={o}>{o}</option>)}
      </select>
    </div>
  );

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
        <div style={{background:"#0a0a0a",borderRadius:8,padding:"10px 14px",fontSize:12,color:"#555",border:"1px solid #1a1a1a"}}>
          Total a incorporar: <span style={{color:"#e8ff00"}}>{Number(form.pesoUnitario||0)*Number(form.cantidad||0)}g</span>
          {form.precio&&Number(form.pesoUnitario)>0&&<span style={{marginLeft:16}}>Precio/g: <span style={{color:"#e8ff00"}}>${(Number(form.precio)/(Number(form.pesoUnitario)*Number(form.cantidad||1))).toFixed(1)}</span></span>}
        </div>
        <button className="btn" onClick={submit}>Registrar compra</button>
      </div>
    </div>
  );
}

// ── FORM IMPRESION ────────────────────────────────────────────────────────────
function FormImpresion({ filamentos, onSubmit }) {
  const disponibles=filamentos.filter(f=>f.stockGramos>0);
  const [sel,setSel]=useState("");
  const [gramos,setGramos]=useState("");
  const fil=filamentos.find(f=>f.key===sel);
  const restante=fil?Math.max(0,fil.stockGramos-Number(gramos)):null;
  const submit=()=>{
    if(!sel||!gramos) return alert("Seleccioná un filamento e ingresá los gramos.");
    if(Number(gramos)>fil.stockGramos) return alert(`Stock insuficiente. Disponible: ${fil.stockGramos}g`);
    onSubmit({key:sel,gramos:Number(gramos)});
    setGramos("");setSel("");
  };
  return (
    <div style={{maxWidth:500}}>
      <div className="section-title">Registrar impresión</div>
      <div className="card" style={{display:"flex",flexDirection:"column",gap:16}}>
        {disponibles.length===0
          ?<div style={{color:"#444",fontSize:13,padding:"8px 0"}}>No hay filamentos con stock disponible.</div>
          :<>
            <div>
              <div className="lbl">Filamento utilizado</div>
              <select className="inp" value={sel} onChange={e=>setSel(e.target.value)}>
                <option value="">— Seleccioná un filamento —</option>
                {disponibles.map(f=><option key={f.key} value={f.key}>{f.color} · {f.tipo} · {f.material} · {f.marca} ({f.stockGramos}g){f.posicion?` — ${f.posicion}`:""}</option>)}
              </select>
            </div>
            {fil&&<div style={{background:"#0a0a0a",borderRadius:8,padding:"10px 14px",fontSize:12,color:"#555",border:"1px solid #1a1a1a",display:"flex",gap:16,flexWrap:"wrap"}}>
              <span>Stock: <span style={{color:"#e8ff00"}}>{fil.stockGramos}g</span></span>
              {fil.estante&&<span>Ubicación: <span style={{color:"#e8ff00"}}>{fil.estante} — {fil.posicion}</span></span>}
            </div>}
            <div>
              <div className="lbl">Gramos utilizados</div>
              <input className="inp" type="number" min={1} placeholder="Ej: 45" value={gramos} onChange={e=>setGramos(e.target.value)}/>
            </div>
            {fil&&gramos&&<div style={{background:"#0a0a0a",borderRadius:8,padding:"10px 14px",fontSize:12,color:"#555",border:`1px solid ${restante<STOCK_MINIMO?"#ff3b3b33":"#1a1a1a"}`}}>
              Stock restante: <span style={{color:restante<STOCK_MINIMO?"#ff6b6b":"#e8ff00"}}>{restante}g</span>
              {restante<STOCK_MINIMO&&Number(gramos)<=fil.stockGramos&&<span style={{color:"#ff4444",marginLeft:8,fontSize:10}}>⚠ quedará bajo stock</span>}
            </div>}
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
  return (
    <div>
      <div className="section-title">Historial de movimientos</div>
      <div className="card">
        {sorted.length===0
          ?<div style={{color:"#333",fontSize:13,textAlign:"center",padding:"20px 0"}}>Sin movimientos registrados.</div>
          :sorted.map(m=>(
            <div key={m.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderBottom:"1px solid #161616"}}>
              <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
                <span style={{fontSize:9,padding:"3px 8px",borderRadius:4,letterSpacing:".08em",fontWeight:500,background:m.tipo==="compra"?"#e8ff0015":"#ffffff08",color:m.tipo==="compra"?"#e8ff00":"#888",border:`1px solid ${m.tipo==="compra"?"#e8ff0033":"#222"}`}}>
                  {m.tipo==="compra"?"COMPRA":"IMPRESIÓN"}
                </span>
                <div>
                  <span style={{fontSize:13,color:"#ccc"}}>{m.color} {m.material}</span>
                  <span style={{fontSize:11,color:"#444",marginLeft:8}}>{m.tipo_fil}</span>
                  {m.marca&&<span style={{fontSize:11,color:"#333",marginLeft:8}}>{m.marca}</span>}
                  {m.tipo==="compra"&&<span style={{fontSize:10,color:"#444",marginLeft:8}}>{m.cantidad} bobina{m.cantidad>1?"s":""}</span>}
                </div>
              </div>
              <div style={{textAlign:"right",flexShrink:0,marginLeft:12}}>
                <div style={{fontSize:13,fontWeight:500,color:m.tipo==="compra"?"#e8ff00":"#ff8080"}}>{m.tipo==="compra"?"+":"-"}{m.gramos}g</div>
                <div style={{fontSize:10,color:"#333",marginTop:2}}>{new Date(m.fecha).toLocaleDateString("es-AR",{day:"2-digit",month:"short",year:"numeric"})}</div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

// ── MAESTROS ──────────────────────────────────────────────────────────────────
function EditModal({ value, onSave, onClose }) {
  const [val, setVal] = useState(value);
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div style={{fontSize:13,color:"#aaa",marginBottom:16}}>Editar valor</div>
        <input
          className="inp"
          value={val}
          onChange={e=>setVal(e.target.value)}
          onKeyDown={e=>{ if(e.key==="Enter") onSave(val); if(e.key==="Escape") onClose(); }}
          autoFocus
        />
        <div style={{display:"flex",gap:8,marginTop:14}}>
          <button
            onClick={()=>onSave(val)}
            style={{flex:1,background:"#e8ff00",color:"#0a0a0a",border:"none",borderRadius:8,padding:"10px",fontFamily:"'DM Mono',monospace",fontSize:12,cursor:"pointer",fontWeight:500}}
          >
            Guardar
          </button>
          <button
            onClick={onClose}
            style={{flex:1,background:"none",color:"#666",border:"1px solid #333",borderRadius:8,padding:"10px",fontFamily:"'DM Mono',monospace",fontSize:12,cursor:"pointer"}}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

function Maestros({ maestros, onAdd, onDelete, onRename }) {
  const [newVals, setNewVals] = useState({materiales:"",tipos:"",marcas:"",colores:"",estantes:"",posiciones:""});
  const [editing, setEditing] = useState(null); // { lista, value }

  const add = lista => {
    const val = newVals[lista].trim();
    if (!val) return;
    if (maestros[lista].includes(val)) return alert("Ya existe en la lista.");
    onAdd(lista, val);
    setNewVals(v=>({...v,[lista]:""}));
  };

  const startEdit = (lista, value) => setEditing({ lista, value });

  const saveEdit = newVal => {
    const trimmed = newVal.trim();
    if (!trimmed) return;
    if (trimmed === editing.value) { setEditing(null); return; }
    if (maestros[editing.lista].includes(trimmed)) { alert("Ya existe ese valor."); return; }
    onRename(editing.lista, editing.value, trimmed);
    setEditing(null);
  };

  const LISTAS = [
    { key:"materiales", label:"Materiales" },
    { key:"tipos",      label:"Tipos de filamento" },
    { key:"marcas",     label:"Marcas" },
    { key:"colores",    label:"Colores" },
    { key:"estantes",   label:"Estantes" },
    { key:"posiciones", label:"Posiciones" },
  ];

  return (
    <div>
      {editing && (
        <EditModal
          value={editing.value}
          onSave={saveEdit}
          onClose={()=>setEditing(null)}
        />
      )}
      <div className="section-title">Maestros</div>
      <div className="maest-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        {LISTAS.map(({key,label})=>(
          <div key={key} className="card">
            <div style={{fontSize:12,color:"#aaa",fontWeight:500,marginBottom:14,letterSpacing:".04em"}}>{label}</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14,minHeight:32}}>
              {maestros[key].map(item=>(
                <span key={item} className="tag">
                  {item}
                  <button
                    className="btn-icon"
                    title="Editar"
                    onClick={()=>startEdit(key,item)}
                    style={{color:"#555"}}
                  >✎</button>
                  <button
                    className="btn-icon"
                    title="Eliminar"
                    onClick={()=>{ if(window.confirm(`¿Eliminás "${item}"?`)) onDelete(key,item); }}
                    style={{color:"#444"}}
                  >×</button>
                </span>
              ))}
              {maestros[key].length===0&&<span style={{fontSize:11,color:"#333"}}>Sin elementos</span>}
            </div>
            <div style={{display:"flex",gap:8}}>
              <input
                className="inp"
                style={{flex:1,padding:"8px 12px",fontSize:12}}
                placeholder={`Agregar ${label.toLowerCase()}...`}
                value={newVals[key]}
                onChange={e=>setNewVals(v=>({...v,[key]:e.target.value}))}
                onKeyDown={e=>e.key==="Enter"&&add(key)}
              />
              <button className="btn-add" onClick={()=>add(key)}>+ Agregar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
