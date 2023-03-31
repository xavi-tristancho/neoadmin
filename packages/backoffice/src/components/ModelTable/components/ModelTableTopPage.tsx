import styled from "styled-components";
import { Link } from "react-router-dom";
import { Theme } from "@neoco/neoco-backoffice/src/styles/theme";
import { useTranslation } from "react-i18next";
import { Typography, CardActions, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import {
  getPageNewLiteral,
  getPageTitleLiteral,
} from "../../../languages/utils";

type ModelTableTopPageProps = {
  pageName: string;
  isCreatable: boolean;
  path: string;
};

const ModelTableTopPage = ({
  pageName,
  isCreatable,
  path,
}: ModelTableTopPageProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <TitleAndActionsContainer data-testid="model-table-top-page">
      <Typography variant="h3" component="h1">
        {getPageTitleLiteral({ t, page: pageName })}
      </Typography>
      <CustomCardActions>
        <ControlsContainer>
          {isCreatable && (
            <ButtonContainer>
              <CustomLink to={`${path}/new`}>
                <CustomButton color="primary" variant="contained" theme={theme}>
                  <AddIcon data-testid="add-button" />
                  {getPageNewLiteral({ t, page: pageName })}
                </CustomButton>
              </CustomLink>
            </ButtonContainer>
          )}
        </ControlsContainer>
      </CustomCardActions>
    </TitleAndActionsContainer>
  );
};

const TitleAndActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;

const CustomCardActions = styled(CardActions)`
  && {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;

const ControlsContainer = styled.div``;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CustomLink = styled(Link)`
  text-decoration: none;
`;

const CustomButton = styled(styled(Button)`
  && {
    border-radius: 50px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.4px;
    text-transform: uppercase;
    box-shadow: none;
    padding-left: 12px;
  }
`)(({ theme }: { theme: Theme }) => ({
  ...(theme?.palette?.neoAdmin?.button
    ? { "&&": theme?.palette?.neoAdmin?.button }
    : {}),
}));

export default ModelTableTopPage;
