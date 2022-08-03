import { STATUS } from "../assets/constants";

export const handleResponse = (response) => {
  if (response) {
    if (response.status >= STATUS.OK && 
      response.status <= STATUS.SUCCESS_LIMIT) {
      return {
          headers: response.headers,
          status: response.status,
          failure: false,
          data: response.data
      }
    }
    return {
      status: response.status,
      failure: true
    };
  }
}