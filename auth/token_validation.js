import { verify } from 'jsonwebtoken';
import { JWT_SECRET, JWT_RT_SECRET } from './passportConfiguration'
import { sign } from 'jsonwebtoken';
import * as RefreshTokenService from '../services/RefreshTokenService'

var jwtDecode = require('jwt-decode');

export const checkToken = (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
        token = token.slice(7);
        verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(403).json({
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
        res.status(401).json({
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

export const generateRefreshToken = async (UserObject) => {
    return new Promise((resolve, reject) => {
        let refreshToken = sign({ result: UserObject }, JWT_RT_SECRET);
        RefreshTokenService.saveRefreshToken(UserObject.ID, refreshToken)
            .then((response) => {
                if (!response.Success) {
                    LogError(generateRefreshToken.name, err);
                    resolve({ Success: false, Message: "Ha ocurrido un error al generar Refresh Token", Data: err.message });
                }
                resolve({ Success: true, Data: { RefreshToken: refreshToken } });
            });
    })
        .then((result) => {
            return (result)
        });
}