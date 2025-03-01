import axios from 'axios';

interface AxiosFetchParams {
    method: string;
    url: string;
    data?: unknown;
}

const axiosFetch = async (
    { method, url, data }: AxiosFetchParams,
    contentType: string = 'application/json'
): Promise<any> => {
    // const token = localStorage.getItem('token');

    try {
        const response = await axios({
            method,
            url,
            headers: {
                'Content-Type': contentType,
                'ngrok-skip-browser-warning':  '69420',
                // 'Authorization': `Bearer ${token}`,
            },
            data,
        });
        return response.data;
    } catch (error: any) {
        const errorMessage = error?.response?.data?.message
            ? error.response.data.message
            : error?.request
            ? "No response received from the server"
            : "Error setting up the request";
        return Promise.reject(new Error(errorMessage));
    }
};

const axiosGet = (url: string): Promise<any> =>
    axiosFetch({ method: 'GET', url });

const axiosPost = (url: string, data: unknown): Promise<any> =>
    axiosFetch({ method: 'POST', url, data });

const url: string =  "https://5e92-217-73-170-83.ngrok-free.app"
// GET requests

export function fetchPlans() : Promise<any> {
    return axiosGet(`${url}/api/Category/getCategory`);
}

export function fetchHome() : Promise<any> {
    return axiosGet(`${url}/api/Home/getHome?id=4`);
}

export function fetchFlipCards() : Promise<any> {
    return axiosGet(`${url}/api/Quiz/getFlipCardsByCategory?categoryId=1`);
}


