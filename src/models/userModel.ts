export interface IUser {
    id: string;
    username: string;
    password: string;
    isAdmin: boolean;
    createdAt: Date;
}

export let users: IUser[] = [
    { id: '1', username: 'admin', password: 'password1', isAdmin: true, createdAt: new Date()},
    { id: '2', username: 'user1', password: 'password2', isAdmin: false, createdAt: new Date()},
    { id: '3', username: 'user2', password: 'password3', isAdmin: false, createdAt: new Date()}
];