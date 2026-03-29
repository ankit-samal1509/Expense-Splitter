import { UserCircle } from 'lucide-react';

function MemberBalanceItem({ member, balance }) {
  const isPositive = balance >= 0;

  return (
    <div className="flex items-center justify-between p-4 hover:bg-slate-50 transition rounded-2xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
          <UserCircle size={24} />
        </div>
        <div>
          <p className="font-bold text-slate-800">{member.name}</p>
          <p className="text-[10px] text-slate-400 uppercase font-black">{member.email || 'Group Member'}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`text-sm font-black ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
          {isPositive ? `+ ₹${balance.toFixed(2)}` : `- ₹${Math.abs(balance).toFixed(2)}`}
        </p>
        <p className="text-[10px] text-slate-400 font-bold uppercase">
          {isPositive ? 'Owed' : 'Owes'}
        </p>
      </div>
    </div>
  );
}

export default MemberBalanceItem;