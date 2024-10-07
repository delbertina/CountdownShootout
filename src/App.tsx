import { useState } from "react";
import "./App.css";

function App() {
  const [gamepads, setGamepads] = useState<number[]>([]);

  window.addEventListener("gamepadconnected", (evt) => {
    setGamepads([...gamepads, evt.gamepad.index]);
  });
  window.addEventListener("gamepaddisconnected", (evt) => {
    setGamepads([...gamepads.filter(pad => pad !== evt.gamepad.index)])
  });

  return (
    <>
      <h1 className="font-bold">Testing Gamepad Inputs</h1>
      {gamepads.map(pad => (
        <div key={pad}>{pad}</div>
      ))}
    </>
  );
}

export default App;
