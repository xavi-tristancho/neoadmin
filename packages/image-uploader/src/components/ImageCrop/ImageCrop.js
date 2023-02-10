import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
} from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
import styled from "styled-components";

const DEFAULT_MODE = {
  modal: true,
  background: false,
  rotatable: false,
  cropBoxResizable: true,
  dragMode: "crop",
  cropBoxMovable: true,
  autoCrop: true,
  viewMode: 1,
  zoom: 0,
  autoCropArea: 1,
};

const AVATAR_MODE = {
  aspectRatio: 1,
  modal: true,
  background: false,
  rotatable: false,
  cropBoxResizable: false,
  dragMode: "move",
  cropBoxMovable: false,
  autoCrop: true,
  viewMode: 1,
  zoom: 0,
  minCropBoxWidth: 300,
  minCropBoxHeight: 300,
};

const initialState = {
  imgNaturalWidth: undefined,
  imgWidth: undefined,
};

const getCropperOptions = (cropMode) =>
  cropMode === "avatar" ? AVATAR_MODE : DEFAULT_MODE;

const ImageCrop = forwardRef((props, ref) => {
  const [state, setState] = useState(initialState);
  const imgRef = useRef(null);

  const updateState = (nextState) =>
    setState((currentState) => ({ ...currentState, ...nextState }));

  useEffect(() => {
    if (imgRef.current && !state.cropper) {
      const { cropMode = "default" } = props;
      updateState({
        cropper: new Cropper(imgRef.current, getCropperOptions(cropMode)),
      });
    }
  }, [imgRef.current]);

  useEffect(() => {
    if (state.cropper) {
      const resetCropper = state.cropper
        .reset()
        .clear()
        .replace(props.file && props.file.base64);
      updateState({
        cropper: resetCropper,
        imgNaturalWidth: resetCropper?.getImageData()?.naturalWidth,
        imgWidth: resetCropper?.getImageData()?.width,
      });
    }
  }, [state.cropper, props.file]);

  const { imgNaturalWidth, imgWidth } = state;
  const { alt, file, crossOrigin } = props;

  useImperativeHandle(ref, () => ({
    zoomTo: (zoom) => {
      if (state.cropper) {
        const offset = imgWidth / imgNaturalWidth;
        updateState({
          ...(!imgNaturalWidth
            ? {
                imgNaturalWidth: state.cropper?.getImageData()?.naturalWidth,
                imgWidth: state.cropper?.getImageData()?.width,
              }
            : {}),
          cropper: state.cropper.zoomTo(zoom + offset),
        });
      }
    },

    removePhoto: () => {
      if (state.cropper) {
        state.cropper.destroy();
        updateState(initialState);
      }
    },

    crop: () =>
      new Promise((resolve) => {
        if (state.cropper) {
          const canvas = state.cropper.getCroppedCanvas({});
          if (!canvas) {
            resolve(null);
          } else {
            canvas.toBlob((blob) => {
              resolve(blob);
            });
          }
        } else {
          resolve(null);
        }
      }),
    props,
  }));

  return (
    <Container>
      <Image
        crossOrigin={crossOrigin}
        ref={imgRef}
        src={file?.base64}
        alt={alt === undefined ? "picture" : alt}
        style={file?.base64 && { opacity: 1 }}
      />
    </Container>
  );
});

const Container = styled.div`
  height: 400px;
  width: 100%;
  background-color: white;
`;

const Image = styled.img`
  opacity: 0;
`;

export default ImageCrop;
