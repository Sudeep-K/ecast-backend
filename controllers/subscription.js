const subscriptionRouter = require('express').Router()
const Subscription = require('../models/Subscription')

subscriptionRouter.get('/', async (req, res, next) => {
    const subscriptions = await Subscription.find({})
    res.json(subscriptions)
})

subscriptionRouter.post('/', async (req, res, next) => {
    const body = req.body

    const subscription = new Subscription({
        username: body.username,
        useremail: body.useremail
    })

    if (subscription.username === undefined || subscription.useremail === undefined) {
        res.status(400).end()
    } else {
        const savedSubscription = await subscription.save()
        res.status(201).json(savedSubscription)
    }
})

module.exports = subscriptionRouter