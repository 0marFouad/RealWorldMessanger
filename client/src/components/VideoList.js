import React from 'react';
import socket from '../services/client-socket';
import { ListGroup, ListGroupItem } from 'reactstrap';


class VideoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onlineUsers: [] || JSON.parse(localStorage.getItem('onlineUsers'))
        };
        this.handleUsersArrival = this.handleUsersArrival.bind(this);
        this.handleStreamArrival = this.handleStreamArrival.bind(this);
        this.handleRefreshPage = this.handleRefreshPage.bind(this);
        this.handleRefreshPage();
    }

    handleRefreshPage(){
        let onlineUsers = [] || JSON.parse(localStorage.getItem('onlineUsers'));
        let test = false;
        for(var i=0;i<onlineUsers.length;i++){
            if(onlineUsers[i].id === JSON.parse(localStorage.getItem('currentUser')).id){
                test = true;
            }
        }
        if(JSON.parse(localStorage.getItem('currentUser'))){
            !test && socket.addUser({
                id: JSON.parse(localStorage.getItem('currentUser')).id,
                username: JSON.parse(localStorage.getItem('currentUser')).username
            })
        }
    }

    handleUsersArrival(data){
        localStorage.setItem("names", JSON.stringify(this.state.onlineUsers));
        this.setState({
            onlineUsers: data
        });
    }

    handleStreamArrival(data){
        console.log("Recieved Picture");
        let newOnlineUsers = this.state.onlineUsers;
        for(let i = 0; i < newOnlineUsers.length; i++){
            if(newOnlineUsers[i].id === data.id){
                newOnlineUsers[i].img = data.img;
            }
        }
        this.setState({
            onlineUsers: newOnlineUsers
        });
    }

    componentDidMount() {

        socket.GetUsers(this.handleUsersArrival);
        socket.RecieveStream(this.handleStreamArrival);
    }
    render(){
        let onlineUsers = this.state.onlineUsers;
        return (
            <div className="main">
                <ListGroup>
                    <ListGroupItem>
                        {onlineUsers.map((user) => {
                            return <li>
                                <img className="smallimg" src={user.img ? user.img : "data:image/svg+xml;base64, PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTk4LjQ5NiAxOTguNDk2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxOTguNDk2IDE5OC40OTY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgY2xhc3M9IiI+PGc+PGc+Cgk8Zz4KCQk8cmVjdCB4PSI4NC41NSIgeT0iMTQ4LjIzMSIgc3R5bGU9ImZpbGw6I0ZEQ0M5QjsiIHdpZHRoPSIyOS4zOTUiIGhlaWdodD0iMzIuOTIyIiBkYXRhLW9yaWdpbmFsPSIjRkRDQzlCIiBjbGFzcz0iIj48L3JlY3Q+CgkJPHBhdGggc3R5bGU9ImZpbGw6I0ZDQkM4NTsiIGQ9Ik04NC41NTEsMTUyLjEwOGMwLDAsMTIuMzY1LDcuODc0LDI5LjM5NSw2LjA1di05LjkyOEg4NC41NTFWMTUyLjEwOHoiIGRhdGEtb3JpZ2luYWw9IiNGQ0JDODUiIGNsYXNzPSIiPjwvcGF0aD4KCQk8ZWxsaXBzZSBzdHlsZT0iZmlsbDojRkNCQzg1OyIgY3g9IjQyLjE2NCIgY3k9Ijk3LjE4MSIgcng9IjE0LjM0MyIgcnk9IjE2LjM2NCIgZGF0YS1vcmlnaW5hbD0iI0ZDQkM4NSIgY2xhc3M9IiI+PC9lbGxpcHNlPgoJCTxlbGxpcHNlIHN0eWxlPSJmaWxsOiNGQ0JDODU7IiBjeD0iMTU2LjMzMiIgY3k9Ijk3LjE4MSIgcng9IjE0LjM0MyIgcnk9IjE2LjM2NCIgZGF0YS1vcmlnaW5hbD0iI0ZDQkM4NSIgY2xhc3M9IiI+PC9lbGxpcHNlPgoJCTxwYXRoIHN0eWxlPSJmaWxsOiNGRENDOUI7IiBkPSJNMTU2LjI3NCw2NS45MjVjMC0yNC4xMDMtMTcuNjM3LTQxLjc0MS01Ny4wMjYtNDEuNzQxYy0zOS4zODksMC01Ny4wMjYsMTcuNjM3LTU3LjAyNiw0MS43NDEgICAgYzAsMjQuMTA0LTQuMTE1LDg3LjU5Nyw1Ny4wMjYsODcuNTk3QzE2MC4zODksMTUzLjUyMiwxNTYuMjc0LDkwLjAyOSwxNTYuMjc0LDY1LjkyNXoiIGRhdGEtb3JpZ2luYWw9IiNGRENDOUIiIGNsYXNzPSIiPjwvcGF0aD4KCQk8Zz4KCQkJPGc+CgkJCQk8ZWxsaXBzZSBzdHlsZT0iZmlsbDojM0IyNTE5OyIgY3g9IjcxLjQ3MiIgY3k9IjkzLjI2MiIgcng9IjYuMTczIiByeT0iNi43NjEiIGRhdGEtb3JpZ2luYWw9IiMzQjI1MTkiIGNsYXNzPSIiPjwvZWxsaXBzZT4KCQkJCTxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGN4PSI2OC43ODEiIGN5PSI5MC4yNzciIHI9IjEuODQ2IiBkYXRhLW9yaWdpbmFsPSIjRkZGRkZGIiBjbGFzcz0iIj48L2NpcmNsZT4KCQkJPC9nPgoJCQk8cGF0aCBzdHlsZT0iZmlsbDojMkU0MTU4IiBkPSJNNjEuNTk3LDc2LjUwN2MyLjkxOSwxLjQ2LDcuNjA2LTQuOTYsMTguMzM1LDAuNjI1YzEuOTU2LDEuMDE4LDMuMTIzLTguNzA4LTguMzc3LTguNzA4ICAgICBDNjEuNTk3LDY4LjQyNCw1OS44MzMsNzUuNjI2LDYxLjU5Nyw3Ni41MDd6IiBkYXRhLW9yaWdpbmFsPSIjNTEzNjJBIiBjbGFzcz0iYWN0aXZlLXBhdGgiIGRhdGEtb2xkX2NvbG9yPSIjNTEzNjJBIj48L3BhdGg+CgkJCTxnPgoJCQkJPGVsbGlwc2Ugc3R5bGU9ImZpbGw6IzNCMjUxOTsiIGN4PSIxMjcuNzg2IiBjeT0iOTMuMjYyIiByeD0iNi4xNzMiIHJ5PSI2Ljc2MSIgZGF0YS1vcmlnaW5hbD0iIzNCMjUxOSIgY2xhc3M9IiI+PC9lbGxpcHNlPgoJCQkJPGNpcmNsZSBzdHlsZT0iZmlsbDojRkZGRkZGOyIgY3g9IjEyNS4wOTUiIGN5PSI5MC4yNzciIHI9IjEuODQ2IiBkYXRhLW9yaWdpbmFsPSIjRkZGRkZGIiBjbGFzcz0iIj48L2NpcmNsZT4KCQkJPC9nPgoJCQk8cGF0aCBzdHlsZT0iZmlsbDojMkU0MTU4IiBkPSJNMTM2Ljg5OSw3Ni41MDdjLTIuOTE5LDEuNDYtNy42MDYtNC45Ni0xOC4zMzUsMC42MjVjLTEuOTU2LDEuMDE4LTMuMTIzLTguNzA4LDguMzc4LTguNzA4ICAgICBDMTM2Ljg5OSw2OC40MjQsMTM4LjY2Miw3NS42MjYsMTM2Ljg5OSw3Ni41MDd6IiBkYXRhLW9yaWdpbmFsPSIjNTEzNjJBIiBjbGFzcz0iYWN0aXZlLXBhdGgiIGRhdGEtb2xkX2NvbG9yPSIjNTEzNjJBIj48L3BhdGg+CgkJPC9nPgoJCTxwYXRoIHN0eWxlPSJmaWxsOiNGQ0JDODU7IiBkPSJNOTkuMjQ4LDExNy4wNDNjLTYuMSwwLTkuNzc0LTQuNTU2LTkuNzc0LTIuMzUyYzAsMi4yMDUsMS43NjQsNi4zOTQsOS43NzQsNi4zOTQgICAgYzguMDEsMCw5Ljc3NC00LjE4OSw5Ljc3NC02LjM5NEMxMDkuMDIyLDExMi40ODYsMTA1LjM0NywxMTcuMDQzLDk5LjI0OCwxMTcuMDQzeiIgZGF0YS1vcmlnaW5hbD0iI0ZDQkM4NSIgY2xhc3M9IiI+PC9wYXRoPgoJCTxwYXRoIHN0eWxlPSJmaWxsOiNGQ0JDODU7IiBkPSJNOTkuMjQ4LDEzNy4zMTNjLTIuMTEsMC0zLjM4MS0xLjU3Ni0zLjM4MS0wLjgxM3MwLjYxLDIuMjExLDMuMzgxLDIuMjExICAgIGMyLjc3MSwwLDMuMzgtMS40NDgsMy4zOC0yLjIxMVMxMDEuMzU3LDEzNy4zMTMsOTkuMjQ4LDEzNy4zMTN6IiBkYXRhLW9yaWdpbmFsPSIjRkNCQzg1IiBjbGFzcz0iIj48L3BhdGg+CgkJPHBhdGggc3R5bGU9ImZpbGw6I0Y3OTQ1RTsiIGQ9Ik05OS4yNDgsMTMxLjY5NmMtOS42NjgsMC0xNS40OTMtMy45MzctMTUuNDkzLTIuOTM5YzAsMC45OTgsMi43OTYsNC45MjQsMTUuNDkzLDQuOTI0ICAgIGMxMi42OTcsMCwxNS40OTMtMy45MjYsMTUuNDkzLTQuOTI0QzExNC43NCwxMjcuNzU5LDEwOC45MTYsMTMxLjY5Niw5OS4yNDgsMTMxLjY5NnoiIGRhdGEtb3JpZ2luYWw9IiNGNzk0NUUiIGNsYXNzPSIiPjwvcGF0aD4KCTwvZz4KCTxwYXRoIHN0eWxlPSJmaWxsOiMyRTQxNTgiIGQ9Ik05OS4yNDgsMTYxLjQ1OHYzNy4wMzhIMjcuODIxQzI3LjgyMSwxODMuNTA0LDY1LjQ0NCwxNjEuNDU4LDk5LjI0OCwxNjEuNDU4eiIgZGF0YS1vcmlnaW5hbD0iI0Y3OTQxRSIgY2xhc3M9IiIgZGF0YS1vbGRfY29sb3I9IiNGNzk0MUUiPjwvcGF0aD4KCTxwYXRoIHN0eWxlPSJmaWxsOiMyRTQxNTgiIGQ9Ik05OS4yNDgsMTYxLjQ1OHYzNy4wMzhoNzEuNDI3QzE3MC42NzUsMTgzLjUwNCwxMzMuMDUyLDE2MS40NTgsOTkuMjQ4LDE2MS40NTh6IiBkYXRhLW9yaWdpbmFsPSIjRjc5NDFFIiBjbGFzcz0iIiBkYXRhLW9sZF9jb2xvcj0iI0Y3OTQxRSI+PC9wYXRoPgoJPHBhdGggc3R5bGU9ImZpbGw6I0ZERkRGRCIgZD0iTTk5LjI0OCwxNjEuNDU4Yy03LjE5LDAtMTQuNTUyLDEuMDA1LTIxLjY4OSwyLjcyYzAuMDQ4LDAuMDYzLDcuOTE2LDEwLjIxNCwyMS42ODksMTAuMjE0ICAgYzEyLjc1NCwwLDIxLjIzMy04LjY5MywyMi40NjItMTAuMDNDMTE0LjMzMiwxNjIuNTMxLDEwNi42OTgsMTYxLjQ1OCw5OS4yNDgsMTYxLjQ1OHoiIGRhdGEtb3JpZ2luYWw9IiNGMzZDMjEiIGNsYXNzPSIiIGRhdGEtb2xkX2NvbG9yPSIjRjM2QzIxIj48L3BhdGg+Cgk8cGF0aCBzdHlsZT0iZmlsbDojRkRDQzlCOyIgZD0iTTg0LjU1LDE2Mi43NGMwLDAsNC4yOTksNS4zMzIsMTQuNjk3LDUuMzMyYzEwLjM5OCwwLDE0LjY5OC01LjMzMiwxNC42OTgtNS4zMzIgICBTOTguNjk3LDE1Ny4xODksODQuNTUsMTYyLjc0eiIgZGF0YS1vcmlnaW5hbD0iI0ZEQ0M5QiIgY2xhc3M9IiI+PC9wYXRoPgoJPHBhdGggc3R5bGU9ImZpbGw6IzJFNDE1OCIgZD0iTTE0Ni4xMzIsMTkuMDQxYzAsMC0yMS4xNjQtMjYuODk2LTY1LjE1Mi0xNi43NTVDMzYuOTkzLDEyLjQyNiwzMy42OTcsMzguODgyLDM1LjAyLDY0LjYyMSAgIGMxLjMyMywyNS43NCw0Ljg1LDQwLjg0LDkuMDIyLDM4Ljk3NGM0LjE3Mi0xLjg2NywyLjAwMS0xOC44NTcsMi40NDItMjIuNzc4YzAuNDQxLTMuOTIxLDQuNDA5LTIxLjY1MywzMS4xNjItMTkuMDA3ICAgYzI2Ljc1MiwyLjY0Niw0OS4yOTYtNy4wNTUsNDkuMjk2LTcuMDU1czkuMDc1LDExLjQ3MSwxNS4wNDcsMTMuNjY5YzExLjkzNCw0LjM5MSw4LjAyLDMzLjY3LDEyLjY5NiwzMy42NyAgIFMxODIuMjg4LDM0LjQ3MywxNDYuMTMyLDE5LjA0MXoiIGRhdGEtb3JpZ2luYWw9IiM1MTM2MkEiIGNsYXNzPSJhY3RpdmUtcGF0aCIgZGF0YS1vbGRfY29sb3I9IiM1MTM2MkEiPjwvcGF0aD4KPC9nPjwvZz4gPC9zdmc+"}></img>
                                <h3>{user.username}</h3>
                            </li>
                        })}
                    </ListGroupItem>
                </ListGroup>
            </div>
        )
    }
}

export default VideoList;