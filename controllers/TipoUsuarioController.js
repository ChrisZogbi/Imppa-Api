import express from 'express';
import {getTipoUsuarioByIdService, getTipoUsuarioService, deleteTipoUsuarioService, updateTipoUsuarioService, addTipoUsuarioService}  from '../services/TipoUsuarioService';
import LogError from './ErrorLogController';

 export function getTipoUsuario(req, res) {
  try 
  {
    console.log('lala' + req.baseUrl);
    if(req.query.Id)
    {
       var data = getTipoUsuarioByIdService(req, res);
    }
    else
    {
       var data = getTipoUsuarioService(req, res);
    }
    
    return(data);
  }
  catch(e)
  {
    //LogError(LugarError, Mensaje);
  }
} 
  
export function addTipoUsuario(req, res) {
    console.log(req.body);
    return(addTipoUsuarioService(req, res));
}

export function updateTipoUsuario(req, res) {
  console.log(req.body);
  return(updateTipoUsuarioService(req, res));
}

export function deleteTipoUsuario(req, res) {
  console.log(req.body);
  return(deleteTipoUsuarioService(req, res));
}