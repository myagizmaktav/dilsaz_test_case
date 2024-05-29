import Head from "next/head";
import { Inter } from "next/font/google";
import { useInitialHook } from "@/hook/initialHook";
import styles from "./main.module.scss";
import { Tables } from "../tables/tables";
import { Modal } from "../modals/modal/modal";
const inter = Inter({ subsets: ["latin"] });
export const Main = () => {
  useInitialHook();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={` ${inter.className} ${styles.toMiddle}`}>
        <Modal />
        <Tables />
      </main>
    </>
  );
};
