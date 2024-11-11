import { Game } from "../types/game_types";

export const Games: Game[] = [
    {
        id: 1,
        title: "Game 1",
        description: "Description 1",
        settings: {
            answerTimeout: 15
        },
        questions: [
            {
                questionText: "Question 1",
                videoYouTubeID: "dQw4w9WgXcQ",
                videoStartTime: 15,
                videoEndTime: 30,
                answer: "Answer 1",
                answerSubtext: "Answer 1 Subtext"
            },
            {
                questionText: "Question 2",
                videoYouTubeID: "dQw4w9WgXcQ",
                videoStartTime: 30,
                videoEndTime: 45,
                answer: "Answer 2",
                answerSubtext: "Answer 2 Subtext"
            },
            {
                questionText: "Question 3",
                videoYouTubeID: "dQw4w9WgXcQ",
                videoStartTime: 45,
                videoEndTime: 60,
                answer: "Answer 3",
                answerSubtext: "Answer 3 Subtext"
            },
        ],
    },
    {
        id: 2,
        title: "Game 1",
        description: "Description 1",
        settings: {
            answerTimeout: 15
        },
        questions: [
            {
                questionText: "Question 1",
                videoYouTubeID: "dQw4w9WgXcQ",
                videoStartTime: 15,
                videoEndTime: 30,
                answer: "Answer 1",
                answerSubtext: "Answer 1 Subtext"
            },
            {
                questionText: "Question 2",
                videoYouTubeID: "dQw4w9WgXcQ",
                videoStartTime: 30,
                videoEndTime: 45,
                answer: "Answer 2",
                answerSubtext: "Answer 2 Subtext"
            },
            {
                questionText: "Question 3",
                videoYouTubeID: "dQw4w9WgXcQ",
                videoStartTime: 45,
                videoEndTime: 60,
                answer: "Answer 3",
                answerSubtext: "Answer 3 Subtext"
            },
        ],
    },
]