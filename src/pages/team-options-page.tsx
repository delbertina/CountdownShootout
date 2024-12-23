import TeamOptions from "../components/team-options";

const TeamOptionsPage = () => {
  return (
    <div className="whole-screen flex flex-col gap-4 justify-center bg-slate-300">
      <h1 className="font-bold">Team Options</h1>
      <h2>Select team name & color</h2>
      <hr />
      {/* Display the same section for each team */}
      <div className="flex flex-row justify-center gap-8">
        {[1, 2].map((team) => (
          <TeamOptions teamId={team} />
        ))}
      </div>
    </div>
  );
};

export default TeamOptionsPage;
