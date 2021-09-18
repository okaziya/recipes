import en from "../locales/en";

const locales = {en};
const lng = "en";

type Data = {
    [key: string]: Data | string;
};

const getValue = (data: Data, keys: string[]): string => {
    const key = keys.shift();

    if (!key) {
        return "";
    }

    const item = data[key];

    if (typeof item === "object") {
        return getValue(item, keys);
    }

    return item;
};

const i18n = {
    t: (
        key: string
    ) => getValue(locales[lng], key.split(".")) ?? key
}


export default i18n;