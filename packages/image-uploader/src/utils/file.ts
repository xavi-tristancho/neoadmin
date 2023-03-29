type BlobToFileParams = {
  blob: Blob;
  name: string;
};

export const getBase64FromUrl = (
  url: string
): Promise<{ size: string; base64: string }> =>
  fetch(url)
    .then((r) => r.blob())
    .then(blobToBase64);

export const blobToFile = ({ blob, name }: BlobToFileParams): File =>
  new File([blob], name);

export const blobToBase64 = (
  blob: Blob
): Promise<{ size: string; base64: string }> =>
  new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => {
        resolve({
          size: Math.round(blob.size / 1000).toString() + "kB",
          base64: reader.result as string,
        });
      };
    } catch (error) {
      reject(error);
    }
  });

export const fileToBase64 = blobToBase64;
