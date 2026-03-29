import { useMemo } from 'react';

export const useBalances = (group) => {
  return useMemo(() => {
    // 1. Return empty if group data hasn't loaded yet
    if (!group || !group.memberships || !group.expenses) return {};

    const balances = {};

    // 2. Initialize every Member from your schema at 0.00
    group.memberships.forEach((m) => {
      balances[m.memberId] = 0;
    });

    // 3. The Math: Balance = (Total Paid) - (Total Shares)
    group.expenses.forEach((exp) => {
      // Add the full amount to the person who paid
      balances[exp.paidById] = (balances[exp.paidById] || 0) + Number(exp.amount);

      // Subtract the specific share from every member in the split
      exp.splits.forEach((split) => {
        balances[split.memberId] = (balances[split.memberId] || 0) - Number(split.share);
      });
    });

    return balances;
  }, [group]); // Only re-calculates when 'group' data updates
};