
import { io } from "socket.io-client";
import { BASE_URL } from "./constants.js";

const initializeSocket = () => {
    if (location.hostname === "localhost") {
        return io(BASE_URL, {
            withCredentials: true, // to allow cookies to be sent in cross-origin requests
            extraHeaders: {
                "my-custom-header": "abcd" // to send any custom headers if needed
            }
        });
    }
    else {
        return io("/", { path: "/api/socket.io" })
    }

}



export default initializeSocket;