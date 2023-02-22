import { useSnackbar, VariantType } from "notistack";

const useNotiAlert = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showAlert = ({
    message,
    type = "default",
  }: {
    message: string;
    type?: VariantType;
  }) => {
    enqueueSnackbar(message, { variant: type });
  };

  const showSuccessAlert = ({ message }: { message: string }) =>
    showAlert({ message, type: "success" });

  const showErrorAlert = ({ message }: { message: string }) =>
    showAlert({ message, type: "error" });

  return { showAlert, showSuccessAlert, showErrorAlert };
};

export default useNotiAlert;
