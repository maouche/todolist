import axios from "axios";
import { URL_API_AUTH, URL_API_TODOS } from "./variables"

const authApi = axios.create({
    baseURL: URL_API_AUTH
  });

  const todosApi = axios.create({
    baseURL: URL_API_TODOS
  });

function setHeadersAuthorization() {
    if (localStorage.getItem('accessToken') != undefined && localStorage.getItem('accessToken') ) {
        authApi.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        todosApi.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
    }
}
setHeadersAuthorization()

const refreshToken = async (error) => {
	const originalRequest = error.config;
    if ( originalRequest.url != 'refreshToken/' && error.response.status === 401 && originalRequest._retry != true ) {
		originalRequest._retry = true;
		if ( 
                (localStorage.getItem('refreshToken') || localStorage.getItem('refreshToken') != undefined) && 
                (localStorage.getItem('refreshToken') !== "") 
            ) {
			await authApi({
				headers: {
					Authorization: `Bearer ${localStorage.getItem('refreshToken')}`
				},
				method: 'post',
				url: 'refreshToken/',
			})
			.then((response) => {
				localStorage.setItem("accessToken", response.data.accessToken);
				originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
				setHeadersAuthorization()
			}).catch((error) => {
				localStorage.removeItem("accessToken");
			});
			return authApi(originalRequest);
		}
	}
} 

// interceptors
todosApi.interceptors.response.use((response) => {return response}, refreshToken)

export { authApi, todosApi }