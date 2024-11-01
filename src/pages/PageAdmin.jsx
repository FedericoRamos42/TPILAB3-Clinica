import React, { useState, useEffect } from 'react';
import TableGeneric from '../components/Table/TableGeneric';
import { headerDoctor } from '../data/headerTable';
// import TableAdmin from '../components/Table/TableAdmin';
// import { AdminHeader } from '../data/AdminHeader';
const PageAdmin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:5190/api/Doctor/GetAllDoctors'); //poner mismo endpoint a para los get

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


  return (
    <>
      ejemplo para traer doctores
      <TableGeneric headers={headerDoctor} data={users} />
    </>
    // <TableAdmin headerProps={AdminHeader} userProps={users} />
  );
};

export default PageAdmin;