import api from './axios';

export const addExpense = async (expenseData) => {
  /**
   * expenseData structure:
   * { 
   * groupId: string, 
   * description: string, 
   * amount: number, 
   * paidById: string, 
   * splits: [ memberId, memberId, .. ] 
   * }
   */
  const res = await api.post('/expenses', expenseData);
  return res.data;
};

export const deleteExpense = async (id) => {
  const res = await api.delete(`/expenses/${id}`);
  return res.data;
};