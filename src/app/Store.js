import { configureStore } from '@reduxjs/toolkit';
import gameStatusReducer from '../components/gameStatus/gameStatusSlice';
import optionsReducer from '../components/options/optionsSlice';

export default configureStore({
  reducer: {
    gameStatus: gameStatusReducer,
    options: optionsReducer
  }
})


// src
//  /app
//    Store.js
//  /components
//    /gameStatus
//      gameStatus.js
//      gameStatusSlice.js
//    /options
//      options.js
//      optionsSlice.js
//  /containers
//    Header.js
//    Main.js