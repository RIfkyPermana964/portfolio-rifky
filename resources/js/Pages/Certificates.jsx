import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { ArrowLeft, Award, ExternalLink, Calendar } from 'lucide-react';

export default function Certificates({ certificates = [], profile }) {
    return (
        <div className="bg-[#090d16] text-slate-100 min-h-screen flex flex-col font-sans selection:bg-indigo-600 selection:text-white relative">
            <Head>
                <title>Sertifikasi &amp; Prestasi | Rifky Permana, S.Kom.</title>
                <meta name="description" content="Seluruh lisensi, penghargaan, dan bukti kompetensi resmi yang dimiliki Rifky Permana." />
            </Head>

            {/* Ambient Glow */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[130px]"></div>
                <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] rounded-full bg-violet-600/10 blur-[140px]"></div>
            </div>

            <Navbar auth={null} />

            <main className="flex-grow pt-28 pb-16 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="mb-10">
                        <Link 
                            href="/" 
                            className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 mb-4 transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            <span>Kembali ke Beranda</span>
                        </Link>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
                            Daftar Sertifikasi &amp; Prestasi Akademik
                        </h1>
                        <p className="text-slate-400 text-sm mt-2 max-w-2xl">
                            Seluruh lisensi, penghargaan, dan bukti kompetensi resmi yang dimiliki Rifky Permana dalam bidang Software Engineering dan IT.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certificates.map((cert) => (
                            <motion.div 
                                whileHover={{ y: -4 }}
                                key={cert.id} 
                                className="glow-card p-6 rounded-2xl flex flex-col justify-between"
                            >
                                <div>
                                    {cert.image && (
                                        <div className="h-44 rounded-xl overflow-hidden mb-5 bg-slate-900 border border-slate-800">
                                            <img 
                                                src={`/storage/${cert.image}`} 
                                                alt={cert.title} 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}

                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        {cert.category && (
                                            <span className="text-[11px] font-mono text-slate-400 px-2.5 py-0.5 bg-slate-900 rounded-md border border-slate-800">
                                                {cert.category}
                                            </span>
                                        )}
                                        <span className="text-slate-500 text-[11px] flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {cert.issue_date ? new Date(cert.issue_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
                                        </span>
                                    </div>

                                    <h3 className="text-base font-bold text-white mb-1">{cert.title}</h3>
                                    <p className="text-xs font-semibold text-indigo-400 mb-3">{cert.issuer}</p>
                                    
                                    {cert.description && (
                                        <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
                                            {cert.description}
                                        </p>
                                    )}
                                </div>

                                {cert.credential_url && (
                                    <div className="pt-4 border-t border-slate-800/80">
                                        <a 
                                            href={cert.credential_url} 
                                            target="_blank" 
                                            rel="noreferrer" 
                                            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 transition-colors"
                                        >
                                            <span>Lihat Credential Resmi</span>
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                    </div>
                                )}
                            </motion.div>
                        ))}

                        {certificates.length === 0 && (
                            <div className="col-span-full py-20 text-center text-slate-500">
                                Belum ada data sertifikasi.
                            </div>
                        )}
                    </div>

                </div>
            </main>

            <Footer profile={profile} />
        </div>
    );
}
