import { i18n } from "i18next";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const langJSON = require("../global/i18n/langs/en.json");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const langJSONPT = require("../global/i18n/langs/pt.json");

const getErrorLabel = (i18n: i18n, key?: string | null) => {
  const empty = {
    title: "",
    msg: ""
  };
  if (!key) return empty;

  const errorsKeys = Object.keys(langJSON.errors);

  const msgKey = errorsKeys.find((el) => el === key);
  if (!msgKey) return empty;

  const titleKey = msgKey.split("-")[0];

  const language = i18n.language === "pt" ? langJSONPT.errors : langJSON.errors;
  const result = {} as any;

  result.title = language.title[titleKey];
  result.msg = language[msgKey];

  if (language[msgKey] === undefined) {
    return {
      title: language.title["UNKNOWN_ERROR"],
      msg: language["UNKNOWN_ERROR"]
    };
  }

  return result;
};

export default getErrorLabel;
