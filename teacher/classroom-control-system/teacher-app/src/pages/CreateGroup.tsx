import { useState } from "react";
import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function CreateGroup() {
  const [groupName, setGroupName] = useState("");
  const [students, setStudents] = useState([
    { name: "", usn: "", email: "" },
  ]);

  const navigate = useNavigate();

  const addStudent = () => {
    setStudents([...students, { name: "", usn: "", email: "" }]);
  };

  const updateStudent = (index: number, field: string, value: string) => {
    const copy = [...students];
    // @ts-ignore (we keep it simple)
    copy[index][field] = value;
    setStudents(copy);
  };

  const saveGroup = async () => {
    if (!groupName) {
      alert("Group name required");
      return;
    }

    await addDoc(collection(db, "groups"), {
      groupName,
      students,
      createdAt: new Date(),
    });

    alert("Group saved");
    navigate("/dashboard");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Create Group</h1>

      <input
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />

      <h3>Students</h3>

      {students.map((s, i) => (
        <div key={i}>
          <input
            placeholder="Name"
            value={s.name}
            onChange={(e) => updateStudent(i, "name", e.target.value)}
          />
          <input
            placeholder="USN"
            value={s.usn}
            onChange={(e) => updateStudent(i, "usn", e.target.value)}
          />
          <input
            placeholder="Email"
            value={s.email}
            onChange={(e) => updateStudent(i, "email", e.target.value)}
          />
        </div>
      ))}

      <button onClick={addStudent}>Add Student</button>
      <br /><br />
      <button onClick={saveGroup}>Save Group</button>
    </div>
  );
}

export default CreateGroup;
