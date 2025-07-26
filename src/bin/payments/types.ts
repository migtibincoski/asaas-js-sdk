// options types.ts
export type BillingTypeOptions =
  | ""
  | "UNDEFINED"
  | "BOLETO"
  | "CREDIT_CARD"
  | "PIX";
export type DiscountTypeOptions = "PERCENTAGE" | "FIXED";
export type FineTypeOptions = "PERCENTAGE" | "FIXED";
export type EscrowStatusOptions = "ACTIVE" | "DONE";
export type CreditCardDisputeStatusOptions =
  | "REQUESTED"
  | "ACCEPTED"
  | "REJECTED";
export type RefundsStatusOptions =
  | "PENDING"
  | "AWAITING_CRITICAL_ACTION_AUTHORIZATION"
  | "AWAITING_CUSTOMER_EXTERNAL_AUTHORIZATION"
  | "CANCELLED"
  | "DONE";
export type EscrowFinishReasonOptions =
  | "CHARGEBACK"
  | "EXPIRED"
  | "INSUFFICIENT_BALANCE"
  | "PAYMENT_REFUNDED"
  | "REQUESTED_BY_CUSTOMER"
  | "CUSTOMER_CONFIG_DISABLED";
export type SplitPaymentStatusOptions =
  | "PENDING"
  | "AWAITING_CREDIT"
  | "CANCELLED"
  | "DONE"
  | "REFUNDED"
  | "BLOCKED_BY_VALUE_DIVERGENCE";
export type ChargebackStatusOptions =
  | "REQUESTED"
  | "IN_DISPUTE"
  | "DISPUTE_LOST"
  | "REVERSED"
  | "DONE";
export type PaymentStatusOptions =
  | "PENDING"
  | "RECEIVED"
  | "CONFIRMED"
  | "OVERDUE"
  | "REFUNDED"
  | "RECEIVED_IN_CASH"
  | "REFUND_REQUESTED"
  | "REFUND_IN_PROGRESS"
  | "CHARGEBACK_REQUESTED"
  | "CHARGEBACK_DISPUTE"
  | "AWAITING_CHARGEBACK_REVERSAL"
  | "DUNNING_REQUESTED"
  | "DUNNING_RECEIVED"
  | "AWAITING_RISK_ANALYSIS";
export type CreditCardBrandOptions =
  | "VISA"
  | "MASTERCARD"
  | "ELO"
  | "DINERS"
  | "DISCOVER"
  | "AMEX"
  | "HIPERCARD"
  | "CABAL"
  | "BANESCARD"
  | "CREDZ"
  | "SOROCRED"
  | "CREDSYSTEM"
  | "JCB"
  | "UNKNOWN";
export type PaymentSplitCancellationReasonOptions =
  | "PAYMENT_DELETED"
  | "PAYMENT_OVERDUE"
  | "PAYMENT_RECEIVED_IN_CASH"
  | "PAYMENT_REFUNDED"
  | "VALUE_DIVERGENCE_BLOCK"
  | "WALLET_UNABLE_TO_RECEIVE";

export type InvoiceStatusOptions =
  | "SCHEDULED"
  | "AUTHORIZED"
  | "PROCESSING_CANCELLATION"
  | "CANCELED"
  | "CANCELLATION_DENIED"
  | "ERROR";

// Objects types.ts
export type DiscountObject = {
  /** Percentage or fixed amount of discount to be applied to the Payment amount. */
  value: number;

  /** Days before expiration to apply discount. Ex:
   * 0 = until expiration
   * 1 = up to one day before
   * 2 = up to 2 days before,
   * and so on. */
  dueDateLimitDays: number;

  /** Discount type. */
  type: DiscountTypeOptions;
};

export type InterestObject = {
  /** Percentage of interest per month on the amount charged for payment after maturity. */
  value: number;
};

export type FineObject = {
  /** Percentage of fine on the amount of the charge for payment after the due date. */
  value: number;

  /** Fine type. */
  type: FineTypeOptions;
};

export type SplitObject = {
  /** Asaas wallet identifier that will be transferred. */
  walletId: string;

  /** Fixed amount to be transferred to the account when the payment is received. */
  fixedValue?: number;

  /** Percentage of the net value of the charge to be transferred when received. */
  percentualValue?: number;

  /** (Instalments only). Amount that will be split relative to the total amount that will be paid in installments. */
  totalFixedValue?: number;

  /** Split identifier in your system. */
  externalReference?: string;

  /** Split description. */
  description?: string;
};

export type CallBackObject = {
  /** URL that the customer will be redirected to after successful payment of the invoice or payment link. */
  successUrl: string;

  /** Define whether the customer will be automatically redirected or will just be informed with a button to return to the website.
   * The default is true, if you want to disable it, enter false. */
  autoRedirect?: boolean;
};

export type CreditCardObject = {
  /** Last 4 digits of the card used. */
  creditCardNumber: string;

  /** Flag of the card used. */
  creditCardBrand: CreditCardBrandOptions;

  /** Credit card token if tokenization is active. */
  creditCardToken?: string;
};

export type CreditCardHolderInfoObject = {
  /** Name of card holder. */
  name: string;

  /** Cardholder email. */
  email: string;

  /** CPF or CNPJ of the cardholder. */
  cpfCnpj: string;

  /** Cardholder zip code. */
  postalCode: string;

  /** Cardholder address number. */
  addressNumber: string;

  /** Supplementing the cardholder's address. */
  addressComplement?: string;

  /** Phone with cardholder's area code. */
  phone: string;

  /** Cardholder's cell phone. */
  mobilePhone?: string;
};

export type ChargebackObject = {
  /** Unique chargeback identifier. */
  id: string;

  /** Unique payment identifier in Asaas. */
  payment: string;

  /** Unique installment identifier in Asaas. */
  installment?: string;

  /** Unique identifier of customer to which the chargeback is linked. */
  customerAccount: string;

  /** Chargeback status. */
  status: ChargebackStatusOptions;

  /** Chargeback reason. */
  reason: string;

  /** Chargeback opening date. */
  disputeStartDate?: string;

  /** Chargeback value. */
  value: number;

  /** Payment date on Asaas. */
  paymentDate?: string;

  /** Credit card information. */
  creditCard?: {
    /** Last 4 digits of the card used. */
    number: string;

    /** Flag of the card used. */
    brand: CreditCardBrandOptions;
  };

  /** Chargeback dispute status. */
  disputeStatus: CreditCardDisputeStatusOptions;

  /** Deadline to send dispute documents. */
  deadlineToSendDisputeDocuments?: string;
};

export type RefundsObject = {
  /** Refund creation date. */
  dateCreated: string;

  /** Refund status. */
  status: RefundsStatusOptions;

  /** Refund value. */
  value: number;

  /** (Pix only) Unique identifier of the Pix transaction at the Central Bank. */
  endToEndIdentifier?: string;

  /** Description of the refund. */
  description?: string;

  /** (Pix only) Refund effective date. */
  effectiveDate?: string;

  /** Transaction receipt link. */
  transactionReceiptUrl?: string;

  /** Refunded Splits, if any. */
  refundedSplits?: RefundedSplitObject[];
};

export type RefundedSplitObject = {
  /** Unique split identifier. */
  id: string;

  /** Refunded value. */
  value: number;

  /** Indicates whether the split was refunded. */
  done: boolean;
};

export type PaymentObject = {
  /** Object type. */
  object: "payment";

  /** Unique payment identifier in Asaas. */
  id: string;

  /** Payment creation date. */
  dateCreated: string;

  /** Unique identifier of the customer to whom the payment belongs. */
  customer: string;

  /** Unique subscription identifier (when recurring billing). */
  subscription?: string | null;

  /** Unique installment identifier (when billing in installments). */
  installment?: string | null;

  /** Unique identifier of the payments link to which the payment belongs. */
  paymentLink?: string | null;

  /** Payment amount. */
  value: number;

  /** Net value of the charge after discounting the Asaas fee. */
  netValue: number;

  /** Original amount of charge (filled when paid with interest and fine). */
  originalValue?: number | null;

  /** Calculated amount of interest and fine that must be paid after the charge is due. */
  interestValue?: number | null;

  /** Description of the payment. */
  description?: string | null;

  /** Payment billing type. */
  billingType: BillingTypeOptions | "DEBIT_CARD" | "TRANSFER" | "DEPOSIT";

  /** Credit card information. */
  creditCard?: CreditCardObject | null;

  /** Whether the charge can be paid after the due date (only for bank slip). */
  canBePaidAfterDueDate?: boolean | null;

  /** Unique identifier of the Pix transaction to which the payment belongs. */
  pixTransaction?: string | null;

  /** Unique identifier of the static QrCode generated for a given Pix key. */
  pixQrCodeId?: string | null;

  /** Payment status. */
  status: PaymentStatusOptions;

  /** Payment due date. */
  dueDate: string;

  /** Original due date upon creation of the payment. */
  originalDueDate?: string | null;

  /** Payment date on Asaas. */
  paymentDate?: string | null;

  /** Date on which the customer paid the bank slip. */
  clientPaymentDate?: string | null;

  /** Installment number. */
  installmentNumber?: number | null;

  /** Invoice URL. */
  invoiceUrl?: string | null;

  /** Bill number. */
  invoiceNumber?: string | null;

  /** Free search field. */
  externalReference?: string | null;

  /** Determines if the payment has been removed. */
  deleted?: boolean | null;

  /** Defines whether the charge was anticipated or is in the process of being anticipated. */
  anticipated?: boolean | null;

  /** Determines whether the charge is anticipable. */
  anticipable?: boolean | null;

  /** Date when the credit became available. */
  creditDate?: string | null;

  /** Estimated date when the credit will be available. */
  estimatedCreditDate?: string | null;

  /** URL of proof of confirmation, receipt, reversal or removal. */
  transactionReceiptUrl?: string | null;

  /** Unique identification of the bank slip. */
  nossoNumero?: string | null;

  /** URL to download the bank slip. */
  bankSlipUrl?: string | null;

  /** Discount information. */
  discount?: DiscountObject | null;

  /** Fine information for payment after due date. */
  fine?: FineObject | null;

  /** Interest information for payment after due date. */
  interest?: InterestObject | null;

  /** Split Settings. */
  split?:
    | (SplitObject & {
        /** Unique split identifier in Asaas. */
        id: string;

        /** Amount that will be split relative to the total amount that will be paid. */
        totalValue?: number;

        /** Reason for canceling the split. */
        cancellationReason?: PaymentSplitCancellationReasonOptions;

        /** Split status. */
        status?: SplitPaymentStatusOptions;
      })[]
    | null;

  /** Define whether the payment will be sent via post. */
  postalService?: boolean | null;

  /** Days after registration cancellation deadline (only for bank slip). */
  daysAfterDueDateToRegistrationCancellation?: number | null;

  /** Chargeback information. */
  chargeback?: ChargebackObject | null;

  /** Payment escrow in the Escrow Account information. */
  escrow?: {
    /** Unique payment escrow identifier in Asaas. */
    id: string;

    /** Payment escrow status. */
    status: EscrowStatusOptions;

    /** Payment escrow expiration date. */
    expirationDate?: string | null;

    /** Payment escrow finish date. */
    finishDate?: string | null;

    /** Payment escrow finish reason. */
    finishReason?: EscrowFinishReasonOptions | null;
  } | null;

  /** Refunds information. */
  refunds?: RefundsObject[] | null;
};

// Request body types.ts
export type CreateNewPaymentBody = {
  /** Unique customer identifier in Asaas. */
  customer: string;

  /** Payment billing type. */
  billingType?: BillingTypeOptions;

  /** Payment amount. */
  value: number;

  /** Payment due date (format: YYYY-MM-DD). */
  dueDate: string;

  /** Payment description (max. 500 characters). */
  description?: string;

  /** Days after registration cancellation deadline (only for bank slip). */
  daysAfterDueDateToRegistrationCancellation?: number;

  /** Free search field. */
  externalReference?: string;

  /** Number of installments (only in the case of installment payment). */
  installmentCount?: number;

  /** Enter the total amount of a charge that will be paid in installments (only in the case of an installment charge). If this field is sent, the installmentValue is not necessary, the calculation per installment will be automatic. */
  totalValue?: number;

  /** Value of each installment (only in the case of installment payment). Send this field if you want to define the value of each installment. */
  installmentValue?: number;

  /** Discount information. */
  discount?: DiscountObject;

  /** Interest information for payment after due date. */
  interest?: InterestObject;

  /** Fine information for payment after due date. */
  fine?: FineObject;

  /** Define whether the payment will be sent via post */
  postalService?: boolean;

  /** Split Settings. */
  split?: SplitObject[];

  /** Automatic redirection information after the payment of the link payment */
  callback?: CallBackObject;
};

export type ListPaymentsBody = {
  /** Filter by unique installment identifier. */
  installment?: string;

  /** List starting element. */
  offset?: number;

  /** Number of list elements (max: 100). */
  limit?: number;

  /** Filter by unique customer identifier. */
  customer?: string;

  /** Filter by customer group name. */
  customerGroupName?: string;

  /** Filter by billing type. */
  billingType?: BillingTypeOptions;

  /** Filter by status. */
  status?: PaymentStatusOptions;

  /** Filter by unique subscription identifier. */
  subscription?: string;

  /** Filter by your system identifier. */
  externalReference?: string;

  /** Filter by payment date. */
  paymentDate?: string;

  /** Filter to return charges that have or do not have an invoice. */
  invoiceStatus?: InvoiceStatusOptions;

  /** Filter by estimated credit date. */
  estimatedCreditDate?: string;

  /** Filter receipts originating from a static QrCode using the id generated when the QrCode was created. */
  pixQrCodeId?: string;

  /** Filter anticipated charges or not. */
  anticipated?: boolean;

  /** Filter anticipable charges or not. */
  anticipable?: boolean;

  /** Filter from initial creation date. */
  dateCreatedGe?: string;

  /** Filter to final creation date. */
  dateCreatedLe?: string;

  /** Filter from initial payment date. */
  paymentDateGe?: string;

  /** Filter to final payment date. */
  paymentDateLe?: string;

  /** Filter from estimated initial credit date. */
  estimatedCreditDateGe?: string;

  /** Filter to estimated end credit date. */
  estimatedCreditDateLe?: string;

  /** Filter from initial due date. */
  dueDateGe?: string;

  /** Filter by final due date. */
  dueDateLe?: string;

  /** Filter by the email address of the user who created the payment. */
  user?: string;
};

export type CreateNewPaymentWithCreditCardBody = {
  /** Unique customer identifier in Asaas. */
  customer: string;

  /** Payment billing type. */
  billingType: BillingTypeOptions;

  /** Payment amount. */
  value: number;

  /** Payment due date. */
  dueDate: string;

  /** Payment description (max. 500 characters). */
  description?: string;

  /** Days after registration cancellation deadline (only for bank slip). */
  daysAfterDueDateToRegistrationCancellation?: number;

  /** Free search field. */
  externalReference?: string;

  /** Number of installments (only in the case of installment payment). */
  installmentCount?: number;

  /**
   * Enter the total amount of a charge that will be paid in installments
   * (only in the case of an installment charge).
   * If this field is sent, the installmentValue is not necessary;
   * the calculation per installment will be automatic.
  . */
  totalValue?: number;

  /**
   * Value of each installment (only in the case of installment payment).
   * Send this field if you want to define the value of each installment.
  . */
  installmentValue?: number;

  /** Discount information. */
  discount?: DiscountObject;

  /** Interest information for payment after due date. */
  interest?: InterestObject;

  /** Fine information for payment after due date. */
  fine?: FineObject;

  /** Define whether the payment will be sent via post. */
  postalService?: boolean;

  /** Split Settings. */
  split?: SplitObject[];

  /** Automatic redirection information after the payment of the link payment. */
  callback?: CallBackObject;

  /** Credit card information. */
  creditCard?: CreditCardObject;

  /** Credit card holder information. */
  creditCardHolderInfo: CreditCardHolderInfoObject;

  /** Credit card token for using the credit card tokenization functionality. */
  creditCardToken?: string;

  /** Carry out only the Pre-Authorization of the payment. */
  authorizeOnly?: boolean;

  /**
   * IP from where the customer is making the purchase.
   * Your server's IP must not be entered.
  . */
  remoteIp: string;
};

// Response types.ts
export type CreateNewPaymentResponse200 = {
  /** Unique payment identifier in Asaas. */
  id: string;

  /** Payment creation date. */
  dateCreated: string;

  /** Unique customer identifier in Asaas. */
  customer: string;

  /** Unique subscription identifier (when recurring billing). */
  subscription?: string;

  /** Unique installment identifier (when billing in installments). */
  installment?: string;

  /** Unique identifier of the payments link to which the payment belongs. */
  paymentLink?: string;

  /** Payment amount. */
  value: number;

  /** Net value of the charge after discounting the Asaas fee. */
  netValue: number;

  /** Original amount of charge (filled when paid with interest and fine). */
  originalValue?: number;

  /** Calculated amount of interest and fine that must be paid after the charge is due. */
  interestValue?: number;

  /** Description of the payment. */
  description?: string;

  /** Payment billing type. */
  billingType: BillingTypeOptions | "DEBIT_CARD" | "TRANSFER" | "DEPOSIT";

  /** Credit card information. */
  creditCard?: {
    /** Last 4 digits of the card used. */
    creditCardNumber: string;

    /** Flag of the card used. */
    creditCardBrand: CreditCardBrandOptions;

    /** Credit card token if tokenization is active. */
    creditCardToken?: string;
  };

  /** Informs whether the charge can be paid after the due date (Only for bank slip). */
  canBePaidAfterDueDate?: boolean;

  /** Unique identifier of the Pix transaction to which the payment belongs. */
  pixTransaction?: string;

  /** Unique identifier of the static QrCode generated for a given Pix key. */
  pixQrCodeId?: string;

  /** Payment status. */
  status: PaymentStatusOptions;

  /** Payment due date. */
  dueDate: string;

  /** Original due date upon creation of the payment. */
  originalDueDate?: string;

  /** Payment date on Asaas. */
  paymentDate?: string;

  /** Date on which the customer paid the bank slip. */
  clientPaymentDate?: string;

  /** Parcel number. */
  installmentNumber?: number;

  /** Invoice URL. */
  invoiceUrl?: string;

  /** Bill number. */
  invoiceNumber?: string;

  /** Free search field. */
  externalReference?: string;

  /** Determines if the payment has been removed. */
  deleted?: boolean;

  /** Defines whether the charge was anticipated or is in the process of being anticipated. */
  anticipated?: boolean;

  /** Determines whether the charge is anticipated. */
  anticipable?: boolean;

  /** Date when the credit became available. */
  creditDate?: string;

  /** Estimated date when the credit will be available. */
  estimatedCreditDate?: string;

  /** URL of proof of confirmation, receipt, reversal or removal. */
  transactionReceiptUrl?: string;

  /** Unique identification of the bank slip. */
  nossoNumero?: string;

  /** URL to download the bank slip. */
  bankSlipUrl?: string;

  /** Discount information. */
  discount?: {
    /** Percentage or fixed amount of discount to be applied to the Payment amount. */
    value: number;

    /** Days before expiration to apply discount. */
    dueDateLimitDays: number;

    /** Discount type. */
    type: DiscountTypeOptions;
  };

  /** Fine information for payment after due date. */
  fine?: FineObject;

  /** Interest information for payment after due date. */
  interest?: {
    /** Interest value in percentage. */
    value: number;
  };

  /** Split Settings. */
  split?: Array<{
    /** Unique split identifier in Asaas. */
    id: string;

    /** Asaas wallet identifier that will be transferred. */
    walletId: string;

    /** Fixed amount to be transferred to the account when the charge is received. */
    fixedValue?: number;

    /** Percentage of the net value of the charge to be transferred when received. */
    percentualValue?: number;

    /** Amount that will be split relative to the total amount that will be paid. */
    totalValue?: number;

    /** Reason for canceling the split. */
    cancellationReason?: PaymentSplitCancellationReasonOptions;

    /** Split status. */
    status?: SplitPaymentStatusOptions;

    /** Unique identifier of split in your system. */
    externalReference?: string;

    /** Split description. */
    description?: string;
  }>;

  /** Define whether the payment will be sent via post. */
  postalService?: boolean;

  /** Days after registration cancellation deadline (only for bank slip). */
  daysAfterDueDateToRegistrationCancellation?: number;

  /** Chargeback information. */
  chargeback?: {
    /** Unique chargeback identifier. */
    id: string;

    /** Unique payment identifier in Asaas. */
    payment: string;

    /** Unique installment identifier in Asaas. */
    installment?: string;

    /** Unique identifier of customer to which the chargeback is linked. */
    customerAccount: string;

    /** Chargeback status. */
    status: ChargebackStatusOptions;

    /** Chargeback reason. */
    reason: string;

    /** Chargeback opening date. */
    disputeStartDate?: string;

    /** Chargeback value. */
    value: number;

    /** Payment date on Asaas. */
    paymentDate?: string;

    /** Credit card dispute information. */
    creditCard?: {
      /** Chargeback dispute status. */
      disputeStatus: CreditCardDisputeStatusOptions;

      /** Deadline to send dispute documents. */
      deadlineToSendDisputeDocuments?: string;
    };
  };

  /** Payment escrow in the Escrow Account information. */
  escrow?: {
    /** Unique payment escrow identifier in Asaas. */
    id: string;

    /** Payment escrow status. */
    status: EscrowStatusOptions;

    /** Payment escrow expiration date. */
    expirationDate?: string;

    /** Payment escrow finish date. */
    finishDate?: string;

    /** Payment escrow finish reason. */
    finishReason?: EscrowFinishReasonOptions;
  };

  /** Refunds information. */
  refunds?: Array<{
    /** Refund creation date. */
    dateCreated: string;

    /** Refund status. */
    status: RefundsStatusOptions;

    /** Refund value. */
    value: number;

    /** (Pix only) Unique identifier of the Pix transaction at the Central Bank. */
    endToEndIdentifier?: string;

    /** Description of the refund. */
    description?: string;

    /** (Pix only) Refund effective date. */
    effectiveDate?: string;

    /** Transaction receipt link. */
    transactionReceiptUrl?: string;

    /** Refunded Splits, if any. */
    refundedSplits?: Array<{
      /** Unique split identifier. */
      id: string;

      /** Refunded value. */
      value: number;

      /** Indicates whether the split was refunded. */
      done: boolean;
    }>;
  }>;
};

export type ListPaymentsResponse200 = {
  /** Object type. */
  object: string;

  /** Indicates whether there is another page to be searched. */
  hasMore: boolean;

  /** Total number of items for the filters entered. */
  totalCount: number;

  /** Number of objects per page. */
  limit: number;

  /** Position of the object from which the page should be loaded. */
  offset: number;

  /** List of objects. */
  data: PaymentObject[];
};
