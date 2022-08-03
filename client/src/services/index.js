import { AuthService } from "./auth.service";
import { AxiosService } from "./axios.service";
import { UserService } from "./user.service";

const axiosService = new AxiosService();
const userService = new UserService();
const authService = new AuthService();

export {
  axiosService,
  userService,
  authService
}