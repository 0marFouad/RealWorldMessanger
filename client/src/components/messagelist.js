import React from 'react';
import messages from '../services/messages';

const deepai = require('deepai');
deepai.setApiKey('');

class messagelist extends React.Component{
    constructor() {
        super();
        this.state = {
            messages: [],
            newMessage: ''
        };
        this.loadData = this.loadData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.loadData();
    }

    loadData() {
        let resp = messages.getMessages();
        resp.then((response) => {
            this.setState({
               messages: response.data
            });
        });
    }

    handleChange(e) {
        this.setState({
            newMessage: e.target.value
        });
    }

    async sendMessage(event){
        console.log(process.env.sentiment_analysis_api);
        if(event.keyCode == 13 || event.which == 13 || event.which == null){
            console.log(this.state.newMessage.length);
            if(this.state.newMessage.length > 0){
                var resp = await deepai.callStandardApi("sentiment-analysis", {
                    text: this.state.newMessage,
                });
                console.log(resp);
            }
        }
    }

    render(){
        let messages = this.state.messages;
        return (
            <div class="mesgs">
                <div class="msg_history">
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
                    <div class="incoming_msg">
                        <div class="incoming_msg_img"> <img src={require("../sad.png")} alt="sunil"></img></div>
                        <div class="received_msg">
                            <div class="received_withd_msg">
                                <p>Test which is a new approach to have all
                                    solutions</p>
                                <span class="time_date"> 11:01 AM    |    June 9</span></div>
                        </div>
                    </div>
                </div>
                <div class="type_msg">
                    <div class="input_msg_write">
                        <input type="text" class="write_msg" placeholder="Type a message"  value={this.state.newMessage} onKeyPress={this.sendMessage} onChange={this.handleChange} />
                        <button onClick={this.sendMessage} class="msg_send_btn" type="button"><img src={require('../icon.png')} alt="IMAawGE"></img></button>
                    </div>
                </div>
            </div>
        )
    }
}

export default messagelist;