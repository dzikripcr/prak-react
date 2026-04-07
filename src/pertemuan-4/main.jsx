import { createRoot } from "react-dom/client";
import "./tailwind.css"
import FrameworkList from "./FrameworkList";
import FrameworkListSeacrhFilter from "./FrameworkListSearchFilter";



createRoot(document.getElementById("root"))
    .render(
        <div>
            {/* <FrameworkList/> */}
            <FrameworkListSeacrhFilter/>
        </div>
    )