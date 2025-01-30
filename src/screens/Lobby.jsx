import React, { useCallback, useState } from "react";
import {useSocket} from '../context/SocketProvider'

const Lobbyclass = () => {
    const [email, mail] = useState("");
    const [room, oom] = useState("");
    const Socket=useSocket();
    const haubmit = useCallback((e) => {
        e.preventDefault();
        Socket.emit("info",{email,room});
    }, [email, room, Socket]);

    return (
        <div>
            <h1>Lobby</h1>
            <br />
            <form onSubmit={haubmit}>
                <label htmlFor="email">Email-Id:</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => mail(e.target.value)}
                />
                <br />
                <label htmlFor="roomno">Room Number:</label>
                <input
                    id="roomno"
                    type="text"
                    value={room}
                    onChange={(e) => oom(e.target.value)}
                /><button>Join</button>
            </form>
        </div>
    );
};

export default Lobbyclass;
