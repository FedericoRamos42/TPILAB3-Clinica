import React, { useEffect, useState } from 'react';
import TableGeneric from '../TableGeneric';
import { PatientHeader } from '../../data/PatientHeader';
const PagePatient = () => {
  
  const user = JSON.parse(localStorage.getItem("clinica-token"));

    const [appointments, setAppointments] = useState([]);
    const [reserved,setReserved] = useState([]);
  

    const handleAssignAppointment = async (idAppointment,idPatient) => {

      const user = JSON.parse(localStorage.getItem("clinica-token"));

      try {
          const response = await fetch(`http://localhost:5190/api/Appointment/AssignAppointment`, {
              method: 'PUT',
              headers: {
                  'Authorization': `Bearer ${user.token}`,
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ idAppointment, idPatient}),
          });

          console.log(response)

          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          console.log('Esta es la respuesta del fetch',data);
      } catch (error) {
          console.error("Error solicitando el turno:", error);
      }
  };
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

        console.log(response)

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Esta es la respuesta del fetch',data);
    } catch (error) {
        console.error("Error solicitando el turno:", error);
    }
};

    useEffect(() => {
      const fetchAppointments = async () => {
        try {
          const response = await fetch('http://localhost:5190/api/Appointment');
          console.log(response)
          if (!response.ok) {
            throw new Error("Error fetching appointments");
          }
          const appointments = await response.json();
          console.log(appointments);
          setAppointments(appointments);
        } catch (error) {
          console.error("Error fetching appointments:", error);
        }
      };
      fetchAppointments();
    }, []);

    useEffect(() => {
      const fetchAppointments = async () => {
        try {
          const response = await fetch(`http://localhost:5190/api/Appointment/GetByPatientId/${user.id}`,{
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
        <TableGeneric headerProps={PatientHeader} appointmentProps={appointments} action={handleAssignAppointment}/>
        <TableGeneric headerProps={PatientHeader} appointmentProps={reserved} action={handleCancelAppointment}/>

      </div>
    );
  };
  
  export default PagePatient;