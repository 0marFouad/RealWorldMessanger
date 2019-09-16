import { BehaviorSubject } from 'rxjs';
import api from './api';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));


async function getMessages() {
    api.setToken(JSON.parse(localStorage.getItem('currentUser').token));
    const result = await api.call('get', 'chat/getmessages', {});
    console.log(result);
    return result;
}

async function logout() {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}

export default {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};