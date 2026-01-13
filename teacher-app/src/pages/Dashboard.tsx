import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";

type Group = {
  id: string;
  groupName: string;
};

function Dashboard() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      const snapshot = await getDocs(collection(db, "groups"));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as { groupName: string }),
      }));
      setGroups(data);
      setLoading(false);
    };

    fetchGroups();
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Dashboard</h1>

      <button onClick={() => navigate("/create-group")}>
        Create Group
      </button>

      <h2>Your Groups</h2>

      {loading && <p>Loading groups...</p>}

      {!loading && groups.length === 0 && (
        <p>No groups created yet.</p>
      )}

      <ul>
        {groups.map(group => (
          <li key={group.id}>
            <button
              onClick={() => navigate(`/start-session/${group.id}`)}>
              {group.groupName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
