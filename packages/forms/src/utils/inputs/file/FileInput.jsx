import React, { useRef } from "react";
import { defaultFormat } from "..";
import styled from "styled-components";
import DefaultButton from "@mui/material/Button";

const FileInput = ({ state, field, handleChange }) => {
  const format = field.upsertOptions?.format || defaultFormat;
  const inputRef = useRef(null);
  const icon = field?.icon;
  const files = format({ state, field }) || [];
  const isMulti = field?.isMulti || field?.relation?.isMulti;

  return (
    <>
      <InputLabel>{field.label}</InputLabel>
      <Container>
        <Button
          onClick={(e) => {
            e.preventDefault();
            inputRef?.current?.click();
          }}
        >
          {icon ? icon : "UPLOAD"}
        </Button>
        {files.length ? (
          <UnsortedListContainer>
            <UnsortedList>
              {files.map((file, index) => (
                <ListItem
                  key={index}
                  item={file}
                  index={index}
                  deleteItem={() =>
                    handleChange({
                      target: {
                        name: field.name || field.property,
                        value: files.filter((_, i) => index != i),
                      },
                    })
                  }
                />
              ))}
            </UnsortedList>
          </UnsortedListContainer>
        ) : (
          <></>
        )}
      </Container>
      <input
        ref={inputRef}
        type="file"
        multiple={isMulti}
        style={{ width: 0, height: 0 }}
        accept={field.type === "file-pdf" ? "application/pdf" : "*"}
        onChange={({ target }) => {
          const targetFiles = target.files;
          const newFiles = [...targetFiles].filter(
            (file) => !files.some((f) => f.name == file.name)
          );
          let filesArr = Array.prototype.slice.call(newFiles);
          if (filesArr.length) {
            Promise.all(filesArr.map((file) => fileToBase64(file))).then(
              (newfiles) => {
                handleChange({
                  target: {
                    name: field.name || field.property,
                    value: [...files, ...newfiles],
                  },
                });
              }
            );
          }
        }}
      />
    </>
  );
};

const ListItem = ({ item, deleteItem }) => {
  const { name } = item;

  return (
    <ItemListContainer>
      <LabelContainer>
        <Label>{name.substring(0, 20)}</Label>
        {name.length >= 21 ? "..." : ""}
      </LabelContainer>
      <button type="button" className="close" onClick={deleteItem}>
        &times;
      </button>
    </ItemListContainer>
  );
};

const InputLabel = styled.label``;
const Button = styled(DefaultButton)`
  ${({ theme, color }) => ({
    [theme?.breakpoints?.down("sm")]: {
      marginTop: 20,
    },
    [theme?.breakpoints?.up("sm")]: {
      margin: 8,
    },
  })}
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #efefef;
  width: 360px;
  height: 130px;
  margin-top: 8px;
  border-radius: 8px;
  ${({ theme, color }) => ({
    [theme?.breakpoints?.down("sm")]: {
      flexDirection: "column",
      width: "100%",
      height: 200,
      margin: 0,
      padding: 0,
      marginTop: 6,
    },
    [theme?.breakpoints?.up("sm")]: {
      flexDirection: "row",
      maxWidth: 350,
    },
  })}
`;

const UnsortedListContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const UnsortedList = styled.ul`
  padding: 0;
  width: 100%;
  height: 130px;
  overflow: scroll;
  overflow-x: hidden;
  align-items: space-between;
  justify-content: flex-end;
  flex-direction: column;
`;

const ItemListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  background-color: white;
  margin: 0;
  padding: 0;
  margin-bottom: 3px;
  &:-webkit-scrollbar {
    display: none;
  }

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Label = styled.label`
  margin: 0;
  height: 18px;
  width: 90%;
  overflow: hidden;
  max-width: 24ch;
`;
const LabelContainer = styled.label`
  margin: 4px;
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

export default FileInput;
