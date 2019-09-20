import { BehaviorSubject } from 'rxjs';
import api from './api';
import socket from '../services/client-socket';
const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));


async function login(username, password) {

    const result = await api.call('post', 'auth/login', {
        username: username,
        password: password
    });

    localStorage.setItem('currentUser', JSON.stringify(result.data));
    currentUserSubject.next(result.data);
    socket.addUser({
        id: result.data.id,
        username: result.data.username
    });
    console.log(result.status);
}

async function signup(username, password, email) {

    const result = await api.call('post', 'auth/register', {
        username: username,
        password: password,
        email: email
    });

    localStorage.setItem('currentUser', JSON.stringify(result.data));
    currentUserSubject.next(result.data);
    socket.addUser({
        id: result.data.id,
        username: result.data.username
    });
    console.log(result.status);
}

async function logout() {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}

export default {
    login,
    signup,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};