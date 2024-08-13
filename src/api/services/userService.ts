import api from "../Api";

export const userLogin = async (usuario: IUserLogin) => {
    return await api.post('/users/login', usuario).then((response) => {
        return sessionStorage.setItem('Token', response.data.token)
    })
}

export const createUser = (usuario: IUserLogin): Promise<unknown> => {
    return api.post('/users', usuario)
}

export const getUser = async (email: string | null): Promise<IUser> => {
    return await api.get('/users/auth/getUser', {
        params: { email: email }
    }).then(response => {
        return response.data
    })
        .catch((e) => {
            console.log(e)
        })
}