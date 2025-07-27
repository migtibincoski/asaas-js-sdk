import listPayments from "../../src/sdk/payments/list-payments";
import type { InvoiceStatusOptions } from "../../src/sdk/payments/types";

describe("listPayments", () => {
  const mockData = {
    baseURL: "https://api.asaas.com",
    version: "v3",
    apiKey: "test-api-key",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should reject if 'limit' is not a number", async () => {
    const body = { limit: "invalid-limit" };
    await expect(
      listPayments(mockData, body as unknown as { limit: number })
    ).rejects.toThrowError(/Failed to list payments/);
  });

  it("should reject if 'limit' is greater than 100", async () => {
    const body = { limit: 101 };
    await expect(listPayments(mockData, body)).rejects.toThrowError(
      /Failed to list payments/
    );
  });

  it("should reject if 'customer' is not a string", async () => {
    const body = { customer: 12345 };
    await expect(
      listPayments(mockData, body as unknown as { customer: string })
    ).rejects.toThrowError(/Failed to list payments/);
  });

  it("should reject if 'invoiceStatus' is invalid", async () => {
    const body = { invoiceStatus: "INVALID_STATUS" };
    await expect(
      listPayments(
        mockData,
        body as unknown as { invoiceStatus: InvoiceStatusOptions }
      )
    ).rejects.toThrowError(/Failed to list payments/);
  });

  it("should reject if 'estimatedCreditDate' is not a string", async () => {
    const body = { estimatedCreditDate: 12345 };
    await expect(
      listPayments(mockData, body as unknown as { estimatedCreditDate: string })
    ).rejects.toThrowError(/Failed to list payments/);
  });

  it("should reject if the API request fails", async () => {
    const body = { limit: 50 };

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: jest.fn().mockResolvedValueOnce({ message: "Bad Request" }),
    });

    await expect(listPayments(mockData, body)).rejects.toThrowError(
      /Failed to list payments/
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
