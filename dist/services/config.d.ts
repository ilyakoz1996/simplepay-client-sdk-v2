import { JsonRpcProvider } from 'ethers';
import { Contract } from 'ethers';
export declare class Config {
    merchantId: string;
    projectId: string;
    ABI: any;
    provider: JsonRpcProvider;
    contract: Contract;
    constructor(merchantId: string, projectId: string);
}
