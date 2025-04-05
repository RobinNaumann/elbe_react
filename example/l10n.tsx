import { makeL10n } from "elbe-ui";

const en_IE = {
  good_morning: "good morning",
  welcome: "welcome",
};

const en_IE_easy = {
  good_morning: "hello",
};

const de_DE = {
  good_morning: "Guten Morgen",
  welcome: "Willkommen",
};

const de_DE_easy = {
  good_morning: "Hallo",
};

export const { L10n, useL10n } = makeL10n(
  { en_IE },
  {
    en_IE_easy,
    de_DE,
    de_DE_easy,
  }
);
