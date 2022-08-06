import { AuthService } from "./auth.service";
import { AxiosService } from "./axios.service";
import { UserService } from "./user.service";
import { MessageService } from "./message.service";
import { RoomService } from "./room.service";

const axiosService = new AxiosService();
const userService = new UserService();
const authService = new AuthService();
const messageService = new MessageService();
const roomService = new RoomService();

export {
  axiosService,
  userService,
  authService,
  messageService,
  roomService
}