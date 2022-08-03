import axios from "axios";
import { METHODS } from "../assets/constants";

export class AxiosService {

    authAxiosWrapper(action, path, config, data = {}) {
        if(!config.hasOwnProperty('headers'))
            config.headers = {}
        if (!config.headers.hasOwnProperty('x-access-token')) {
            config.headers['x-access-token'] = this.getToken()
        }
        return this.axiosWrapper(action, path, config, data)
    }

    axiosWrapper(action, path, config, data = {}) {
        switch (action) {
            case METHODS.GET:
                return axios.get(path, config);
            case METHODS.PUT:
                return axios.put(path, data, config)
            case METHODS.POST:
                return axios.post(path, data, config);
            case METHODS.DELETE:
                return axios.delete(path, config);
            default:
                break;
        }
    }

    getToken() {
        return localStorage.getItem("token");
    }

    getBasicToken(mail, password) {
        const credentials = mail + ":" + password;
        return btoa(credentials);
    }
}