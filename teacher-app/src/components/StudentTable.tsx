import React from 'react';

interface StudentState {
  usn: string;
  name: string;
  status: "joined" | "declined" | "waiting";
  ip?: string;
}

const StudentTable: React.FC<{ students: StudentState[] }> = ({ students }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-textMuted border-b border-gray-800 text-sm uppercase tracking-wider">
            <th className="p-4 font-semibold">USN</th>
            <th className="p-4 font-semibold">Name</th>
            <th className="p-4 font-semibold">IP Address</th>
            <th className="p-4 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody className="text-textMain">
          {students.map((s) => (
            <tr key={s.usn} className="border-b border-gray-800 hover:bg-surfaceHover transition-colors">
              <td className="p-4 font-medium">{s.usn}</td>
              <td className="p-4">{s.name === "Unknown" ? <span className="text-gray-600">—</span> : s.name}</td>
              <td className="p-4 font-mono text-sm text-gray-400">{s.ip || "—"}</td>
              <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  s.status === "joined" ? "bg-green-900/30 text-green-400 border border-green-800" : 
                  s.status === "declined" ? "bg-red-900/30 text-red-400 border border-red-800" : 
                  "bg-gray-800 text-gray-400 border border-gray-700"
                }`}>
                  {s.status.toUpperCase()}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;