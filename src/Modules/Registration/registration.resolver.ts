 

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const saltRounds = 12;

const config = require('../../config');

const { RegistrationSuccessResponse } = require('./registration.schema');

import RegisteredUserModel from '../../Models/RegisteredUsers/RegisteredUsers.model';

import { registerValidate } from '../../validators/user';

import consola from 'consola';
import Constants from '../../contants/constants';

 
const generateToken = async (user: typeof RegistrationSuccessResponse) => {    

    const token =  await jwt.sign({

        id: user.id,

        email: user.role

      },
      Constants.APP_SECRET,
      { expiresIn: '1h' }

    );

    const refreshToken = await jwt.sign({

          id: user.id,

          email: user.role

        },

        Constants.APP_REFRESH_SECRET,
        { expiresIn: '7d' }

    );

    return { token, refreshToken };

  }

  export default  {

    Mutation: {

        async register( _: any, args: any, context: any, info: any)  {          

            // validate user data

            const validationResponse = await registerValidate.validate(args.userInput, {abortEarly: false});

            if (validationResponse && validationResponse.error) {

                // consola is elegant console logger for Node.js
                consola.error({

                    message: `validation error \n${validationResponse.error}`,

                    badge: true

                })
                // return failure response

                return {

                    __typename: 'RegistrationFailureResponse',

                    statusCode: 400,

                    response: {

                        message: `validation error \n${validationResponse.error}`,

                    }

                };

            } else {

                const { firstName, lastName, email, password, role } = args.userInput;

                // check if the user already exists with the same email in DB

                const doExists = await RegisteredUserModel.findOne({ email: email });

                if (doExists) {

                // return failure response
                    return {

                        __typename: 'RegistrationFailureResponse',

                        statusCode: 422,

                        response: {

                            message: `This email is already registered!`,

                        }

                    }

                }

                // hash password

                const encryptedPassword = await bcrypt.hash(password, saltRounds);

                const newUser = {

                    firstName,

                    lastName,

                    email,

                    password: encryptedPassword,

                    role: role,

                    isActive: 1,

                    address: '',

                    phoneNumber: '',

                    avatar: '',

                    itemsAdded: [],

                    itemsPicked: []

                };

                // save data

                const response = await new RegisteredUserModel(newUser).save();

                // generate token and refresh token

                const tokens = generateToken(response);

                // return success response

                return {

                    __typename: 'RegistrationSuccessResponse',

                    statusCode: 200,

                    response: {

                        userId: response._id,

                        firstName: response.firstName,

                        lastName: response.lastName,

                        role: response.role,

                        token: (await tokens).token,

                        refreshToken: (await tokens).refreshToken

                    }

                }

            }                

        }

    }

}

 

 