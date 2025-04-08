const mongoose = require("mongoose");
const slugify = require("slugify");
// const User = require('./userModel');
// const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "旅遊行程必須有一個名稱"],
      unique: true,
      trim: true,
      maxlength: [40, "旅遊名稱必須少於或等於 40 個字"],
      minlength: [10, "旅遊名稱必須多於或等於 10 個字"],
      // validate: [validator.isAlpha, "旅遊名稱只能包含字"]
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, "旅遊行程必須有一個持續時間"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "旅遊行程必須有團體規模"],
    },
    difficulty: {
      type: String,
      required: [true, "旅遊行程必須有一個難度"],
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "難度是: easy, medium, difficult",
      },
    },
    ratingsAverage: {
      type: Number,
      default: 3.0,
      min: [1, "評分必須高於 1.0"],
      max: [5, "評分必須低於 5.0"],
      set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "旅遊行程必須有一個價格"],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this僅指向新文檔建立的當前文檔
          return val < this.price;
        },
        message: "折扣價應低於正常價格",
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, "旅遊行程必須有描述"],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "旅遊行程必須有封面圖片"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      // GeoJSON
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: "Point",
          enum: ["Point"],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// tourSchema.index({ price: 1 });
tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });
tourSchema.index({ startLocation: "2dsphere" });

tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

// 虛擬填充
tourSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "tour",
  localField: "_id",
});

// 中介軟體 只有在 .save() 跟 .create() 之前執行
tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre('save', async function(next) {
//   const guidesPromises = this.guides.map(async id => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });

// tourSchema.pre('save', function(next) {
//   console.log("即將儲存文件");
//   next();
// });

// tourSchema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// });

// 查詢中介軟體
// tourSchema.pre('find', function(next) {
// tourSchema.pre(/^find/, function (next) {
//   this.find({ secretTour: { $ne: true } });

//   this.start = Date.now();
//   next();
// });

tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: "guides",
    select: "-__v -passwordChangedAt",
  });

  next();
});

// tourSchema.post(/^find/, function (docs, next) {
//   console.log(`查詢花了 ${Date.now() - this.start} 毫秒!`);
//   next();
// });

// 聚合中介軟體
// tourSchema.pre('aggregate', function(next) {
//   this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });

//   console.log(this.pipeline());
//   next();
// });

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
