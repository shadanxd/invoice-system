module.exports = app => {
    const user = require('../controllers/user-controller')
    const invoice = require('../controllers/invoice-controller')
    const payment = require('../controllers/payment-controller')

    const formValidator = require('../middleware/form-validator')
    const authenticator = require('../middleware/authenticator')
    const authorize = require('../middleware/authorize');

    var router = require('express').Router();
    
    // User Routes
    router.post('/user/add', authenticator.authenticate, 
        authorize.authorize(['admin']), 
        formValidator.user_validation, user.addNew);

    router.get('/user/fetch', 
        authenticator.authenticate,authorize.authorize(['admin']), 
        formValidator.user_fetch_validation, user.fetch);

    router.put('/user/update', 
        authenticator.authenticate, 
        authorize.authorize(['admin']), 
        formValidator.user_update_validator, user.update)
    
    router.delete('/user/delete',
        authenticator.authenticate, 
        authorize.authorize(['admin']), formValidator.id_validator, user.delete)

    //Invoice Routes

    router.post('/invoice/add', 
        authenticator.authenticate, 
        authorize.authorize(['admin', 'receiver']),
        formValidator.invoice_validation, invoice.add)

    router.get('/invoice/fetch', 
        authenticator.authenticate, 
        authorize.authorize(['admin', 'receiver']), formValidator.invoice_fetch_validation, invoice.fetch)

    router.put('/invoice/updateStatus',
        authenticator.authenticate, 
        authorize.authorize(['admin']), formValidator.invoice_status_validator, invoice.updateStatus)

    router.delete('/invoice/delete', 
        authenticator.authenticate, 
        authorize.authorize(['admin']), formValidator.id_validator, invoice.delete)

    //Payment Routes

    router.post('/payment/add', 
        authenticator.authenticate,
        authorize.authorize(['admin', 'payer']), 
        formValidator.payment_validation, payment.add)

    router.get('/payment/fetch', 
        authenticator.authenticate, 
        authorize.authorize(['admin']),formValidator.payment_fetch_validation, payment.fetch)

    router.delete('/payment/delete', 
        authenticator.authenticate, 
        authorize.authorize(['admin']), formValidator.id_validator, payment.delete)

    app.use('/invoice-system', authenticator.authenticate,router);
};