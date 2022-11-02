import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { authApi, todosApi } from "../config/axios";

export default function Logout({setLogged, setLoading}) {
    useEffect(() => {
        setLogged(false)
        setLoading(false)
        authApi.defaults.headers.common['Authorization'] = ``;
        todosApi.defaults.headers.common['Authorization'] = ``;
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
    }, [])

    return (<Navigate replace to="/" />)
}