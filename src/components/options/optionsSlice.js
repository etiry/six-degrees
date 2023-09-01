import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';

const ROOT_URL = 'https://api.tvmaze.com';
const PROXY_URL = 'https://corsproxy.io/?';

/**
 * Extracts show ID number from URL
 * @param {string} showUrl A show URL
 *
 * @return {string} A show ID number
 */
const getShowId = (showUrl) => showUrl.split('/').pop();

/**
 * Creates a person object by extracting data from API request response
 * @param {object} person An object representing a person
 * @param {string} show Name of a show
 *
 * @return {object} An object representing a person
 */
const getPersonInfo = (person, show = null) => ({
  id: person.id,
  name: person.name,
  imgUrl: person.image ? person.image.medium : './anonymous.png',
  commonShow: show
});

export const fetchPeople = async (searchTerm) => {
  const url = `${PROXY_URL}${ROOT_URL}/search/people?q=${searchTerm}`;
  const response = await axios.get(url);
  const results = response.data
    .slice(0, 5)
    .map((result) => getPersonInfo(result.person));
  return results;
};

/**
 * Retrieves an array of show IDs representing the shows a person acted in
 * @param {number} personId ID of a person
 *
 * @return {array} Array of show IDs
 */
const fetchShows = async (personId) => {
  const url = `${PROXY_URL}${ROOT_URL}/people/${personId}?embed=castcredits`;
  const response = await axios.get(url);
  const showIds = response.data._embedded.castcredits.map((show) =>
    getShowId(show._links.show.href)
  );
  return showIds;
};

/**
 * Retrieves an array of actors who acted in a particular show
 * @param {string} showId ID of a show
 *
 * @return {array} Array of person objects or null
 */
const fetchCast = async (showId) => {
  const url = `${PROXY_URL}${ROOT_URL}/shows/${showId}?embed=cast`;
  const response = await axios.get(url);
  if (response.data.type === 'Scripted') {
    const commonShow = response.data.name;
    const cast = response.data._embedded.cast.map((castMember) =>
      getPersonInfo(castMember.person, commonShow)
    );
    return cast;
  }
  return null;
};

/**
 * Produces a list of unique actors who are first degree connections
 * to a particular actor
 * @param {array} showIdArray Array of show IDs
 *
 * @return {array} Array of unique person objects
 */
const getUniqueConnections = async (showIdArray) => {
  let uniqueConnections = [];

  while (showIdArray.length > 0) {
    const showConnections = await fetchCast(
      showIdArray[showIdArray.length - 1]
    );
    if (showConnections) {
      uniqueConnections = uniqueConnections.concat(showConnections);
    }
    // eslint-disable-next-line no-param-reassign
    showIdArray = showIdArray.slice(0, -1);
    getUniqueConnections(showIdArray);
  }

  uniqueConnections = _.uniqBy(uniqueConnections, 'id');
  return uniqueConnections;
};

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
