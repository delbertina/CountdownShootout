import ShadedIndicator from "../components/shaded-indicator";
import { useGameStore } from "../store/gameStore";
import { TeamTheme } from "../types/theme_types";

const TeamOptionsPage = () => {
  const team1Theme = useGameStore((state) => state.team1Theme);
  const team2Theme = useGameStore((state) => state.team2Theme);

  return (
    <div className="whole-screen flex flex-col justify-center bg-slate-300">
      <h1 className="font-bold">Team Options</h1>
      <h2>Select team colors.</h2>
        <hr />
        <h2>Team 1</h2>
      <div className="flex flex-row flex-wrap justify-center">
        {Object.values(TeamTheme).map((theme) => (
            <div
            className={
              "padding-4 border-4 border-dashed border-b-0 " + (team1Theme === theme
                ? "border-black bg-gray-500"
                : "border-transparent")
            }
          >
            <ShadedIndicator
            text={theme}
            theme={theme}
            isShaded={true}
          />
          </div>
        ))}
      </div>
      <div className="flex flex-row flex-wrap justify-center">
        {Object.values(TeamTheme).map((theme) => (
            <div
            className={
              "padding-4 border-4 border-dashed border-t-0 " + (team1Theme === theme
                ? "border-black bg-gray-500"
                : "border-transparent")
            }
          >
            <ShadedIndicator
            text={theme}
            theme={theme}
            isShaded={false}
          />
          </div>
        ))}
      </div>
      <h2>Team 2</h2>
      <div className="flex flex-row flex-wrap justify-center">
        {Object.values(TeamTheme).map((theme) => (
            <div
            className={
              "padding-4 border-4 border-dashed border-b-0 " + (team2Theme === theme
                ? "border-black bg-gray-500"
                : "border-transparent")
            }
          >
            <ShadedIndicator
            text={theme}
            theme={theme}
            isShaded={true}
          />
          </div>
        ))}
      </div>
      <div className="flex flex-row flex-wrap justify-center">
        {Object.values(TeamTheme).map((theme) => (
            <div
            className={
              "padding-4 border-4 border-dashed border-t-0 " + (team2Theme === theme
                ? "border-black bg-gray-500"
                : "border-transparent")
            }
          >
            <ShadedIndicator
            text={theme}
            theme={theme}
            isShaded={false}
          />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamOptionsPage;
