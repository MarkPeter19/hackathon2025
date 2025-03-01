export interface FlipCard {
    id: number;
    question: string;
    answerOne: string;
    answerTwo: string;
    correctAnswer: string;
}

export interface UserResponse {
    id: number;
    response: string;
}