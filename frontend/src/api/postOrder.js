import axios from 'axios';


export default async function postOrder(data) {
    // make a POST request to fetch the data
    return axios.post('/store/order', data)
        .then(res => {
            // console.log(res);
            return res.status;
        })
        .catch(err => {
            console.log(err);
        });
}