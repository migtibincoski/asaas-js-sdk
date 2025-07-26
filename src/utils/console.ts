const info = (...args: any[]) =>
  console.info("\x1b[34m" + args.join(" ") + "\x1b[0m");
const warn = (...args: any[]) =>
  console.warn("\x1b[33m" + args.join(" ") + "\x1b[0m");
const success = (...args: any[]) =>
  console.log("\x1b[32m" + args.join(" ") + "\x1b[0m");
const log = (...args: any[]) => console.log(...args);

export default { info, warn, success, log };
