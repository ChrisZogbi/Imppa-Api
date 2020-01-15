var express = require('express');
var UserService  = require('../services/UserService');

 exports.getUsers = function(req, res) {
   console.log(req.body);
   if(req.body.UserId != null)
   {
      var data = UserService.getUser(req, res);
   }
   else
   {
      var data = UserService.getUsers(req, res);
   }
   
   return(data);
 };

 exports.addUser = function(req, res) {
    console.log(req.body);
    return(UserService.addUser(req, res));
};

exports.updateUser = function(req, res) {
  console.log(req.body);
  return(UserService.updateUser(req, res));
};

exports.deleteUser = function(req, res) {
  console.log(req.body);
  return(UserService.deleteUser(req, res));
};

exports.loginUser = (req, res) => {
  console.log("LoginUser UserController  " + req.query.Mail);
  return(UserService.getUserByMailContrasenia(req, res))
};