import { useEffect, useRef } from "react";
import "./App.css";
import { ButtonData, useGameStore } from "./store/gameStore";

const App = () => {
  const selectedButtonCol = useGameStore((state) => state.tempButtonCol);
  const selectedButtonRow = useGameStore((state) => state.tempButtonRow);
  const gamepadButtonPress = useGameStore((state) => state.gamepadButtonPress);
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
    return () => {effectRan.current = true;}
  }, []);

  const callPadMove = (e: { gamepad: Gamepad; button: number }) => {
    gamepadButtonPress(e);
  }

  return (
    <>
      <h1 className="font-bold">Testing Gamepad Inputs</h1>
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
    </>
  );
};

export default App;
