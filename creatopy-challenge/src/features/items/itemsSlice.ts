import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Item {
  id: number;
  title: string;
  user: User;
}

export interface User {
  id: number;
  email: string;
}

interface ItemsState {
  items: Item[];
}

const initialState: ItemsState = {
  items: [],
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Item>) {
      state.items.push(action.payload);
    },
    loadItems(state, action: PayloadAction<Item[]>) {
      state.items = action.payload;
    },
  },
});

export const { addItem, loadItems } = itemsSlice.actions;

export default itemsSlice.reducer;
