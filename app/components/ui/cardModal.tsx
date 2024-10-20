import React from "react";
import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Box,
  Typography,
  Stack,
  Button,
  Divider,
} from "@mui/material";
import { grey } from "@mui/material/colors";

const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  borderRadius: "8px",
};

interface CardModalProps {
  displayModal: boolean;
  handleCloseModal: () => void;
  cardTitle: string;
  children?: React.ReactNode;
  handleSave?: () => void;
}

export const CardModal: React.FC<CardModalProps> = ({
  displayModal,
  handleCloseModal,
  cardTitle,
  handleSave,
  children,
}) => {
  return (
    <Modal
      open={displayModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={{ maxWidth: 500, ...boxStyle }}>
        <CardHeader
          title={cardTitle}
          sx={{ borderBottom: `1px solid ${grey[300]}`, padding: "1rem 2rem" }}
        />
        <CardContent sx={{ padding: "1rem 2rem" }}>{children}</CardContent>
        <CardActions
          sx={{
            justifyContent: "center",
            backgroundColor: grey[100],
            padding: "1.5rem 1rem",
          }}
        >
          <Stack direction="row" spacing={2}>
            {handleSave && (
              <Button variant="contained" onClick={handleSave} color="black">
                Save Changes
              </Button>
            )}
            <Button variant="outlined" onClick={handleCloseModal} color="black">
              Cancel
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </Modal>
  );
};
