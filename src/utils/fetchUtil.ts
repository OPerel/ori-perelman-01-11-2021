import * as auto from '../data/autoComplete.json';
import * as current from '../data/data.json';
import * as cities from '../data/cities.json';
import * as geoLocation from '../data/geoLocation.json';

const fetchUtil = async (endpoint: string, data?: string): Promise<any> => {
  return new Promise<any>(async (resolve, reject) => {
    // mock `/favorite` API endpoints
    if (endpoint.includes('favorite') && data) {
      try {
        const response = mockFavoriteEndpoint(endpoint, data);
        resolve(response);
      } catch (err) {
        reject(`Error fetching from ${endpoint}: ${err.message}`);
      }
      return;
    }

    const apiKey = process.env.REACT_APP_API_KEY;
    let url = `http://dataservice.accuweather.com${endpoint}?apikey=${apiKey}`;

    if (data) {
      url += `&q=${data}&language=en-us`;
    }
    if (endpoint.includes('5day')) {
      url += '&metric=true';
    }

    /**
     * Respond with mock data from JSON
     */
    setTimeout(() => {
      if (endpoint.includes('autocomplete')) {
        resolve((auto as any).default);
      } else if (endpoint.includes('5day')) {
        resolve((current as any).default.forecast);
      } else if (endpoint.includes('geoposition')) {
        resolve((geoLocation as any).default);
      } else {
        const key = endpoint.split('/')[3];
        const citiesObj = (cities as any).default;
        if (key in citiesObj) {
          resolve(citiesObj[key]);
          return;
        }
        resolve((current as any).default.currentWeather);
      }
    }, 1000);

    /**
     * Respond with Mock error
     */
    // reject(`Error fetching from ${endpoint}: Fetching Failed`)

    /**
     * Fetch from real API
     */
    // try {
    //   const json = await fetch(url, {
    //     method: 'get'
    //   });
    //   const res = await json.json();
    //   resolve(res)
    // } catch (err) {
    //   console.warn('Error fetching: ', err);
    //   reject(`Error fetching from ${endpoint}: ${err.message}`);
    // }
  });
};

/**
 * Use localStorage to mock a DB for the user favoritesView
 */
const mockFavoriteEndpoint = (endpoint: string, data: string) => {
  switch (endpoint) {
    case '/add-favorite': {
      const [id, name] = data.split(':');
      localStorage.setItem(id, `hwa-${name}`);
      return {
        id,
        name,
      };
    }
    case '/remove-favorite': {
      localStorage.removeItem(data);
      return data;
    }
    case '/is-favorite': {
      const favoriteItem = localStorage.getItem(data);
      return favoriteItem !== null;
    }
    case '/get-favorites': {
      let favorites: { [key: string]: { name: string } } = {};
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        const item = localStorage.getItem(key);
        if (item && item.includes('hwa')) {
          favorites[key] = { name: item.split('-')[1] };
        }
      });
      return favorites;
    }
  }
};

export default fetchUtil;
