import { motion } from "framer-motion"

interface FogProps { zIndex : number} 

const Fog : React.FC<FogProps> = ({ zIndex }) => {

    return (
        <motion.div
            className="fog"
            key={`fog-${zIndex}`}
            initial={{ opacity: 0, zIndex: zIndex }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeIn" }}
        >
        </motion.div>
    )
}

export default Fog