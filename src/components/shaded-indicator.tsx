import { getShadedClass, getUnShadedClass, TeamTheme } from "../types/theme_types";

export interface ShadedIndicatorProps {
  isShaded: boolean;
  text: string;
  theme: TeamTheme;
  onClick?: () => void;
}

const ShadedIndicator = (props: ShadedIndicatorProps) => {
  return (
    <div
      onClick={props.onClick}
      className={
        "flex-grow-0 flex-shrink-0 p-6 border-4 rounded-3xl font-bold text-2xl select-none cursor-pointer " +
        (props.isShaded
          ? getShadedClass(props.theme)
          : getUnShadedClass(props.theme))
      }
    >
      {props.text}
    </div>
  );
};

export default ShadedIndicator;
