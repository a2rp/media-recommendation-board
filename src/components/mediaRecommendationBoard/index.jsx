import { useEffect, useMemo, useState } from "react";
import { FiArrowUpRight, FiBookmark, FiCheck, FiSearch } from "react-icons/fi";
import styles from "./styles.module.css";

const recommendations = [
    { id: 1, title: "Past Lives", medium: "Film", creator: "Celine Song · 2023", mood: "A quiet evening", note: "A tender story about the people we become and the lives we might have lived.", art: "pastLives" },
    { id: 2, title: "Station Eleven", medium: "Series", creator: "HBO · 2021", mood: "Something absorbing", note: "A humane post-apocalyptic story that keeps coming back to art and connection.", art: "station" },
    { id: 3, title: "A Psalm for the Wild-Built", medium: "Book", creator: "Becky Chambers · 2021", mood: "A small reset", note: "A gentle, short read about rest, purpose, and listening to what you need.", art: "psalm" },
    { id: 4, title: "Blue Weekend", medium: "Music", creator: "Wolf Alice · 2021", mood: "A long walk", note: "Big-hearted guitar songs for the part of the day when the light changes.", art: "blueWeekend" },
    { id: 5, title: "Firewatch", medium: "Game", creator: "Campo Santo · 2016", mood: "A little adventure", note: "A compact, thoughtful journey through a very large and quiet wilderness.", art: "firewatch" },
    { id: 6, title: "Perfect Days", medium: "Film", creator: "Wim Wenders · 2023", mood: "A quiet evening", note: "A patient portrait of small rituals and noticing the day in front of you.", art: "perfectDays" },
];
const mediaTypes = ["All", "Film", "Series", "Book", "Music", "Game"];
const storageKey = "reel-record-my-picks";

const MediaRecommendationBoard = () => {
    const [selectedType, setSelectedType] = useState("All");
    const [search, setSearch] = useState("");
    const [picks, setPicks] = useState(() => {
        try { return JSON.parse(localStorage.getItem(storageKey)) ?? [2, 5]; } catch { return [2, 5]; }
    });
    useEffect(() => localStorage.setItem(storageKey, JSON.stringify(picks)), [picks]);
    const visible = useMemo(() => recommendations.filter((item) => {
        const matchesType = selectedType === "All" || item.medium === selectedType;
        const text = `${item.title} ${item.creator} ${item.mood} ${item.note}`.toLowerCase();
        return matchesType && text.includes(search.toLowerCase());
    }), [selectedType, search]);
    const togglePick = (id) => setPicks((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
    const pickedItems = recommendations.filter((item) => picks.includes(item.id));

    return <div className={styles.board}>
        <section className={styles.intro} id="discover">
            <div className={styles.introCopy}>
                <span className={styles.sectionLabel}>A well-made shortlist</span>
                <h1>Your next favorite is in here.</h1>
                <p>Six considered picks for the nights when choosing takes longer than watching.</p>
                <a className={styles.jumpLink} href="#recommendations">Browse the list <FiArrowUpRight aria-hidden="true" /></a>
            </div>
            <div className={styles.featured}>
                <div className={`${styles.poster} ${styles.featurePoster}`} aria-hidden="true"><span>FIELD<br />NOTES</span><i /></div>
                <div><span className={styles.featureLabel}>This week’s pick</span><h2>Perfect Days</h2><p>Film · 2 hr 4 min</p></div>
                <button type="button" className={styles.featureButton} onClick={() => togglePick(6)} aria-pressed={picks.includes(6)}>{picks.includes(6) ? <FiCheck aria-hidden="true" /> : <FiBookmark aria-hidden="true" />} {picks.includes(6) ? "Saved" : "Save pick"}</button>
            </div>
        </section>

        <section className={styles.listSection} id="recommendations" aria-label="Recommendations">
            <div className={styles.sectionHeading}><div><h2>Made for your next free hour</h2><p>Browse by format, then keep the ones that speak to you.</p></div><label className={styles.search}><FiSearch aria-hidden="true" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search picks" aria-label="Search recommendations" /></label></div>
            <div className={styles.filters} role="group" aria-label="Filter by media type">{mediaTypes.map((type) => <button key={type} type="button" aria-pressed={selectedType === type} className={selectedType === type ? styles.activeFilter : ""} onClick={() => setSelectedType(type)}>{type}</button>)}</div>
            <div className={styles.grid}>{visible.map((item) => {
                const saved = picks.includes(item.id);
                return <article key={item.id} className={styles.card}>
                    <div className={`${styles.poster} ${styles[item.art]}`} aria-hidden="true"><span>{item.title}</span><small>{item.medium.toUpperCase()}</small><i /></div>
                    <div className={styles.cardBody}><div className={styles.cardMeta}><span>{item.medium}</span><span>{item.mood}</span></div><h3>{item.title}</h3><p className={styles.creator}>{item.creator}</p><p className={styles.note}>{item.note}</p><button type="button" className={saved ? styles.savedButton : styles.saveButton} onClick={() => togglePick(item.id)} aria-pressed={saved}>{saved ? <FiCheck aria-hidden="true" /> : <FiBookmark aria-hidden="true" />}{saved ? "In my picks" : "Save to my picks"}</button></div>
                </article>;
            })}</div>
            {visible.length === 0 && <p className={styles.empty}>No picks match that search. Try another title or format.</p>}
        </section>

        <section className={styles.picksSection} id="my-picks"><div><span className={styles.sectionLabel}>Your collection</span><h2>My picks <span>{pickedItems.length}</span></h2></div><div className={styles.picksList}>{pickedItems.length ? pickedItems.map((item) => <div key={item.id}><span>{item.medium}</span><strong>{item.title}</strong><button type="button" onClick={() => togglePick(item.id)} aria-label={`Remove ${item.title} from my picks`}>Remove</button></div>) : <p>Your saved recommendations will show up here.</p>}</div></section>
    </div>;
};

export default MediaRecommendationBoard;
