import { act, renderHook } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";

import useNotiAlert from "./useNotiAlert";

const mockEnqueue = vi.fn();

vi.mock("notistack", () => ({
  useSnackbar: () => {
    return {
      enqueueSnackbar: mockEnqueue,
    };
  },
}));

describe("regarding useNotiAlert hook", () => {
  describe("regarding showSuccessAlert", () => {
    it("should call enqueueSnackbar with correct params", () => {
      const { result } = renderHook(() => useNotiAlert());
      act(() => {
        result.current.showSuccessAlert({ message: "test" });
      });
      expect(mockEnqueue).toHaveBeenCalledWith("test", { variant: "success" });
    });
  });

  describe("regarding showErrorAlert", () => {
    it("should call enqueueSnackbar with correct params", () => {
      const { result } = renderHook(() => useNotiAlert());
      act(() => {
        result.current.showErrorAlert({ message: "test" });
      });
      expect(mockEnqueue).toHaveBeenCalledWith("test", { variant: "error" });
    });
  });
});
