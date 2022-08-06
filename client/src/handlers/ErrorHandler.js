import { STATUS } from "../assets/constants";

export const handleError = (code, navigate, defaultValue=undefined) => {
  if (code === STATUS.NO_CONTENT) {
    return defaultValue;
  } else {
    if (code === STATUS.UNAUTHORIZED) {
      navigate(`/login?code=${STATUS.UNAUTHORIZED}`);
      return;
    } else if (code === STATUS.PAGE_NOT_FOUND) {
      navigate("/404");
      return;
    } else {
      navigate(`/error?code=${code}`);
      return;
    }
  }
}