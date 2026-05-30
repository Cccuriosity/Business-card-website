export interface LoginDTO {
    email: string;
    password: string;
}

export interface LoginResponseDTO {
    token: string;
    is_admin: boolean;
}

export interface RegisterDTO {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone_number: string;
}

export interface ChangePasswordDTO {
    old_password: string;
    new_password: string;
}

export interface ForgotPasswordRequestDTO {
    email: string;
}

export interface ForgotPasswordVerifyDTO {
    email: string;
    code: string;
}

export interface ForgotPasswordResetDTO {
    reset_token: string;
    new_password: string;
}

export interface VerifyDTO {
    email: string;
    code: string;
}
