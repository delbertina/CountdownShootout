import { Pencil } from "lucide-react";
import ShadedIndicator from "../components/shaded-indicator";
import { useGameStore } from "../store/gameStore";
import { TeamTheme } from "../types/theme_types";
import { Button } from "../components/ui/button";

const TeamOptionsPage = () => {
  const team1Theme = useGameStore((state) => state.team1Theme);
  const team2Theme = useGameStore((state) => state.team2Theme);

  return (
    <div className="whole-screen flex flex-col gap-4 justify-center bg-slate-300">
      <h1 className="font-bold">Team Options</h1>
      <h2>Select team colors.</h2>
      <hr />
      {/* Display the same section twice, once for team 1 and once for team 2 */}
      <div className="flex flex-col gap-8">
      {[1, 2].map((team) => (
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-center gap-4">
            <h2>Team {team}</h2>
            <Button>
              <Pencil />
            </Button>
          </div>
          {/*  */}
          {/* TODO: Add the ability to set the team name */}
          {/*  */}
          {/* Display a row of both the shaded and unshaded indicators */}
          <div>
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
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default TeamOptionsPage;
