const common = {
  primary: { main: "#344955", light: "#5F7481", dark: "#0B222C" },
  secondary: { main: "#FF9900", text: "rgba(0, 0, 0, 0.6)" },
  action: { main: "#757575" },
};

const lightTheme = {
  palette: {
    mode: "light",
    primary: {
      ...common.primary,
    },
    secondary: {
      ...common.secondary,
    },
    action: { ...common.action },
    neoAdmin: {
      login: { background: "#5F7481", formBackground: "#FFFFFF" },
      button: { background: "#25333C", color: "#FFFFFF" },
      component: { background: "#25333C", color: "#FFFFFF" },
      page: { backgroundColor: "#FAFAFA" },
      sidebar: { backgroundColor: "#FFFFFF" },
    },
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: { border: "none" },
        toolbarContainer: {
          borderBottom: "1px solid rgba(52, 73, 85, 0.08)",
          paddingBottom: "0.5rem",
          marginBottom: "0.5rem",
        },
        columnHeaders: { border: "none" },
        cell: { border: "none" },
        row: {
          "&:nth-of-type(odd)": {
            backgroundColor: "rgba(52, 73, 85, 0.08)",
          },
          "&:hover": {
            cursor: "pointer",
            backgroundColor: "rgba(200,200,200,0.2)",
          },
        },
      },
    },
  },
};

const darkTheme = {
  palette: {
    mode: "dark",
    primary: {
      ...common.primary,
      contrast: "#FFFFFF",
    },
    secondary: {
      ...common.secondary,
    },
    action: { ...common.action },
    neoAdmin: {
      login: { background: "#FF9900", formBackground: "#0B222C" },
      button: {
        background: "#FFFFFF",
        color: "#000000",
        "&&:hover": { background: "rgba(255,255,255,0.7)" },
      },
      component: { background: "#25333C", color: "#FFFFFF" },
      page: { backgroundColor: "#0B222C" },
      sidebar: { backgroundColor: "#0B222C" },
      navbar: {
        backgroundColor: "#0B222C",
        backgroundImage: "none",
        borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
      },
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: { background: "rgba(52, 73, 85, 0.5)" },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { color: "#ffffff" },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: { border: "none" },
        main: { backgroundColor: "rgba(52, 73, 85, 0.08)" },
        toolbarContainer: {
          borderBottom: "1px solid rgba(52, 73, 85, 0.5)",
          paddingBottom: "0.5rem",
          marginBottom: "0.5rem",
        },
        columnHeaders: { border: "none" },
        cell: { border: "none" },
        row: {
          "&:nth-of-type(odd)": {
            backgroundColor: "rgba(52, 73, 85, 0.5)",
          },
          "&:hover": {
            cursor: "pointer",
            backgroundColor: "rgba(200,200,200,0.2)",
          },
        },
        overlay: { backgroundColor: "transparent" },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { "&&": { color: "#ffffff" } },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          "&&": { borderColor: "#ffffff !important" },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        listbox: {
          backgroundColor: common.primary.main,
          "&& li[aria-selected=true]": {
            backgroundColor: "rgba(0, 0, 0, 0.08) !important",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundColor: common.primary.main },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { background: "#212121" },
      },
    },
  },
};

export { lightTheme, darkTheme };
export default { lightTheme, darkTheme };
