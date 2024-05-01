const chargeCoinsService = require('../services/chargeCoins');

exports.chargeCoins = async (req, res) => {
    try {
        const { amount, userId, stripeToken } = req.body;
        const data = { amount, userId, stripeToken };
        const response = await chargeCoinsService.chargeCoins(data);
        if (!response) {
            return res.status(400).json({ error: 'Coins not charged' });
        }
        res.status(200).json({ message: 'Coins charged successfully', response });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};