import '../data/DoctorHeader'
import TableGeneric from '../components/TableGeneric';
import EditProfile from '../components/EditProfile';
import { DoctorHeader } from '../data/DoctorHeader';
import { useState, useEffect } from 'react';

const PageDoctor = () => {
    const user = JSON.parse(localStorage.getItem("clinica-token"));

    const [appointments, setAppointments] = useState([]);

    const handleCancelAppointment = async (idAppointment) => {
        console.log(idAppointment)
        try {
            const response = await fetch(`http://localhost:5190/api/Appointment/Cancel/${idAppointment}`, {
                method: 'PUT',
                headers: {
                    // 'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idAppointment }),
            });

            console.log(response)

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Esta es la respuesta del fetch', data);

        } catch (error) {
            console.error("Error solicitando el turno:", error);
        }

    };

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch(`http://localhost:5190/api/Appointment/GetByDoctorId/${user.id}`, {
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
                setAppointments(data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };
        fetchAppointments();
    }, []);



    return (
        <>
            <TableGeneric headerProps={DoctorHeader} appointmentProps={appointments} action={handleCancelAppointment} labelButton={"Cancelar"} />
            <EditProfile />
        </>
    )
}

export default PageDoctor