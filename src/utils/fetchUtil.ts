import * as auto from '../data/autoComplete.json';

const fetchUtil = async (endpoint: string, data?: string): Promise<any> => {
  console.log('fetching');
  return new Promise<any>(async (resolve, reject) => {
    const url = `http://dataservice.accuweather.com${endpoint}
      ?apikey=${process.env.REACT_APP_API_KEY}&q=${data}&language=en-us`;

    setTimeout(() => {
      console.log('resolving');
      resolve((auto as any).default);
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
    //   reject(err.message);
    // }
  });
};

export default fetchUtil;
