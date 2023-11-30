import React from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { ImSpinner3 } from 'react-icons/im';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './productos.css';
import { useEffect } from 'react';
import { useState } from 'react';

export const Productos = () => {
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
            {
                loading ?
                    <div className='spinner'><ImSpinner3/></div> :
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>ID</th>
                                <th>Títle</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Url</th>
                                <th>IdTipoProducto</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            productos.map((producto) => {
                                return (<tr>
                                    <td>{producto.id}</td>
                                    <td>{producto.title}</td>
                                    <td>{producto.url}</td>
                                    <td>{producto.description}</td>
                                    <td>
                                    <Link to="" className="btn btn-warning border">Editar</Link>
                                    <Link to="" className="btn btn-danger border">Eliminar</Link>
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