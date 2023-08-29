import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const ROOT_URL = 'https://api.tvmaze.com';
const PROXY_URL = 'https://corsproxy.io/?';

const getShowId = (showUrl) => showUrl.split('/').pop();

const getPersonInfo = (person, show) => {
  return {
    id: person.id,
    name: person.name,
    imgUrl: person.image ? person.image.medium : './anonymous.png',
    previousCommonShow: show,
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
  const commonShow = response.data.name;
  const cast = response.data._embedded.cast.map((castMember) => getPersonInfo(castMember.person, commonShow));

  return cast;
};

const getUniqueConnections = async (showIdArray) => {
  let uniqueConnections = [];
  while (showIdArray.length > 0) {
    const existingConnections = uniqueConnections.map(({ name }) => name);
    const showConnections = await fetchCast(showIdArray[showIdArray.length - 1]);
    const connectionsToAdd = showConnections.reduce((acc, person) => {
      if (!existingConnections.includes(person.name)) {
        acc.push(person);
      }
      return acc;
    }, []);
    uniqueConnections = uniqueConnections.concat(connectionsToAdd);
    showIdArray = showIdArray.slice(0, -1);
    getUniqueConnections(showIdArray);
  }

  return uniqueConnections;
};

export const getConnections = createAsyncThunk('options/getConnections', async (personId) => {
  const showIds = await fetchShows(personId);
  const firstDegreeConnections = getUniqueConnections(showIds);
  return firstDegreeConnections;
});

export const optionsSlice = createSlice({
  name: 'options',
  initialState: {
    status: 'idle',
    error: null,
    connections: [],
    currentSelections: []
  },
  reducers: {
    internalSetSelections: (state, action) => {
      state.currentSelections = action.payload;
    },
  },
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

const { internalSetSelections } = optionsSlice.actions;

export const setCurrentSelections = () => {
  return (dispatch, getState) => {
    const currentSelections = getState().gameStatus.selections;
    console.log(currentSelections);
    dispatch(internalSetSelections(currentSelections));
  };
}

export default optionsSlice.reducer;