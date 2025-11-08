import React from 'react'
import { useContext, useState, useRef } from "react"
import { CampaignsContext } from "../../pages"
import styles from "./CampaignsList.module.css";
import { Button } from 'primereact/button';
import axios from "axios"
import { Toast } from 'primereact/toast';
import { useRouter } from "next/router";        

export default function CampaignsList() {
const { campaigns, setCampaigns } = useContext(CampaignsContext)
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const toast = useRef(null);
console.log("campaigns: ", campaigns)
const router = useRouter();

const onJoinCampaign = (campaignId) => {
  const name = prompt("Enter your name:");
  if (!name) return;

  router.push({
    pathname: `/campaigns/${campaignId}/session`,
    query: { name },
  });
};

const deleteCampaign = async (id) => {
  try {
    const response = await axios.delete(`/api/campaigns/${id}`);
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Successfully deleted campaign",
      life: 3000,
    });
  } catch (err) {
    console.error(err);
    setError(err);
    toast.current.show({
      severity: "failure",
      summary: "Failure",
      detail: "Failed to delete campaign",
      life: 3000,
    });
  } finally {
    setLoading(false);
  }
};

return (
  <div>
    <Toast ref={toast} />
    <div>
      {campaigns && (
        <section style={{ width: "100%", height: "100%" }}>
          <h2>Active Campaigns</h2>
          <div className={styles.campaignGrid}>
            {campaigns.map((campaign) => (
              <div key={campaign.id} className={styles.campaignCard}>
                <h3>{campaign.name}</h3>
                <p>{campaign.description || "No description"}</p>
                <small>
                  Created:
                  {new Date(campaign.created_at).toLocaleDateString()}
                </small>
                <div className={styles.campaignActions}>
                  <Button
                    label="Resume as DM"
                    className={styles.resumeButton}
                    onClick={() => onJoinCampaign(campaign.id)}
                  />
                  <Button
                    className={styles.deleteButton}
                    onClick={() => {
                      if (
                        confirm(
                          `Are you sure you want to delete "${campaign.name}"? This cannot be undone.`
                        )
                      ) {
                        deleteCampaign(campaign.id);
                      }
                    }}
                    icon="pi pi-trash"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  </div>
);
}
