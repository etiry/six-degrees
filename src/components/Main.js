import axios from 'axios';

const ROOT_URL = 'https://api.tvmaze.com';
const PROXY_URL = 'https://corsproxy.io/?';

function Main () {
  const fetchPerson = (personId) => {
    const url = `${PROXY_URL}${ROOT_URL}/people/${personId}?embed=castcredits`;

    axios.get(url)
      .then((response) => console.log(response));
  };
  
  fetchPerson(6800);
}

export default Main;
