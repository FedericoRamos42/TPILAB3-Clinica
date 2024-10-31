import React, { useEffect, useState } from 'react';
import TableGeneric from '../TableGeneric';
import { PatientHeader } from '../../data/PatientHeader';
const PagePatient = () => {
  
  const user = JSON.parse(localStorage.getItem("clinica-token"));

    const [appointments, setAppointments] = useState([]);
    const [reserved,setReserved] = useState([]);
  
    useEffect(() => {
      const fetchAppointments = async () => {
        try {
          const response = await fetch('http://localhost:5190/api/Appointment');
          console.log(response)
          if (!response.ok) {
            throw new Error("Error fetching appointments");
          }
          const data = await response.json();
          console.log(data);
          setAppointments(data);
        } catch (error) {
          console.error("Error fetching appointments:", error);
        }
      };
      fetchAppointments();
    }, []);

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
        <TableGeneric headerProps={PatientHeader} appointmentProps={appointments} />
        <TableGeneric headerProps={PatientHeader} appointmentProps={reserved}/>

      </div>
    );
  };
  
  export default PagePatient;