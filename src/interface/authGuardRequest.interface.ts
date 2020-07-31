import  { Request } from 'express';

import JwdTokenPayload from './jwtpayload.interface';

 

export default interface AuthGuardRequest extends Request, JwdTokenPayload {

    isAuth: boolean;

}

 