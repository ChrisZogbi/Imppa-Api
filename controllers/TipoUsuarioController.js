import express, { response } from 'express';
import {getTipoUsuarioByIdService, getTipoUsuarioService, deleteTipoUsuarioService, updateTipoUsuarioService, addTipoUsuarioService}  from '../services/TipoUsuarioService';
import {LogError} from './ErrorLogController';

 export function getTipoUsuarioController(req, res) {

  console.log('lala' + req.baseUrl);
  if(req.query.Id)
  {
      const {Success, Data} = getTipoUsuarioByIdService(req, res);
  }
  else
  {
    getTipoUsuarioService(req)
    .then((response) => {
      console.log("Respuesta" + response.Success)
      
      if(response.Success){res.status(200).json(response.Data)}
      else
      {
        LogError(getTipoUsuarioController.name, response.Data.message)
        res.status(500).json(response.Data);
      }

    })
    .catch((err) => {
      console.log(err);
    });
  }
} 
  
export async function addTipoUsuarioController(req, res) {
    console.log(req.body);
    let response = await addTipoUsuarioService(req);
    
}

export function updateTipoUsuarioController(req, res) {
  console.log(req.body);
  return(updateTipoUsuarioService(req));
}

export function deleteTipoUsuarioController(req, res) {
  console.log(req.body);
  return(deleteTipoUsuarioService(req));
}