import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setProducts(res.data));
  }, []);

  const fetchProducts = async () => {
    const token = localStorage.getItem('token');
    let query = '';

    if (search) query += `search=${search}&`;
    if (minPrice) query += `minPrice=${minPrice}&`;
    if (maxPrice) query += `maxPrice=${maxPrice}&`;

    const res = await axios.get(`http://localhost:3000/products?${query}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:3000/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setProducts(products.filter((p) => p._id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>
      <div style={{ marginBottom: '20px' }}>
        <input
          placeholder="Search by name or description"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <input
          placeholder="Min Price"
          type="number"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
          style={{ marginLeft: '10px' }}
        />
        <input
          placeholder="Max Price"
          type="number"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
          style={{ marginLeft: '10px' }}
        />
        <button onClick={fetchProducts} style={{ marginLeft: '10px' }}>Filter</button>
      </div>
      <button onClick={() => navigate("/add")}>Add Product</button>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
        style={{ float: "right" }}
      >
       Logout
      </button>

      <br />
      <br />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>{p.price}</td>
              <td>
                <button onClick={() => navigate(`/edit/${p._id}`)}>Edit</button>
                <button
                  onClick={() => handleDelete(p._id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
