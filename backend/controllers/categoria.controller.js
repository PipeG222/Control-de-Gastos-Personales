const pool = require('../config/db');

exports.obtenerCategorias = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM categorias');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
};
