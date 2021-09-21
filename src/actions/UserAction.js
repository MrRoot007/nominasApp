import HttpClient from '../services/HttpClient';
import axios from 'axios';

const instancia = axios.create();
instancia.cancelToken = axios.CancelToken;
instancia.isCancel = axios.isCancel;

export const userRegister = user => {
    return new Promise((resolve, eject) => {
        instancia.post('/user/registrar', user).then(response => {
            resolve(response);
        })
    });
}

export const getCurrentUser = (dispatch) => {
    return new Promise((resolve, eject) => {
        HttpClient.get('/token').then(response => {
            if (response.data && response.data.profilePicture) {
                let profilePicture = response.data.profilePicture;
                const newFile = `data:image/${profilePicture.extension};base64,${profilePicture.data}`
                response.data.profilePicture = newFile;
            }
            dispatch({
                type: 'LOG_IN',
                session: response.data,
                authenticated: true
            });
            resolve(response);
        }).catch(error => {
            resolve(error.response);
        });
    })
}

export const userUpdate = (user, dispatch) => {
    return new Promise((resolve, eject) => {
        HttpClient.put('/user/', user).then(response => {
            if (response.data && response.data.profilePicture) {
                let profilePicture = response.data.profilePicture;
                const newFile = `data:image/${profilePicture.extension};base64,${profilePicture.data}`
                response.data.profilePicture = newFile;
            }
            dispatch({
                type: 'LOG_IN',
                session: response.data,
                authenticated: true
            })
            resolve(response);
        }).catch(error => {
            resolve(error.response);
        });
    })
}
export const userLogin = (user, dispatch) => {
    return new Promise((resolve, eject) => {
        instancia.post('/token', user).then(response => {
            resolve(response);
            if (response.data && response.data.profilePicture) {
                let profilePicture = response.data.profilePicture;
                const newFile = `data:image/${profilePicture.extension};base64,${profilePicture.data}`
                response.data.profilePicture = newFile;
            }
            dispatch({
                type: 'LOG_IN',
                session: response.data,
                authenticated: true
            })
        }).catch(error => {
            resolve(error.response);
        });
    });
}