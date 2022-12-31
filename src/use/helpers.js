import axios from "axios";
import {API_ROUTES, BASE_URL} from "@/use/routes";

// set User token
export function storeToken () {
    request().get(API_ROUTES.GET_TOKEN, {})
        .then(response => {
            localStorage.setItem('token', response.data.token)
        });
}

// wrapper for request
export function request() {
    return axios.create({
        baseURL: BASE_URL,
    })
}
// wrapper for authorizeRequest
export function authorizeRequest() {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            Token: localStorage.getItem('token')
        }
    })
}