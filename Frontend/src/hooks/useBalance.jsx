import { useMemo } from 'react';

export const useBalance = (group) => {
  return useMemo(() => {
    if (!group || !group.expenses) return {};

    const balances = {};

    //  Initialize every member's balance at 0
    group.memberships.forEach((m) => {
      balances[m.memberId] = 0;
    });

    // Loop through every expense to calculate net positions
    group.expenses.forEach((exp) => {
      if (balances.hasOwnProperty(exp.paidById)) {
        balances[exp.paidById] += Number(exp.amount);
      }

      exp.splits.forEach((split) => {
        if (balances.hasOwnProperty(split.memberId)) {
          balances[split.memberId] -= Number(split.share);
        }
      });
    });

    return balances;
  }, [group]); 
};