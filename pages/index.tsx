// Import FirebaseAuth and firebase.
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { Howl } from "howler";

import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Arrow } from "../components/Arrow";
import { ValidKeyPress } from "../types/validKeypress";
import { Option } from "../types/option";

import firebase from "firebase/app";

enum View {
  Start, // no arrows showing, disable controls
  Blank, // no arrows showing, disable controls
  Arrows, // arrows showing, enable controls
}

const CONDITIONS = [
  [Option.Personal, Option.Familiar, Option.Unfamiliar],
  [Option.Personal, Option.Unfamiliar, Option.Familiar],
  [Option.Familiar, Option.Personal, Option.Unfamiliar],
  [Option.Familiar, Option.Unfamiliar, Option.Personal],
  [Option.Unfamiliar, Option.Personal, Option.Familiar],
  [Option.Unfamiliar, Option.Familiar, Option.Personal],
];

const numberBetweenZeroAndFive = Math.floor(Math.random() * 5);
const randomizedCondition = CONDITIONS[numberBetweenZeroAndFive];

export default function Home() {
  // Listen to the Firebase Auth state and set the local state.

  var sound = useMemo(() => {
    return new Howl({
      src: ["./test.mp3"], // TODO: get user sound clip from firebase
    });
  }, []);

  const [view, setView] = useState(View.Start);
  const [currentCondition, setCurrentCondition] = useState<Option[]>([]);

  const [songIndex, setSongIndex] = useState(0);
  const [songStartTime, setSongStartTime] = useState(0);

  const [timeoutArray, setTimeoutArray] = useState<NodeJS.Timeout[]>([]);

  const leftOption = currentCondition[0];
  const downOption = currentCondition[1];
  const rightOption = currentCondition[2];

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

  const selectOption = useCallback(
    (option: Option) => {
      let currentTime = performance.now();
      let nextSongIndex = songIndex + 1;

      // increment songIndex to the next song playing
      setSongIndex(nextSongIndex);

      // record songStartTime - currentTime into responseTimes array
      let responseTime = songStartTime - currentTime;
      console.log("send option to DB", option);
      console.log("send responseTime to DB", responseTime);

      // play next song (songIndex * 10) and record this songStartTime
      // then hide Arrow view and show Blank view and wait 3 seconds
      playTrack(nextSongIndex * 10).then(() => {});
      setSongStartTime(currentTime);
      console.log("songStartTime", currentTime);
    },
    [playTrack, songIndex, songStartTime]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // if view is blank, don't handle keyboard events
      if (view === View.Blank) return;

      let key = event.key;
      switch (key) {
        case ValidKeyPress.ArrowLeft:
          selectOption(leftOption);
          return;
        case ValidKeyPress.ArrowDown:
          selectOption(downOption);
          return;
        case ValidKeyPress.ArrowRight:
          selectOption(rightOption);
          return;
      }
    },
    [downOption, leftOption, rightOption, selectOption, view]
  );

  async function getCloudFunctionShit() {
    const response = await fetch("/exportData");
    return response.json();
  }

  const handleClick = async () => {
    const response = await getCloudFunctionShit();
    console.log(response);
  };

  // Set keydown listeners. Pressing arrow buttons will trigger selectOption function.
  useEffect(() => {
    setCurrentCondition(randomizedCondition);

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, sound]);

  return (
    <>
      <Head>
        <title>Baycrest Music Study</title>
        <meta
          name="description"
          content="Psych study developed for Baycrest Hospital"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {view === View.Start && (
          <>
            <div onClick={startStudy}>START</div>
            <button onClick={handleClick}>IM TRIGGERING</button>
          </>
        )}
        {view === View.Arrows && (
          <>
            <Arrow
              onClick={() => selectOption(leftOption)}
              direction="left"
              label={leftOption}
            />
            <Arrow
              onClick={() => selectOption(downOption)}
              direction="down"
              label={downOption}
            />
            <Arrow
              onClick={() => selectOption(rightOption)}
              direction="right"
              label={rightOption}
            />
          </>
        )}
      </main>
    </>
  );
}
