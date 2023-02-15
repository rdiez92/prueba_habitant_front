import { authService } from "../../services";
import Cookies from "js-cookie";
import { User } from "../../types/user";

export const useRegister = () => {
	const register = async (
		username: string,
		email: string,
		password: string
	) => {
		const user = await authService.register(username, email, password);
		const userType = user as User;

		if (user && userType.id) {
			Cookies.set("currentUser", JSON.stringify(user));
		}

		return userType;
	};

	return { register };
};
