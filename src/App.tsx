import { useCallback, useEffect } from "react";
import "./App.css";
import { ButtonData, useGameStore } from "./store/gameStore";

const App = () => {
  const selectedButtonCol = useGameStore((state) => state.tempButtonCol);
  const selectedButtonRow = useGameStore((state) => state.tempButtonRow);
  const gamepadButtonDown = useGameStore((state) => state.gamepadButtonDown);

  useEffect(() => {
    // @ts-expect-error (Firefox experimental event)
    window.addEventListener(
      "gamepadbuttondown",
      (evt: { gamepad: Gamepad; button: number }) => {
        console.log(selectedButtonCol, selectedButtonRow);
        callPadMove(evt);
      }
    );
    console.log("Listening for gamepad button presses...");
    return () => {
      // @ts-expect-error (Firefox experimental event)
      window.removeEventListener("gamepadbuttondown", callPadMove);
      console.log("Stopped listening for gamepad button presses...");
    };
  }, []);

  const callPadMove = useCallback((e: { gamepad: Gamepad; button: number }) => {
    gamepadButtonDown(e);
  }, [])

  // const gamepadButtonDown = (e: { gamepad: Gamepad; button: number }) => {
  //   const newEvent = `Gamepad button down at index ${e.gamepad.index}: ${e.gamepad.id}. Button: ${e.button}.`;
  //   console.log(newEvent);
  //   console.log(selectedButtonCol, selectedButtonRow);
  //   switch (e.button) {
  //     case 14:
  //       moveLeft();
  //       break;
  //     case 15:
  //       moveRight();
  //       break;
  //     case 12:
  //       moveUp();
  //       break;
  //     case 13:
  //       moveDown();
  //       break;
  //     case 0:
  //       resetSelection();
  //       break;
  //     default:
  //       break;
  //   }
  // };

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
