import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../../../shared/estiloLanding.css';

const Formulario = () => {
  const [Datos, setDatos] = useState({
    nombres: '',
    apellidos: '',
    telefono: '',
    email: '',
  });

  const [errores, setErrores] = useState({
    nombres: '',
    apellidos: '',
    telefono: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDatos({
      ...Datos,
      [name]: value,
    });

    let error = '';
    if (name === 'nombres') {
      if (!value.trim()) error = 'Obligatorio';
      else if (value.length < 5) error = 'Mínimo 5 caracteres';
      else if (value.length > 30) error = 'Máximo 30 caracteres';
    } else if (name === 'apellidos') {
      if (!value.trim()) error = 'Obligatorios';
      else if (value.length < 5) error = 'Mínimo 5 caracteres';
      else if (value.length > 30) error = 'Máximo 30 caracteres';
    } else if (name === 'telefono') {
      if (!/^\d{7,10}$/.test(value)) error = '7 a 10 dígitos numéricos';
    } else if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) error = 'Email no válido';
    }

    setErrores({
      ...errores,
      [name]: error,
    });
  };

  const isFormValid = () => {
    return (
      Datos.nombres.trim().length >= 5 &&
      Datos.nombres.trim().length <= 30 &&
      Datos.apellidos.trim().length >= 5 &&
      Datos.apellidos.trim().length <= 30 &&
      /^\d{7,10}$/.test(Datos.telefono) &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Datos.email) &&
      !errores.nombres &&
      !errores.apellidos &&
      !errores.telefono &&
      !errores.email
    );
  };

  const handleReset = () => {
    setDatos({
      nombres: '',
      apellidos: '',
      telefono: '',
      email: '',
    });
    setErrores({
      nombres: '',
      apellidos: '',
      telefono: '',
      email: '',
    });
  };

  const handleGuardar = () => {
    Swal.fire({
      title: "Datos enviados correctamente!",
      icon: "success",
      draggable: true
    });
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="w-50 form-container">
        <h2 className="mb-4 text-center">Registrate!</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="nombres" className="form-label">Nombres:</label>
            <input
              type="text"
              id="nombres"
              name="nombres"
              value={Datos.nombres}
              onChange={handleChange}
              className={`form-control ${errores.nombres ? 'is-invalid' : ''}`}
            />
            {errores.nombres && <div className="invalid-feedback">{errores.nombres}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="apellidos" className="form-label">Apellidos:</label>
            <input
              type="text"
              id="apellidos"
              name="apellidos"
              value={Datos.apellidos}
              onChange={handleChange}
              className={`form-control ${errores.apellidos ? 'is-invalid' : ''}`}
            />
            {errores.apellidos && <div className="invalid-feedback">{errores.apellidos}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">Teléfono:</label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              value={Datos.telefono}
              onChange={handleChange}
              className={`form-control ${errores.telefono ? 'is-invalid' : ''}`}
            />
            {errores.telefono && <div className="invalid-feedback">{errores.telefono}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={Datos.email}
              onChange={handleChange}
              className={`form-control ${errores.email ? 'is-invalid' : ''}`}
            />
            {errores.email && <div className="invalid-feedback">{errores.email}</div>}
          </div>

          <button
            type="button"
            onClick={handleGuardar}
            disabled={!isFormValid()}
            className={`btn me-2 ${isFormValid() ? 'btn-success' : 'btn-secondary'}`}
          >
            Guardar
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="btn btn-danger"
          >
            Resetear
          </button>
        </form>
      </div>
    </div>
  );
};

export default Formulario;
