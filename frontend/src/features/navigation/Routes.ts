const ROUTES = {
  ROOT: "/",
  LOCKSCREEN: "/lockscreen",
  LOGIN_WITH_PHRASE: "/login-with-phrase",
  LOGIN: "/login",
  SIGNUP: "/signup",
  HOME: "/home",
  VIEW_PASSWORD: "/home/view-password",
  SETTINGS: "/settings",
};

type ROUTES = (typeof ROUTES)[keyof typeof ROUTES];

export { ROUTES };
