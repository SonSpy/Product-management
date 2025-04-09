import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:3000/products', {
      name, description, price: parseFloat(price)
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    navigate('/products');
  };

  return (
    <div>
      <h2>Add Product</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} /><br/>
      <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} /><br/>
      <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} /><br/>
      <button onClick={handleSubmit}>Create</button>
    </div>
  );
}
