import React, { useCallback, useEffect, useState } from "react";
import { Option } from "../../types/option";
import { Arrow } from "../../components/Arrow";
import { ValidKeyPress } from "../../types/validKeypress";
import { View } from "../../types/view";

export function ArrowView({ condition, view }: { condition: Option[]; view: View }) {
  const [songIndex, setSongIndex] = useState(0);
  const [songStartTime, setSongStartTime] = useState(0);

  const leftOption = condition[0];
  const downOption = condition[1];
  const rightOption = condition[2];

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
    //   playTrack(nextSongIndex * 10).then(() => {});
      setSongStartTime(currentTime);
      console.log("songStartTime", currentTime);
    },
    [songIndex, songStartTime]
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
  // Set keydown listeners. Pressing arrow buttons will trigger selectOption function.
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
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
  );
}
