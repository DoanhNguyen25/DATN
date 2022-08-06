/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'

import { useHistory } from 'react-router-dom'
import jwt_decode from 'jwt-decode';
import { notification } from 'antd';


export const Authentication = () => {
    const history = useHistory();
    const token_admin = localStorage.getItem('token_admin')
    const auth = token_admin ? true : false
    useEffect(() => {

        if (!auth) { history.push('/sign-in'); return }
        if (jwt_decode(token_admin).exp * 1000 < new Date().getTime()) {
            notification.warning({
                message: "You need to login again!"
            })
            localStorage.clear();
            history.push('/sign-in')
        }
    }, [])
}