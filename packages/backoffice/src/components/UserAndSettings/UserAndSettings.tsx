import React, { useState } from "react";
import styled from "styled-components";
import { IconButton, Avatar, Menu, MenuItem } from "@mui/material";
import {
  PowerSettingsNew,
  Settings,
  Brightness4,
  Brightness7,
  Translate,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useAuth, useThemeMode } from "../../contexts";
import { Theme } from "../../styles/theme";
import stringAvatar from "./utils";

type Language = {
  label: string;
  identifier: string;
};

type MenuItem = {
  id: string;
  Icon: React.ElementType;
  content?: (() => React.ReactNode) | string;
  onClick?: () => void;
};

const languages: Language[] = [
  { label: "ES", identifier: "esES" },
  { label: "EN", identifier: "enUS" },
];

const UserAndSettings = (): JSX.Element => {
  const theme = useTheme();
  const colorMode = useThemeMode();
  const { user, logout } = useAuth();
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems: MenuItem[] = [
    {
      id: "language",
      Icon: () => <Translate fontSize="small" />,
      content: () => (
        <Languages>
          {languages.map(({ identifier, label }, index) => (
            <React.Fragment key={label}>
              <Language
                //eslint-disable-next-line
                onClick={() => i18n.changeLanguage(identifier)}
                selected={i18n.language === identifier}
              >
                {label}
              </Language>
              {index < languages.length - 1 && <Separator>|</Separator>}
            </React.Fragment>
          ))}
        </Languages>
      ),
    },
    {
      id: "color-mode",
      Icon: () =>
        theme.palette.mode === "dark" ? (
          <Brightness7 fontSize="small" />
        ) : (
          <Brightness4 fontSize="small" />
        ),
      content: theme.palette.mode === "dark" ? "light" : "dark",
      onClick: colorMode.toggleColorMode,
    },
    {
      id: "logout",
      Icon: () => <PowerSettingsNew fontSize="small" />,
      content: "log out",
      onClick: logout,
    },
  ];

  return (
    <ContainerWrapper data-testid="user-and-settings">
      <Container theme={theme}>
        <Avatar {...stringAvatar(user?.name)} />
        <IconButton
          sx={{
            color: "#ffffff",
            width: "30px",
            height: "30px",
            margin: "3px",
            "&:hover": { background: "rgba(52, 73, 85, 0.5)" },
          }}
          aria-label="settings"
          component="span"
          onClick={handleClick}
        >
          <Settings />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {menuItems.map(({ id, Icon, content = "", onClick }) => (
            <MenuItem onClick={onClick} key={id}>
              <IconContainer>
                <IconButton
                  sx={{
                    width: "30px",
                    height: "30px",
                  }}
                  component="span"
                  color="inherit"
                >
                  <Icon />
                </IconButton>
              </IconContainer>
              <LabelContainer>
                {typeof content === "function" ? content() : content}
              </LabelContainer>
            </MenuItem>
          ))}
        </Menu>
      </Container>
    </ContainerWrapper>
  );
};

const ContainerWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2px;
  position: relative;
  width: 71px;
  height: 36px;
  ${({ theme }: { theme: Theme }) =>
    theme?.palette?.neoAdmin?.component?.background
      ? `background: ${theme?.palette?.neoAdmin?.component?.background};`
      : ""}
  border-radius: 50px;
`;

const IconContainer = styled.div``;
const LabelContainer = styled.div`
  margin: 0 15px;
`;

const Languages = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Language = styled.div`
  ${({ selected }: { selected: boolean }) => selected && "font-weight: bold;"}
`;

const Separator = styled.span`
  margin: 0 10px;
`;

export default UserAndSettings;
