import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type ItemWithTileSubtileProps = {
    title: string;
    subtitle?: string,
    element?: React.ReactNode;
    customStyle?: object;
    onPress?: () => void;
    isVisibleIcon?: boolean
};

const ItemWithTileSubtile: React.FC<ItemWithTileSubtileProps> = ({
    title,
    subtitle,
    element,
    customStyle,
    isVisibleIcon = true,
    onPress,
}) => {

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.container, { ...customStyle }]}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {element}
                    <View style={{
                        marginStart: 15,
                        width: '70%',
                    }}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={{ marginTop: 4 }}>{subtitle}</Text>
                    </View>
                </View>
                {isVisibleIcon && <MaterialIcons name="navigate-next" size={30} color={'black'} />}
            </View>
        </TouchableOpacity>
    );
};

export default ItemWithTileSubtile;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
    },
    title: {
        color: '#00263E',
        fontSize: 18,
        fontWeight: '600',
        // fontFamily: 'Roboto',
        flex: 1,
    },
});
