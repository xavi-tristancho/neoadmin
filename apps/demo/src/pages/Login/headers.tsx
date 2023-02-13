import { pages } from "@neoco/neoco-backoffice";
import { Headers } from "@neoco/neoco-backoffice/src/types";

const { Login } = pages;

const loginRequest = () => {
  return Promise.resolve({
    user: {
      name: "test",
      email: "test@mail.com",
    },
    token: "test",
  });
};

const headers: Headers = {
  type: "Page",
  options: {
    name: "Login",
    route: {
      path: "/",
      unAuth: true,
      auth: false,
      exact: true,
      component: (props: any) => <Login {...props} onSubmit={loginRequest} />,
    },
  },
};

export default headers;
