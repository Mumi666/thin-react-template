import {Route, Routes} from "react-router-dom";
import {About} from "./view/about/About.jsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import {JotaiProvider} from "@/components/jotai-provider.tsx";

function Home() {
    return <div className="p-4 bg-red-500 text-white">Home</div>
}


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
