// define a function that will make the API call
import axios from 'axios';

export default async function getAllCategories() {
    // make a GET request to fetch the data

    // create a false lag
    // await new Promise(resolve => setTimeout(resolve, 10000));
    return axios.get('/store/allcategories')
        .then(res => {
            // console.log(res.data);
            return res.data;
        })
        .catch(err => {
            console.log(err);
        });
}
