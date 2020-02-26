import express from 'express';
import {getUserByMail, getUserByMailContraseniaService, getUserService, getUsersService, addUserService,
        updateUserService, deleteUserService, updateContraseniaService} from '../services/UserService';
import {LogError} from './ErrorLogController';

 export function getUsersController(req, res) {
   console.log(req.body);
   let id = req.query.Id
   
   if(id)
  {
    getUserService(id)
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

 export async function addUserController(req, res) {
   console.log(req.body);

   getUserByMail(req.body.Mail)
    .then((response) =>{

        console.log("Existe usuario con mismo mail: " + response.Success)
        console.log(response);

        if(!response.Success){
            addUserService(req)
            .then((responseAdd) => {
              console.log("Respuesta" + responseAdd.Success)
              
              if(responseAdd.Success){res.status(200).json(responseAdd)}
              else
              {
                LogError(addUserController.name, responseAdd.Data.message)
                res.status(500).json(responseAdd);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
        else{
          LogError(addUserController.name, response.Data.message)
          res.status(500).json(response.Data.message);
        }
    })
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

export function updateContraseniaController(req, res) {
  console.log(req.body);
  updateContraseniaService(req)
  .then((response) => {
    console.log("Respuesta" + response.Success)
    
    if(response.Success){res.status(200).json(response)}
    else
    {
      LogError(updateContraseniaController.name, response.Data.message)
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
    LogError(deleteUserController.name, response.Data.message)
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
      LogError(loginUserController.name, response.Data.message)
      res.status(500).json(response);
    }
  })
  .catch((err) => {
    console.log(err);
    LogError(loginUserController.name, response.Data.message)
  });
}

