import {getSubscipcionController, addSubscipcionController, updateSubscipcionController, deleteSubscipcionController} from '../controllers/SubscripcionController';

export let getSubscipcion = async (req, res) => {
    console.log("GetUsers Route inicio" + req.baseUrl);
    return( getSubscipcionController(req,res));
}

export let  addSubscipcion = async (req, res) => {
    return(addSubscipcionController(req, res));
}

export let updateSubscipcion = async (req, res) => {
    return(updateSubscipcionController(req, res));
}

export let deleteSubscipcion = async (req, res) => {
    return(deleteSubscipcionController(req, res));
} 