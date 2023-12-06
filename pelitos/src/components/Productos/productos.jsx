import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CrearProducto = () => {
    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: '',
        descripcion: '',
        precio: 0,
        imagenes: null, // El campo de archivos debe ser inicializado como null
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setNuevoProducto((prevProducto) => ({
            ...prevProducto,
            [name]: files ? files[0] : value, // Si es un campo de archivo, actualiza con el archivo
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', nuevoProducto.nombre);
            formData.append('description', nuevoProducto.descripcion);
            formData.append('price', nuevoProducto.precio);
            formData.append('image', nuevoProducto.imagenes);

            const response = await fetch('https://localhost:7074/Producto/Type', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Error al crear el producto. Status: ${response.status}`);
            }

            navigate('/productos'); // Redireccionar después de crear el producto
        } catch (error) {
            console.error('Error al crear el producto:', error);
        }
    };

    return (
        <div>
            <h2>Crear Producto</h2>
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
                <button type="submit">Crear Producto</button>
            </form>
        </div>
    );
};

export default CrearProducto;
