interface ButtonProps {
  size?: string;
  icon?: string;
  buttonText: string;
  handleClick: () => void;
}

export const Button = ({
  size,
  icon,
  buttonText,
  handleClick,
}: ButtonProps) => {
  return (
    <button className="button" onClick={handleClick}>
      {icon && (
        <span className="icon">
          <i className="material-symbols-outlined">{icon}</i>
        </span>
      )}
      {buttonText && <span>{buttonText}</span>}
    </button>
  );
};
