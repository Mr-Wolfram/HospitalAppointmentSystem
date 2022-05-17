import axios from 'axios';
import qs from 'qs';

let http = {
    post: "",
    get: ""
}

http.post = function(api, data) {
    return new Promise((resolve, reject) => {
        axios.post(api, {
            params: data,
            paramsSerializer: params => qs.stringify(params)
        }).then((respnse) => {
            resolve(respnse)
        })
    })
}

http.get = function(api, data) {
    return new Promise((resolve, reject) => {
        axios.get(api, {
            params: data,
            paramsSerializer: params => qs.stringify(params)
        }).then((respnse) => {
            resolve(respnse)
        })
    })
}

export default http