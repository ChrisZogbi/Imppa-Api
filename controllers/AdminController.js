import { LogError } from './ErrorLogController';
import { deleteTipoUsuarioService, updateTipoUsuarioService, addTipoUsuarioService } from '../services/TipoUsuarioService';

export async function addTipoUsuarioController(req, res) {
    console.log(req.body);

    addTipoUsuarioService(req)
        .then((response) => {
            console.log("Respuesta" + response.Success)

            if (response.Success) { res.status(200).json(response) }
            else {
                LogError(addTipoUsuarioController.name, response.Data.message)
                res.status(500).json(response);
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

export function updateTipoUsuarioController(req, res) {
    console.log(req.body);

    updateTipoUsuarioService(req)
        .then((response) => {
            console.log("Respuesta" + response.Success)

            if (response.Success) { res.status(200).json(response) }
            else {
                LogError(updateTipoUsuarioController.name, response.Data.message)
                res.status(500).json(response);
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

export function deleteTipoUsuarioController(req, res) {
    console.log(req.body);

    deleteTipoUsuarioService(req).then((response) => {
        console.log("Respuesta" + response.Success)

        if (response.Success) { res.status(200).json(response) }
        else {
            LogError(deleteTipoUsuarioController.name, response.Data.message)
            res.status(500).json(response);
        }
    })
        .catch((err) => {
            console.log(err);
        });
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