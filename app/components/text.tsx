import { Stack, Typography } from "@mui/material";

interface LabeledTextProps {
  label: string;
  text: string;
}

export const LabeledText = ({ label, text }: LabeledTextProps) => {
  return (
    <Stack>
      <Typography variant="caption">{label}</Typography>
      <Typography variant="body1">{text}</Typography>
    </Stack>
  );
};
