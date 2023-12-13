import React, { useState, useEffect, useCallback } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { ImSpinner3 } from 'react-icons/im';
import AgregarProducto from '../AgregarProducto/agregarproducto';
import Paginador from '../Paginador/paginador';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './productos.css';

export const Productos = () => {
    const [showAgregar, setShowAgregar] = useState(false);
    const [loading, setLoading] = useState(true);
    const [productos, setProductos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const fetchData = useCallback(async () => {
        try {
            let url = `https://localhost:7074/Producto/Type/1?page=${currentPage}&limit=${itemsPerPage}`;
            if (searchTerm) {
                url += `&query=${searchTerm}`;
            }
            let response = await fetch(url);
            let json = await response.json();
            setProductos(json.list);
        } catch (error) {
            // Manejo de errores
        } finally {
            setLoading(false);
        }
    }, [currentPage, itemsPerPage, searchTerm]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        setLoading(true);
        fetchData();
    }, [currentPage, fetchData, searchTerm]);

    return (
        <>
            <button className="btn btn-primary" onClick={() => setShowAgregar(true)}>Agregar Producto</button>
            {showAgregar && <AgregarProducto setShowAgregar={setShowAgregar} />}
            {loading ?
                <div className='spinner'><ImSpinner3 /></div> :
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Título</th>
                                <th>Descripción</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map((producto) => (
                                <tr key={producto.id}>
                                    <td>{producto.description}</td>
                                    <td>{producto.id}</td>
                                    <td>{producto.title}</td>
                                    <td>{producto.price}</td>
                                    <td>
                                        <Link to="" className="btn btn-primary">Editar</Link>
                                        <Link to="" className="btn btn-secondary">Eliminar</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Buscar productos..."
                    />
                    <Paginador
                        currentPage={currentPage}
                        totalPages={Math.ceil(productos.length / itemsPerPage)}
                        onPageChange={handlePageChange}
                    />
                </>
            }
        </>
    );
};

export default Productos;
