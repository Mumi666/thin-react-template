import {Route, Routes} from "react-router-dom";
import {About} from "./view/about/About.jsx";
import {Home} from "./view/home/Home.jsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import {JotaiProvider} from "@/components/jotai-provider.tsx";


export default function App() {
    return (
        <JotaiProvider>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                </Routes>
            </ThemeProvider>
        </JotaiProvider>
    )
}
