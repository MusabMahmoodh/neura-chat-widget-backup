export type DirectionType = "incoming" | "outgoing";
export type PositionType = "single" | "first" | "middle" | "last";
export type SenderType = "local" | "remote";

export interface CustomMessageModel {
  _id: string;
  message: string;
  sender: SenderType;
  direction: DirectionType;
  position: PositionType;
  time?: string;
}
