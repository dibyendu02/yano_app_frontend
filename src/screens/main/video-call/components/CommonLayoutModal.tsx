import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import Header from '../../../../components/header/Header'
import FilledButton from '../../../../components/buttons/FilledButton'
import { Colors } from '../../../../constants/Colors'
import { HelpIcon } from '../../../../assets/icon/IconNames'

type props = {
    heading: string,
    children: React.ReactNode,
    loading: boolean,
    onPress: () => void
}

const CommonLayoutModal: FC<props> = ({ heading, loading, children, onPress }) => {
    return (
        <>
            <View style={{ paddingHorizontal: 20 }}>
                <Header title={heading} />
            </View>
            <View style={{ paddingHorizontal: 20 }}>
                {children}
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
            </View>
        </>
    )
}

export default CommonLayoutModal

const styles = StyleSheet.create({
    addBtn: { 
        width: '100%',
        backgroundColor: Colors.White,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
})