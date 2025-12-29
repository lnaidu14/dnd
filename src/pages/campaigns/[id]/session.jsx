import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import io from "socket.io-client";
import { Board, BoardControls } from "@/components";

import { Button } from "primereact/button";

export default function SessionPage() {
  const router = useRouter();
  const { id, name, campaignName } = router.query;

  const [role, setRole] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [playerCount, setPlayerCount] = useState(0);
  const [dmName, setDmName] = useState(null);
  const [sessionActive, setSessionActive] = useState(false);
  const [gridVisible, setGridVisible] = useState(true);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [measurement, setMeasurement] = useState(null);

  const toggleGrid = () => setGridVisible((prev) => !prev);
  const toggleSnapToGrid = () => setSnapToGrid((prev) => !prev);

  useEffect(() => {
    if (!id || !name) return;

    const socket = io("http://localhost:4000");

    socket.emit("joinCampaign", { campaignId: id, name });

    socket.on("roleAssigned", ({ role }) => setRole(role));

    socket.on("sessionUpdate", (data) => {
      setConnectedUsers(data.connected_users);
      setPlayerCount(data.player_count);
      setDmName(data.dm_name);
      setSessionActive(!data.session_closed);

      if (data.session_closed) {
        alert("The DM has closed the session. Redirecting to home screen.");
        router.push("/");
      }
    });

    return () => socket.disconnect();
  }, [id, name]);

  return (
    <div className="w-screen h-screen bg-gray-900 text-gray-100 flex flex-col">
      <div className="w-full p-3 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">
            {campaignName || "Unnamed Campaign"}
          </h1>
          <p className="text-gray-400 text-sm">
            {role ? `${role.toUpperCase()} view` : "Joining..."}
          </p>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <BoardControls
            gridVisible={gridVisible}
            toggleGrid={toggleGrid}
            snapToGrid={snapToGrid}
            toggleSnapToGrid={toggleSnapToGrid}
            measurement={measurement}
          />
          <span className="text-gray-300">Players: {playerCount}</span>
          <span className="text-gray-300">DM: {dmName || "None"}</span>

          <Button
            label="Leave"
            onClick={() => router.push("/")}
            severity="danger"
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white"
          />
        </div>
      </div>

      <div className="flex-1">
        <Board
          gridVisible={gridVisible}
          snapToGrid={snapToGrid}
          measurement={measurement}
          setMeasurement={setMeasurement}
        />
      </div>
    </div>
  );
}
