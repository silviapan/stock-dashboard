interface LabeledTextProps {
  label: string;
  text: string;
  textStyleClasses?: string[];
}

export const LabeledText = ({
  label,
  text,
  textStyleClasses,
}: LabeledTextProps) => {
  return (
    <div>
      <p className="help has-text-grey-light">{label}</p>
      <p className={`text ${!!textStyleClasses && textStyleClasses.join(" ")}`}>
        {text}
      </p>
    </div>
  );
};
