import styled from "styled-components";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import Input from "../Input";
import ImageCrop from "../ImageCrop";
import Slider from "../Slider";
import useCropDialogState from "./useCropDialog";

type CropDialogProps = {
  source: { uri?: string; name?: string; file?: File };
  onCroppedImage: (file?: Partial<File>) => void;
  onClose: () => void;
  title?: string;
  open: boolean;
};

const CropDialog = ({
  source,
  onCroppedImage,
  onClose,
  title = "Editar foto",
  open,
}: CropDialogProps) => {
  const {
    state,
    onRemoveImageClick,
    onLocalCroppedImage,
    onFileSelected,
    handleChange,
    handleInputRef,
    cropperRef,
    onUploadImageClick,
  } = useCropDialogState({ source, onCroppedImage });

  return (
    <Dialog
      data-testid={"crop-dialog-test"}
      open={open}
      onClose={onClose}
      BackdropProps={{
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(4px)",
        },
      }}
    >
      <CustomDialogTitle>
        {title}
        <Close onClick={onClose} style={{ cursor: "pointer" }} />
      </CustomDialogTitle>
      <CustomDialogContent dividers={true}>
        <ImageCrop ref={cropperRef} file={state.data} />
        <Input
          data-testid="upload-image"
          ref={handleInputRef}
          onChange={onFileSelected}
        />
      </CustomDialogContent>
      <DialogActions>
        <CustomButton variant="contained" onClick={onRemoveImageClick}>
          Borrar
        </CustomButton>
        <Slider
          value={state.sliderValue}
          disabled={typeof state.data?.base64 === "undefined"}
          onChange={handleChange}
        />
        <ButtonsContainer>
          <CustomButton variant="contained" onClick={onUploadImageClick}>
            Subir
          </CustomButton>
          <CustomButton variant="contained" onClick={onLocalCroppedImage}>
            Guardar
          </CustomButton>
        </ButtonsContainer>
      </DialogActions>
    </Dialog>
  );
};

const CustomDialogTitle = styled(DialogTitle)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CustomDialogContent = styled(DialogContent)`
  min-width: 500px;
  max-width: 600px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const CustomButton = styled(Button)`
  && {
    margin: 0px 5px;
  }
`;

export default CropDialog;
