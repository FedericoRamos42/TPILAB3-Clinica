import React from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { format } from "date-fns"
import ButtonStatus from './ButtonStatus';


function AdminTable({ headerProps, appointmentProps }) {
    // , solicitar = true, elimiar = false, editar = false<w

    const user = JSON.parse(localStorage.getItem("clinica-token")); // Assuming it’s a JSON string
    console.log(user.token)
    const handleRequestAppointment = async (idAppointment, idPatient) => {
        console.log(idAppointment, idPatient)
        try {
            const response = await fetch(`http://localhost:5190/api/Appointment/AssignAppointment`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idAppointment, idPatient }),
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
                        <td className="px-6 py-4"> <ButtonStatus status={appointment.status} /> </td>
                        <td><MDBBtn 
                            onClick={() => handleRequestAppointment(appointment.idAppointment, user.id)}
                        /></td>
                    </tr>
                ))}
            </MDBTableBody>
        </MDBTable>
    );
}

export default AdminTable;
