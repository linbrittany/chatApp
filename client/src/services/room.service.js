import { HOST, METHODS, PATHS } from "../assets/constants";
import { handleResponse } from "../handlers/ResponseHandler";
import { axiosService } from "./index";

export class RoomService {

  async createRoom(data) {
    try {
      let config = {
        headers:  {'Content-Type' : 'application/json'}
      }
      const res = await axiosService.authAxiosWrapper(METHODS.POST, HOST + PATHS.ROOMS + "/", config, data);
      return handleResponse(res);
    } catch (error) {
      return handleResponse(error.response)
    }
  }

  async addUserToRoom(data) {
    try {
      let config = {
        headers:  {'Content-Type' : 'application/json'}
      }
      const res = await axiosService.authAxiosWrapper(METHODS.POST, HOST + PATHS.ROOMS + `/new-user`, config, data);
      return handleResponse(res);
    } catch (error) {
      return handleResponse(error.response)
    }
  }

  async getRoomsFromUser(userId) {
    try {
      const res = await axiosService.authAxiosWrapper(METHODS.GET, HOST + PATHS.ROOMS + `/${userId}`, {}, {});
      return handleResponse(res);
    } catch (error) {
      return handleResponse(error.response)
    }
  }

  async getRoomsAvailable(userId) {
    try {
      const res = await axiosService.authAxiosWrapper(METHODS.GET, HOST + PATHS.ROOMS + `/${userId}/available`, {}, {});
      return handleResponse(res);
    } catch (error) {
      return handleResponse(error.response)
    }
  }
}