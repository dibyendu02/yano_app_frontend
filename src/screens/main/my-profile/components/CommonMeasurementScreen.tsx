import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import CommonLayout from '../../../../components/CommonLayout';
import { Colors } from '../../../../constants/Colors';
import FilledButton from '../../../../components/buttons/FilledButton';
import { HelpIcon } from '../../../../assets/icon/IconNames';
import BottomSheet from '../../../../components/bottom-sheet/BottomSheet';

type props = {
    help: object,
    element: React.ReactNode,
    loading: boolean,
    onPress?: () => void
}


const CommonMeasurementScreen: FC<props> = ({ help, element, loading, onPress }) => {
    const [open, setOpen] = React.useState(false);
    const [index, setIndex] = React.useState(0)

    const incCnt = () => {
        if (index < help.length - 1) {
            setIndex(index + 1)
        }
    }

    const decCnt = () => {
        if (index > 0) {
            setIndex(index - 1)
        }
    }

    const handleOnPress = () => {
        console.log(help[0])
        setOpen(!open);
    }

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
                                <TouchableOpacity
                                    style={styles.helpButton}
                                    onPress={() => {
                                        handleOnPress();
                                    }}
                                >
                                    <HelpIcon size={32} />
                                </TouchableOpacity>
                                <View style={styles.startButtonContainer}>
                                    <FilledButton
                                        label='Start measuring'
                                        type='blue'
                                        onPress={onPress}
                                    />
                                </View>
                            </>
                        )
                }

                <BottomSheet
                    isVisible={open}
                    children={
                        <View style={styles.bottomSheetContent}>
                            <View style={{
                                alignItems: 'center',
                                paddingVertical: 20,
                                paddingBottom: 40
                            }}>
                                <Image
                                    style={{ width: 264, height: 368 }}
                                    source={help[index].img}
                                />

                                <Text
                                    style={{
                                        fontSize: 27,
                                        fontWeight: 'bold',
                                        fontFamily: 'Roboto',
                                        color: Colors.Blue,
                                    }}
                                >
                                    {help[index].text}
                                </Text>
                            </View>


                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingHorizontal: 15,
                                gap: 10,
                                alignSelf: 'flex-end'
                            }}>
                                <FilledButton
                                    label='Back'
                                    type='lightGrey'
                                    style={{
                                        width: '50%'
                                    }}
                                    onPress={() => decCnt()}
                                />
                                <FilledButton
                                    label='Next'
                                    type='blue'
                                    style={{
                                        width: '50%'
                                    }}
                                    onPress={() => incCnt()}
                                />
                            </View>
                        </View>
                    }
                    onBackdropPress={() => setOpen(false)}
                />
            </View>
        </CommonLayout>
    )
}

export default CommonMeasurementScreen;

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
    },
    helpButton: {
        width: 55,
        height: 55,
        borderWidth: 1,
        borderColor: Colors.LightGray,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    startButtonContainer: {
        width: '80%',
    },
    bottomSheetContent: {
        height: '90%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        // backgroundColor: Colors.Red
    }
});
