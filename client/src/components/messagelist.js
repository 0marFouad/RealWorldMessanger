import React from 'react';

const DUMMY_DATA = [
    {
        senderId: 'Omar Fouad',
        text: 'Eh yasta 3aml eh'
    },
    {
        senderId: 'A7ma Sambo',
        text: 'kwys ya zmeeli enta eh a5barak'
    },
    {
        senderId: 'So3ad El tot',
        text: 'albi ya sambo'
    }
];



class messagelist extends React.Component{
    constructor() {
        super();

        this.state = {
            messages: []
        };

    }

    render(){
        return (
            <div class="mesgs">
                <div class="msg_history">
                    <div class="incoming_msg">
                        <div class="incoming_msg_img"> <img src={require("../sad.png")} alt="sunil"></img></div>
                        <div class="received_msg">
                            <div class="received_withd_msg">
                                <p>Test which is a new approach to have all
                                    solutions</p>
                                <span class="time_date"> 11:01 AM    |    June 9</span></div>
                        </div>
                    </div>
                    <div class="outgoing_msg">
                        <div class="sent_msg">
                            <p>Test which is a new approach to have all
                                solutions</p>
                            <span class="time_date"> 11:01 AM    |    June 9</span> </div>
                    </div>
                    <div class="incoming_msg">
                        <div class="incoming_msg_img"> <img src={require("../neutral.png")} alt="sunil"></img></div>
                        <div class="received_msg">
                            <div class="received_withd_msg">
                                <span class="time_date">Omar Fouad</span>
                                <p>Test, which is a new approach to have</p>
                                <span class="time_date"> 11:01 AM    |    Yesterday</span></div>
                        </div>
                    </div>
                    <div class="outgoing_msg">
                        <div class="sent_msg">
                            <p>Apollo University, Delhi, India Test</p>
                            <span class="time_date"> 11:01 AM    |    Today</span> </div>
                    </div>
                    <div class="incoming_msg">
                        <div class="incoming_msg_img"> <img src={require("../happy.png")} alt="sunil"></img></div>
                        <div class="received_msg">
                            <div class="received_withd_msg">
                                <p>We work directly with our designers and suppliers,
                                    and sell direct to you, which means quality, exclusive
                                    products, at a price anyone can afford.</p>
                                <span class="time_date"> 11:01 AM    |    Today</span></div>
                        </div>
                    </div>
                    <div className="incoming_msg">
                        <div className="incoming_msg_img"><img src={require("../happy.png")} alt="sunil"></img></div>
                        <div className="received_msg">
                            <div className="received_withd_msg">
                                <p>We work directly with our designers and suppliers,
                                    and sell direct to you, which means quality, exclusive
                                    products, at a price anyone can afford.</p>
                                <span className="time_date"> 11:01 AM    |    Today</span></div>
                        </div>
                    </div>
                    <div className="incoming_msg">
                        <div className="incoming_msg_img"><img src={require("../happy.png")} alt="sunil"></img></div>
                        <div className="received_msg">
                            <div className="received_withd_msg">
                                <p>We work directly with our designers and suppliers,
                                    and sell direct to you, which means quality, exclusive
                                    products, at a price anyone can afford.</p>
                                <span className="time_date"> 11:01 AM    |    Today</span></div>
                        </div>
                    </div>
                    <div className="incoming_msg">
                        <div className="incoming_msg_img"><img src={require("../happy.png")} alt="sunil"></img></div>
                        <div className="received_msg">
                            <div className="received_withd_msg">
                                <p>We work directly with our designers and suppliers,
                                    and sell direct to you, which means quality, exclusive
                                    products, at a price anyone can afford.</p>
                                <span className="time_date"> 11:01 AM    |    Today</span></div>
                        </div>
                    </div>
                    <div className="incoming_msg">
                        <div className="incoming_msg_img"><img src={require("../happy.png")} alt="sunil"></img></div>
                        <div className="received_msg">
                            <div className="received_withd_msg">
                                <p>We work directly with our designers and suppliers,
                                    and sell direct to you, which means quality, exclusive
                                    products, at a price anyone can afford.</p>
                                <span className="time_date"> 11:01 AM    |    Today</span></div>
                        </div>
                    </div>
                </div>
                <div class="type_msg">
                    <div class="input_msg_write">
                        <input type="text" class="write_msg" placeholder="Type a message" />
                        <button class="msg_send_btn" type="button"><img src={require('../icon.png')} alt="IMAawGE"></img></button>
                    </div>
                </div>
            </div>
        )
    }
}

export default messagelist;