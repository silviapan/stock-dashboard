import React from "react";
import { Modal, Box, Typography, Stack, Button } from "@mui/material";

const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

interface CardModalProps {
  displayModal: boolean;
  handleCloseModal: () => void;
  cardTitle: string;
  children?: React.ReactNode;
  displaySaveButton?: boolean;
  handleSave?: () => void;
}

export const CardModal: React.FC<CardModalProps> = ({
  displayModal,
  handleCloseModal,
  cardTitle,
  displaySaveButton = false,
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
      <Box component="form" sx={boxStyle}>
        <Typography id="modal-modal-title" variant="h5" component="h2">
          {cardTitle}
        </Typography>
        <Box pb={2}>{children}</Box>
        <Stack direction="row" spacing={2}>
          {displaySaveButton && (
            <Button variant="contained" onClick={handleSave}>
              Save Changes
            </Button>
          )}
          <Button variant="outlined" onClick={handleCloseModal}>
            Cancel
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
