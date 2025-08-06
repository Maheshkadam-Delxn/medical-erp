// src/models/Product.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const batchSchema = new Schema({
  batchNumber: {
    type: String,
    required: [true, 'Batch number is required'],
    trim: true
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative']
  },
  manufacturerDate: {
    type: Date,
    required: [true, 'Manufacturer date is required'],
    validate: {
      validator: function(value) {
        return value <= this.expiryDate;
      },
      message: 'Manufacturer date must be before expiry date'
    }
  },
  expiryDate: {
    type: Date,
    required: [true, 'Expiry date is required']
  }
}, { _id: false });

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['Tablet', 'Syrup', 'Equipment', 'Consumable', 'Injection', 'Capsule'],
      message: 'Invalid category'
    }
  },
  brand: {
    type: String,
    trim: true,
    maxlength: [50, 'Brand name cannot exceed 50 characters']
  },
  code: {
    type: String,
    required: [true, 'Product code is required'],
    unique: true,
    trim: true,
    uppercase: true,
    maxlength: [20, 'Product code cannot exceed 20 characters']
  },
  unit: {
    type: String,
    enum: {
      values: ['strip', 'bottle', 'piece', 'pair', 'box', 'pack'],
      message: 'Invalid unit'
    },
    default: 'piece'
  },
  purchasePrice: {
    type: Number,
    required: [true, 'Purchase price is required'],
    min: [0, 'Purchase price cannot be negative']
  },
  sellingPrice: {
    type: Number,
    required: [true, 'Selling price is required'],
    min: [0, 'Selling price cannot be negative'],
    validate: {
      validator: function(value) {
        return value >= this.purchasePrice;
      },
      message: 'Selling price must be greater than or equal to purchase price'
    }
  },
  reorderLevel: {
    type: Number,
    required: [true, 'Reorder level is required'],
    min: [0, 'Reorder level cannot be negative']
  },
  active: {
    type: Boolean,
    default: true
  },
  batches: {
    type: [batchSchema],
    default: [],
    validate: {
      validator: function(batches) {
        if (this.active && batches.length === 0) {
          return false;
        }
        return true;
      },
      message: 'Active products must have at least one batch'
    }
  },
   registrationId: {
      type: String,
      required: true,
   },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});


productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

productSchema.virtual('totalStock').get(function() {
  return this.batches.reduce((sum, batch) => sum + batch.quantity, 0);
});

productSchema.virtual('isLowStock').get(function() {
  return this.totalStock <= this.reorderLevel;
});

productSchema.index({
  name: 'text',
  code: 'text',
  brand: 'text'
});

// Export as ES module default
export default mongoose.models.Product || mongoose.model('Product', productSchema);
