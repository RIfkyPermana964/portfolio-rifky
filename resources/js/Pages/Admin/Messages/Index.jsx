import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { Inbox, Mail, MailOpen, Reply, Trash2 } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button, Card, ConfirmDialog, EmptyState, Modal, Pagination, cn, formatDate, timeAgo } from '@/Components/ui';

export default function MessagesIndex({ messages, filter }) {
    const [open, setOpen] = useState(null);
    const [toDelete, setToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const items = messages.data;

    const setRead = (message, isRead) =>
        router.patch(`/admin/messages/${message.id}`, { is_read: isRead }, { preserveScroll: true, preserveState: true });

    const openMessage = (message) => {
        setOpen(message);
        if (!message.is_read) setRead(message, true);
    };

    const confirmDelete = () => {
        setDeleting(true);
        router.delete(`/admin/messages/${toDelete.id}`, {
            preserveScroll: true,
            onFinish: () => {
                setDeleting(false);
                setToDelete(null);
                setOpen(null);
            },
        });
    };

    const tabs = [
        { key: 'all', label: 'Semua', href: '/admin/messages' },
        { key: 'unread', label: 'Belum dibaca', href: '/admin/messages?filter=unread' },
    ];

    const replyHref = (m) =>
        `mailto:${m.email}?subject=${encodeURIComponent(`Re: ${m.subject || 'Pesan dari website portofolio'}`)}`;

    return (
        <AdminLayout title="Pesan Masuk" description="Pesan yang dikirim pengunjung lewat form kontak.">
            <Card className="overflow-hidden">
                <div className="flex gap-1 p-2 border-b border-slate-800/80">
                    {tabs.map((tab) => (
                        <Link
                            key={tab.key}
                            href={tab.href}
                            preserveScroll
                            className={cn(
                                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                                filter === tab.key ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white',
                            )}
                        >
                            {tab.label}
                        </Link>
                    ))}
                </div>

                {items.length === 0 ? (
                    <EmptyState
                        icon={Inbox}
                        title={filter === 'unread' ? 'Semua pesan sudah dibaca' : 'Belum ada pesan'}
                        description={filter === 'unread' ? 'Tidak ada pesan baru saat ini.' : 'Pesan dari form kontak di halaman depan akan muncul di sini.'}
                    />
                ) : (
                    <ul className="divide-y divide-slate-800/60">
                        {items.map((m) => (
                            <li key={m.id}>
                                <button
                                    onClick={() => openMessage(m)}
                                    className={cn(
                                        'w-full text-left px-5 py-4 flex gap-4 transition-colors cursor-pointer',
                                        m.is_read ? 'hover:bg-slate-800/25' : 'bg-indigo-500/[0.04] hover:bg-indigo-500/10',
                                    )}
                                >
                                    <div
                                        className={cn(
                                            'w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-sm font-bold',
                                            m.is_read ? 'bg-slate-800 text-slate-400' : 'bg-indigo-600 text-white',
                                        )}
                                    >
                                        {m.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className={cn('text-sm truncate', m.is_read ? 'text-slate-300' : 'text-white font-bold')}>
                                                {m.name}
                                            </p>
                                            {!m.is_read && <span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />}
                                            <span className="ml-auto text-xs text-slate-500 shrink-0">{timeAgo(m.created_at)}</span>
                                        </div>
                                        <p className={cn('text-sm truncate', m.is_read ? 'text-slate-400' : 'text-slate-200 font-medium')}>
                                            {m.subject || '(Tanpa subjek)'}
                                        </p>
                                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{m.message}</p>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                <Pagination meta={messages} />
            </Card>

            <Modal
                open={!!open}
                onClose={() => setOpen(null)}
                title={open?.subject || '(Tanpa subjek)'}
                size="lg"
                footer={
                    open && (
                        <>
                            <Button variant="danger-ghost" onClick={() => setToDelete(open)} className="sm:mr-auto">
                                <Trash2 className="w-4 h-4" /> Hapus
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    setRead(open, false);
                                    setOpen(null);
                                }}
                            >
                                <Mail className="w-4 h-4" /> Tandai belum dibaca
                            </Button>
                            <Button href={replyHref(open)} external>
                                <Reply className="w-4 h-4" /> Balas via Email
                            </Button>
                        </>
                    )
                }
            >
                {open && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                            <div className="w-10 h-10 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-bold">
                                {open.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-white">{open.name}</p>
                                <a href={`mailto:${open.email}`} className="text-xs text-indigo-300 hover:underline break-all">
                                    {open.email}
                                </a>
                            </div>
                            <div className="ml-auto text-right text-xs text-slate-500 shrink-0">
                                <p>{formatDate(open.created_at)}</p>
                                <p className="flex items-center gap-1 justify-end mt-0.5">
                                    <MailOpen className="w-3.5 h-3.5" /> Dibaca
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-line">{open.message}</p>
                    </div>
                )}
            </Modal>

            <ConfirmDialog
                open={!!toDelete}
                onClose={() => !deleting && setToDelete(null)}
                onConfirm={confirmDelete}
                processing={deleting}
                title="Hapus pesan ini?"
                message={toDelete && `Pesan dari ${toDelete.name} akan dihapus permanen.`}
            />
        </AdminLayout>
    );
}
