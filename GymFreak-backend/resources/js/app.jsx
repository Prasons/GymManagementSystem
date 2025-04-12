import { createInertiaApp } from "@inertiajs/inertia-react";
import { createRoot } from "react-dom/client";
import "../css/app.css";

createInertiaApp({
    resolve: (name) => require(`./Pages/${name}`),
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
