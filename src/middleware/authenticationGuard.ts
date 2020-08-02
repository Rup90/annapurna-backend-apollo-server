const jwt = require('jsonwebtoken');

import Constants from '../contants/constants';

import JwdTokenPayload from '../interface/jwtpayload.interface';

import { NextFunction } from 'express';

import AuthGuardRequest from '../interface/authGuardRequest.interface';

 

 

module.exports = (req: AuthGuardRequest, res: Response, next: NextFunction) => {

 

    const xToken = <string>req.headers['authorization'];

    const xRefreshToken = <string>req.headers['x-refresh-token'];

 

    if(!xToken) {

        req.isAuth = false;

        return next();

    }

 

    // 'x-token': Bearer reqToken

    const token = xToken.split(' ')[1];

    // 'x-refresh-token': Bearer reqRefreshToken

    const refreshToken = xRefreshToken.split(' ')[1];

 

    if (!token || token === '') {

        req.isAuth = false;

        return false;

    }

 

    let decodedToken: JwdTokenPayload;

    try {

        decodedToken = jwt.verify(token, Constants.APP_SECRET);

    } catch (err) {

        req.isAuth = false;

        return next();

    }

 

    if (!decodedToken) {

        req.isAuth = false;

        return next();

    }

 

    req.isAuth = true;

    req.user_id = decodedToken.user_id;

    req.role = decodedToken.role;

    req.token = token;

    req.refreshToken = refreshToken; 

    next();

}