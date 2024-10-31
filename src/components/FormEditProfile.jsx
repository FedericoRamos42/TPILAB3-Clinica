import React from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';

const FormEditProfile = ({ open, setOpen, userEdit }) => {
    console.log(userEdit)
    return (
        <MDBModal open={open} tabIndex="-1" staticBackdrop>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Modificar Usuario</MDBModalTitle>
                    </MDBModalHeader>
                    <MDBModalBody>

                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn type='button' color='danger' onClick={() => setOpen(false)}>
                            Cancelar
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
};

export default FormEditProfile;
