import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import CommonLayout from '../../../../components/CommonLayout';
import { Colors } from '../../../../constants/Colors';
import FilledButton from '../../../../components/buttons/FilledButton';
import { HelpIcon } from '../../../../assets/icon/IconNames';
import BottomSheet from '../../../../components/bottom-sheet/BottomSheet';

type props = {
    element: React.ReactNode,
    loading: boolean,
    onPress?: () => void
}

const CommonMeasurementScreen: FC<props> = ({ element, loading, onPress }) => {
    const [open, setOpen] = React.useState(false);

    const handleOnPress = () => {
        console.log('handleOnPress');
        setOpen(!open);
        console.log(open);
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
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingHorizontal: 15,
                                gap: 10
                            }}>
                                <FilledButton
                                    label='Back'
                                    type='lightGrey'
                                    style={{
                                        width: '50%'
                                    }}
                                />
                                <FilledButton
                                    label='Next'
                                    type='blue'
                                    style={{
                                        width: '50%'
                                    }}
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 20,
    }
});
