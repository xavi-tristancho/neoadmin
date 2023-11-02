import React from "react";
import Input from "./Input";
import FileUploader from "./FileUploader";
import DatePicker from "./DatePicker";
import Checkbox from "./Checkbox";
import MultiSelect from "./multi-select/MultiSelect";
import { Editor } from "@tinymce/tinymce-react";
import ImageUploader from "@app-artisans/image-uploader";
import { multiselect } from "./multi-select/multi-select";
import date from "./date/date";
import RelationListInput from "./relation-list/RelationListInput";
import styled from "styled-components";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import radiogroup from "./radiogroup";
import { getFromat, getHandleChange, getDisabled } from "../inputMapper";
import { isFunction } from "../common";

export const inputMapper = (props) => {
  const { field, state, handleChange = () => {}, config = {} } = props;
  const format = getFromat({ field });
  const fieldHandleChange = getHandleChange({ field, handleChange });
  const disabled = getDisabled({ field, state });
  const commonInputProps = { size: "small" };

  if (isFunction(field?.upsertOptions?.component))
    return field.upsertOptions.component(props);

  switch (field.type) {
    case "textarea":
      return (
        <Input
          {...commonInputProps}
          multiline={true}
          onChange={fieldHandleChange}
          rows={5}
          value={format({ state, field })}
          {...field}
          disabled={disabled}
        />
      );

    case "checkbox":
      return (
        <Checkbox
          onChange={({ target }) => {
            fieldHandleChange({
              target: {
                name: field.name || field.property,
                value: target.checked,
              },
            });
          }}
          checked={format({ state, field })}
          label={field.label}
          {...field}
          disabled={disabled}
        />
      );

    case "email":
      return (
        <Input
          {...commonInputProps}
          onChange={fieldHandleChange}
          value={format({ state, field })}
          inputProps={{
            pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
          }}
          {...field}
          disabled={disabled}
        />
      );

    case "image":
      const data = format({ state, field });

      return (
        <>
          <Label>{field.label}</Label>
          <ImageUploader
            editTitle="Edit"
            addTitle="ADD"
            onChange={(receivedData) => {
              fieldHandleChange({
                target: {
                  name: field.name || field.property,
                  value: receivedData,
                },
              });
            }}
            source={{
              ...(typeof data === "string" && {
                uri: data,
                name: state.data[field.property],
              }),
              ...(typeof data === "object" && {
                file: data,
                name: state.data[field.property],
              }),
            }}
            label={field.label}
          />
        </>
      );

    case "file":
    case "file-pdf":
      return (
        <FileUploader
          field={field}
          state={state}
          format={format}
          fieldHandleChange={fieldHandleChange}
        />
      );

    case "date":
      const dateProps = date({
        field,
        state,
        handleChange: fieldHandleChange,
        format,
      });
      return (
        <DatePicker
          renderInputProps={commonInputProps}
          {...dateProps}
          disabled={disabled}
        />
      );

    case "datetime-local": {
      const dateTimeProps = date({
        field,
        state,
        handleChange: fieldHandleChange,
        format,
        toFormat: "yyyy-MM-dd'T'HH:mm",
      });

      return (
        <DatePicker
          renderInputProps={commonInputProps}
          pickerType={"dateAndTime"}
          {...dateTimeProps}
          disabled={disabled}
        />
      );
    }

    case "time": {
      const timeProps = date({
        field,
        state,
        handleChange: fieldHandleChange,
        format,
        toFormat: "HH:mm",
      });

      return (
        <DatePicker
          renderInputProps={commonInputProps}
          pickerType={"time"}
          ampm={false}
          {...timeProps}
          disabled={disabled}
        />
      );
    }

    case "multiselect": {
      const multiselectProps = multiselect({
        field,
        state,
        handleChange: fieldHandleChange,
      });

      return (
        <MultiSelect
          {...commonInputProps}
          {...field}
          {...multiselectProps}
          disabled={disabled}
          options={
            isFunction(multiselectProps.options)
              ? //This is for the use case where some options are derived from another prop in the state
                //TODO: add test that covers the use case and remove this comment
                multiselectProps.options({ state, field })
              : multiselectProps.options
          }
        />
      );
    }

    case "radiogroup": {
      const radiogroupProps = radiogroup({
        field,
        state,
        handleChange: fieldHandleChange,
      });

      const control = field.control || <Radio color={field.color} />;
      return (
        <FormControl component="fieldset">
          <FormLabel component="legend">{field.label}</FormLabel>
          <RadioGroup name="radio-buttons-group" {...radiogroupProps}>
            {field.options.map((optionsField) => (
              <FormControlLabel
                key={optionsField.label}
                control={control}
                {...optionsField}
              />
            ))}
          </RadioGroup>
        </FormControl>
      );
    }

    case "html": {
      const value =
        typeof field.value === "function"
          ? field.value({ field, state })
          : state.data[field.property];
      return (
        <>
          <Label>{field.label}</Label>
          <div style={{ marginTop: 10, marginBottom: 20 }}>
            <Editor
              init={{
                language: "es",
                selector: "textarea#full-featured",
                plugins:
                  "print preview importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons code",
                menubar:
                  "file edit view insert format tools table tc help code",
                toolbar:
                  "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment",
                autosave_ask_before_unload: true,
                autosave_interval: "30s",
                autosave_prefix: "{path}{query}-{id}-",
                autosave_restore_when_empty: false,
                autosave_retention: "2m",
                image_advtab: true,
                images_upload_url: field.imageUploadURL,
                images_upload_handler: field.onImageUpload,
                importcss_append: true,
                height: 600,
                image_caption: true,
                quickbars_selection_toolbar:
                  "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
                noneditable_noneditable_class: "mceNonEditable",
                toolbar_mode: "sliding",
                content_style: ".mymention{ color: gray; }",
                contextmenu:
                  "link image imagetools table configurepermanentpen",
                a11y_advanced_options: true,
                ...field.controlProps?.init,
              }}
              value={value}
              onEditorChange={(content) =>
                fieldHandleChange({
                  target: {
                    name: field.name || field.property,
                    value: content,
                  },
                })
              }
              {...(config?.wysiwyg || {})}
            />
          </div>
        </>
      );
    }

    case "relation-list": {
      return (
        <RelationListInput
          onChange={(value) => {
            fieldHandleChange({
              target: {
                name: field.name || field.property,
                value,
              },
            });
          }}
          label={field.label}
          field={field}
          state={state}
          config={config}
        />
      );
    }

    default:
      return (
        <Input
          {...commonInputProps}
          {...field}
          onChange={fieldHandleChange}
          value={format({ state, field })}
          disabled={disabled}
        />
      );
  }
};

const Label = styled.span`
  color: #9da1a7;
  font-size: 14px;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  margin-bottom: 10px;
`;
