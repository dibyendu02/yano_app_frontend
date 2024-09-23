import {deleteData} from '../../global/server';

export const deletePatientUnderDoctor = async ({
  userId,
  token,
  patientId,
}: {
  userId: string;
  token: string;
  patientId: string;
}) => {
  try {
    const response = await deleteData(
      `/userdoctor/${userId}/patients/${patientId}`,
      token,
    );
    console.log('response ', response);

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
