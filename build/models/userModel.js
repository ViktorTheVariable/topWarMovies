"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
;
exports.users = [
    { _id: new mongoose_1.default.Types.ObjectId(), username: 'admin', password: 'password1', isAdmin: true, createdAt: new Date() },
    { _id: new mongoose_1.default.Types.ObjectId(), username: 'user1', password: 'password2', isAdmin: false, createdAt: new Date() },
    { _id: new mongoose_1.default.Types.ObjectId(), username: 'user2', password: 'password3', isAdmin: false, createdAt: new Date() }
];
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
}, { collection: 'users' });
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
