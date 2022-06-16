import React, { useState } from 'react'
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import { signIn } from '../ultis/Login';

const SignIn = (
    { 
        isRender, setIsRender }: {
        isRender: {
            signIn: boolean;
            signUp: boolean;
            home: boolean;
        };
        setIsRender: React.Dispatch<React.SetStateAction<{
            signIn: boolean;
            signUp: boolean;
            home: boolean;
        }>>
    }
) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <>
            <View
                style={{ flexDirection: 'row' }}
            >
                <Text>username</Text>
                <TextInput
                    value={username}
                    onChangeText={setUsername}
                    placeholder={"username"}
                    style={{ borderWidth: 1, width: "50%", marginLeft: 10, paddingHorizontal: 10 }}
                />
            </View>
            <View
                style={{ marginVertical: 10 }}
            />
            <View
                style={{ flexDirection: 'row' }}
            >
                <Text>password</Text>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder={"password"}
                    style={{ borderWidth: 1, width: "50%", marginLeft: 10, paddingHorizontal: 10 }}
                />
            </View>
            <View
                style={{ marginVertical: 10 }}
            />
            <TouchableOpacity
                onPress={() => {
                    signIn({ username, password })
                    // setIsRender({ ...isRender, signIn: false , home:true})
                }}
            >
                <Text>
                    Sign In
      </Text>
            </TouchableOpacity>
        </>
    )
}

export default SignIn
