export interface NewConvertScripture {
  ref: string;
  note?: string;
}

export interface NewConvertSection {
  id: string;
  title: string;
  content: string;
  bullets?: string[];
  scriptures?: NewConvertScripture[];
  tips?: string[];
}

