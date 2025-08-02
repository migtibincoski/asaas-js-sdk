import Payments from "./bin/payments";
import listPayments from "./bin/payments/list-payments";
import type {
  CreateNewPaymentBody,
  ListPaymentsBody,
} from "./bin/payments/types";
import AsaasSdkError from "./utils/error";
import console from "./utils/console";
import formatCPF from "./utils/format-cpf";
import validateCPF from "./utils/validate-cpf";

export type AsaasSdkConstructorConfig = {
  /** Base URL for the Asaas API
   * @default "https://api-sandbox.asaas.com" */
  baseURL?: string;

  /** API key for authentication */
  apiKey: string;

  /** API version (optional)
   * @default
   * "v3"
   */
  version?: string;

  /** Enable debug mode (optional)
   * @default
   * false
   */
  debug?: boolean;

  /** Custom user agent string. Read more about user agents at {@link https://docs.asaas.com/docs/authentication-2|Asaas Docs}.
   * @default
   * "AsaasSDK (Node.js)"
   */
  userAgent?: string;
};

class AsaasSDK {
  baseURL: string = "https://api-sandbox.asaas.com";
  apiKey: string;
  version: string = "v3";
  debug: boolean = false;
  userAgent: string = `AsaasSDK (Node.js)`;

  constructor(data: AsaasSdkConstructorConfig) {
    if (!data)
      throw new AsaasSdkError({
        name: "INITIALIZATION_ERROR",
        message: "Failed to initialize Asaas SDK",
        cause: "No data provided.",
      });

    if (typeof data !== "object")
      throw new AsaasSdkError({
        name: "INITIALIZATION_ERROR",
        message: "Failed to initialize Asaas SDK",
        cause: `Invalid data type. Expected "object", got "${typeof data}".`,
      });

    if ("debug" in data && typeof data.debug !== "boolean") {
      console.warn(
        "\x1b[33mDebug option should be a boolean. Defaulting to false...\x1b[0m"
      );
      data.debug = false;
    }

    const oldWarn = console.warn;
    console.warn = (...args: any[]) =>
      data.debug == true && oldWarn("\x1b[33m" + args.join(" ") + "\x1b[0m");

    if (data.baseURL) {
      let url = null;
      try {
        url = new URL(data.baseURL);
      } catch {
        throw new AsaasSdkError({
          name: "INITIALIZATION_ERROR",
          message: "Failed to initialize Asaas SDK",
          cause: `Invalid base URL. You provided: "${data.baseURL}".`,
        });
      }

      if (url.protocol.slice(0, -1) !== "https") {
        console.warn(
          "Base URL is not using HTTPS. This may cause issues with the API. Automatically switching to HTTPS..."
        );
        url.protocol = "https:";
        data.baseURL = url.origin;
      }
    } else {
      console.warn(
        'Base URL not provided. Defaulting to sandbox URL: "https://api-sandbox.asaas.com"...'
      );
      data.baseURL = this.baseURL;
      if (data.baseURL.endsWith("/")) data.baseURL = data.baseURL.slice(0, -1);
    }

    if (!("version" in data)) {
      console.warn('Version not provided. Defaulting to "v3"...');
      data.version = "v3";
    }

    if (typeof data.version !== "string")
      throw new AsaasSdkError({
        name: "INITIALIZATION_ERROR",
        message: "Failed to initialize Asaas SDK",
        cause: `Invalid version type. Expected "string", got "${typeof data.version}".`,
      });

    if (!("apiKey" in data))
      throw new AsaasSdkError({
        name: "INITIALIZATION_ERROR",
        message: "Failed to initialize Asaas SDK",
        cause: "Missing API key.",
      });

    if (typeof data.apiKey !== "string")
      throw new AsaasSdkError({
        name: "INITIALIZATION_ERROR",
        message: "Failed to initialize Asaas SDK",
        cause: `Invalid API key type. Expected "string", got "${typeof data.apiKey}".`,
      });

    if ("userAgent" in data && typeof data.userAgent !== "string")
      throw new AsaasSdkError({
        name: "INITIALIZATION_ERROR",
        message: "Failed to initialize Asaas SDK",
        cause: `Invalid userAgent type. Expected "string", got "${typeof data.userAgent}".`,
      });

    this.apiKey = data.apiKey;
    this.baseURL = data.baseURL || this.baseURL;
    this.version = data.version || this.version;
    this.debug = data.debug || this.debug;
    this.userAgent = data.userAgent || this.userAgent;
  }

  payments = {
    createNewPayment: (data: CreateNewPaymentBody) =>
      Payments.createNewPayment(this, data),
    listPayments: (data?: ListPaymentsBody) => listPayments(this, data),
  };
}

const utils = {
  cpf: {
    format: formatCPF,
    validate: validateCPF,
  },
};

export { utils, AsaasSDK };
