import TeamOptions from "../components/team-options";
import { Button } from "../components/ui/button";
import { useGameStore } from "../store/gameStore";

const TeamOptionsPage = () => {
  const teams = useGameStore((state) => state.teams);
  const addTeam = useGameStore((state) => state.addTeam);
  return (
    <div className="whole-screen flex flex-col gap-4 justify-center bg-slate-300">
      <h1 className="font-bold">Team Options</h1>
      <div>
        <Button onClick={() => addTeam()} disabled={teams.length >= 8}>
          Add Team
        </Button>
      </div>
      <h2>Select team name & color</h2>
      <hr />
      {/* Display the same section for each team */}
      <div className="flex flex-row flex-wrap justify-center gap-8">
        {teams.map((team) => (
          <TeamOptions key={team.id} teamId={team.id} />
        ))}
      </div>
    </div>
  );
};

export default TeamOptionsPage;
