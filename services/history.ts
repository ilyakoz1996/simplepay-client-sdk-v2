import { Config } from "./config.js";
import { readInvoiceData } from "../utils/invoiceParser.js";
import uuidCheck from "../utils/uuidCheck.js";
import { stringToBytes32 } from "../utils/bytesFactory.js";
import { ethers } from "ethers";
import { combineInvoicesById, parseEventArgsData } from "../utils/invoiceActions.js";

export class History {

    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    async getInvoice(id: string): Promise<void> {
        let invoiceId = id
        const uuid = uuidCheck(invoiceId)
        console.log('uuid', uuid)
        if (uuid) {
            const bytesId = stringToBytes32(invoiceId)
            console.log('bytesId', bytesId)
            if (!bytesId) {
                throw new Error("Invalid invoiceId!")
            }
            invoiceId = bytesId
        }
        const data = await this.config.contract.getInvoice(invoiceId);
        return readInvoiceData(data)
    }

      /**
   * Parses event arguments and invoice data into a structured format.
   * @param {InvoiceStatus} type The invoice status type.
   * @param {any} invoice The raw event arguments or invoice data.
   * @returns {ParsedContractInvoice} The parsed contract invoice.
   */
  private parseEventArgs(type: any, invoice: any): any {
    return readInvoiceData(parseEventArgsData(type, invoice));
  }

      /**
   * Fetches and parses event logs based on the given event filter.
   * @private
   * @param {ethers.ContractEventName} eventFilter The ethers event filter to apply.
   * @param {number} fromBlock The block number from which to start fetching events.
   * @param {InvoiceStatus} status The status of the invoice to set for each fetched event.
   * @returns {Promise<ParsedContractInvoice[]>} An array of parsed contract invoices.
   */
  private async fetchAndParseEvents(eventFilter: ethers.ContractEventName, fromBlock: number, toBlock: number, status: any): Promise<any[]> {
    const events = await this.config.contract.queryFilter(eventFilter, fromBlock, toBlock);
    return events.map((event: any) => this.parseEventArgs(status, event.args));
  }

      /**
   * Fetches invoices from the smart contract based on the specified filter criteria.
   * @param {InvoicesFilter} invoiceFilter The filter criteria for fetching invoices (default: 'all').
   * @returns {Promise<ParsedContractInvoice[]>} An array of filtered and combined invoices.
   * @throws Throws an error if fetching invoices fails.
   */
  public async getInvoices(invoiceFilter?: any, since?: Date): Promise<any[]> {
    let history: boolean = false 
    const currentBlock = await this.config.provider.getBlockNumber()
    const fromBlock = currentBlock - 50000;
    let ranges: {fromBlock: number, toBlock: number}[] = [{fromBlock: fromBlock, toBlock: currentBlock}]
    if (since) {
      history = true
      const blocksCount = Math.round(this.countBlocksFromTimestamp(since) * 0.7)
      ranges = this.generateBlockRanges((Number(currentBlock - blocksCount)), currentBlock)
    }

    const statuses: any[] = ["created", "processing", "success", "rejected"];
    let combinedInvoices: any[] = [];

    for (const status of statuses) {
      const eventFilter = this.config.contract.filters[status === "created" ? "InvoiceIssued" : `Invoice${status.charAt(0).toUpperCase() + status.slice(1)}`](null, null, this.config.merchantId, this.config.projectId);
      for (const range of ranges) {
        try {
          const invoices = await this.fetchAndParseEvents(eventFilter, range.fromBlock, range.toBlock, status);
          combinedInvoices = [...combinedInvoices, ...invoices];
        } catch (err) {
          console.log('fetchAndParseEvents ERROR', err)
        }
      }
    }
    
    combinedInvoices = combineInvoicesById(combinedInvoices);

    return !invoiceFilter ? combinedInvoices : combinedInvoices.filter(invoice => invoice.status === invoiceFilter);
  }

  private countBlocksFromTimestamp (since: Date): number {
    console.log('since', since)
    const getUnixTimestamp = (date: Date) => Math.floor(Number(new Date(date)) / 1000);
    const currDate = getUnixTimestamp(new Date())
    const sinceDate = Number(new Date(since))
    console.log('since: ', sinceDate)
    console.log('now: ', currDate)
    return currDate - sinceDate // seconds (1 sec === ~1 bock)
  }
  private generateBlockRanges(blockFrom: number, currentBlock: number) {
    const rangeSize = 50000;
    let ranges = [];
    let from = blockFrom;
    let to = from + rangeSize - 1;
  
    while (to < currentBlock) {
      ranges.push({ fromBlock: from, toBlock: to });
      from = to + 1;
      to = from + rangeSize - 1;
    }
  
    if (from <= currentBlock) {
      ranges.push({ fromBlock: from, toBlock: currentBlock });
    }
  
    return ranges;
  }
}
