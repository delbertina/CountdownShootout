export enum GameStage {
  Testing = "TESTING",
  Waiting = "WAITING",
  Playing = "PLAYING",
  Answering = "ANSWERING",
  Scoring = "SCORING",
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

export const ButtonData = [
  ["Zero", "One", "Two"],
  ["Three", "Four", "Five"],
  ["Six", "Seven", "Eight"],
];

export interface Game {
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
  id: number;
  questionText: string;
  questionSrc: string;
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
