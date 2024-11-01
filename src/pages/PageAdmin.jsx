import React, { useState, useEffect } from 'react'
import TableAdmin from '../components/Table/TableAdmin';

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
    <TableAdmin users={users}/>
  );
};

export default PageAdmin;