import { Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

interface LabeledTextProps {
  label: string;
  text: string;
}

export const LabeledText = ({ label, text }: LabeledTextProps) => {
  return (
    <Stack>
      <Typography variant="caption" color={grey[600]}>
        {label}
      </Typography>
      <Typography variant="body1">{text}</Typography>
    </Stack>
  );
};
