export interface GameHeaderTopProps {
    headerTitle: string;
    headerSubtitle: string;
    headerBody: string;
  }
  
  const GameHeaderTop = (props: GameHeaderTopProps) => {
  
    return (
        <div className="flex flex-col justify-between overflow-hidden grow-0">
          <div className="font-bold text-xl truncate">
            <h2>{props.headerTitle}</h2>
          </div>
          <div>
            <h2>{props.headerSubtitle}</h2>
          </div>
          <div>
            <h2>{props.headerBody}</h2>
          </div>
        </div>      
    );
  };
  
  export default GameHeaderTop;
  