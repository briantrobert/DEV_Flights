import axiosFetch from "./axios";

export async function LogIn(data) {
    try {
        const response = await axiosFetch.post("/auth/login", data)
        return response
        
    } catch (error) {
        return error.response.data
     }


};

export async function RegisterUser(data) {
    try {
        const response = await axiosFetch.post("/auth/register", data)
        return response

    } catch (error) {
        return error.response.data
     }
};
