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
      fullWidth
      required={required}
      id="outlined-basic"
      variant="outlined"
      label={label}
      value={value}
      size="small"
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        onInputChange(event.target.value);
      }}
      helperText={helperText}
    />
  );
};
