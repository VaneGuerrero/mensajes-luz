import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const archangels = [
  { id: 'miguel', name: 'Arcángel Miguel', color: '#2D7CFF', accent: '#FFD166', symbol: '⚔', energy: 'Protección y valentía', aura: 'from-blue-600/30 to-yellow-300/15' },
  { id: 'gabriel', name: 'Arcángel Gabriel', color: '#EFF4FF', accent: '#98A2FF', symbol: '🪶', energy: 'Claridad e inspiración', aura: 'from-slate-100/40 to-indigo-300/15' },
  { id: 'rafael', name: 'Arcángel Rafael', color: '#22C55E', accent: '#86EFAC', symbol: '✶', energy: 'Sanación y paz', aura: 'from-green-500/30 to-emerald-300/15' },
  { id: 'uriel', name: 'Arcángel Uriel', color: '#F59E0B', accent: '#FB7185', symbol: '⬡', energy: 'Abundancia y sabiduría', aura: 'from-amber-500/30 to-rose-400/15' },
  { id: 'chamuel', name: 'Arcángel Chamuel', color: '#F9A8D4', accent: '#FDA4AF', symbol: '♡', energy: 'Amor y compasión', aura: 'from-pink-400/30 to-rose-200/15' },
  { id: 'jofiel', name: 'Arcángel Jofiel', color: '#FACC15', accent: '#FDE68A', symbol: '☼', energy: 'Iluminación y creatividad', aura: 'from-yellow-400/30 to-amber-200/15' },
  { id: 'zadquiel', name: 'Arcángel Zadquiel', color: '#7C3AED', accent: '#C4B5FD', symbol: '✧', energy: 'Transformación y perdón', aura: 'from-violet-600/30 to-fuchsia-300/15' }
];

const messageBank = {
  miguel: { openings: ['Hoy la luz azul te envuelve con fuerza.', 'Un escudo de fuego azul se enciende para ti.'], guidance: ['Da el paso que has evitado.', 'Corta con amor lo que drena tu alma.'], affirmations: ['Soy valiente y estoy protegido.', 'La luz divina me guía con firmeza.'] },
  gabriel: { openings: ['Un susurro puro abre tu claridad interior.', 'Las señales se ordenan ante tus ojos.'], guidance: ['Escribe lo que tu corazón quiere decir.', 'No fuerces respuestas: escucha el silencio.'], affirmations: ['Mi voz interior es cristalina.', 'Recibo mensajes de luz con confianza.'] },
  rafael: { openings: ['Una brisa verde calma tu energía.', 'Hoy tu alma pide descanso consciente.'], guidance: ['Respira profundo tres veces y suelta.', 'Permítete sanar sin prisa.'], affirmations: ['Mi cuerpo y mi espíritu se equilibran.', 'Soy paz, soy medicina viva.'] },
  uriel: { openings: ['Destellos dorados iluminan tus decisiones.', 'La sabiduría práctica despierta hoy en ti.'], guidance: ['Ordena una acción concreta hacia tu abundancia.', 'Confía en tu inteligencia espiritual.'], affirmations: ['Estoy abierto a prosperar con propósito.', 'Mi mente es clara y creadora.'] },
  chamuel: { openings: ['Un halo rosa abraza tu corazón.', 'El amor tierno regresa a tu centro.'], guidance: ['Habla contigo con compasión.', 'Elige un gesto de amor consciente hoy.'], affirmations: ['Merezco amor sereno y verdadero.', 'Mi corazón atrae vínculos luminosos.'] },
  jofiel: { openings: ['Rayos dorados expanden tu percepción.', 'La belleza de una idea toca tu mente.'], guidance: ['Aprende algo nuevo y compártelo.', 'Permite que la inspiración te encuentre en calma.'], affirmations: ['Mi mente está iluminada.', 'Creo desde la sabiduría divina.'] },
  zadquiel: { openings: ['El fuego violeta transforma memorias antiguas.', 'Hoy se abre un portal de liberación.'], guidance: ['Perdona una historia que ya terminó.', 'Suelta el peso que no te pertenece.'], affirmations: ['Me libero y renazco en luz.', 'Mi transformación es amorosa y profunda.'] }
};

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const createMessage = (id) => {
  const set = messageBank[id];
  return `${pick(set.openings)} ${pick(set.guidance)} ${pick(set.affirmations)} La luz ya ilumina tu siguiente paso.`;
};

export function App() {
  const [rotation, setRotation] = useState(0);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const spin = () => {
    const index = Math.floor(Math.random() * archangels.length);
    const extra = 1800 + Math.random() * 900;
    setRotation((prev) => prev + extra + index * (360 / archangels.length));
    const angel = archangels[index];
    const msg = createMessage(angel.id);
    setTimeout(() => {
      setSelected(angel);
      setMessage(msg);
      setHistory((h) => [{ angel: angel.name, text: msg, when: new Date().toLocaleTimeString() }, ...h].slice(0, 8));
    }, 1800);
  };

  const shareMessage = async () => {
    const text = `${selected?.name}: ${message}`;
    if (navigator.share) await navigator.share({ title: 'Mensajes de Luz', text });
  };

  const arc = useMemo(() => 360 / archangels.length, []);

  return (
    <main className="min-h-screen text-white bg-[#060914] overflow-hidden relative font-body">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(95,145,255,.2),transparent_40%),radial-gradient(circle_at_bottom,_rgba(174,96,255,.18),transparent_45%)]" />
      <div className="stars" />
      <section className="relative z-10 max-w-5xl mx-auto px-4 py-8 md:py-12">
        <h1 className="text-center font-display text-5xl md:text-7xl tracking-wide">Mensajes de Luz</h1>
        <p className="text-center max-w-2xl mx-auto text-indigo-100/90 mt-3">Gira y escucha tu corazón. Recibe un mensaje guía que iluminará tu día.</p>

        <div className="mt-8 md:mt-12 grid md:grid-cols-[1.2fr_.8fr] gap-8 items-center">
          <div className="mx-auto relative w-[320px] h-[320px] md:w-[430px] md:h-[430px]">
            <motion.div animate={{ rotate: rotation }} transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }} className="wheel absolute inset-0 rounded-full border border-white/20 shadow-aura">
              {archangels.map((a, i) => (
                <div key={a.id} className="absolute top-1/2 left-1/2 w-1/2 h-[2px] origin-left" style={{ transform: `rotate(${i * arc}deg)` }}>
                  <span className="absolute -top-5 right-4 text-2xl" style={{ color: a.color }}>{a.symbol}</span>
                </div>
              ))}
            </motion.div>
            <div className="absolute inset-0 m-auto w-20 h-20 rounded-full backdrop-blur bg-white/10 border border-white/30 grid place-items-center">✦</div>
          </div>

          <div className="space-y-4">
            <button onClick={spin} className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 font-semibold shadow-lg shadow-violet-900/40 hover:brightness-110 transition">Girar la rueda</button>
            <p className="text-sm text-indigo-100/80">Incluye historial, favoritos, compartir y modo oscuro celestial. Diseñada mobile-first y lista para PWA.</p>
            <div className="glass p-4 rounded-2xl">
              <h3 className="font-display text-2xl">Historial reciente</h3>
              <ul className="mt-2 space-y-1 text-sm text-indigo-100/85 max-h-40 overflow-auto">
                {history.map((h, idx) => <li key={idx}>{h.when} · {h.angel}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.article initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} className="fixed bottom-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:max-w-2xl z-20">
            <div className={`glass border p-6 rounded-3xl bg-gradient-to-br ${selected.aura}`} style={{ borderColor: selected.accent }}>
              <div className="flex items-center justify-between">
                <h2 className="font-display text-3xl">{selected.symbol} {selected.name}</h2>
                <span className="text-xs px-3 py-1 rounded-full bg-black/20">{selected.energy}</span>
              </div>
              <p className="mt-4 text-indigo-50/95 leading-relaxed">{message}</p>
              <p className="mt-3 text-sm text-white/85">Afirmación del día: {messageBank[selected.id].affirmations[0]}</p>
              <div className="flex gap-3 mt-5">
                <button onClick={shareMessage} className="btn">Compartir</button>
                <button onClick={() => setFavorites((f) => [...f, { angel: selected.name, text: message }])} className="btn">Guardar favorito</button>
                <button onClick={() => setSelected(null)} className="btn">Cerrar</button>
              </div>
            </div>
          </motion.article>
        )}
      </AnimatePresence>
    </main>
  );
}
