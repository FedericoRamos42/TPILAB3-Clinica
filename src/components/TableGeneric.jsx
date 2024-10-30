import React from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';


function AdminTable({ headerProps, appointmentProps }) {

    //const idPatient = localStorage.getItem("clinica-token", data.id); // Assuming it’s a JSON string
    const handleRequestAppointment = async (idAppointment, idPatient) => {

        try {
            const response = await fetch(`http://localhost:5190/api/Appointment/AssignAppointment/}`, {
                method: 'PUT',
                headers: {
                    
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idAppointment, idPatient }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log(data);
            alert("Turno solicitado exitosamente.");
        } catch (error) {
            console.error("Error solicitando el turno:", error);
        }
    };
    

    return (
        <MDBTable align="middle" className="shadow-md rounded-lg">
            <MDBTableHead className="bg-gray-100 text-gray-600 uppercase font-semibold">
                <tr>
                    {headerProps.map((header, index) => (
                        <th scope="col" className="px-6 py-3" key={`${header}-${index}`}>{header}</th>))}
                </tr>
            </MDBTableHead>

            <MDBTableBody>
                {appointmentProps.map((appointment, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4">{appointment.doctorName}</td>
                        <td className="px-6 py-4">{appointment.doctorSpecialty}</td>
                        <td className="px-6 py-4">{format(new Date(appointment.date), "dd/MM/yyyy")}</td>
                        <td className="px-6 py-4">{appointment.time}</td>
                        <td className="px-6 py-4">{appointment.status}</td>
                        <td>
                            <button onClick={() => handleRequestAppointment(appointment.id, idPatient)}
                                className="text-green-500 hover:text-green-700">
                                <FontAwesomeIcon icon={faCheck} />
                            </button>
                        </td>
                    </tr>
                ))}
            </MDBTableBody>
        </MDBTable>
    );
}

export default AdminTable;
