export enum GameStage {
  Waiting = "WAITING",
  Playing = "PLAYING",
  Answering = "ANSWERING",
  Scoring = "SCORING",
  Ending = "ENDING",
}

// Temp button array
// Actions Needed:
// - Edit Score
// - View Score History
// - Skip Question
// - Skip Section
// - Redo Question
// - Manually Change Question
// - Debug Controllers
// - ???
// - Middle = Resume

export enum DebugButton {
  RESTART_QUIZ = "Restart Quiz",
  ABANDON_QUIZ = "Abandon Quiz",
  SCORE_QUIZ = "Score Quiz",
  BACK_QUESTION = "Question -1",
  FORWARD_QUESTION = "Question +1",
  CLEAR_SCORE = "Clear Last Score",
  REMOVE_SCORE = "Remove Last Score",
  ADD_SCORE = "Add New Score",
  INCREASE_TEAM_SELECTOR = "Team Selector +1",
  DECREASE_TEAM_SELECTOR = "Team Selector -1",
  INCREASE_TEAM_SCORE = "Last Score +1",
  DECREASE_TEAM_SCORE = "Last Score -1",
  CLOSE = "X",
}

export const ButtonData: DebugButton[][] = [
  [DebugButton.ABANDON_QUIZ, DebugButton.RESTART_QUIZ, DebugButton.SCORE_QUIZ],
  [DebugButton.BACK_QUESTION, DebugButton.CLOSE, DebugButton.FORWARD_QUESTION],
  [DebugButton.CLEAR_SCORE, DebugButton.REMOVE_SCORE, DebugButton.ADD_SCORE],
  [
    DebugButton.DECREASE_TEAM_SCORE,
    DebugButton.INCREASE_TEAM_SELECTOR,
    DebugButton.INCREASE_TEAM_SCORE,
  ],
];

export interface Game {
  id: number;
  title: string;
  description: string;
  rating: number;
  settings: GameSettings;
  questions: GameQuestion[];
}

export const DEFAULT_INFO_TIMEOUT = 5;
export const DEFAULT_ANSWER_TIMEOUT = 5;

export interface GameSettings {
  infoTimeout?: number;
  answerTimeout?: number;
  pointsPerQuestion?: number;
}

export interface Video {
  youTubeID: string;
  startTime: number;
  endTime: number;
}

export interface GameQuestion {
  questionText: string;
  questionVideo: Video;
  answer: string;
  answerSubtext?: string;
  answerEncore?: Video;
}
// New feature added in some very recent version, super cool
type HEX = `#${string}`;
export interface GameTeamTheme {
  backgroundColor: HEX;
  accentColor: HEX;
  textColor: HEX;
}

export const NewGameQuestion: GameQuestion = {
  questionText: "New Question",
  questionVideo: { youTubeID: "", startTime: 0, endTime: 15 },
  answer: "New Answer",
  answerSubtext: "",
};

export const NewGameQuestionOncore: Video = {
  youTubeID: "",
  startTime: 0,
  endTime: 15,
};

export const NewGame: Game = {
  id: 0,
  title: "New Game",
  description: "New Game Description",
  rating: 1,
  settings: {},
  questions: [NewGameQuestion],
};

export const isGameValid = (game: Game): boolean => {
  if (!game.title || game.title.trim() === "") return false;
  if (game.rating < 1 || game.rating > 5) return false;
  if (!game.questions || game.questions.length === 0) return false;
  for (const question of game.questions) {
    if (!question.questionText || question.questionText.trim() === "")
      return false;
    if (
      !question.questionVideo ||
      !question.questionVideo.youTubeID ||
      question.questionVideo.youTubeID.trim() === ""
    )
      return false;
    if (!question.answer || question.answer.trim() === "") return false;
  }
  return true;
}