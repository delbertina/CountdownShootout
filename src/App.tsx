import { useEffect, useRef } from "react";
import "./App.css";
import { ButtonData, useGameStore } from "./store/gameStore";
import ReactPlayer from "react-player";

const App = () => {
  const gameStage = useGameStore((state) => state.stage);
  const selectedButtonCol = useGameStore((state) => state.tempButtonCol);
  const selectedButtonRow = useGameStore((state) => state.tempButtonRow);
  const gamepadButtonPress = useGameStore((state) => state.gamepadButtonPress);
  const isPaused = useGameStore((state) => state.isPaused);
  const advanceStage = useGameStore((state) => state.advanceStage);

  // Only run the effect once - React 18 dev mode bug that they don't think is a bug
  const effectRan = useRef(false);
  useEffect(() => {
    if (!effectRan.current) {
      // @ts-expect-error (Firefox experimental event)
      window.addEventListener(
        "gamepadbuttondown",
        (evt: { gamepad: Gamepad; button: number }) => {
          console.log(selectedButtonCol, selectedButtonRow);
          callPadMove(evt);
        }
      );
      console.log("Listening for gamepad button presses...");
    }
    return () => {
      effectRan.current = true;
    };
    //
    // empty array to only run on first render
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const callPadMove = (e: { gamepad: Gamepad; button: number }) => {
    gamepadButtonPress(e);
  };

  return (
    <>
      <h1 className="font-bold">Testing Gamepad Inputs</h1>
      <div>Stage: "{gameStage}"</div>
      {ButtonData.map((buttonRow, i) => (
        <div key={i}>
          {buttonRow.map((button, j) => (
            <button
              key={j}
              className={
                selectedButtonCol === j && selectedButtonRow === i
                  ? "bg-red-500"
                  : "bg-blue-500"
              }
            >
              {button}
            </button>
          ))}
        </div>
      ))}
      <div>
        <ReactPlayer
          playing={!isPaused}
          controls={false}
          onEnded={() => advanceStage()}
          height={480}
          width={640}
          url={
            "https://www.youtube.com/embed/dQw4w9WgXcQ?si=SgyTMAVJ2tUM2BMm&amp;start=15&end=30&rel=0"
          }
        ></ReactPlayer>
      </div>
    </>
  );
};

export default App;
