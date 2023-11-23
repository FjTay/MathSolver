import './App.css'
import { Outlet } from 'react-router-dom';
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { deleteAction, handleSolutionAction } from './scripts/actions.js';
import { useContext, useMemo } from 'react';
import { SolutionContext } from './contexts/SolutionContext.jsx';
import { handleLoaders } from './scripts/loaders.js';
import Game from './pages/Game.jsx';
import Errorpage from './pages/ErrorPage.jsx';

function App() {

  const { handleSolutionContext } = useContext(SolutionContext)

  const router = useMemo(() => createMemoryRouter([
    {
      path: "/",
      errorElement: <Errorpage />,
      element: <Game/>,
      children: [
        {
          path: "newSolution/:id",
          id: "newSolution",
          element: <></>,
          action: async ({request, params}) => {
            return handleSolutionAction(request, params, handleSolutionContext)
          }
        },
        {
          path: ":dataType",
          element: <></>,
          loader: async ({ params }) => handleLoaders(params, handleSolutionContext),
          children: [
            {
              path: "destroy/:id",
              action: deleteAction,
              element: <></>,
            },
            {
              path: "info",
              element: <></>,
            },
          ]
        }
      ]
    },
  ]), [])

  return (
    <RouterProvider router={router}>
      <Outlet/>
    </RouterProvider>
  )
}

export default App