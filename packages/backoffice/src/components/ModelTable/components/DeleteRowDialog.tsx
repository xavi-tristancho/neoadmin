import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

type DeleteRowDialogProps = {
  open: boolean;
  onConfirmDeleteClick: () => void;
  onCancelDeleteClick: () => void;
};

const DeleteRowDialog = ({
  open,
  onConfirmDeleteClick,
  onCancelDeleteClick,
}: DeleteRowDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog
      open={!!open}
      onClose={onCancelDeleteClick}
      BackdropProps={{
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(4px)",
        },
      }}
    >
      <CustomDialogTitle>{t("general.areYouSure")}</CustomDialogTitle>
      <DialogContent>
        <CustomTypography>
          {t("general.thisActionCannotBeUndone")}
        </CustomTypography>
      </DialogContent>
      <CustomDialogActions>
        <Button
          color="primary"
          variant="text"
          onClick={onCancelDeleteClick}
          style={{ marginRight: 20 }}
        >
          {t("actions.cancel")}
        </Button>
        <Button color="error" variant="text" onClick={onConfirmDeleteClick}>
          {t("actions.delete")}
        </Button>
      </CustomDialogActions>
    </Dialog>
  );
};

const CustomDialogTitle = styled(DialogTitle)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 900;
  font-size: 24px;
  line-height: 20px;
  letter-spacing: 0.14px;
`;

const CustomTypography = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.15px;
`;

const CustomDialogActions = styled(DialogActions)`
  && {
    justify-content: flex-start;
    padding: 8px 24px;
    margin-bottom: 20px;
  }
`;

export default DeleteRowDialog;
