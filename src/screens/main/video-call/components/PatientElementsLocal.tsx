import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icons from '../../../../assets/icon/Icon';
import { Colors } from '../../../../constants/Colors';

type PatientElementsProps = {
    name: string;
    icon?: string;
    iconsname?: keyof typeof Icons;
    color: string;
    element?: React.ReactNode;
    customStyle?: object;
    onPress?: () => void;
};

const PatientElementsLocal: React.FC<PatientElementsProps> = ({
    name,
    icon,
    iconsname,
    color,
    element,
    customStyle,
    onPress,
}) => {

    // Get the appropriate icon component
    const IconComponent = Icons[iconsname || 'MaterialIcons'];

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.container]}>
                {IconComponent && (
                    <IconComponent name={icon!} size={10} color={color} />
                )}
                {element}
                <Text style={styles.name}>{name}</Text>
                <MaterialIcons name="navigate-next" size={25} color={Colors.Blue} />
            </View>
        </TouchableOpacity>
    );
};

export default PatientElementsLocal;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        borderRadius: 0,
        borderBottomColor: Colors.LightGray,
        borderBottomWidth: 2, // Ensure there is a bottom border
        paddingVertical: 10.2, // Add vertical padding for better touch target
        paddingHorizontal: 0, // Adjust horizontal padding
    },
    name: {
        color: '#00263E',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        marginLeft: 15,
        flex: 1,
    },
});
