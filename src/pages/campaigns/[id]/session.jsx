import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import io from "socket.io-client";

export default function SessionPage() {
  const router = useRouter();
  const { id, name, campaignName } = router.query;

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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 p-6 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-2">
          Campaign <span className="text-indigo-400">#{campaignName}</span>
        </h1>

        {role && (
          <h2
            className={`text-xl font-semibold text-center mb-6 ${
              role === "dm" ? "text-yellow-400" : "text-green-400"
            }`}
          >
            You are the {role.toUpperCase()}
          </h2>
        )}

        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-400">
            🧙‍♂️ Players connected: <b>{playerCount}</b>
          </span>
          <button
            onClick={() => router.push("/")}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
          >
            Leave Session
          </button>
        </div>

        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <h3 className="text-lg font-semibold mb-3">Connected Users</h3>
          {connectedUsers.length === 0 ? (
            <p className="text-gray-400 text-center">
              No one is connected yet.
            </p>
          ) : (
            <ul className="space-y-2">
              {connectedUsers.map((user) => (
                <li
                  key={user}
                  className={`flex justify-between items-center px-3 py-2 rounded-lg transition ${
                    user === name
                      ? "bg-indigo-600/30 border border-indigo-500/40"
                      : "bg-gray-700/30 hover:bg-gray-700/50"
                  }`}
                >
                  <span
                    className={`font-medium ${
                      user === name ? "text-indigo-300" : "text-gray-200"
                    }`}
                  >
                    {user}
                  </span>
                  {user === name && (
                    <span className="text-xs bg-indigo-600 px-2 py-1 rounded-md text-white">
                      You
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {role === "dm" && (
          <p className="text-yellow-400 mt-6 text-sm text-center">
            🧭 You are the Dungeon Master. If you leave, the session will close
            for everyone.
          </p>
        )}
      </div>
    </div>
  );
}

