import React, { useState, useEffect } from 'react'
import TableAdmin from '../components/Table/TableAdmin';
import { AdminHeader } from '../data/AdminHeader';
const PageAdmin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:5190/api/User');
        console.log(response)
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
    <TableAdmin headerProps={AdminHeader} userProps={users}/>
  );
};

export default PageAdmin;