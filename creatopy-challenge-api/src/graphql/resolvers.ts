import { createItem, createUser, getItems, getUsers, login } from '../utils';
import { ItemInput } from '../../models/item';
import { UserInput } from '../../models/user';

export const resolvers = {
        Query: {
          users: async () => getUsers(),
          items: async () => getItems(),
        },
        Mutation: {
          createItem: async (_: any, input: ItemInput) => createItem(input),
          createUser: async (_: any, input: UserInput) => createUser(input),
          login: async (_: any, input: UserInput) => login(input)
        }
      };
