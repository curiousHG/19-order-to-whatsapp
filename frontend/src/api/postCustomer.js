import axios from 'axios';

// define a function that will make the API call
export default async function postCustomer(data) {
    // make a POST request to fetch the data
    return axios.post('/store/customer', data)
        .then(res => {
            // console.log(res.data);
            return res.data;
        })
        .catch(err => {
            console.log(err);
        });
}