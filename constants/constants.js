export const TIME_EXPIRATION = {
    ACCESS_TOKEN: '15m',
    COOKIE_EXPIRATION: 15 * 60 * 1000,
}
export const ERROR_MESSAGES = {
    INVALID_TOKEN: "Invalid token",
    UNAUTHORIZED: "Unauthorized",
    USER_NOT_FOUND: "User not found",
    INTERNAL_SERVER_ERROR: "Internal Server Error",
    INVALID_PASSWORD: "Invalid password"
};

export const PORT = 4000;

export const COOKIE_NAME = 'jwt'