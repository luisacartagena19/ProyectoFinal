import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const EliminarModal = ({ isOpen, toggle, product, onDelete }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Eliminar Producto</ModalHeader>
      <ModalBody>
        ¿Estás seguro que deseas eliminar el producto <strong>{product ? product.nombre : ''}</strong>?
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={() => { onDelete(product.id); toggle(); }}>
          Eliminar
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EliminarModal;
