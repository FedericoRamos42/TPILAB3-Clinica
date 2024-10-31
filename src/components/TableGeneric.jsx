import React from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { format } from "date-fns"
import ButtonStatus from './ButtonStatus';


function AdminTable({ headerProps, appointmentProps, action }) {

    const user = JSON.parse(localStorage.getItem("clinica-token")); // Assuming it’s a JSON string
    console.log(user.token)

    return (
        <MDBTable align="middle" className="shadow-md rounded-lg">
            <MDBTableHead className="bg-gray-100 text-gray-600 uppercase font-semibold">
                <tr>
                    {headerProps.map((header, index) => (
                        <th scope="col" className="px-6 py-3" key={`${header}-${index}`}>{header}</th>))}
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                {appointmentProps.map((appointment, index) => {
                    console.log("Inspecting appointment:", appointment); // Ahora el log está bien ubicado

                    return (
                        <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="px-6 py-4">{appointment.doctorName}</td>
                            <td className="px-6 py-4">{appointment.doctorSpecialty}</td>
                            <td className="px-6 py-4">{format(new Date(appointment.date), "dd/MM/yyyy")}</td>
                            <td className="px-6 py-4">{appointment.time}</td>
                            <td className="px-6 py-4"><ButtonStatus status={appointment.status} /></td>
                            <td>
                                <MDBBtn
                                    onClick={() => {
                                        console.log("Button clicked, calling action with:",appointment.idAppointment, appointment.patientId || user.id);
                                        action(appointment.idAppointment, appointment.patientId || user.id);
                                    }}
                                >
                                    Asignar {/* Cambia este texto según lo que necesites */}
                                </MDBBtn>
                            </td>
                        </tr>
                    );
                })}
            </MDBTableBody>
        </MDBTable>
    );
}

export default AdminTable;
