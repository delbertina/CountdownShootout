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
        title: "Holiday Mix",
        description: "Festive songs for the festive season!",
        settings: {
            answerTimeout: 15
        },
        questions: [
            {
                questionText: "Question 1",
                videoYouTubeID: "9DlD7-TykIU",
                videoStartTime: 20,
                videoEndTime: 35,
                answer: "O Holy Night",
                answerSubtext: "A festive classic"
            },
            {
                questionText: "Question 2",
                videoYouTubeID: "9DlD7-TykIU",
                videoStartTime: 225,
                videoEndTime: 240,
                answer: "Silent Night",
                answerSubtext: ""
            },
            {
                questionText: "Question 3",
                videoYouTubeID: "9DlD7-TykIU",
                videoStartTime: 370,
                videoEndTime: 385,
                answer: "Angels We Have Heard on High",
                answerSubtext: ""
            },
            {
                questionText: "Question 4",
                videoYouTubeID: "9DlD7-TykIU",
                videoStartTime: 535,
                videoEndTime: 550,
                answer: "O Come All Ye Faithful",
                answerSubtext: ""
            },
            {
                questionText: "Question 5",
                videoYouTubeID: "2bvNZvGX7C0",
                videoStartTime: 15,
                videoEndTime: 30,
                answer: "We Wish You a Merry Christmas",
                answerSubtext: ""
            },
            {
                questionText: "Question 6",
                videoYouTubeID: "2bvNZvGX7C0",
                videoStartTime: 380,
                videoEndTime: 395,
                answer: "Deck the Halls",
                answerSubtext: ""
            },
            {
                questionText: "Question 7",
                videoYouTubeID: "G1Eq0f5mMVQ",
                videoStartTime: 70,
                videoEndTime: 85,
                answer: "First Noel",
                answerSubtext: ""
            },
            {
                questionText: "Question 8",
                videoYouTubeID: "G1Eq0f5mMVQ",
                videoStartTime: 590,
                videoEndTime: 605,
                answer: "Away in the Manger",
                answerSubtext: ""
            },
            {
                questionText: "Question 9",
                videoYouTubeID: "G1Eq0f5mMVQ",
                videoStartTime: 1150,
                videoEndTime: 1175,
                answer: "Greensleeves",
                answerSubtext: ""
            },
            {
                questionText: "Question 10",
                videoYouTubeID: "G1Eq0f5mMVQ",
                videoStartTime: 1890,
                videoEndTime: 1905,
                answer: "Joy to the World",
                answerSubtext: ""
            },
        ],
    },
]