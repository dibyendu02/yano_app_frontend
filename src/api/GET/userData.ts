import {getData} from '../../global/server';

export const getPatientDatabyId = async ({
  patientId,
  token,
}: {
  patientId: string;
  token: string;
}) => {
  try {
    const response = await getData(`/userpatient/${patientId}`, token);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
