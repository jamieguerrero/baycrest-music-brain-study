import React from "react";
import styles from "./Arrow.module.css";
import { Inter } from "@next/font/google";
import { ValidKeyPress } from "../../types/validKeypress";

const inter = Inter({ subsets: ["latin"] });

const getStyles = (direction: string) => {
  switch (direction) {
    case "down":
      return styles.downArrow;
    case "left":
      return styles.leftArrow;
    case "right":
      return styles.rightArrow;
    default:
      return styles.downArrow;
  }
};

export const Arrow = ({
  onClick,
  label,
  direction,
}: {
  onClick: () => void;
  label: string;
  direction: "left" | "down" | "right";
}) => {
  let arrowStyle = getStyles(direction);

  return (
    <div className={styles.arrow}>
      <div className={arrowStyle} onClick={onClick}>
        &#9654;
      </div>
      <p className={inter.className}>{label}</p>
    </div>
  );
};
