interface ButtonProps {
  size?: string;
  icon?: string;
  buttonText: string;
  handleClick: () => void;
  buttonStyleClasses?: string[];
}

export const Button = ({
  size,
  icon,
  buttonText,
  handleClick,
  buttonStyleClasses,
}: ButtonProps) => {
  return (
    <button
      className={`button ${
        !!buttonStyleClasses && buttonStyleClasses.join(" ")
      }`}
      onClick={handleClick}
    >
      {icon && (
        <span className="icon">
          <i className="material-symbols-outlined">{icon}</i>
        </span>
      )}
      {buttonText && <span>{buttonText}</span>}
    </button>
  );
};
