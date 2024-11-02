import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    from_name: '',
    to_email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const serviceID = 'default_service';
    const templateID = 'template_rbye8qd';
    const userID = 'Qj0OSfCppg3ITow-Z';

    emailjs.send(serviceID, templateID, formData, userID)
      .then((response) => {
        console.log('Email enviado:', response.status, response.text);
        alert('Tu mensaje ha sido enviado exitosamente');
        setFormData({ from_name: '', to_email: '', message: '' });
      })
      .catch((error) => {
        console.error('Error al enviar el email:', error);
        alert('Hubo un problema al enviar tu mensaje. Intenta nuevamente.');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <label className="mb-2 font-semibold text-gray-700">
        Nombre:
        <input
          type="text"
          name="from_name"
          id="from_name"
          value={formData.from_name} 
          required
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>

      <label className="mb-2 font-semibold text-gray-700">
        Email:
        <input
          type="email"
          name="to_email"
          id="to_email"
          value={formData.to_email} 
          onChange={handleChange}
          required
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>

      <label className="mb-2 font-semibold text-gray-700">
        Consulta:
        <textarea
          name="message"
          id="message"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>

      <button type="submit" className="mt-4 p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Enviar
      </button>
    </form>
  );
};

export default ContactForm;
