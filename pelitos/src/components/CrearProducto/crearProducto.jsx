import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:5154';

const CrearProducto = () => {
    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: '',
        descripcion: '',
        precio: 0,
        imagenes: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevoProducto((prevProducto) => ({
            ...prevProducto,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/producto`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoProducto),
            });

            if (!response.ok) {
                throw new Error(`Error al crear el producto. Status: ${response.status}`);
            }

            const productoCreado = await response.json();

            // Opcional: Puedes redirigir a la página de detalles del nuevo producto
            navigate(`/productos/${productoCreado.id}`);
        } catch (error) {
            console.error('Error al crear el producto:', error);
        }
    };

    return (
        <div>
            <h2>Crear Producto</h2>
            <form onSubmit={handleSubmit}>
                <label>Nombre:
                    <input type="text" name="nombre" value={nuevoProducto.nombre} onChange={handleChange} />
                </label>
                <label>Descripción:
                    <textarea name="descripcion" value={nuevoProducto.descripcion} onChange={handleChange} />
                </label>
                <label>Precio:
                    <input type="number" name="precio" value={nuevoProducto.precio} onChange={handleChange} />
                </label>
                <label>Imágenes:
                    <textarea name="imagenes" value={nuevoProducto.imagenes} onChange={handleChange}></textarea>
                </label>
                <button type="submit">Crear Producto</button>
            </form>
        </div>
    );
};

export default CrearProducto;
