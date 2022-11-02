import { useState } from "react";
import { Navigate, useNavigate, Link  } from "react-router-dom";
import { authApi } from "../config/axios";
import logo from "../assets/img/logo.svg";
import { Notyf } from 'notyf';
//import "../css/register.css";
const notyf = new Notyf({ duration: 5000, position: { x: 'right', y: 'top' } });

function Register ({logged, setLogged, loading, setLoading}) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	let navigate = useNavigate();

	const handleSubmit = function (e) {
		e.preventDefault();
		if ( email !== "" && password !== "" && confirmPassword !== "" && password === confirmPassword) {
			const user = {email, password}
			setLoading(true)
			authApi({ method: 'post', url: 'register/', data: user })
			.then(function (response, error) {
				if ( response ) {
					setLogged(false);
					setLoading(false)
					setEmail("")
					setPassword("")
					setConfirmPassword("")
					navigate("/login")
					if (response.data.message) notyf.success(response.data.message);
				}
			}).catch((error) => {
				if (error.response.data.message) notyf.error(error.response.data.message);
				setLoading(false)
			});
		}
	}

	if (logged) {
		return <Navigate replace to="/" />;
	} else {
		return (
			<div className="page">
				<img  className="w-40 mb-6" src={logo} /> 
				<form className={(loading ? "animate-pulse " : "") + "card-form"} onSubmit={(e) => handleSubmit(e)}>
					<h1 className="title-form">Registration</h1>
				
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

					<div className="mb-4">
						<label className="label-form">Confirm Password *</label>
						<input 	
							className="input-form" type="password" name="password" placeholder="Confirm your Password"
							value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
							autoComplete="current-password" required={true} disabled={loading}
						/>
					</div>

					{loading ? 
						<div className="container-loader mt-5"><div className="loader"></div></div> :
						<button className="btn-form" type="submit" onClick={(e) => handleSubmit(e)}>Sign up</button>
					}

					<p className="mt-6 text-center text-[#a50000]">
						Registration is not available at the moment.
					</p>
				</form>
			

				<footer className="relative shrink-0">
					<div className="space-y-4 text-sm text-gray-900 sm:flex sm:items-center sm:justify-center sm:space-y-0 sm:space-x-4">
						<p className="text-gray-900 text-center sm:text-left">You have an account?</p>
						<Link className="inline-flex justify-center rounded-lg text-gray-900 text-sm font-semibold py-2.5 px-1" to="/login">
							Sing In
						</Link>
					</div>
				</footer>
			</div>
		);
	}
} 

export default Register;