import React from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { ImSpinner3 } from 'react-icons/im';
import AgregarProducto from '../AgregarProducto/agregarproducto';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './productos.css';
import { useEffect } from 'react';
import { useState } from 'react';

export const Productos = () => {
    const [showAgregar, setShowAgregar] = useState(false);// Definición de la variable showAgregar y setShowAgregar
    const fetchData = async () => {
        try {
            let response = await fetch("https://localhost:7074/Producto/Type/1");
            let json = await response.json();
            
            setProductos(json);

            console.log(json);
        } catch(e) {
    
        } finally {
            setLoading(false);
        }
    }
    
    const [loading, setLoading] = useState(true);
    const [productos, setProductos] = useState([]);
    useEffect(() => {
        setLoading(true);
        fetchData();  
    }, []);
    
    return (
        
        <>
        <button className="btn btn-primary" onClick={() => setShowAgregar(true)}>Agregar Producto</button>
        {showAgregar && <AgregarProducto setShowAgregar={setShowAgregar} />}
            {
                loading ?
                    <div className='spinner'><ImSpinner3/></div> :
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
                        {
                            productos.map((producto) => {
                                return (<tr>
                                    <td>{producto.description}</td>
                                    <td>{producto.id}</td>
                                    <td>{producto.title}</td>
                                    <td>{producto.price}</td>
                                    <td>
                                        <Link to="" className="btn btn-primary">Editar</Link>
                                        <Link to="" className="btn btn-secondary">Eliminar</Link>
                                    </td>
                                </tr>);
                            })
                        }
                        </tbody>
                    </Table>
}
            
        </>
    );
}