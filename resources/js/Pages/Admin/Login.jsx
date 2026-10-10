import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    Mail, 
    Lock, 
    Eye, 
    EyeOff, 
    LogIn, 
    ArrowLeft, 
    Sparkles, 
    AlertCircle, 
    CheckCircle2 
} from 'lucide-react';

export default function Login({ flash = {}, errors: propErrors = {} }) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/login', {
            onFinish: () => reset('password'),
        });
    };

    const combinedErrors = { ...propErrors, ...errors };

    return (
        <div className="bg-[#090d16] text-slate-100 min-h-screen flex items-center justify-center p-4 font-sans selection:bg-indigo-600 selection:text-white relative overflow-hidden">
            <Head>
                <title>Admin Login | Portfolio Rifky Permana</title>
            </Head>

            {/* Ambient Background Gradient Orbs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/15 blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/15 blur-[120px]"></div>
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-full max-w-md relative z-10"
            >
                {/* Header Logo & Title */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-slate-900/90 border border-slate-800 mx-auto flex items-center justify-center p-2.5 shadow-xl shadow-indigo-600/20 mb-4 transition-all duration-300 hover:border-indigo-500/50 hover:shadow-indigo-600/40">
                        <img 
                            src="/images/logo.png" 
                            alt="Logo" 
                            className="w-full h-full object-contain"
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                        <Sparkles className="w-8 h-8 text-indigo-400" />
                    </div>
                    <h1 className="text-2xl font-extrabold text-white tracking-tight">
                        Admin Dashboard Login
                    </h1>
                    <p className="text-xs text-slate-400 mt-1.5">
                        Masuk untuk mengelola proyek, sertifikasi, &amp; data portofolio
                    </p>
                </div>

                {/* Login Card */}
                <div className="glow-card p-7 sm:p-8 rounded-3xl shadow-2xl backdrop-blur-xl border border-slate-800/80 bg-slate-900/70">
                    
                    {/* Success Flash Alert */}
                    {flash?.success && (
                        <div className="mb-5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>{flash.success}</span>
                        </div>
                    )}

                    {/* Error Alert */}
                    {Object.keys(combinedErrors).length > 0 && (
                        <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
                            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                            <span>{Object.values(combinedErrors)[0]}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        
                        {/* Email Input */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-2">
                                Email Admin
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                                    <Mail className="w-4 h-4" />
                                </span>
                                <input 
                                    type="email" 
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    placeholder="nama@email.com" 
                                    required 
                                    autoComplete="email"
                                    className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-xs text-rose-400 mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                                    <Lock className="w-4 h-4" />
                                </span>
                                <input 
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    placeholder="••••••••" 
                                    required 
                                    autoComplete="current-password"
                                    className="w-full pl-10 pr-10 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 focus:outline-none"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-xs text-rose-400 mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center justify-between text-xs text-slate-400">
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                                <input 
                                    type="checkbox" 
                                    checked={data.remember}
                                    onChange={e => setData('remember', e.target.checked)}
                                    className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-0 cursor-pointer"
                                />
                                <span className="hover:text-slate-300 transition-colors">Ingat saya</span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <motion.button 
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            type="submit" 
                            disabled={processing}
                            className="w-full py-3.5 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                            {processing ? (
                                <span>Memverifikasi Akun...</span>
                            ) : (
                                <>
                                    <LogIn className="w-4 h-4" />
                                    <span>Masuk Ke Dashboard</span>
                                </>
                            )}
                        </motion.button>
                    </form>

                    {/* Back to Website */}
                    <div className="mt-6 pt-6 border-t border-slate-800/80 text-center">
                        <Link 
                            href="/" 
                            className="text-xs text-slate-400 hover:text-indigo-400 transition-colors inline-flex items-center gap-1.5"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Kembali ke Website Utama</span>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
