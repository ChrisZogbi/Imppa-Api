import {getSubscipcionController, addSubscipcionController, updateSubscipcionController, deleteSubscipcionController} from '../controllers/SubscripcionController';

export let getSubscipcion = (req, res) => {
    console.log("GetUsers Route inicio" + req.baseUrl);
    return( getSubscipcionController(req,res));
}

export let  addSubscipcion = (req, res) => {
    return(addSubscipcionController(req, res));
}

export let updateSubscipcion = (req, res) => {
    return(updateSubscipcionController(req, res));
}

export let deleteSubscipcion = (req, res) => {
    return(deleteSubscipcionController(req, res));
} 