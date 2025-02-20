import { Game } from "../types/game_types";

export const Games: Game[] = [
  {
    id: 1,
    title: "(Testing) Game 1",
    description: "Description 1",
    settings: {
      answerTimeout: 15,
      infoTimeout: 5,
    },
    questions: [
      {
        questionText: "Question 1",
        questionVideo: {
          youTubeID: "dQw4w9WgXcQ",
          startTime: 15,
          endTime: 30,
        },
        answer: "Answer 1",
        answerSubtext: "Answer 1 Subtext",
      },
      {
        questionText: "Question 2",
        questionVideo: {
          youTubeID: "dQw4w9WgXcQ",
          startTime: 30,
          endTime: 45,
        },
        answer: "Answer 2",
        answerSubtext: "Answer 2 Subtext",
      },
      {
        questionText: "Question 3",
        questionVideo: {
          youTubeID: "dQw4w9WgXcQ",
          startTime: 45,
          endTime: 60,
        },
        answer: "Answer 3",
        answerSubtext: "Answer 3 Subtext",
      },
    ],
  },
  {
    id: 2,
    title: "(Testing) Holiday Mix",
    description: "Festive songs for the festive season!",
    settings: {
      answerTimeout: 15,
    },
    questions: [
      {
        questionText: "Question 1",
        questionVideo: {
          youTubeID: "9DlD7-TykIU",
          startTime: 20,
          endTime: 35,
        },
        answer: "O Holy Night",
        answerSubtext: "A festive classic",
      },
      {
        questionText: "Question 2",
        questionVideo: {
          youTubeID: "9DlD7-TykIU",
          startTime: 225,
          endTime: 240,
        },
        answer: "Silent Night",
        answerSubtext: "",
      },
      {
        questionText: "Question 3",
        questionVideo: {
          youTubeID: "9DlD7-TykIU",
          startTime: 370,
          endTime: 385,
        },
        answer: "Angels We Have Heard on High",
        answerSubtext: "",
      },
      {
        questionText: "Question 4",
        questionVideo: {
          youTubeID: "9DlD7-TykIU",
          startTime: 535,
          endTime: 550,
        },
        answer: "O Come All Ye Faithful",
        answerSubtext: "",
      },
      {
        questionText: "Question 5",
        questionVideo: {
          youTubeID: "2bvNZvGX7C0",
          startTime: 15,
          endTime: 30,
        },
        answer: "We Wish You a Merry Christmas",
        answerSubtext: "",
      },
      {
        questionText: "Question 6",
        questionVideo: {
          youTubeID: "2bvNZvGX7C0",
          startTime: 380,
          endTime: 395,
        },
        answer: "Deck the Halls",
        answerSubtext: "",
      },
      {
        questionText: "Question 7",
        questionVideo: {
          youTubeID: "G1Eq0f5mMVQ",
          startTime: 70,
          endTime: 85,
        },
        answer: "First Noel",
        answerSubtext: "",
      },
      {
        questionText: "Question 8",
        questionVideo: {
          youTubeID: "G1Eq0f5mMVQ",
          startTime: 590,
          endTime: 605,
        },
        answer: "Away in the Manger",
        answerSubtext: "",
      },
      {
        questionText: "Question 9",
        questionVideo: {
          youTubeID: "G1Eq0f5mMVQ",
          startTime: 1150,
          endTime: 1175,
        },
        answer: "Greensleeves",
        answerSubtext: "",
      },
      {
        questionText: "Question 10",
        questionVideo: {
          youTubeID: "G1Eq0f5mMVQ",
          startTime: 1890,
          endTime: 1905,
        },
        answer: "Joy to the World",
        answerSubtext: "",
      },
    ],
  },
  {
    id: 3,
    title: "Christmas",
    description: "Group 1 of festive songs",
    settings: {
      answerTimeout: 15,
    },
    questions: [
      {
        questionText: "Question 1",
        questionVideo: {
          youTubeID: "qZmErriuvnU",
          startTime: 316,
          endTime: 347,
        },
        answer: "Oh Christmas Tree",
        answerSubtext: "",
      },
      {
        questionText: "Question 2",
        questionVideo: {
          youTubeID: "qZmErriuvnU",
          startTime: 348,
          endTime: 374,
        },
        answer: "We Wish You a Merry Christmas",
        answerSubtext: "",
      },
      {
        questionText: "Question 3",
        questionVideo: {
          youTubeID: "qZmErriuvnU",
          startTime: 376,
          endTime: 399,
        },
        answer: "God Rest Ye Merry Gentlemen",
        answerSubtext: "",
      },
      {
        questionText: "Question 4",
        questionVideo: {
          youTubeID: "qZmErriuvnU",
          startTime: 400,
          endTime: 420,
        },
        answer: "Deck the Halls",
        answerSubtext: "",
      },
      {
        questionText: "Question 5",
        questionVideo: {
          youTubeID: "qZmErriuvnU",
          startTime: 422,
          endTime: 442,
        },
        answer: "Joy to the World",
        answerSubtext: "",
      },
      {
        questionText: "Question 6",
        questionVideo: {
          youTubeID: "qZmErriuvnU",
          startTime: 268,
          endTime: 288,
        },
        answer: "Mele KalikiMaka",
        answerSubtext: "",
      },
    ],
  },
  {
    id: 4,
    title: "Christmas: The Sequel",
    description: "Group 2 of festive songs",
    settings: {
      answerTimeout: 15,
    },
    questions: [
      {
        questionText: "Question 1",
        questionVideo: {
          youTubeID: "qZmErriuvnU",
          startTime: 444,
          endTime: 468,
        },
        answer: "Go Telling on the Mountain",
        answerSubtext: "",
      },
      {
        questionText: "Question 2",
        questionVideo: {
          youTubeID: "qZmErriuvnU",
          startTime: 472,
          endTime: 493,
        },
        answer: "O Holy Night",
        answerSubtext: "",
      },
      {
        questionText: "Question 3",
        questionVideo: {
          youTubeID: "qZmErriuvnU",
          startTime: 496,
          endTime: 511,
        },
        answer: "Jingle Bells",
        answerSubtext: "",
      },
      {
        questionText: "Question 4",
        questionVideo: {
          youTubeID: "qZmErriuvnU",
          startTime: 515,
          endTime: 537,
        },
        answer: "Hark! The Herald Angels Sing",
        answerSubtext: "",
      },
      {
        questionText: "Question 5",
        questionVideo: {
          youTubeID: "qZmErriuvnU",
          startTime: 900,
          endTime: 908,
        },
        answer: "It's Beginning to Look a Lot Like Christmas",
        answerSubtext: "",
      },
      {
        questionText: "Question 6",
        questionVideo: {
          youTubeID: "qZmErriuvnU",
          startTime: 288,
          endTime: 316,
        },
        answer: "Carol of the Bells",
        answerSubtext: "",
      },
    ],
  },
  {
    id: 5,
    title: "Games",
    description: "Answer in the form of a game",
    settings: {
      answerTimeout: 15,
    },
    questions: [
      {
        questionText: "Question 1",
        questionVideo: {
          youTubeID: "qZmErriuvnU",
          startTime: 651,
          endTime: 667,
        },
        answer: "Skyrim",
        answerSubtext: "You're finally awake",
      },
      {
        questionText: "Question 2",
        questionVideo: {
          youTubeID: "qZmErriuvnU",
          startTime: 670,
          endTime: 703,
        },
        answer: "Tetris",
        answerSubtext: "",
      },
      {
        questionText: "Question 3",
        questionVideo: {
          youTubeID: "qZmErriuvnU",
          startTime: 704,
          endTime: 749,
        },
        answer: "Papers Please",
        answerSubtext: "Golory to Arstotzka",
      },
      {
        questionText: "Question 4",
        questionVideo: {
          youTubeID: "qZmErriuvnU",
          startTime: 750,
          endTime: 780,
        },
        answer: "Undertale",
        answerSubtext: "",
      },
      {
        questionText: "Question 5",
        questionVideo: {
          youTubeID: "qZmErriuvnU",
          startTime: 781,
          endTime: 797,
        },
        answer: "Dota",
        answerSubtext: "Hunting that Bass",
      },
      {
        questionText: "Question 6",
        questionVideo: {
          youTubeID: "qZmErriuvnU",
          startTime: 798,
          endTime: 817,
        },
        answer: "Crash Bandicoot",
        answerSubtext: "",
      },
      {
        questionText: "Question 7",
        questionVideo: {
          youTubeID: "qZmErriuvnU",
          startTime: 819,
          endTime: 842,
        },
        answer: "Fortnite",
        answerSubtext: "Just wiped out Tomato Town",
      },
    ],
  },
  {
    id: 6,
    title: "Miscellaneous",
    description: "Stuff that didn't fit anywhere else",
    settings: {
      answerTimeout: 15,
    },
    questions: [
      {
        questionText: "Question 1",
        questionVideo: {
          youTubeID: "qZmErriuvnU",
          startTime: 15,
          endTime: 23,
        },
        answer: "Viva La Vida",
        answerSubtext: "Coldplay",
      },
      {
        questionText: "Question 2",
        questionVideo: {
          youTubeID: "qZmErriuvnU",
          startTime: 576,
          endTime: 609,
        },
        answer: "Natural",
        answerSubtext: "Imagine Dragons",
      },
      {
        questionText: "Question 3",
        questionVideo: {
          youTubeID: "qZmErriuvnU",
          startTime: 24,
          endTime: 75,
        },
        answer: "Umbrella",
        answerSubtext: "Rihanna",
      },
      {
        questionText: "Question 4",
        questionVideo: {
          youTubeID: "qZmErriuvnU",
          startTime: 123,
          endTime: 156,
        },
        answer: "Fly Me to the Moon",
        answerSubtext: "Frank Sinatra",
      },
      {
        questionText: "Question 5",
        questionVideo: {
          youTubeID: "qZmErriuvnU",
          startTime: 157,
          endTime: 198,
        },
        answer: "Gravity Falls Theme",
        answerSubtext: "",
      },
      {
        questionText: "Question 6",
        questionVideo: {
          youTubeID: "qZmErriuvnU",
          startTime: 611,
          endTime: 650,
        },
        answer: "Enemy",
        answerSubtext: "Imagine Dragons",
      },
    ],
  },
  {
    id: 7,
    title: "Cursed",
    description: "Songs that are obscure and/or turned out comicly bad",
    settings: {
      answerTimeout: 15,
    },
    questions: [
      {
        questionText: "Question 1",
        questionVideo: {
          youTubeID: "qZmErriuvnU",
          startTime: 0,
          endTime: 13,
        },
        answer: "Hall of the Mountain King",
        answerSubtext: "Some dead guy idk",
      },
      {
        questionText: "Question 2",
        questionVideo: {
          youTubeID: "qZmErriuvnU",
          startTime: 844,
          endTime: 897,
        },
        answer: "Money Money Money",
        answerSubtext: "ABBA",
      },
      {
        questionText: "Question 3",
        questionVideo: {
          youTubeID: "qZmErriuvnU",
          startTime: 78,
          endTime: 120,
        },
        answer: "Fireflies",
        answerSubtext: "Owl City",
      },
      {
        questionText: "Question 4",
        questionVideo: {
          youTubeID: "qZmErriuvnU",
          startTime: 200,
          endTime: 233,
        },
        answer: "Sincerely Me",
        answerSubtext: "Dear Even Hansen",
      },
      {
        questionText: "Question 5",
        questionVideo: {
          youTubeID: "qZmErriuvnU",
          startTime: 541,
          endTime: 574,
        },
        answer: "Merry-Go-Round of Life",
        answerSubtext: "Howl's Moving Castle",
      },
      {
        questionText: "Question 6",
        questionVideo: {
          youTubeID: "qZmErriuvnU",
          startTime: 235,
          endTime: 266,
        },
        answer: "Gotta Get Back to Hogwarts",
        answerSubtext: "A Very Potter Musical",
      },
    ],
  },
];