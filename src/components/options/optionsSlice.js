import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';

const ROOT_URL = 'https://api.tvmaze.com';
const PROXY_URL = 'https://corsproxy.io/?';

const getShowId = (showUrl) => showUrl.split('/').pop();

const getPersonInfo = (person, show) => ({
  id: person.id,
  name: person.name,
  imgUrl: person.image ? person.image.medium : './anonymous.png',
  commonShow: show
});

const fetchShows = async (personId) => {
  const url = `${PROXY_URL}${ROOT_URL}/people/${personId}?embed=castcredits`;
  const response = await axios.get(url);
  const showIds = response.data._embedded.castcredits.map((show) =>
    getShowId(show._links.show.href)
  );
  return showIds;
};

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

const getUniqueConnections = async (showIdArray) => {
  let uniqueConnections = [];

  while (showIdArray.length > 0) {
    const showConnections = await fetchCast(
      showIdArray[showIdArray.length - 1]
    );
    if (showConnections) {
      uniqueConnections = uniqueConnections.concat(showConnections);
    }
    // const updatedShowIdArray = showIdArray.slice(0, -1);
    getUniqueConnections(showIdArray.slice(0, -1));
  }

  uniqueConnections = _.uniqBy(uniqueConnections, 'id');
  return uniqueConnections;
};

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
