import express, { response } from 'express';
import {getCategoriaClaseService, getCategoriaClaseByNombreCategoriaService, addCategoriaClaseService,  updateCategoriaClaseService, deleteCategoriaClaseService}  
        from '../services/CategoriaClaseService';
import {LogError} from './ErrorLogController';

 export function getSubscipcionController(req) {

  console.log('lala' + req.baseUrl);
  if(req.query.NombreCategoria)
  {
    getCategoriaClaseByNombreCategoriaService(req)
      .then((response) => {
        console.log("Respuesta" + response.Success)
        
        if(response.Success){res.status(200).json(response)}
        else
        {
          LogError(getSubscipcionController.name, response.Data.message)
          res.status(500).json(response);
        }
  
      })
      .catch((err) => {
        console.log(err);
      });
  }
  else
  {
    getCategoriaClaseService(req)
    .then((response) => {
      console.log("Respuesta" + response.Success)
      
      if(response.Success){res.status(200).json(response)}
      else
      {
        LogError(getSubscipcionController.name, response.Data.message)
        res.status(500).json(response);
      }

    })
    .catch((err) => {
      console.log(err);
    });
  }
} 
  
export async function addSubscipcionController(req) {
    console.log(req.body);

    addCategoriaClaseService(req)
    .then((response) => {
      console.log("Respuesta" + response.Success)
      
      if(response.Success){res.status(200).json(response)}
      else
      {
        LogError(addSubscipcionController.name, response.Data.message)
        res.status(500).json(response);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function updateSubscipcionController(req) {
  console.log(req.body);

  updateCategoriaClaseService(req)
  .then((response) => {
    console.log("Respuesta" + response.Success)
    
    if(response.Success){res.status(200).json(response)}
    else
    {
      LogError(updateSubscipcionController.name, response.Data.message)
      res.status(500).json(response);
    }
  })
  .catch((err) => {
    console.log(err);
  });
}

export function deleteSubscipcionController(req) {
  console.log(req.body);

  deleteCategoriaClaseService(req)
  .then((response) => {
    console.log("Respuesta" + response.Success)
    
    if(response.Success){res.status(200).json(response)}
    else
    {
      LogError(deleteSubscipcionController.name, response.Data.message)
      res.status(500).json(response);
    }
  })
  .catch((err) => {
    console.log(err);
  });
}