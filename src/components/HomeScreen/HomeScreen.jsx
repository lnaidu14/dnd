import styles from "./HomeScreen.module.css";
import {TabNavigator} from ".."
import { useState } from "react"

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState("dm")

  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <h1>Welcome to DnD</h1>
      </header>

      <main className={styles.main}>
        <TabNavigator activeTab={activeTab} setActiveTab={setActiveTab}/>
      </main>
    </div>
  );
}