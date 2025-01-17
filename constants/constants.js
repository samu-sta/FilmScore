export const TIME_EXPIRATION = {
    ACCESS_TOKEN: '1d',
    COOKIE_EXPIRATION: 24 * 60 * 60 * 1000,
}
export const ERROR_MESSAGES = {
    INVALID_TOKEN: "Invalid token",
    UNAUTHORIZED: "Unauthorized",
    USER_NOT_FOUND: "User not found",
    INTERNAL_SERVER_ERROR: "Internal Server Error",
    INVALID_PASSWORD: "Invalid password",
    USER_ALREADY_REGISTERED: "User already registered",
    FETCH_ERROR: "There was a problem with the fetch operation"
};

export const SUCCESS_MESSAGES = {
    LOGIN_SUCCESS: "Login successful",
    LOGOUT_SUCCESS: "Logout successful",
    USER_CREATED: "User created successfully",
    PASSWORD_CHANGED: "Password changed successfully"
};
export const PORT = 4000;

export const BASE_URL = `http://localhost:${PORT}`;

export const API_URLS = {
    LOGIN: '/api/profile/login',
    REGISTER: '/api/profile/register',
    LOGOUT: '/api/profile/logout',
    PROFILE: '/api/profile',
    PASSWORD: '/api/profile/password',
    MOVIES: '/api/content',
    REVIEW_PARAMS: '/api/reviews/:movieId',
    REVIEW: '/api/reviews',
    REVIEW_DELETE: '/api/reviews/:userFk/:contentFk',
    EMAIL: '/api/profile/email',
}

export const CLIENT_URLS = {
    HOME: '/home',
    LOGIN: '/login',
    REGISTER: '/register',
    PROFILE: '/profile',
    CHANGE_PASSWORD: '/changePassword',
    MOVIE: '/movie/:id',
    NOT_FOUND: '*',
    INDEX: '/',
}
export const COOKIE_NAME = 'jwt'