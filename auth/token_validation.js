import { verify } from 'jsonwebtoken';
import {JWT_SECRET} from './passportConfiguration'
import { sign } from 'jsonwebtoken';

export const checkToken = (req, res, next) => {
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

export const generateUserToken = async (UserObject) => {
    return new Promise((resolve, reject) => {
      resolve(sign({ result: UserObject }, JWT_SECRET, { expiresIn: "12h" }));
    })
      .then((result) => {
        return (result)
      });
  };