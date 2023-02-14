export const image = ({ headers, beforeSave, field, key, data }) => {
  const image = data[key];
  const isNewFile = image?.name;
  const { uploadFileRequest } = headers?.options?.requests;
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

export const multiselect = ({ field, key, data }) => {
  const isMulti = field?.relation?.isMulti || false;
  const forceSendItem = field?.relation?.forceSendItem || false;
  const value = isMulti
    ? data[key]
    : forceSendItem
    ? data[key]
    : data[key].value;

  return Promise.resolve({
    [key]: value,
  });
};

export const defaultBeforeSave = ({ beforeSave, field, key, data }) => {
  return Promise.resolve({ [key]: beforeSave({ state: data, field }) });
};

export default { image, multiselect, defaultBeforeSave };
