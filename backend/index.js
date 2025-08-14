require('dotenv').config();
const express = require('express');
const ethers = require('ethers');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Import contract ABIs
const rentalAgreementABI = require('./abis/RentalAgreement.json').abi;
const reputationLedgerABI = require('./abis/ReputationLedger.json').abi;

// Initialize provider
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL || 'https://eth-sepolia.g.alchemy.com/v2/U08OV9zM6xbH-F-_BgrR-');

// Initialize contracts
const rentalAgreement = new ethers.Contract(
  process.env.RENTAL_AGREEMENT_ADDRESS,
  rentalAgreementABI,
  provider
);

const reputationLedger = new ethers.Contract(
  process.env.REPUTATION_LEDGER_ADDRESS,
  reputationLedgerABI,
  provider
);

// Basic route
app.get('/', (req, res) => {
  res.send('RentTrust Backend API');
});

// ===== Rental Agreement Endpoints ===== //

// Get agreement(s) for a user
app.get('/api/agreements/:userAddress', async (req, res) => {
  try {
    const { userAddress } = req.params;
    
    // Check if the address is the tenant or landlord
    const isTenant = (await rentalAgreement.tenant()).toLowerCase() === userAddress.toLowerCase();
    const isLandlord = (await rentalAgreement.landlord()).toLowerCase() === userAddress.toLowerCase();

    if (!isTenant && !isLandlord) {
      return res.json([]); // Return empty array if not involved
    }

    // Get agreement details
    const agreement = {
      landlord: await rentalAgreement.landlord(),
      tenant: await rentalAgreement.tenant(),
      propertyAddress: await rentalAgreement.propertyAddress(),
      rentAmount: (await rentalAgreement.rentAmount()).toString(),
      securityDeposit: (await rentalAgreement.securityDeposit()).toString(),
      startDate: (await rentalAgreement.startDate()).toString(),
      endDate: (await rentalAgreement.endDate()).toString(),
      rules: await rentalAgreement.rules(),
      dueDate: (await rentalAgreement.dueDate()).toString(),
      isActive: await rentalAgreement.isActive()
    };

    res.json([agreement]); // Return as array for consistency
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== Reputation Ledger Endpoints ===== //

// Get average rating for a user
app.get('/api/reputation/:userAddress', async (req, res) => {
  try {
    const { userAddress } = req.params;
    const avgRating = await reputationLedger.getAverageRating(userAddress);
    res.json({ 
      averageRating: avgRating.toString(),
      address: userAddress
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get rent payment history for a tenant
app.get('/api/rent-history/:tenantAddress', async (req, res) => {
  try {
    const { tenantAddress } = req.params;
    const history = await reputationLedger.getRentHistory(tenantAddress);
    
    // Format the response
    const formattedHistory = history.map(payment => ({
      amount: ethers.formatEther(payment.amount.toString()), // Convert from wei to ETH
      date: new Date(payment.date * 1000).toISOString(),
      timestamp: payment.date.toString()
    }));
    
    res.json(formattedHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit a new review
app.post('/api/reviews', async (req, res) => {
  try {
    const { reviewer, reviewee, rating, comment, privateKey } = req.body;
    
    // Validate rating (1-5)
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    const wallet = new ethers.Wallet(privateKey, provider);
    const contractWithSigner = reputationLedger.connect(wallet);
    
    const tx = await contractWithSigner.submitReview(
      reviewee, // Note: Removed reviewer param as it's automatically taken from signer
      rating,
      comment
    );
    
    await tx.wait();
    res.json({ 
      success: true, 
      txHash: tx.hash,
      message: "Review submitted successfully"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Record a rent payment (for landlords)
app.post('/api/rent-payments', async (req, res) => {
  try {
    const { tenantAddress, amount, privateKey } = req.body;
    
    const wallet = new ethers.Wallet(privateKey, provider);
    const contractWithSigner = reputationLedger.connect(wallet);
    
    const tx = await contractWithSigner.recordRentPayment(
      tenantAddress,
      ethers.parseEther(amount.toString()) // Convert ETH to wei
    );
    
    await tx.wait();
    res.json({ 
      success: true, 
      txHash: tx.hash,
      message: "Rent payment recorded"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== Debug Endpoints (Temporary) ===== //

// Check contract connection
app.get('/debug/contract', async (req, res) => {
  try {
    const code = await provider.getCode(process.env.RENTAL_AGREEMENT_ADDRESS);
    res.send({ 
      isContract: code !== '0x',
      address: process.env.RENTAL_AGREEMENT_ADDRESS
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Get contract roles
app.get('/debug/roles', async (req, res) => {
  try {
    res.json({
      landlord: await rentalAgreement.landlord(),
      tenant: await rentalAgreement.tenant(),
      isActive: await rentalAgreement.isActive()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});