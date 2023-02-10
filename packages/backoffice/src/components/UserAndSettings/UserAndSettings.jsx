/* eslint-disable react/display-name */
import React, { useContext, useState } from "react";
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
import stringAvatar from "./utils";
import { AuthContext, ThemeModeContext } from "../../contexts";
import { useTranslation } from "react-i18next";

const languages = [
  { label: "ES", identifier: "esES" },
  { label: "EN", identifier: "enUS" },
];

const UserAndSettings = () => {
  const theme = useTheme();
  const colorMode = useContext(ThemeModeContext);
  const { user, logout } = useContext(AuthContext);
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    {
      Icon: () => <Translate fontSize="small" />,
      content: () => (
        <Languages>
          {languages.map(({ identifier, label }, index) => (
            <React.Fragment key={label}>
              <Language
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
      Icon: () => <PowerSettingsNew fontSize="small" />,
      content: "log out",
      onClick: logout,
    },
  ];

  return (
    <ContainerWrapper>
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
          {menuItems.map(({ Icon, content = "", onClick = () => {} }) => (
            <MenuItem onClick={onClick} key={content}>
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
  ${({ theme }) =>
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
  ${({ selected }) => selected && "font-weight: bold;"}
`;

const Separator = styled.span`
  margin: 0 10px;
`;

export default UserAndSettings;
