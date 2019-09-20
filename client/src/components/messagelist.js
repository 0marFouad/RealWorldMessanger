import React from 'react';
import messages from '../services/messages';
import NewMessageArea from './newMessageArea';

const deepai = require('deepai');
deepai.setApiKey('4dbab915-7844-472f-8712-f0e237b770a3');

class messagelist extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
        this.loadData = this.loadData.bind(this);
        this.loadData();
    }

    check(){

    }

    loadData() {
        let resp = messages.getMessages();
        resp.then((response) => {
            this.setState({
               messages: response.data
            });
        });
    }

    handleMessageArrival(data){
        this.setState({
            messages: [...this.state.messages, { ...data }]
        });
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    };

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render(){
        let messages = this.state.messages;
        return (
            <div className="mesgs">
                <div className="msg_history">
                    {messages.map((message) => {
                        return message.sender === JSON.parse(localStorage.getItem('currentUser')).id ?
                            <div className="outgoing_msg">
                                <div className="sent_msg">
                                    <span className="time_date">{message.sendername}</span>
                                    <p>{message.text}</p>
                                    <span className="time_date">{new Date(message.created_at).toUTCString()}</span>
                                </div>
                            </div>
                            :
                            <div className="incoming_msg">
                                <div className="incoming_msg_img"><img src={require("../"+message.senderstate+".png")} alt="sunil"></img></div>
                                <div className="received_msg">
                                    <div className="received_withd_msg">
                                        <span className="time_date">{message.sendername}</span>
                                        <p>{message.text}</p>
                                        <span className="time_date">{new Date(message.created_at).toUTCString()}</span>
                                    </div>
                                </div>
                            </div>
                    })}
                    <div ref={(el) => { this.messagesEnd = el; }}></div>
                </div>
                <NewMessageArea handleMessageArrival={this.handleMessageArrival.bind(this)} />
            </div>
        )
    }
}

export default messagelist;