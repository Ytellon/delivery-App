import { getRequest } from './requests';

export default async (id) => getRequest(`/orders/${id}`);
