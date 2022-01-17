const { response } = require('express');
const Evento = require('../models/Evento');

const getEvento = async (req, res = response) => {

  const eventos = await Evento.find().populate('user','name');

  return res.status(201).json({
    ok: true,
    msj:eventos
  });
}

const crearEvento = async (req, res = response) => {

  const evento = new Evento( req.body )

  try {

    evento.user = req.uid
    const eventoGuardado = await evento.save();
    
    res.json({
      ok: true,
      evento: eventoGuardado
    })
    
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msj:'Hable con el administrador'
    });
  }

  
}

const actualizarEvento = async (req, res = response) => {

  const eventoId = req.params.id;
  const { uid } = req

  try {

    const evento = await Evento.findById(eventoId);

    if( !evento ){
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe con ese id'
      });
    }

    if( evento.user.toString() !== uid ){
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegios de editar este evento'
      })
    }

    const nuevoEvento = {
      ...req.body,
      user: uid
    }

    const eventoAcualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );

    res.json({
      ok: true,
      evento: eventoAcualizado
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msj:'Hable con el administrador'
    });
  }

}

const eliminarEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  const { uid } = req

  try {

    const evento = await Evento.findById(eventoId);

    if( !evento ){
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe con ese id'
      });
    }

    if( evento.user.toString() !== uid ){
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegios para eliminar este evento'
      })
    }
    
    await Evento.findByIdAndDelete( eventoId );

    res.json({ ok: true })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msj:'Hable con el administrador'
    });
  }
}


module.exports = {
  getEvento,
  crearEvento,
  actualizarEvento,
  eliminarEvento
}