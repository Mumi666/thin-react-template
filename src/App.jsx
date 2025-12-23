import {Route, Routes} from "react-router-dom";

function Home() {
    return <div className="p-4 bg-red-500 text-white">Home</div>
}

function About() {
    return <h1>About</h1>
}

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
        </Routes>
    )
}
