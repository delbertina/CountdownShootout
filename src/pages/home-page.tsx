import { useGameStore } from "../store/gameStore";

const HomePage = () => {
  // check browser settings
  const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");
  const canAutoplay =
    // @ts-expect-error experimental feature
    !!navigator.getAutoplayPolicy &&
    // @ts-expect-error experimental feature
    navigator.getAutoplayPolicy("mediaelement") === "allowed";
  const isGamepadDetected = useGameStore((state) => state.isGamepadDetected);

  return (
    <div className="welcome-screen whole-screen flex flex-col justify-center bg-slate-200">
      <h1 className="font-bold">Welcome to Countdown Shootout</h1>
      <h2>This game supports 3-9 controllers to play. One for the host & one for every team playing.</h2>
      <h2>
        This game requires "dom.gamepad.non_standard_events.enabled" to be
        enabled in about:config in Firefox
      </h2>
      -<h2>Firefox Browser: {isFirefox ? "Good" : "Error"}</h2>
      <h2>Can Autoplay: {canAutoplay ? "Good" : "Error"}</h2>
      <h2>Gamepad Support: {isGamepadDetected ? "Good" : "Waiting ..."}</h2>
    </div>
  );
};

export default HomePage;
