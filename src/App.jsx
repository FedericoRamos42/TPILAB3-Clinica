import { useState } from 'react'
import Login from './components/auth/Login';
//Importar home, protected 
import { createBrowserRouter, RouterProvider } from "react-router-dom";



function App() {

   const [isLogged, setIsLogged]= useState(false);
  
    const loginHandler = () => {
      setIsLogged(true);
    }
  
    const router = createBrowserRouter([
      //{ path: "/", element: <Home/> },
      { path: "/login", element: <Login onLogin={loginHandler}/>},
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
