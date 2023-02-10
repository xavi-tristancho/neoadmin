import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Form from "@neoco/neoco-form";
import { Typography, Card, CardContent } from "@mui/material";
import { beforeSave } from "./utils";
import { getRoutePath } from "../../utils/routes";
import { isEmptyObject } from "../../utils/object";
import { getPageActionLiteral, getPageOneLiteral } from "../../languages/utils";
import useNotiAlert from "../../utils/NotiAlert/useNotiAlert";
import { ConfigContext } from "../../contexts";
import { useTheme } from "@mui/material/styles";

const getInitialState = (sections) =>
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

const ModelUpsert = ({ header, children }) => {
  const { config, setConfig } = useContext(ConfigContext);
  const theme = useTheme();
  const [state, setState] = useState({
    data: getInitialState(header.sections),
    aux: {},
  });
  const history = useHistory();
  const params = useParams();
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

  const updateState = (nextState) =>
    setState((currentState) => ({ ...currentState, ...nextState }));

  useEffect(() => {
    if (!isCreating) {
      findOneRequest({ id }).then((data) => updateState({ data }));
    }

    onMount().then((aux) => updateState({ aux }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const onSubmit = () => {
    return beforeSave({ header, state })
      .then(upsertRequest)
      .then((res) => {
        showSuccessAlert({ message: t("actions.savedCorrect") });
        history.push(`${path}/${id ? "" : res.id}`);
        return res;
      })
      .catch((error) => {
        console.error(error)
        showErrorAlert({ message: t("actions.savedFail") });
      });
  };

  const handleChange = (data) => {
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
            <Form
              headers={header}
              onSubmit={onSubmit}
              state={state}
              handleChange={handleChange}
              config={config}
              setConfig={setConfig}
              submitButtonProps={submitButtonProps}
            >
              {renderChildren}
            </Form>
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
