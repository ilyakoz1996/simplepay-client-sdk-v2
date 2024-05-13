var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ethers } from "ethers";
export class Explorer {
    evm(hash, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = new ethers.JsonRpcProvider(token.network === 'ethereum' ? "https://eth.llamarpc.com" : "https://bsc-dataseed1.binance.org");
            try {
                if (token.contractAddress === 'native') {
                    return yield this.getEVMCoinData(provider, hash);
                }
                else {
                    console.log('token', token);
                    return yield this.getEVMTokenData(provider, token.contractAddress, hash);
                }
            }
            catch (error) {
                throw new Error(`An error occurred while fetching transaction details`);
            }
        });
    }
    tron(hash, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (token.contractAddress === 'native') {
                    return yield this.getTronCoinData(hash);
                }
                else {
                    return yield this.getTronTokenData(hash);
                }
            }
            catch (error) {
                throw new Error(`An error occurred while fetching transaction details`);
            }
        });
    }
    bitcoin(hash) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.getBitcoinCoinData(hash);
            }
            catch (error) {
                throw new Error(`An error occurred while fetching transaction details`);
            }
        });
    }
    litecoin(hash) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.getLitecoinCoinData(hash);
            }
            catch (error) {
                throw new Error(`An error occurred while fetching transaction details`);
            }
        });
    }
    // EVM
    getEVMCoinData(provider, txid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tx = yield provider.getTransaction(txid);
                if (!tx) {
                    throw new Error("Error during parsing block");
                }
                const block = yield provider.getBlock(tx.blockHash);
                const currentBlock = yield provider.getBlockNumber();
                return {
                    timestamp: block ? block.timestamp * 1000 : 0,
                    transactionId: txid,
                    fromAddress: tx.from,
                    toAddress: tx.to,
                    amount: Number(ethers.formatEther(tx.value)),
                    currentBlock,
                    txBlock: block ? block.number : 0,
                    confirmations: block ? (currentBlock - block.number) : 0
                };
            }
            catch (error) {
                console.error('Error fetching ETH transaction details');
                throw new Error(`An error occurred while fetching transaction details`);
            }
        });
    }
    getEVMTokenData(provider, contractAddress, txid) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            try {
                const receipt = yield provider.getTransactionReceipt(txid);
                const currentBlock = yield provider.getBlockNumber();
                if ((receipt === null || receipt === void 0 ? void 0 : receipt.to) && receipt.to.toLowerCase() === contractAddress.toLowerCase()) {
                    if (((_a = receipt.logs[0]) === null || _a === void 0 ? void 0 : _a.address.toLowerCase()) === contractAddress.toLowerCase()) {
                        try {
                            const block = yield provider.getBlock(receipt.blockNumber);
                            const sender = `0x${(_b = receipt.logs[0]) === null || _b === void 0 ? void 0 : _b.topics[1].slice(26)}`;
                            const receiver = `0x${(_c = receipt.logs[0]) === null || _c === void 0 ? void 0 : _c.topics[2].slice(26)}`;
                            const decodedAmount = Number(ethers.formatUnits(BigInt((_d = receipt.logs[0]) === null || _d === void 0 ? void 0 : _d.data), 18));
                            return {
                                timestamp: block ? block.timestamp * 1000 : 0,
                                transactionId: txid,
                                fromAddress: sender,
                                toAddress: receiver,
                                amount: decodedAmount,
                                currentBlock,
                                txBlock: receipt.blockNumber,
                                confirmations: currentBlock - receipt.blockNumber,
                            };
                        }
                        catch (error) {
                            console.log('Failed to decode log:', error);
                            throw new Error('Transaction does not involve the USDT contract');
                        }
                    }
                    else {
                        throw new Error('Transaction does not involve the USDT contract');
                    }
                }
                else {
                    throw new Error('Transaction does not involve the USDT contract');
                }
            }
            catch (error) {
                console.error('Error fetching USDT transaction details');
                throw new Error(`An error occurred while fetching transaction details`);
            }
        });
    }
    // Tron
    getTronCoinData(txid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = `https://apilist.tronscan.org/api/transaction-info?hash=${txid}`;
                const response = yield fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch transaction data');
                }
                const tx = yield response.json();
                const currentBlockResponse = yield fetch('https://apilist.tronscan.org/api/block?sort=-number&limit=1');
                if (!currentBlockResponse.ok) {
                    throw new Error('Failed to fetch current block data');
                }
                const currentBlockData = yield currentBlockResponse.json();
                const currentBlock = currentBlockData.data[0].number;
                return {
                    timestamp: tx.timestamp,
                    transactionId: txid,
                    fromAddress: tx.contractData.owner_address,
                    toAddress: tx.contractData.to_address,
                    amount: tx.contractData.amount / 1000000,
                    currentBlock,
                    txBlock: tx.block,
                    confirmations: currentBlock - tx.block
                };
            }
            catch (error) {
                console.error('Error fetching TRX transaction details');
                throw error;
            }
        });
    }
    getTronTokenData(txid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = `https://apilist.tronscan.org/api/transaction-info?hash=${txid}`;
                const response = yield fetch(url);
                if (!response.ok) {
                    throw new Error(`Failed to fetch transaction data with status: ${response.status}`);
                }
                const txData = yield response.json();
                const currentBlockResponse = yield fetch('https://apilist.tronscan.org/api/block?sort=-number&limit=1');
                if (!currentBlockResponse.ok) {
                    throw new Error('Failed to fetch current block data');
                }
                const currentBlockData = yield currentBlockResponse.json();
                const currentBlock = currentBlockData.data[0].number;
                return {
                    timestamp: txData.timestamp,
                    transactionId: txid,
                    fromAddress: txData.tokenTransferInfo.from_address, // Assuming ownerAddress is available and correct
                    toAddress: txData.tokenTransferInfo.to_address,
                    amount: Number(txData.tokenTransferInfo.amount_str) / 1000000,
                    currentBlock,
                    txBlock: txData.block,
                    confirmations: currentBlock - txData.block
                };
            }
            catch (error) {
                console.error('Error fetching USDT transaction details');
                throw new Error(`An error occurred while fetching USDT transaction details`);
            }
        });
    }
    // Bitcoin
    getBitcoinCoinData(txid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const txResponse = yield fetch(`https://blockstream.info/api/tx/${txid}`);
                if (!txResponse.ok)
                    throw new Error('Failed to fetch transaction data');
                const tx = yield txResponse.json();
                const blockResponse = yield fetch('https://blockstream.info/api/blocks/tip/height');
                if (!blockResponse.ok)
                    throw new Error('Failed to fetch current block data');
                const currentBlock = yield blockResponse.json();
                const inputs = tx.vin.map((input) => {
                    var _a, _b;
                    return ({
                        address: ((_a = input.prevout) === null || _a === void 0 ? void 0 : _a.scriptpubkey_address) || null,
                        amount: ((_b = input.prevout) === null || _b === void 0 ? void 0 : _b.value) / 100000000
                    });
                });
                const outputs = tx.vout.map((output) => ({
                    address: output.scriptpubkey_address || null,
                    amount: output.value / 100000000
                }));
                const dateString = tx.status.block_time;
                const date = new Date(dateString * 1000);
                const timestamp = date.getTime();
                return {
                    timestamp,
                    transactionId: txid,
                    inputs,
                    outputs,
                    currentBlock,
                    txBlock: tx.status.block_height,
                    confirmations: currentBlock - tx.status.block_height
                };
            }
            catch (error) {
                console.error('Error fetching transaction details');
                throw error;
            }
        });
    }
    // Litecoin
    getLitecoinCoinData(txid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const baseUrl = 'https://api.blockcypher.com/v1/ltc/main';
                const txResponse = yield fetch(`${baseUrl}/txs/${txid}`);
                if (!txResponse.ok)
                    throw new Error('Failed to fetch transaction data');
                const tx = yield txResponse.json();
                const blockResponse = yield fetch(`${baseUrl}`);
                if (!blockResponse.ok)
                    throw new Error('Failed to fetch blockchain data');
                const blockchainData = yield blockResponse.json();
                const inputs = tx.inputs.map((input) => ({
                    address: input.addresses ? input.addresses[0] : null,
                    amount: input.output_value / 100000000
                }));
                const outputs = tx.outputs.map((output) => ({
                    address: output.addresses ? output.addresses[0] : null,
                    amount: output.value / 100000000
                }));
                const dateString = tx.received;
                const date = new Date(dateString);
                const timestamp = date.getTime();
                return {
                    timestamp: timestamp,
                    transactionId: txid,
                    inputs,
                    outputs,
                    currentBlock: blockchainData.height,
                    txBlock: tx.block_height,
                    confirmations: blockchainData.height - tx.block_height
                };
            }
            catch (error) {
                console.error('Error fetching transaction details');
                throw error;
            }
        });
    }
}
//# sourceMappingURL=explorer.js.map