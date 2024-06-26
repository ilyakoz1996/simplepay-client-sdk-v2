import { bytes32ToString, bytesToString } from "./bytesFactory.js";
import tokens from "./tokens.js";
export const readInvoiceData = (invoice) => {
    const nullableValue = "0x0000000000000000000000000000000000000000000000000000000000000000";
    const parseToken = (tokenId) => {
        const token = tokens.find((token) => token.id === tokenId);
        if (!token) {
            throw new Error('Invalid token');
        }
        else {
            return {
                id: token === null || token === void 0 ? void 0 : token.id,
                network: token === null || token === void 0 ? void 0 : token.network,
                decimals: token === null || token === void 0 ? void 0 : token.decimals,
                contractAddress: token === null || token === void 0 ? void 0 : token.contractAddress,
                img: token === null || token === void 0 ? void 0 : token.img,
                title: token === null || token === void 0 ? void 0 : token.title,
                symbol: token === null || token === void 0 ? void 0 : token.symbol,
                type: token === null || token === void 0 ? void 0 : token.type,
                stable: token === null || token === void 0 ? void 0 : token.stable,
                amount: Number((Number(invoice.tokenAmount) / Math.pow(10, 8)).toString()),
                price: Number((Number(invoice.tokenPrice) / Math.pow(10, 8)).toFixed(2))
            };
        }
    };
    const parseStatus = (statusId) => {
        switch (statusId) {
            case 0: return 'issued';
            case 2: return 'processing';
            case 3: return 'success';
            case 4: return 'rejected';
        }
    };
    return {
        invoiceId: bytes32ToString(invoice.invoiceId),
        createdAt: Number(invoice.createdAt) === 0 ? null : new Date(Number(invoice.createdAt)).getTime(),
        updatedAt: Number(invoice.updatedAt) === 0 ? null : new Date(Number(invoice.updatedAt)).getTime(),
        merchantId: bytes32ToString(invoice.merchantId),
        projectId: bytes32ToString(invoice.projectId),
        productId: invoice.productId !== nullableValue ? bytes32ToString(invoice.productId) : null,
        token: parseToken(Number(invoice.tokenId)),
        from: bytesToString(invoice.from),
        to: bytesToString(invoice.to),
        status: typeof invoice.status === 'bigint' ? parseStatus(Number(invoice.status)) : invoice.status,
        clientId: invoice.clientEmail,
        transactionId: invoice.transactionId !== nullableValue ? invoice.transactionId : null
    };
};
//# sourceMappingURL=invoiceParser.js.map