import { ContractEvent, EventCallback, ParsedContractInvoice } from "../types.js";
import { readInvoiceData } from "../utils/invoiceParser.js";
import { Config } from "./config.js";

export class Events {

    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

  /**
   * Sets up a listener for the specified contract event.
   * @param {ContractEvent} eventName The name of the contract event to listen for.
   * @param {Function} callback The callback function to be executed when the event is emitted.
   * @throws Throws an error if setting up the event listener fails.
   */
  public async on<T extends ParsedContractInvoice>(eventName: ContractEvent, callback: EventCallback<T>): Promise<void> {
    try {
      this.config.contract.on(eventName, async (...args: any[]) => {
        const event = args[args.length - 1];
        const eventData = event.args;
        console.log("config.merchantId", this.config.merchantId)
        console.log("event.merchantId", eventData[2])
        console.log("config.projectId", this.config.projectId)
        console.log("event.merchantId", eventData[3])
        if (this.config.merchantId !== eventData[2] || this.config.projectId !== eventData[3]) return;
        const data: any = await this.config.contract.getInvoice(eventData[1]);
        console.log('full invoice', data)
        callback(readInvoiceData(data) as T);
      });
    } catch (error) {
      console.error(`Failed to attach event listener for ${eventName}`, error);
      throw error;
    }
  }
}
