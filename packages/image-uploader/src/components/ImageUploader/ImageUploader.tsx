import React from "react";
import {
  Upload as UploadIcon,
  AddPhotoAlternate as AddPhotoIcon,
} from "@mui/icons-material";
import styled from "styled-components";
import { Theme } from "@app-artisans/backoffice/src/styles/theme";

import CropDialog from "../CropDialog";
import useImageUploader from "./useImageUploader";

export type Source = {
  uri: string;
  name: string;
  file?: File;
};

type ImageFit = "cover" | "contain";

type ImageUploaderProps = {
  onChange?: (file?: File) => void;
  canEdit?: boolean;
  editTitle?: string;
  dropPlaceholder?: string;
  uploadMessage?: string;
  source?: Source;
  containerStyle?: React.CSSProperties;
  imageFit?: ImageFit;
};

export const getSrc = (source: Source) => {
  if (source && source.uri) {
    return source.uri;
  }
  return null;
};

const ImageUploader = ({
  onChange,
  canEdit = true,
  editTitle = "CAMBIAR IMAGEN",
  dropPlaceholder = "SOLTAR IMAGEN",
  uploadMessage = "upload cover image",
  source,
  containerStyle = {},
  imageFit = "cover",
}: ImageUploaderProps) => {
  const {
    state,
    theme,
    image,
    hasImage,
    onCroppedImage,
    handleOnDragOver,
    handleOnDragLeave,
    handleOnDrop,
    handleOnClose,
    handleOnClickEdit,
  } = useImageUploader({
    source,
    onChange,
  });

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
      <CropDialog
        source={state.localSource}
        onCroppedImage={onCroppedImage}
        onClose={handleOnClose}
        open={state.isEditing}
      />
      <Container
        data-testid={"image-uploader-test"}
        theme={theme}
        style={containerStyle}
        onDragOver={handleOnDragOver}
        onDragLeave={handleOnDragLeave}
        onDrop={handleOnDrop}
      >
        <ImageContainer style={containerStyle}>
          {canEdit && (
            <HoverContainer
              data-testid={"can-edit-test"}
              hasImage={hasImage}
              onClick={handleOnClickEdit}
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
    ${({ theme }: { theme?: Theme }) =>
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
  object-fit: ${({ imageFit = "cover" }: { imageFit?: ImageFit }) => imageFit};
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
  color: ${({ theme }: { theme?: Theme }) => theme?.palette?.primary?.main};
`;

export default ImageUploader;
