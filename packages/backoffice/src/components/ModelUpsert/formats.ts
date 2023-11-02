import { Field } from "@app-artisans/form/src/types";
import { Header, ModelUpsertState, unknownObject } from "../../types";

const image = ({
  headers,
  beforeSave,
  field,
  key,
  data,
}: {
  headers: Header;
  beforeSave: ({
    state,
    field,
  }: {
    state: ModelUpsertState;
    field: Field;
  }) => unknownObject;
  field: Field;
  key: string;
  data: unknownObject;
}) => {
  const image: unknown = data[key];
  const isNewFile: unknown = image?.name;
  const { uploadFileRequest } = headers.options.requests;
  const shouldUpload = typeof image !== "undefined" && isNewFile;

  if (shouldUpload && typeof uploadFileRequest !== "function") {
    throw new Error(
      `You must define the uploadFileRequest function in your ${headers?.options?.name} header`
    );
  }

  return shouldUpload
    ? uploadFileRequest({
        file: image,
        params: { name: beforeSave({ state: data, field }) },
      }).then((fileUrl) => Promise.resolve({ [key]: fileUrl }))
    : Promise.resolve({ [key]: image });
};

const defaultBeforeSave = ({
  beforeSave,
  field,
  key,
  data,
}: {
  beforeSave: ({
    state,
    field,
  }: {
    state: ModelUpsertState;
    field: Field;
  }) => unknownObject;
  field: Field;
  key: string;
  data: unknownObject;
}) => {
  return Promise.resolve({ [key]: beforeSave({ state: data, field }) });
};

export default { image, defaultBeforeSave };
