export const AuthScreen = {
  Landing: 'Landing',
  Registration: 'Registration',
  SelectUserType: 'SelectUserType',
  Login: 'Login',
  Verification: 'Verification',
  CodeVerification: 'CodeVerification',
  LoadingScreen: 'LoadingScreen',
  ForgotPass: 'ForgotPass',
  SecondForgotPassword: 'SecondForgotPassword',
};

export type AuthScreenType = (typeof AuthScreen)[keyof typeof AuthScreen];
