import { useState } from "react";
import { styled as muiStyled, useTheme } from "@mui/material/styles";
import {
  Box,
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  Toolbar,
  CssBaseline,
  Typography,
  IconButton,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import UserAndSettings from "../UserAndSettings";
import { Config, unknownObject } from "../../types";
import { useConfig } from "../../contexts/ConfigContext";
import { Theme } from "../../styles/theme";

const drawerWidth = 240;
const appBarHeight = 52;
const appBarMinMaxHeight = {
  maxHeight: `${appBarHeight}px !important`,
  minHeight: `${appBarHeight}px !important`,
};

type SidebarProps = {
  appBarTitle?: string;
  children: React.ReactNode;
};

type ConfigSidebar = {
  config: Partial<Config>;
};

const Sidebar = ({ appBarTitle = "", children }: SidebarProps) => {
  const [open, setOpen] = useState(true);
  const { config: { CompanyLogo } = {} } = useConfig() as ConfigSidebar;
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <StyledToolbar>
          <Title>{CompanyLogo && <CompanyLogo />}</Title>
          <StyledIconButton
            color={
              open && theme.palette.mode !== "light" ? "primary" : "inherit"
            }
            aria-label="open drawer"
            onClick={() => setOpen(!open)}
            edge="start"
            open={open}
          >
            <MenuIcon />
          </StyledIconButton>
          <Typography variant="h6" noWrap component="div">
            {appBarTitle}
          </Typography>
          <UserAndSettings />
        </StyledToolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader />
        {children}
      </Drawer>
    </Box>
  );
};

const commonStyles = (theme: Theme): unknownObject => ({
  "&& .MuiDrawer-paper": {
    backgroundColor:
      theme?.palette?.neoAdmin?.sidebar?.backgroundColor || "#ffffff",
  },
});

const openedMixin = (theme: Theme): unknownObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  ...commonStyles(theme),
});

const closedMixin = (theme: Theme): unknownObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(56px + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(72px + 1px)`,
  },
  ...commonStyles(theme),
});

const DrawerHeader = muiStyled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: theme.spacing(0, 1),
  backgroundColor: theme.palette.primary.main,
  ...theme.mixins.toolbar,
  ...appBarMinMaxHeight,
}));

const AppBar = muiStyled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ theme?: Theme; open: boolean }>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  display: "flex",
  justifyContent: "center",
  boxShadow: "none",
  ...(theme?.palette?.neoAdmin?.navbar ? theme?.palette?.neoAdmin?.navbar : {}),
  ...appBarMinMaxHeight,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const Drawer = muiStyled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ theme?: Theme; open: boolean }>(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const StyledToolbar = muiStyled(Toolbar)(() => ({
  display: "flex",
  paddingLeft: "0px !important",
}));

const Title = muiStyled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  color: "#ffffff",
  paddingLeft: 17,
  minWidth: drawerWidth,
  maxWidth: drawerWidth,
}));

const StyledIconButton = muiStyled(IconButton, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ theme?: Theme; open: boolean }>(({ theme, open }) => ({
  marginLeft: "-20px",
  ...(open && {
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.primary.light
        : theme.palette.primary.contrast,
    ...(theme?.palette?.neoAdmin?.component?.["&&:hover"]
      ? { "&&:hover": theme.palette.neoAdmin.component["&&:hover"] as string }
      : {}),
  }),
}));

export default Sidebar;
