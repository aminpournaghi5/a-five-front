export interface IExercise {
  _id: string;
  ID: number;
  NameFarsi: string;
  Name?: string;
  Target?: string;
  TargetFarsi?: string;
  Synergist?: string;
  SynergistFarsi?: string;
  Equipment?: string;
  Type?: string;
  Gender?: string;
  Abzar?: string;
  TypeFarsi?: string;
  Body?: string;
  setsReps?: any;
  rows: row[];
}

export type Set = number | "گرم کردن" | "تا واماندگی" | "دراپ ست";
export type Reps = number | { min: number; max: number };

export interface row {
  set: Set;
  reps: Reps;
}
