import express from 'express';
var TipoUsuarioService  = require('../services/TipoUsuarioService');
import LogError from './ErrorLogController';

 export function getTipoUsuario(req, res) {
  try 
  {
    console.log(req.query.Id);
    if(req.query.Id)
    {
       var data = TipoUsuarioService.getTipoUsuarioById(req, res);
    }
    else
    {
       var data = TipoUsuarioService.getTipoUsuario(req, res);
    }
    
    return(data);
  }
  catch(e)
  {
    LogError(LugarError, Mensaje);
  }
} 
  
  

 export function addTipoUsuario(req, res) {
    console.log(req.body);
    return(TipoUsuarioService.addTipoUsuario(req, res));
}

export function updateTipoUsuario(req, res) {
  console.log(req.body);
  return(TipoUsuarioService.updateTipoUsuario(req, res));
}

export function deleteTipoUsuario(req, res) {
  console.log(req.body);
  return(TipoUsuarioServicedeleteTipoUsuario(req, res));
}