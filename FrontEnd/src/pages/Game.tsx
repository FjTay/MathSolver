import Header from "../components/Header";
import { Outlet, useLocation, useNavigation } from "react-router-dom"
import SidebarManager from "./SidebarManager"
import GameSet from '../components/GameSet'
import { useRef } from "react";
import Message from "../components/Message";
import PopUp from "./PopUp";

interface GameProps {}

const Game : React.FC<GameProps> = () => {

    const gameSet : React.RefObject<HTMLFormElement> = useRef(null)
    const location = useLocation()
    const navigation = useNavigation()
    const isAllSolutions : Boolean = location.pathname === "/allSolutions/info" ||
        navigation?.location?.pathname === "/allSolutions/info"

    return (
        <>
            <Header />
            <main>
                {isAllSolutions && <PopUp/>}
                <SidebarManager/>
                <Message/>
                <Outlet/>
                <GameSet ref={gameSet}/>
            </main>
        </>
    )
}

export default Game