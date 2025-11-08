import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import io from "socket.io-client";

export default function SessionPage() {
  const router = useRouter();
  const { id, name } = router.query;

  const [role, setRole] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [playerCount, setPlayerCount] = useState(0);

  useEffect(() => {
    if (!id || !name) return;

    const socket = io("http://localhost:4000");

    socket.emit("joinCampaign", { campaignId: id, name });

    socket.on("roleAssigned", ({ role }) => setRole(role));

    socket.on("sessionUpdate", (data) => {
      setConnectedUsers(data.connected_users);
      setPlayerCount(data.player_count);

      if (data.session_closed) {
        alert("The DM has closed the session.");
        router.push("/");
      }
    });

    socket.on("sessionClosed", () => {
      alert("The DM has left. Session closed.");
      router.push("/");
    });

    return () => socket.disconnect();
  }, [id, name]);

  return (
    <div>
      <h1>Session for Campaign {id}</h1>
      {role && <h2>You are the {role.toUpperCase()}</h2>}
      <p>Players connected: {playerCount}</p>
      <ul>
        {connectedUsers.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

