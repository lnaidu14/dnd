import styles from "./TabNavigator.module.css";
import { Tab } from "../"
import CampaignsList from "../CampaignsList/CampaignsList";
import { Button } from 'primereact/button';  


export default function TabNavigator({activeTab, setActiveTab}) {
  return (
    <>
      <div className={styles.tabNav}>
          <Button className={`${styles.tab} ${
              activeTab === "dm" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("dm")} >
            🎲 Dungeon Master
          </Button>
          <button
            className={`${styles.tab} ${
              activeTab === "player" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("player")}
          >
            ⚔️ Player
          </button>

          
        </div>
        
        {activeTab === "dm" && (
          <>
            <Tab activeTab={activeTab} />
            <CampaignsList />
          </>
        )}
    </>
  );
}