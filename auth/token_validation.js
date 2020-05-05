import { verify } from 'jsonwebtoken';
import {JWT_SECRET} from './passportConfiguration'

export let checkToken = (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
        token = token.slice(7);
        verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                res.json({
                    Success: false,
                    Message: 'Invalid token'
                });
            }
            else {
                next();
            }
        });
    }
    else {
        res.json({
            Success: false,
            Message: 'Access denied! unautorized user'
        });
    }
};