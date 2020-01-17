import express from 'express';
import { getTipoUsuarioById, getTipoUsuario, addTipoUsuario, updateTipoUsuario, deleteTipoUsuario } from '../services/TipoUsuarioService';
import LogError from './ErrorLogController';

 export function getTipoUsuario(req, res) {
  try 
  {
    console.log(req.query.Id);
    if(req.query.Id)
    {
       var data = getTipoUsuarioById(req, res);
    }
    else
    {
       var data = getTipoUsuario(req, res);
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
    return(addTipoUsuario(req, res));
}

export function updateTipoUsuario(req, res) {
  console.log(req.body);
  return(updateTipoUsuario(req, res));
}

export function deleteTipoUsuario(req, res) {
  console.log(req.body);
  return(deleteTipoUsuario(req, res));
}