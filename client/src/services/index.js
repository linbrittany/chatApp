import { AxiosService } from "./axios.service";
import { UserService } from "./user.service";

const axiosService = new AxiosService();
const userService = new UserService();

export {
  axiosService,
  userService
}