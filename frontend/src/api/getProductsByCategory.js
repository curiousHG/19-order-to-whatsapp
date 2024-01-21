// define a function that will make the API call
import axios from 'axios';

export default async function getProducts(category) {
    // make a GET request to fetch the data
    return axios.get('/store/category/' + category)
        .then(res => {
            // console.log(res.data);
            return res.data;
        })
        .catch(err => {
            console.log(err);
        });
}
