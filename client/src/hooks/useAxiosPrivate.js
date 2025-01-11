import { axiosPrivate } from "../API/axios";
import React from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { User } from '../context/User';
const useAxiosPrivate = () => {
    const refresh = useRefreshToken()
    const { auth } = useAuth()

    const { newUser, setNewUser } = React.useContext(User)

    console.log(newUser)
    React.useEffect(() => {
        const requestInterceptor = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${newUser?.accessToken}`
                }
                return config

            }, (error) => Promise.reject(error)
        )
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                    return axiosPrivate(prevRequest)
                }
                return Promise.reject(error)
            }
        )
        return () => {
            axiosPrivate.interceptors.request.eject(requestInterceptor)
            axiosPrivate.interceptors.response.eject(responseIntercept)
        }
    }, [newUser, refresh])
    return axiosPrivate;
}
export default useAxiosPrivate
