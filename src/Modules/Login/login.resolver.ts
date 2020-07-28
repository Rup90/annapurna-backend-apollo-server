export default {
    Query: {
        login: (parent: any, args: any, context: any, info: any) => {
            console.log('args ==>', args);
            return {
                token: 'xxxxxxx',
                role: 'FARMER',
                user_id: '123456',
                expiresIn: 60
            };
        }
    }
  };