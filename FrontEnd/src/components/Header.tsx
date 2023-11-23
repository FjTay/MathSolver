import { NavLink } from 'react-router-dom'

interface HeaderProps {}

const Header : React.FC<HeaderProps> = () => {

  const linkStyler = (isActive : boolean) => {
    return {
      color: isActive ? 'rgba(255,192,74,0.97)' : 'lightblue',
    }
  }

  return (
    <nav>
      <div className="linksContainer">
        <NavLink style={({isActive}) => linkStyler(isActive)} to="userSolutions">User Solutions</NavLink>
        <NavLink style={({isActive}) => linkStyler(isActive)} to="allSolutions/info">All Solutions</NavLink>
      </div>
    </nav>
  )
}

export default Header
