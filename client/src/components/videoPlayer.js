import React from 'react';
import Webcam from "react-webcam";
import { withRouter } from 'react-router-dom';
import OnlineList from './VideoList';
import socket from '../services/client-socket';
import { Button } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import authentication from '../services/authentication';
import { history } from '../helper/history';




class videoPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            img: '',
            videoEnabled: false
        };
        this.intervalID = 0;
        this.handleChange = this.handleChange.bind(this);
        this.logout = this.logout.bind(this);
    }
    setRef = webcam => {
        this.webcam = webcam;
    };

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    componentDidMount() {
        this.intervalID = setInterval(() => {
            this.setState({
                img: this.webcam.getScreenshot()
            });
            if(this.state.videoEnabled){
                console.log(this.webcam.getScreenshot());
                socket.SendStream({
                    id: JSON.parse(localStorage.getItem('currentUser')).id,
                    username: JSON.parse(localStorage.getItem('currentUser')).username,
                    img: this.state.img
                });
            }
        }, 150);
    }

    handleChange(e) {
        console.log("Video State Changed");
        e.persist();
        this.setState({
            videoEnabled: !this.state.videoEnabled
        });
        if(!this.state.videoEnabled){
            this.setState({
               img: '\'../image.png\''
        });
        }
    }

    logout(){
        socket.handleDisconnect();
        authentication.logout({
            username: JSON.parse(localStorage.getItem('currentUser')).username
        }).then(
            () => {
                this.props.history.push({
                    pathname: "/"
                });
            }
        );
        history.push('/');
    }



    render(){
        return (
            <div className="videoContainer">
                <Webcam
                    audio={false}
                    height={500}
                    ref={this.setRef}
                    screenshotFormat="image/jpeg"
                    width={500}
                />
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <Input addon type="checkbox" onChange={this.handleChange} aria-label="Checkbox for following text input" />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Enable Video" disabled />
                </InputGroup>
                <div className="PageSwitcher">
                    <Button to="/" className="logoutbtn" onClick={this.logout} color="danger">Logout</Button>
                </div>
                <OnlineList/>
            </div>
        )
    }
}

export default withRouter(videoPlayer);