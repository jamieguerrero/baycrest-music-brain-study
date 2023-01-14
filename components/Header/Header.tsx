import Head from "next/head";

export function Header() {
  return (
    <Head>
      <title>Baycrest Music Study</title>
      <meta
        name="description"
        content="Psych study developed for Baycrest Hospital"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
