import {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
} from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
import styled from "styled-components";

type DefaultMode = {
  modal: boolean;
  background: boolean;
  rotatable: boolean;
  cropBoxResizable: boolean;
  dragMode: "crop" | "move";
  cropBoxMovable: boolean;
  autoCrop: boolean;
  viewMode: number;
  zoom: number;
  autoCropArea: number;
};

type AvatarMode = {
  aspectRatio: number;
  modal: boolean;
  background: boolean;
  rotatable: boolean;
  cropBoxResizable: boolean;
  dragMode: "move";
  cropBoxMovable: boolean;
  autoCrop: boolean;
  viewMode: number;
  zoom: number;
  minCropBoxWidth: number;
  minCropBoxHeight: number;
};

type InitialState = {
  imgNaturalWidth: undefined | number;
  imgWidth: undefined | number;
  cropper?: undefined | Cropper;
};

type Props = {
  alt?: string;
  file?: {
    base64: string;
  };
  crossOrigin?: string;
  cropMode?: string;
};

type ImageCropProps = {
  type: string;
  props: Props;
  file?: {
    base64: string;
  };
};

const DEFAULT_MODE: DefaultMode = {
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

const AVATAR_MODE: AvatarMode = {
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

const initialState: InitialState = {
  imgNaturalWidth: undefined,
  imgWidth: undefined,
};
const getCropperOptions = (cropMode: string) =>
  cropMode === "avatar" ? AVATAR_MODE : DEFAULT_MODE;

const ImageCrop = forwardRef<unknown, ImageCropProps>((props, ref) => {
  const [state, setState] = useState<InitialState>(initialState);
  const imgRef = useRef<HTMLImageElement>(null);

  const updateState = (nextState: Partial<InitialState>) =>
    setState((currentState) => ({ ...currentState, ...nextState }));

  useEffect(() => {
    if (imgRef.current && !state.cropper) {
      const { cropMode = "default" } = props as Props;
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
  const { alt, file, crossOrigin } = props as Props;

  useImperativeHandle(ref, () => ({
    zoomTo: (zoom: number) => {
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
