import React, { useEffect, useState } from 'react';
import TableGeneric from '../TableGeneric';
import { PatientHeader } from '../../data/PatientHeader';
const PagePatient = () => {
    const [appointments, setAppointments] = useState([]);
  
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

    return (
      <div>
        <TableGeneric headerProps={PatientHeader} appointmentProps={appointments} />
      </div>
    );
  };
  
  export default PagePatient;