import { createSlice } from '@reduxjs/toolkit'

export const category = createSlice({
  name: 'category',
  initialState: "health",
  reducers: {
    selectCategory: (state, action) => {
      return action.payload;
    },
  }
})

export const { selectCategory } = category.actions

export default category.reducer
