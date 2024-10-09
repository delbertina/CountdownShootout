import { useState } from "react";
import "./App.css";

function App() {
  const [eventLog, setEventLog] = useState<string[]>([]);
  // const [gamepads, setGamepads] = useState<Gamepad[]>([]);
  // const rAF = window.requestAnimationFrame;

  // window.addEventListener("gamepadconnected", (evt) => {
  //   setGamepads([...gamepads, evt.gamepad]);
  //   rAF(updateStatus);
  // });
  // window.addEventListener("gamepaddisconnected", (evt) => {
  //   setGamepads([...gamepads.filter((pad) => pad !== evt.gamepad)]);
  // });
  // @ts-expect-error (Firefox experimental event)
  window.addEventListener('gamepadbuttondown', (evt: {gamepad: Gamepad, button: number}) => {
    gamepadButtonDown(evt)
  });

  const gamepadButtonDown = (e: {gamepad: Gamepad, button: number}) => {
    const newEvent = `Gamepad button down at index ${e.gamepad.index}: ${e.gamepad.id}. Button: ${e.button}.`;
    console.log(newEvent);
    setEventLog([newEvent, ...eventLog]);
  }

  // function updateStatus() {
  //   scangamepads();
  //   gamepads.forEach((pad) => {
  //     pad.buttons.forEach((butt, i) => {

  //     })
  //   })
  //   rAF(updateStatus);
  // }

  // function scangamepads() {
  //   const pads = navigator.getGamepads ? navigator.getGamepads() : [];
  //   for (let i = 0; i < gamepads.length; i++) {
  //     // @ts-expect-error bad
  //     if (pads[i] != null && pads[i].index in gamepads) {
  //       // @ts-expect-error bad
  //       gamepads[pads[i].index] = pads[i];
  //     }
  //   }
  // }

  // setInterval(scangamepads, 500);

  return (
    <>
      <h1 className="font-bold">Testing Gamepad Inputs</h1>
      {eventLog.map((log, i) => (
        <div key={i}>
          {log}
        </div>
      ))}
      {/*
      {gamepads.map((pad) => (
        <div key={pad.index}>
          {pad.index}
          {pad.buttons.map((butt, i) => (
            <div key={i}>
              {i}
              {butt.pressed ? "True" : "False"}
              {butt.touched ? "True" : "False"}
            </div>
          ))}
        </div>
      ))}
      */}
    </>
  );
}

export default App;
