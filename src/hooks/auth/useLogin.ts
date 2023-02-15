import { authService } from "../../services";
import Cookies from "js-cookie";
import { User } from "../../types/user";

export const useLogin = () => {

  const login = async (username: string, password: string) => {
    const user = await authService.login(username, password);
    const userType= user as User;
    if (user && userType.id) {
      Cookies.set("currentUser", JSON.stringify(user));
    }

    return userType;
  };

  return { login };
};
