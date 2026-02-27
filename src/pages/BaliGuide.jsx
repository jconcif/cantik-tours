import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Plane,
    Sun,
    Home,
    Smartphone,
    Wallet,
    Heart,
    ArrowRight,
    ChevronRight,
    ShieldCheck,
    AlertCircle,
    Utensils,
    BookOpen,
    Star,
    MessageCircle
} from 'lucide-react';
import SEO from '../components/SEO';

/* ─── Static content (ES only) ─────────────────────────────────── */

const chapters = [
    {
        id: 'preparativos',
        icon: <Plane size={22} />,
        number: '01',
        title: 'Los Preparativos',
        subtitle: 'Antes de despegar',
    },
    {
        id: 'clima',
        icon: <Sun size={22} />,
        number: '02',
        title: 'Clima y Cuándo Viajar',
        subtitle: 'La mejor época',
    },
    {
        id: 'alojamiento',
        icon: <Home size={22} />,
        number: '03',
        title: 'Alojamiento',
        subtitle: '¿Dónde dormir?',
    },
    {
        id: 'movilidad',
        icon: <Smartphone size={22} />,
        number: '04',
        title: 'Movilidad',
        subtitle: 'Apps y transporte',
    },
    {
        id: 'dinero',
        icon: <Wallet size={22} />,
        number: '05',
        title: 'Dinero y Pagos',
        subtitle: 'Tarjetas y ATMs',
    },
    {
        id: 'cultura',
        icon: <Heart size={22} />,
        number: '06',
        title: 'Cultura',
        subtitle: 'Consejos de oro',
    },
];

const accommodationAreas = [
    { name: 'Ubud', tag: 'Espiritual', desc: 'El corazón entre arrozales, templos y yoga.' },
    { name: 'Uluwatu', tag: 'Surf & Atardeceres', desc: 'Acantilados impresionantes y los mejores cierres de día.' },
    { name: 'Canggu', tag: 'Cosmopolita', desc: 'Beach clubs, cafeterías aesthetic y vida nocturna vibrante.' },
    { name: 'Sanur', tag: 'Familiar', desc: 'Aguas tranquilas, amaneceres únicos y ambiente relajado.' },
    { name: 'Amed', tag: 'Buceo', desc: 'Paraíso para snorkel y buceo con vistas al Volcán Agung.' },
    { name: 'Nusa Dua', tag: 'Lujo', desc: 'La zona más exclusiva con grandes resorts internacionales.' },
];

const survivalRules = [
    {
        icon: <ShieldCheck size={20} />,
        label: 'Seguro de Viaje',
        text: 'Imprescindible. La sanidad privada (BIMC/Siloam) es excelente pero carísima. Debe cubrir "deportes de aventura" para motos o surf.',
    },
    {
        icon: <AlertCircle size={20} />,
        label: 'Bali Belly',
        text: 'No bebas agua del grifo ni para lavarte los dientes si eres sensible. Usa gel desinfectante.',
    },
    {
        icon: <BookOpen size={20} />,
        label: 'Enchufes',
        text: 'Tipo C / F (el mismo de España o Chile). No necesitas adaptador.',
    },
    {
        icon: <Heart size={20} />,
        label: 'Respeto',
        text: 'Usa siempre la mano derecha para interactuar, dar o recibir algo (por ejemplo el dinero). Evita apuntar con los pies. Evita tocar la cabeza o el pelo de los locales, incluso de l@s niñ@s — en Bali, la cabeza es el templo del alma.',
    },
    {
        icon: <Star size={20} />,
        label: 'Templos',
        text: 'Usa Sarong: debes cubrir rodillas y hombros. Nunca pises las ofrendas (Canang Sari) del suelo.',
    },
    {
        icon: <AlertCircle size={20} />,
        label: 'Nyepi (Día del Silencio)',
        text: 'Si viajas en marzo, infórmate. La isla se detiene totalmente por 24 horas.',
    },
];

/* ─── Animation variants ───────────────────────────────────────── */
const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
    }),
};

/* ─── Section wrapper ───────────────────────────────────────────── */
const Section = ({ id, icon, number, title, children }) => (
    <section id={id} className="scroll-mt-28">
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeUp}
        >
            {/* Section header */}
            <div className="flex items-center gap-4 mb-8">
                <span className="text-xs font-black text-primary uppercase tracking-[0.3em] opacity-60">
                    {number}
                </span>
                <div className="flex-1 h-px bg-black/10 dark:bg-white/10" />
            </div>
            <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
                    {icon}
                </div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-none">
                    {title}
                </h2>
            </div>
            {children}
        </motion.div>
    </section>
);

/* ─── Info card ─────────────────────────────────────────────────── */
const InfoCard = ({ label, children, accent = false }) => (
    <div className={`p-6 rounded-2xl border ${accent
        ? 'bg-primary/5 border-primary/20'
        : 'bg-white dark:bg-white/5 border-black/5 dark:border-white/5 shadow-md shadow-black/5'
        }`}>
        {label && (
            <p className="text-xs font-black uppercase tracking-widest text-primary mb-3">{label}</p>
        )}
        {children}
    </div>
);

/* ─── Bullet point ──────────────────────────────────────────────── */
const Bullet = ({ children }) => (
    <li className="flex gap-3 items-start">
        <ChevronRight size={16} className="text-primary shrink-0 mt-1" />
        <span className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed text-base">
            {children}
        </span>
    </li>
);

/* ─── Main component ────────────────────────────────────────────── */
const BaliGuide = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    const whatsappLink = `https://wa.me/376614535?text=${encodeURIComponent('Hola Cantik Tours! He leído vuestra Guía Bali 2026 y me gustaría organizar mi viaje.')}`;

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark font-sans">
            <SEO
                title="Guía Bali 2026: Todo lo que necesitas saber | Cantik Tours"
                description="La guía definitiva para viajar a Bali en 2026. Visado, clima, alojamiento, dinero y consejos de cultura de la mano de locales."
            />

            {/* ── HERO ──────────────────────────────────────────── */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                {/* Ambient glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[120px] -z-10" />

                <div className="max-w-4xl mx-auto text-center">
                    <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                        <span className="inline-block text-primary font-black uppercase tracking-[0.35em] text-xs mb-6">
                            Imprescindible
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-6">
                            Guía Bali{' '}
                            <span className="text-primary italic">2026</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
                            Todo lo que necesitas saber antes de aterrizar en la "Isla de los Dioses".
                        </p>
                    </motion.div>

                    {/* Chapter nav pills */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        custom={1}
                        className="mt-12 flex flex-wrap justify-center gap-3"
                    >
                        {chapters.map((ch) => (
                            <a
                                key={ch.id}
                                href={`#${ch.id}`}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-sm hover:border-primary/40 hover:text-primary transition-all text-sm font-semibold"
                            >
                                <span className="text-primary">{ch.icon}</span>
                                {ch.title}
                            </a>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── CONTENT ───────────────────────────────────────── */}
            <div className="max-w-4xl mx-auto px-6 pb-24 grid gap-24">

                {/* ── 01 Preparativos ─────────────────────────── */}
                <Section id="preparativos" icon={<Plane size={22} />} number="01" title="Los Preparativos: Antes de despegar">
                    <p className="text-gray-500 dark:text-gray-400 font-medium mb-8 text-base uppercase tracking-widest">
                        Visado e Ingreso · Actualizado 2026
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <InfoCard label="Visa B1 — Turismo (1 a 60 días)">
                            <ul className="grid gap-2">
                                <Bullet>Coste: 500.000 IDR (≈ 30€) por cada 30 días.</Bullet>
                                <Bullet>Permiso inicial de 30 días, extensible una vez (máx. 60 días).</Bullet>
                                <Bullet>Trámite: Online (e-VoA) o al llegar al aeropuerto.</Bullet>
                                <Bullet>Pasaporte con mínimo 6 meses de vigencia y una hoja en blanco.</Bullet>
                            </ul>
                        </InfoCard>

                        <InfoCard label="Visa C1 — Larga Estancia (hasta 180 días)">
                            <ul className="grid gap-2">
                                <Bullet>Coste: 1.000.000 IDR (≈ 60€) cada 60 días.</Bullet>
                                <Bullet>Solo Online · tarda 5 a 10 días hábiles.</Bullet>
                                <Bullet>Requiere extracto bancario (últimos 3 meses) con saldo mín. 2.000 USD.</Bullet>
                                <Bullet>Pasaporte con mínimo 6 meses de vigencia y una hoja en blanco.</Bullet>
                                <Bullet>
                                    Web oficial:{' '}
                                    <a href="https://evisa.imigrasi.go.id/" target="_blank" rel="noreferrer" className="text-primary underline underline-offset-2">
                                        evisa.imigrasi.go.id
                                    </a>
                                </Bullet>
                            </ul>
                        </InfoCard>
                    </div>

                    <InfoCard label="🎟️ Tasas y Aduanas — Obligatorio" accent>
                        <ul className="grid gap-3">
                            <Bullet>
                                <strong>Tasa Turística de Bali:</strong> 150.000 IDR (≈ 9€). Págala antes en{' '}
                                <a href="https://lovebali.baliprov.go.id/" target="_blank" rel="noreferrer" className="text-primary underline underline-offset-2">
                                    Love Bali
                                </a>{' '}para evitar filas.
                            </Bullet>
                            <Bullet>
                                <strong>Declaración de Aduanas (ECD):</strong> Rellena el formulario online en las 48 horas previas a tu vuelo. Obtendrás un código QR que deberás mostrar al salir del aeropuerto.
                            </Bullet>
                        </ul>
                        <p className="mt-4 text-base font-bold text-primary/80 italic">
                            💡 Tip: Ten los QR listos en el móvil al aterrizar para ir directo sin colas.
                        </p>
                    </InfoCard>
                </Section>

                {/* ── 02 Clima ────────────────────────────────── */}
                <Section id="clima" icon={<Sun size={22} />} number="02" title="Clima y Cuándo Viajar">
                    <p className="text-gray-600 dark:text-gray-400 font-medium mb-8 leading-relaxed text-base">
                        Bali goza de un clima tropical constante (26–30°C). La diferencia entre temporadas viene dada por la lluvia, no por el frío.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <InfoCard label="☀️ Estación Seca · Abril – Octubre">
                            <p className="text-base text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                                Sol garantizado y humedad baja. La mejor época para playas, surf y buceo. Julio y agosto son los meses pico.
                            </p>
                        </InfoCard>
                        <InfoCard label="🌧️ Estación de Lluvias · Nov – Marzo">
                            <p className="text-base text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                                Verdor intenso y menos multitudes. Las lluvias suelen ser fuertes pero breves, generalmente por la tarde o noche.
                            </p>
                        </InfoCard>
                    </div>

                    <div className="mt-6 p-5 rounded-2xl bg-primary/5 border border-primary/20">
                        <p className="text-base font-bold text-gray-700 dark:text-gray-300">
                            🏆 Mejor momento: <span className="text-primary">Abril, Mayo, Junio y Septiembre</span> — buen clima, precios razonables y menos aglomeraciones.
                        </p>
                    </div>
                </Section>

                {/* ── 03 Alojamiento ──────────────────────────── */}
                <Section id="alojamiento" icon={<Home size={22} />} number="03" title="Alojamiento: ¿Dónde dormir?">
                    <p className="text-gray-600 dark:text-gray-400 font-medium mb-8 leading-relaxed text-base">
                        Cada zona tiene su propia magia. Elige según el ambiente que buscas para tu viaje.
                    </p>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {accommodationAreas.map((area) => (
                            <div
                                key={area.name}
                                className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-md shadow-black/5 hover:border-primary/30 transition-colors"
                            >
                                <p className="text-xs font-black text-primary uppercase tracking-widest mb-1">{area.tag}</p>
                                <h3 className="text-xl font-black mb-2">{area.name}</h3>
                                <p className="text-base text-gray-600 dark:text-gray-400 font-medium leading-relaxed">{area.desc}</p>
                            </div>
                        ))}
                    </div>

                    <p className="mt-6 text-base text-gray-400 font-medium italic">
                        💡 Tip: Compara precios entre Booking y Agoda. A veces hay diferencias notables.
                    </p>
                </Section>

                {/* ── 04 Movilidad ────────────────────────────── */}
                <Section id="movilidad" icon={<Smartphone size={22} />} number="04" title="Movilidad y Conectividad">

                    <div className="grid gap-6">
                        <InfoCard label="📱 Aplicaciones Esenciales">
                            <ul className="grid gap-3">
                                <Bullet>
                                    <strong>Internet:</strong> Puedes optar por una eSIM (más práctica, comprada online) o una SIM local — Telkomsel o XL Axiata son las líderes.
                                </Bullet>
                                <Bullet>
                                    <strong>Grab & Gojek:</strong> Los "Uber" de Asia. Transporte, motos y comida a domicilio (GoFood). Vincula tu tarjeta para pagar digital.
                                </Bullet>
                                <Bullet>
                                    <strong>Google Maps:</strong> ¡Cuidado! A veces guía por "caminos de cabras" en ruta de moto. Selecciona siempre la opción "coche". Descarga los mapas offline.
                                </Bullet>
                            </ul>
                        </InfoCard>

                        <InfoCard label="🚗 Transporte">
                            <ul className="grid gap-3">
                                <Bullet>
                                    <strong>Conductor Privado:</strong> La opción más cómoda y segura para excursiones de día completo. En Cantik Tours contamos con conductores de confianza.
                                </Bullet>
                                <Bullet>
                                    <strong>Moto de Alquiler:</strong> Generalmente no piden documentos. Toma fotos del estado de la moto al recibirla.
                                </Bullet>
                                <Bullet>
                                    Es tu responsabilidad tener licencia adecuada y el Carnet Internacional (IDP).
                                </Bullet>
                                <Bullet>
                                    ⚠️ La licencia B española <strong>no es válida</strong> para motos fuera de Europa.
                                </Bullet>
                            </ul>
                        </InfoCard>
                    </div>
                </Section>

                {/* ── 05 Dinero ───────────────────────────────── */}
                <Section id="dinero" icon={<Wallet size={22} />} number="05" title="Dinero y Pagos">
                    <div className="grid gap-6">
                        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
                            <p className="font-black text-gray-800 dark:text-gray-100 mb-1">⚠️ Tarjeta Física Obligatoria</p>
                            <p className="text-base text-gray-600 dark:text-gray-400 font-medium">
                                Los cajeros (ATM) no tienen contactless. Sin el plástico físico no podrás retirar efectivo. Lleva siempre al menos dos tarjetas.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            <InfoCard label="🏧 Cajero Automático (ATM)">
                                <p className="text-base text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                                    Usa solo cajeros dentro de bancos o supermercados (Indomaret / Alfamart) para evitar clonaciones.
                                </p>
                            </InfoCard>
                            <InfoCard label="💱 Cambio de Efectivo">
                                <p className="text-base text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                                    Tus billetes deben estar impecables. Cambia solo en sitios oficiales (BMC). Evita locales con tasas sospechosamente altas.
                                </p>
                            </InfoCard>
                            <InfoCard label="🍜 Presupuesto de Referencia">
                                <p className="text-base text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                                    Nasi Goreng (almuerzo): 3€–7€<br />
                                    Cerveza Bintang / café: 2€–4€
                                </p>
                            </InfoCard>
                        </div>
                    </div>
                </Section>

                {/* ── 06 Cultura ──────────────────────────────── */}
                <Section id="cultura" icon={<Heart size={22} />} number="06" title="Cultura y Consejos de Oro">

                    {/* Gastronomy */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Utensils size={18} className="text-primary" />
                            <h3 className="text-xl font-black">Gastronomía que debes probar</h3>
                        </div>
                        <InfoCard>
                            <p className="text-base text-gray-500 dark:text-gray-400 font-medium mb-4">
                                Pide siempre en los <strong className="text-gray-700 dark:text-gray-200">Warungs</strong> (restaurantes locales):
                            </p>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {[
                                    { name: 'Nasi Goreng', desc: 'Arroz frito con verduras y huevo. El alma de Indonesia.' },
                                    { name: 'Mie Goreng', desc: 'Fideos salteados. Sabroso y reconfortante.' },
                                    { name: 'Satay (Sate)', desc: 'Brochetas a la brasa con salsa de cacahuete.' },
                                    { name: 'Gado-Gado', desc: 'Ensalada vegetal con tofu y salsa de cacahuete. Ideal vegetarianos.' },
                                    { name: 'Babi Guling', desc: '(Estrella balinesa) Cochinillo asado con especias locales.' },
                                ].map((dish) => (
                                    <div key={dish.name} className="flex gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                                        <div>
                                            <p className="font-black text-base">{dish.name}</p>
                                            <p className="text-base text-gray-500 dark:text-gray-400 font-medium">{dish.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </InfoCard>
                    </div>

                    {/* Pocket dictionary */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <MessageCircle size={18} className="text-primary" />
                            <h3 className="text-xl font-black">Diccionario de Bolsillo</h3>
                        </div>
                        <InfoCard accent>
                            <div className="grid sm:grid-cols-2 gap-2 text-base font-medium text-gray-700 dark:text-gray-300">
                                {[
                                    ['Halo', 'Hola'],
                                    ['Terima kasih', 'Gracias'],
                                    ['Sama-sama', 'De nada'],
                                    ['Tolong', 'Por favor'],
                                    ['Tidak pedas', 'No picante'],
                                    ['Berapa?', '¿Cuánto cuesta?'],
                                ].map(([indo, es]) => (
                                    <div key={indo} className="flex justify-between gap-4 py-1.5 border-b border-primary/10 last:border-0">
                                        <span className="font-black text-primary">{indo}</span>
                                        <span className="text-gray-500 dark:text-gray-400">{es}</span>
                                    </div>
                                ))}
                            </div>
                        </InfoCard>
                    </div>

                    {/* Survival rules */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <ShieldCheck size={18} className="text-primary" />
                            <h3 className="text-xl font-black">Reglas de Supervivencia</h3>
                        </div>
                        <div className="grid gap-4">
                            {survivalRules.map((rule) => (
                                <div
                                    key={rule.label}
                                    className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-sm"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        {rule.icon}
                                    </div>
                                    <div>
                                        <p className="font-black mb-1">{rule.label}</p>
                                        <p className="text-base text-gray-600 dark:text-gray-400 font-medium leading-relaxed">{rule.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Section>
            </div>

            {/* ── CTA FINAL ─────────────────────────────────────── */}
            <section className="relative py-24 px-6 overflow-hidden">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="relative bg-bg-dark text-white rounded-[3rem] p-12 md:p-20 text-center overflow-hidden border border-white/5"
                    >
                        {/* Glows */}
                        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-[0.95] mb-6">
                                ¿Listo para vivir tu propia historia?
                            </h2>
                            <p className="text-lg md:text-xl text-white/60 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
                                Ahora que conoces los secretos de Bali, es hora de vivirlos. Únete a nosotros en una aventura privada y déjanos mostrarte la verdadera magia de nuestra isla.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <Link
                                    to="/tours"
                                    className="group w-full sm:w-auto px-10 py-5 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-2xl shadow-primary/40 flex items-center justify-center gap-3"
                                >
                                    Explorar Experiencias
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 font-black uppercase tracking-widest text-xs transition-all text-white flex items-center justify-center gap-3"
                                >
                                    Contactar por WhatsApp
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default BaliGuide;
