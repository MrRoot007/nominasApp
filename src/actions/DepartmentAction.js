import HttpClient from '../services/HttpClient';

export const getDepartments =()=>{
    return new Promise((resolve,eject)=>{
        HttpClient.get('/Department').then(response=>{
            resolve(response);
        })
    })
}