import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchShows, getUniqueConnections } from '../utils/utils';

/**
 * Makes an API request for a particular actor,
 * then makes an API reuqest for each show they were on,
 * then returns an array of unique first degree connections
 * @param {number} personId ID of a person
 *
 * @return {array} Array of unique person objects
 */
export const getConnections = createAsyncThunk(
  'options/getConnections',
  async (personId) => {
    const showIds = await fetchShows(personId);
    const firstDegreeConnections = await getUniqueConnections(showIds);
    return firstDegreeConnections;
  }
);

export const optionsSlice = createSlice({
  name: 'options',
  initialState: {
    status: 'idle',
    error: null,
    connections: []
  },
  reducers: {
    resetOptions: (state) => {
      state.connections = [];
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getConnections.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getConnections.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.connections = action.payload;
      })
      .addCase(getConnections.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { resetOptions } = optionsSlice.actions;

export default optionsSlice.reducer;
