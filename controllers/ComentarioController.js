import express, { response } from 'express';
import {getComentariosByIdProfesorService, getComentarioByIdService, addComentarioService, deleteComentarioService, updateSubcripcionService}  
        from '../services/ComentarioService';
import {LogError} from './ErrorLogController';

 export function getComentarioController(req) {

  console.log('lala' + req.baseUrl);
  if(req.query.IdProfesor)
  {
    getComentariosByIdProfesorService(req)
      .then((response) => {
        console.log("Respuesta" + response.Success)
        
        if(response.Success){res.status(200).json(response)}
        else
        {
          LogError(getComentarioController.name, response.Data.message)
          res.status(500).json(response);
        }
  
      })
      .catch((err) => {
        console.log(err);
      });
  }
  else
  {
    getComentarioByIdService(req)
    .then((response) => {
      console.log("Respuesta" + response.Success)
      
      if(response.Success){res.status(200).json(response)}
      else
      {
        LogError(getComentarioController.name, response.Data.message)
        res.status(500).json(response);
      }

    })
    .catch((err) => {
      console.log(err);
    });
  }
} 
  
export async function addComentarioController(req) {
    console.log(req.body);

    addComentarioService(req)
    .then((response) => {
      console.log("Respuesta" + response.Success)
      
      if(response.Success){res.status(200).json(response)}
      else
      {
        LogError(addComentarioController.name, response.Data.message)
        res.status(500).json(response);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function updateComentarioController(req) {
  console.log(req.body);

  updateSubcripcionService(req)
  .then((response) => {
    console.log("Respuesta" + response.Success)
    
    if(response.Success){res.status(200).json(response)}
    else
    {
      LogError(updateComentarioController.name, response.Data.message)
      res.status(500).json(response);
    }
  })
  .catch((err) => {
    console.log(err);
  });
}

export function deleteComentarioController(req) {
  console.log(req.body);

  deleteComentarioService(req).then((response) => {
    console.log("Respuesta" + response.Success)
    
    if(response.Success){res.status(200).json(response)}
    else
    {
      LogError(deleteComentarioController.name, response.Data.message)
      res.status(500).json(response);
    }
  })
  .catch((err) => {
    console.log(err);
  });
}