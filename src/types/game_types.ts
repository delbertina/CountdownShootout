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
  INCREASE_RED_SCORE = "Last Red Score +1",
  DECREASE_RED_SCORE = "Last Red Score -1",
  INCREASE_BLUE_SCORE = "Last Blue Score +1",
  DECREASE_BLUE_SCORE = "Last Blue Score - 1",
  CLOSE = "X",
}

export const ButtonData: DebugButton[][] = [
  [DebugButton.ABANDON_QUIZ, DebugButton.RESTART_QUIZ, DebugButton.SCORE_QUIZ],
  [DebugButton.BACK_QUESTION, DebugButton.CLOSE, DebugButton.FORWARD_QUESTION],
  [DebugButton.CLEAR_SCORE, DebugButton.REMOVE_SCORE, DebugButton.ADD_SCORE],
  [
    DebugButton.INCREASE_RED_SCORE,
    DebugButton.CLOSE,
    DebugButton.DECREASE_RED_SCORE,
  ],
  [
    DebugButton.INCREASE_BLUE_SCORE,
    DebugButton.CLOSE,
    DebugButton.DECREASE_BLUE_SCORE,
  ],
];

export interface Game {
  id: number;
  title: string;
  description: string;
  settings: GameSettings;
  questions: GameQuestion[];
}

export interface GameSettings {
  answerTimeout: number;
  pointsPerQuestion?: number;
  team1Name?: string;
  team2Name?: string;
  team1Theme?: GameTeamTheme;
  team2Theme?: GameTeamTheme;
}

export interface GameQuestion {
  questionText: string;
  videoYouTubeID: string;
  videoStartTime: number;
  videoEndTime: number;
  answer: string;
  answerSubtext?: string;
}
// New feature added in some very recent version, super cool
type HEX = `#${string}`;
export interface GameTeamTheme {
  backgroundColor: HEX;
  accentColor: HEX;
  textColor: HEX;
}
