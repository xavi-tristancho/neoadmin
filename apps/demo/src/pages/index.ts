import { headers as loginHeaders } from "./Login";
import { headers as postsHeaders } from "./Posts";
import { headers as writersHeaders } from "./Writers";
import { headers as dashboardHeaders } from "./Dashboard";

export const headers = [
  dashboardHeaders,
  loginHeaders,
  postsHeaders,
  writersHeaders,
];
