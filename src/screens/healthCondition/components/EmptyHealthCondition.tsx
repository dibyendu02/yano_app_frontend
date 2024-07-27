import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants/Colors'
import { DummyImage } from '../../../assets/dummy/images'

const EmptyHealthCondition = () => {
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
                        No health condition added yet
                    </Text>
                    <Text style={{
                        color: Colors.lightBlue,
                        fontSize: 15,
                        textAlign: 'center'
                    }}>
                        Las condiciones de salud aparecerán aquí. Agrega una para empezar.
                    </Text>
                </View>
            </View>
        </>
    )
}

export default EmptyHealthCondition

const styles = StyleSheet.create({
    ImageContainer: {
        padding: 40,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})