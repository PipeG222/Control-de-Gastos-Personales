const API = import.meta.env.VITE_API_URL;

const getToken = () => localStorage.getItem('token');

export const fetchCategorias = async () => {
  const res = await fetch(`${API}/categorias`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.json();
};

export const getMovimientos = async (token) => {
  const res = await fetch(`${API}/movimientos`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
};
export const createMovimiento = async (data, token) => {
  const res = await fetch(`${API}/movimientos/crear`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};