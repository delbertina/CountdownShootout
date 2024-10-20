import { Game } from "../types/game_types";

export const Games: Game[] = [
    {
        title: "Game 1",
        description: "Description 1",
        settings: {
            answerTimeout: 15
        },
        questions: [
            {
                id: 1,
                questionText: "Question 1",
                questionSrc: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                answer: "Answer 1",
                answerSubtext: "Answer 1 Subtext"
            },
            {
                id: 2,
                questionText: "Question 2",
                questionSrc: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                answer: "Answer 2",
                answerSubtext: "Answer 2 Subtext"
            },
            {
                id: 3,
                questionText: "Question 3",
                questionSrc: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                answer: "Answer 3",
                answerSubtext: "Answer 3 Subtext"
            },
        ],
    },
]