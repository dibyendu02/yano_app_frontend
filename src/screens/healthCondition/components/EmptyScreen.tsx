import { StyleSheet, Text, View, Image } from 'react-native'
import React, { FC } from 'react'
import { Colors } from '../../../constants/Colors'
import { DummyImage } from '../../../assets/dummy/images'

type EmptyScreenProps = {
    title: string;
    message: string;
}

const EmptyScreen:FC<EmptyScreenProps> = ({title, message}) => {
    return (
        <>
            <View style={styles.ImageContainer}>
                <View style={{ alignItems: "center" }}>
                    <Image
                        source={DummyImage.emptyHealthCondition}
                        width={400}
                        height={400}
                    />
                    <Text style={{
                        color: Colors.Black,
                        fontSize: 20,
                        fontWeight: '600',
                        marginVertical: 10
                    }}>
                        {title}
                    </Text>
                    <Text style={{
                        color: Colors.SteelBlue,
                        fontSize: 15,
                        textAlign: 'center'
                    }}>
                        {message}
                    </Text>
                </View>
            </View>
        </>
    )
}

export default EmptyScreen

const styles = StyleSheet.create({
    ImageContainer: {
        padding: 40,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})