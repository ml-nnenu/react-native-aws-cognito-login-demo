import React, { useState } from 'react'
import { TouchableOpacity, View, Text } from 'react-native';
import { getData, getDataWithToken, signOut } from '../ultis/Auth';

const Home = () => {
    const [fetchResult, setFetchResult] = useState("Fetch Result: ")

    return (
        <>
            <Text
                style={{ margin: 10, fontWeight: 'bold' }}
            >
                {fetchResult}
            </Text>
            <TouchableOpacity
                onPress={() => {
                    (async () => {
                        const result = await getData();
                        console.log(result)

                        if (result) {
                            setFetchResult(fetchResult + JSON.stringify(result));
                        } else {
                            setFetchResult(fetchResult + "Fail")
                        }
                    })();
                }}
            >
                <Text>
                    Get Data Without Token
        </Text>
            </TouchableOpacity>

            <View
                style={{ marginVertical: 10 }}
            />

            <TouchableOpacity
                onPress={() => {
                    (async () => {
                        const result = await getDataWithToken();
                        if (result) {
                            setFetchResult(fetchResult + JSON.stringify(result));
                        } else {
                            setFetchResult(fetchResult + "Fail")
                        }
                    })();
                }}
            >
                <Text>
                    Get Data With Token
        </Text>
            </TouchableOpacity>
            <View
                style={{ marginVertical: 10 }}
            />

            <TouchableOpacity
                onPress={() => {
                    signOut();
                }}
            >
                <Text>
                    Sign Out
        </Text>
            </TouchableOpacity>
        </>
    )
}

export default Home
