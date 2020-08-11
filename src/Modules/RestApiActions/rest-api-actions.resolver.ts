
export default {
    Query: {
        users: async(parents: any, args: any, context: any, info: any) => {
            const getUserResp = info.session.dataSources.dummyApi.getAllUsers();
            console.log(getUserResp);
            const resp = await getUserResp.then((res: any) => {
                return res;
            })
            console.log(resp);
            const updatedRes: any = [];
            await resp.forEach((element: any) => {
                const { id, name, phone, company } = element;
                const respObj = {
                    id: id,
                    name: name,
                    phone: phone,
                    company: {
                        name: company.name,
                        bs: company.bs
                    }
                };
                updatedRes.push(respObj);
            });
            return await updatedRes;
        }
    }
}
