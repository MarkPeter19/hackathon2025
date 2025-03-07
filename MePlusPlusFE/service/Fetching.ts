import { UserResponse } from '@/models/FlipCard';
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

const axiosPut = (url: string, data: unknown): Promise<any> =>
    axiosFetch({ method: 'PUT', url, data });

const url: string =  "https://8471-217-73-170-83.ngrok-free.app";

// GET requests

export function fetchPlans() : Promise<any> {
    return axiosGet(`${url}/api/Category/getCategory`);
}

export function fetchHome() : Promise<any> {
    return axiosGet(`${url}/api/Home/getHome?id=4`);
}

export function fetchFlipCards() : Promise<any> {
    return axiosGet(`${url}/api/Quiz/getFlipCardsByCategory?categoryId=34`);
}

export function postQuizAnswers(answers: UserResponse[]): Promise<any> {
    return axiosPost(`${url}/api/Quiz/postUserResponses`, answers);
}

export function updateUserXp(userId: number, xpAmount: number): Promise<any> {
    return axiosPut(`${url}/api/Quest/updateUserXp?userId=${userId}&xpAmount=${xpAmount}`, null);
}

export function updateQuest(questId: number): Promise<any> {
    return axiosPut(`${url}/api/Quest/updateQuestDone/${questId}`, null);
}


