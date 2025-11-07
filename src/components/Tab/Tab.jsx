import { useState, useRef, useContext } from 'react'
import styles from "./Tab.module.css";
import axios from "axios"
import { Toast } from 'primereact/toast';
import { CampaignsContext } from "../../pages"

export default function Tab({activeTab}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useRef(null);
  const { setCampaigns } = useContext(CampaignsContext);
  const createCampaign = async () => {
  const campaignName = prompt("Enter campaign name:");
    if (!campaignName) return;

    const campaignDescription = prompt("Enter campaign description:");
    const campaignData = {
      name: campaignName,
      description: campaignDescription ?? ""
    }
    try {
        const response = await axios.post('/api/campaigns', campaignData);
        setCampaigns((prev) => [...prev, response.data.campaign]);
        toast.current.show({severity:'success', summary: 'Success', detail:'Successfully created campaign', life: 3000});
    } catch (err) {
        console.error(err)
        setError(err);
        toast.current.show({severity:'failure', summary: 'Failure', detail:'Failed to create campaign', life: 3000});
    } finally {
        setLoading(false);
    }
  };

  return (
    <>
        <Toast ref={toast} />
        {activeTab === "dm" && (
        <div className={styles.tabContent}>
          <div>
            <button
              className={`${styles.button} ${styles.buttonPrimary}`}
              onClick={async () => {
                await createCampaign();
              }}
            >
              Create New Campaign
            </button>
          </div>
        </div>
      )}

      {activeTab === "player" && (
        <div className={styles.tabContent}>
          <div className={styles.instructions}>
            <h3>Join an Active Campaign</h3>
            <p>
              Ask your DM for the campaign name, then click on it below to join:
            </p>
          </div>
        </div>
      )}
    </>
  )
}
