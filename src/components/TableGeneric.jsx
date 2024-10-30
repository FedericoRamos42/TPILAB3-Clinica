import React from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

function AdminTable() {
    const users = [
        { id: 1, name: 'Alice Johnson', role: 'Admin', email: 'alice@example.com', phone: '123-456-7890', dni: '12345678' },
        { id: 2, name: 'Bob Smith', role: 'User', email: 'bob@example.com', phone: '987-654-3210', dni: '87654321' },
        { id: 3, name: 'Charlie Brown', role: 'Moderator', email: 'charlie@example.com', phone: '456-789-0123', dni: '56789012' }
    ];

    return (
        <MDBTable align="middle" className="shadow-md rounded-lg">
            <MDBTableHead className="bg-gray-100 text-gray-600 uppercase font-semibold">
                <tr>
                    <th scope="col" className="px-6 py-3">Usuario</th>
                    <th scope="col" className="px-6 py-3">Rol</th>
                    <th scope="col" className="px-6 py-3">Email</th>
                    <th scope="col" className="px-6 py-3">Phone</th>
                    <th scope="col" className="px-6 py-3">DNI</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                {users.map(user => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4">{user.name}</td>
                        <td className="px-6 py-4">{user.role}</td>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4">{user.phone}</td>
                        <td className="px-6 py-4">{user.dni}</td>
                    </tr>
                ))}
            </MDBTableBody>
        </MDBTable>
    );
}

export default AdminTable;
