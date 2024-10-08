import { useState } from "react";
import "./App.css";

function App() {
  const [gamepads, setGamepads] = useState<Gamepad[]>([]);
  const rAF = window.requestAnimationFrame;

  window.addEventListener("gamepadconnected", (evt) => {
    setGamepads([...gamepads, evt.gamepad]);
    rAF(updateStatus);
  });
  window.addEventListener("gamepaddisconnected", (evt) => {
    setGamepads([...gamepads.filter((pad) => pad !== evt.gamepad)]);
  });
  window.addEventListener('gamepadbuttondown', (evt: Gamepad) => {
    gamepadButtonDown(evt)
  });

  const gamepadButtonDown = (e) => {
    console.log('Gamepad button down at index %d: %s. Button: %d.',
      e.gamepad.index, e.gamepad.id, e.button);
  };

  function updateStatus() {
    scangamepads();
    gamepads.forEach((pad) => {
      pad.buttons.forEach((butt, i) => {

      })
    })
    // gamepads.forEach((pad) => {
    //   var d = document.getElementById("controller" + j);
    //   var buttons = d.getElementsByClassName("button");
    //   for (var i=0; i<controller.buttons.length; i++) {
    //     var b = buttons[i];
    //     var val = controller.buttons[i];
    //     var pressed = val == 1.0;
    //     var touched = false;
    //     if (typeof(val) == "object") {
    //       pressed = val.pressed;
    //       if ('touched' in val) {
    //         touched = val.touched;
    //       }
    //       val = val.value;
    //     }
    //     var pct = Math.round(val * 100) + "%";
    //     b.style.backgroundSize = pct + " " + pct;
    //     b.className = "button";
    //     if (pressed) {
    //       b.className += " pressed";
    //     }
    //     if (touched) {
    //       b.className += " touched";
    //     }
    //   }

    //   var axes = d.getElementsByClassName("axis");
    //   for (var i=0; i<controller.axes.length; i++) {
    //     var a = axes[i];
    //     a.innerHTML = i + ": " + controller.axes[i].toFixed(4);
    //     a.setAttribute("value", controller.axes[i]);
    //   }
    // }
    rAF(updateStatus);
  }

  function scangamepads() {
    const pads = navigator.getGamepads ? navigator.getGamepads() : [];
    for (let i = 0; i < gamepads.length; i++) {
      // @ts-expect-error bad
      if (pads[i] != null && pads[i].index in gamepads) {
        // @ts-expect-error bad
        gamepads[pads[i].index] = pads[i];
      }
    }
  }

  setInterval(scangamepads, 500);

  return (
    <>
      <h1 className="font-bold">Testing Gamepad Inputs</h1>
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
    </>
  );
}

export default App;
