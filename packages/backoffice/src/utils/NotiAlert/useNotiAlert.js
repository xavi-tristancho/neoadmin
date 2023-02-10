import { useSnackbar } from "notistack";

const useNotiAlert = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showAlert = ({ message, type = "default" }) => {
    enqueueSnackbar(message, { variant: type });
  };

  const showSuccessAlert = ({ message }) =>
    showAlert({ message, type: "success" });

  const showErrorAlert = ({ message }) => showAlert({ message, type: "error" });

  return { showAlert, showSuccessAlert, showErrorAlert };
};

export default useNotiAlert;
