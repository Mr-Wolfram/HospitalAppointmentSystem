import axios from 'axios';
import qs from 'qs';
import cookie from 'react-cookies'

let http = {
    post: "",
    get: ""
}

let tokenDefault="Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTQ1OGE5MGFhYjBlOWVkMjhmMzUyOSIsImlhdCI6MTY1MzkxMjg0NTg4NywiZXhwIjoxNjUzOTEyOTMyMjg3fQ.Q30CSEDDrdOazSOuAhVC4zl8d1Sahvnaj25gN7Is9eLkxZg7HCq3-qgK37S5ajJfacrIXu14Zx6jAsG8XKWoLNCeZJcZOSfBkM21UR_VQ9L08ZTr06ZTVCSDVFNDpX_KZQDC4Vgzw3Msv9Sjw4eLXEiQ-tQJeWrNHQD5LZ9VBj-wZe_VJBKAfzzlptimD53gc6Z6jkA0hUS5fxtCMH7Eza5goh8Zm3NF_IZcPhpWjLgz0EURredZ8-rvFlQYJxbJdzTDD0hO4mRFannnzsyGxLaF_Say9lnd08daZKQ5xLd_bazJjujEffYhxDEBCkmOakbG5LIDFG9bsEm5Tcs0eA"
axios.defaults.headers.common = {
    // 'Authorization': 'Bearer ' + tokenDefault
    'Authorization': tokenDefault
};

http.post = function(api, data) {
    return new Promise((resolve, reject) => {
        axios.post(api, {
            params: data,
            paramsSerializer: params => qs.stringify(params)
        },
            { headers: {"Authorization" : `${cookie.load("token")===undefined?tokenDefault:cookie.load("token")}`} }
            ).then((response) => {
            resolve(response)
        }).catch(function (error) {
            console.log("http request error", error);
        });
    })
}

http.get = function(api, data) {
    return new Promise((resolve, reject) => {
        axios.get(api, {
            params: data,
            paramsSerializer: params => qs.stringify(params)
        },
        { headers: {"Authorization" : `${cookie.load("token")===undefined?tokenDefault:cookie.load("token")}`} }
        ).then((response) => {
            resolve(response)
        }).catch(function (error) {
            console.log("http request error",error);
        });
    })
}

export default http
