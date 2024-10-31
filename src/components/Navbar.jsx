import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// FATLA AGREGAR NAVEGACION A LAS DISTINTAS SECCIONES

const NavBar = () => {
    const [userLocal, setUserLocal] = useState(null);

    useEffect(() => {
        const getUser = () => {
            const user = JSON.parse(localStorage.getItem('clinica-token')) || null;
            setUserLocal(user);
        }

        getUser();
    }, [/* userLocal */]);
    
    
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Clinica UTN</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="#home">Inicio</Nav.Link>
                        <Nav.Link href="#link">Solicitar turno</Nav.Link>
{/*                         {user ? (
                            <Nav.Link>{userLocal.name} {userLocal.lastName}</Nav.Link>
                        ) : (
                            <Nav.Link className='text-white bg-blue-700 rounded-md shadow-sm'>Ingresar</Nav.Link>
                        )} */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;