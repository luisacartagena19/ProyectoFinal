import React, { Component } from "react";
import { productosprops } from '../../../shared/data/datos.js';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Table, Button, Container, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup } from 'reactstrap';
import EditarModal from './editarModal';
import EliminarModal from './eliminarModal';
import '../../../shared/estiloLanding.css'

class ListaProductos extends React.Component {
    constructor(props) {
        super(props);
        const productosGuardados = localStorage.getItem('productos');
        this.state = {
            productos: productosGuardados ? JSON.parse(productosGuardados) : productosprops,
            form:{
                id: '',
                nombre: '',
                marca: '',
                tipo:'',
                precio: '',
                colores:'',
            },
            modalInsertar:false,
    modalEditar: false,
    productoEditar: null,
    modalEliminar: false,
    productoEliminar: null,
};
    }

    handleChange=e=>{
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value,
            }
        })
    }

    mostrarModalInsertar=()=>{
        this.setState({modalInsertar:true});
    }

    ocultarModalInsertar=()=>{
        this.setState({modalInsertar:false});
    }

    mostrarModalEditar = (producto) => {
        this.setState({
            modalEditar: true,
            productoEditar: producto,
        });
    }

    ocultarModalEditar = () => {
        this.setState({
            modalEditar: false,
            productoEditar: null,
        });
    }

    mostrarModalEliminar = (producto) => {
        this.setState({
            modalEliminar: true,
            productoEliminar: producto,
        });
    }

    ocultarModalEliminar = () => {
        this.setState({
            modalEliminar: false,
            productoEliminar: null,
        });
    }

    guardarEdicion = (productoEditado) => {
        const productosActualizados = this.state.productos.map(prod =>
            prod.id === productoEditado.id ? productoEditado : prod
        );
        this.setState({
            productos: productosActualizados,
            modalEditar: false,
            productoEditar: null,
        });
        localStorage.setItem('productos', JSON.stringify(productosActualizados));
    }

    eliminarProducto = (id) => {
        const productosFiltrados = this.state.productos.filter(prod => prod.id !== id);
        this.setState({
            productos: productosFiltrados,
            modalEliminar: false,
            productoEliminar: null,
        });
        localStorage.setItem('productos', JSON.stringify(productosFiltrados));
    }

    insertar=()=>{
        const nuevoProducto = {...this.state.form};
        nuevoProducto.id = this.state.productos.length + 1;
        nuevoProducto.tipoProducto = nuevoProducto.tipo;
        delete nuevoProducto.tipo;
        if(typeof nuevoProducto.colores === 'string'){
            nuevoProducto.colores = nuevoProducto.colores.split(',').map(color => color.trim());
        }
        const productosActualizados = [...this.state.productos, nuevoProducto];
        this.setState({
            productos: productosActualizados,
            modalInsertar: false,
            form: {
                id: '',
                nombre: '',
                marca: '',
                tipo:'',
                precio: '',
                colores:'',
            }
        });
        localStorage.setItem('productos', JSON.stringify(productosActualizados));
    }

    render() {
        return (
            <>
                <Container className="container-productos">
                    <br />
                    <Button className="btn btn-success" onClick={()=>this.mostrarModalInsertar()}>Agregar Nuevo Producto</Button>
                    <br />
               
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Marca</th>
                            <th>Precio</th>
                            <th>Tipo Producto</th>
                            <th>Colores</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.productos.map((producto) => (
                            <tr key={producto.id}>
                                <td>{producto.id}</td>
                                <td>{producto.nombre}</td>
                                <td>{producto.marca}</td>
                                <td>{producto.precio}</td>
                                <td>{producto.tipoProducto}</td>
                                <td>{producto.colores ? producto.colores.join(', ') : ''}</td>
                                <td>
                                    <Button className="btn btn-info btn-sm" onClick={() => this.mostrarModalEditar(producto)}><FontAwesomeIcon icon={faEdit} /></Button> {"  "}
                                    <Button className="btn btn-danger btn-sm" onClick={() => this.mostrarModalEliminar(producto)}><FontAwesomeIcon icon={faTrashAlt} /></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                </Container>
                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader>Crear Producto</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="id">ID</label>
                            <input className="form-control" type="text" name="id" id="id" readOnly value={this.state.productos.length+1}></input>
                            <br />
                            <label htmlFor="nombre">Nombre:</label>
                            <input className="form-control" type="text" name="nombre" id="nombre" onChange={this.handleChange}></input>
                            <br />
                            <label htmlFor="marca">Marca:</label>
                            <input className="form-control" type="text" name="marca" id="marca" onChange={this.handleChange}></input>
                            <br />
                            <label htmlFor="precio">Tipo Producto:</label>
                            <input className="form-control" type="text" name="tipo" id="tipo" onChange={this.handleChange}/>
                            <br />
                            <label htmlFor="precio">Precio</label>
                            <input className="form-control" type="number" name="precio" id="precio" onChange={this.handleChange}/>
                            <br />
                            <label htmlFor="colores">Colores</label>
                            <input className="form-control" type="text" name="colores" id="colores" onChange={this.handleChange}/>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="btn btn-success" onClick={()=>this.insertar()}>Insertar</Button>
                        <Button className="btn btn-danger" onClick={()=>this.ocultarModalInsertar()}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
                <EditarModal
                    isOpen={this.state.modalEditar}
                    toggle={this.ocultarModalEditar}
                    product={this.state.productoEditar}
                    onSave={this.guardarEdicion}
                />
                <EliminarModal
                    isOpen={this.state.modalEliminar}
                    toggle={this.ocultarModalEliminar}
                    product={this.state.productoEliminar}
                    onDelete={this.eliminarProducto}
                />
            </>
        )
    }
}

export default ListaProductos;
 
