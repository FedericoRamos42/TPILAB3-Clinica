import React, { useState, useEffect } from 'react';
import TableGeneric from '../components/Table/TableGeneric';
import { headerAdmin } from '../data/headerTable';
import { ComboBoxGeneric } from '../components/ComboBox';

// import TableAdmin from '../components/Table/TableAdmin';
// import { AdminHeader } from '../data/AdminHeader';
const PageAdmin = () => {
  const [users, setUsers] = useState([]);
  const [stateFiltered, setStateFiltered] = useState(null);

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


  //     try {
  //       const response = await fetch(`http://localhost:5190/api/User/${Id}`, {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },

  //       });
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //     } catch (error) {
  //       console.error("Error solicicitando usuario:", error);
  //     }
  //   };
  //   fetchAdmins();
  // }, []);


  useEffect(() => {

    const fetchAdmins = async () => {
      const query = new URLSearchParams();
      if (stateFiltered) query.append('state', stateFiltered);

      try {
        const response = await fetch(`http://localhost:5190/api/User/Filtered?${query.toString()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const user = await response.json();
        setUsers(user); // Actualizamos con el usuario encontrado
        console.log("User fetched:", user);

      } catch (error) {
        console.error("Error solicitando usuario:", error);
        
      }
      {
      fetchAdmins();
    }, [stateFiltered])
    
    

    


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
        <ComboBoxGeneric label="Estado"
          options={[{ value: '', label: 'Todos los Estados' },
          { value: 'Active', label: 'Activo' },
          { value: 'Inactive', label: 'Inactivo' },]}
          onSelect={setStateFiltered}
        />

        <TableGeneric headers={headerAdmin} data={users} actions={actions} />
      </>

    );

    export default PageAdmin;