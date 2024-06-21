import useGame from "./store/useGame";

const Interface = () => {
  const points = useGame((state) => state.score);
  return (
    <div className="points">
      <h1>Points: {points}</h1>
    </div>
  );
};

export default Interface;
