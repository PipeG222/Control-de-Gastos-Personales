const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const categoriaController = require('../controllers/categoria.controller');

router.get('/', auth, categoriaController.obtenerCategorias);

module.exports = router;
