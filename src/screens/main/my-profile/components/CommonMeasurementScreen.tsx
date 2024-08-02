import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import CommonLayout from '../../../../components/CommonLayout'
import { Colors } from '../../../../constants/Colors'
import FilledButton from '../../../../components/buttons/FilledButton'
import { HelpIcon } from '../../../../assets/icon/IconNames'

type props = {
    element: React.ReactNode,
    loading: boolean,
    onPress?: () => void
}

const CommonMeasurementScreen: FC<props> = ({ element, loading, onPress }) => {
    return (
        <CommonLayout>
            {element}
            <View style={styles.addBtn}>
                {
                    loading ?
                        <FilledButton
                            label='Stop measuring'
                            type='red'
                        />
                        : (
                            <>
                                <View style={{
                                    width: 55,
                                    height: 55,
                                    borderWidth: 1,
                                    borderColor: Colors.LightGray,
                                    borderRadius: 30,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <HelpIcon size={32} />
                                </View>
                                <View style={{
                                    width: '80%',
                                }}>
                                    <FilledButton
                                        label='Start measuring'
                                        type='blue'
                                        onPress={onPress}
                                    />
                                </View>
                            </>
                        )
                }
            </View>
        </CommonLayout>
    )
}

export default CommonMeasurementScreen

const styles = StyleSheet.create({
    addBtn: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: Colors.White,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
})