export default {
    Query: {
        login: (parent: any, args: any, context: any, info: any) => {
            console.log('args ==>', args);

            if (args.email === 'test@test.com') {
                return {
                    __typename: 'LoginSuccessResponse',
                    statusCode: 200,
                    response: {
                        token: 'xxxxxxx',
                        role: 'FARMER',
                        user_id: '123456',
                        expiresIn: 60
                    }
                }
            }          
            return {
                __typename: 'LoginFaliureResponse',
                statusCode: 422,
                response: {
                    message: `Invalid credentials`,
                }
            };
        }
    }
  };