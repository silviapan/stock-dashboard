import { TextField } from "@mui/material";

interface TextInputProps {
  label: string;
  helperText?: string;
  value: string;
  onInputChange: (value: string) => void;
  required?: boolean;
}

export const TextInput = ({
  label,
  helperText,
  value,
  onInputChange,
  required = false,
}: TextInputProps) => {
  return (
    <TextField
      required={required}
      id="outlined-required"
      label={label}
      value={value}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        onInputChange(event.target.value);
      }}
      helperText={helperText}
      variant="standard"
    />
  );
};
