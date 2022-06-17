import Amplify, { API, Auth } from 'aws-amplify'
import awsconfig from '../src/aws-exports'
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import * as WebBrowser from 'expo-web-browser';
import { Linking, Platform } from 'react-native';

async function urlOpener(url: string, redirectUrl: string) {
    //prevent opening new browser during signOut by deleting the signOutRedirectUrl in aws-export.js
    if(!redirectUrl) return

    const result = await WebBrowser.openAuthSessionAsync(
        url,
        redirectUrl
    );

    if (result.type === 'success' && Platform.OS === 'ios') {
        WebBrowser.dismissBrowser();
        return Linking.openURL(result.url);
    }
}

const amplifyConfig = {
        ...awsconfig, oauth: {
            ...awsconfig.oauth,
            urlOpener
        }
}

Amplify.configure(amplifyConfig);
Auth.configure(amplifyConfig);

export function getData() {
    const apiName = 'api63bd31bf';
    const path = '/items/object/michael';
    const myInit = { // OPTIONAL
        headers: {
        }, // OPTIONAL
    };

    return API.get(apiName, path, myInit);
}

export async function getDataWithToken() {
    const token = (await Auth.currentSession()).getIdToken().getJwtToken();
    const apiName = 'api63bd31bf';
    const path = '/items/object/michael';
    const myInit = { // OPTIONAL
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    return API.get(apiName, path, myInit);
}

export async function signUp({ username, password, email }: {
    username: string;
    password: string;
    email: string;
}) {
    try {
        await Auth.signUp({
            username,
            password,
            attributes: {
                email,          // optional
            }
        });
    } catch (error) {
        console.log('error signing up:', error);
    }
}

export async function confirmSignUp({ username, code }: {
    username: string;
    code: string;
}) {
    try {
        const result = await Auth.confirmSignUp(username, code);
        return result
    } catch (error) {
        console.log('error confirming sign up', error);
    }
}


export async function signIn({
    username, password }: {
        username: string;
        password: string
    }) {
    try {
        await Auth.signIn(username, password);
    } catch (error) {
        console.log('error signing in', error);
    }
}

export async function googleSignIn() {
    try {
        //https://stackoverflow.com/questions/66146633/login-option-is-not-available-please-try-another-one
        await Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google});
    } catch (error) {
        console.log('error signing in', error);
    }
}

export async function checkCurrentSession() {
    try {
        const result = await Auth.currentSession();
        console.log(result)
        return result
    } catch (error) {
        console.log('error current session: ', error);
    }
}

export async function signOut() {
    try {
        await Auth.signOut({global:true});
    } catch (error) {
        console.log('error signing out: ', error);
    }
}