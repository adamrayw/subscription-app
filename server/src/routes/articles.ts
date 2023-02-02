import express from "express";
import { checkAuth } from "../middleware/checkAuth";
import Article from "../models/article";
import User from "../models/user";
import { stripe } from "../utils/stripe";

const router = express.Router()

async function getArticlesByAccess(plan) {
    if(plan === "Basic") {
        const articles = await Article.find({ access: plan})
        
        return articles
    } else if (plan === "Standard") {
        const articles = await Article.find({
            access: {$in: ["Basic", "Standard"]}
        })

        return articles
    } else {
        const articles = await Article.find({
            access: {$in: ["Basic", "Standard", "Premium"]}
        })

        return articles
    }

}

router.get("/", checkAuth, async (req, res) => {
    const user = await User.findOne({ email: req.user })

    if(user.customerStripeId) {
        const subscriptions = await stripe.subscriptions.list(
            {
                customer: user.customerStripeId,
                status: "all",
                expand: ["data.default_payment_method"]
            },
            {
                apiKey: process.env.STRIPE_SECRET_KEY
            }
        );
    
        if(!subscriptions.data.length) return res.json([]);
    
        //@ts-ignore
        const plan = subscriptions.data[0].plan.nickname

        if(plan === 'Basic') {
            const articles = await getArticlesByAccess(plan)

            return res.json(articles)
        } else if(plan === "Standard") {
            const articles = await getArticlesByAccess(plan)

            return res.json(articles)
        } else {
            const articles = await getArticlesByAccess(plan)

            return res.json(articles)
        }
    
    } else {
        res.json({
            isSubscribed: false,
            msg: "User not subscribed anything"
        })
    }

})

export default router;