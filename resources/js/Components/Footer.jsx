import React from 'react';
import { Mail } from 'lucide-react';
import { sections } from '@/Components/Navbar';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '@/Components/BrandIcons';

export function SocialLinks({ profile, className = '' }) {
    const links = [
        { href: profile?.github_url, label: 'GitHub', icon: GithubIcon },
        { href: profile?.linkedin_url, label: 'LinkedIn', icon: LinkedinIcon },
        { href: profile?.instagram_url, label: 'Instagram', icon: InstagramIcon },
        { href: profile?.email && `mailto:${profile.email}`, label: 'Email', icon: Mail },
    ].filter((l) => l.href);

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {links.map(({ href, label, icon: Icon }) => (
                <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-emerald-500/50 hover:bg-slate-800 transition-all"
                    aria-label={label}
                    title={label}
                >
                    <Icon className="w-[18px] h-[18px]" />
                </a>
            ))}
        </div>
    );
}

export default function Footer({ profile, isHome = false }) {
    const year = new Date().getFullYear();
    const name = profile?.full_name || 'Rifky Permana, S.Kom.';

    return (
        <footer className="bg-[#040808] border-t border-slate-800/80 py-12 mt-20 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                    <div>
                        <p className="font-bold text-slate-100">{name}</p>
                        <p className="text-sm text-slate-400 mt-0.5">{profile?.title}</p>
                    </div>

                    <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-400" aria-label="Navigasi footer">
                        {sections.map((s) => (
                            <a key={s.id} href={isHome ? `#${s.id}` : `/#${s.id}`} className="hover:text-emerald-400 transition-colors">
                                {s.label}
                            </a>
                        ))}
                    </nav>

                    <SocialLinks profile={profile} />
                </div>

                <div className="mt-10 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
                    <p>
                        &copy; {year} {name.split(',')[0]}. Hak cipta dilindungi.
                    </p>
                    <p>Dibuat dengan Laravel, React &amp; Tailwind CSS</p>
                </div>
            </div>
        </footer>
    );
}
