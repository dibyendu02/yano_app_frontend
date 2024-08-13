import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CommonLayout from '../../../../components/CommonLayout'
import { DummyImage } from '../../../../assets/dummy/images'
import CustomSelect from '../../../../components/formComp/SelectFiled'
import { useForm } from 'react-hook-form'
import { Colors } from '../../../../constants/Colors'
import CommonHeader from '../../../healthCondition/components/CommonHeader'
import FilledButton from '../../../../components/buttons/FilledButton'
import { navigate } from '../../../../navigation/RootNavigation'
import MeasurementChangeCard from '../../my-profile/UiUpdateComponents/MeasurementChangeCard'
import MeasurementChangeCardLocal from './MeasurementCardLocal'

const options = {
    unit1: 'Mother',
    unit2: 'Father',
    unit3: 'Brother',
    unit4: 'Husband / Wife',
    unit5: 'Sibling',
    unit6: 'Grandparent',
    unit7: 'Hijo',
    unit8: 'Other',
};

const EditUserFamilyMember = () => {
    const [isClicked, setIsClicked] = React.useState(false);
    const { control } = useForm();

    const [relation, setRelation] = React.useState('');


    const handleClicked = () => {
        setIsClicked(!isClicked);
    }
    return (
        <CommonLayout>
            <CommonHeader
                title={'Add Family Member'}
                rightComp1={
                    <FilledButton
                        type='blue'
                        label="Save"
                        onPress={() => navigate('FamilyMemberSaved')}
                        // disabled={!disabled}
                        style={{
                            width: 70,
                            paddingVertical: 10,
                            borderRadius: 10,
                        }}
                    />
                }
            />
            <View style={{ padding: 20 }} >
                <View style={{
                    width: "100%",
                    borderRadius: 10,
                    backgroundColor: Colors.White,
                    alignItems: "center",
                    paddingVertical: 20,
                    marginBottom: 20
                }}>
                    <Image
                        source={DummyImage.user}
                        style={{ width: 80, height: 80, borderRadius: 80, objectFit: "cover", marginBottom: 10 }}
                    />
                    <Text style={{
                        fontSize: 18,
                        fontWeight: "600",
                        color: Colors.Blue
                    }} >María Clemente</Text>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: "500",
                        color: Colors.SteelBlue
                    }} >maria.clemente@gmail.com</Text>
                </View>
                <View>
                    <CustomSelect
                        name='relation'
                        label='Relación con el familiar'
                        control={control}
                        onClick={() => setIsClicked(!isClicked)}
                    />
                </View>
            </View>
            {isClicked && (
                <View style={styles.afterClick}>
                    <MeasurementChangeCardLocal
                        title={'Family relationship'}
                        active={handleClicked}
                        setValue={setRelation}
                        items={options}
                    />
                </View>
            )}
        </CommonLayout>
    )
}

export default EditUserFamilyMember

const styles = StyleSheet.create({
    afterClick: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: 1,
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
})