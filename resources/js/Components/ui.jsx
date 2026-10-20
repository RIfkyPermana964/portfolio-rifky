import React, { useEffect, useId, useRef, useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    UploadCloud,
    ImageIcon,
    FileText,
    CheckCircle2,
    AlertCircle,
    ChevronLeft,
    ChevronRight,
    Loader2,
    AlertTriangle,
    Search,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

export const storageUrl = (path) => (path ? `/storage/${path}` : null);

export function formatDate(value, options = { day: 'numeric', month: 'short', year: 'numeric' }) {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleDateString('id-ID', options);
}

export function timeAgo(value) {
    if (!value) return '';
    const seconds = Math.round((Date.now() - new Date(value).getTime()) / 1000);
    const rtf = new Intl.RelativeTimeFormat('id', { numeric: 'auto' });
    const units = [
        ['year', 31536000],
        ['month', 2592000],
        ['week', 604800],
        ['day', 86400],
        ['hour', 3600],
        ['minute', 60],
    ];
    for (const [unit, size] of units) {
        if (Math.abs(seconds) >= size) return rtf.format(-Math.round(seconds / size), unit);
    }
    return 'baru saja';
}

/* ------------------------------------------------------------------ */
/* Button                                                              */
/* ------------------------------------------------------------------ */

const buttonVariants = {
    primary: 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-600/25',
    secondary: 'bg-slate-800/80 text-slate-200 hover:bg-slate-700 border border-slate-700/80',
    ghost: 'text-slate-300 hover:text-white hover:bg-slate-800/70',
    danger: 'bg-rose-600 text-white hover:bg-rose-500 shadow-lg shadow-rose-600/20',
    'danger-ghost': 'text-rose-400 hover:text-rose-300 hover:bg-rose-500/10',
};

const buttonSizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-sm gap-2',
    icon: 'p-2',
};

export function Button({
    variant = 'primary',
    size = 'md',
    href,
    external = false,
    loading = false,
    className,
    children,
    disabled,
    ...props
}) {
    const classes = cn(
        'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        buttonVariants[variant],
        buttonSizes[size],
        className,
    );

    const content = (
        <>
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {children}
        </>
    );

    if (href && external) {
        return (
            <a href={href} className={classes} target="_blank" rel="noreferrer" {...props}>
                {content}
            </a>
        );
    }

    if (href) {
        return (
            <Link href={href} className={classes} {...props}>
                {content}
            </Link>
        );
    }

    return (
        <button className={classes} disabled={disabled || loading} {...props}>
            {content}
        </button>
    );
}

/* ------------------------------------------------------------------ */
/* Form controls                                                       */
/* ------------------------------------------------------------------ */

const controlBase =
    'w-full px-4 py-2.5 bg-slate-900/80 border rounded-xl text-white text-sm placeholder:text-slate-500 transition-colors focus:outline-none focus:ring-2';

const controlState = (error) =>
    error
        ? 'border-rose-500/70 focus:border-rose-500 focus:ring-rose-500/20'
        : 'border-slate-700/80 hover:border-slate-600 focus:border-emerald-500 focus:ring-emerald-500/20';

export function Field({ label, hint, error, required, htmlFor, className, children }) {
    return (
        <div className={className}>
            {label && (
                <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-200 mb-1.5">
                    {label}
                    {required && <span className="text-rose-400 ml-0.5">*</span>}
                </label>
            )}
            {children}
            {error ? (
                <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {error}
                </p>
            ) : (
                hint && <p className="mt-1.5 text-xs text-slate-500">{hint}</p>
            )}
        </div>
    );
}

export function Input({ label, hint, error, required, className, icon: Icon, trailing, ...props }) {
    const id = useId();
    return (
        <Field label={label} hint={hint} error={error} required={required} htmlFor={id} className={className}>
            <div className="relative">
                {Icon && (
                    <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                )}
                <input
                    id={id}
                    required={required}
                    aria-invalid={!!error}
                    className={cn(controlBase, controlState(error), Icon && 'pl-10', trailing && 'pr-10')}
                    {...props}
                />
                {trailing && <div className="absolute right-3 top-1/2 -translate-y-1/2 flex">{trailing}</div>}
            </div>
        </Field>
    );
}

export function Textarea({ label, hint, error, required, className, maxLength, value, ...props }) {
    const id = useId();
    const counter = maxLength ? `${(value || '').length}/${maxLength}` : null;
    return (
        <Field
            label={label}
            hint={counter ? `${hint ? hint + ' · ' : ''}${counter} karakter` : hint}
            error={error}
            required={required}
            htmlFor={id}
            className={className}
        >
            <textarea
                id={id}
                required={required}
                maxLength={maxLength}
                value={value}
                aria-invalid={!!error}
                className={cn(controlBase, controlState(error), 'resize-y min-h-[2.75rem] leading-relaxed')}
                {...props}
            />
        </Field>
    );
}

/** Text input with suggestion list: pick an existing option or type a new one. */
export function Combobox({ label, hint, error, required, className, options = [], ...props }) {
    const id = useId();
    const listId = `${id}-list`;
    return (
        <Field label={label} hint={hint} error={error} required={required} htmlFor={id} className={className}>
            <input
                id={id}
                list={listId}
                required={required}
                autoComplete="off"
                aria-invalid={!!error}
                className={cn(controlBase, controlState(error))}
                {...props}
            />
            <datalist id={listId}>
                {options.map((option) => (
                    <option key={option} value={option} />
                ))}
            </datalist>
        </Field>
    );
}

export function Toggle({ checked, onChange, label, description }) {
    return (
        <label className="flex items-start justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
            <span>
                <span className="block text-sm font-medium text-slate-200">{label}</span>
                {description && <span className="block text-xs text-slate-500 mt-0.5">{description}</span>}
            </span>
            <span className="relative shrink-0 mt-0.5">
                <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                />
                <span className="block w-11 h-6 rounded-full bg-slate-700 peer-checked:bg-emerald-600 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-400" />
                <span className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
            </span>
        </label>
    );
}

/** Chips input: Enter or comma adds a tag, Backspace on empty removes the last one. */
export function TagInput({ label, hint, error, value = [], onChange, placeholder, className }) {
    const id = useId();
    const [draft, setDraft] = useState('');

    const addTags = (raw) => {
        const next = raw
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
            .filter((t) => !value.some((v) => v.toLowerCase() === t.toLowerCase()));
        if (next.length) onChange([...value, ...next]);
        setDraft('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTags(draft);
        } else if (e.key === 'Backspace' && !draft && value.length) {
            onChange(value.slice(0, -1));
        }
    };

    return (
        <Field label={label} hint={hint} error={error} htmlFor={id} className={className}>
            <div
                className={cn(
                    'flex flex-wrap items-center gap-1.5 px-2.5 py-2 bg-slate-900/80 border rounded-xl min-h-[2.75rem] transition-colors focus-within:ring-2',
                    controlState(error),
                )}
                onClick={() => document.getElementById(id)?.focus()}
            >
                {value.map((tag) => (
                    <span
                        key={tag}
                        className="inline-flex items-center gap-1 pl-2.5 pr-1 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 text-xs font-medium"
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={() => onChange(value.filter((t) => t !== tag))}
                            className="p-0.5 rounded hover:bg-emerald-500/30 text-emerald-300 cursor-pointer"
                            aria-label={`Hapus ${tag}`}
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </span>
                ))}
                <input
                    id={id}
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={() => draft && addTags(draft)}
                    placeholder={value.length ? '' : placeholder}
                    className="flex-1 min-w-[8rem] bg-transparent px-1.5 py-0.5 text-sm text-white placeholder:text-slate-500 focus:outline-none"
                />
            </div>
        </Field>
    );
}

/** Drag & drop image picker with live preview. */
export function ImageUpload({ label, hint, error, file, currentUrl, onChange, aspect = 'aspect-video', className }) {
    const inputRef = useRef(null);
    const [dragging, setDragging] = useState(false);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (!file) {
            setPreview(null);
            return;
        }
        const url = URL.createObjectURL(file);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

    const shown = preview || currentUrl;

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const dropped = e.dataTransfer.files?.[0];
        if (dropped && dropped.type.startsWith('image/')) onChange(dropped);
    };

    return (
        <Field label={label} hint={hint} error={error} className={className}>
            <div
                role="button"
                tabIndex={0}
                onClick={() => inputRef.current?.click()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && inputRef.current?.click()}
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                className={cn(
                    'relative group rounded-xl border-2 border-dashed overflow-hidden cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400',
                    aspect,
                    dragging
                        ? 'border-emerald-400 bg-emerald-500/10'
                        : error
                          ? 'border-rose-500/60 bg-slate-900/60'
                          : 'border-slate-700 bg-slate-900/60 hover:border-emerald-500/60',
                )}
            >
                {shown ? (
                    <>
                        <img src={shown} alt="Pratinjau" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 text-sm font-semibold text-white">
                            <UploadCloud className="w-6 h-6" />
                            Ganti gambar
                        </div>
                    </>
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center p-4">
                        <div className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400">
                            <ImageIcon className="w-5 h-5" />
                        </div>
                        <p className="text-sm text-slate-300 font-medium">
                            Klik atau seret gambar ke sini
                        </p>
                        <p className="text-xs text-slate-500">JPG, PNG, WEBP · maks. 3MB</p>
                    </div>
                )}
                {file && (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onChange(null);
                            if (inputRef.current) inputRef.current.value = '';
                        }}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-950/80 text-slate-200 hover:text-white hover:bg-rose-600 transition-colors cursor-pointer"
                        aria-label="Batalkan gambar baru"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onChange(e.target.files?.[0] || null)}
            />
        </Field>
    );
}

/** Simple file picker (e.g. PDF) that shows the chosen / current file. */
export function FileUpload({ label, hint, error, file, currentUrl, currentLabel, accept, onChange, className }) {
    const inputRef = useRef(null);
    return (
        <Field label={label} hint={hint} error={error} className={className}>
            <div
                className={cn(
                    'flex items-center gap-3 p-3 rounded-xl border bg-slate-900/60',
                    error ? 'border-rose-500/60' : 'border-slate-700/80',
                )}
            >
                <div className="w-10 h-10 shrink-0 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                    {file ? (
                        <p className="text-sm text-white truncate">{file.name}</p>
                    ) : currentUrl ? (
                        <a
                            href={currentUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-emerald-300 hover:text-emerald-200 hover:underline truncate block"
                        >
                            {currentLabel || 'Lihat file saat ini'}
                        </a>
                    ) : (
                        <p className="text-sm text-slate-500">Belum ada file</p>
                    )}
                </div>
                <Button type="button" variant="secondary" size="sm" onClick={() => inputRef.current?.click()}>
                    <UploadCloud className="w-3.5 h-3.5" />
                    {file || currentUrl ? 'Ganti' : 'Pilih file'}
                </Button>
            </div>
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                className="hidden"
                onChange={(e) => onChange(e.target.files?.[0] || null)}
            />
        </Field>
    );
}

/** Search field that updates the current page's `?search=` query after typing stops. */
export function SearchBox({ url, value = '', placeholder = 'Cari...', className }) {
    const [term, setTerm] = useState(value);
    const first = useRef(true);

    useEffect(() => {
        if (first.current) {
            first.current = false;
            return;
        }
        const timer = setTimeout(() => {
            router.get(url, term ? { search: term } : {}, { preserveState: true, preserveScroll: true, replace: true });
        }, 350);
        return () => clearTimeout(timer);
    }, [term]);

    return (
        <div className={cn('relative', className)}>
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            <input
                type="search"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder={placeholder}
                className={cn(controlBase, controlState(false), 'pl-10')}
            />
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Surfaces                                                            */
/* ------------------------------------------------------------------ */

export function Card({ className, children, ...props }) {
    return (
        <div className={cn('rounded-2xl bg-slate-900/60 border border-slate-800/80', className)} {...props}>
            {children}
        </div>
    );
}

export function Badge({ color = 'indigo', className, children }) {
    const colors = {
        indigo: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
        emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
        amber: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
        rose: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
        slate: 'bg-slate-800 text-slate-300 border-slate-700',
    };
    return (
        <span
            className={cn(
                'inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[11px] font-semibold whitespace-nowrap',
                colors[color],
                className,
            )}
        >
            {children}
        </span>
    );
}

export function EmptyState({ icon: Icon, title, description, action }) {
    return (
        <div className="flex flex-col items-center justify-center text-center py-16 px-6">
            {Icon && (
                <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400 mb-4">
                    <Icon className="w-6 h-6" />
                </div>
            )}
            <p className="text-base font-semibold text-slate-200">{title}</p>
            {description && <p className="text-sm text-slate-500 mt-1 max-w-sm">{description}</p>}
            {action && <div className="mt-5">{action}</div>}
        </div>
    );
}

export function Modal({ open, onClose, title, size = 'md', children, footer }) {
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === 'Escape' && onClose?.();
        document.addEventListener('keydown', onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [open, onClose]);

    const widths = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
                    <motion.div
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        initial={{ opacity: 0, y: 24, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 24, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                            'relative w-full bg-[#0b1514] border border-slate-800 shadow-2xl rounded-t-2xl sm:rounded-2xl max-h-[90vh] flex flex-col',
                            widths[size],
                        )}
                    >
                        {title && (
                            <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-slate-800">
                                <h2 className="text-base font-bold text-white">{title}</h2>
                                <button
                                    onClick={onClose}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                                    aria-label="Tutup"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                        <div className="p-5 overflow-y-auto">{children}</div>
                        {footer && (
                            <div className="px-5 py-4 border-t border-slate-800 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
                                {footer}
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

export function ConfirmDialog({
    open,
    onClose,
    onConfirm,
    title = 'Yakin?',
    message,
    confirmLabel = 'Ya, hapus',
    processing = false,
}) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            size="sm"
            footer={
                <>
                    <Button variant="secondary" onClick={onClose} disabled={processing}>
                        Batal
                    </Button>
                    <Button variant="danger" onClick={onConfirm} loading={processing}>
                        {confirmLabel}
                    </Button>
                </>
            }
        >
            <div className="flex gap-4">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="text-base font-bold text-white">{title}</h3>
                    {message && <p className="text-sm text-slate-400 mt-1 leading-relaxed">{message}</p>}
                </div>
            </div>
        </Modal>
    );
}

/* ------------------------------------------------------------------ */
/* Pagination (Laravel paginator JSON)                                 */
/* ------------------------------------------------------------------ */

export function Pagination({ meta }) {
    if (!meta || meta.last_page <= 1) return null;

    const pages = (meta.links || []).slice(1, -1);
    const navClass =
        'inline-flex items-center justify-center min-w-9 h-9 px-2 rounded-lg text-sm font-medium transition-colors';

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4 border-t border-slate-800/80">
            <p className="text-xs text-slate-500">
                Menampilkan <span className="text-slate-300 font-semibold">{meta.from}</span>–
                <span className="text-slate-300 font-semibold">{meta.to}</span> dari{' '}
                <span className="text-slate-300 font-semibold">{meta.total}</span> data
            </p>
            <nav className="flex items-center gap-1" aria-label="Pagination">
                {meta.prev_page_url ? (
                    <Link href={meta.prev_page_url} preserveScroll className={cn(navClass, 'text-slate-300 hover:bg-slate-800')} aria-label="Sebelumnya">
                        <ChevronLeft className="w-4 h-4" />
                    </Link>
                ) : (
                    <span className={cn(navClass, 'text-slate-700')}>
                        <ChevronLeft className="w-4 h-4" />
                    </span>
                )}
                {pages.map((link, i) =>
                    link.url ? (
                        <Link
                            key={i}
                            href={link.url}
                            preserveScroll
                            className={cn(
                                navClass,
                                link.active ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-800',
                            )}
                        >
                            {link.label}
                        </Link>
                    ) : (
                        <span key={i} className={cn(navClass, 'text-slate-600')}>
                            {link.label}
                        </span>
                    ),
                )}
                {meta.next_page_url ? (
                    <Link href={meta.next_page_url} preserveScroll className={cn(navClass, 'text-slate-300 hover:bg-slate-800')} aria-label="Berikutnya">
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                ) : (
                    <span className={cn(navClass, 'text-slate-700')}>
                        <ChevronRight className="w-4 h-4" />
                    </span>
                )}
            </nav>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Flash toast                                                         */
/* ------------------------------------------------------------------ */

/** Shows the session flash message (success / error) as a toast after each visit. */
export function FlashToast() {
    const { flash } = usePage().props;
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (flash?.success) setToast({ type: 'success', message: flash.success, key: Date.now() });
        else if (flash?.error) setToast({ type: 'error', message: flash.error, key: Date.now() });
    }, [flash]);

    useEffect(() => {
        if (!toast) return;
        const timer = setTimeout(() => setToast(null), 4500);
        return () => clearTimeout(timer);
    }, [toast]);

    return (
        <div className="fixed bottom-4 right-4 left-4 sm:left-auto z-[110] flex justify-end pointer-events-none" aria-live="polite">
            <AnimatePresence>
                {toast && (
                    <motion.div
                        key={toast.key}
                        initial={{ opacity: 0, y: 16, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.96 }}
                        className={cn(
                            'pointer-events-auto w-full sm:w-auto sm:max-w-sm flex items-start gap-3 p-4 rounded-xl border shadow-2xl backdrop-blur-md',
                            toast.type === 'success'
                                ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-100'
                                : 'bg-rose-950/90 border-rose-500/40 text-rose-100',
                        )}
                    >
                        {toast.type === 'success' ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        ) : (
                            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                        )}
                        <p className="text-sm leading-snug flex-1">{toast.message}</p>
                        <button
                            onClick={() => setToast(null)}
                            className="text-current/70 hover:text-white cursor-pointer"
                            aria-label="Tutup notifikasi"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
