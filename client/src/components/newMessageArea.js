import React from 'react';
import socket from '../services/client-socket';

const deepai = require('deepai');
deepai.setApiKey('4dbab915-7844-472f-8712-f0e237b770a3');

class newMessageArea extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            newMessage: ''
        };
        this.textInput = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }



    componentDidMount(){
        let handleMessageArrival = this.props.handleMessageArrival;
        socket.handleRecieveMessage(handleMessageArrival);
    }

    handleChange(e) {
        e.persist();
        this.setState({
            newMessage: e.target.value
        });
    }

    async sendMessage(event){
        console.log(process.env.sentiment_analysis_api);
        if((event.keyCode == 13 || event.which == 13 || event.which == null) && !event.ctrlKey){
            console.log(this.state.newMessage.length);
            if(this.state.newMessage.length > 0){
                var resp = await deepai.callStandardApi("sentiment-analysis", {
                    text: this.state.newMessage,
                });
                console.log(resp.output[0]);
                if(resp.output[0] === "Verynegative"){
                    resp.output[0] = "Negative";
                }
                if(resp.output[0] === "Verypositive"){
                    resp.output[0] = "Positive";
                }
                console.log(resp.output[0]);
                let data = {
                    text: this.state.newMessage,
                    sender: JSON.parse(localStorage.getItem('currentUser')).id,
                    sendername: JSON.parse(localStorage.getItem('currentUser')).username,
                    senderstate: resp.output[0],
                    created_at:new Date().getTime()
                };
                socket.emitMessage(data);
                this.setState({
                   newMessage: ''
                });
                console.log(this.textInput);
            }
        }else if ((event.keyCode == 13 || event.which == 13 || event.which == null) && event.ctrlKey) {
            console.log('CTRL pressed');
            this.setState({
                newMessage: event.target.value + "\n"
            })
        }
    }

    render(){
        return (
            <div className="type_msg">
                <div className="input_msg_write">
                    <input type="text" className="write_msg" ref={this.textInput} placeholder="Type a message" value={this.state.newMessage}
                           onKeyPress={this.sendMessage} onChange={this.handleChange}/>
                    <button onClick={this.sendMessage} className="msg_send_btn" type="button"><img
                        src={require('../icon.png')} alt="IMAawGE"></img></button>
                </div>
            </div>
        )
    }
}

export default newMessageArea;