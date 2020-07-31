export default class Constants {
    static JWT_PRIVATE_KEY: string = 'a5116fa8820526c5e88419ac9326ca18';
    static ROLE: string[] = ['ADMIN', 'FARMER'];
    static CATEGORY: string[] = ['AGRICULTURE', 'DAIRY', 'LIVESTOCK'];
    static readonly APP_SECRET: string = 'Hu986kjo4i9JU342mbcs8765sdafdgm';
    static readonly APP_REFRESH_SECRET: string = 'Hu986kjo4i9Kg897ys262s8765sdafdgm';
}

export const enum Role {
    ADMIN = 'ADMIN',
    FARMER = 'FARMER'
}

export const enum Category {
    AGRICULTURE = 'AGRICULTURE',
    DAIRY = 'DAIRY',
    LIVESTOCK = 'LIVESTOCK'
}

export const enum ValidationError {
    INVALID_NAME = 'INVALID_NAME',
    INVALID_EMAIL = 'INVALID_EMAIL',
    INVALID_PASSWORD = 'Password should contain min 6 characters',
    INVALID_PHONE = 'INVALID_PHONE',
    INVALID_ROLE = 'Invalid Role',
    INVALID_ADDRESS = 'INVALID_ADDRESS',
    USER_EXISTS = 'User already exists',
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    INVALID_EMAIL_PASSWORD = 'Invalid username or password',
    USER_DOESNOT_EXISTS = 'User Does not exists',
    INVALID_FIRST_NAME = 'INVALID_FIRST_NAME',
    INVALID_LAST_NAME = 'INVALID_LAST_NAME',
    PASSWORD_MISMATCH = 'PASSWORD_MISMATCH',
    ROLE_CANNOT_MODIFY = 'ROLE_CANNOT_MODIFY',
    ITEM_ALREADY_ADDED = 'ITEM_ALREADY_ADDED'
}

export const enum NotificationType {
    AddItems = 'ADD_NEW_ITEM'
}