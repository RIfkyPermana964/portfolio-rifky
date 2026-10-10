import React, { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { 
    FolderGit2, 
    FileDown, 
    Send, 
    ExternalLink, 
    Award, 
    Calendar, 
    CheckCircle2, 
    GraduationCap, 
    Code2, 
    Network, 
    Mail, 
    Phone, 
    MapPin, 
    Sparkles, 
    ArrowRight, 
    ArrowUp, 
    Terminal, 
    Layers, 
    Check 
} from 'lucide-react';

export default function Home({ profile, projects = [], certificates = [], skills = {} }) {
    const { auth, flash } = usePage().props;
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [copiedEmail, setCopiedEmail] = useState(false);

    // Inertia Form Hook for Contact
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleContactSubmit = (e) => {
        e.preventDefault();
        post('/contact', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    // Filter projects
    const projectCategories = ['Semua', ...new Set(projects.map(p => p.category).filter(Boolean))];
    const filteredProjects = selectedCategory === 'Semua' 
        ? projects 
        : projects.filter(p => p.category === selectedCategory);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="bg-[#090d16] text-slate-100 min-h-screen flex flex-col font-sans selection:bg-indigo-600 selection:text-white relative">
            <Head>
                <title>{`${profile?.full_name || 'Rifky Permana'} | Web Developer & Informatika Fresh Graduate`}</title>
                <meta name="description" content={profile?.bio || 'Portofolio Resmi Rifky Permana, S.Kom.'} />
            </Head>

            {/* Ambient Background Gradient Orbs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/15 blur-[120px]"></div>
                <div className="absolute top-[35%] right-[-10%] w-[550px] h-[550px] rounded-full bg-violet-600/10 blur-[140px]"></div>
                <div className="absolute bottom-[10%] left-[20%] w-[450px] h-[450px] rounded-full bg-blue-600/10 blur-[130px]"></div>
            </div>

            {/* Navbar */}
            <Navbar auth={auth} />

            {/* Main Content */}
            <main className="flex-grow pt-28 relative z-10">

                {/* ================= HERO SECTION ================= */}
                <section className="relative py-12 lg:py-24 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                            
                            {/* Hero Text Left */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                                className="lg:col-span-7 space-y-6 text-center lg:text-left"
                            >
                                {/* Status Pill Badge */}
                                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-indigo-400 text-xs font-semibold shadow-inner">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    <span>Tersedia untuk Pekerjaan Full-time &amp; Remote</span>
                                </div>

                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                                    Halo, Saya{' '}
                                    <span className="bg-gradient-to-r from-indigo-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
                                        {profile?.full_name || 'Rifky Permana'}
                                    </span>
                                </h1>

                                <p className="text-lg sm:text-xl text-slate-200 font-semibold leading-relaxed flex items-center justify-center lg:justify-start gap-2">
                                    <Sparkles className="w-5 h-5 text-indigo-400 shrink-0" />
                                    <span>{profile?.title || 'Fresh Graduate S1 Informatika & Web Developer'}</span>
                                </p>

                                <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed mx-auto lg:mx-0">
                                    {profile?.bio || 'Mengembangkan aplikasi web performa tinggi dengan fokus pada arsitektur bersih, desain antarmuka responsif, serta infrastruktur jaringan yang handal.'}
                                </p>

                                {/* CTA Buttons */}
                                <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                                    <motion.a 
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.98 }}
                                        href="#projects" 
                                        className="px-6 py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
                                    >
                                        <FolderGit2 className="w-4 h-4" />
                                        Lihat Proyek Saya
                                    </motion.a>
                                    
                                    {profile?.resume_path ? (
                                        <motion.a 
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                            href={`/storage/${profile.resume_path}`} 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="px-6 py-3 text-sm font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl transition-all flex items-center gap-2 shadow-sm"
                                        >
                                            <FileDown className="w-4 h-4 text-indigo-400" />
                                            Unduh CV (PDF)
                                        </motion.a>
                                    ) : (
                                        <motion.a 
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                            href="#contact" 
                                            className="px-6 py-3 text-sm font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl transition-all flex items-center gap-2 shadow-sm"
                                        >
                                            <Send className="w-4 h-4 text-indigo-400" />
                                            Hubungi Saya
                                        </motion.a>
                                    )}
                                </div>

                                {/* Quick Stats */}
                                <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0">
                                    <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800/60">
                                        <p className="text-2xl lg:text-3xl font-extrabold text-white">22</p>
                                        <p className="text-xs text-slate-400 font-medium mt-0.5">Tahun</p>
                                    </div>
                                    <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800/60">
                                        <p className="text-2xl lg:text-3xl font-extrabold text-indigo-400">S.Kom.</p>
                                        <p className="text-xs text-slate-400 font-medium mt-0.5">Fresh Graduate</p>
                                    </div>
                                    <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800/60">
                                        <p className="text-2xl lg:text-3xl font-extrabold text-white">{projects.length}+</p>
                                        <p className="text-xs text-slate-400 font-medium mt-0.5">Proyek Web</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Hero Image Right */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="lg:col-span-5 flex justify-center"
                            >
                                <div className="relative group">
                                    {/* Subtle glowing halo */}
                                    <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 to-violet-600 opacity-20 blur-xl group-hover:opacity-40 transition duration-500"></div>

                                    <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-2xl bg-slate-900/90 p-3 border border-slate-800 shadow-2xl backdrop-blur-md">
                                        {profile?.avatar ? (
                                            <img 
                                                src={`/storage/${profile.avatar}`} 
                                                alt={profile.full_name || 'Rifky Permana'} 
                                                className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-[#0d1322] rounded-xl flex flex-col items-center justify-center p-6 text-center border border-slate-800/80">
                                                <div className="w-20 h-20 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center mb-4 text-indigo-400 shadow-inner">
                                                    <Terminal className="w-9 h-9" />
                                                </div>
                                                <span className="font-bold text-white text-base">
                                                    {profile?.full_name || 'Rifky Permana, S.Kom.'}
                                                </span>
                                                <span className="text-xs text-indigo-400 mt-1 font-medium text-center px-4 line-clamp-2">
                                                    {profile?.title || 'Web Developer'}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>

                        </div>
                    </div>
                </section>


                {/* ================= ABOUT SECTION ================= */}
                <section id="about" className="py-20 bg-[#060911]/60 border-y border-slate-800/80 relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-14">
                            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2 inline-block">
                                Tentang Saya
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                                Lulusan Baru Informatika dengan Passion di Web &amp; IT Networking
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Card 1 */}
                            <motion.div 
                                whileHover={{ y: -4 }}
                                className="glow-card p-6 sm:p-7 rounded-2xl"
                            >
                                <div className="w-12 h-12 rounded-xl bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-5">
                                    <GraduationCap className="w-6 h-6" />
                                </div>
                                <h3 className="text-base font-bold text-white mb-2.5">Pendidikan Akademik</h3>
                                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                                    Lulusan Sarjana Komputer (S.Kom) S1 Informatika. Memiliki pemahaman kuat mengenai algoritma, rekayasa perangkat lunak, serta konsep Object-Oriented Programming (OOP) yang diterapkan dalam arsitektur modern.
                                </p>
                            </motion.div>

                            {/* Card 2 */}
                            <motion.div 
                                whileHover={{ y: -4 }}
                                className="glow-card p-6 sm:p-7 rounded-2xl"
                            >
                                <div className="w-12 h-12 rounded-xl bg-violet-950/80 border border-violet-500/30 flex items-center justify-center text-violet-400 mb-5">
                                    <Code2 className="w-6 h-6" />
                                </div>
                                <h3 className="text-base font-bold text-white mb-2.5">Fullstack &amp; Modern Frontend</h3>
                                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                                    Berpengalaman membangun aplikasi web berbasis Laravel dan database relasional, kini dipadukan dengan ekosistem modern React JS, Inertia.js, Tailwind CSS, dan animasi Framer Motion yang responsif.
                                </p>
                            </motion.div>

                            {/* Card 3 */}
                            <motion.div 
                                whileHover={{ y: -4 }}
                                className="glow-card p-6 sm:p-7 rounded-2xl"
                            >
                                <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5">
                                    <Network className="w-6 h-6" />
                                </div>
                                <h3 className="text-base font-bold text-white mb-2.5">Network &amp; Infrastructure</h3>
                                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                                    Memiliki latar belakang troubleshooting jaringan, pemahaman topologi jaringan fisik dan logis, serta penggunaan monitoring tools untuk memastikan stabilitas dan keamanan infrastruktur IT.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>


                {/* ================= SKILLS SECTION ================= */}
                <section id="skills" className="py-20 relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-14">
                            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2 inline-block">
                                Tech Stack &amp; Keahlian
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                                Alat &amp; Teknologi yang Saya Gunakan
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Object.entries(skills).map(([category, items]) => (
                                <motion.div 
                                    key={category}
                                    whileHover={{ y: -3 }}
                                    className="glow-card p-6 rounded-2xl flex flex-col justify-between"
                                >
                                    <div>
                                        <h3 className="text-sm font-bold text-white mb-4 pb-3 border-b border-slate-800/80 flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                                            <span>{category}</span>
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {items.map((item) => (
                                                <span 
                                                    key={item.id || item.name}
                                                    className="px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-900/90 border border-slate-800 rounded-lg hover:border-indigo-500/40 hover:text-white transition-colors"
                                                >
                                                    {item.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>


                {/* ================= PROJECTS SHOWCASE ================= */}
                <section id="projects" className="py-20 bg-[#060911]/60 border-y border-slate-800/80 relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2 inline-block">
                                    Portofolio Proyek
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                                    Hasil Karya &amp; Aplikasi Unggulan
                                </h2>
                            </div>
                            <p className="text-slate-400 text-xs sm:text-sm max-w-md">
                                Aplikasi yang telah saya bangun menggunakan perpaduan backend yang solid dan antarmuka modern.
                            </p>
                        </div>

                        {/* Category Filter Pills */}
                        {projectCategories.length > 1 && (
                            <div className="flex flex-wrap gap-2 mb-8">
                                {projectCategories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                                            selectedCategory === category
                                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                                                : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Projects Grid */}
                        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <AnimatePresence>
                                {filteredProjects.map((project) => (
                                    <motion.div 
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                        key={project.id}
                                        className="glow-card rounded-2xl overflow-hidden flex flex-col justify-between group"
                                    >
                                        <div>
                                            {/* Thumbnail Image */}
                                            <div className="relative h-48 bg-slate-900 overflow-hidden border-b border-slate-800/80">
                                                {project.thumbnail ? (
                                                    <img 
                                                        src={`/storage/${project.thumbnail}`} 
                                                        alt={project.title} 
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-[#0d1322] flex items-center justify-center p-6 text-center">
                                                        <Code2 className="w-12 h-12 text-slate-700" />
                                                    </div>
                                                )}
                                                {project.category && (
                                                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-slate-950/90 backdrop-blur-md rounded-md text-[11px] font-semibold text-indigo-400 border border-slate-800">
                                                        {project.category}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Card Body */}
                                            <div className="p-5">
                                                <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors mb-2">
                                                    <a href={`/projects/${project.slug}`}>
                                                        {project.title}
                                                    </a>
                                                </h3>
                                                <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 mb-4">
                                                    {project.summary}
                                                </p>

                                                {/* Tech Stack Tags */}
                                                {Array.isArray(project.tech_stack) && project.tech_stack.length > 0 && (
                                                    <div className="flex flex-wrap gap-1.5 mb-2">
                                                        {project.tech_stack.map((tech, idx) => (
                                                            <span 
                                                                key={idx}
                                                                className="px-2 py-0.5 text-[10px] font-mono text-slate-300 bg-slate-900/90 rounded border border-slate-800"
                                                            >
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Card Footer Links */}
                                        <div className="px-5 pb-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                                            <a 
                                                href={`/projects/${project.slug}`} 
                                                className="text-indigo-400 font-semibold hover:text-indigo-300 flex items-center gap-1 transition-colors"
                                            >
                                                <span>Detail Proyek</span>
                                                <ArrowRight className="w-3.5 h-3.5" />
                                            </a>

                                            <div className="flex items-center gap-3">
                                                {project.github_url && (
                                                    <a 
                                                        href={project.github_url} 
                                                        target="_blank" 
                                                        rel="noreferrer"
                                                        className="text-slate-400 hover:text-white transition-colors"
                                                        title="GitHub Repository"
                                                    >
                                                        <i className="ri-github-line text-base"></i>
                                                    </a>
                                                )}
                                                {project.demo_url && (
                                                    <a 
                                                        href={project.demo_url} 
                                                        target="_blank" 
                                                        rel="noreferrer"
                                                        className="text-slate-400 hover:text-white transition-colors"
                                                        title="Live Demo"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {filteredProjects.length === 0 && (
                                <div className="col-span-full py-16 text-center text-slate-500">
                                    Belum ada proyek yang ditampilkan pada kategori ini.
                                </div>
                            )}
                        </motion.div>
                    </div>
                </section>


                {/* ================= CERTIFICATES SECTION ================= */}
                <section id="certificates" className="py-20 relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2 inline-block">
                                    Prestasi &amp; Sertifikasi
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                                    Lisensi &amp; Sertifikat Digital
                                </h2>
                            </div>
                            <a 
                                href="/certificates" 
                                className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
                            >
                                <span>Lihat Semua Sertifikat</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </a>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {certificates.map((cert) => (
                                <motion.div 
                                    whileHover={{ y: -4 }}
                                    key={cert.id} 
                                    className="glow-card p-6 rounded-2xl flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-start justify-between gap-3 mb-4">
                                            <div className="w-10 h-10 rounded-xl bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-sm">
                                                <Award className="w-5 h-5" />
                                            </div>
                                            {cert.category && (
                                                <span className="text-[11px] font-mono text-slate-400 px-2.5 py-0.5 bg-slate-900 rounded-md border border-slate-800">
                                                    {cert.category}
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="text-base font-bold text-white mb-1">{cert.title}</h3>
                                        <p className="text-xs font-semibold text-indigo-400 mb-3">{cert.issuer}</p>
                                        
                                        {cert.description && (
                                            <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
                                                {cert.description}
                                            </p>
                                        )}
                                    </div>

                                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                                        <span className="text-slate-400 text-[11px] flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {cert.issue_date ? new Date(cert.issue_date).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' }) : 'Terbaru'}
                                        </span>

                                        {cert.credential_url && (
                                            <a 
                                                href={cert.credential_url} 
                                                target="_blank" 
                                                rel="noreferrer" 
                                                className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 transition-colors"
                                            >
                                                <span>Verifikasi</span>
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </a>
                                        )}
                                    </div>
                                </motion.div>
                            ))}

                            {certificates.length === 0 && (
                                <div className="col-span-full py-16 text-center text-slate-500">
                                    Belum ada sertifikasi yang ditambahkan.
                                </div>
                            )}
                        </div>
                    </div>
                </section>


                {/* ================= CONTACT SECTION ================= */}
                <section id="contact" className="py-20 bg-[#060911]/60 border-t border-slate-800/80 relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                            
                            {/* Contact Info Left */}
                            <div className="lg:col-span-5 space-y-6">
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2 inline-block">
                                        Hubungi Saya
                                    </span>
                                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                                        Mari Berdiskusi &amp; Bekerja Sama!
                                    </h2>
                                </div>
                                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                                    Punya tawaran pekerjaan, proyek pembuatan website, atau sekadar ingin berdiskusi seputar IT dan software engineering? Silakan hubungi saya kapan saja.
                                </p>

                                <div className="space-y-3 pt-2">
                                    {/* Email Card with click to copy */}
                                    <div 
                                        onClick={() => copyToClipboard(profile?.email || 'rifkypermana.dev@gmail.com')}
                                        className="glow-card p-4 rounded-xl flex items-center justify-between cursor-pointer group"
                                        title="Klik untuk salin email"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-400 font-medium">Email Pribadi</p>
                                                <p className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                                                    {profile?.email || 'rifkypermana.dev@gmail.com'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-xs text-indigo-400 flex items-center gap-1 font-medium">
                                            {copiedEmail ? (
                                                <span className="text-emerald-400 flex items-center gap-1">
                                                    <Check className="w-3.5 h-3.5" /> Disalin
                                                </span>
                                            ) : (
                                                <span className="text-slate-500 group-hover:text-indigo-400 text-[11px]">Salin</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* WhatsApp Card */}
                                    {profile?.whatsapp && (
                                        <a 
                                            href={`https://wa.me/${profile.whatsapp}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="glow-card p-4 rounded-xl flex items-center gap-4 group block"
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                                                <Phone className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-400 font-medium">WhatsApp</p>
                                                <p className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                                                    +{profile.whatsapp}
                                                </p>
                                            </div>
                                        </a>
                                    )}

                                    {/* Location Card */}
                                    <div className="glow-card p-4 rounded-xl flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 font-medium">Lokasi</p>
                                            <p className="text-sm font-bold text-white">Indonesia (Siap Relokasi / WFH)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form Right */}
                            <div className="lg:col-span-7">
                                <div className="glow-card p-6 sm:p-8 rounded-2xl relative">
                                    <h3 className="text-lg font-bold text-white mb-6">Kirim Pesan Langsung</h3>

                                    {/* Success Message Banner */}
                                    <AnimatePresence>
                                        {(flash?.success || recentlySuccessful) && (
                                            <motion.div 
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="mb-6 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm flex items-center gap-3"
                                            >
                                                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                                                <span>{flash?.success || 'Terima kasih! Pesan Anda telah terkirim.'}</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <form onSubmit={handleContactSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                                    Nama Lengkap *
                                                </label>
                                                <input 
                                                    type="text" 
                                                    value={data.name}
                                                    onChange={e => setData('name', e.target.value)}
                                                    required 
                                                    placeholder="Contoh: Budi Santoso"
                                                    className="w-full px-4 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                                                />
                                                {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                                    Email Anda *
                                                </label>
                                                <input 
                                                    type="email" 
                                                    value={data.email}
                                                    onChange={e => setData('email', e.target.value)}
                                                    required 
                                                    placeholder="nama@email.com"
                                                    className="w-full px-4 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                                                />
                                                {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                                Subjek / Topik
                                            </label>
                                            <input 
                                                type="text" 
                                                value={data.subject}
                                                onChange={e => setData('subject', e.target.value)}
                                                placeholder="Tawaran Pekerjaan / Project Web"
                                                className="w-full px-4 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                                            />
                                            {errors.subject && <p className="text-xs text-rose-400 mt-1">{errors.subject}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                                Pesan *
                                            </label>
                                            <textarea 
                                                rows="4" 
                                                value={data.message}
                                                onChange={e => setData('message', e.target.value)}
                                                required 
                                                placeholder="Tuliskan pesan atau detail penawaran proyek Anda di sini..."
                                                className="w-full px-4 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                                            ></textarea>
                                            {errors.message && <p className="text-xs text-rose-400 mt-1">{errors.message}</p>}
                                        </div>

                                        <button 
                                            type="submit" 
                                            disabled={processing}
                                            className="w-full py-3 text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                                        >
                                            {processing ? (
                                                <span>Mengirimkan Pesan...</span>
                                            ) : (
                                                <>
                                                    <Send className="w-4 h-4" />
                                                    <span>Kirim Pesan Sekarang</span>
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

            </main>

            {/* Back to top floating button */}
            <button
                onClick={scrollToTop}
                className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-slate-900/90 border border-slate-700/80 text-slate-300 hover:text-white hover:border-indigo-500 hover:bg-slate-800 shadow-xl transition-all duration-200"
                aria-label="Kembali ke atas"
            >
                <ArrowUp className="w-4 h-4" />
            </button>

            {/* Footer */}
            <Footer profile={profile} />
        </div>
    );
}
