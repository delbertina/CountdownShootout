import { GameStage } from "./game_types";
import { TeamTheme } from "./theme_types";

// Partial game state for reset question
interface GameStatePartialQuestion {
  stage: GameStage;
  lastVideoTime: number;
  isSuddenDeath: boolean;
}

// Partial game state for reset game
interface GameStatePartial extends GameStatePartialQuestion {
  questionId: number;
  isPaused: boolean;
}

const newGameQuestionState: GameStatePartialQuestion = {
  stage: GameStage.Waiting,
  lastVideoTime: 0,
  isSuddenDeath: false,
};

const newGameState: GameStatePartial = {
  questionId: 0,
  isPaused: true,
  ...newGameQuestionState,
};

interface TeamStatePartial {
  id: number;
  name: string;
  theme: TeamTheme;
  // default to false to use theme color as name
  isUsingCustomName: boolean;
}

interface TeamState extends TeamStatePartial {
  scoreHistory: number[];
  lastPress: number;
  canAnswer: boolean;
  isAnswering: boolean;
}

const initialTeamState: TeamState[] = [
  {
    id: 1,
    name: "",
    theme: TeamTheme.RED,
    isUsingCustomName: false,
    scoreHistory: [],
    lastPress: 0,
    canAnswer: false,
    isAnswering: false,
  },
  {
    id: 2,
    name: "",
    theme: TeamTheme.BLUE,
    isUsingCustomName: false,
    scoreHistory: [],
    lastPress: 0,
    canAnswer: false,
    isAnswering: false,
  },
];

const getTeamDisplayName = (team: TeamStatePartial) =>
  team.isUsingCustomName
    ? team.name
      ? team.name
      : "Team " + (team.id + 1)
    : team.theme + " Team";

export {
  newGameState,
  newGameQuestionState,
  initialTeamState,
  getTeamDisplayName,
};

export type { TeamState, GameStatePartial, GameStatePartialQuestion };
