import { createSlice } from '@reduxjs/toolkit';

export const gameStatusSlice = createSlice({
  name: 'gameStatus',
  initialState: {
    currentDegreeIndex: 0,
    selections: [
      {
        id: 6800,
        name: 'Lauren Graham',
        imgUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/1/4960.jpg'
      },
      {
        id: 2,
        name: null,
        imgUrl: null
      },
      {
        id: 3,
        name: null,
        imgUrl: null
      },
      {
        id: 4,
        name: null,
        imgUrl: null
      },
      {
        id: 5,
        name: null,
        imgUrl: null
      },
      {
        id: 33538,
        name: 'Kevin Bacon',
        imgUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/3/8833.jpg'
      },      
    ]
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