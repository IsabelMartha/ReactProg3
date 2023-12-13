import React, { useState } from 'react';
import { ImSpinner3 } from 'react-icons/im';

const AgregarProducto = () => {
  const [loading, setLoading] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    title: '',
    description: '',
    price: 0,
    file: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNuevoProducto({ ...nuevoProducto, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setNuevoProducto({ ...nuevoProducto, file });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('id', nuevoProducto.id);
      formData.append('title', nuevoProducto.title);
      formData.append('description', nuevoProducto.description);
      formData.append('price', nuevoProducto.price);
      formData.append('url', nuevoProducto.url);
      formData.append('idtipoproducto', nuevoProducto.idtipoproducto);
      formData.append('file', nuevoProducto.file);

      const response = await fetch('https://localhost:7074/Producto', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al agregar el producto');
      }

      setNuevoProducto({
        id : 0,
        title: '',
        description: '',
        price: 0,
        url:'',
        idtipoproducto:0,
        file: null,
      });

      // Aquí puedes agregar lógica adicional luego de agregar el producto
      console.log('Producto agregado correctamente');
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="agregar-producto">
      <h2>Agregar Producto</h2>
      <form onSubmit={handleSubmit}>
      <label>
          ID:
          <input type="number" name="id" value={nuevoProducto.id} onChange={handleInputChange} />
        </label>
        <label>
          Nombre:
          <input type="text" name="title" value={nuevoProducto.title} onChange={handleInputChange} />
        </label>
        <label>
          Descripción:
          <input type="text" name="description" value={nuevoProducto.description} onChange={handleInputChange} />
        </label>
        <label>
          Precio:
          <input type="number" name="price" value={nuevoProducto.price} onChange={handleInputChange} />
        </label>
        <label>
          Url
          <input type="text" name="url" value={nuevoProducto.url} onChange={handleInputChange} />
        </label>
        <label>
          IdTipoProducto:
          <input type="number" name="idtipoproducto" value={nuevoProducto.idtipoproducto} onChange={handleInputChange} />
        </label>
        <label>
          Imagen:
          <input type="file" name="file" onChange={handleFileChange} />
        </label>
        <button type="submit">{loading ? <ImSpinner3 className='spinner' /> : 'Agregar Producto'}</button>
      </form>
    </div>
  );
};

export default AgregarProducto;
