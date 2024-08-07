export const AuthScreen = {
  Landing: 'Landing',
  Registration: 'Registration',
  SelectUserType: 'SelectUserType',
  Login: 'Login',
  AccountVerification: 'AccountVerification',
  LoadingScreen: 'LoadingScreen',
  ForgotPass: 'ForgotPass',
  SecondForgotPassword: 'SecondForgotPassword',
  Welcome: 'WelcomeScreen',
  MoreDetails: 'MoreDetails',
};

export type AuthScreenType = (typeof AuthScreen)[keyof typeof AuthScreen];
