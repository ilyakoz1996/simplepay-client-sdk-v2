import { Config } from './services/config.js';
import { Events } from './services/events.js';
import { Explorer } from './services/explorer.js';
import { History } from './services/history.js';
import { ContractEvent } from './types.js';
import tokens from './utils/tokens.js';

export class SimplePayClient {

    private config: Config;

    private explorer: Explorer;
    private history: History;
    private events: Events;

    constructor(merchantId: string, projectId: string) {
        this.config = new Config(merchantId, projectId);
        this.explorer = new Explorer();
        this.history = new History(this.config);
        this.events = new Events(this.config);
    }

    public async getInvoice(invoiceId: string) {
        return await this.history.getInvoice(invoiceId);
    }
    public async getInvoices(filters?: {status?: string, address?: string}) {
        const invoices = await this.history.getInvoices(filters?.status)
        if (filters?.address) {
            return invoices.filter((invoice) => invoice.from === filters.address)
        } else return invoices
        
    }
    public async getTxData(tokenId: number, txHash: string) {
        const token = tokens.find((token) => token.id === tokenId)
        switch (token?.network) {
            case 'ethereum': return await this.explorer.evm(txHash, token)
            case 'bsc': return await this.explorer.evm(txHash, token)
            case 'tron': return await this.explorer.tron(txHash, token)
            case 'bitcoin': return await this.explorer.bitcoin(txHash)
            case 'litecoin': return await this.explorer.litecoin(txHash)
        }
    }
    public async subscribe(event: ContractEvent, callback: any) {
        return await this.events.on(event, callback)
    }
}


// const sp = new SimplePayClient('c2ee7172-8295-4ce1-8a5c-cbf311c3ad8e', 'f0b135de-a9e1-41b1-a6e1-5413e78a3e3b')

// sp.getInvoice('6fdd167f-2878-4cc8-9565-5ae2d0dc9318').then((data) => {
//     console.log('Parsed invoice: ')
//     console.log(data)
// })

// sp.getTxData(6, '0x87a8d782ad0fd75f0eec10f64d5f78a85ffc274128cd9937ce917ca8d9f9badd').then((data) => {
//     console.log('Parsed transaction data: ')
//     console.log(data)
// })

// sp.getInvoices({address: 'TEqx4nScnTTjMucmtrq6N5w1Rvt4oYfCnz'}).then((data) => console.log('Parsed invoices history:' , data))

// sp.subscribe('InvoiceIssued', (data: any) => {
//     console.log("EVENT TRIGGERED!")
//     console.log(data)
// })