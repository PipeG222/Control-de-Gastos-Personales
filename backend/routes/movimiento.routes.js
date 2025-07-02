const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const movimientoController = require('../controllers/movimiento.controller');

router.get('/', auth, movimientoController.obtenerMovimientos);
router.post('/crear', auth, movimientoController.crearMovimiento);
router.post('/:id', auth, movimientoController.eliminarMovimiento);

module.exports = router;
