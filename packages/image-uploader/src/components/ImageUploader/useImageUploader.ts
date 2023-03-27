import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { fileToBase64 } from "../../utils/file";
import { Source } from "./ImageUploader";

type State = {
  isEditing: boolean;
  localSource: Partial<Source>;
  nextImage: { src: string } | null;
  isDroping: boolean;
};

const useImageUploader = ({
  source,
  onChange,
}: {
  source: Source;
  onChange?: (file?: File) => void;
}) => {
  const [state, setState] = useState<State>({
    isEditing: false,
    localSource: source,
    nextImage: null,
    isDroping: false,
  });

  const theme = useTheme();

  const getSrc = (source: Source) => {
    if (source && source.uri) {
      return source.uri;
    }
    return null;
  };

  const image = state.nextImage || {
    src: getSrc(source),
  };

  const hasImage = !!image.src;

  const updateState = (nextState: Partial<State>) =>
    setState((currentState) => ({ ...currentState, ...nextState }));

  const onCroppedImage = (file: File) => {
    updateState({ isEditing: false });

    if (file) {
      fileToBase64(file)
        .then(({ base64 }) => {
          updateState({ nextImage: { src: base64 } });
          onChange(file);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      updateState({ nextImage: { src: null } });
      onChange();
    }
  };

  const handleOnDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    updateState({ isDroping: true });
  };

  const handleOnDragLeave = () => {
    updateState({ isDroping: false });
  };

  const handleOnDrop = (e: React.DragEvent) => {
    e.preventDefault();
    updateState({
      isEditing: true,
      localSource: { file: e.dataTransfer?.files?.[0] },
      isDroping: false,
    });
  };

  const handleOnClose = () => updateState({ isEditing: false });

  const handleOnClickEdit = () => updateState({ isEditing: true });

  return {
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
    getSrc,
  };
};

export default useImageUploader;
