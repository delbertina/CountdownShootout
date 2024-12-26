import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { TeamTheme, totalThemes } from "../types/theme_types";
import { Button } from "./ui/button";
import { getFirstNames, getSecondNames } from "../data/name_data";
import { useMemo, useState } from "react";
import { useGameStore } from "../store/gameStore";
import ShadedIndicator from "./shaded-indicator";

export interface TeamOptionsProps {
  teamId: number
}

const TeamOptions = (props: TeamOptionsProps) => {
    const selectTeamColor = useGameStore((state) => state.selectTeamColor);
    const teamTheme = useGameStore((state) => state.teams.filter((team) => team.id === props.teamId)[0].theme);
      const teamThemeIndex = useMemo(
        () => Object.values(TeamTheme).indexOf(teamTheme),
        [teamTheme]
      );
    const selectedTeamThemes = useGameStore((state) => state.teams.filter((team) => team.id !== props.teamId).map((team) => team.theme));
    const teamThemesFiltered = useMemo(
        () => Object.values(TeamTheme).filter((theme) => !selectedTeamThemes.includes(theme)),
        [selectedTeamThemes]
    )
    const [teamFirstNames, setTeamFirstNames] = useState(getFirstNames(3));
    const [teamSecondNames, setTeamSecondNames] = useState(getSecondNames(3));
    const [teamFirstIndex, setTeamFirstIndex] = useState(0);
    const [teamSecondIndex, setTeamSecondIndex] = useState(0);

    const rerollNames = () => {
          setTeamFirstNames(getFirstNames(3));
          setTeamSecondNames(getSecondNames(3));
          setTeamFirstIndex(0);
          setTeamSecondIndex(0);
      }
    
      const setFirstName = (index: number) => {
          setTeamFirstIndex(index);
      }
    
      const setSecondName = (index: number) => {
          setTeamSecondIndex(index);
      }
    
      const increaseThemeIndex = () => {
          selectTeamColor(
            props.teamId,
            teamThemesFiltered[(teamThemeIndex + 1) % teamThemesFiltered.length]
          );
      };
    
      const decreaseThemeIndex = () => {
          selectTeamColor(
            props.teamId,
            teamThemesFiltered[
                  (totalThemes + teamThemeIndex - 1) % teamThemesFiltered.length
                ]
          );
        }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-center gap-4">
        <h2>{teamTheme} Team</h2>
        <Button onClick={() => rerollNames()}>
          <RefreshCw />
        </Button>
      </div>
      <div className="flex flex-col gap-4 items-center">
        <div className="flex flex-row gap-4">
          {teamFirstNames.map(
            (firstName, i) => (
              <Button
                variant={
                  (teamFirstIndex === i)
                    ? "destructive"
                    : "default"
                }
                onClick={() => setFirstName(i)}
              >
                {firstName}
              </Button>
            )
          )}
        </div>
        <div className="flex flex-row gap-4">
          {teamSecondNames.map(
            (secondName, i) => (
              <Button
                variant={
                  teamSecondIndex === i
                    ? "destructive"
                    : "default"
                }
                onClick={() => setSecondName(i)}
              >
                {secondName}
              </Button>
            )
          )}
        </div>
      </div>
      {/* Display a row of both the shaded and unshaded indicators */}
      <div className="flex flex-row items-center gap-4">
        <Button className="h-full" onClick={() => decreaseThemeIndex()}>
          <ChevronLeft />
        </Button>
        <div>
          {[true, false].map((isShaded) => (
            <div className="flex flex-row flex-wrap justify-center">
              {/* Display each of the color options */}
              {[
                    teamThemeIndex == 0
                      ? totalThemes - 1
                      : teamThemeIndex - 1,
                    teamThemeIndex,
                    (teamThemeIndex + 1) % totalThemes,
                  ]
                .map((index) => Object.values(TeamTheme)[index])
                .map((theme) => (
                  <div
                    className={
                      "padding-4 border-4 border-dashed " +
                      ((teamTheme === theme)
                        ? "border-black bg-gray-500"
                        : "border-transparent")
                    }
                  >
                    <ShadedIndicator
                      text={theme}
                      theme={theme}
                      isShaded={isShaded}
                      onClick={() =>
                        useGameStore.getState().selectTeamColor(props.teamId, theme)
                      }
                    />
                  </div>
                ))}
            </div>
          ))}
        </div>
        <Button className="h-full" onClick={() => increaseThemeIndex()}>
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default TeamOptions;
