export const postRequest = (lambda) => (request, response) => {
  if (request.method === "POST") {
    return lambda(request, response);
  } else {
    response.setHeader("Allow", "POST");
    return response.status(405).end("Method Not Allowed");
  }
};
