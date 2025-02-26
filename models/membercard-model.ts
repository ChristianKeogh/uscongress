export interface Member {
  bioguideId: string;
  name: string;
  partyName: string;
  state: string;
  terms: { item: { chamber: string; startYear: number; endYear?: number }[] };
  depiction?: { imageUrl?: string };
  url: string;
}
