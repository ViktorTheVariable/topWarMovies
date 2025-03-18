import mongoose, { Types } from "mongoose";

export interface IUser {
    _id?: Types.ObjectId,
    username: string,
    password: string,
    isAdmin: boolean,
    createdAt: Date
};

export let users: IUser[] = [
    { _id: new mongoose.Types.ObjectId(), username: 'admin', password: 'password1', isAdmin: true, createdAt: new Date()},
    { _id: new mongoose.Types.ObjectId(), username: 'user1', password: 'password2', isAdmin: false, createdAt: new Date()},
    { _id: new mongoose.Types.ObjectId(), username: 'user2', password: 'password3', isAdmin: false, createdAt: new Date()}
];

const userSchema = new mongoose.Schema<IUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    isAdmin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
}, { collection: 'users' });

const User = mongoose.model<IUser>('User', userSchema);

export default User;