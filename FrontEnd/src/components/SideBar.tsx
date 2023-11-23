import { motion } from "framer-motion"
import Fog from "./Fog"

interface SideBar {
    children: React.ReactNode
    sidebar : String
    show: Boolean
}

const SideBar : React.FC<SideBar> = ({ children, sidebar, show }) => {

     return (
        <>
            {show && (
                <>
                    <Fog zIndex={3} />
                    <motion.div
                        key={sidebar as React.Key}
                        className="sideBar"
                        initial={{right: '-20rem'}}
                        animate={{right: '0rem'}}
                        exit={{right: '-20rem'}}
                        transition={{ duration: 0.4, ease:'easeIn' }}
                    >
                        <div className="sideBarContainer">
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </>
    )
}

export default SideBar