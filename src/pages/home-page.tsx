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
      <h2>This game currently requires 3 controllers to play.</h2>
      <h2>
        This game requires "dom.gamepad.non_standard_events.enabled" to be
        enabled in about:config in Firefox
      </h2>
      -<h2>Firefox Browser: {isFirefox ? "Good" : "Error"}</h2>
      <h2>Can Autoplay: {canAutoplay ? "Good" : "Error"}</h2>
      <h2>Gamepad Support: {isGamepadDetected ? "Good" : "Waiting ..."}</h2>
      {/* TODO: Save this to put it somewhere on a team selection page. */}
      {/* <div className="flex flex-row flex-wrap">
        <ShadedIndicator text="Pink" theme={TeamTheme.PINK} isShaded={false} />
        <ShadedIndicator text="Red" theme={TeamTheme.RED} isShaded={false} />
        <ShadedIndicator text="Orange" theme={TeamTheme.ORANGE} isShaded={false} />
        <ShadedIndicator text="Yellow" theme={TeamTheme.YELLOW} isShaded={false} />
        <ShadedIndicator text="Lime" theme={TeamTheme.LIME} isShaded={false} />
        <ShadedIndicator text="Green" theme={TeamTheme.GREEN} isShaded={false} />
        <ShadedIndicator text="Cyan" theme={TeamTheme.CYAN} isShaded={false} />
        <ShadedIndicator text="Blue" theme={TeamTheme.BLUE} isShaded={false} />
        <ShadedIndicator text="Purple" theme={TeamTheme.PURPLE} isShaded={false} />
        <ShadedIndicator text="Brown" theme={TeamTheme.BROWN} isShaded={false} />
        <ShadedIndicator text="Pink" theme={TeamTheme.PINK} isShaded={true} />
        <ShadedIndicator text="Red" theme={TeamTheme.RED} isShaded={true} />
        <ShadedIndicator text="Orange" theme={TeamTheme.ORANGE} isShaded={true} />
        <ShadedIndicator text="Yellow" theme={TeamTheme.YELLOW} isShaded={true} />
        <ShadedIndicator text="Lime" theme={TeamTheme.LIME} isShaded={true} />
        <ShadedIndicator text="Green" theme={TeamTheme.GREEN} isShaded={true} />
        <ShadedIndicator text="Cyan" theme={TeamTheme.CYAN} isShaded={true} />
        <ShadedIndicator text="Blue" theme={TeamTheme.BLUE} isShaded={true} />
        <ShadedIndicator text="Purple" theme={TeamTheme.PURPLE} isShaded={true} />
        <ShadedIndicator text="Brown" theme={TeamTheme.BROWN} isShaded={true} />
      </div> */}
    </div>
  );
};

export default HomePage;
