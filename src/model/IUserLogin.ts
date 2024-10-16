interface IUserLogin {
    name?: string,
    lastName?: string,
    profileImage?: string | ArrayBuffer | null | unknown,
    email: string,
    password: string
}