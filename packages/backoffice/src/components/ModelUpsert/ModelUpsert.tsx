import { useState, useEffect } from "react";
import styled from "styled-components";
import { useTheme } from "@mui/material/styles";
import { Typography, Card, CardContent } from "@mui/material";
import { FormGenerator } from "@neoco/neoco-form";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import { Header, Section, unknownObject } from "../../types";
import { getRoutePath } from "../../utils/routes";
import { isEmptyObject } from "../../utils/object";
import { getPageActionLiteral, getPageOneLiteral } from "../../languages/utils";
import useNotiAlert from "../../utils/NotiAlert/useNotiAlert";
import { useConfig } from "../../contexts";
import { beforeSave } from "./utils";

type Params = { id?: string };

type State = { data: unknownObject; aux: unknownObject };

const getInitialState = (sections: Section[]): unknownObject =>
  sections.reduce(
    (reducer, { fields }) => ({
      ...reducer,
      ...fields?.reduce(
        (fieldsReducer, { property, upsertOptions }) => ({
          ...fieldsReducer,
          ...(upsertOptions?.value ? { [property]: upsertOptions.value } : {}),
        }),
        {}
      ),
    }),
    {}
  );

const ModelUpsert = ({
  header,
  children,
}: {
  header: Header;
  children: JSX.Element;
}): JSX.Element => {
  const { config, updateConfig } = useConfig();
  const theme = useTheme();
  const [state, setState] = useState<State>({
    data: getInitialState(header.sections),
    aux: {},
  });
  const history = useHistory();
  const params = useParams<Params>();
  const { t } = useTranslation();

  const {
    findOneRequest = () => Promise.resolve(),
    upsertRequest = () => Promise.resolve(),
  } = header.options?.requests || {};

  const {
    upsertOptions: {
      onMount = () => Promise.resolve(),
      renderBefore = () => <></>,
      renderAfter = () => <></>,
    } = {},
  } = header.options;

  const { id } = params;
  const isCreating = typeof id === "undefined";
  const path = getRoutePath(header.options.route);
  const renderChildren = children || header.options?.upsertOptions?.children;
  const { showSuccessAlert, showErrorAlert } = useNotiAlert();

  const updateState = (nextState: State) =>
    setState((currentState) => ({ ...currentState, ...nextState }));

  useEffect(() => {
    if (!isCreating) {
      findOneRequest({ id })
        .then((data: unknownObject) => updateState({ data }))
        .catch((error) => console.log(error));
    }

    onMount()
      .then((aux: unknownObject) => updateState({ aux }))
      .catch((error) => console.log(error));
  }, [params.id]);

  const onSubmit = () => {
    return beforeSave({ header, state })
      .then(upsertRequest)
      .then((res: { id: string } & unknownObject) => {
        showSuccessAlert({ message: t("actions.savedCorrect") });
        history.push(`${path}/${id ? "" : res.id}`);
        return res;
      })
      .catch((error) => {
        console.error(error);
        showErrorAlert({ message: t("actions.savedFail") });
      });
  };

  const handleChange = (data: unknownObject) => {
    updateState({ data: { ...state.data, ...data } });
  };

  const submitButtonProps = {
    sx: {
      backgroundColor: theme.palette.secondary?.main,
      color: theme.palette.primary?.dark,
    },
  };

  return (
    <>
      <TitleContainer>
        <Typography variant="h3" component="h1">
          {t(getPageActionLiteral(id))}{" "}
          {getPageOneLiteral({ t, page: header.options?.name })}
        </Typography>
      </TitleContainer>
      {typeof renderBefore === "function"
        ? renderBefore({ state })
        : renderBefore}
      <Card>
        <CardContent>
          {isCreating || (!isCreating && !isEmptyObject(state.data)) ? (
            <FormGenerator
              sections={header.sections}
              onSubmit={onSubmit}
              state={state}
              handleChange={handleChange}
              config={config}
              setConfig={updateConfig}
              submitButtonProps={submitButtonProps}
            >
              {renderChildren}
            </FormGenerator>
          ) : (
            <></>
          )}
        </CardContent>
      </Card>
      {typeof renderAfter === "function" ? renderAfter({ state }) : renderAfter}
    </>
  );
};

const TitleContainer = styled.div`
  display: flex;
  margin: 20px 0;
`;

export default ModelUpsert;
