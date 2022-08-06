import { HOST, METHODS, PATHS } from "../assets/constants";
import { handleResponse } from "../handlers/ResponseHandler";
import { axiosService } from "./index";

export class MessageService {

  async sendMessage(data) {
    try {
      let config = {
        headers:  {'Content-Type' : 'application/json'}
      }
      const res = await axiosService.authAxiosWrapper(METHODS.POST, HOST + PATHS.MESSAGES + "/", config, data);
      return handleResponse(res);
    } catch (error) {
      return handleResponse(error.response)
    }
  }

  async getMessagesFromRoom(roomId) {
    try {
      const res = await axiosService.authAxiosWrapper(METHODS.GET, HOST + PATHS.MESSAGES + `/${roomId}`, {}, {});
      return handleResponse(res);
    } catch (error) {
      return handleResponse(error.response)
    }
  }
}