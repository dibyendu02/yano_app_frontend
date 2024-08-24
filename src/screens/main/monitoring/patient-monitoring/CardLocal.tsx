import {
    StyleProp,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import React, { ReactNode } from 'react';
import { Colors } from '../../../../constants/Colors';

interface CardProps {
    title?: string;
    children?: ReactNode;
    cardFooter?: ReactNode | null;
    contentContainerStyle?: StyleProp<ViewStyle>;
    active: (value: boolean) => void;
    action?: () => void;
}

const CardLocal: React.FC<CardProps> = ({
    title = '',
    children,
    cardFooter = null,
    contentContainerStyle,
    active,
    action,
}) => {
    return (
        <View style={[styles.container, contentContainerStyle]}>
            <View style={styles.content}>
                {title ? <Text style={styles.title}>{title}</Text> : null}
                <Text style={styles.text}>{children}</Text>
            </View>
            {cardFooter && <View style={styles.footer}>{cardFooter}</View>}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={() => active(false)}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={action}>
                    <Text style={styles.yesButtonText}>Yes</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 6,
        borderRadius: 10,
        backgroundColor: 'white',
        width: '94%',
        alignSelf: 'center',
        overflow: 'hidden',
        padding: 20,
        position: 'relative',
        top: '37%',
        zIndex: 2,
    },
    content: {
        width: '100%',
        alignItems: 'flex-start',
    },
    title: {
        fontWeight: 'bold',
        // marginTop: 10,
        marginBottom: 10,
        fontSize: 20,
        color: Colors.Blue,
        alignSelf: 'flex-start',
    },
    text: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 18,
        textAlign: 'left',
        color: Colors.SteelBlue,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
        width: '100%',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    cancelButtonText: {
        color: Colors.LightGreen,
        fontWeight: 'bold',
        fontSize: 16,
    },
    yesButtonText: {
        color: Colors.LightGreen,
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default CardLocal;
