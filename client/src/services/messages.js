import { BehaviorSubject } from 'rxjs';
import api from './api';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

 function getMessages() {
    api.setToken(JSON.parse(localStorage.getItem('currentUser')).token);
     const request = api.call('get', 'chat/getmessages', {});
     return request;
}

export default {
    getMessages,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};