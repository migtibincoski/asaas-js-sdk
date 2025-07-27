import type { AsaasSdkConstructorConfig } from "../..";
import AsaasSdkError from "../../utils/error";
import type {
  CreateNewPaymentBody,
  CreateNewPaymentResponse200,
} from "./types";

export default async function createNewPayment(
  data: AsaasSdkConstructorConfig,
  body: CreateNewPaymentBody
): Promise<CreateNewPaymentResponse200> {
  if (!("customer" in body)) {
    throw new AsaasSdkError({
      name: "MISSING_PARAMETERS",
      message: "Failed to create a new payment.",
      cause: 'The "customer" parameter is missing.',
    });
  } else if (typeof body.customer != "string") {
    throw new AsaasSdkError({
      name: "INVALID_PARAMETERS",
      message: "Failed to create a new payment.",
      cause: `The "customer" parameter needs to be "string". You provided "${typeof body.customer}".`,
    });
  }

  if (
    "billingType" in body &&
    !(
      body.billingType === "UNDEFINED" ||
      body.billingType === "CREDIT_CARD" ||
      body.billingType === "BOLETO" ||
      body.billingType === "PIX" ||
      body.billingType === ""
    )
  ) {
    throw new AsaasSdkError({
      name: "INVALID_PARAMETERS",
      message: "Failed to create a new payment.",
      cause: `The "billingType" parameter needs to be "UNDEFINED", "CREDIT_CARD", "BOLETO" or "PIX". You provided "${body.billingType}".`,
    });
  } else {
    if (body.billingType === "") body.billingType = "UNDEFINED";
  }

  if (!("value" in body)) {
    throw new AsaasSdkError({
      name: "MISSING_PARAMETERS",
      message: "Failed to create a new payment.",
      cause: 'The "value" parameter is missing.',
    });
  } else if (isNaN(Number(body.value))) {
    throw new AsaasSdkError({
      name: "INVALID_PARAMETERS",
      message: "Failed to create a new payment.",
      cause: `The "value" parameter needs to be "number". You provided "${typeof body.value}".`,
    });
  } else if (body.value <= 0) {
    throw new AsaasSdkError({
      name: "INVALID_PARAMETERS",
      message: "Failed to create a new payment.",
      cause: `The "value" parameter needs to be more than 0 (zero). You provided "${typeof body.value}".`,
    });
  }

  if (!("dueDate" in body)) {
    throw new AsaasSdkError({
      name: "MISSING_PARAMETERS",
      message: "Failed to create a new payment.",
      cause: 'The "dueDate" parameter is missing.',
    });
  } else if (typeof body.dueDate != "string") {
    throw new AsaasSdkError({
      name: "INVALID_PARAMETERS",
      message: "Failed to create a new payment.",
      cause: `The "dueDate" parameter needs to be "string". You provided "${typeof body.dueDate}".`,
    });
  } else {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(body.dueDate)) {
      throw new AsaasSdkError({
        name: "INVALID_PARAMETERS",
        message: "Failed to create a new payment.",
        cause: `The "dueDate" parameter must be in the format "YYYY-MM-DD". You provided "${body.dueDate}".`,
      });
    }

    const dueDate = new Date(`${body.dueDate} 00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(dueDate.getTime())) {
      throw new AsaasSdkError({
        name: "INVALID_PARAMETERS",
        message: "Failed to create a new payment.",
        cause: `The "dueDate" parameter is not a valid date. You provided "${body.dueDate}".`,
      });
    }

    if (dueDate < today) {
      throw new AsaasSdkError({
        name: "INVALID_PARAMETERS",
        message: "Failed to create a new payment.",
        cause: `The "dueDate" parameter must be today or a future date. You provided "${body.dueDate}".`,
      });
    }
  }

  if (
    "description" in body &&
    body.description &&
    typeof body.description !== "string"
  ) {
    throw new AsaasSdkError({
      name: "INVALID_PARAMETERS",
      message: "Failed to create a new payment.",
      cause: `The "description" parameter needs to be "string". You provided "${typeof body.description}".`,
    });
  } else if (body.description && body.description?.length > 500) {
    data.debug &&
      console.warn(
        "[ASAAS_SDK] [CREATE_NEW_PAYMENT] The description you provided has more than 500 characters. Any characters more will be deleted."
      );
    body.description = body.description.slice(0, 500);
  }

  if (
    "daysAfterDueDateToRegistrationCancellation" in body &&
    body.daysAfterDueDateToRegistrationCancellation &&
    isNaN(
      parseInt(
        body.daysAfterDueDateToRegistrationCancellation as unknown as string
      )
    )
  ) {
    throw new AsaasSdkError({
      name: "INVALID_PARAMETERS",
      message: "Failed to create a new payment.",
      cause: `The "daysAfterDueDateToRegistrationCancellation" parameter needs to be "number". You provided "${typeof body.daysAfterDueDateToRegistrationCancellation}".`,
    });
  }

  if (
    "externalReference" in body &&
    body.externalReference &&
    typeof body.externalReference !== "string"
  ) {
    throw new AsaasSdkError({
      name: "INVALID_PARAMETERS",
      message: "Failed to create a new payment.",
      cause: `The "externalReference" parameter needs to be "string". You provided "${typeof body.externalReference}".`,
    });
  }

  if ("installmentCount" in body && body.installmentCount) {
    if (isNaN(parseInt(body.installmentCount as unknown as string)))
      throw new AsaasSdkError({
        name: "INVALID_PARAMETERS",
        message: "Failed to create a new payment.",
        cause: `The "installmentCount" parameter needs to be "number". You provided "${typeof body.installmentCount}".`,
      });
    if (body.installmentCount <= 0) {
      throw new AsaasSdkError({
        name: "INVALID_PARAMETERS",
        message: "Failed to create a new payment.",
        cause: `The "installmentCount" parameter needs to be more than 0 (zero). You provided "${typeof body.installmentCount}".`,
      });
    }
  }

  if (
    "totalValue" in body &&
    body.totalValue &&
    isNaN(parseInt(body.totalValue as unknown as string))
  ) {
    throw new AsaasSdkError({
      name: "INVALID_PARAMETERS",
      message: "Failed to create a new payment.",
      cause: `The "totalValue" parameter needs to be "number". You provided "${typeof body.totalValue}".`,
    });
  }

  if (
    "installmentValue" in body &&
    body.installmentValue &&
    isNaN(parseInt(body.installmentValue as unknown as string))
  ) {
    throw new AsaasSdkError({
      name: "INVALID_PARAMETERS",
      message: "Failed to create a new payment.",
      cause: `The "installmentValue" parameter needs to be "number". You provided "${typeof body.installmentValue}".`,
    });
  }

  if ("discount" in body && body.discount) {
    if (isNaN(parseInt(body.discount.value as unknown as string))) {
      throw new AsaasSdkError({
        name: "INVALID_PARAMETERS",
        message: "Failed to create a new payment.",
        cause: `The "discount.value" parameter needs to be "number". You provided "${typeof body
          .discount.value}".`,
      });
    }
    if (body.discount.value <= 0) {
      throw new AsaasSdkError({
        name: "INVALID_PARAMETERS",
        message: "Failed to create a new payment.",
        cause: `The "discount.value" parameter needs to be more than 0 (zero). You provided "${typeof body
          .discount.value}".`,
      });
    }
    if (body.discount.dueDateLimitDays) {
      if (
        isNaN(parseInt(body.discount.dueDateLimitDays as unknown as string))
      ) {
        throw new AsaasSdkError({
          name: "INVALID_PARAMETERS",
          message: "Failed to create a new payment.",
          cause: `The "discount.dueDateLimitDays" parameter needs to be "number". You provided "${typeof body
            .discount.dueDateLimitDays}".`,
        });
      }
      if (body.discount.dueDateLimitDays < 0) {
        throw new AsaasSdkError({
          name: "INVALID_PARAMETERS",
          message: "Failed to create a new payment.",
          cause: `The "discount.dueDateLimitDays" parameter needs to be more or equal to 0. You provided "${typeof body
            .discount.dueDateLimitDays}".`,
        });
      }
    }
    if (
      !(body.discount.type === "PERCENTAGE" || body.discount.type === "FIXED")
    ) {
      throw new AsaasSdkError({
        name: "INVALID_PARAMETERS",
        message: "Failed to create a new payment.",
        cause: `The "discount.type" parameter needs to be "PERCENTAGE" or "FIXED". You provided "${body.discount.type}".`,
      });
    }
  }

  if ("interest" in body && body.interest) {
    if (isNaN(parseInt(body.interest.value as unknown as string))) {
      throw new AsaasSdkError({
        name: "INVALID_PARAMETERS",
        message: "Failed to create a new payment.",
        cause: `The "interest.value" parameter needs to be "number". You provided "${typeof body
          .interest.value}".`,
      });
    }
    if (body.interest.value <= 0) {
      throw new AsaasSdkError({
        name: "INVALID_PARAMETERS",
        message: "Failed to create a new payment.",
        cause: `The "interest.value" parameter needs to be more than 0 (zero). You provided "${typeof body
          .interest.value}".`,
      });
    }
  }

  if ("fine" in body && body.fine) {
    if (isNaN(parseInt(body.fine.value as unknown as string))) {
      throw new AsaasSdkError({
        name: "INVALID_PARAMETERS",
        message: "Failed to create a new payment.",
        cause: `The "fine.value" parameter needs to be "number". You provided "${typeof body
          .fine.value}".`,
      });
    }
    if (body.fine.value <= 0) {
      throw new AsaasSdkError({
        name: "INVALID_PARAMETERS",
        message: "Failed to create a new payment.",
        cause: `The "fine.value" parameter needs to be more than 0 (zero). You provided "${typeof body
          .fine.value}".`,
      });
    }
    if (!(body.fine.type === "PERCENTAGE" || body.fine.type === "FIXED")) {
      throw new AsaasSdkError({
        name: "INVALID_PARAMETERS",
        message: "Failed to create a new payment.",
        cause: `The "fine.type" parameter needs to be "PERCENTAGE" or "FIXED". You provided "${body.fine.type}".`,
      });
    }
  }

  if ("postalService" in body && body.postalService) {
    if (typeof body.postalService !== "boolean") {
      throw new AsaasSdkError({
        name: "INVALID_PARAMETERS",
        message: "Failed to create a new payment.",
        cause: `The "postalService" parameter needs to be "boolean". You provided "${typeof body.postalService}".`,
      });
    }
  } else {
    body.postalService = false;
  }

  if ("split" in body && body.split) {
    if (!Array.isArray(body.split)) {
      throw new AsaasSdkError({
        name: "INVALID_PARAMETERS",
        message: "Failed to create a new payment.",
        cause: `The "split" parameter needs to be "array". You provided "${typeof body.split}".`,
      });
    }
    body.split.forEach((item, index) => {
      if (typeof item.walletId !== "string") {
        throw new AsaasSdkError({
          name: "INVALID_PARAMETERS",
          message: "Failed to create a new payment.",
          cause: `The "split[${index}].walletId" parameter needs to be "string". You provided "${typeof item.walletId}".`,
        });
      }
    });
  }

  if ("callback" in body && body.callback) {
    if (typeof body.callback.successUrl !== "string") {
      throw new AsaasSdkError({
        name: "INVALID_PARAMETERS",
        message: "Failed to create a new payment.",
        cause: `The "callback.successUrl" parameter needs to be "string". You provided "${typeof body
          .callback.successUrl}".`,
      });
    } else {
      try {
        new URL(body.callback.successUrl);
      } catch {
        throw new AsaasSdkError({
          name: "INVALID_PARAMETERS",
          message: "Failed to create a new payment.",
          cause: `The "callback.successUrl" parameter is not a valid URL. You provided "${body.callback.successUrl.slice(
            0,
            50
          )}${body.callback.successUrl.length > 50 ? "..." : ""}".`,
        });
      }
    }
    if (
      body.callback.autoRedirect &&
      typeof body.callback.autoRedirect !== "boolean"
    ) {
      throw new AsaasSdkError({
        name: "INVALID_PARAMETERS",
        message: "Failed to create a new payment.",
        cause: `The "callback.autoRedirect" parameter needs to be "boolean". You provided "${typeof body
          .callback.autoRedirect}".`,
      });
    }

    if (
      "callback" in body &&
      body.callback &&
      !("autoRedirect" in body.callback) &&
      !body.callback.autoRedirect
    ) {
      body.callback.autoRedirect = false;
    }
  }

  try {
    const response = await fetch(`${data.baseURL}/${data.version}/payments`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        access_token: data.apiKey,
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const errorBody = await response.json();
      throw new AsaasSdkError({
        name: "REQUEST_FAILED",
        message: "Failed to create a new payment.",
        cause: `HTTP ${response.status}: ${
          errorBody.message || "Unknown error"
        }`,
      });
    }
    return (await response.json()) as CreateNewPaymentResponse200;
  } catch (error) {
    if (error instanceof AsaasSdkError) throw error;

    if ((error as any).cause.code == "ENOTFOUND") {
      throw new AsaasSdkError({
        name: "NETWORK_ERROR",
        message: "Failed to create a new payment.",
        cause:
          "getaddrinfo ENOTFOUND. Check your internet connection and try again.",
      });
    }

    throw new AsaasSdkError({
      name: "NETWORK_ERROR",
      message: "Failed to create a new payment.",
      cause: error instanceof Error ? error.message : "Unknown network error",
    });
  }
}
