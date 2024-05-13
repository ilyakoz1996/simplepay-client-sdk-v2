var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { readInvoiceData } from "../utils/invoiceParser.js";
export class Events {
    constructor(config) {
        this.config = config;
    }
    /**
     * Sets up a listener for the specified contract event.
     * @param {ContractEvent} eventName The name of the contract event to listen for.
     * @param {Function} callback The callback function to be executed when the event is emitted.
     * @throws Throws an error if setting up the event listener fails.
     */
    on(eventName, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.config.contract.on(eventName, (...args) => __awaiter(this, void 0, void 0, function* () {
                    const event = args[args.length - 1];
                    const eventData = event.args;
                    console.log("config.merchantId", this.config.merchantId);
                    console.log("event.merchantId", eventData[2]);
                    console.log("config.projectId", this.config.projectId);
                    console.log("event.merchantId", eventData[3]);
                    if (this.config.merchantId !== eventData[2] || this.config.projectId !== eventData[3])
                        return;
                    const data = yield this.config.contract.getInvoice(eventData[1]);
                    console.log('full invoice', data);
                    callback(readInvoiceData(data));
                }));
            }
            catch (error) {
                console.error(`Failed to attach event listener for ${eventName}`, error);
                throw error;
            }
        });
    }
}
//# sourceMappingURL=events.js.map