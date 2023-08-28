import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const ROOT_URL = 'https://api.tvmaze.com';
const PROXY_URL = 'https://corsproxy.io/?';

const getShowId = (showUrl) => showUrl.split('/').pop();

const getPersonInfo = (person) => {
  return {
    id: person.id,
    name: person.name,
    imgUrl: person.image ? person.image.medium : null,
    previousCommonShow: null,
    nextCommonShow: null
  }
}

const fetchShows = async (personId) => {
  const url = `${PROXY_URL}${ROOT_URL}/people/${personId}?embed=castcredits`;
  const response = await axios.get(url);
  const showIds = response.data._embedded.castcredits.map((show) => getShowId(show._links.show.href));

  return showIds;
};

const fetchCast = async (showId) => {
  const url = `${PROXY_URL}${ROOT_URL}/shows/${showId}?embed=cast`;
  const response = await axios.get(url);
  const cast = response.data._embedded.cast.map((castMember) => getPersonInfo(castMember.person));

  return cast;
};

const getAllConnections = async (showIdArray) => {
  let newConnections = [];
  while (showIdArray.length > 0) {
    const existingConnections = newConnections.map(({ name }) => name);
    const showConnections = await fetchCast(showIdArray[showIdArray.length - 1]);
    const connectionsToAdd = showConnections.reduce((acc, person) => {
      if (!existingConnections.includes(person.name)) {
        acc.push(person);
      }
      return acc;
    }, []);
    newConnections = newConnections.concat(connectionsToAdd);
    showIdArray = showIdArray.slice(0, -1);
    getAllConnections(showIdArray);
  }

  return newConnections;
};

export const getConnections = createAsyncThunk('options/getConnections', async (personId) => {
  const showIds = await fetchShows(personId);

  const firstDegreeConnections = getAllConnections(showIds);
  
  return firstDegreeConnections;
});

export const optionsSlice = createSlice({
  name: 'options',
  initialState: {
    status: 'idle',
    error: null,
    connections: []
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getConnections.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getConnections.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.connections = action.payload;
      })
      .addCase(getConnections.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default optionsSlice.reducer;