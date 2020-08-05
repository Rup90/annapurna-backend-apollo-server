
export default {
    Query: {
        users: async(parents: any, args: any, { injector  }: any) => {
            // const getUserResp = injector.get(DummyRestAPI).getUserInformation();
            // console.log(getUserResp);
            return true
        }
    }
}
