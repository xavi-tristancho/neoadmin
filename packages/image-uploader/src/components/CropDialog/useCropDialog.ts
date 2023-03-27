import { useRef, useState, useEffect, useCallback } from "react";
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

type CropperRef = {
  removePhoto(): void;
  crop(): Promise<Blob>;
  props: {
    file: File;
  };
  zoomTo(value: number): void;
};

const initialState: InitialState = {
  data: null,
  inputRef: undefined,
  sliderValue: 0,
};

const useCropDialogState = ({
  source,
  onCroppedImage,
}: {
  source: { uri?: string; name?: string; file?: File };
  onCroppedImage: (file?: Partial<File>) => void;
}) => {
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

  const onFileSelected = (file: File) => {
    fileToBase64(file)
      .then(({ base64 }) => {
        updateState({
          data: { file, base64 },
          sliderValue: initialState.sliderValue,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (_event: Event, value: number | number[]) => {
    if (typeof value === "number") {
      cropperRef.current?.zoomTo(value / 100);
      updateState({ sliderValue: value });
    }
  };

  return {
    state,
    onRemoveImageClick,
    onLocalCroppedImage,
    onFileSelected,
    handleChange,
    handleInputRef,
    cropperRef,
    onUploadImageClick,
  };
};

export default useCropDialogState;
