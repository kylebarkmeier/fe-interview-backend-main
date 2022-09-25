import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SliceState = { search: string; showStarred: boolean };

const searchSlice = createSlice({
  name: 'search',
  initialState: { search: '', showStarred: false } as SliceState,
  reducers: {
    search: (state: SliceState, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    showStarred: (state: SliceState, action: PayloadAction<boolean>) => ({
      ...state,
      showStarred: action.payload,
    }),
  },
});

export const { search, showStarred } = searchSlice.actions;

export default searchSlice;
