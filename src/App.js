import { useState, useEffect } from "react";

const MATERIALES = ["PLA", "PETG", "ABS", "TPU", "ASA", "Resina", "Otro"];
const STOCK_MINIMO = 100;
const DB_KEY = "lenga_fil_db";
const MOV_KEY = "lenga_fil_mov";

function loadLS(key) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; } catch { return null; }
}
function saveLS(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [filamentos, setFilamentos] = useState([]);
  const [movimientos, setMovimientos] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const f = loadLS(DB_KEY);
    const m = loadLS(MOV_KEY);
    if (f) setFilamentos(f);
    if (m) setMovimientos(m);
    setLoaded(true);
  }, []);

  const saveFilamentos = (data) => { setFilamentos(data); saveLS(DB_KEY, data); };
  const saveMovimientos = (data) => { setMovimientos(data); saveLS(MOV_KEY, data); };

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2800); };

  const handleCompra = (compra) => {
    const key = `${compra.marca}__${compra.material}__${compra.color}`.toLowerCase().trim();
    const existing = filamentos.find(f => f.key === key);
    const pesoTotal = compra.pesoUnitario * compra.cantidad;
    const newFils = existing
      ? filamentos.map(f => f.key === key ? { ...f, stockGramos: f.stockGramos + pesoTotal, precioUltimo: compra.precio, pesoUnitario: compra.pesoUnitario } : f)
      : [...filamentos, { key, marca: compra.marca, material: compra.material, color: compra.color, stockGramos: pesoTotal, precioUltimo: compra.precio, pesoUnitario: compra.pesoUnitario }];
    saveFilamentos(newFils);
    saveMovimientos([...movimientos, { id: Date.now(), tipo: "compra", fecha: new Date().toISOString(), key, marca: compra.marca, material: compra.material, color: compra.color, gramos: pesoTotal, precio: compra.precio, cantidad: compra.cantidad }]);
    showToast(`✓ ${compra.cantidad} bobina${compra.cantidad > 1 ? "s" : ""} de ${compra.color} ${compra.material} agregada${compra.cantidad > 1 ? "s" : ""}`);
  };

  const handleImpresion = (imp) => {
    const fil = filamentos.find(f => f.key === imp.key);
    saveFilamentos(filamentos.map(f => f.key === imp.key ? { ...f, stockGramos: Math.max(0, f.stockGramos - imp.gramos) } : f));
    saveMovimientos([...movimientos, { id: Date.now(), tipo: "impresion", fecha: new Date().toISOString(), key: imp.key, marca: fil.marca, material: fil.material, color: fil.color, gramos: imp.gramos }]);
    showToast(`✓ ${imp.gramos}g descontados de ${fil.color} ${fil.material}`);
  };

  if (!loaded) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#0a0a0a", color: "#e8ff00", fontFamily: "monospace", fontSize: 13, letterSpacing: "0.1em" }}>
      CARGANDO...
    </div>
  );

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@600;700;800&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #0a0a0a; }
    input, select { outline: none; -webkit-appearance: none; appearance: none; }
    input:focus, select:focus { border-color: #e8ff00 !important; box-shadow: 0 0 0 3px #e8ff0015 !important; }
    .tab { background: none; border: none; cursor: pointer; font-family: 'DM Mono', monospace; font-size: 12px; padding: 14px 18px; color: #444; transition: all .2s; letter-spacing: .08em; border-bottom: 2px solid transparent; }
    .tab.on { color: #e8ff00; border-bottom-color: #e8ff00; }
    .tab:hover { color: #aaa; }
    .card { background: #111; border: 1px solid #1e1e1e; border-radius: 14px; padding: 24px; }
    .lbl { font-size: 10px; letter-spacing: .12em; color: #555; margin-bottom: 7px; text-transform: uppercase; font-family: 'DM Mono', monospace; }
    .inp { width: 100%; background: #0a0a0a; border: 1px solid #222; border-radius: 8px; padding: 11px 14px; color: #e0e0e0; font-family: 'DM Mono', monospace; font-size: 13px; transition: all .2s; }
    .inp::placeholder { color: #333; }
    select.inp option { background: #111; color: #e0e0e0; }
    .btn { background: #e8ff00; color: #0a0a0a; border: none; border-radius: 8px; padding: 13px 28px; font-family: 'DM Mono', monospace; font-size: 12px; font-weight: 500; cursor: pointer; letter-spacing: .06em; transition: all .2s; width: 100%; }
    .btn:hover { background: #fff; transform: translateY(-1px); }
    .btn:active { transform: translateY(0); }
    .bar { height: 3px; background: #1a1a1a; border-radius: 2px; overflow: hidden; margin-top: 8px; }
    .bar-fill { height: 100%; border-radius: 2px; transition: width .6s; }
    ::-webkit-scrollbar { width: 3px; } ::-webkit-scrollbar-track { background: #0a0a0a; } ::-webkit-scrollbar-thumb { background: #222; border-radius: 2px; }
    @media (max-width: 600px) {
      .stats-grid { grid-template-columns: 1fr 1fr !important; }
      .charts-grid { grid-template-columns: 1fr !important; }
      .detail-grid { grid-template-columns: 1fr 1fr !important; }
      .header-inner { flex-direction: column; align-items: flex-start !important; gap: 0 !important; }
      .tabs-row { overflow-x: auto; width: 100%; }
    }
  `;

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#e0e0e0", fontFamily: "'DM Mono', monospace" }}>
      <style>{css}</style>

      {toast && (
        <div style={{ position: "fixed", top: 16, right: 16, background: "#0f1a00", border: "1px solid #e8ff0033", borderRadius: 10, padding: "12px 18px", fontSize: 12, color: "#e8ff00", zIndex: 9999, fontFamily: "'DM Mono', monospace", letterSpacing: "0.04em", boxShadow: "0 8px 32px #00000066", maxWidth: 320 }}>
          {toast}
        </div>
      )}

      <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 20px" }}>
        {/* Header */}
        <div style={{ borderBottom: "1px solid #161616", paddingTop: 24 }}>
          <div className="header-inner" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <div style={{ paddingBottom: 16 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "#e8ff00", letterSpacing: "-0.02em", lineHeight: 1 }}>LENGA</div>
              <div style={{ fontSize: 10, color: "#333", letterSpacing: ".14em", marginTop: 3 }}>FILAMENT TRACKER</div>
            </div>
            <div className="tabs-row" style={{ display: "flex" }}>
              {[["dashboard", "Dashboard"], ["compra", "Compra"], ["impresion", "Impresión"], ["historial", "Historial"]].map(([id, label]) => (
                <button key={id} className={`tab${tab === id ? " on" : ""}`} onClick={() => setTab(id)}>{label}</button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ paddingTop: 28, paddingBottom: 48 }}>
          {tab === "dashboard" && <Dashboard filamentos={filamentos} movimientos={movimientos} />}
          {tab === "compra" && <FormCompra onSubmit={handleCompra} />}
          {tab === "impresion" && <FormImpresion filamentos={filamentos} onSubmit={handleImpresion} />}
          {tab === "historial" && <Historial movimientos={movimientos} />}
        </div>
      </div>
    </div>
  );
}

function Dashboard({ filamentos, movimientos }) {
  const totalStock = filamentos.reduce((a, f) => a + f.stockGramos, 0);
  const valorInventario = filamentos.reduce((a, f) => a + (f.precioUltimo / f.pesoUnitario) * f.stockGramos, 0);
  const alertas = filamentos.filter(f => f.stockGramos > 0 && f.stockGramos < STOCK_MINIMO).length;
  const agotados = filamentos.filter(f => f.stockGramos === 0).length;

  const meses = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(); d.setMonth(d.getMonth() - 5 + i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = d.toLocaleString("es-AR", { month: "short" }).toUpperCase();
    const gramos = movimientos.filter(m => m.tipo === "impresion" && m.fecha.startsWith(key)).reduce((a, m) => a + m.gramos, 0);
    return { label, gramos };
  });
  const maxG = Math.max(...meses.map(m => m.gramos), 1);

  const porMaterial = filamentos.reduce((acc, f) => { acc[f.material] = (acc[f.material] || 0) + f.stockGramos; return acc; }, {});

  return (
    <div>
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 20 }}>Resumen general</div>

      <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 16 }}>
        {[
          { label: "Stock total", val: `${(totalStock / 1000).toFixed(2)} kg`, sub: `${filamentos.length} tipos`, color: "#e8ff00" },
          { label: "Valor inventario", val: `$${Math.round(valorInventario).toLocaleString("es-AR")}`, sub: "ARS estimado", color: "#e8ff00" },
          { label: "Stock bajo", val: alertas, sub: "tipos < 100g", color: alertas > 0 ? "#ff6b6b" : "#333" },
          { label: "Agotados", val: agotados, sub: "sin stock", color: agotados > 0 ? "#ff6b6b" : "#333" },
        ].map((s, i) => (
          <div key={i} className="card" style={{ padding: 18 }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: s.color, letterSpacing: "-0.02em", lineHeight: 1 }}>{s.val}</div>
            <div style={{ fontSize: 10, color: "#555", letterSpacing: ".1em", textTransform: "uppercase", marginTop: 6 }}>{s.label}</div>
            <div style={{ fontSize: 10, color: "#333", marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="charts-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
        <div className="card">
          <div style={{ fontSize: 10, color: "#444", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 18 }}>Consumo mensual (g)</div>
          <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 72 }}>
            {meses.map((m, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                {m.gramos > 0 && <div style={{ fontSize: 9, color: "#666" }}>{m.gramos}</div>}
                <div style={{ width: "100%", borderRadius: 3, background: m.gramos > 0 ? "#e8ff00" : "#1a1a1a", height: `${Math.max(m.gramos > 0 ? 8 : 3, (m.gramos / maxG) * 52)}px`, transition: "height .6s" }} />
                <div style={{ fontSize: 9, color: "#444" }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div style={{ fontSize: 10, color: "#444", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 16 }}>Stock por material</div>
          {Object.entries(porMaterial).map(([mat, g]) => (
            <div key={mat} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5 }}>
                <span style={{ color: "#aaa" }}>{mat}</span>
                <span style={{ color: "#e8ff00" }}>{g}g</span>
              </div>
              <div className="bar"><div className="bar-fill" style={{ width: `${Math.min(100, (g / totalStock) * 100) || 0}%`, background: "#e8ff00" }} /></div>
            </div>
          ))}
          {filamentos.length === 0 && <div style={{ color: "#333", fontSize: 12 }}>Sin datos</div>}
        </div>
      </div>

      <div className="card">
        <div style={{ fontSize: 10, color: "#444", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 16 }}>Detalle de stock</div>
        {filamentos.length === 0
          ? <div style={{ color: "#333", fontSize: 13, textAlign: "center", padding: "16px 0" }}>Cargá tu primer filamento usando la pestaña Compra.</div>
          : filamentos.map(f => {
            const pct = Math.min(100, (f.stockGramos / f.pesoUnitario) * 100);
            const bajo = f.stockGramos > 0 && f.stockGramos < STOCK_MINIMO;
            return (
              <div key={f.key} className="detail-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1.5fr 1fr", gap: 12, alignItems: "center", borderBottom: "1px solid #161616", padding: "13px 0" }}>
                <div>
                  <span style={{ fontSize: 13, color: "#e0e0e0", fontWeight: 500 }}>{f.color}</span>
                  <span style={{ fontSize: 11, color: "#444", marginLeft: 8 }}>{f.marca}</span>
                </div>
                <div style={{ fontSize: 11, color: "#555" }}>{f.material}</div>
                <div>
                  <div style={{ fontSize: 13, color: bajo ? "#ff6b6b" : f.stockGramos === 0 ? "#ff4444" : "#e8ff00", fontWeight: 500 }}>
                    {f.stockGramos}g
                    {bajo && <span style={{ fontSize: 9, marginLeft: 6 }}>⚠ BAJO</span>}
                    {f.stockGramos === 0 && <span style={{ fontSize: 9, marginLeft: 6 }}>AGOTADO</span>}
                  </div>
                  <div className="bar"><div className="bar-fill" style={{ width: `${pct}%`, background: bajo ? "#ff3b3b" : "#e8ff00" }} /></div>
                </div>
                <div style={{ fontSize: 11, color: "#333", textAlign: "right" }}>${Math.round(f.precioUltimo / f.pesoUnitario * f.stockGramos).toLocaleString()}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

function FormCompra({ onSubmit }) {
  const [form, setForm] = useState({ marca: "", material: "PLA", color: "", cantidad: 1, pesoUnitario: 1000, precio: "" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const submit = () => {
    if (!form.marca.trim() || !form.color.trim() || !form.precio) return alert("Completá todos los campos.");
    onSubmit({ ...form, cantidad: Number(form.cantidad), pesoUnitario: Number(form.pesoUnitario), precio: Number(form.precio) });
    setForm({ marca: "", material: "PLA", color: "", cantidad: 1, pesoUnitario: 1000, precio: "" });
  };
  return (
    <div style={{ maxWidth: 500 }}>
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 20 }}>Registrar compra</div>
      <div className="card" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {[["Marca", "marca", "text", "Ej: Grilon3"], ["Color", "color", "text", "Ej: Negro mate"]].map(([l, k, t, p]) => (
            <div key={k}><div className="lbl">{l}</div><input className="inp" type={t} placeholder={p} value={form[k]} onChange={e => set(k, e.target.value)} /></div>
          ))}
          <div>
            <div className="lbl">Material</div>
            <select className="inp" value={form.material} onChange={e => set("material", e.target.value)}>
              {MATERIALES.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div><div className="lbl">Cantidad de bobinas</div><input className="inp" type="number" min={1} value={form.cantidad} onChange={e => set("cantidad", e.target.value)} /></div>
          <div><div className="lbl">Peso por bobina (g)</div><input className="inp" type="number" min={1} value={form.pesoUnitario} onChange={e => set("pesoUnitario", e.target.value)} /></div>
          <div><div className="lbl">Precio total pagado (ARS)</div><input className="inp" type="number" min={0} placeholder="Ej: 15000" value={form.precio} onChange={e => set("precio", e.target.value)} /></div>
        </div>
        <div style={{ background: "#0a0a0a", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "#555", border: "1px solid #1a1a1a" }}>
          Total a incorporar: <span style={{ color: "#e8ff00" }}>{Number(form.pesoUnitario || 0) * Number(form.cantidad || 0)}g</span>
          {form.precio && Number(form.pesoUnitario) > 0 && (
            <span style={{ marginLeft: 16 }}>Precio/g: <span style={{ color: "#e8ff00" }}>${(Number(form.precio) / (Number(form.pesoUnitario) * Number(form.cantidad || 1))).toFixed(1)}</span></span>
          )}
        </div>
        <button className="btn" onClick={submit}>Registrar compra</button>
      </div>
    </div>
  );
}

function FormImpresion({ filamentos, onSubmit }) {
  const disponibles = filamentos.filter(f => f.stockGramos > 0);
  const [sel, setSel] = useState("");
  const [gramos, setGramos] = useState("");
  const fil = filamentos.find(f => f.key === sel);
  const restante = fil ? Math.max(0, fil.stockGramos - Number(gramos)) : null;
  const submit = () => {
    if (!sel || !gramos) return alert("Seleccioná un filamento e ingresá los gramos.");
    if (Number(gramos) > fil.stockGramos) return alert(`Stock insuficiente. Disponible: ${fil.stockGramos}g`);
    onSubmit({ key: sel, gramos: Number(gramos) });
    setGramos(""); setSel("");
  };
  return (
    <div style={{ maxWidth: 500 }}>
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 20 }}>Registrar impresión</div>
      <div className="card" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {disponibles.length === 0
          ? <div style={{ color: "#444", fontSize: 13, padding: "8px 0" }}>No hay filamentos con stock disponible.</div>
          : <>
            <div>
              <div className="lbl">Filamento utilizado</div>
              <select className="inp" value={sel} onChange={e => setSel(e.target.value)}>
                <option value="">— Seleccioná un filamento —</option>
                {disponibles.map(f => <option key={f.key} value={f.key}>{f.color} · {f.material} · {f.marca} ({f.stockGramos}g)</option>)}
              </select>
            </div>
            {fil && <div style={{ background: "#0a0a0a", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "#555", border: "1px solid #1a1a1a" }}>
              Stock actual: <span style={{ color: "#e8ff00" }}>{fil.stockGramos}g</span>
            </div>}
            <div>
              <div className="lbl">Gramos utilizados</div>
              <input className="inp" type="number" min={1} placeholder="Ej: 45" value={gramos} onChange={e => setGramos(e.target.value)} />
            </div>
            {fil && gramos && <div style={{ background: "#0a0a0a", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "#555", border: `1px solid ${restante < STOCK_MINIMO ? "#ff3b3b33" : "#1a1a1a"}` }}>
              Stock restante: <span style={{ color: restante < STOCK_MINIMO ? "#ff6b6b" : "#e8ff00" }}>{restante}g</span>
              {restante < STOCK_MINIMO && Number(gramos) <= fil.stockGramos && <span style={{ color: "#ff4444", marginLeft: 8, fontSize: 10 }}>⚠ quedará bajo stock</span>}
            </div>}
            <button className="btn" onClick={submit}>Registrar impresión</button>
          </>
        }
      </div>
    </div>
  );
}

function Historial({ movimientos }) {
  const sorted = [...movimientos].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  return (
    <div>
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 20 }}>Historial de movimientos</div>
      <div className="card">
        {sorted.length === 0
          ? <div style={{ color: "#333", fontSize: 13, textAlign: "center", padding: "20px 0" }}>Sin movimientos registrados.</div>
          : sorted.map(m => (
            <div key={m.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #161616" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <span style={{ fontSize: 9, padding: "3px 8px", borderRadius: 4, letterSpacing: ".08em", fontWeight: 500, background: m.tipo === "compra" ? "#e8ff0015" : "#ffffff08", color: m.tipo === "compra" ? "#e8ff00" : "#888", border: `1px solid ${m.tipo === "compra" ? "#e8ff0033" : "#222"}` }}>
                  {m.tipo === "compra" ? "COMPRA" : "IMPRESIÓN"}
                </span>
                <div>
                  <span style={{ fontSize: 13, color: "#ccc" }}>{m.color} {m.material}</span>
                  <span style={{ fontSize: 11, color: "#444", marginLeft: 8 }}>{m.marca}</span>
                  {m.tipo === "compra" && <span style={{ fontSize: 10, color: "#444", marginLeft: 8 }}>{m.cantidad} bobina{m.cantidad > 1 ? "s" : ""}</span>}
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: m.tipo === "compra" ? "#e8ff00" : "#ff8080" }}>{m.tipo === "compra" ? "+" : "-"}{m.gramos}g</div>
                <div style={{ fontSize: 10, color: "#333", marginTop: 2 }}>{new Date(m.fecha).toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" })}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
