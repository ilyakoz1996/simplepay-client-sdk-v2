import { ethers } from 'ethers';
import ABI from "../utils/ABI.js";
import { stringToBytes32 } from '../utils/bytesFactory.js';
export class Config {
    constructor(merchantId, projectId) {
        this.merchantId = stringToBytes32(merchantId);
        this.projectId = stringToBytes32(projectId);
        this.ABI = ABI;
        this.provider = new ethers.JsonRpcProvider('https://fantom-rpc.publicnode.com');
        this.contract = new ethers.Contract("0x92049ED3f29abC807b8878445ae2cD2C7C61f493", ABI, this.provider);
    }
}
//# sourceMappingURL=config.js.map