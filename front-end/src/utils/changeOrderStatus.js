import { getLocalStorage } from './localStorage';
import { putRequest } from './requests';

export default async (id, status) => {
  try {
    const user = getLocalStorage('user');

    const config = {
      headers: {
        authorization: user.token,
      },
    };

    const body = {
      status,
    };

    await putRequest(`/orders/${id}`, body, config);
  } catch (error) {
    console.log(error);
  }
};
