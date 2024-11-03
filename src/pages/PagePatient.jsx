import React, { useEffect, useState } from 'react';
import TableGeneric from '../components/Table/TableGeneric';
import EditProfile from '../components/EditProfile';
import { headerAppointmentAvailable } from '../data/headerTable';
import { MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBBtn } from 'mdb-react-ui-kit';
const PagePatient = () => {
  const [reserved, setReserved] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [appointmentCancel, setAppointmentCancel] = useState('');

  const user = JSON.parse(localStorage.getItem("clinica-token"));

  const handleShowCancelConfirmation = (appointment) => {
    setAppointmentCancel(appointment);
    setShowCancelConfirmation(true);
  };


  const handleCancelAppointment = async (idAppointment) => {
    try {
      const response = await fetch(`http://localhost:5190/api/Appointment/Cancel/${idAppointment}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idAppointment }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
    } catch (error) {
    } finally {
      setShowCancelConfirmation(false);
    }
  };

  const reserve = reserved.map((appointment) => [
    {
      icon: 'ban',
      color: 'danger',
      onClick: () => handleShowCancelConfirmation(appointment),
    },
  ]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await fetch(`http://localhost:5190/api/Appointment/GetByPatientId/${user.id}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${user.token}`,
            "Content-Type": "application/json"
          }
        })
        if (!response.ok) {
          throw new Error("Error fetching appointments");
        }
        const data = await response.json();
        console.log(data)
        setReserved(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <div className='flex'>
      <div className='w-1/4'>
        <EditProfile />
      </div>
      <div className='w-3/4'>
        {/* ACA TIENE QUE IR COMBOBOX FILTRO PARA LA TABLA */}
        <TableGeneric data={reserved} headers={headerAppointmentAvailable} actions={reserve} loading={loading} error={error} />
      </div>
      {showCancelConfirmation && (
        <MDBModal open={showCancelConfirmation} tabIndex="-1" staticBackdrop>
          <MDBModalDialog centered size="md">
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>
                  ¿Está seguro de que desea cancelar?
                </MDBModalTitle>
              </MDBModalHeader>
              <MDBModalBody>
                <div className="mb-4">
                  <h5 className="text-lg font-semibold">Detalles del Turno</h5>
                </div>
                <div className="flex flex-col items-start mb-4">
                  <p className="font-medium">Doctor:</p>
                  <p className="text-gray-600">{appointmentCancel.doctorName}</p>
                </div>
                <div className="flex flex-col items-start mb-4">
                  <p className="font-medium">Especialidad:</p>
                  <p className="text-gray-600">{appointmentCancel.specialty}</p>
                </div>
                <div className="flex flex-col items-start mb-4">
                  <p className="font-medium">Fecha:</p>
                  <p className="text-gray-600">{new Date(appointmentCancel.date).toLocaleDateString('es-ES')}</p>
                </div>
                <div className="flex flex-col items-start mb-4">
                  <p className="font-medium">Hora:</p>
                  <p className="text-gray-600">{appointmentCancel.time}</p>
                </div>
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn onClick={() => handleCancelAppointment(appointmentCancel.idAppointment)}>
                  Confirmar
                </MDBBtn>
                <MDBBtn color='danger' onClick={() => setShowCancelConfirmation(false)}>
                  Cancelar
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      )}
    </div>
  );
};

export default PagePatient;