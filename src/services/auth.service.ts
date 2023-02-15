import axios, { AxiosInstance } from "axios";
import { getAuthorizationHeader } from "../utils/getAuthorizationHeader";

export class AuthService {
	protected readonly instance: AxiosInstance;
	public constructor(url: string) {
		this.instance = axios.create({
			baseURL: url,
			timeout: 30000,
			timeoutErrorMessage: "Time out!",
		});
	}

	login = (username: string, password: string) => {
		return this.instance
			.post(
				"http://localhost/habitant/back/wp-json/habitant/v1/users/login",
				{
					username,
					password,
				}
			)
			.then((res) => {
				return {
					username: res.data.data.display_name,
					avatar: res.data.data.avatar,
					id: res.data.data.ID,
					accessToken: res.data.data.access_token,
					expiredAt: res.data.data.expiredAt,
				};
			})
			.catch(function (error) {
				return {
					error: "El usaurio y/o contraseña son incorrectos",
				};
			});
	};

	register = (username: string, email: string, password: string) => {
		return this.instance
			.post(
				"http://localhost/habitant/back/wp-json/habitant/v1/users/register",
				{
					username,
					email,
					password,
				}
			)
			.then((res) => {
				return {
					username: res.data.username,
					avatar: res.data.avatar,
					id: res.data.id,
					accessToken: res.data.access_token,
					expiredAt: res.data.expiredAt,
				};
			})
			.catch(function (error) {
				return {
					error: "El usuario ya existe",
				};
			});
	};

	getMe = (userId: string) => {
		return this.instance
			.get(`/users/${userId}`, {
				headers: getAuthorizationHeader(),
			})
			.then((res) => {
				return res.data;
			});
	};
}
