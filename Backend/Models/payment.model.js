const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    orderId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Order", 
        required: true 
    },

    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },

    amount: { 
        type: Number, 
        required: true 
    },

    currency: { 
        type: String, 
        enum: ["USD", "BDT", "EUR", "GBP"], 
        default: "BDT" 
    },

    paymentMethod: { 
        type: String, 
        enum: ["SSLCommerz", "Stripe", "PayPal", "Bkash", "Nagad"], 
        default : 'SSLCommerz'
    },

    transactionId: { 
        type: String, 
        required: true, 
        unique: true 
    },

    paymentStatus: { 
        type: String, 
        enum: ["Pending", "Paid", "Failed", "Refunded","Cencel"], 
        default: "Pending" 
    },

    paymentDetails: { 
        type: Object, 
        default: {} 
    }
},{timestamps : true});


paymentSchema.pre("save", function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model("Payment", paymentSchema);
