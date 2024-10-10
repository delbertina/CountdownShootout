import { useState } from "react";
import "./App.css";

function App() {
  const [eventLog, setEventLog] = useState<string[]>([]);

  // @ts-expect-error (Firefox experimental event)
  window.addEventListener('gamepadbuttondown', (evt: {gamepad: Gamepad, button: number}) => {
    gamepadButtonDown(evt)
  });

  const gamepadButtonDown = (e: {gamepad: Gamepad, button: number}) => {
    const newEvent = `Gamepad button down at index ${e.gamepad.index}: ${e.gamepad.id}. Button: ${e.button}.`;
    console.log(newEvent);
    setEventLog([newEvent, ...eventLog]);
  }

  return (
    <>
      <h1 className="font-bold">Testing Gamepad Inputs</h1>
      {eventLog.map((log, i) => (
        <div key={i}>
          {log}
        </div>
      ))}
    </>
  );
}

export default App;
