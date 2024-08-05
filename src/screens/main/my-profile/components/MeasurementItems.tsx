import { Image, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import PatientElements from '../../../../components/PatientElements'
import { Colors } from '../../../../constants/Colors'
import { navigate } from '../../../../navigation/RootNavigation'

type props = { 
    data: {
        title: string,
        img: any,
        path: string
    }[]
}

const MeasurementItems: FC<props> = ({ data }) => { 
    return (
        <>
            {
                data.map((item, i) => (
                    <PatientElements
                        key={i}
                        name={item.title}
                        element={
                            <Image
                                source={item.img}
                                style={{
                                    width: 30,
                                    objectFit: 'contain'
                                }}
                            />
                        }
                        color="black"
                        customStyle={{
                            paddingVertical: 20,
                            borderRadius: 0,
                            borderBottomWidth: 1,
                            borderBottomColor: Colors.LightGray,
                        }}
                        onPress={() => navigate(item.path)}
                    />
                ))
            }
        </>
    )
}

export default MeasurementItems

const styles = StyleSheet.create({})