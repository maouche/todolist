import React , { useEffect } from "react";
import { authApi, todosApi } from "../config/axios";
import { Navigate, useParams } from "react-router-dom";
import { Notyf } from 'notyf';
const notyf = new Notyf({ duration: 5000, position: { x: 'right', y: 'top' } });

function Verify({setLogged, setLoading}) {
    const { token } = useParams();
    useEffect(() => {
        setLoading(true)
        authApi({ method: 'get', url: 'verify/' + token })
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
    }, [])

    return (<Navigate replace to="/login" />)
}

export default Verify;