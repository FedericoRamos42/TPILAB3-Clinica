import React, { useState, useEffect } from 'react';
import TableGeneric from '../components/Table/TableGeneric';
import { headerAdmin } from '../data/headerTable';
import { ComboBoxGeneric } from '../components/ComboBox';
import { Form } from 'react-router-dom';
import FormEditProfile from '../components/Form/FormEditProfile';

const PageAdmin = () => {
  const token = JSON.parse(localStorage.getItem("clinica-token"));
  const [users, setUsers] = useState([]);
  const [stateFiltered, setStateFiltered] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:5190/api/User/');

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
        setUsers(user); 
        console.log("User fetched:", user);
  
      } catch (error) {
        console.error("Error solicitando usuario:", error);
      }
    };
    fetchAdmins();
  }, [stateFiltered]); 
    
    

  

    const handleDeleteAppointment = async (id) => {
      console.log(id)
      try {
        const response = await fetch(`http://localhost:5190/api/User/Delete/${id}`, {
          method: 'DELETE',
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
    const handleEditClick = (user) => {
      setUserToEdit(user); 
      setIsEditModalOpen(true); 
    };
  

    const actions = users.map((user) => [
      {
        icon: 'edit',
        color: 'primary',
        onClick: () => handleEditClick(user), 
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
          { value: 'true', label: 'Activo' },
          { value: 'false', label: 'Inactivo' },]}
          onSelect={setStateFiltered}
        />

        <TableGeneric headers={headerAdmin} data={users} actions={actions} />
        {isEditModalOpen && (
        <FormEditProfile
          open={isEditModalOpen} 
          setOpen={setIsEditModalOpen} 
          userEdit={userToEdit} 
          token={token.token} 
        />
      )}
      </>

    );
  }
    export default PageAdmin;