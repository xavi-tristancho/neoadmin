import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import ImageUploader, { getSrc } from "./ImageUploader";
import useImageUploader from "./useImageUploader";

type Source = {
  uri: string;
  name: string;
  file?: File;
};

type ImageFit = "cover" | "contain";

describe("Regarding getSrc function", () => {
  describe("when a valid source is passed", () => {
    it("should return a string", () => {
      const source = {
        uri: "https://example.com",
        name: "example",
      };

      const result = getSrc(source);
      expect(result).toBe(source.uri);
    });
  });
});

describe("regarding the 'useImageUploader' hook", () => {
  const source = {
    uri: "https://example.com",
    name: "example",
  };

  const initialState = {
    isEditing: false,
    localSource: source,
    nextImage: null,
    isDroping: false,
  };

  const { result } = renderHook(() =>
    useImageUploader({
      source,
      onChange: () => {
        return;
      },
    })
  );
  describe("regarding the 'state'", () => {
    it("should return the initialState", () => {
      expect(result.current.state).toEqual(initialState);
    });
  });

  describe("calling the handleOnClickEdit function", () => {
    it("should return the state with isEditing true", () => {
      const { result } = renderHook(() =>
        useImageUploader({
          source,
          onChange: () => {
            return;
          },
        })
      );

      act(() => {
        result.current.handleOnClickEdit();
      });

      expect(result.current.state).toEqual({
        ...initialState,
        isEditing: true,
      });
    });
  });

  describe("calling the handleOnClickEdit function and then the handleOnClose function", () => {
    it("should return the state with isEditing false", () => {
      const { result } = renderHook(() =>
        useImageUploader({
          source,
          onChange: () => {
            return;
          },
        })
      );

      act(() => {
        result.current.handleOnClickEdit();
      });

      act(() => {
        result.current.handleOnClose();
      });

      expect(result.current.state).toEqual({
        ...initialState,
        isEditing: false,
      });
    });
  });

  describe("calling the handleOnDragOver function", () => {
    it("should return the state with isDroping true", () => {
      const { result } = renderHook(() =>
        useImageUploader({
          source,
          onChange: () => {
            return;
          },
        })
      );

      const event = {
        preventDefault: () => {
          return;
        },
      } as React.DragEvent;

      act(() => {
        result.current.handleOnDragOver(event);
      });

      expect(result.current.state).toEqual({
        ...initialState,
        isDroping: true,
      });
    });
  });

  describe("calling the handleOnDragOver function and then the handleOnDragLeave function", () => {
    it("should return the state with isDroping true", () => {
      const { result } = renderHook(() =>
        useImageUploader({
          source,
          onChange: () => {
            return;
          },
        })
      );

      const event = {
        preventDefault: () => {
          return;
        },
      } as React.DragEvent;

      act(() => {
        result.current.handleOnDragOver(event);
      });

      act(() => {
        result.current.handleOnDragLeave();
      });

      expect(result.current.state).toEqual({
        ...initialState,
        isDroping: false,
      });
    });
  });

  describe("calling the handleOnDrop function", () => {
    it("should return the state with isDroping true", () => {
      const { result } = renderHook(() =>
        useImageUploader({
          source,
          onChange: () => {
            return;
          },
        })
      );

      const event = {
        preventDefault: () => {
          return;
        },
        dataTransfer: { files: [{ name: "newFile" }] },
      } as React.DragEvent;

      act(() => {
        result.current.handleOnDrop(event);
      });

      expect(result.current.state).toEqual({
        ...initialState,
        ...{
          isEditing: true,
          localSource: { file: { name: "newFile" } },
          isDroping: false,
        },
      });
    });
  });

  describe("regarding the 'hasImage' variable", () => {
    describe("when 'source' is provided", () => {
      it("should return true", () => {
        const source = {
          uri: "https://example.com",
          name: "example",
        };

        const { result } = renderHook(() =>
          useImageUploader({
            source,
            onChange: () => {
              return;
            },
          })
        );

        expect(result.current.hasImage).toEqual(true);
      });
    });

    describe("when 'source.uri' is null", () => {
      it("should return false", () => {
        const source = {
          uri: null,
          name: "example",
        };

        const { result } = renderHook(() =>
          useImageUploader({
            source,
            onChange: () => {
              return;
            },
          })
        );

        expect(result.current.hasImage).toEqual(false);
      });
    });
  });
});

describe("regarding the ImageUploader component", () => {
  it("should render the component", () => {
    const props = {};
    render(getElement(props));

    const element = screen.queryByTestId("image-uploader-test");
    expect(element).toBeInTheDocument();
  });

  describe("when 'canEdit' prop is false", () => {
    it("should not render the 'can-edit-test'", () => {
      const props = { canEdit: false };
      render(getElement(props));

      const element = screen.queryByTestId("can-edit-test");
      expect(element).not.toBeInTheDocument();
    });
  });

  describe("when 'onClick' the 'can-edit-test'", () => {
    it("should render the 'crop-dialog-test'", async () => {
      render(getElement({}));

      fireEvent.click(screen.queryByTestId("can-edit-test"));
      const element = await screen.findByTestId("crop-dialog-test");

      expect(element).toBeInTheDocument();
    });
  });
});

const getElement = (props: {
  onChange?: (file?: File) => void;
  canEdit?: boolean;
  editTitle?: string;
  dropPlaceholder?: string;
  uploadMessage?: string;
  source?: Source;
  containerStyle?: React.CSSProperties;
  imageFit?: ImageFit;
}) => <ImageUploader {...props} />;
