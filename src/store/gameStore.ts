import { create } from "zustand";
import { ButtonData, DebugButton, Game, GameStage, NewGame } from "../types/game_types";
import { Games } from "../data/game_data";
import { devtools } from "zustand/middleware";
import { TeamTheme } from "../types/theme_types";
import {
  GameStatePartial,
  initialTeamState,
  newGameQuestionState,
  newGameState,
  TeamState,
} from "../types/state_types";

interface GameState extends GameStatePartial {
  currentGame: Game | undefined;
  teams: TeamState[];
  debugButtonCol: number;
  debugButtonRow: number;
  debugTeamSelector: number;
  currentEditGame: Game;
  isDebugOpen: boolean;
  isManageGamesOpen: boolean;
  isEditGameOpen: boolean;
  isGamepadDetected: boolean;
  symbolRight: (gamepadIndex: number) => void;
  symbolLeft: (gamepadIndex: number) => void;
  symbolUp: (gamepadIndex: number) => void;
  symbolDown: (gamepadIndex: number) => void;
  arrowRight: (gamepadIndex: number) => void;
  arrowLeft: (gamepadIndex: number) => void;
  arrowUp: (gamepadIndex: number) => void;
  arrowDown: (gamepadIndex: number) => void;
  gamepadButtonPress: (e: { gamepad: Gamepad; button: number }) => void;
  answerQuestion: (gamepadIndex: number) => void;
  correctAnswer: () => void;
  incorrectAnswer: () => void;
  startSuddenDeath: () => void;
  updateLastVideoTime: (videoTime: number) => void;
  advanceStage: () => void;
  selectQuiz: (id: number) => void;
  toggleDebugDialog: () => void;
  debugAbandonQuiz: () => void;
  debugRestartQuiz: () => void;
  debugScoreQuiz: () => void;
  debugBackQuestion: () => void;
  debugForwardQuestion: () => void;
  debugClearScore: () => void;
  debugRemoveScore: () => void;
  debugAddScore: () => void;
  debugIncreaseTeamSelector: () => void;
  debugDecreaseTeamSelector: () => void;
  debugIncreaseTeamScore: () => void;
  debugDecreaseTeamScore: () => void;
  selectDebugButton: () => void;
  selectTeamColor: (teamId: number, team: TeamTheme) => void;
  toggleTeamCustomName: (teamId: number, customName?: string) => void;
  setTeamCustomName: (teamId: number, customName: string) => void;
  addTeam: () => void;
  removeTeam: (teamId: number) => void;
  infoTimeoutEnded: () => void;
  answerTimeoutEnded: () => void;
}

export const useGameStore = create<GameState>()(
  devtools((set, get) => ({
    currentGame: undefined,
    teams: initialTeamState,
    ...newGameState,
    debugButtonCol: 0,
    debugButtonRow: 0,
    debugTeamSelector: 0,
    currentEditGame: NewGame,
    isDebugOpen: false,
    isManageGamesOpen: false,
    isEditGameOpen: false,
    isGamepadDetected: false,
    symbolRight: (gamepadIndex: number) => {
      if (gamepadIndex !== 0) {
        set((state) => ({
          teams: state.teams.map((team) =>
            team.id === gamepadIndex ? { ...team, lastPress: Date.now() } : team
          ),
        }));
        get().answerQuestion(gamepadIndex);
        return;
      }
      // cancel / no / wrong
      const stage = useGameStore.getState().stage;
      if (stage === GameStage.Answering || stage === GameStage.Scoring) {
        get().incorrectAnswer();
      }
    },
    symbolLeft: (gamepadIndex: number) => {
      if (gamepadIndex !== 0) {
        set((state) => ({
          teams: state.teams.map((team) =>
            team.id === gamepadIndex ? { ...team, lastPress: Date.now() } : team
          ),
        }));
        get().answerQuestion(gamepadIndex);
        return;
      }
      // also pause?
    },
    symbolUp: (gamepadIndex: number) => {
      if (gamepadIndex !== 0) {
        set((state) => ({
          teams: state.teams.map((team) =>
            team.id === gamepadIndex ? { ...team, lastPress: Date.now() } : team
          ),
        }));
        get().answerQuestion(gamepadIndex);
        return;
      } else {
        get().toggleDebugDialog();
      }
      // pause?
    },
    symbolDown: (gamepadIndex: number) => {
      const stage = useGameStore.getState().stage;
      if (gamepadIndex !== 0) {
        set((state) => ({
          teams: state.teams.map((team) =>
            team.id === gamepadIndex ? { ...team, lastPress: Date.now() } : team
          ),
        }));
        get().answerQuestion(gamepadIndex);
      } else {
        if (get().isDebugOpen) {
          // select the button we're on
          get().selectDebugButton();
        } else if (stage === GameStage.Answering) {
          get().correctAnswer();
          return;
        } else {
          get().advanceStage();
          return;
        }
      }
    },
    arrowRight: (gamepadIndex: number) => {
      if (gamepadIndex !== 0) return;
      set((state) => ({
        debugButtonCol:
          state.debugButtonCol === ButtonData[0].length - 1
            ? ButtonData[0].length - 1
            : state.debugButtonCol + 1,
      }));
    },
    arrowLeft: (gamepadIndex: number) => {
      if (gamepadIndex !== 0) return;
      set((state) => ({
        debugButtonCol:
          state.debugButtonCol === 0 ? 0 : state.debugButtonCol - 1,
      }));
    },
    arrowUp: (gamepadIndex: number) => {
      if (gamepadIndex !== 0) return;
      set((state) => ({
        debugButtonRow:
          state.debugButtonRow === 0 ? 0 : state.debugButtonRow - 1,
      }));
    },
    arrowDown: (gamepadIndex: number) => {
      if (gamepadIndex !== 0) return;
      set((state) => ({
        debugButtonRow:
          state.debugButtonRow === ButtonData.length - 1
            ? ButtonData.length - 1
            : state.debugButtonRow + 1,
      }));
    },
    gamepadButtonPress: (e: { gamepad: Gamepad; button: number }) => {
      const newEvent = `Gamepad button down at index ${e.gamepad.index}: ${e.gamepad.id}. Button: ${e.button}.`;
      console.log(newEvent);
      set({ isGamepadDetected: true });
      switch (e.button) {
        case 15:
          get().arrowRight(e.gamepad.index);
          break;
        case 14:
          get().arrowLeft(e.gamepad.index);
          break;
        case 13:
          get().arrowDown(e.gamepad.index);
          break;
        case 12:
          get().arrowUp(e.gamepad.index);
          break;
        case 3:
          get().symbolUp(e.gamepad.index);
          break;
        case 2:
          get().symbolLeft(e.gamepad.index);
          break;
        case 1:
          get().symbolRight(e.gamepad.index);
          break;
        case 0:
          get().symbolDown(e.gamepad.index);
          break;
        default:
          break;
      }
    },
    answerQuestion: (gamepadIndex: number) => {
      // A team can only answer when it's the playing stage
      // or if it's the answering stage and neither team triggered it
      // aka time expired and automatically advanced the stage
      const stage = useGameStore.getState().stage;
      if (
        !(
          stage === GameStage.Playing ||
          (stage === GameStage.Answering &&
            !get().teams.some((team) => team.isAnswering))
        )
      )
        return;
      // The game master cannot answer
      if (gamepadIndex === 0) return;
      const foundTeam = get().teams.find((team) => team.id === gamepadIndex);
      if (!foundTeam) return;
      // If a team pressed the button
      if (foundTeam.canAnswer) {
        // if they can answer, set that they're answering
        // if all other team has answered, reset to allow either to answer later
        // else just prevent the same team from answering until the other teams answer
        //
        const answerableTeams = get().teams.filter((team) => team.canAnswer);
        // if the length of the answerable teams is 1, then that means only this
        // team can answer and is answering so reset to allow any team to answer
        if (answerableTeams.length === 1) {
            set((state) => ({
              stage: GameStage.Answering,
              lastAnswerTime: Date.now(),
              isPaused: true,
              teams: state.teams.map((team) =>
                // if the team is the one that just pressed, set them to be answering
                // set all to be able to answer
                team.id === gamepadIndex
                  ? { ...team, isAnswering: true, canAnswer: true }
                  : { ...team, canAnswer: true }
              ),
            }));
        }
        // else there are still other teams that can answer
        else {
          set((state) => ({
            stage: GameStage.Answering,
            lastAnswerTime: Date.now(),
            isPaused: true,
            teams: state.teams.map((team) =>
              team.id === gamepadIndex
                ? // if the team is the one that just pressed, set them to be answering
                  // set this team to not be able to answer again and don't mess with the others
                  { ...team, isAnswering: true, canAnswer: false }
                : team
            ),
          }));
        }
      }
    },
    correctAnswer: () => {
      const stage = get().stage;
      if (stage !== GameStage.Answering) return;
      set((state) => ({
        stage: GameStage.Scoring,
        teams: state.teams.map((team) => ({
          ...team,
          scoreHistory: [...team.scoreHistory, team.isAnswering ? 1 : 0],
        })),
      }));
    },
    incorrectAnswer: () => {
      const stage = get().stage;
      if (stage !== GameStage.Answering) return;
      const canAnswerTeams = get().teams.filter((team) => team.canAnswer);
      set((state) =>
        // if it's sudden death
        state.isSuddenDeath
          ? // if all teams have answered
            canAnswerTeams.length === 0
            ? // advance to the next stage & add 0 entry for each team score
              {
                stage: GameStage.Scoring,
                teams: state.teams.map((team) => ({
                  ...team,
                  isAnswering: false,
                  scoreHistory: [...team.scoreHistory, 0],
                })),
              }
            : // else, stay and let the other teams answer
            canAnswerTeams.length === 1
            ? // if only one team can answer, they are now answering
              {
                stage: GameStage.Answering,
                lastAnswerTime: Date.now(),
                teams: state.teams.map((team) => ({
                  ...team,
                  isAnswering: team.canAnswer,
                  canAnswer: false,
                })),
              }
            : // else there are still multiple teams that can answer
              {
                stage: GameStage.Answering,
                lastAnswerTime: Date.now(),
                teams: state.teams.map((team) => ({
                  ...team,
                  isAnswering: false,
                })),
              }
          : // else just an incorrect answer during video playback
            {
              stage: GameStage.Playing,
              isPaused: false,
              teams: state.teams.map((team) => ({
                ...team,
                isAnswering: false,
              })),
            }
      );
    },
    startSuddenDeath: () => {
      const stage = get().stage;
      if (stage !== GameStage.Playing) return;
      set({
        stage: GameStage.Answering,
        lastAnswerTime: Date.now(),
        isPaused: true,
        isSuddenDeath: true,
        teams: get().teams.map((team) => ({
          ...team,
          isAnswering: false,
          canAnswer: true,
        })),
      });
    },
    updateLastVideoTime: (time: number) => {
      set({ lastVideoTime: time });
    },
    advanceStage: () => {
      if (!get().currentGame) return;
      // Waiting -> Playing -> Answering -> Scoring -> (if last question) Ending -> (Loop to Waiting)
      switch (get().stage) {
        case GameStage.Waiting:
          set({
            stage: GameStage.Playing,
            teams: get().teams.map((team) => ({
              ...team,
              canAnswer: true,
            })),
            isPaused: false,
          });
          break;
        case GameStage.Playing:
          set({ stage: GameStage.Answering, isPaused: true, lastAnswerTime: Date.now() });
          break;
        case GameStage.Answering:
          set({
            stage: GameStage.Scoring,
            isSuddenDeath: false,
            isPaused: true,
          });
          break;
        case GameStage.Scoring:
          set((state) =>
            state.currentGame &&
            state.currentGame.questions.length > state.questionId + 1
              ? // if we're playing a game, & there's more questions
                {
                  ...newGameQuestionState,
                  lastInfoTime: Date.now(),
                  questionId: state.questionId + 1,
                  teams: get().teams.map((team) => ({
                    ...team,
                    canAnswer: true,
                    isAnswering: false,
                  })),
                }
              : // if there are no more questions, end the game
                {
                  stage: GameStage.Ending,
                  lastVideoTime: 0,
                  isSuddenDeath: false,
                }
          );
          break;
        case GameStage.Ending:
          set(() => ({
            ...newGameState,
            currentGame: undefined,
          }));
          break;
        default:
          break;
      }
    },
    selectQuiz(id: number) {
      const foundGame = Games.find((game) => game.id === id);
      if (!foundGame) return;
      set({ currentGame: foundGame, questionId: 0, lastInfoTime: Date.now() });
    },
    toggleDebugDialog: () =>
      set((state) => ({
        isDebugOpen: !state.isDebugOpen,
        isPaused:
          state.stage === GameStage.Playing
            ? !state.isDebugOpen
            : state.isPaused,
      })),
    debugAbandonQuiz: () => {
      console.log(
        "Abandoning quiz & clearing team state. Previous: ",
        get().teams
      );
      set((state) => ({
        ...newGameState,
        currentGame: undefined,
        teams: state.teams.map((team) => ({
          ...team,
          scoreHistory: [],
        })),
      }));
    },
    debugRestartQuiz: () => {
      if (!get().currentGame) return;
      console.log(
        "Restarting quiz & clearing team state. Previous: ",
        get().teams
      );
      set((state) => ({
        ...newGameState,
        teams: state.teams.map((team) => ({
          ...team,
          scoreHistory: [],
        })),
      }));
    },
    debugScoreQuiz: () => {
      if (!get().currentGame) return;
      set(() => ({
        stage: GameStage.Ending,
      }));
    },
    debugBackQuestion: () => {
      if (get().questionId === 0) return;
      set((state) => ({
        stage: GameStage.Waiting,
        questionId: state.questionId - 1,
        teams: state.teams.map((team) => ({
          ...team,
          scoreHistory: team.scoreHistory.slice(0, -1),
        })),
      }));
    },
    debugForwardQuestion: () => {
      if (
        !get().currentGame ||
        get().questionId >= (get().currentGame?.questions.length ?? 0) - 1
      )
        return;
      set((state) => ({
        stage: GameStage.Waiting,
        questionId: state.questionId + 1,
        teams: state.teams.map((team) => ({
          ...team,
          scoreHistory: [...team.scoreHistory, 0],
        })),
      }));
    },
    debugClearScore: () => {
      set((state) => ({
        teams: state.teams.map((team) => ({
          ...team,
          scoreHistory: [...team.scoreHistory.slice(0, -1), 0],
        })),
      }));
    },
    debugRemoveScore: () => {
      set((state) => ({
        teams: state.teams.map((team) => ({
          ...team,
          scoreHistory: team.scoreHistory.slice(0, -1),
        })),
      }));
    },
    debugAddScore: () => {
      set((state) => ({
        teams: state.teams.map((team) => ({
          ...team,
          scoreHistory: [...team.scoreHistory, 0],
        })),
      }));
    },
    debugIncreaseTeamSelector() {
      set((state) => ({
        debugTeamSelector: (state.debugTeamSelector + 1) % state.teams.length,
      }));
    },
    debugDecreaseTeamSelector() {
      set((state) => ({
        debugTeamSelector:
          (state.debugTeamSelector - 1 + state.teams.length) %
          state.teams.length,
      }));
    },
    debugIncreaseTeamScore: () => {
      const selectedTeam = get().debugTeamSelector;
      set((state) => ({
        teams: [
          ...state.teams.map((team, i) => ({
            ...team,
            scoreHistory:
              i === selectedTeam
                ? [
                    ...team.scoreHistory.slice(0, -1),
                    (team.scoreHistory.at(-1) ?? 0) + 1,
                  ]
                : team.scoreHistory,
          })),
        ],
      }));
    },
    debugDecreaseTeamScore: () => {
      const selectedTeam = get().debugTeamSelector;
      set((state) => ({
        teams: state.teams.map((team, i) => ({
          ...team,
          scoreHistory:
            i === selectedTeam
              ? [
                  ...team.scoreHistory.slice(0, -1),
                  (team.scoreHistory.at(-1) ?? 0) - 1,
                ]
              : team.scoreHistory,
        })),
      }));
    },
    selectDebugButton: () => {
      const selectedButton =
        ButtonData[get().debugButtonRow][get().debugButtonCol];
      switch (selectedButton) {
        case DebugButton.ABANDON_QUIZ:
          get().debugAbandonQuiz();
          break;
        case DebugButton.RESTART_QUIZ:
          get().debugRestartQuiz();
          break;
        case DebugButton.SCORE_QUIZ:
          get().debugScoreQuiz();
          break;
        case DebugButton.BACK_QUESTION:
          get().debugBackQuestion();
          break;
        case DebugButton.FORWARD_QUESTION:
          get().debugForwardQuestion();
          break;
        case DebugButton.CLEAR_SCORE:
          get().debugClearScore();
          break;
        case DebugButton.REMOVE_SCORE:
          get().debugRemoveScore();
          break;
        case DebugButton.ADD_SCORE:
          get().debugAddScore();
          break;
        case DebugButton.INCREASE_TEAM_SELECTOR:
          get().debugIncreaseTeamSelector();
          break;
        case DebugButton.DECREASE_TEAM_SELECTOR:
          get().debugDecreaseTeamSelector();
          break;
        case DebugButton.INCREASE_TEAM_SCORE:
          get().debugIncreaseTeamScore();
          break;
        case DebugButton.DECREASE_TEAM_SCORE:
          get().debugDecreaseTeamScore();
          break;
          break;
        case DebugButton.CLOSE:
          get().toggleDebugDialog();
          break;
        default:
          break;
      }
    },
    selectTeamColor: (teamId, theme) => {
      const otherSelectedThemes = get()
        .teams.filter((team) => team.id !== teamId)
        .map((team) => team.theme);
      const foundTeam = get().teams.find((team) => team.id === teamId);
      // if the team doesn't exist or the theme is already selected, do nothing
      if (!foundTeam) return;
      if (otherSelectedThemes.includes(theme)) return;

      set((state) => ({
        teams: state.teams.map((team) => ({
          ...team,
          theme: team.id === teamId ? theme : team.theme,
          lastPress: team.id === teamId ? Date.now() : team.lastPress,
        })),
      }));
    },
    toggleTeamCustomName: (teamId, customName) => {
      set((state) => ({
        teams: state.teams.map((team) => ({
          ...team,
          name:
            team.id === teamId && !team.isUsingCustomName && customName
              ? customName
              : team.name,
          isUsingCustomName:
            team.id === teamId
              ? !team.isUsingCustomName
              : team.isUsingCustomName,
        })),
      }));
    },
    setTeamCustomName: (teamId, customName) => {
      if (!customName) return;
      console.log("set team name", teamId, customName);
      set((state) => ({
        teams: state.teams.map((team) => ({
          ...team,
          name: team.id === teamId ? customName : team.name,
        })),
      }));
    },
    addTeam: () => {
      const selectedThemes = get().teams.map((team) => team.theme);
      const teamLen = selectedThemes.length;
      // Limit it to 8 teams to avoid having to test more & having to add more colors
      if (teamLen >= 8) return;

      set((state) => ({
        teams: [
          ...state.teams,
          {
            id: Math.max(...state.teams.map((team) => team.id)) + 1,
            name: "",
            theme:
              Object.values(TeamTheme).find(
                (theme) => !selectedThemes.includes(theme)
              ) ?? TeamTheme.RED,
            isUsingCustomName: false,
            scoreHistory: [],
            lastPress: 0,
            canAnswer: false,
            isAnswering: false,
          },
        ],
      }));
    },
    removeTeam: (teamId) => {
      // if there's 2 (or less somehow) teams, we can't remove any
      if (get().teams.length <= 2) return;
      set((state) => ({
        teams: state.teams.filter((team) => team.id !== teamId),
      }));
    },
    infoTimeoutEnded: () => {
      if (get().stage === GameStage.Waiting || get().stage === GameStage.Scoring) {
        get().advanceStage();
      }
    },
    answerTimeoutEnded: () => {
      if (get().stage === GameStage.Answering) {
        // do nothing and just display visually that the timer expired
      }
    },
  }))
);
