import { useState } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import backImgae from '../../assets/cool-background.svg';
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";

const Register = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        passwordConfirm: '',
        dateOfBirth: null,
        address: {
            street: '',
            province: '',
            city: '',
            postalCode: '',
        }
    });

    const toggleVisible = () => setIsVisible(!isVisible);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes("address.")) {
            const addressField = name.split(".")[1];
            
            setFormData((prevData) => ({
                ...prevData,
                address: {
                    ...prevData.address,
                    [addressField]: value
                }
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

/*     const handleChangeDate = (date) => {
        setFormData((prevData) => ({
            ...prevData,
            dateOfBirth: date
        }));
    }; */

    const handleSubmit = async (e) => {
        setShowMessage(false);
        setErrorMessage(null);
        e.preventDefault();
    
        try {
            // Convierte la fecha de nacimiento a UTC en formato ISO si está presente
            const utcDate = formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString() : null;
            
            // Actualiza `formData` con la fecha de nacimiento convertida
            const data = { ...formData, dateOfBirth: utcDate };
    
            // Realiza la solicitud POST con fetch
            const response = await fetch('https://localhost:5190/api//Patient/AddPatient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData?.title || 'Error en la solicitud');
            }
    
    
        } catch (error) {
            setShowMessage(true);
            setErrorMessage(error.message);
        }
    };



    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-cover bg-no-repeat" style={{ backgroundImage: `url(${backImgae})` }}>
            <div className="border w-[90%] max-w-[700px] p-4 md:p-12 rounded-xl shadow-md flex flex-col items-center justify-center gap-6 bg-white my-12">
                <h2 className="text-3xl font-semibold">Regístrate</h2>
                <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4">
                    {showMessage && (
                        <div className="text-red-500 mt-2 text-sm text-center border border-red-500 p-2 rounded-md bg-red-50">
                            <FontAwesomeIcon icon={faTriangleExclamation} className="pr-2" />
                            {errorMessage}
                        </div>
                    )}
                    <Input
                        isRequired
                        label='Nombre'
                        name="name"
                        placeholder="Ingresa tu nombre"
                        radius="sm"
                        variant="faded"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <Input
                        isRequired
                        label='Apellido'
                        name="lastName"
                        placeholder="Ingresa tu apellido"
                        radius="sm"
                        variant="faded"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    <Input
                        isRequired
                        label='Email'
                        name="email"
                        placeholder="Ingresa tu email"
                        radius="sm"
                        variant="faded"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <Input
                        isRequired
                        label='Numero de telefono'
                        name="phoneNumber"
                        placeholder="Ingresa tu numero de telefono"
                        radius="sm"
                        variant="faded"
                        type="number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                    <Input
                        label="Contraseña"
                        name="password"
                        variant="faded"
                        placeholder="Ingresa tu contraseña"
                        isRequired
                        value={formData.password}
                        onChange={handleChange}
                        endContent={
                            <button className="focus:outline-none text-gray-400 h-full" type="button" onClick={toggleVisible}>
                                {isVisible ? (
                                    <FontAwesomeIcon icon={faEyeSlash} />
                                ) : (
                                    <FontAwesomeIcon icon={faEye} />
                                )}
                            </button>
                        }
                        type={isVisible ? 'text' : 'password'}
                    />
                    <Input
                        label="Confirmar contraseña"
                        name="passwordConfirm"
                        variant="faded"
                        placeholder="Confirma tu contraseña"
                        isRequired
                        value={formData.passwordConfirm}
                        onChange={handleChange}
                        endContent={
                            <button className="focus:outline-none text-gray-400 h-full" type="button" onClick={toggleVisible}>
                                {isVisible ? (
                                    <FontAwesomeIcon icon={faEyeSlash} />
                                ) : (
                                    <FontAwesomeIcon icon={faEye} />
                                )}
                            </button>
                        }
                        type={isVisible ? 'text' : 'password'}
                    />

                    <div className="w-full flex flex-col gap-4">
                        <div className="flex w-full gap-4">
                            <Input
                                isRequired
                                label='Calle'
                                name="address.street"
                                placeholder="Ingresa tu calle"
                                radius="sm"
                                variant="faded"
                                value={formData.address.street}
                                onChange={handleChange}
                            />
                            <Input
                                isRequired
                                label='Provincia'
                                name="address.province"
                                placeholder="Ingresa tu provincia"
                                radius="sm"
                                variant="faded"
                                type="name"
                                value={formData.address.province}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex w-full gap-4">
                            <Input
                                isRequired
                                label='Ciudad'
                                name="address.city"
                                placeholder="Ingresa tu ciudad"
                                radius="sm"
                                variant="faded"
                                type="string"
                                value={formData.address.city}
                                onChange={handleChange}
                            />
                            <Input
                                isRequired
                                label='Cod. Postal'
                                name="address.postalCode"
                                placeholder="Ingresa codigo postal"
                                radius="sm"
                                variant="faded"
                                type="string"
                                value={formData.address.postalCode}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <Button
                        type="submit"
                        color="primary"
                        radius="sm"
                        className="w-full"
                    >
                        Registrarse
                    </Button>
                </form>
                <div className="flex items-center gap-2">
                    <p className="text-md text-gray-600">Ya tienes cuenta?</p>
                    <Link to={'/login'} className="text-blue-600 cursor-pointer">Inicia sesión aquí</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;