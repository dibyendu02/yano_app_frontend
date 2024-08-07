import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle, Image } from 'react-native';
import React, { ReactNode } from 'react';
import { Colors } from '../../../../constants/Colors';
import checkCircle from '../../../../assets/image/checkCircle.png';

interface CardProps {
    title?: string;
    children?: ReactNode;
    cardFooter?: ReactNode | null;
    contentContainerStyle?: StyleProp<ViewStyle>;
    active: (value: boolean) => void;
}

const DeleteAllDataCard: React.FC<CardProps> = ({
    title = '',
    children,
    cardFooter = null,
    contentContainerStyle,
    active,
}) => {
    const [isDelete, setIsDelete] = React.useState(false);

    return (
        <View style={[styles.container, contentContainerStyle]}>
            {isDelete ? (
                <View style={styles.confirmationContainer}>
                    <Image source={checkCircle} style={[styles.confirmationImage, { tintColor: Colors.Green }]} />
                    <Text style={styles.confirmationTitle}>Deletion complete</Text>
                    <Text style={styles.confirmationText}>All your health data has been permanently deleted from our servers.</Text>
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.okButton} onPress={() => active(false)}>
                            <Text style={styles.cancelButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View>
                    <View style={styles.content}>
                        {title ? <Text style={styles.title}>{title}</Text> : null}
                        <Text style={styles.text}>{children}</Text>
                    </View>
                    {cardFooter && (
                        <View style={styles.footer}>
                            {cardFooter}
                        </View>
                    )}
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.button} onPress={() => active(false)}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => setIsDelete(true)}>
                            <Text style={styles.deleteButtonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
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
        padding: 15,
        position: 'relative',
        top: '34%',
        zIndex: 2
    },
    content: {
        width: '100%',
        alignItems: 'flex-start',
    },
    title: {
        fontWeight: 'bold',
        marginTop: 10,
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
    deleteButtonText: {
        color: Colors.LightGreen,
        fontWeight: 'bold',
        fontSize: 16,
    },
    confirmationContainer: {
        paddingTop: 10,
        paddingLeft: 5,
    },
    confirmationTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: Colors.Blue,
        marginBottom: 10,
        textAlign: 'left',
    },
    confirmationText: {
        fontSize: 17,
        color: Colors.SteelBlue,
        textAlign: 'left',
        marginBottom: 20,
    },
    okButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    confirmationImage: {
        width: 35,
        height: 35,
        marginBottom: 10,
        color: Colors.Green,
    },
});

export default DeleteAllDataCard;
