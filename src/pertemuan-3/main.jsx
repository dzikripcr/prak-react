import { createRoot } from "react-dom/client";
import TailwindCSS from "./TailwindCSS";
import './Tailwind.css';


createRoot(document.getElementById("root"))
    .render(
        <div>
            <TailwindCSS/>
        </div>
    )