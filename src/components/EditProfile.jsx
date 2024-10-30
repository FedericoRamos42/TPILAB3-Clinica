import { MDBCard, MDBCardBody, MDBCardText, MDBCardImage, MDBBtn, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import React from 'react';

function EditProfile() {
    const userData = {
        name: 'Admino Nimda',
        email: 'admin@admin.com',
        phone: '666996699',
        birth_date: '1989-06-05',
        registration_date: '2023-06-05 02:00',
        postal_code: '46011',
        dni: '00000001A',
        avatar: 'https://example.com/avatar.png' 
    };

    return (
        <MDBContainer className="py-5">
            <MDBRow>
                <MDBCol md="4">
                    <MDBCard className="mb-4 text-center">
                        <MDBCardBody>
                            <MDBCardImage
                                src={userData.avatar}
                                alt="Admin Avatar"
                                className="rounded-circle"
                                style={{ width: '150px' }}
                                fluid
                            />
                            <MDBCardText className="mt-4">
                                <strong>{userData.name}</strong>
                            </MDBCardText>
                            <MDBCardText className="text-muted">
                                Registro: {userData.registration_date}
                            </MDBCardText>
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
                                    <MDBCardText className="text-muted">{userData.name}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="4">
                                    <MDBCardText>Email</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="8">
                                    <MDBCardText className="text-muted">{userData.email}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="4">
                                    <MDBCardText>Phone</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="8">
                                    <MDBCardText className="text-muted">{userData.phone}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="4">
                                    <MDBCardText>Fecha de nacimiento</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="8">
                                    <MDBCardText className="text-muted">{userData.birth_date}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="4">
                                    <MDBCardText>Código postal</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="8">
                                    <MDBCardText className="text-muted">{userData.postal_code}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="4">
                                    <MDBCardText>DNI</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="8">
                                    <MDBCardText className="text-muted">{userData.dni}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default EditProfile;
