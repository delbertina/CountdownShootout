import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import ShadedIndicator from "../components/shaded-indicator";
import { useGameStore } from "../store/gameStore";
import { TeamTheme } from "../types/theme_types";
import { Button } from "../components/ui/button";
import { useMemo, useState } from "react";
import { getFirstNames, getSecondNames } from "../data/name_data";

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
  const totalThemes = Object.values(TeamTheme).length;
  const [team1FirstNames, setTeam1FirstNames] = useState(getFirstNames(3));
  const [team1SecondNames, setTeam1SecondNames] = useState(getSecondNames(3));
  const [team2FirstNames, setTeam2FirstNames] = useState(getFirstNames(3));
  const [team2SecondNames, setTeam2SecondNames] = useState(getSecondNames(3));
  const [team1FirstIndex, setTeam1FirstIndex] = useState(0);
  const [team1SecondIndex, setTeam1SecondIndex] = useState(0);
  const [team2FirstIndex, setTeam2FirstIndex] = useState(0);
  const [team2SecondIndex, setTeam2SecondIndex] = useState(0);

  const rerollNames = (teamId: number) => {
    if (teamId === 1) {
      setTeam1FirstNames(getFirstNames(3));
      setTeam1SecondNames(getSecondNames(3));
      setTeam1FirstIndex(0);
      setTeam1SecondIndex(0);
    } else if (teamId === 2) {
      setTeam2FirstNames(getFirstNames(3));
      setTeam2SecondNames(getSecondNames(3));
      setTeam2FirstIndex(0);
      setTeam2SecondIndex(0);
    }
  }

  const setFirstName = (teamId: number, index: number) => {
    if (teamId === 1) {
      setTeam1FirstIndex(index);
    } else if (teamId === 2) {
      setTeam2FirstIndex(index);
    }
  }

  const setSecondName = (teamId: number, index: number) => {
    if (teamId === 1) {
      setTeam1SecondIndex(index);
    } else if (teamId === 2) {
      setTeam2SecondIndex(index);
    }
  }

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
              <h2>{team === 1 ? team1Theme : team2Theme} Team</h2>
              <Button onClick={() => rerollNames(team)}>
                <RefreshCw />
              </Button>
            </div>
            {/*  */}
            {/* TODO: Add the ability to set the team name */}
            {/*  */}
            <div className="flex flex-col gap-4 items-center">
              <div className="flex flex-row gap-4">
                {(team === 1 ? team1FirstNames : team2FirstNames).map(
                  (firstName, i) => (
                    <Button
                      variant={
                        (
                          team === 1
                            ? team1FirstIndex === i
                            : team2FirstIndex === i
                        )
                          ? "destructive"
                          : "default"
                      }
                      onClick={() => setFirstName(team, i)}
                    >
                      {firstName}
                    </Button>
                  )
                )}
              </div>
              <div className="flex flex-row gap-4">
                {(team === 1 ? team1SecondNames : team2SecondNames).map(
                  (secondName, i) => (
                    <Button
                      variant={
                        (
                          team === 1
                            ? team1SecondIndex === i
                            : team2SecondIndex === i
                        )
                          ? "destructive"
                          : "default"
                      }
                      onClick={() => setSecondName(team, i)}
                    >
                      {secondName}
                    </Button>
                  )
                )}
              </div>
            </div>
            {/* Display a row of both the shaded and unshaded indicators */}
            <div className="flex flex-row items-center gap-4">
              <Button
                className="h-full"
                onClick={() => decreaseThemeIndex(team)}
              >
                <ChevronLeft />
              </Button>
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
              <Button
                className="h-full"
                onClick={() => increaseThemeIndex(team)}
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamOptionsPage;
