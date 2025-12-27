import { ErrorBoundary, CampaignsList } from "../components";
import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const CampaignsContext = createContext({
  campaigns: [],
  setCampaigns: () => {},
});

export default function Home() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get("/api/campaigns");
        setCampaigns(response.data.campaigns);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  return (
    <CampaignsContext.Provider value={{ campaigns, setCampaigns }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <ErrorBoundary>
          <CampaignsList loading={loading} error={error} />
        </ErrorBoundary>
      </div>
    </CampaignsContext.Provider>
  );
}
