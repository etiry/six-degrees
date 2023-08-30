import { configureStore } from '@reduxjs/toolkit';
import gameStatusReducer from '../components/gameStatus/gameStatusSlice';
import optionsReducer from '../components/options/optionsSlice';

export default configureStore({
  reducer: {
    gameStatus: gameStatusReducer,
    options: optionsReducer
  }
});
