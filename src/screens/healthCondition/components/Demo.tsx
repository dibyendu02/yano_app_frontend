// AddAndEditMedicine.tsx
import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useForm, Control, FieldValues } from 'react-hook-form';
import CustomInputField from '../../../components/formComp/CustomInputField';
import CustomDatePicker from '../../../components/formComp/CustomDatePicker';
import CustomSelect from '../../../components/formComp/SelectFiled';
import CustomTextarea from '../../../components/formComp/TextAreaField';
import { DateIcon } from '../../../assets/icon/IconNames';
import { Colors } from '../../../constants/Colors';

interface FormValues {
    username: string;
    email: string;
}

const AddAndEditMedicine: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [defaultValues, setDefaultValues] = useState<FormValues>({
        username: '',
        email: '',
    });

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
        defaultValues: defaultValues,
    });

    const onSubmit = (data: FormValues) => {
        console.log(data);
        if (isEditing) {
            // Handle the update logic here
            setIsEditing(false);
        } else {
            // Handle the create logic here
        }
        reset();
    };

    const handleEdit = () => {
        const existingData = {
            username: 'ExistingUsername',
            email: 'existing@example.com',
        };
        setDefaultValues(existingData);
        reset(existingData);
        setIsEditing(true);
    };

    return (
        <View style={styles.container}>
            <CustomInputField
                name="username"
                label='Username'
                control={control as unknown as Control<FieldValues, object>}
                rules={{ required: 'Username is required' }}
                placeholder="Username"
                icon={<DateIcon />}
            />
            <CustomInputField
                name="email"
                control={control as unknown as Control<FieldValues, object>}
                rules={{
                    required: 'Email is required',
                    pattern: {
                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        message: 'Email is invalid',
                    },
                }}
                placeholder="Email"
                keyboardType="email-address"
            />
            <CustomDatePicker
                name="date"
                control={control as unknown as Control<FieldValues, object>}
                rules={{ required: 'Date is required' }}
            />
            <CustomSelect
                name="fruit"
                control={control as unknown as Control<FieldValues, object>}
                rules={{ required: 'Selection is required' }}
                options={[
                    { label: 'Apple', value: 'apple' },
                    { label: 'Banana', value: 'banana' },
                    { label: 'Cherry', value: 'cherry' },
                ]}
                placeholder="Select a fruit"
            />
            <CustomTextarea
                name="description"
                control={control as unknown as Control<FieldValues, object>}
                rules={{ required: 'Description is required' }}
                placeholder="Enter description"
            />
            <Button title={isEditing ? 'Update' : 'Submit'} onPress={handleSubmit(onSubmit)} />
            {!isEditing && <Button title="Edit" onPress={handleEdit} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: Colors.LightGray,
    },
});

export default AddAndEditMedicine;
