import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: '',
  reducers: {
    search: (state, action: PayloadAction<string>) => action.payload,
  },
});

export const { search } = searchSlice.actions;

export default searchSlice;
