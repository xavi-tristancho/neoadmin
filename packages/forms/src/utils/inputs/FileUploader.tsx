import React, { useRef } from "react";
import styled from "styled-components";
import { Button, Theme } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Delete } from "@mui/icons-material";
import { unknownObject } from "@neoco/neoco-backoffice/src/types";
import { Field } from "../../types";

export type State = { data: unknownObject; aux: unknownObject };

type FileUploaderProps = {
  field: Field;
  state: State;
  format: ({ state, field }: { state: State; field: Field }) => unknown;
  fieldHandleChange: ({
    target,
  }: {
    target: {
      name: string;
      value: unknownObject;
    };
  }) => void;
};

const FileUploader = ({
  field,
  state,
  format,
  fieldHandleChange,
}: FileUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();
  const currentFileName: unknownObject = format({ state, field });
  const areThereFiles: number =
    currentFileName?.length || inputRef?.current?.files.length;
  const icon: JSX.Element = field?.icon;
  const fileName: unknown =
    inputRef?.current?.files && inputRef?.current?.files.length
      ? inputRef?.current?.files[0].name
      : currentFileName
      ? currentFileName
      : "";

  return (
    <>
      <FieldLabel>{field.label}</FieldLabel>
      <Container data-testid={"file-uploader-second-element-test"}>
        <Button
          onClick={(e) => {
            e.preventDefault();
            inputRef?.current?.click();
          }}
          variant="contained"
        >
          {icon ? icon : "UPLOAD"}
        </Button>
        {areThereFiles ? (
          <FilesContainer>
            <DeleteButton
              onClick={(e) => {
                e.target.value = null;
                e.preventDefault();
                inputRef.current.value = "";

                fieldHandleChange({
                  target: {
                    name: field.name || field.property,
                    value: null,
                  },
                });
              }}
              theme={theme}
            />
            <FileName theme={theme}>{fileName}</FileName>
          </FilesContainer>
        ) : (
          <></>
        )}
      </Container>
      <FileInput
        data-testid={"file-input-test"}
        ref={inputRef}
        type="file"
        accept={field.type === "file-pdf" ? "application/pdf" : "*"}
        onChange={({ target }) => {
          const files: FileList = target.files;
          const filesArr: File[] = Array.prototype.slice.call(files) as File[];

          if (filesArr.length) {
            fileToBase64(filesArr[0])
              .then((file) => {
                fieldHandleChange({
                  target: {
                    name: field.name || field.property,
                    value: file,
                  },
                });
              })
              .catch((error) => console.log(error));
          } else {
            fieldHandleChange({
              target: {
                name: field.name || field.property,
                value: null,
              },
            });
          }
        }}
      />
    </>
  );
};

const FieldLabel = styled.label`
  color: #9da1a7;
  font-size: 14px;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  margin-bottom: 10px;
`;

const Container = styled.div`
  margin-top: 6px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const FilesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-left: 5px;
  border-radius: 4px;
  background: rgba(175, 175, 175, 0.15);
  padding: 5px;
  padding-right: 10px;
`;

const DeleteButton = styled(Delete)`
  margin: 0px 5px;
  cursor: pointer;
  color: ${({ theme }: { theme: Theme }) =>
    theme?.palette?.error?.main || "red"};
`;

const FileName = styled.span`
  font-style: italic;
  font-size: 14px;
  padding-left: 5px;
`;

const FileInput = styled.input`
  height: 0;
  width: 0;
`;

const fileToBase64 = (file: Blob) =>
  new Promise((resolve, reject) => {
    try {
      if (!file) {
        reject();
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const { name, type } = file;
        resolve({
          name,
          type,
          size: `${Math.round(file.size / 1000)} kB`,
          base64: reader.result,
          file,
        });
      };
    } catch (error) {
      reject(error);
    }
  });

export default FileUploader;
