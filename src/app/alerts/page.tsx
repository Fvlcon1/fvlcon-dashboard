import Sidebar from "./components/sidebar/sidebar"
import './components/antd.css'
import Text from "@styles/components/text"
import Main from "./components/main/main"

const Alerts = () => {
    return (
        <>
            <div className="w-full h-full pl-[70px] flex gap-4">
                <Sidebar />
                <Main />
            </div>
        </>
    )
}
export default Alerts