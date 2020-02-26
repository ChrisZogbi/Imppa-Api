import express, { response } from 'express';
import {getCategoriaClaseService, getCategoriaClaseByNombreCategoriaService, addCategoriaClaseService,  updateCategoriaClaseService, deleteCategoriaClaseService}  
        from '../services/CategoriaClaseService';
import {LogError} from './ErrorLogController';

 export function getCategoriaClaseController(req, res) {

  console.log('lala' + req.baseUrl);
  if(req.query.NombreCategoria)
  {
    getCategoriaClaseByNombreCategoriaService(req)
      .then((response) => {
        console.log("Respuesta" + response.Success)
        
        if(response.Success){res.status(200).json(response)}
        else
        {
          LogError(getCategoriaClaseController.name, response.Data.message)
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
        LogError(getCategoriaClaseController.name, response.Data.message)
        res.status(500).json(response);
      }

    })
    .catch((err) => {
      console.log(err);
    });
  }
} 
  
export async function addCategoriaClaseController(req, res) {
    console.log(req.body);

    addCategoriaClaseService(req)
    .then((response) => {
      console.log("Respuesta" + response.Success)
      
      if(response.Success){res.status(200).json(response)}
      else
      {
        LogError(addCategoriaClaseController.name, response.Data.message)
        res.status(500).json(response);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function updateCategoriaClaseController(req, res) {
  console.log(req.body);

  updateCategoriaClaseService(req)
  .then((response) => {
    console.log("Respuesta" + response.Success)
    
    if(response.Success){res.status(200).json(response)}
    else
    {
      LogError(updateCategoriaClaseController.name, response.Data.message)
      res.status(500).json(response);
    }
  })
  .catch((err) => {
    console.log(err);
  });
}

export function deleteCategoriaClaseController(req, res) {
  console.log(req.body);

  deleteCategoriaClaseService(req)
  .then((response) => {
    console.log("Respuesta" + response.Success)
    
    if(response.Success){res.status(200).json(response)}
    else
    {
      LogError(deleteCategoriaClaseController.name, response.Data.message)
      res.status(500).json(response);
    }
  })
  .catch((err) => {
    console.log(err);
  });
}