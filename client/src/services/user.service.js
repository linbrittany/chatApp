import { HOST, METHODS, PATHS } from "../assets/constants";
import { handleResponse } from "../handlers/ResponseHandler";
import { axiosService } from "./index";

export class UserService {

  async register(data) {
    try {
      let config = {
        headers:  {'Content-Type' : 'application/json'}
      }
      const res = await axiosService.axiosWrapper(METHODS.POST, HOST + PATHS.USERS + "/", config, data);
      return handleResponse(res);
    } catch (error) {
      return handleResponse(error.response)
    }
  }
}