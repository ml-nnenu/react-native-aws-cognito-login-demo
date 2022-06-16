import React, { useState } from 'react'
import { TextInput, View, Text, TouchableOpacity, Alert } from 'react-native';
import { confirmSignUp, signUp } from '../ultis/Login';

const SignUp = (
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
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
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

            <View
                style={{ flexDirection: 'row' }}
            >
                <Text>email</Text>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder={"email"}
                    style={{ borderWidth: 1, width: "50%", marginLeft: 10, paddingHorizontal: 10 }}
                />
            </View>
            <View
                style={{ marginVertical: 10 }}
            />
            <TouchableOpacity
                onPress={() => {
                    signUp({ username, password, email });
                }}
            >
                <Text>
                    Sign Up
                </Text>
            </TouchableOpacity>

            <View
                style={{ marginVertical: 30 }}
            />

            <View
                style={{ flexDirection: 'row' }}
            >
                <Text>code</Text>
                <TextInput
                    value={code}
                    onChangeText={setCode}
                    placeholder={"code"}
                    style={{ borderWidth: 1, width: "50%", marginLeft: 10, paddingHorizontal: 10 }}
                />
            </View>

            <View
                style={{ marginVertical: 10 }}
            />

            <TouchableOpacity
                onPress={() => {
                    (async  () => {
                        const signUpResult = await confirmSignUp({ username, code });
                        if(signUpResult === "SUCCESS"){
                            setIsRender({
                                ...isRender, signUp:false,signIn:true
                            })
                        }
                    })();
                }}
            >
                <Text>
                    Confirm Sign Up
        </Text>
            </TouchableOpacity>
        </>
    )
}

export default SignUp
