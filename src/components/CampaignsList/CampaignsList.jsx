import React from 'react'
import { useContext, useEffect, useRef } from "react";
import { CampaignsContext } from "../../pages";
import styles from "./CampaignsList.module.css";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast } from "primereact/toast";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

export default function CampaignsList({ loading, error }) {
  const { campaigns, setCampaigns } = useContext(CampaignsContext);
  const router = useRouter();
  const toast = useRef(null);
  console.log("campaigns: ", campaigns);

  const createCampaign = async () => {
    const name = prompt("Enter campaign name:");
    if (!name) return;
    const description = prompt("Enter campaign description:") || "";

    try {
      const response = await axios.post("/api/campaigns", {
        name,
        description,
      });
      setCampaigns((prev) => [...prev, response.data.campaign]);
      toast.current.show({
        severity: "success",
        summary: "Created",
        detail: "Campaign created successfully!",
        life: 3000,
      });
    } catch (err) {
      console.error(err);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to create campaign",
        life: 3000,
      });
    }
  };

  const onJoinCampaign = (campaignId, campaignName) => {
    console.log("onJoinCampaign entered");
    const name = prompt("Enter your name:");
    if (!name) return;

    const clientId = localStorage.getItem("client_id") || uuidv4();
    localStorage.setItem("client_id", clientId);

    router.push({
      pathname: `/campaigns/${campaignId}/session`,
      query: { name, clientId, campaignName },
    });
  };

  const deleteCampaign = async (id, campaignName) => {
    console.log("id: ", id);
    if (!confirm(`Are you sure you want to delete "${campaignName}"?`)) return;
    try {
      await axios.delete(`/api/campaigns/${id}`);
      setCampaigns((prev) => prev.filter((c) => c.id !== id));
      toast.current.show({
        severity: "success",
        summary: "Deleted",
        detail: "Campaign removed successfully",
        life: 3000,
      });
    } catch (err) {
      console.error(err);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to delete campaign",
        life: 3000,
      });
    }
  };

  if (loading) return <p className="text-gray-400">Loading campaigns...</p>;
  if (error) return <p className="text-red-500">Failed to load campaigns.</p>;

  return (
    <div className="flex flex-col items-center p-6 w-full max-w-5xl mx-auto">
      <Toast ref={toast} />

      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome to DnD</h1>
        <p className="text-gray-400">
          Create or join a campaign to get started.
        </p>
      </header>

      <div className="mb-6 flex justify-center">
        <Button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow"
          onClick={createCampaign}
        >
          ➕ Create New Campaign
        </Button>
      </div>

      <section className="w-full">
        <h2 className="text-xl font-semibold mb-4">Available Campaigns</h2>

        {campaigns.length === 0 ? (
          <p className="text-gray-500 text-center">
            No campaigns yet. Create one!
          </p>
        ) : (
          <div className={styles.campaignGrid}>
            {campaigns.map((c) => {
              console.log("c: ", c);
              return (
                <div key={c.id} className={styles.campaignCard}>
                  <h3 className="text-lg font-semibold mb-1">{c.name}</h3>
                  <p className="text-gray-400 mb-2">
                    {c.description || "No description available"}
                  </p>
                  <small className="block text-gray-500 mb-3">
                    Created: {new Date(c.created_at).toLocaleDateString()}
                  </small>

                  <div className={styles.campaignActions}>
                    <button
                      className={`${styles.resumeButton} bg-green-600 hover:bg-green-700`}
                      onClick={() => onJoinCampaign(c.id, c.name)}
                    >
                      Join
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => deleteCampaign(c.id, c.name)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
