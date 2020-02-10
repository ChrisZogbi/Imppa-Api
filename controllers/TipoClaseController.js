import express, { response } from 'express';
import {getTipoClaseService, addTipoClaseService, updateTipoClaseService, deleteTipoClaseService}  from '../services/TipoClaseService';
import {LogError} from './ErrorLogController';

 export function getTipoClaseController(req) {

    console.log('lala' + req.baseUrl);
 
    getTipoClaseService(req)
        .then((response) => {
            console.log("Respuesta" + response.Success)

            if(response.Success){res.status(200).json(response)}
            else
            {
            LogError(getTipoClaseController.name, response.Data.message)
            res.status(500).json(response);
            }

        })
        .catch((err) => {
            console.log(err);
        });
} 
  
export async function addTipoClaseController(req) {
    console.log(req.body);

    addTipoClaseService(req)
    .then((response) => {
      console.log("Respuesta" + response.Success)
      
      if(response.Success){res.status(200).json(response)}
      else
      {
        LogError(addTipoUsuarioController.name, response.Data.message)
        res.status(500).json(response);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function updateTipoClaseController(req) {
  console.log(req.body);

  updateTipoClaseService(req)
  .then((response) => {
    console.log("Respuesta" + response.Success)
    
    if(response.Success){res.status(200).json(response)}
    else
    {
      LogError(updateTipoUsuarioController.name, response.Data.message)
      res.status(500).json(response);
    }
  })
  .catch((err) => {
    console.log(err);
  });
}

export function deleteTipoClaseController(req) {
  console.log(req.body);

  deleteTipoClaseService(req).then((response) => {
    console.log("Respuesta" + response.Success)
    
    if(response.Success){res.status(200).json(response)}
    else
    {
      LogError(deleteTipoUsuarioController.name, response.Data.message)
      res.status(500).json(response);
    }
  })
  .catch((err) => {
    console.log(err);
  });
}