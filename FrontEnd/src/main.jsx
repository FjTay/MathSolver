import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { SolutionContextProvider } from './contexts/SolutionContext.tsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <SolutionContextProvider>
    <App />
  </SolutionContextProvider>
)