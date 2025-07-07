import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from 'reactstrap';

const EditarModal = ({ isOpen, toggle, product, onSave }) => {
  const [form, setForm] = useState({
    id: '',
    nombre: '',
    marca: '',
    tipoProducto: '',
    precio: '',
    colores: '',
  });

  useEffect(() => {
    if (product) {
      setForm({
        id: product.id || '',
        nombre: product.nombre || '',
        marca: product.marca || '',
        tipoProducto: product.tipoProducto || '',
        precio: product.precio || '',
        colores: product.colores ? product.colores.join(', ') : '',
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const updatedProduct = {
      ...form,
      colores: form.colores ? form.colores.split(',').map(color => color.trim()) : [],
      precio: Number(form.precio),
    };
    onSave(updatedProduct);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>

      <ModalHeader toggle={toggle}>Editar Producto</ModalHeader>
      
      <ModalBody>

        <FormGroup>
          <Label for="id">ID</Label>
          <Input type="text" name="id" id="id" value={form.id} readOnly />
        </FormGroup>

        <FormGroup>
          <Label for="nombre">Nombre</Label>
          <Input type="text" name="nombre" id="nombre" value={form.nombre} onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <Label for="marca">Marca</Label>
          <Input type="text" name="marca" id="marca" value={form.marca} onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <Label for="tipoProducto">Tipo Producto</Label>
          <Input type="text" name="tipoProducto" id="tipoProducto" value={form.tipoProducto} onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <Label for="precio">Precio</Label>
          <Input type="number" name="precio" id="precio" value={form.precio} onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <Label for="colores">Colores</Label>
          <Input type="text" name="colores" id="colores" value={form.colores} onChange={handleChange} />
        </FormGroup>

      </ModalBody>

      <ModalFooter>
        <Button color="danger" onClick={handleSave}>Guardar</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancelar</Button>
      </ModalFooter>

    </Modal>
  );
};

export default EditarModal;
