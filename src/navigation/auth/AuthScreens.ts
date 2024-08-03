export const AuthScreen = {
  Landing: 'Landing',
  SelectUserType: 'SelectUserType',
  Login: 'Login',
  Signup: 'Signup',
  Verification: 'Verification',
  CodeVerification: 'CodeVerification',
  LoadingScreen: 'LoadingScreen',
  ForgotPass: 'ForgotPass',
  SecondForgotPassword: 'SecondForgotPassword',
};

export type AuthScreenType = (typeof AuthScreen)[keyof typeof AuthScreen];
