import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css"
export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    navigate('/login');
  }, []);

  return null;
}
