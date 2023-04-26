export interface EventInteface {
  _id: string;
  name: string;
  timestamp: string;
  severity: string;
}

export interface InfoInteface {
  ignored: number;
  reported: number;
}
