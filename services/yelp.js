import axios from 'axios';


const YELP_API_KEY = 'KFLmMClYUh-QTUXa25Mx3Frh6dX4oshhouDmsmxkR2IIEk6NUrWSpLyH1KqwZVnNinho7ETI6cCBmwln_mJKX2gBb6ylcjRTKmIrGEJqViEtowEKN0o2amqjW5XxXnYx'

const api = axios.create({
  baseURL: 'https://api.yelp.com/v3',
  headers: {
    Authorization: `Bearer ${YELP_API_KEY}`,
  },
})

const getBobaShops = userLocation => {
  return api
  // http request GET
  .get('/businesses/search', {
    params: {
      limit: 20,
      // input category of business for request
      categories: 'bubbletea',
      ...userLocation
    },
  })
  // returns the business name and coordinates near userLocation
  .then(res =>
    res.data.businesses.map(business => {
      return {
        name: business.name,
        coords: business.coordinates,
        rating: business.rating,
      }
    })
  )
  // catches any errors
  .catch(error => console.error(error))
}

export default {
  getBobaShops,
}
