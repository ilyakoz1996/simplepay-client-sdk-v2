export default [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"createdAt","type":"uint256"},{"indexed":false,"internalType":"bytes32","name":"invoiceId","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"merchantId","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"projectId","type":"bytes32"},{"indexed":false,"internalType":"bytes32","name":"productId","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenPrice","type":"uint256"},{"indexed":false,"internalType":"bytes","name":"from","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"to","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"clientEmail","type":"bytes"}],"name":"InvoiceIssued","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"updatedAt","type":"uint256"},{"indexed":false,"internalType":"bytes32","name":"invoiceId","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"merchantId","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"projectId","type":"bytes32"},{"indexed":false,"internalType":"bytes32","name":"productId","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenPrice","type":"uint256"},{"indexed":false,"internalType":"bytes","name":"from","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"to","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"clientEmail","type":"bytes"},{"indexed":false,"internalType":"bytes32","name":"transactionId","type":"bytes32"}],"name":"InvoiceProcessing","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"updatedAt","type":"uint256"},{"indexed":false,"internalType":"bytes32","name":"invoiceId","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"merchantId","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"projectId","type":"bytes32"},{"indexed":false,"internalType":"bytes32","name":"productId","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenPrice","type":"uint256"},{"indexed":false,"internalType":"bytes","name":"from","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"to","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"clientEmail","type":"bytes"},{"indexed":false,"internalType":"bytes32","name":"transactionId","type":"bytes32"}],"name":"InvoiceRejected","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"updatedAt","type":"uint256"},{"indexed":false,"internalType":"bytes32","name":"invoiceId","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"merchantId","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"projectId","type":"bytes32"},{"indexed":false,"internalType":"bytes32","name":"productId","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenPrice","type":"uint256"},{"indexed":false,"internalType":"bytes","name":"from","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"to","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"clientEmail","type":"bytes"},{"indexed":false,"internalType":"bytes32","name":"transactionId","type":"bytes32"}],"name":"InvoiceSuccess","type":"event"},{"inputs":[{"internalType":"bytes32","name":"_invoiceId","type":"bytes32"},{"internalType":"bytes32","name":"_merchantId","type":"bytes32"},{"internalType":"bytes32","name":"_projectId","type":"bytes32"},{"internalType":"bytes32","name":"_productId","type":"bytes32"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_tokenAmount","type":"uint256"},{"internalType":"uint256","name":"_tokenPrice","type":"uint256"},{"internalType":"bytes","name":"_from","type":"bytes"},{"internalType":"bytes","name":"_to","type":"bytes"},{"internalType":"bytes","name":"_clientEmail","type":"bytes"}],"name":"Issue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_invoiceId","type":"bytes32"},{"internalType":"bytes32","name":"_transactionId","type":"bytes32"}],"name":"Processing","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_invoiceId","type":"bytes32"}],"name":"Reject","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_invoiceId","type":"bytes32"}],"name":"Success","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_invoiceId","type":"bytes32"}],"name":"getInvoice","outputs":[{"components":[{"internalType":"uint256","name":"createdAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"bytes32","name":"invoiceId","type":"bytes32"},{"internalType":"bytes32","name":"merchantId","type":"bytes32"},{"internalType":"bytes32","name":"projectId","type":"bytes32"},{"internalType":"bytes32","name":"productId","type":"bytes32"},{"internalType":"bytes32","name":"transactionId","type":"bytes32"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"},{"internalType":"uint256","name":"tokenPrice","type":"uint256"},{"internalType":"bytes","name":"from","type":"bytes"},{"internalType":"bytes","name":"to","type":"bytes"},{"internalType":"bytes","name":"clientEmail","type":"bytes"},{"internalType":"enum SimplePayInvoices.InvoiceStatus","name":"status","type":"uint8"}],"internalType":"struct SimplePayInvoices.Invoice","name":"","type":"tuple"}],"stateMutability":"view","type":"function"}]