import React from 'react'
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from 'mdb-react-ui-kit';
const TableAdmin = ({headerProps,user}) => {


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
           <div>hola</div>
          );
        })}
      </MDBTableBody>
    </MDBTable >
  )
}

export default TableAdmin