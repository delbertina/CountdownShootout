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
      {/* Display the same section twice, once for team 1 and once for team 2 */}
      {[1, 2].map((team) => (
        <>
          <h2>Team {team}</h2>
          {/*  */}
          {/* TODO: Add the ability to set the team name */}
          {/*  */}
          {/* Display a row of both the shaded and unshaded indicators */}
          {[true, false].map((isShaded) => (
            <div className="flex flex-row flex-wrap justify-center">
              {/* Display each of the color options */}
              {Object.values(TeamTheme).map((theme) => (
                <div
                  className={
                    "padding-4 border-4 border-dashed " +
                    ((team === 1 && team1Theme === theme) ||
                    (team === 2 && team2Theme === theme)
                      ? "border-black bg-gray-500"
                      : "border-transparent")
                  }
                >
                  <ShadedIndicator
                    text={theme}
                    theme={theme}
                    isShaded={isShaded}
                    onClick={() =>
                      useGameStore.getState().selectTeamColor(team, theme)
                    }
                  />
                </div>
              ))}
            </div>
          ))}
        </>
      ))}
    </div>
  );
};

export default TeamOptionsPage;
