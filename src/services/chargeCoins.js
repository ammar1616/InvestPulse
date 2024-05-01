const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const userService = require('./user');

exports.chargeCoins = async (data) => {
    try {
        const { amount, userId, stripeToken } = data;
        const user = await userService.getUser(userId);
        if (!user) {
            throw new Error('User not found');
        }
        if (amount < 1) {
            throw new Error('Amount must be greater than 0');
        }
        return await stripe.charges.create({
            amount,
            currency: 'usd',
            source: stripeToken,
        }).then(async (charge) => {
            user.coins += amount * 2;
            return await user.save();
        }).catch((error) => {
            console.log(error);
            return;
        });
    } catch (error) {
        console.log(error);
        return;
    }
};