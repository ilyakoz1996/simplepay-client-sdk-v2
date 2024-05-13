import { ethers } from "ethers";
import { BTCLikeTransactionDetails, TransactionDetails } from "../types.js";
import { JsonRpcApiProvider } from "ethers";

export class Explorer {

    public async evm(hash: string, token: any): Promise<TransactionDetails | Error> {
        const provider = new ethers.JsonRpcProvider(token.network === 'ethereum' ? "https://eth.llamarpc.com" : "https://bsc-dataseed1.binance.org");
        try {
            if (token.contractAddress === 'native') {
                return await this.getEVMCoinData(provider, hash)
            } else {
                console.log('token', token)
                return await this.getEVMTokenData(provider, token.contractAddress, hash);
            }
        } catch (error) {
            throw new Error(`An error occurred while fetching transaction details`);
        }
    }
    public async tron(hash: string, token: any): Promise<TransactionDetails | Error> {
        try {
            if (token.contractAddress === 'native') {
                return await this.getTronCoinData(hash)
            } else {
                return await this.getTronTokenData(hash);
            }
        } catch (error) {
            throw new Error(`An error occurred while fetching transaction details`);
        }
    }
    public async bitcoin(hash: string): Promise<BTCLikeTransactionDetails | Error> {
        try {
            return await this.getBitcoinCoinData(hash)
        } catch (error) {
            throw new Error(`An error occurred while fetching transaction details`);
        }
    }
    public async litecoin(hash: string): Promise<BTCLikeTransactionDetails | Error> {
        try {
            return await this.getLitecoinCoinData(hash)
        } catch (error) {
            throw new Error(`An error occurred while fetching transaction details`);
        }
    }

    // EVM
    private async getEVMCoinData (provider: JsonRpcApiProvider, txid: string): Promise<TransactionDetails> {
        try {
            const tx = await provider.getTransaction(txid);
            if (!tx) { throw new Error("Error during parsing block")}

            const block = await provider.getBlock(tx.blockHash!);

            const currentBlock = await provider.getBlockNumber();

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
        } catch (error) {
            console.error('Error fetching ETH transaction details');
            throw new Error(`An error occurred while fetching transaction details`);
        }
    }
    private async getEVMTokenData(provider: JsonRpcApiProvider, contractAddress: string, txid: string): Promise<TransactionDetails | Error> {
        try {

            const receipt = await provider.getTransactionReceipt(txid);
            const currentBlock = await provider.getBlockNumber();

            if (receipt?.to && receipt.to.toLowerCase() === contractAddress.toLowerCase()) {

                    if (receipt.logs[0]?.address.toLowerCase() === contractAddress.toLowerCase()) {
                        try {

                            const block = await provider.getBlock(receipt.blockNumber); 

                                const sender = `0x${receipt.logs[0]?.topics[1].slice(26)}`;
                                const receiver = `0x${receipt.logs[0]?.topics[2].slice(26)}`;
                                const decodedAmount = Number(ethers.formatUnits(BigInt(receipt.logs[0]?.data), 18));
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
  
                        } catch (error) {
                            console.log('Failed to decode log:', error);
                            throw new Error('Transaction does not involve the USDT contract');
                        }
                    } else {
                        throw new Error('Transaction does not involve the USDT contract');
                    }
            

            } else {
                throw new Error('Transaction does not involve the USDT contract');
            }
        } catch (error) {
            console.error('Error fetching USDT transaction details');
            throw new Error(`An error occurred while fetching transaction details`);
        }
    }

    // Tron
    private async getTronCoinData(txid: string): Promise<TransactionDetails> {
        try {

            const url = `https://apilist.tronscan.org/api/transaction-info?hash=${txid}`;
    
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch transaction data');
            }
            const tx = await response.json();
    
            const currentBlockResponse = await fetch('https://apilist.tronscan.org/api/block?sort=-number&limit=1');
            if (!currentBlockResponse.ok) {
                throw new Error('Failed to fetch current block data');
            }
            const currentBlockData = await currentBlockResponse.json();
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
        } catch (error) {
            console.error('Error fetching TRX transaction details');
            throw error;
        }
    }
    private async getTronTokenData(txid: string): Promise<TransactionDetails> {
        try {
            const url = `https://apilist.tronscan.org/api/transaction-info?hash=${txid}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch transaction data with status: ${response.status}`);
            }
            const txData = await response.json();

            const currentBlockResponse = await fetch('https://apilist.tronscan.org/api/block?sort=-number&limit=1');
            if (!currentBlockResponse.ok) {
                throw new Error('Failed to fetch current block data');
            }
            const currentBlockData = await currentBlockResponse.json();
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
        } catch (error) {
            console.error('Error fetching USDT transaction details');
            throw new Error(`An error occurred while fetching USDT transaction details`);
        }
    }

    // Bitcoin
    private async getBitcoinCoinData(txid: string): Promise<BTCLikeTransactionDetails> {
        try {
          const txResponse = await fetch(`https://blockstream.info/api/tx/${txid}`);
          if (!txResponse.ok) throw new Error('Failed to fetch transaction data');
          const tx = await txResponse.json();
      
          const blockResponse = await fetch('https://blockstream.info/api/blocks/tip/height');
          if (!blockResponse.ok) throw new Error('Failed to fetch current block data');
          const currentBlock = await blockResponse.json();
      
          const inputs = tx.vin.map((input: any) => ({
            address: input.prevout?.scriptpubkey_address || null,
            amount: input.prevout?.value / 100000000 
          }));
          const outputs = tx.vout.map((output: any) => ({
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
        } catch (error) {
          console.error('Error fetching transaction details');
          throw error
        }
    }

    // Litecoin
    private async getLitecoinCoinData(txid: string): Promise<BTCLikeTransactionDetails> {
        try {

          const baseUrl = 'https://api.blockcypher.com/v1/ltc/main';
      
          const txResponse = await fetch(`${baseUrl}/txs/${txid}`);
          if (!txResponse.ok) throw new Error('Failed to fetch transaction data');
          const tx = await txResponse.json();
      
          const blockResponse = await fetch(`${baseUrl}`);
          if (!blockResponse.ok) throw new Error('Failed to fetch blockchain data');
          const blockchainData = await blockResponse.json();
      
          const inputs = tx.inputs.map((input: any) => ({
            address: input.addresses ? input.addresses[0] : null,
            amount: input.output_value / 100000000
          }));
          const outputs = tx.outputs.map((output: any) => ({
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
        } catch (error) {
          console.error('Error fetching transaction details');
            throw error
        }
    }

}
