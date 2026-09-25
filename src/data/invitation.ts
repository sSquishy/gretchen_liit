import type { AfterDinnerChoiceId, DinnerChoiceId, InvitationOption } from "@/src/types/invitation";

export const eventDetails = {
  date: "September 26, 2026",
  location: "SM Megamall",
  time: "9:30 PM",
  seats: ["L26", "L27", "L28"],
  beforeYouGoMessage: "You don't really need to prepare anything.\n\nJust show up.\n\nI'll handle the rest.",
  peopleCount: 3,
  movieTitle: "Movie Night",
  ticketsStatus: "Tickets are already taken care of. 😌",
};

export const dinnerOptions: InvitationOption[] = [
  { id: "manam", label: "Manam", badge: "", links: ["https://www.facebook.com/ManamCafeMegamall/"] },
  {
    id: "kenny-rogers",
    label: "Kenny Rogers",
    badge: "",
    links: ["https://www.facebook.com/KennyRogersPH/posts/awesome-new-location-at-sm-megamall-visit-us-at-upper-ground-level-mega-a-see-yo/934462778721743/"],
  },
  {
    id: "yayoi",
    label: "YAYOI",
    badge: "JAPANESE",
    links: [
      "https://yayoi.com.ph/menu/",
      "https://foods.nowinquire.com/store/SM-Megamall/YAYOI/Building-B;Level-3;BLDG-B",
    ],
  },
  { id: "jollibee", label: "Jollibee", badge: "CASUAL" },
  { id: "other", label: "Something Else?", badge: "YOUR CHOICE" },
];

export const afterDinnerOptions: InvitationOption[] = [
  { id: "coffee", label: "Coffee", emoji: "☕" },
  { id: "matcha", label: "Matcha", emoji: "🍵" },
  { id: "dessert", label: "Dessert", emoji: "🍰" },
  { id: "something-cold", label: "Something cold", emoji: "🧊" },
  { id: "walk-around", label: "Walk around", emoji: "🚶" },
  { id: "decide-there", label: "Decide there", emoji: "🤷" },
  { id: "whatever", label: "Whatever you're craving", emoji: "✨" },
];

export const itineraryRows = [
  // { time: "3:00 PM", activity: "You + friend meet in Fairview" },
  // { time: "3:15 PM", activity: "Head to SM Megamall" },
  { time: "~5:00 PM", activity: "We arrive & wait for you" },
  { time: "~7:00–6:30 PM", activity: "You arrive. Okay, now the evening actually starts." },
  { time: "7:20 PM", activity: "Dinner" },
  // { time: "~8:00 PM", activity: "Walk & hang out" },
  { time: "~8:00 PM", activity: "'We'll See 👀'" },
  { time: "~9:00 PM", activity: "Head to the cinema" },
  { time: "9:30 PM", activity: "Movie", highlight: true },
];

export const beforeYouGoCards = [
  { title: "DRESS CODE", detail: "Whatever you're comfortable in." },
  { title: "DINNER", detail: "We'll decide together." },
  { title: "MOVIE", detail: "9:30 PM" },
  { title: "SNACKS", detail: "Before the movie." },
  { title: "AFTER", detail: "inDrive home." },
];

export const defaultDinnerChoice: DinnerChoiceId = "manam";
export const defaultAfterDinnerChoices: AfterDinnerChoiceId[] = ["dessert"];
