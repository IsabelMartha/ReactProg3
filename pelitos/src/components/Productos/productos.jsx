import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './productos.css';
import Paginador from '../Paginador/paginador';
import Buscador from '../Buscador/buscador';
import ProductosTabla from '../ProductosTabla/productostabla';
const CrearProducto = () => {
    const [showForm, setShowForm] = useState(false);
    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: '',
        descripcion: '',
        precio: 0,
        imagenes: null,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [productos, setProductos] = useState([]); // Definir el estado de los productos

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setNuevoProducto((prevProducto) => ({
            ...prevProducto,
            [name]: files ? files[0] : value,
        }));
    };
    const handlePagination = async (page) => {
        try {
            const response = await fetch(`https://localhost:7074/Productos?page=${page}&size=10`);
            if (!response.ok) {
                throw new Error(`Error al obtener productos. Status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Productos obtenidos:", data); // Agrega un log para verificar los productos obtenidos
            setProductos(data);
            setCurrentPage(page);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };
    
    const handleSearch = async (searchTerm) => {
        try {
            const response = await fetch(`https://localhost:7074/Productos?search=${searchTerm}`);
            if (!response.ok) {
                throw new Error(`Error al obtener productos. Status: ${response.status}`);
                console.log('No existe');
            }
            const data = await response.json();
            setProductos(data); // Actualiza el estado de los productos con los resultados de la búsqueda
        } catch (error) {
            console.error('Error al buscar productos:', error);
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', nuevoProducto.nombre);
            formData.append('description', nuevoProducto.descripcion);
            formData.append('price', nuevoProducto.precio);
            formData.append('file', nuevoProducto.imagenes);
            formData.append('idTipoProducto', 4);

            const response = await fetch('https://localhost:7074/Producto', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Error al crear el producto. Status: ${response.status}`);
            }

            // Limpiar los campos después de un POST exitoso
            setNuevoProducto({
                nombre: '',
                descripcion: '',
                precio: 0,
                imagenes: null,
            });

            navigate('/productos');
            handlePagination(currentPage);
        } catch (error) {
            console.error('Error al crear el producto:', error);
        }
          
    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <div>
            <button onClick={toggleForm} className='primary'>Crear Producto</button>
            {showForm && (
                <div>
                    <form onSubmit={handleSubmit}>
                        <label>Nombre:
                            <input type="text" name="nombre" onChange={handleChange} />
                        </label>
                        <label>Descripción:
                            <textarea name="descripcion" onChange={handleChange} />
                        </label>
                        <label>Precio:
                            <input type="number" name="precio" onChange={handleChange} />
                        </label>
                        <label>Imágenes:
                            <input type="file" name="imagenes" onChange={handleChange} />
                        </label>
                        <button type="submit" className='primary'>Crear Producto</button>
                        <button onClick={toggleForm} className='danger'>Cancelar</button>
                    </form>
                    
                </div>
                
            )}
             <ProductosTabla productos={productos} />
            <Buscador onSearch={handleSearch} />
            <Paginador
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePagination}
/>

        </div>
        
        
    );
};

export default CrearProducto;