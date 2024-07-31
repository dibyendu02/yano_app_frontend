import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import CommonLayout from '../../../../components/CommonLayout'
import Header from '../../../../components/header/Header'
import { Colors } from '../../../../constants/Colors'
import SwitchButton from '../../../../components/formComp/SwitchButton'
import { NotificationIcon } from '../../../../assets/icon/IconNames'
import FilledButton from '../../../../components/buttons/FilledButton'

type props = {
    title: string,
    children: React.ReactNode,
    onPress?: () => void
}

const CommonThresholdLayout: FC<props> = ({ title, children,onPress }) => {
    const disabled = false
    return (
        <CommonLayout>
            <Header
                title={'Edit threshold'}
                headerRightComponent={
                    <FilledButton
                        type='blue'
                        label="Save"
                        onPress={onPress}
                        disabled={!disabled}
                        style={{
                            width: 70,
                            paddingVertical: 10,
                            borderRadius: 10,
                        }}
                    />
                }
            />
            <ScrollView>
                <View style={{ padding: 20 }}>
                    <Text style={styles.title}>{title}</Text>
                    {children}
                    <SwitchButton
                        element={<NotificationIcon />}
                        label={'Health alerts'}
                    />
                </View>
            </ScrollView>
        </CommonLayout>
    )
}

export default CommonThresholdLayout

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: Colors.Blue,
        marginBottom: 20,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    }
})