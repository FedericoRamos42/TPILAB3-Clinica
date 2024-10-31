import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './components/auth/Login';
import Home from './components/Home';
import TableGeneric from './components/TableGeneric'
import EditProfile from './components/EditProfile'
import NavBar from './components/Navbar';
import PagePatient from './components/pages/pagePatient';
import PageRegister from './components/pages/PageRegister';
import PageAdmin from './components/pages/PageAdmin';



function App() {

  const [isLogged, setIsLogged] = useState(false);

  const loginHandler = () => {
    setIsLogged(true);
  }

  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login onLogin={loginHandler} /> },
    { path: "/Turnos", element: <TableGeneric /> },
    { path: "/Profile", element: <EditProfile /> },
    { path: "/patient", element: <PagePatient /> },
    { path: "/register", element: <PageRegister /> },
    { path: "/admin", element: <PageAdmin /> },
    /*{ path: "/comments", element: (
      <Protected isSignedIn={isLogged}>
        </Protected></>
      </Protected>
    )},*/
    //{ path: "*", element: <NotFound/>}
  ]);

  return (
    <>
      <NavBar />
      <RouterProvider router={router} />
    </>
  );
}


export default App;
