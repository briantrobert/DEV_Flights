import axios from "axios";

const axiosFetch = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
        // Authorization:
    }
});



export default axiosFetch