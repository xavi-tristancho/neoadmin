export const sendMail = ({
  url = '/api/contact',
  formObject,
  locale,
  sentSuccessfully,
  template,
}) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain, */*',
    },
    body: JSON.stringify({
      ...formObject,
      locale,
      template,
    }),
  })
    .then((res) => {
      if (res.status === 200) {
        sentSuccessfully();
        Promise.resolve();
      }
    })
    .catch((error) => {
      Promise.reject();
    });
};
