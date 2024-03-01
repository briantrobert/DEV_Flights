import axiosFetch from "./axios";

const config = {
    headers: { 'content-type': 'multipart/form-data' }
}

export async function GetData(conf) {
    try {
        const response = await axiosFetch("/flights",conf)
        return response;

    } catch (error) {
        return error.response.data
     }


};

export async function CreateFlight(formData, conf) {
    try {
        const response = await axiosFetch.post('/flights', formData, conf)
        return response
       

    } catch (error) {
        return error.response.data
    }
}

export async function CreateFlightwithPhoto(formData) {

    try {
        const response = await axiosFetch.post('/flights/withPhoto', formData, config)
        return response

    } catch (error) {
        return error.response.data
    }
}

export async function EditFlight(id, formData, conf) {
    try {
        const response = await axiosFetch.put(`/flights/${id}`, formData, conf)
        return response

    } catch (error) {
        return error.response.data
    }
}

export async function EditFlightwithPhoto(id, formData) {
    try {
        const response = await axiosFetch.put(`/flights/${id}/withPhoto`, formData, config)
        return response

    } catch (error) {
        return error.response.data
    }
}

export async function GetFlightById(id, conf) {
    try {
        const response = await axiosFetch(`/flights/${id}/details`, conf)
        return response

        
    } catch (error) {
        return error.response.data
     }
};

export async function GetFlightPhotoById(id) {
    try {
        const response = await axiosFetch(`/flights/${id}/photo`, { responseType: 'blob' })
        return response.data
        
    } catch (error) { 
        return error.response.data
    }
};

export async function DeleteFlight(id) {
    try {
        const response = await axiosFetch.delete(`/flights/${id}`);
        return response;

    } catch (error) {
        return error.response.data
     }


};