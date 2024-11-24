export interface IExercise {
  index(index: any): void;
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
  rows: Irow[];
}

export type Set = number | "گرم کردن" | "تا واماندگی" | "دراپ ست";
export type Reps = number | { min: number; max: number };

export interface Irow {
  index: number;
  set: Set;
  reps: Reps;
}
