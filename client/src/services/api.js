import axios from 'axios';

const host = 'http://localhost:4040/api';

export const setToken = function (token) {
    if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }else{
        delete axios.defaults.headers.common['Authorization'];
    }
};



export const call = async function (method, path, data) {
    const response = await axios[method](`${host}/${path}`, data);
    return response;
};

export default {call, setToken};
