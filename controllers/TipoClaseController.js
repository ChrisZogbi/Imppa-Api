import express, { response } from 'express';
import {getTipoClaseService, addTipoClaseService, updateTipoClaseService, deleteTipoClaseService}  from '../services/TipoClaseService';
import {LogError} from './ErrorLogController';

 export function getTipoClaseController(req, res) {

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
  
export async function addTipoClaseController(req, res) {
    console.log(req.body);

    addTipoClaseService(req)
    .then((response) => {
      console.log("Respuesta" + response.Success)
      
      if(response.Success){res.status(200).json(response)}
      else
      {
        LogError(addTipoClaseController.name, response.Data.message)
        res.status(500).json(response);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function updateTipoClaseController(req, res) {
  console.log(req.body);

  updateTipoClaseService(req)
  .then((response) => {
    console.log("Respuesta" + response.Success)
    
    if(response.Success){res.status(200).json(response)}
    else
    {
      LogError(updateTipoClaseController.name, response.Data.message)
      res.status(500).json(response);
    }
  })
  .catch((err) => {
    console.log(err);
  });
}

export function deleteTipoClaseController(req, res) {
  console.log(req.body);

  deleteTipoClaseService(req).then((response) => {
    console.log("Respuesta" + response.Success)
    
    if(response.Success){res.status(200).json(response)}
    else
    {
      LogError(deleteTipoClaseController.name, response.Data.message)
      res.status(500).json(response);
    }
  })
  .catch((err) => {
    console.log(err);
  });
}