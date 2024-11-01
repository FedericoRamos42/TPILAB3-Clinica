import React from 'react'
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from 'mdb-react-ui-kit';
const TableAdmin = ({ headerProps, user }) => {


  return (
    <MDBTable align="middle" className="shadow-md rounded-lg">
      <MDBTableHead className="bg-gray-100 text-gray-600 uppercase font-semibold">
        <tr>
          {headerProps.map((header, index) => (
            <th scope="col" className="px-6 py-3" key={`${header}-${index}`}>{header}</th>))}
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {appointmentProps.map((user, index) => {
          console.log("Inspecting user:", user);

          return (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">{user.lastName}</td>
              <td className="px-6 py-4">{user.rol}</td>
              <td className="px-6 py-4">{user.phoneNumber}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td>
                <MDBBtn
                 >cancelar
                </MDBBtn>
              </td>
            </tr>
          );
        })}
      </MDBTableBody>
    </MDBTable >
  )
}

export default TableAdmin