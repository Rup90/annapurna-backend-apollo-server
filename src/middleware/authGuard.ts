import  { Response, NextFunction } from 'express';
import JwdTokenPayload from './jwtpayload.interface';
import { verify } from 'jsonwebtoken';
import Constants from '../contants/constants';
// import JwdTokenPayload from '../interface/JwdTokenPayload';
// import AuthGuardRequest from '../interface/AuthGuardRequest';

export default (authtoken: any) => {
    if (!authtoken) {
        return false
    }

    const token: string[] = authtoken.split(' ');
    let jwtPayload: JwdTokenPayload;
    try {
        jwtPayload = <JwdTokenPayload>verify(token[1], Constants.JWT_PRIVATE_KEY);
    } catch {
        return false;
    }
    if(!jwtPayload) {
       return false;
    }

    const userResponse = {
        user_id: jwtPayload.user_id,
        role: jwtPayload.role,
        isAuth: true,
        token: token[1]
    }
    return userResponse;
};