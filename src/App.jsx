import {Route, Routes} from "react-router-dom";
import {About} from "./view/about/About.jsx";

function Home() {
    return <div className="p-4 bg-red-500 text-white">Home</div>
}


export default function App() {

    // const loadUserInfo = useCallback(async () => {
    //     try {
    //         const userInfo = await getUserInfo()
    //         console.log('用户信息', userInfo)
    //     } catch (error) {
    //         console.error('获取用户信息失败', error)
    //     }
    // }, [])
    //
    // useEffect(() => {
    //     loadUserInfo()
    //         .then(() => console.log('done'))
    //         .catch(() => {}); // 必须 catch，否则 unhandled rejection
    // }, [loadUserInfo]);



    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
        </Routes>
    )
}
