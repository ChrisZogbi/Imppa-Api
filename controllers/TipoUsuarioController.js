var express = require('express');
var TipoUsuarioService  = require('../services/TipoUsuarioService');

 exports.getTipoUsuario = function(req, res) {
   console.log(req.query.Id);
   if(req.query.Id)
   {
      var data = TipoUsuarioService.getTipoUsuarioById(req, res);
   }
   else
   {
      var data = TipoUsuarioService.getTipoUsuario(req, res);
   }
   
   return(data);
 };

 exports.addTipoUsuario = function(req, res) {
    console.log(req.body);
    return(TipoUsuarioServicepo.addTipoUsuario(req, res));
};

exports.updateTipoUsuario = function(req, res) {
  console.log(req.body);
  return(TipoUsuarioService.updateTipoUsuario(req, res));
};

exports.deleteTipoUsuario = function(req, res) {
  console.log(req.body);
  return(TipoUsuarioService.deleteTipoUsuario(req, res));
};