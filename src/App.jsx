import { useEffect, useState } from "react";
import MediaRecommendationBoard from "./components/mediaRecommendationBoard/index.jsx";
import BackToTop from "./components/backToTop/index.jsx";
import SiteFooter from "./components/siteFooter/index.jsx";
import SiteHeader from "./components/siteHeader/index.jsx";
import styles from "./App.module.css";

const App = () => {
    const [showBackToTop, setShowBackToTop] = useState(false);
    useEffect(() => {
        const update = () => setShowBackToTop(window.scrollY > 50);
        window.addEventListener("scroll", update, { passive: true });
        update();
        return () => window.removeEventListener("scroll", update);
    }, []);
    const repoUrl = "https://github.com/a2rp/media-recommendation-board";
    return <div className={styles.appShell} id="top">
        <SiteHeader title="Reel & Record" mark="R" repoUrl={repoUrl} navItems={[['Discover','#discover'],['My picks','#my-picks']]} />
        <main className={styles.pageContent}><MediaRecommendationBoard /></main>
        <SiteFooter repoUrl={repoUrl} />
        <BackToTop visible={showBackToTop} />
    </div>;
};

export default App;