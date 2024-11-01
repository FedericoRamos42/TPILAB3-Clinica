
import { useState, useEffect } from 'react';
import TableGeneric from '../components/Table/TableGeneric';
import { headerAppointmentAvailable } from '../data/headerTable';
import { ComboBoxGeneric } from '../components/ComboBox';


const PageAppointment = () => {
    const user = JSON.parse(localStorage.getItem("clinica-token"));
    const [specialtyOptions, setSpecialtyOptions] = useState([]);

    const [appointmentLocal, setAppointmentLocal] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('');

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


            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
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
                console.log("Selected Specialty:", selectedSpecialty);
                
                // Construir los parámetros de consulta (query parameters)
                const query = new URLSearchParams();
                if (selectedSpecialty) query.append('idSpecialty', selectedSpecialty); // Cambiado a 'idSpecialty' si ese es el nombre en el backend
                if (selectedDate) query.append('date', selectedDate);

                // Realizar la solicitud a la API con los parámetros de consulta
                const response = await fetch(`http://localhost:5190/api/Appointment/Filtered?${query.toString()}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                });

                // Comprobar si la respuesta es válida
                if (!response.ok) {
                    throw new Error("Error en el fetch");
                }

                // Analizar la respuesta JSON y actualizar el estado
                const appointments = await response.json();
                setAppointmentLocal(appointments); // Actualizar el estado con las citas obtenidas
                console.log("Appointments fetched:", appointments);

            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchAppointments(); // Llamar a la función de fetch cuando cambien los parámetros

    }, [selectedSpecialty, selectedDate]); // Ejecutar el efecto cuando cambien `selectedSpecialty` o `selectedDate`


    useEffect(() => {
        const fetchSpecialties = async () => {
            try {
                const response = await fetch('http://localhost:5190/api/Specialty/GetAllSpecialties'); 
                if (!response.ok) {
                    throw new Error("Error fetching specialties");
                }
                const specialties = await response.json();
                const formattedSpecialties = specialties.map(specialty => ({
                    value: specialty.id,  
                    label: specialty.name 
                }));
                setSpecialtyOptions(formattedSpecialties);
            } catch (error) {
                console.error("Error fetching specialties:", error);
            }
        };

        fetchSpecialties(); 
    }, []);

    return (
        <>
        <ComboBoxGeneric label="Especialidad" options={specialtyOptions} onSelect={setSelectedSpecialty} />

        <TableGeneric data={appointmentLocal} headers={headerAppointmentAvailable} actions={assign} />
        </>
    )

}

export default PageAppointment