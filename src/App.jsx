import { useState } from 'react'
import Login from './components/Auth/Login';
import Home from './components/Home';
import Register from './components/auth/Register';
//Importar home, protected 
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from './components/auth/Register';



function App() {

   const [isLogged, setIsLogged]= useState(false);
  
    const loginHandler = () => {
      setIsLogged(true);
    }
  
    const router = createBrowserRouter([
      { path: "/", element: <Home/> },
      { path: "/login", element: <Login onLogin={loginHandler}/>},
      // { path: "/register", element: <Register/>},
      /*{ path: "/comments", element: (
        <Protected isSignedIn={isLogged}>
          </Protected></>
        </Protected>
      )},*/
      //{ path: "*", element: <NotFound/>}
    ]);
  
    return (
      <RouterProvider router={router}/>
    );
  }


export default App
