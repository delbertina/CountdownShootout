import {
  ChevronLeft,
  ChevronRight,
  Power,
  PowerOff,
  RefreshCw,
  X,
} from "lucide-react";
import { ShadedIndicatorVariant, TeamTheme } from "../types/theme_types";
import { Button } from "./ui/button";
import { getFirstNames, getSecondNames } from "../data/name_data";
import { useEffect, useMemo, useRef, useState } from "react";
import { useGameStore } from "../store/gameStore";
import ShadedIndicator from "./shaded-indicator";
import { getTeamDisplayName } from "../types/state_types";

export interface TeamOptionsProps {
  teamId: number;
}

const TeamOptions = (props: TeamOptionsProps) => {
  const selectTeamColor = useGameStore((state) => state.selectTeamColor);
  const removeTeam = useGameStore((state) => state.removeTeam);
  const toggleTeamCustomName = useGameStore(
    (state) => state.toggleTeamCustomName
  );
  const setTeamCustomName = useGameStore((state) => state.setTeamCustomName);
  const teams = useGameStore((state) => state.teams);
  const selectedTeam = useMemo(
    () => teams.filter((team) => team.id === props.teamId)[0],
    [teams, props.teamId]
  );
  const selectedTeamThemes = useMemo(
    () =>
      teams
        .filter((team) => team.id !== props.teamId)
        .map((team) => team.theme),
    [teams, props.teamId]
  );
  const teamThemesFiltered = useMemo(
    () =>
      Object.values(TeamTheme).filter(
        (theme) => !selectedTeamThemes.includes(theme)
      ),
    [selectedTeamThemes]
  );
  const totalThemes = useMemo(
    () => teamThemesFiltered.length,
    [teamThemesFiltered]
  );
  const teamThemeIndex = useMemo(
    () => Object.values(teamThemesFiltered).indexOf(selectedTeam.theme),
    [teamThemesFiltered, selectedTeam]
  );
  const [teamFirstNames, setTeamFirstNames] = useState(getFirstNames(3));
  const [teamSecondNames, setTeamSecondNames] = useState(getSecondNames(3));
  const [teamFirstIndex, setTeamFirstIndex] = useState(0);
  const [teamSecondIndex, setTeamSecondIndex] = useState(0);
  const didMount = useRef(false);

  const rerollNames = () => {
    setTeamFirstNames(getFirstNames(3));
    setTeamSecondNames(getSecondNames(3));
    setTeamFirstIndex(0);
    setTeamSecondIndex(0);
  };

  const setFirstName = (index: number) => {
    setTeamFirstIndex(index);
  };

  const setSecondName = (index: number) => {
    setTeamSecondIndex(index);
  };

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
  };

  const getTeamCustomName = (
  ): string => {
    return (
      (teamFirstNames[teamFirstIndex]) +
      " " +
      (teamSecondNames[teamSecondIndex])
    );
  };

  useEffect(() => {
    // Return early, if this is the first render:
    if ( !didMount.current ) {
      didMount.current = true;
      return;
    }
    setTeamCustomName(props.teamId, getTeamCustomName());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamFirstIndex, teamSecondIndex]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-center gap-4">
        <h2>{getTeamDisplayName(selectedTeam)}</h2>
        <Button
          variant={"destructive"}
          onClick={() => removeTeam(props.teamId)}
          disabled={teams.length <= 2}
        >
          <X />
        </Button>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-row items-center gap-2">
          <Button
            variant={selectedTeam.isUsingCustomName ? "destructive" : "default"}
            onClick={() =>
              toggleTeamCustomName(props.teamId, getTeamCustomName())
            }
          >
            {selectedTeam.isUsingCustomName ? <Power /> : <PowerOff />}
          </Button>
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-row gap-2">
              {teamFirstNames.map((firstName, i) => (
                <Button
                  key={i}
                  variant={teamFirstIndex === i ? "destructive" : "default"}
                  onClick={() => setFirstName(i)}
                >
                  {firstName}
                </Button>
              ))}
            </div>
            <div className="flex flex-row gap-2">
              {teamSecondNames.map((secondName, i) => (
                <Button
                  key={i}
                  variant={teamSecondIndex === i ? "destructive" : "default"}
                  onClick={() => setSecondName(i)}
                >
                  {secondName}
                </Button>
              ))}
            </div>
          </div>
          <Button onClick={() => rerollNames()}>
            <RefreshCw />
          </Button>
        </div>
      </div>
      {/* Display a row of both the shaded and unshaded indicators */}
      <div className="button-container">
        <Button size={"sm"} className="h-full front-button" onClick={() => decreaseThemeIndex()}>
          <ChevronLeft />
        </Button>
        <div>
          {[true].map((isShaded) => (
            <div
              key={isShaded ? 1 : 0}
              className="flex flex-row justify-center inner-buttons"
            >
              {/* Display each of the color options */}
              {[
                teamThemeIndex == 0 ? totalThemes - 1 : teamThemeIndex - 1,
                teamThemeIndex,
                (teamThemeIndex + 1) % totalThemes,
              ]
                .map((index) => Object.values(teamThemesFiltered)[index])
                .map((theme) => (
                  <div
                    key={theme}
                    className={
                      "padding-4 border-4 border-dashed " +
                      (selectedTeam.theme === theme
                        ? "border-black bg-gray-500"
                        : "border-transparent")
                    }
                  >
                    <ShadedIndicator
                      text={theme}
                      theme={theme}
                      isShaded={isShaded}
                      variant={ShadedIndicatorVariant.SKINNY}
                      onClick={() =>
                        useGameStore
                          .getState()
                          .selectTeamColor(props.teamId, theme)
                      }
                    />
                  </div>
                ))}
            </div>
          ))}
        </div>
        <Button size={"sm"} className="h-full back-button" onClick={() => increaseThemeIndex()}>
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default TeamOptions;
