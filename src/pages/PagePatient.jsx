import React, { useEffect, useState } from 'react';
import TableGeneric from '../components/Table/TableGeneric';
import EditProfile from '../components/EditProfile';
import { headerAppointmentAvailable } from '../data/headerTable';
const PagePatient = () => {

  const user = JSON.parse(localStorage.getItem("clinica-token"));

  const [reserved, setReserved] = useState([]);

  const handleCancelAppointment = async (idAppointment) => {
    console.log(idAppointment)
    try {
      const response = await fetch(`http://localhost:5190/api/Appointment/Cancel/${idAppointment}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idAppointment }),
      });

      // console.log(response)

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // console.log('Esta es la respuesta del fetch', data);
    } catch (error) {
      // console.error("Error solicitando el turno:", error);
    }
  };


  const reserve = reserved.map((appointment) => [
    {
      icon: 'ban',
      color: 'danger',
      onClick: () => handleCancelAppointment(appointment.idAppointment),
    },
  ]);



  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`http://localhost:5190/api/Appointment/GetByPatientId/${user.id}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${user.token}`,
            "Content-Type": "application/json"
          }
        })
        console.log(response)
        if (!response.ok) {
          throw new Error("Error fetching appointments");
        }
        const data = await response.json();
        console.log(data);
        setReserved(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <div>
      <TableGeneric data={reserved} headers={headerAppointmentAvailable} actions={reserve} />
      <EditProfile />
    </div>
  );
};

export default PagePatient;