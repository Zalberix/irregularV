import Head from "next/head";
import Link from "next/link";

import {api} from "~/utils/api";
import styles from "./index.module.css";
import {type irregularVerbT} from "src/server/model/irregularVerbs"
import {Button} from "@mui/material";

export default function Home() {
    const add = api.irregularVerbs.add.useQuery({
        v1: "do",
        v2: "did",
        v3: "done",
        translate: "Делать"
    });

    const newVerb = add.data ? add.data.verb : "";

    const get = api.irregularVerbs.get.useQuery({});
    const irregularVerbs = get.data ? get.data.irregularVerbs : [] as irregularVerbT[];
    return (
        <>
            <Head>
                <title>Irregular Verbs</title>
                <meta name="description" content="Lerning Irregular Verbs"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.main}>
                <div className={styles.container}>
                    <h1 className={styles.title}>
                        Irregular <span className={styles.pinkSpan}>Verbs</span> App
                    </h1>

                    <Button variant="contained">Hello</Button>
                    <p className={styles.showcaseText}>
                        {irregularVerbs.map(verb => (
                            <li key={verb.ID}>{verb.translate}</li>
                        ))}
                        {newVerb}
                    </p>
                </div>
            </main>
        </>
    );
}
