import { MDBCard, MDBCardBody, MDBCardText, MDBCardImage, MDBBtn, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';

const EditProfile = () => {
    const [userData, setUserData] = useState(null);

    const user = JSON.parse(localStorage.getItem('clinica-token'));

    const obtenerDatosUser = async () => {
        const response = await fetch(`http://localhost:5190/api/${user.role}/${user.id}`);
        const data = await response.json();
        console.log(data)
        return data
    }

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                const data = await obtenerDatosUser();
                setUserData(data);
            }
        };

        fetchData();
    }, []);

    return (
        <MDBContainer className="py-5">
            <MDBCol>
                <MDBCol md="4">
                    <MDBCard className="mb-4 text-center">
                        <MDBCardBody>
                            {/*                             <MDBCardImage
                                src={userData.avatar}
                                alt="Admin Avatar"
                                className="rounded-circle"
                                style={{ width: '150px' }}
                                fluid
                            /> */}
                            <MDBCardText className="mt-4">
                                <strong>{userData?.name}</strong>
                            </MDBCardText>
                            {/*                             <MDBCardText className="text-muted">
                                Registro: {userData.registration_date}
                            </MDBCardText> */}
                            <MDBBtn color="primary">Editar</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>

                <MDBCol md="8">
                    <MDBCard className="mb-4">
                        <MDBCardBody>
                            <MDBRow>
                                <MDBCol sm="4">
                                    <MDBCardText>Nombre</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="8">
                                    <MDBCardText className="text-muted">{userData?.name}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="4">
                                    <MDBCardText>Email</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="8">
                                    <MDBCardText className="text-muted">{userData?.email}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="4">
                                    <MDBCardText>Phone</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="8">
                                    <MDBCardText className="text-muted">{userData?.phoneNumber}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="4">
                                    <MDBCardText>Fecha de nacimiento</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="8">
                                    <MDBCardText className="text-muted">{userData?.dateOfBirth}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="4">
                                    <MDBCardText>Código postal</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="8">
                                    {/* <MDBCardText className="text-muted">{userData.address.postalCode}</MDBCardText> */}
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="4">
                                    <MDBCardText>DNI</MDBCardText>
                                </MDBCol>
                                {/*                                 <MDBCol sm="8">
                                    <MDBCardText className="text-muted">{userData.dni}</MDBCardText>
                                </MDBCol> */}
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBCol>
        </MDBContainer>
    );
}

export default EditProfile;
