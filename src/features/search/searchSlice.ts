import { createSlice } from "@reduxjs/toolkit"
import type { RootState } from "../../app/store.ts"

type SearchState = {
  searchTerm: string;
  isSearch: boolean;
}
const initialState: SearchState = {
  searchTerm: "",
  isSearch: false,
}
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action: { payload: string }) => {
      state.searchTerm = action.payload;
    },
    setIsSearch: (state, action: { payload: boolean }) => {
      state.isSearch = action.payload
    }
  }
});

export default searchSlice;
export const { setSearch, setIsSearch } = searchSlice.actions;
export const searchSelector = (state: RootState) => state.search;