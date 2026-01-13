import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type Student = {
  usn: string;
  name: string;
  status: "verified" | "unknown";
};

function LiveSession() {
  const location = useLocation();
  const allowedUSNs: string[] = location.state?.allowedUSNs || [];

  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
  let started = false;

  if (!started) {
    // @ts-ignore
    window.lan.listenForStudents((student: any) => {
      setStudents(prev => {
        if (prev.find(s => s.usn === student.usn)) return prev;
        return [...prev, student];
      });
    });
    started = true;
  }
}, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Live Session</h1>

      <ul>
        {students.map(s => (
          <li key={s.usn}>
            {s.name} ({s.usn}) —{" "}
            <strong>{s.status.toUpperCase()}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LiveSession;
