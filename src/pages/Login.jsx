import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { authApi, todosApi } from "../config/axios";
import { Notyf } from 'notyf';
import logo from "../assets/img/logo.svg";
const notyf = new Notyf({ duration: 5000, position: { x: 'right', y: 'top' } });

function Login ({logged, setLogged, loading, setLoading}) {
	const [email, setEmail] = useState("jhon.doe@yacinem.com");
	const [password, setPassword] = useState("123");

	const handleSubmit = function (e) {
		e.preventDefault();
		if ( email !== "" && password !== "") {
			const user = {email, password}
			setLoading(true)
			authApi({ method: 'post', url: 'auth/', data: user })
			.then(function (response, error) {
				if ( response ) {
					setLogged(true)
					setLoading(false)
					if (response.data.message) notyf.success(response.data.message);
					localStorage.setItem("accessToken", response.data.accessToken);
					localStorage.setItem("refreshToken", response.data.refreshToken);
					authApi.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
					todosApi.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
				}
			}).catch((error) => {
				setLogged(false)
				setLoading(false)
				if (error.response.data.message) notyf.error(error.response.data.message);
			});
		} else {
			notyf.error("Please fill in the required fields")
		}
	}

	if (logged) {
		return <Navigate replace to="/" />;
	} else {
		return (
			<div className="page">
				<img  className="w-40 mb-6" src={logo} /> 
				<form className={(loading ? "animate-pulse " : "") + "card-form"} onSubmit={(e) => handleSubmit(e)}>
					<h1 className="title-form">Connexion</h1>
				
					<div className="mb-4">
						<label className="label-form">Email *</label>
						<input 
							className="input-form" type="email" name="email" placeholder="Your Email..." 
							value={email} onChange={(e) => setEmail(e.target.value)} 
							autoComplete="email" required={true} disabled={loading}
						/>
					</div>

					<div className="mb-4">
						<label className="label-form">Password *</label>
						<input 	
							className="input-form" type="password" name="password" placeholder="Your Password"
							value={password} onChange={(e) => setPassword(e.target.value)}
							autoComplete="current-password" required={true} disabled={loading}
						/>
					</div>

					{loading ? 
						<div className="container-loader mt-7"><div className="loader"></div></div> :
						<button className="btn-form" type="submit" onClick={(e) => handleSubmit(e)}>Sign in</button>
					}
				</form>
			

				<footer className="relative shrink-0">
					<div className="space-y-4 text-sm text-gray-900 sm:flex sm:items-center sm:justify-center sm:space-y-0 sm:space-x-4">
						<p className="text-gray-900 text-center sm:text-left">Don't have an account?</p>
						<Link className="inline-flex justify-center rounded-lg text-gray-900 text-sm font-semibold py-2.5 px-1" to="/register">
							Sing Up
						</Link>
					</div>
				</footer>
			</div>
		);
	}
}

export default Login;