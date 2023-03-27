import { renderHook } from "@testing-library/react";
import "@testing-library/jest-dom";
// import CropDialog from "./CropDialog";
import useCropDialogState from "./useCropDialog";

describe("regarding the useCropDialog hook", () => {
  describe("regarding the state", () => {
    it("should return the initial State", () => {
      const initialState = {
        data: null,
        inputRef: undefined,
        sliderValue: 0,
      };
      const source = {};

      const { result } = renderHook(() =>
        useCropDialogState({
          source,
          onCroppedImage: () => {
            return;
          },
        })
      );

      expect(result.current.state).toEqual(initialState);
    });
  });
});

// const getElement = (props: {
//   source: { uri?: string; name?: string; file?: File };
//   onCroppedImage: (file?: Partial<File>) => void;
//   onClose: () => void;
//   title?: string;
//   open: boolean;
// }) => <CropDialog {...props} />;
