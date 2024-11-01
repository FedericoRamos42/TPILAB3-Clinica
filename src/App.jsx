import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './components/Form/FormLogin';
import Home from './components/Home'
import EditProfile from './components/EditProfile'
import  NavBar  from './components/Navbar';
import PageRegister from './pages/PageRegister';
import PageAdmin from './pages/PageAdmin';
import PagePatient from './pages/PagePatient';
import PageDoctor from './pages/PageDoctor';
import PageAppointment from './pages/PageAppointment';

function App() {

  const [isLogged, setIsLogged] = useState(false);

  const loginHandler = () => {
    setIsLogged(true);
  }

  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login onLogin={loginHandler} /> },
    { path: "/Profile", element: <EditProfile /> },
    { path: "/patient", element: <PagePatient /> },
    { path: "/doctor", element: <PageDoctor /> },
    { path: "/register", element: <PageRegister /> },
    { path: "/appointment", element: <PageAppointment /> },
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
