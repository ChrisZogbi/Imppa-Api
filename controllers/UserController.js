import express from 'express';
import {getUserByMailContraseniaService, getUserService, getUsersService, updateUserService, deleteUserService} from '../services/UserService';

 export function getUsersController(req, res) {
   console.log(req.body);
   if(req.body.UserId != null)
   {
      var data = getUserService(req, res);
   }
   else
   {
      var data = getUsersService(req, res);
   }
   
   return(data);
 }

 export function addUserController(req, res) {
    console.log(req.body);
    return(addUserService(req, res));
}

export function updateUserController(req, res) {
  console.log(req.body);
  return(updateUserService(req, res));
}

export function deleteUserController(req, res) {
  console.log(req.body);
  return(deleteUserService(req, res));
}

export function loginUserController(req, res) {
  console.log("LoginUser UserController  " + req.query.Mail);
  return(getUserByMailContraseniaService(req, res))
}