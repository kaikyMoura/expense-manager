import api from "../Api";
import Cookie from 'js-cookie';

export const userLogin = async (usuario: IUserLogin) => {
    return await api.post('/users/login', usuario).then((response) => {
        return Cookie.set('Token', response.data.token, { expires: 1, path: '' })
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