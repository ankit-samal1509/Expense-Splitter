import api from './axios';

export const getAllGroups = async () => {
  const res = await api.get('/groups');
  return res.data;
};

export const getGroupById = async (id) => {
  const res = await api.get(`/groups/${id}`);
  return res.data;
};

export const createGroup = async (groupData) => {
  // groupData: { name, description, currency, members: [...] }
  const res = await api.post('/groups', groupData);
  return res.data;
};

export const deleteGroup = async (id) => {
  const res = await api.delete(`/groups/${id}`);
  return res.data;
};