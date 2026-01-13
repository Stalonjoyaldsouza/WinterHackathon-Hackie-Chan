import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";


function StartSession() {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const [duration, setDuration] = useState(60);
  const [allowedApps, setAllowedApps] = useState("");

  const startSession = async () => {
  if (!groupId) return;

  const groupRef = doc(db, "groups", groupId);
  const snap = await getDoc(groupRef);

  if (!snap.exists()) {
    alert("Group not found");
    return;
  }

  const group = snap.data();
  const allowedUSNs = group.students.map((s: any) => s.usn);

  const payload = {
    type: "SESSION_START",
    groupId,
    duration,
    allowedApps: allowedApps.split(",").map(a => a.trim()),
    allowedUSNs,
    timestamp: Date.now(),
  };

  // @ts-ignore
  window.lan.broadcastSession(payload);

  navigate("/live-session", {
    state: { allowedUSNs }
  });
};



  return (
    <div style={{ padding: "40px" }}>
      <h1>Start Session</h1>

      <p>Group ID: {groupId}</p>

      <label>
        Duration (minutes):
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
      </label>

      <br /><br />

      <label>
        Allowed Apps (comma separated):
        <input
          placeholder="chrome, vscode"
          value={allowedApps}
          onChange={(e) => setAllowedApps(e.target.value)}
        />
      </label>

      <br /><br />

      <button onClick={startSession}>Start Session</button>
    </div>
  );
}

export default StartSession;
