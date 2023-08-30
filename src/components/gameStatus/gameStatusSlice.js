import { createSlice } from '@reduxjs/toolkit';
import defaultStatus from './defaultStatus.json';

export const gameStatusSlice = createSlice({
  name: 'gameStatus',
  initialState: {
    currentDegreeIndex: 0,
    selections: defaultStatus.degreeSelections,
    gameOver: false,
    winner: false
  },
  reducers: {
    incrementCurrentDegree: (state) => {
      state.currentDegreeIndex += 1;
    },
    updateDegree: (state, action) => {
      state.selections[state.currentDegreeIndex] = action.payload;
    },
    resetGameStatus: (state) => {
      state.selections = defaultStatus.degreeSelections;
      state.currentDegreeIndex = 0;
      state.winner = false;
      state.gameOver = false;
    }
  }
})

export const { incrementCurrentDegree, updateDegree, resetGameStatus } = gameStatusSlice.actions;

export default gameStatusSlice.reducer;