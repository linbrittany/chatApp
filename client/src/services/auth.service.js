import { axiosService } from ".";
import { HOST, METHODS, PATHS } from "../assets/constants";
import { handleResponse } from "../handlers/ResponseHandler";

export class AuthService {

  async login(email, password) {
    try {
      let config = {
        headers:  {'x-basic-auth' : axiosService.getBasicToken(email, password)}
      }
      const response = await axiosService.axiosWrapper(METHODS.GET, HOST + PATHS.AUTH + "/login", config);
      return handleResponse(response);
    } catch (error) {
      return handleResponse(error.response);
    }
  }

}