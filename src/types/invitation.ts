export type DinnerChoiceId =
  | "manam"
  | "kenny-rogers"
  | "yayoi"
  | "jollibee"
  | "other";

export type AfterDinnerChoiceId =
  | "coffee"
  | "matcha"
  | "dessert"
  | "something-cold"
  | "walk-around"
  | "decide-there"
  | "whatever";

export interface InvitationOption {
  id: string;
  label: string;
  description?: string;
  emoji?: string;
  badge?: string;
  links?: string[];
}

export interface DinnerSelection {
  optionId: DinnerChoiceId;
  preference: string;
}

export interface RSVPFormState {
  name: string;
  email: string;
  notes: string;
}

export interface InvitationSummary {
  dinnerChoice: string;
  afterDinnerChoices: string[];
  movie: string;
  seats: string[];
}
