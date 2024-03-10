export interface Author {
    username: string;
    bio: string;
    image: string;
    following: boolean;
}

export interface SignupInfo {
    username: string;
    email: string;
    password: string;
}

// omit password from SignupInfo and include
// token: string;
// bio: string;
// image: string;
export type SignupResponse = Omit<SignupInfo, 'password'> & {
    token: string;
    bio: string;
    image: string;
};

export interface UserResponse {
    email: string;
    token: string;
    username: string;
    bio: string;
    image: string;
}

// create new interface as `UserProfile` but omit token from `UserResponse`
export type UserProfile = Omit<UserResponse, 'token' | 'email'> & {
    following: boolean;
};
