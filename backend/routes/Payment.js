import Stripe from "stripe";
import express from "express";

const router = express.Router();

const stripe = new Stripe("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",{
   apiVersion:"2022-09-07"
});

router.post("/payRent", (req,res) => {
    const {token,amount} = req.body;

    return stripe.customers.create({
        email:token.email,
        source:token
    }).then(customer => {
        stripe.charges.create({
            amount:amount,
            currency:"inr",
            customer:customer.id,
            receipt_email:token.email
        },{idempotencyKey})
    }).then(res => {
        res.status(200).json(res)
    }).catch((err) => {
        (err)
    })
})

export default router;
