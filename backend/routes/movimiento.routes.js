const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const movimientoController = require('../controllers/movimiento.controller');

router.get('/', auth, movimientoController.obtenerMovimientos);
router.get('/', auth, movimientoController.crearMovimiento);
router.post('/', auth, movimientoController.eliminarMovimiento);

module.exports = router;
