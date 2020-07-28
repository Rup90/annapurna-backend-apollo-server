import { Document } from 'mongoose';

export default interface RegisteredUsers extends Document {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
}