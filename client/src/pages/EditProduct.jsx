import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ name: '', description: '', price: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:3000/products`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      const p = res.data.find(p => p._id === id);
      if (p) setProduct(p);
    });
  }, [id]);

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:3000/products/${id}`, {
      name: product.name,
      description: product.description,
      price: parseFloat(product.price)
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    navigate('/products');
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <input value={product.name} onChange={e => setProduct({ ...product, name: e.target.value })} /><br />
      <input value={product.description} onChange={e => setProduct({ ...product, description: e.target.value })} /><br />
      <input value={product.price} onChange={e => setProduct({ ...product, price: e.target.value })} /><br />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}
