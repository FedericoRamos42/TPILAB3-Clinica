import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './components/Form/FormLogin';
import Home from './components/Home'
import AdminTable from './components/Table/TableAdmin'
import EditProfile from './components/EditProfile'
import  NavBar  from './components/Navbar';
import PageRegister from './pages/PageRegister';
import PageAdmin from './pages/PageAdmin';
import PagePatient from './pages/PagePatient';
import PageDoctor from './pages/PageDoctor';

function App() {

  const [isLogged, setIsLogged] = useState(false);

  const loginHandler = () => {
    setIsLogged(true);
  }

  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login onLogin={loginHandler} /> },
    { path: "/Turnos", element: <AdminTable /> },
    { path: "/Profile", element: <EditProfile /> },
    { path: "/patient", element: <PagePatient /> },
    { path: "/doctor", element: <PageDoctor /> },
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
