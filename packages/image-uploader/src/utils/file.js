export const getBase64FromUrl = (url) =>
  fetch(url)
    .then((r) => r.blob())
    .then(blobToBase64);

export const blobToFile = ({ blob, name }) => new File([blob], name);

export const blobToBase64 = (blob) =>
  new Promise((resolve, reject) => {
    try {
      if (!blob) {
        reject();
      }
      
      let reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => {
        resolve({
          size: Math.round(blob.size / 1000 + "kB"),
          base64: reader.result,
        });
      };
    } catch (error) {
      reject(error);
    }
  });
export const fileToBase64 = blobToBase64;
