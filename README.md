# react-native-aws-cognito-login-demo

yarn install

amplify pull backend env

if opening with your device:
add <Lan IP> displayed in expo client, e.g. exp://192.168.1.6:19000/
as new signIn/signOut redirect link in aws-cognito > user pool > app client setting

in aws-exports.js:
    awsmobile.oauth.redirectSignIn must be single url
    (the redirectUrl could be multiple in aws-cognito e.g. exp://127.0.0.1:19000/--/, exp://192.168.1.6:19000/, exp://192.168.8.130:19000/)

    delete awsmobile.oauth.redirectSignOut to prevent opening new browser during signOut
