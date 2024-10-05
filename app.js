const express = require('express');
const { beginCell, toNano, Address } = require('@ton/ton');

const app = express();
const port = process.env.PORT || 3000;

app.get('/transfer', (req, res) => {
    const Wallet_DST = req.query.wallet_dst; // Expected as a query parameter
    const Wallet_SRC = req.query.wallet_src; // Expected as a query parameter

    try {
        const body = beginCell()
            .storeUint(0xf8a7ea5, 32)
            .storeUint(0, 64)
            .storeCoins(toNano("0.001"))
            .storeAddress(Address.parse(Wallet_DST))
            .storeAddress(Address.parse(Wallet_SRC))
            .storeUint(0, 1)
            .storeCoins(toNano("0.05"))
            .storeUint(0,1)
            .endCell()
            .toBoc()
            .toString("base64");

        res.send({ result: body });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
