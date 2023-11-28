import { useParams } from "react-router-dom"
import UserSolutions from "../components/UserSolutions"
import SideBar from "../components/SideBar"
import { AnimatePresence } from "framer-motion"

const SidebarManager = () => {

  const params = useParams()

  return (
    <>
      <AnimatePresence>
        {params.dataType === "userSolutions" &&
          <SideBar  sidebar={"userSolutions"} show={params.dataType === "userSolutions"}>
            <UserSolutions sidebar={"userSolutions"} ></UserSolutions>
          </SideBar>
        }
        {params.dataType === "allSolutions" &&
          <SideBar  sidebar={"allSolutions"} show={params.dataType === "allSolutions"}>
            <UserSolutions sidebar={"allSolutions"} ></UserSolutions>
          </SideBar>
        }
      </AnimatePresence>
    </>
  )
}

export default SidebarManager