export default `import { pages } from "@neoco/neoAdmin";
import { loginRequest } from "utils/requests";

// We expose a Login component for you that
// handles email and password submission
const { Login } = pages;

const headers = {
  type: "Page",
  options: {
    name: "Login",
    route: {
      path: "/",
      unAuth: true,
      auth: false,
      exact: true,
      component: (props) => <Login {...props} onSubmit={loginRequest} />,
    },
  },
};

export default headers;`;
