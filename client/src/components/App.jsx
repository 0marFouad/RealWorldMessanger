import React from 'react';
import api from '../services/api';

class App extends React.Component{
    //runs after rendering
    async componentDidMount(){
        const result = await api.call('post', 'auth/login', {
            username: 'OmarFouad',
            password: 'password'
        });

        console.log(result);
    }

    render(){
        return (
            <div className="App">
                <div className="App__Aside"></div>
                <div className="App__Form"></div>
            </div>
        );
    }
}

export default App;