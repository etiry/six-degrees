import { configureStore } from '@reduxjs/toolkit';
import gameStatusReducer from '../slices/gameStatusSlice';
import optionsReducer from '../slices/optionsSlice';

export default configureStore({
  reducer: {
    gameStatus: gameStatusReducer,
    options: optionsReducer
  }
});
