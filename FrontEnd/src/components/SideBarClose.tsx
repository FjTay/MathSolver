import { useNavigate } from "react-router-dom"

interface SideBarClose {}

const SideBarClose : React.FC<SideBarClose> = () => {
  const navigate = useNavigate()
  return (
    <div className="sidebarClose">
            <button 
                type="submit"
                onClick={() => navigate("/")}
            >&#x2573;</button>
    </div>
  )
}

export default SideBarClose