import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import Constants from '../../contants/constants';
import RegisteredUserModel from '../../Models/RegisteredUsers/RegisteredUsers.model';
export default {
    Query: {
        login: async (parent: any, args: any, context: any, info: any) => {
            const response = await RegisteredUserModel.findOne({ email: args.email });
            if (response) {
                const isEqual = await compare(args.password, response.password);
                if (isEqual) {
                    const token = sign ({
                                        user_id: response.id,
                                        role: response.role
                                    },
                                        Constants.APP_SECRET,
                                        { expiresIn: 60 * 60 }
                                    );
                    const refreshToken = sign ({
                                        user_id: response.id,
                                        role: response.role
                                    },
                                        Constants.APP_REFRESH_SECRET,
                                        { expiresIn: '7d' }
                                    );
                    return {
                        __typename: 'LoginSuccessResponse',
                        statusCode: 200,
                        response: {
                            token,
                            refreshToken,
                            role: response.role,
                            user_id: response.id,
                            expiresIn: 60 * 60
                        }
                    }
                } else {
                    return {
                        __typename: 'LoginFaliureResponse',
                        statusCode: 422,
                        response: {
                            message: `Invalid credentials`,
                        }
                    };
                }
            } else {
                return {
                    __typename: 'LoginFaliureResponse',
                    statusCode: 422,
                    response: {
                        message: `User not found`,
                    }
                };
            }
        }
    }
  };