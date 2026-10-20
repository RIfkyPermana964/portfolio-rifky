import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

createInertiaApp({
    title: (title) => (title ? `${title}` : 'Rifky Permana | Web Developer & Informatika Fresh Graduate'),
    resolve: (name) => {
        // Lazy-loaded so visitors don't download the admin pages (and vice versa).
        const pages = import.meta.glob('./Pages/**/*.jsx');
        const page = pages[`./Pages/${name}.jsx`];
        if (!page) {
            throw new Error(`Page component "./Pages/${name}.jsx" could not be found.`);
        }
        return page();
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
    progress: {
        color: '#10b981',
        showSpinner: false,
    },
});
