import React, { useState, useEffect } from 'react';
import TableGeneric from '../components/Table/TableGeneric';
import { headerAdmin} from '../data/headerTable';
// import TableAdmin from '../components/Table/TableAdmin';
// import { AdminHeader } from '../data/AdminHeader';
const PageAdmin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:5190/api/User/'); //poner mismo endpoint a para los get

        if (!response.ok) {
          throw new Error("Error fetching Users");
        }
        const users = await response.json();
        console.log(users);
        setUsers(users);
      } catch (error) {
        console.error("Error fetching Users:", error);
      }
    };
    fetchAppointments();
  }, []);

  const handleDeleteAppointment = async (id) => {
    console.log(id)
    try {
        const response = await fetch(`http://localhost:5190/api/User/Delete/${id}`, {
            method: 'Delete',
            headers: {
                // 'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

    } catch (error) {
        console.error("Error eliminando un usuario:", error);
    }

};

  const actions = users.map((user) => [
    {
      icon: 'edit',
      color: 'primary',
      onClick: () => handleEditAppointment(user.id),
    },
    {
      icon: 'ban',
      color: 'danger',
      onClick: () => handleDeleteAppointment(user.id),
    },

  ]);

  return (
    <>
      <TableGeneric headers={headerAdmin} data={users} actions={actions} />
    </>
   
  );
};

export default PageAdmin;