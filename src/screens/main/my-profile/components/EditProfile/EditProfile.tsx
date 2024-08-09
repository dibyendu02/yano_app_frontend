import React, { useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    ToastAndroid,
    Alert,
} from 'react-native';
import Header from '../../../../../components/header/Header';
import { navigate } from '../../../../../navigation/RootNavigation';
import { Colors } from '../../../../../constants/Colors';
import { AuthScreen } from '../../../../../navigation/auth/AuthScreens';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import FormInput from '../../../../../components/hook-form/FormInput';
import { FormInputType } from '../../../../../components/hook-form/types';
import FormDateInput from '../../../../../components/hook-form/FormDateInput';
import FormSelectionInput from '../../../../../components/hook-form/FormSelectionInput';
import FormPhoneNumberInput from '../../../../../components/hook-form/FormPhoneNumberInput';
import FormImageInput from '../../../../../components/hook-form/FormImageInput';
import { AuthScreensProps } from '../../../../../navigation/auth/types';
import { UserType } from '../../../../../constants/enums';
import moment from 'moment';
import { registerDoctor, registerPatient } from '../../../../../services/Endpoints';
import Gender from './Gender';

const DoctorSpecialties = [
    { id: 'Cardiologist', label: 'Cardiologist', enabled: true },
    { id: 'Dermatologist', label: 'Dermatologist', enabled: true },
    { id: 'Neurologist', label: 'Neurologist', enabled: true },
    { id: 'Pediatrician', label: 'Pediatrician', enabled: true },
    { id: 'GeneralSurgeon', label: 'General Surgeon', enabled: true },
    { id: 'OrthopedicSurgeon', label: 'Orthopedic Surgeon', enabled: true },
    { id: 'Gynecologist', label: 'Gynecologist', enabled: true },
    { id: 'Ophthalmologist', label: 'Ophthalmologist', enabled: true },
    { id: 'Psychiatrist', label: 'Psychiatrist', enabled: true },
    { id: 'Radiologist', label: 'Radiologist', enabled: true },
    { id: 'Urologist', label: 'Urologist', enabled: true },
    { id: 'Endocrinologist', label: 'Endocrinologist', enabled: true },
];

const EditProfile: React.FC<AuthScreensProps> = ({ route }) => {
    const [isDisabled, setIsDisabled] = React.useState(true);
    //@ts-ignore
    const userType = route?.params?.userType;

    // Prefilled dummy data
    const initialData = {
        firstName: 'Eduardo',
        lastName: 'Anzola',
        email: 'dr.eduardo_anzola@gmail.com',
        phoneNumber: '+36734567890',
        dateOfBirth: '1981-017-06',
        gender: 'Male',
        specialty: 'General medicine',
    };

    const { ...methods } = useForm({
        mode: 'onChange',
        defaultValues: initialData,
    });

    useEffect(() => {
        const subscription = methods.watch((value) => {
            // Check if the form data has changed from the initial values
            const isFormChanged = JSON.stringify(value) !== JSON.stringify(initialData);
            setIsDisabled(!isFormChanged);
        });
        return () => subscription.unsubscribe();
    }, [methods.watch]);

    const showToast = (message) => {
        if (Platform.OS === 'android') {
            ToastAndroid.showWithGravity(
                message,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
        } else {
            Alert.alert("Notification", message);
        }
    };

    const onSubmit = async (data: any) => {
        let requestData = new FormData();
        if (data?.file) {
            requestData.append('image', {
                uri: Platform.OS === 'ios' ? `file:///${data?.file?.path}` : data?.file.path,
                type: data?.file?.mime,
                name: `${moment()}.jpeg`,
            });
        }

        const payload = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            gender: data.gender,
            dateOfBirth: data.dateOfBirth,
            password: data.password,
            specialty: data.specialty,
        };

        for (let key in payload) {
            requestData.append(key, payload[key]);
        }

        try {
            if (userType === UserType.Patient) {
                await registerPatient(requestData);
            } else {
                await registerDoctor(requestData);
            }

            showToast("The changes have been saved.");
            navigate(AuthScreen.AccountVerification);
        } catch (e) {
            console.log('Error!', e?.response?.data?.message);
            showToast("An error occurred while saving.");
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <Header
                        title="Edit profile"
                        headerRightComponent={
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity
                                    disabled={isDisabled}
                                    onPress={isDisabled ? null : methods.handleSubmit(onSubmit)}
                                >
                                    <Text style={isDisabled ? styles.loginButtonDisabled : styles.loginButton}>
                                        Save
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        }
                    />
                    <View style={styles.body}>
                        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                            <FormProvider {...methods}>
                                <FormImageInput name="file" />
                                <FormInput
                                    name="firstName"
                                    label="Name"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Please enter your first name',
                                        },
                                    }}
                                />
                                <FormInput
                                    name="lastName"
                                    label="Last Name"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Please enter your last name',
                                        },
                                    }}
                                />
                                <FormInput
                                    name="email"
                                    label="Email"
                                    type={FormInputType.Email}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Please enter your email',
                                        },
                                    }}
                                />
                                <FormPhoneNumberInput
                                    name="phoneNumber"
                                    label="Phone number"
                                    defaultValue={initialData.phoneNumber}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Please enter your phone number',
                                        },
                                        pattern: {
                                            value: /^\+\d{10,14}$/,
                                            message: 'Enter valid mobile number!',
                                        },
                                    }}
                                />
                                <FormDateInput
                                    name="dateOfBirth"
                                    label="Date of birth"
                                    placeholder="Select a date"
                                    placeholderTextColor={Colors.Grey}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Please select your DOB',
                                        },
                                    }}
                                />
                                <Controller
                                    name="gender"
                                    control={methods.control}
                                    defaultValue="Male"
                                    render={({ field: { onChange, value } }) => (
                                        <Gender selectedRole={value} setSelectedRole={onChange} />
                                    )}
                                />
                                <FormSelectionInput
                                    name="specialty"
                                    placeholder="Select your specialty"
                                    label="Specialty"
                                    options={DoctorSpecialties}
                                    optionsListLabel="Select your specialty"
                                    optionsListHeight={400}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Please select your specialty',
                                        },
                                    }}
                                />
                            </FormProvider>
                        </ScrollView>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default EditProfile;

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        color: Colors.Blue,
        marginRight: 8,
    },
    loginButton: {
        borderWidth: 1,
        borderColor: Colors.Blue,
        backgroundColor: Colors.Blue,
        borderRadius: 8,
        color: Colors.White,
        fontWeight: 'bold',
        padding: 10,
        paddingHorizontal: 15,
    },
    loginButtonDisabled: {
        borderWidth: 1,
        borderColor: Colors.Grey,
        backgroundColor: Colors.Grey,
        borderRadius: 8,
        color: Colors.White,
        fontWeight: 'bold',
        padding: 10,
        paddingHorizontal: 15,
    },
    body: {
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        paddingHorizontal: 14,
    },
});
