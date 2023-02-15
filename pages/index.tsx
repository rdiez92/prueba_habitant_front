import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Habitant</title>
        <meta name="description" content="Habitant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          <Link href="/register" className={styles.card}>
            <h2>Register Page</h2>
          </Link>

          <Link href="/login" className={styles.card}>
            <h2>Login Page</h2>
          </Link>
        </div>
      </main>
    </div>
  );
}
