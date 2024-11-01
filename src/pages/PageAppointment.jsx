
import { useState, useEffect } from 'react';
import TableGeneric from '../components/Table/TableGeneric';
import { headerAppointmentAvailable } from '../data/headerTable';


const PageAppointment = () => {
    const user = JSON.parse(localStorage.getItem("clinica-token"));

    const [appointmentLocal, setAppointmentLocal] = useState([]);


    const handleAssignAppointment = async (idAppointment, idPatient) => {

        const user = JSON.parse(localStorage.getItem("clinica-token"));

        try {
            const response = await fetch(`http://localhost:5190/api/Appointment/AssignAppointment`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idAppointment, idPatient }),
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



    const assign = appointmentLocal.map((appointment) => [
        {
            icon: 'add',
            color: 'primary',
            onClick: () => handleAssignAppointment(appointment.idAppointment, user.id),
        },
    ]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch('http://localhost:5190/api/Appointment');
                console.log(response)
                if (!response.ok) {
                    throw new Error("Error fetching appointments");
                }
                const appointments = await response.json();
                console.log(appointmentLocal);
                setAppointmentLocal(appointments);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };
        fetchAppointments();
    }, []);

    return (
        <TableGeneric data={appointmentLocal} headers={headerAppointmentAvailable} actions={assign} />
    )

}

export default PageAppointment