import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

function StartSession() {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const [duration, setDuration] = useState(60);
  const [allowedApps, setAllowedApps] = useState("");

  const startSession = () => {
  const payload = {
    type: "SESSION_START",
    groupId,
    duration,
    allowedApps: allowedApps.split(",").map(app => app.trim()),
    timestamp: Date.now(),
  };

  // @ts-ignore – exposed from Electron preload
  window.lan.broadcastSession(payload);

  navigate("/live-session");
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
