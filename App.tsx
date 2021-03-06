import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, Linking } from 'react-native';
import { useEffect, useState } from 'react';
import SingIn from './components/SignIn';
import SingUp from './components/SignUp';
import Home from './components/Home';
import { googleSignIn, checkCurrentSession } from './ultis/Auth'
import { Hub } from 'aws-amplify';

import OauthUI from './components/OauthUI';

export default function App() {

  const [isRender, setIsRender] = useState({
    signIn: true,
    signUp: false,
    home: false,
  });

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      // console.log("hub data",data)
      switch (event) {
        case "signIn":
          setIsRender({ ...isRender, signIn: false, home: true })
          break;
        case "signOut":
          setIsRender({ ...isRender, home: false, signIn: true })
          break;
        case "customOAuthState":
        // setCustomState(data);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      {isRender.signIn &&
        <>
          <SingIn/>
          <View
            style={{ marginVertical: 10 }}
          />
          <TouchableOpacity
            onPress={() => googleSignIn()}
            style={{
              alignSelf: 'center',
              backgroundColor: 'rgb(40,122,238)',
              padding: 10,
            }}
          >
            <Text
              style={{
                color: 'white'
              }}
            >
              Google Sign In
              </Text>
          </TouchableOpacity>
          <View
            style={{ marginVertical: 30 }}
          />
          <TouchableOpacity
            onPress={() => { setIsRender({ ...isRender, signIn: false, signUp: true }) }}
          >
            <Text>
              Registration
              </Text>
          </TouchableOpacity>
        </>
      }
      {isRender.signUp &&
        <>
          <SingUp isRender={isRender} setIsRender={setIsRender} />
          <View
            style={{ marginVertical: 30 }}
          />
          <TouchableOpacity
            onPress={() => { setIsRender({ ...isRender, signIn: true, signUp: false }) }}
          >
            <Text>
              Cancel
              </Text>
          </TouchableOpacity>
        </>
      }
      {isRender.home && <Home/>}
      <View
        style={{ marginVertical: 10 }}
      />

      <TouchableOpacity
        onPress={() => checkCurrentSession()}
      >
        <Text>
          Check Current Login Status
        </Text>
      </TouchableOpacity>

      {/* <OauthUI /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
