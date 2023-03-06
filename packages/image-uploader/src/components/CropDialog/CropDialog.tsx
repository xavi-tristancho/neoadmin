import { useRef, useState, useEffect, useCallback } from "react";
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
import { getBase64FromUrl, fileToBase64, blobToFile } from "../../utils/file";

type InitialState = {
  data: null | {
    base64: string;
    file?: {
      name: string;
    };
  };
  inputRef: undefined | HTMLInputElement;
  sliderValue: number;
};

const initialState: InitialState = {
  data: null,
  inputRef: undefined,
  sliderValue: 0,
};

type CropDialogProps = {
  source: { uri: string; name: string; file: File };
  onCroppedImage: (file?: Partial<File>) => void;
  onClose: () => void;
  title?: string;
};

type HandleChangeProps = {
  target: {
    value: number;
  };
};

type CropperRef = {
  removePhoto(): void;
  crop(): Promise<Blob>;
  props: {
    file: File;
  };
  zoomTo(value: number): void;
};

const CropDialog = ({
  source,
  onCroppedImage,
  onClose,
  title = "Editar foto",
}: CropDialogProps) => {
  const [state, setState] = useState<InitialState>(initialState);
  const cropperRef = useRef<CropperRef>(null);

  useEffect(() => {
    if (source?.uri) {
      getBase64FromUrl(source.uri)
        .then(({ base64 }) => {
          updateState({ data: { base64, file: { name: source.name } } });
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (source?.file) {
      fileToBase64(source.file)
        .then(({ base64 }) => {
          updateState({ data: { file: source.file, base64 } });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [source]);

  useEffect(() => {
    if (state.inputRef && !source?.uri && !source?.file) {
      onUploadImageClick();
    }
  }, [state.inputRef, source]);

  const updateState = (nextState: Partial<InitialState>) =>
    setState((currentState) => ({ ...currentState, ...nextState }));

  const handleInputRef = useCallback((ref: HTMLInputElement) => {
    console.log("ref", ref);
    updateState({ inputRef: ref });
  }, []);

  const onRemoveImageClick = () => {
    cropperRef.current?.removePhoto();
    updateState({ data: null, sliderValue: initialState.sliderValue });
  };

  const onUploadImageClick = () => state.inputRef?.click();

  const onLocalCroppedImage = () => {
    if (cropperRef.current.props?.file) {
      cropperRef.current
        .crop()
        .then((blob: Blob) => blobToFile({ blob, name: state.data.file?.name }))
        .then((blob: Blob) => {
          onCroppedImage(blob);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      onCroppedImage();
    }
  };

  const onFileSelected = (file: File) =>
    fileToBase64(file).then(({ base64 }) => {
      updateState({
        data: { file, base64 },
        sliderValue: initialState.sliderValue,
      });
    });

  const handleChange = ({ target: { value } }: HandleChangeProps) => {
    cropperRef.current?.zoomTo(value / 100);
    updateState({ sliderValue: value });
  };

  return (
    <Dialog
      open={true}
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
