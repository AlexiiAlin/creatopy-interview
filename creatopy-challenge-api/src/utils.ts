import db from '../models'
import { UserInput } from '../models/user';
import { AuthenticationError } from 'apollo-server';
import { comparePassword, encryptPassword } from '../utils/encrypt-password';

interface item {
    id: number;
    title: string;
    User?: user;
    user?: user;
}

interface user {
    id: string;
    name: string;
    email: string;
    password: string;
    Items: item []
}

export const getUsers = async (): Promise<user[]> => {
    const userdata = await db.User.findAll({
        include: db.Item
    });
    return await userdata.map((user: user) => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            items: user.Items
        }
    })
}

export const getItems = async (): Promise<user[]> => {
    const itemdata = await db.Item.findAll({
        include: db.User
    });
    return await itemdata.map((item: item) => {
        return {
            id: item.id,
            title: item.title,
            user: item.User
        }
    });
}

export const createItem = async (item: any): Promise<item> => {
    const toDbItem = {
        title: item.title,
        UserId: item.userId
    }
    const newItem = await db.Item.create(toDbItem);
    const withUser: item = await db.Item.findOne({
        include: db.User,
        where: {
            id: newItem.id
        }
    });
    return {
        id: withUser.id,
        title: withUser.title,
        user: withUser.User
    };
}

export const createUser = async (userInput: UserInput): Promise<user> => {
    const encryptedPassword = await encryptPassword(userInput.password);
    const toDbItem = {
        email: userInput.email,
        password: encryptedPassword
    };
    return await db.User.create(toDbItem);
}

export const login = async (userInput: UserInput): Promise<user> => {
    const foundUser: user = await db.User.findOne({
        where: {
            email: userInput.email
        }
    });
    const isMatch = await comparePassword(userInput.password, foundUser.password);
    if (!isMatch) {
        throw new AuthenticationError("Wrong credentials");
    }
    return foundUser;
}

