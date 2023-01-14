import { Option } from "../types/option";

export const CONDITIONS = [
  [Option.Personal, Option.Familiar, Option.Unfamiliar],
  [Option.Personal, Option.Unfamiliar, Option.Familiar],
  [Option.Familiar, Option.Personal, Option.Unfamiliar],
  [Option.Familiar, Option.Unfamiliar, Option.Personal],
  [Option.Unfamiliar, Option.Personal, Option.Familiar],
  [Option.Unfamiliar, Option.Familiar, Option.Personal],
];
