import React, {
  useCallback,
  useMemo,
  useState,
} from "react";
import { Howl } from "howler";

import styles from "../styles/Home.module.css";
import { ArrowView } from "../components/ArrowView";
import { CONDITIONS } from "../constants/conditions";
import { View } from "../types/view";
import { Header } from "../components/Header";

const numberBetweenZeroAndFive = Math.floor(Math.random() * 5);
const randomizedCondition = CONDITIONS[numberBetweenZeroAndFive];

export default function Home() {
  var sound = useMemo(() => {
    return new Howl({
      src: ["./test.mp3"], // TODO: get user sound clip from firebase
    });
  }, []);

  const [view, setView] = useState(View.Start);

  const [timeoutArray, setTimeoutArray] = useState<NodeJS.Timeout[]>([]);

  const clearExpiredTimeouts = useCallback(() => {
    timeoutArray.forEach((timeout) => {
      clearTimeout(timeout);
    });
  }, [timeoutArray]);

  const startStudy = () => {
    console.log("Starting study");
    playTrack(0);
    setView(View.Arrows);
  };

  const pauseTrack = useCallback(() => {
    console.log("Pausing Track at time: ");
    sound.pause();
  }, [sound]);

  const playTrack = useCallback(
    async (time: number) => {
      console.log("Playing track at seek time: ", time);
      // play song at new time
      sound.stop();
      sound.seek(time);
      // sound.play();

      // push new timeout into array
      const timeout = setTimeout(() => {
        pauseTrack();
      }, 10000);
      setTimeoutArray([...timeoutArray, timeout]);
      clearExpiredTimeouts();
    },
    [sound, pauseTrack, setTimeoutArray, timeoutArray, clearExpiredTimeouts]
  );

  return (
    <>
      <Header />
      <main className={styles.main}>
        {view === View.Start && <button onClick={startStudy}>START</button>}
        {view === View.Arrows && (
          <ArrowView condition={randomizedCondition} view={view} />
        )}
      </main>
    </>
  );
}
