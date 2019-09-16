import { BehaviorSubject } from 'rxjs';
import api from './api';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));


async function login(username, password) {

    const result = await api.call('post', 'auth/login', {
        username: username,
        password: password
    });

    localStorage.setItem('currentUser', JSON.stringify(result.data));
    currentUserSubject.next(result.data);

    console.log(result.status);

    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ username, password })
    // };

    // return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
    //     .then(handleResponse)
    //     .then(user => {
    //         // store user details and jwt token in local storage to keep user logged in between page refreshes
    //         localStorage.setItem('currentUser', JSON.stringify(user));
    //         currentUserSubject.next(user);
    //
    //         return user;
    //     });
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