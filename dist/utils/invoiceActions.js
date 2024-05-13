/**
 * Combines multiple invoices by their ID, ensuring only the latest version of each invoice is retained.
 *
 * @param {ParsedContractInvoice[]} invoices - An array of parsed contract invoices.
 * @returns {ParsedContractInvoice[]} - An array of combined invoices, with duplicates removed.
 */
export const combineInvoicesById = (invoices) => {
    let latestInvoices = {};
    invoices.forEach((invoice) => {
        const effectiveUpdatedAt = invoice.updatedAt || invoice.createdAt;
        if (!latestInvoices[invoice.invoiceId] ||
            effectiveUpdatedAt >
                (latestInvoices[invoice.invoiceId].updatedAt ||
                    latestInvoices[invoice.invoiceId].createdAt)) {
            latestInvoices[invoice.invoiceId] = invoice;
        }
    });
    return Object.values(latestInvoices);
};
/**
* Parses event arguments data into a structured invoice format.
*
* @param {InvoiceStatus} type - The status type of the invoice event.
* @param {any} invoice - The event arguments or invoice data.
* @returns {ParsedContractInvoice} - The parsed contract invoice.
*/
export const parseEventArgsData = (type, invoice) => {
    return {
        invoiceId: invoice[1],
        createdAt: type === "created" ? Number(invoice[0]) : 0,
        updatedAt: type === "created" ? 0 : Number(invoice[0]),
        merchantId: invoice[2],
        projectId: invoice[3],
        productId: invoice[4],
        tokenId: Number(invoice[5]),
        tokenAmount: Number(invoice[6]),
        tokenPrice: Number(invoice[7]),
        from: invoice[8],
        to: invoice[9],
        clientEmail: invoice[10],
        transactionId: type === "processing" ? invoice[11] : null,
        status: type,
    };
};
//# sourceMappingURL=invoiceActions.js.map