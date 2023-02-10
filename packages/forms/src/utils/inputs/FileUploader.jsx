import React, { useRef } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Delete } from "@mui/icons-material";

const FileUploader = ({ field, state, format, fieldHandleChange }) => {
  const inputRef = useRef(null);
  const theme = useTheme();
  const currentFileName = format({ state, field });
  const areThereFiles =
    currentFileName?.length || inputRef?.current?.files.length;
  const icon = field?.icon;
  const fileName =
    inputRef?.current?.files && inputRef?.current?.files.length
      ? inputRef?.current?.files[0].name
      : currentFileName
      ? currentFileName
      : "";

  return (
    <>
      <FieldLabel>{field.label}</FieldLabel>
      <Container>
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
        ref={inputRef}
        type="file"
        accept={field.type === "file-pdf" ? "application/pdf" : "*"}
        onChange={({ target }) => {
          const files = target.files;
          const filesArr = Array.prototype.slice.call(files);

          if (filesArr.length) {
            fileToBase64(filesArr[0]).then((file) => {
              fieldHandleChange({
                target: {
                  name: field.name || field.property,
                  value: file,
                },
              });
            });
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
  color: ${({ theme }) => theme?.palette?.error?.main || "red"};
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

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    try {
      if (!file) {
        reject();
      }
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const { name, type } = file;
        resolve({
          name,
          type,
          size: Math.round(file.size / 1000 + "kB"),
          base64: reader.result,
          file,
        });
      };
    } catch (error) {
      reject(error);
    }
  });

export default FileUploader;
