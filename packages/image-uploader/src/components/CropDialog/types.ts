export type InitialState = {
  data: null | {
    base64: string;
    file?: {
      name: string;
    };
  };
  inputRef: undefined | HTMLInputElement;
  sliderValue: number;
};

export type CropDialogProps = {
  source: { uri: string; name: string; file: File };
  onCroppedImage: (file?: Partial<File>) => void;
  onClose: () => void;
  title?: string;
};

export type HandleChangeProps = {
  target: {
    value: number;
  };
};

export type CropperRef = {
  removePhoto(): void;
  crop(): Promise<Blob>;
  props: {
    file: File;
  };
  zoomTo(value: number): void;
};
