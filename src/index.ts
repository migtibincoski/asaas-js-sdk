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
  baseURL: string;
  apiKey: string;
  version?: string;
  debug?: boolean;
};

class AsaasSDK {
  baseURL: string = "https://api-sandbox.asaas.com";
  apiKey: string;
  version: string = "v3";
  debug: boolean = false;

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

    if ("debug" in data && data.debug && typeof data.debug !== "boolean") {
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

    if (!data.version) {
      console.warn('Version not provided. Defaulting to "v3"...');
      data.version = "v3";
    }

    if (typeof data.version !== "string")
      throw new AsaasSdkError({
        name: "INITIALIZATION_ERROR",
        message: "Failed to initialize Asaas SDK",
        cause: `Invalid version type. Expected "string", got "${typeof data.version}".`,
      });

    if (!data.apiKey)
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

    this.apiKey = data.apiKey;
    this.baseURL = data.baseURL || this.baseURL;
    this.version = data.version || this.version;
    this.debug = data.debug || this.debug;
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
