var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Config } from './services/config.js';
import { Events } from './services/events.js';
import { Explorer } from './services/explorer.js';
import { History } from './services/history.js';
import tokens from './utils/tokens.js';
export class SimplePayClient {
    constructor(merchantId, projectId) {
        this.config = new Config(merchantId, projectId);
        this.explorer = new Explorer();
        this.history = new History(this.config);
        this.events = new Events(this.config);
    }
    getInvoice(invoiceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.history.getInvoice(invoiceId);
        });
    }
    getInvoices(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const invoices = yield this.history.getInvoices(filters === null || filters === void 0 ? void 0 : filters.status);
            if (filters === null || filters === void 0 ? void 0 : filters.address) {
                return invoices.filter((invoice) => invoice.from === filters.address);
            }
            else
                return invoices;
        });
    }
    getTxData(tokenId, txHash) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = tokens.find((token) => token.id === tokenId);
            switch (token === null || token === void 0 ? void 0 : token.network) {
                case 'ethereum': return yield this.explorer.evm(txHash, token);
                case 'bsc': return yield this.explorer.evm(txHash, token);
                case 'tron': return yield this.explorer.tron(txHash, token);
                case 'bitcoin': return yield this.explorer.bitcoin(txHash);
                case 'litecoin': return yield this.explorer.litecoin(txHash);
            }
        });
    }
    subscribe(event, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.events.on(event, callback);
        });
    }
}
const sp = new SimplePayClient('c2ee7172-8295-4ce1-8a5c-cbf311c3ad8e', 'f0b135de-a9e1-41b1-a6e1-5413e78a3e3b');
// sp.getInvoice('6fdd167f-2878-4cc8-9565-5ae2d0dc9318').then((data) => {
//     console.log('Parsed invoice: ')
//     console.log(data)
// })
// sp.getTxData(6, '0x87a8d782ad0fd75f0eec10f64d5f78a85ffc274128cd9937ce917ca8d9f9badd').then((data) => {
//     console.log('Parsed transaction data: ')
//     console.log(data)
// })
sp.getInvoices({ address: 'TEqx4nScnTTjMucmtrq6N5w1Rvt4oYfCnz' }).then((data) => console.log('Parsed invoices history:', data));
sp.subscribe('InvoiceIssued', (data) => {
    console.log("EVENT TRIGGERED!");
    console.log(data);
});
//# sourceMappingURL=index.js.map