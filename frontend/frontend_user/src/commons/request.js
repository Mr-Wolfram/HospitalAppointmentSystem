import axios from 'axios';
import qs from 'qs';
import cookie from 'react-cookies'

let http = {
    post: "",
    get: ""
}

let tokenDefault="";

http.post = function(api, data) {
    axios.defaults.headers.common = {
        // 'Authorization': 'Bearer ' + tokenDefault
        'Authorization': cookie.load("token")===undefined?tokenDefault:cookie.load("token")
    };
    return new Promise((resolve, reject) => {
        axios.post(api, {
            params: data,
            paramsSerializer: params => qs.stringify(params)
        },
            { headers: {"Authorization" : cookie.load("token")===undefined?tokenDefault:cookie.load("token")} }
            ).then((response) => {
            resolve(response)
        }).catch(function (error) {
            console.log("http request error", error);
        });
    })
}

http.get = function(api, data) {
    return new Promise((resolve, reject) => {
        axios.defaults.headers.common = {
            // 'Authorization': 'Bearer ' + tokenDefault
            'Authorization': cookie.load("token")===undefined?tokenDefault:cookie.load("token")
        };
        axios.get(api, {
            params: data,
            paramsSerializer: params => qs.stringify(params)
        },
        { headers: {"Authorization" :cookie.load("token")===undefined?tokenDefault:cookie.load("token")

            } }

        ).then((response) => {
            resolve(response)
        }).catch(function (error) {
            console.log("http request error",error);
        });
    })
}

export default http
