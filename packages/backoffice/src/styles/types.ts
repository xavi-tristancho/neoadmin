export type Common = {
  primary: { main: string; light: string; dark: string };
  secondary: { main: string; text: string };
  action: { main: string };
};

export type LightTheme = {
  palette: {
    mode: "light";
    primary: {
      main: string;
      light: string;
      dark: string;
    };
    secondary: {
      main: string;
      text: string;
    };
    action: {
      main: string;
    };
    neoAdmin: {
      login: {
        background: string;
        formBackground: string;
      };
      button: {
        background: string;
        color: string;
      };
      component: {
        background: string;
        color: string;
      };
      page: {
        backgroundColor: string;
      };
      sidebar: {
        backgroundColor: string;
      };
    };
  };
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: string;
        };
        toolbarContainer: {
          borderBottom: string;
          paddingBottom: string;
          marginBottom: string;
        };
        columnHeaders: {
          border: string;
        };
        cell: {
          border: string;
        };
        row: {
          "&:nth-of-type(odd)": {
            backgroundColor: string;
          };
          "&:hover": {
            cursor: string;
            backgroundColor: string;
          };
        };
      };
    };
  };
};

export type DarkTheme = {
  palette: {
    mode: "dark";
    primary: {
      main: string;
      light: string;
      dark: string;
      contrast: string;
    };
    secondary: {
      main: string;
      text: string;
    };
    action: {
      main: string;
    };
    neoAdmin: {
      login: {
        background: string;
        formBackground: string;
      };
      button: {
        background: string;
        color: string;
        "&&:hover": { background: string };
      };
      component: {
        background: string;
        color: string;
      };
      page: {
        backgroundColor: string;
      };
      sidebar: {
        backgroundColor: string;
      };
      navbar: {
        backgroundColor: string;
        backgroundImage: string;
        borderBottom: string;
      };
    };
  };
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: string;
        };
      };
    };
    MuiButton: {
      styleOverrides: {
        root: {
          color: string;
        };
      };
    };
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: string;
        };
        main: {
          backgroundColor: string;
        };
        toolbarContainer: {
          borderBottom: string;
          paddingBottom: string;
          marginBottom: string;
        };
        columnHeaders: {
          border: string;
        };
        cell: {
          border: string;
        };
        row: {
          "&:nth-of-type(odd)": {
            backgroundColor: string;
          };
          "&:hover": {
            cursor: string;
            backgroundColor: string;
          };
        };
        overlay: {
          backgroundColor: string;
        };
      };
    };
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&&": {
            color: string;
          };
        };
      };
    };
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          "&&": {
            borderColor: string;
          };
        };
      };
    };
    MuiAutocomplete: {
      styleOverrides: {
        listbox: {
          backgroundColor: string;
          "&& li[aria-selected=true]": {
            backgroundColor: string;
          };
        };
      };
    };
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: string;
        };
      };
    };
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: string;
        };
      };
    };
  };
};
