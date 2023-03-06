export type DefaultMode = {
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

export type AvatarMode = {
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

export type InitialState = {
  imgNaturalWidth: undefined | number;
  imgWidth: undefined | number;
  cropper?: undefined | Cropper;
};

export type Props = {
  alt?: string;
  file?: {
    base64: string;
  };
  crossOrigin?: string;
  cropMode?: string;
};

export type ImageCropProps = {
  type: string;
  props: Props;
  file?: {
    base64: string;
  };
};
