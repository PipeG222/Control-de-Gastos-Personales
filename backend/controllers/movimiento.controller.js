const pool = require('../config/db');

exports.obtenerMovimientos = async (req, res) => {
  try {
    const idUsuario = req.user.id;

    const [rows] = await pool.execute(
      `SELECT m.*, c.nombre AS categoria, c.tipo 
       FROM movimientos m
       JOIN categorias c ON c.id = m.id_categoria
       WHERE m.id_usuario = ?`,
      [idUsuario]
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener movimientos' });
  }
};
exports.crearMovimiento = async (req, res) => {
  const { id_categoria, monto, descripcion, fecha } = req.body;
  const id_usuario = req.user.id;

  if (!id_categoria || !monto || !fecha) {
    return res.status(400).json({ error: 'Campos obligatorios faltantes' });
  }

  try {
    await pool.execute(
      `INSERT INTO movimientos (id_usuario, id_categoria, monto, descripcion, fecha)
       VALUES (?, ?, ?, ?, ?)`,
      [id_usuario, id_categoria, monto, descripcion || '', fecha]
    );

    res.status(201).json({ message: 'Movimiento registrado correctamente' });
  } catch (error) {
    console.error('Error al crear movimiento:', error);
    res.status(500).json({ error: 'Error al crear movimiento' });
  }
};
exports.eliminarMovimiento = async (req, res) => {
  const idMovimiento = req.params.id;
  const idUsuario = req.user.id;

  try {
    // Verificar que el movimiento pertenezca al usuario
    const [rows] = await pool.execute(
      'SELECT * FROM movimientos WHERE id = ? AND id_usuario = ?',
      [idMovimiento, idUsuario]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Movimiento no encontrado o no autorizado' });
    }

    // Eliminar el movimiento
    await pool.execute('DELETE FROM movimientos WHERE id = ?', [idMovimiento]);

    res.json({ message: 'Movimiento eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar movimiento:', error);
    res.status(500).json({ error: 'Error al eliminar movimiento' });
  }
};
