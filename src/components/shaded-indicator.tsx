import { getShadedClass, getUnShadedClass, TeamTheme } from "../types/theme_types";

export interface ShadedIndicatorProps {
  isShaded: boolean;
  text: string;
  theme: TeamTheme;
}

const ShadedIndicator = (props: ShadedIndicatorProps) => {
  return (
    <div
      className={
        "flex-grow-0 flex-shrink-0 p-6 border-4 rounded-3xl font-bold text-2xl " +
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
