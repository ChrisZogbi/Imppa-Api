import express from 'express';
import {getUserByMailContraseniaService, getUserService, getUsersService, addUserService, updateUserService, deleteUserService} from '../services/UserService';
import {addTipoUsuarioController} from './TipoUsuarioController'

 export function getUsersController(req, res) {
   console.log(req.body);
   if(req.query.Id)
  {
    getUserService(req)
      .then((response) => {
        console.log("Respuesta" + response.Success)
        
        if(response.Success){res.status(200).json(response)}
        else
        {
          LogError(getTipoUsuarioController.name, response.Data.message)
          res.status(500).json(response);
        }
  
      })
      .catch((err) => {
        console.log(err);
      });
  }
  else
  {
    getUsersService()
    .then((response) => {
      console.log("Respuesta" + response.Success)
      
      if(response.Success){res.status(200).json(response)}
      else
      {
        LogError(getUsersController.name, response.Data.message)
        res.status(500).json(response);
      }

    })
    .catch((err) => {
      console.log(err);
    });
  }
}

 export function addUserController(req, res) {
   console.log(req.body);
   addUserService(req)
   .then((response) => {
    console.log("Respuesta" + response.Success)
    
    if(response.Success){res.status(200).json(response)}
    else
    {
      LogError(addUserController.name, response.Data.message)
      res.status(500).json(response);
    }
  })
  .catch((err) => {
    console.log(err);
  });
}

export function updateUserController(req, res) {
  console.log(req.body);
  updateUserService(req)
  .then((response) => {
    console.log("Respuesta" + response.Success)
    
    if(response.Success){res.status(200).json(response)}
    else
    {
      LogError(updateUserController.name, response.Data.message)
      res.status(500).json(response);
    }
  })
  .catch((err) => {
    console.log(err);
  });
}

export function deleteUserController(req, res) {
  console.log(req.body);
  deleteUserService(req)
  .then((response) => {
    console.log("Respuesta" + response.Success)
    
    if(response.Success){res.status(200).json(response)}
    else
    {
      LogError(deleteUserController.name, response.Data.message)
      res.status(500).json(response);
    }
  })
  .catch((err) => {
    console.log(err);
  });
}

export function loginUserController(req, res) {
  console.log(req.body);
  getUserByMailContraseniaService(req)
  .then((response) => {
    console.log("Respuesta" + response.Success)
    
    if(response.Success){res.status(200).json(response)}
    else
    {
      LogError(deleteUserController.name, response.Data.message)
      res.status(500).json(response);
    }
  })
  .catch((err) => {
    console.log(err);
  });
}

