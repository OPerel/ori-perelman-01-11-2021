import * as auto from '../data/autoComplete.json';
import * as current from '../data/data.json';

const fetchUtil = async (endpoint: string, data?: string): Promise<any> => {
  return new Promise<any>(async (resolve, reject) => {
    let url = `http://dataservice.accuweather.com${endpoint}?apikey=${process.env.REACT_APP_API_KEY}`;

    if (data) {
      url += `&q=${data}`;
    }
    if (endpoint.includes('5day')) {
      url += '&metric=true';
    }

    setTimeout(() => {
      if (endpoint.includes('autocomplete')) {
        resolve((auto as any).default);
      } else if (endpoint.includes('5day')) {
        resolve((current as any).default.forecast);
      } else {
        resolve((current as any).default.currentWeather);
      }
    }, 1000);

    // reject('Error fetching')

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

export default fetchUtil;
