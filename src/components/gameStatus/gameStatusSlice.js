import { createSlice } from '@reduxjs/toolkit';
import defaultStatus from './defaultStatus.json';

export const gameStatusSlice = createSlice({
  name: 'gameStatus',
  initialState: {
    currentDegreeIndex: 0,
    selections: defaultStatus.degreeSelections
  },
  reducers: {
    incrementCurrentDegree: state => {
      state.currentDegreeIndex += 1;
    },
    updateDegree: (state, action) => {
      state.selections[state.currentDegreeIndex] = action.payload;
    }
  }
})

export const { incrementCurrentDegree, updateDegree } = gameStatusSlice.actions;

export default gameStatusSlice.reducer;