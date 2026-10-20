import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FolderGit2,
    FileDown,
    Send,
    CheckCircle2,
    GraduationCap,
    Code2,
    Network,
    Mail,
    MapPin,
    Sparkles,
    ArrowRight,
    Terminal,
    Check,
    Copy,
} from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import { SocialLinks } from '@/Components/Footer';
import { WhatsappIcon } from '@/Components/BrandIcons';
import { ProjectCard, CertificateCard } from '@/Components/PortfolioCards';
import { Button, Input, Textarea, cn, storageUrl } from '@/Components/ui';

const HOME_CERTIFICATE_LIMIT = 6;

function Reveal({ children, className, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

function SectionHeading({ eyebrow, title, description, action }) {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">{eyebrow}</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">{title}</h2>
                {description && <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">{description}</p>}
            </div>
            {action}
        </div>
    );
}

/* ------------------------------------------------------------------ */

function Hero({ profile, stats }) {
    const name = profile?.full_name || 'Rifky Permana';

    return (
        <section className="relative py-10 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="lg:col-span-7 space-y-6 text-center lg:text-left order-2 lg:order-1"
                    >
                        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-emerald-300 text-xs font-semibold">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            Tersedia untuk Full-time &amp; Remote
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                            Halo, saya{' '}
                            <span className="bg-gradient-to-r from-indigo-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
                                {name}
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl text-slate-200 font-semibold leading-relaxed flex items-start justify-center lg:justify-start gap-2">
                            <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 mt-1" />
                            <span>{profile?.title || 'Fresh Graduate S1 Informatika & Web Developer'}</span>
                        </p>

                        {profile?.bio && (
                            <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed mx-auto lg:mx-0 line-clamp-3">
                                {profile.bio}
                            </p>
                        )}

                        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-2">
                            <a
                                href="#projects"
                                className="px-6 py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
                            >
                                <FolderGit2 className="w-4 h-4" />
                                Lihat Proyek
                            </a>
                            {profile?.resume_path ? (
                                <a
                                    href={storageUrl(profile.resume_path)}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-6 py-3 text-sm font-semibold text-slate-100 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all flex items-center justify-center gap-2"
                                >
                                    <FileDown className="w-4 h-4 text-indigo-400" />
                                    Unduh CV (PDF)
                                </a>
                            ) : (
                                <a
                                    href="#contact"
                                    className="px-6 py-3 text-sm font-semibold text-slate-100 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all flex items-center justify-center gap-2"
                                >
                                    <Send className="w-4 h-4 text-indigo-400" />
                                    Hubungi Saya
                                </a>
                            )}
                            <SocialLinks profile={profile} className="justify-center sm:ml-2" />
                        </div>

                        <div className="pt-6 grid grid-cols-3 gap-3 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0">
                            {stats.map((s) => (
                                <a key={s.label} href={s.href} className="bg-slate-900/40 hover:bg-slate-900/80 p-3 rounded-xl border border-slate-800/60 transition-colors">
                                    <p className="text-2xl lg:text-3xl font-extrabold text-white">{s.value}</p>
                                    <p className="text-xs text-slate-400 font-medium mt-0.5">{s.label}</p>
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="lg:col-span-5 flex justify-center order-1 lg:order-2"
                    >
                        <div className="relative group">
                            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 to-violet-600 opacity-25 blur-xl group-hover:opacity-40 transition duration-500" />
                            <div className="relative w-60 h-60 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl bg-slate-900/90 p-3 border border-slate-800 shadow-2xl">
                                {profile?.avatar ? (
                                    <img src={storageUrl(profile.avatar)} alt={name} className="w-full h-full object-cover rounded-2xl" />
                                ) : (
                                    <div className="w-full h-full bg-[#0d1322] rounded-2xl flex flex-col items-center justify-center p-6 text-center border border-slate-800/80">
                                        <div className="w-20 h-20 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center mb-4 text-indigo-400">
                                            <Terminal className="w-9 h-9" />
                                        </div>
                                        <span className="font-bold text-white">{name}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function About({ profile }) {
    const highlights = [
        {
            icon: GraduationCap,
            tone: 'bg-indigo-950/80 border-indigo-500/30 text-indigo-400',
            title: 'Pendidikan Akademik',
            text: 'Lulusan Sarjana Komputer (S.Kom) S1 Informatika. Memiliki pemahaman kuat mengenai algoritma, rekayasa perangkat lunak, serta konsep Object-Oriented Programming (OOP) yang diterapkan dalam arsitektur modern.',
        },
        {
            icon: Code2,
            tone: 'bg-violet-950/80 border-violet-500/30 text-violet-400',
            title: 'Fullstack & Modern Frontend',
            text: 'Berpengalaman membangun aplikasi web berbasis Laravel dan database relasional, kini dipadukan dengan ekosistem modern React JS, Inertia.js, Tailwind CSS, dan animasi Framer Motion yang responsif.',
        },
        {
            icon: Network,
            tone: 'bg-cyan-950/80 border-cyan-500/30 text-cyan-400',
            title: 'Network & Infrastructure',
            text: 'Memiliki latar belakang troubleshooting jaringan, pemahaman topologi jaringan fisik dan logis, serta penggunaan monitoring tools untuk memastikan stabilitas dan keamanan infrastruktur IT.',
        },
    ];

    return (
        <section id="about" className="py-20 bg-[#060911]/60 border-y border-slate-800/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Reveal>
                    <SectionHeading eyebrow="Tentang Saya" title="Lulusan Informatika dengan Passion di Web & IT Networking" />
                </Reveal>

                {profile?.bio && (
                    <Reveal className="glow-card rounded-2xl p-6 sm:p-8 mb-6">
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">{profile.bio}</p>
                    </Reveal>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {highlights.map(({ icon: Icon, tone, title, text }, i) => (
                        <Reveal key={title} delay={i * 0.08} className="glow-card p-6 sm:p-7 rounded-2xl">
                            <div className={cn('w-12 h-12 rounded-xl border flex items-center justify-center mb-5', tone)}>
                                <Icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-base font-bold text-white mb-2.5">{title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{text}</p>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Skills({ skills }) {
    const groups = Object.entries(skills);
    if (groups.length === 0) return null;

    return (
        <section id="skills" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Reveal>
                    <SectionHeading eyebrow="Tech Stack & Keahlian" title="Alat & Teknologi yang Saya Gunakan" />
                </Reveal>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groups.map(([category, items], i) => (
                        <Reveal key={category} delay={i * 0.06} className="glow-card p-6 rounded-2xl">
                            <h3 className="text-sm font-bold text-white mb-4 pb-3 border-b border-slate-800/80 flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                                {category}
                            </h3>
                            <ul className="flex flex-wrap gap-2">
                                {items.map((item) => (
                                    <li
                                        key={item.id}
                                        className="px-3 py-1.5 text-sm text-slate-200 bg-slate-900/90 border border-slate-800 rounded-lg"
                                    >
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Projects({ projects }) {
    const [category, setCategory] = useState('Semua');

    const counts = projects.reduce((acc, p) => {
        if (p.category) acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
    }, {});
    const categories = ['Semua', ...Object.keys(counts)];
    const filtered = category === 'Semua' ? projects : projects.filter((p) => p.category === category);

    return (
        <section id="projects" className="py-20 bg-[#060911]/60 border-y border-slate-800/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Reveal>
                    <SectionHeading
                        eyebrow="Portofolio Proyek"
                        title="Hasil Karya & Aplikasi Unggulan"
                        description="Aplikasi yang saya bangun dengan perpaduan backend yang solid dan antarmuka modern. Klik kartu untuk melihat detailnya."
                    />
                </Reveal>

                {categories.length > 2 && (
                    <div className="flex gap-2 mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap" role="tablist" aria-label="Filter kategori proyek">
                        {categories.map((c) => (
                            <button
                                key={c}
                                role="tab"
                                aria-selected={category === c}
                                onClick={() => setCategory(c)}
                                className={cn(
                                    'shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer flex items-center gap-2',
                                    category === c
                                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                                        : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700',
                                )}
                            >
                                {c}
                                <span className={cn('text-xs', category === c ? 'text-indigo-200' : 'text-slate-600')}>
                                    {c === 'Semua' ? projects.length : counts[c]}
                                </span>
                            </button>
                        ))}
                    </div>
                )}

                {filtered.length === 0 ? (
                    <div className="py-16 text-center text-slate-500">Belum ada proyek yang ditampilkan.</div>
                ) : (
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence mode="popLayout">
                            {filtered.map((project) => (
                                <motion.div
                                    layout
                                    key={project.id}
                                    initial={{ opacity: 0, scale: 0.96 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.96 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <ProjectCard project={project} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </section>
    );
}

function Certificates({ certificates }) {
    const shown = certificates.slice(0, HOME_CERTIFICATE_LIMIT);

    return (
        <section id="certificates" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Reveal>
                    <SectionHeading
                        eyebrow="Prestasi & Sertifikasi"
                        title="Lisensi & Sertifikat"
                        action={
                            certificates.length > 0 && (
                                <Button href="/certificates" variant="secondary">
                                    Lihat semua ({certificates.length}) <ArrowRight className="w-4 h-4" />
                                </Button>
                            )
                        }
                    />
                </Reveal>

                {shown.length === 0 ? (
                    <div className="py-16 text-center text-slate-500">Belum ada sertifikasi yang ditambahkan.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {shown.map((cert, i) => (
                            <Reveal key={cert.id} delay={(i % 3) * 0.06}>
                                <CertificateCard cert={cert} onOpenImage={() => window.open(storageUrl(cert.image), '_blank')} />
                            </Reveal>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

function Contact({ profile }) {
    const [copied, setCopied] = useState(false);
    const email = profile?.email || 'rifkypermana.dev@gmail.com';

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [sent, setSent] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post('/contact', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setSent(true);
            },
        });
    };

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            window.location.href = `mailto:${email}`;
        }
    };

    return (
        <section id="contact" className="py-20 bg-[#060911]/60 border-t border-slate-800/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
                    <Reveal className="lg:col-span-5 space-y-6">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Hubungi Saya</span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">Mari Berdiskusi &amp; Bekerja Sama!</h2>
                        </div>
                        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                            Punya tawaran pekerjaan, proyek website, atau ingin berdiskusi seputar IT? Kirim pesan lewat form, atau hubungi langsung lewat kontak di bawah.
                        </p>

                        <div className="space-y-3">
                            <div className="glow-card p-4 rounded-xl flex items-center gap-4">
                                <div className="w-11 h-11 shrink-0 rounded-xl bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs text-slate-400">Email</p>
                                    <a href={`mailto:${email}`} className="text-sm font-bold text-white hover:text-indigo-300 break-all">
                                        {email}
                                    </a>
                                </div>
                                <button
                                    onClick={copyEmail}
                                    className={cn(
                                        'shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer',
                                        copied ? 'bg-emerald-500/15 text-emerald-300' : 'bg-slate-800 text-slate-300 hover:text-white',
                                    )}
                                >
                                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                    {copied ? 'Disalin' : 'Salin'}
                                </button>
                            </div>

                            {profile?.whatsapp && (
                                <a
                                    href={`https://wa.me/${profile.whatsapp}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="glow-card p-4 rounded-xl flex items-center gap-4 group"
                                >
                                    <div className="w-11 h-11 shrink-0 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                                        <WhatsappIcon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-slate-400">WhatsApp</p>
                                        <p className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">+{profile.whatsapp}</p>
                                    </div>
                                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                                        Chat <ArrowRight className="w-3.5 h-3.5" />
                                    </span>
                                </a>
                            )}

                            <div className="glow-card p-4 rounded-xl flex items-center gap-4">
                                <div className="w-11 h-11 shrink-0 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400">Lokasi</p>
                                    <p className="text-sm font-bold text-white">Indonesia (Siap Relokasi / WFH)</p>
                                </div>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal className="lg:col-span-7" delay={0.1}>
                        <div className="glow-card p-6 sm:p-8 rounded-2xl">
                            <AnimatePresence mode="wait">
                                {sent ? (
                                    <motion.div
                                        key="sent"
                                        initial={{ opacity: 0, scale: 0.97 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-center py-10"
                                        role="status"
                                    >
                                        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-5">
                                            <CheckCircle2 className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white">Pesan terkirim!</h3>
                                        <p className="text-slate-400 text-sm mt-2 max-w-sm mx-auto">
                                            Terima kasih sudah menghubungi. Saya akan membalas ke email kamu secepatnya.
                                        </p>
                                        <Button variant="secondary" className="mt-6" onClick={() => setSent(false)}>
                                            Kirim pesan lain
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <motion.form key="form" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
                                        <h3 className="text-lg font-bold text-white">Kirim Pesan</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <Input
                                                label="Nama"
                                                required
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                error={errors.name}
                                                placeholder="Nama kamu"
                                                autoComplete="name"
                                            />
                                            <Input
                                                label="Email"
                                                type="email"
                                                required
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                error={errors.email}
                                                placeholder="nama@email.com"
                                                autoComplete="email"
                                            />
                                        </div>
                                        <Input
                                            label="Subjek"
                                            value={data.subject}
                                            onChange={(e) => setData('subject', e.target.value)}
                                            error={errors.subject}
                                            placeholder="Tawaran pekerjaan / proyek website"
                                        />
                                        <Textarea
                                            label="Pesan"
                                            required
                                            rows={5}
                                            minLength={5}
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            error={errors.message}
                                            placeholder="Tulis pesan atau detail penawaranmu di sini..."
                                        />
                                        <Button type="submit" size="lg" loading={processing} className="w-full">
                                            {!processing && <Send className="w-4 h-4" />}
                                            {processing ? 'Mengirim...' : 'Kirim Pesan'}
                                        </Button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */

export default function Home({ profile, projects = [], certificates = [], skills = {} }) {
    const skillCount = Object.values(skills).reduce((sum, items) => sum + items.length, 0);
    const stats = [
        { label: 'Proyek', value: projects.length, href: '#projects' },
        { label: 'Sertifikat', value: certificates.length, href: '#certificates' },
        { label: 'Keahlian', value: skillCount, href: '#skills' },
    ];

    return (
        <PublicLayout profile={profile} isHome>
            <Head>
                <title>{`${profile?.full_name || 'Rifky Permana'} | Portofolio`}</title>
                <meta name="description" content={profile?.title || 'Portofolio Rifky Permana, S.Kom.'} />
            </Head>

            <Hero profile={profile} stats={stats} />
            <About profile={profile} />
            <Skills skills={skills} />
            <Projects projects={projects} />
            <Certificates certificates={certificates} />
            <Contact profile={profile} />
        </PublicLayout>
    );
}
