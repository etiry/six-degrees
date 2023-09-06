import axios from 'axios';
import _ from 'lodash';

const ROOT_URL = 'https://api.tvmaze.com';
const PROXY_URL = 'https://corsproxy.io/?';

/**
 * Select a random item from an array of person objects
 * @param {array} optionArray Array of options
 *
 * @return {object} Person to act as starting point for game
 */
const getRandomOption = (optionArray) =>
  optionArray[Math.floor(Math.random() * optionArray.length)];

/**
 * Get number of plays to win
 * @param {array} currentGameStatus Array of current game selections
 *
 * @return {number} Number of plays
 */
const getPlays = (currentGameStatus) => {
  currentGameStatus.reduce((acc, selection) => {
    if (selection.name) {
      return acc + 1;
    }
    return acc;
  }, -1);
};

/**
 * Filters out existing selections from connections array
 * @param {array} currentSelections Array of current game selection (person objects)
 * @param {array} connections Array of connections (person objects)
 *
 * @return {array} Array of filtered connections (person objects)
 */
const filterConnections = (currentSelections, connections) => {
  const names = currentSelections.map(({ name }) => name).slice(0, -1);
  return connections.filter((person) => !names.includes(person.name));
};

/**
 * Checks if the selected actor is the same as the target actor
 * @param {object} selectedPerson Selected person
 * @param {object} targetPerson Target person
 *
 * @return {boolean}
 */
const checkWinner = (targetPerson, connections) =>
  connections.find((connection) => connection.id === targetPerson.id);

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

const fetchPeople = async (searchTerm) => {
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

export {
  getRandomOption,
  getPlays,
  filterConnections,
  checkWinner,
  fetchPeople,
  fetchShows,
  getUniqueConnections
};
