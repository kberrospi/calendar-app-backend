/* 
  Rutas de Usuarios / Auth
  host + /api/events
*/


const { Router } = require('express');
const { getEvento, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');
const router = Router();

//todas tienen que pasar por la validacion de token
router.use( validarJWT )

//obtener eventos
router.get('/', getEvento)

//crear evento
router.post('/', 
  [ //middlewares
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','Fecha de inicio es obligatoria').custom(  isDate ) ,
    check('end','Fecha de finalizacion es obligatoria').custom(  isDate ) ,
    validarCampos
  ],
  crearEvento)

//Actualizar evento
router.put('/:id',  
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalización es obligatoria').custom(isDate),
    validarCampos
  ],
  actualizarEvento);

//Actualizar evento
router.delete('/:id', eliminarEvento)

module.exports = router; 