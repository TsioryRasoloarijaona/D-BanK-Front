export interface localReceiver{
accountRef: string;
 firstName: string;
 lastName: string;
 amount: Number,
 effectiveDate: string,
 reason: string;
}

export interface transferLocal {
    
    transfer : transferSender,
    localReceivers : localReceiver[]
}

export interface transferSender {
    senderAccountId: string
}

export interface foreignReceiver {
   
        receiverAccount: string;
        amount: number; 
        reason: string;
        effectiveDate: string | null;
}

export interface foreignTransfer {
    transfer : transferSender;
    foreignReceivers : foreignReceiver []
}

export interface transferHistory {
    transactionId: string;
    transferId: string;
    amount: number;
    label: string;
    effectiveDate: string;
    transferRef: string;
    accountReceiverRef: string;
    receiverName: string;
    foreignAccount: string;
    status: string;
}
