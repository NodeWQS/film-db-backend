enum Roles {
    'ADMIN',
    'USER'
}

export interface RegDto {
    email: string,
    password: string,
    name: string,
    lastname: string,
    token: string
}

export interface LoginDto {
    email: string,
    password: string
}

export interface TokenDto {
    token: string       
}