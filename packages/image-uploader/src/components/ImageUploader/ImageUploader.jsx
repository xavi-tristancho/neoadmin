import React, { useState } from "react";
import styled from "styled-components";
import { fileToBase64 } from "../../utils/file";
import CropDialog from "../CropDialog";
import { useTheme } from "@mui/material/styles";
import {
  Upload as UploadIcon,
  AddPhotoAlternate as AddPhotoIcon,
} from "@mui/icons-material";

const getSrc = (source) => {
  if (source && source.uri) {
    return source.uri;
  }
  return null;
};

const ImageUploader = ({
  onChange = () => {},
  canEdit = true,
  editTitle = "CAMBIAR IMAGEN",
  dropPlaceholder = "SOLTAR IMAGEN",
  uploadMessage = "upload cover image",
  source = {},
  containerStyle = {},
  imageFit = "cover",
}) => {
  const [state, setState] = useState({
    isEditing: false,
    localSource: source,
    nextImage: null,
    isDroping: false,
  });

  const theme = useTheme();

  const image = state.nextImage || {
    src: getSrc(source),
  };

  const hasImage = !!image.src;

  const updateState = (nextState) =>
    setState((currentState) => ({ ...currentState, ...nextState }));

  const onCroppedImage = (file) => {
    updateState({ isEditing: false });

    if (file) {
      fileToBase64(file).then(({ base64 }) => {
        updateState({ nextImage: { src: base64 } });
        onChange(file);
      });
    } else {
      updateState({ nextImage: { src: null } });
      onChange();
    }
  };

  const uploadMessageContent = state.isDroping ? (
    <>
      <AddPhotoIcon />
      {dropPlaceholder}
    </>
  ) : (
    <>
      <UploadIcon />
      {uploadMessage}
    </>
  );

  return (
    <>
      {state.isEditing ? (
        <CropDialog
          source={state.localSource}
          onCroppedImage={onCroppedImage}
          onClose={() => updateState({ isEditing: false })}
        />
      ) : (
        <></>
      )}
      <Container
        theme={theme}
        style={containerStyle}
        onDragOver={(e) => {
          e.preventDefault();
          updateState({ isDroping: true });
        }}
        onDragLeave={() => {
          updateState({ isDroping: false });
        }}
        onDrop={(e) => {
          e.preventDefault();
          updateState({
            isEditing: true,
            localSource: { file: e.dataTransfer?.files?.[0] },
            isDroping: false,
          });
        }}
      >
        <ImageContainer style={containerStyle}>
          {canEdit && (
            <HoverContainer
              hasImage={hasImage}
              onClick={(e) => updateState({ isEditing: true })}
            >
              <ImagePlaceholder className="placeholder">
                {hasImage ? editTitle : ""}
              </ImagePlaceholder>
            </HoverContainer>
          )}
          {hasImage ? (
            <Image src={image.src} imageFit={imageFit} />
          ) : (
            <UploadMessage theme={theme}>{uploadMessageContent}</UploadMessage>
          )}
        </ImageContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  padding: 10px;
  border: 1px dashed
    ${({ theme }) =>
      theme.palette.mode === "light" ? "rgba(175, 175, 175, 0.8)" : "#ffffff"};
`;

const ImageContainer = styled.div`
  position: relative;
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: auto;
  height: 100%;
  min-height: 180px;
  max-height: 300px;
  object-fit: ${({ imageFit = "cover" }) => imageFit};
`;

const HoverContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  &:hover .placeholder {
    display: flex;
  }
`;

const ImagePlaceholder = styled.div`
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  color: #fff;
  background: rgba(175, 175, 175, 0.25);
  user-select: none;
  cursor: pointer;
  letter-spacing: 1.4px;
`;

const UploadMessage = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 22px;
  letter-spacing: 0.46px;
  color: ${({ theme }) => theme.palette.primary.main};
`;

export default ImageUploader;
