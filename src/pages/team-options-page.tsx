import { ChevronLeft, ChevronRight, Pencil } from "lucide-react";
import ShadedIndicator from "../components/shaded-indicator";
import { useGameStore } from "../store/gameStore";
import { TeamTheme } from "../types/theme_types";
import { Button } from "../components/ui/button";
import { useMemo } from "react";

const TeamOptionsPage = () => {
  const team1Theme = useGameStore((state) => state.team1Theme);
  const team1ThemeIndex = useMemo(
    () => Object.values(TeamTheme).indexOf(team1Theme),
    [team1Theme]
  );
  const team2Theme = useGameStore((state) => state.team2Theme);
  const team2ThemeIndex = useMemo(
    () => Object.values(TeamTheme).indexOf(team2Theme),
    [team2Theme]
  );
  const selectTeamColor = useGameStore((state) => state.selectTeamColor);
  const totalThemes = useMemo(() => Object.values(TeamTheme).length, []);

  const increaseThemeIndex = (teamId: number) => {
    if (teamId === 1) {
      selectTeamColor(
        teamId,
        Object.values(TeamTheme)[team1ThemeIndex + (1 % totalThemes)] ===
          team2Theme
          ? Object.values(TeamTheme)[(team1ThemeIndex + 2) % totalThemes]
          : Object.values(TeamTheme)[(team1ThemeIndex + 1) % totalThemes]
      );
    } else if (teamId === 2) {
      selectTeamColor(
        teamId,
        Object.values(TeamTheme)[(team2ThemeIndex + 1) % totalThemes] ===
          team1Theme
          ? Object.values(TeamTheme)[(team2ThemeIndex + 2) % totalThemes]
          : Object.values(TeamTheme)[(team2ThemeIndex + 1) % totalThemes]
      );
    }
  };

  const decreaseThemeIndex = (teamId: number) => {
    if (teamId === 1) {
      selectTeamColor(
        teamId,
        Object.values(TeamTheme)[
          (totalThemes + team1ThemeIndex - 1) % totalThemes
        ] === team2Theme
          ? Object.values(TeamTheme)[
              (totalThemes + team1ThemeIndex - 2) % totalThemes
            ]
          : Object.values(TeamTheme)[
              (totalThemes + team1ThemeIndex - 1) % totalThemes
            ]
      );
    } else if (teamId === 2) {
      selectTeamColor(
        teamId,
        Object.values(TeamTheme)[
          (totalThemes + team2ThemeIndex - 1) % totalThemes
        ] === team1Theme
          ? Object.values(TeamTheme)[
              (totalThemes + team2ThemeIndex - 2) % totalThemes
            ]
          : Object.values(TeamTheme)[
              (totalThemes + team2ThemeIndex - 1) % totalThemes
            ]
      );
    }
  };

  return (
    <div className="whole-screen flex flex-col gap-4 justify-center bg-slate-300">
      <h1 className="font-bold">Team Options</h1>
      <h2>Select team colors.</h2>
      <hr />
      {/* Display the same section twice, once for team 1 and once for team 2 */}
      <div className="flex flex-row justify-center gap-8">
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
            <div className="flex flex-row items-center gap-4">
              <Button className="h-full" onClick={() => decreaseThemeIndex(team)}><ChevronLeft /></Button>
              <div>
                {[true, false].map((isShaded) => (
                  <div className="flex flex-row flex-wrap justify-center">
                    {/* Display each of the color options */}
                    {(team === 1
                      ? [
                          team1ThemeIndex == 0
                            ? totalThemes - 1
                            : team1ThemeIndex - 1,
                          team1ThemeIndex,
                          (team1ThemeIndex + 1) % totalThemes,
                        ]
                      : [
                          team2ThemeIndex == 0
                            ? totalThemes - 1
                            : team2ThemeIndex - 1,
                          team2ThemeIndex,
                          (team2ThemeIndex + 1) % totalThemes,
                        ]
                    )
                      .map((index) => Object.values(TeamTheme)[index])
                      .map((theme) => (
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
                              useGameStore
                                .getState()
                                .selectTeamColor(team, theme)
                            }
                          />
                        </div>
                      ))}
                  </div>
                ))}
              </div>
              <Button className="h-full" onClick={() => increaseThemeIndex(team)}><ChevronRight /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamOptionsPage;
