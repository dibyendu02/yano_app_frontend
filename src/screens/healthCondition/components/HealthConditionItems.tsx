import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React from 'react'; 
import { RightIcon } from '../../../assets/icon/IconNames';
import { Colors } from '../../../constants/Colors';

const HealthConditionItems = ({ data, navigation }: { data: object[], navigation: any }) => {
    return (
        <>
            <ScrollView>
                <View style={{ padding: 20 }}>
                    {data.map((ele, i) => (
                        <TouchableOpacity
                            key={i}
                            style={[styles.boxStyle]}
                            onPress={() => navigation.navigate('HealthConditionDetails')}
                        >
                            <Text style={[styles.title]}>Hypertension</Text>
                            <RightIcon />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </>
    );
};

export default HealthConditionItems;

const styles = StyleSheet.create({
    boxStyle: {
        width: '100%',
        backgroundColor: Colors.White,
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 10,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }, 
    title: {
        fontSize: 20,
        fontWeight: "600",
        color: Colors.Blue
    }, 
});
