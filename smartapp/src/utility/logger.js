// logger.js
const isDev = import.meta.env.NODE_ENV === "development";

const logger = {
  log: (...args) => {
    if (isDev) console.log("%c[LOG]", "color: blue", ...args);
  },
  warn: (...args) => {
    if (isDev) console.warn("%c[WARN]", "color: orange", ...args);
  },
  error: (...args) => {
    console.error("%c[ERROR]", "color: red", ...args);
  },
};

export default logger;
