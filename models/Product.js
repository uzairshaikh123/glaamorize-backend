const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  short_link: {
    type: String,
  },
  featured_image: {
    type: String,
  },
  caption: {
    type: String,
  },
  featured_images: {
    url: {
      type: String,
    },
    caption: {
      type: String,
    },
    small: {
      type: String,
    },
    webp_small: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    large: {
      type: String,
    },
    original: {
      type: String,
    },
    webp_thumbnail: {
      type: String,
    },
    webp_large: {
      type: String,
    },
    webp_original: {
      type: String,
    },
  },
  badge: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  cost_price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
  },
  is_wishlisted: {
    type: Boolean,
    default: false,
  },
  ratings: {
    score: {
      type: Number,
    },
    count: {
      type: Number,
    },
  },
  attributes: {
    price_subtext: {
      type: [String],
    },
    locality: {
      type: [String],
    },
    caption: {
      type: [String],
    },
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

// referrence of this data source

// {
//     "data": {
//         "experiences": [
//             {
//                 "id": 2210,
//                 "name": "Glorious Black and Golden Birthday decor",
//                 "short_link": "glorious-black-and-golden-birthday-decor",
//                 "featured_image": "https:\/\/deowgxgt4vwfe.cloudfront.net\/uploads\/1604254840_original.jpg",
//                 "caption": "Surprise your loved one - with cake and room filled with colorful balloons",
//                 "featured_images": {
//                     "url": "https:\/\/deowgxgt4vwfe.cloudfront.net\/uploads\/1604254840_original.jpg",
//                     "caption": "Black and Golden Balloon Decorations at Home",
//                     "small": "https:\/\/deowgxgt4vwfe.cloudfront.net\/uploads\/1604254840_small.jpg",
//                     "webp_small": "https:\/\/deowgxgt4vwfe.cloudfront.net\/uploads\/1604254840_webp_small.webp",
//                     "thumbnail": "https:\/\/deowgxgt4vwfe.cloudfront.net\/uploads\/1604254840_thumbnail.jpg",
//                     "large": "https:\/\/deowgxgt4vwfe.cloudfront.net\/uploads\/1604254840_large.jpg",
//                     "original": "https:\/\/deowgxgt4vwfe.cloudfront.net\/uploads\/1604254840_original.jpg",
//                     "webp_thumbnail": "https:\/\/deowgxgt4vwfe.cloudfront.net\/uploads\/1604254840_webp_thumbnail.webp",
//                     "webp_large": "https:\/\/deowgxgt4vwfe.cloudfront.net\/uploads\/1604254840_webp_large.webp",
//                     "webp_original": "https:\/\/deowgxgt4vwfe.cloudfront.net\/uploads\/1604254840_webp_original.webp"
//                 },
//                 "badge": null,
//                 "price": 2199,
//                 "cost_price": 1030,
//                 "type": "",
//                 "is_wishlisted": false,
//                 "ratings": {
//                     "score": 4.7155555555555555,
//                     "count": 450
//                 },
//                 "attributes": {
//                     "price_subtext": [
//                         "surprise"
//                     ],
//                     "locality": [
//                         "At your location"
//                     ],
//                     "caption": [
//                         "Surprise your loved one this Glorious Black and Golden Birthday decor"
//                     ]
//                 }
//             },

// All data that should be in local storage

// checkout_order	{"amount":999,"amount_discounted":0,"cash_used":0,"coupon_code":null,"experience_amount":0,"experience_id":2617,"exp_original_price":999,"experience_name":"Unconditional Love Frame","quantity":1,"delivery_charges":0,"date":null,"slot_id":null,"task_surge":0,"customization_surge":0,"time":null,"pincode":null,"pincode_category":"cat2","customizations":{},"customer_id":null,"id":2617,"getCustomizations":[],"courier":1,"cod_available":null,"featured_image":"https://deowgxgt4vwfe.cloudfront.net/uploads/1623413382_small.jpg"}
// first_time_url	/
// algoliasearch-client-js-4.9.1-AH03V2NE0X	{"{\"protocol\":\"https\",\"url\":\"AH03V2NE0X-dsn.algolia.net\",\"accept\":1}":{"protocol":"https","url":"AH03V2NE0X-dsn.algolia.net","accept":1,"status":3,"lastUpdate":1694344173819}}
// rzp_device_id	1.370bbfba0b40e86e59fd2062f2f9dc57afcfa241.1688821209408.78609372
// selectedCity	{"id":2,"city_name":"Jaipur","city_short_name":"jaipur","image_url":"https://deowgxgt4vwfe.cloudfront.net/city-icons/Jaipur_Icon-min.png"}
// booking_experience	{"id":3084,"active":1,"cod_available":0,"courier":0,"name":"Pastel And Rosegold Birthday Decor","meta_description":"Thinking of what to do on your birthday? Well, get this Gorgeous Pastel Balloon Decor for your Birthday to make your party lit! Celebrate your 16th, 18th, 25th birthday and more with this exclusive and eye-appealing decor! Get our professional decorators right at your home to do the decorations anywhere in your city.","short_link":"pastel-and-rosegold-birthay-decor","description":"Birthdays are unforgettable as a result, every individual plans their birthday thinking much more ahead of the time. Getting Decorations becomes a must, which is why we have designed this beautiful Pastel Rose Gold Decor that you can have for birthdays! \n\nWhether you are planning for your siblings or friends, this unique and attractive decor is sure to make the party exciting! You can plan 16th, 18th, 20th birthdays and more with this eye-appealing decor. Including this decor for your birthda…
// rzp_checkout_anon_id	40421a5cd93b4aacb1a954824902d5f2
// booking_order	{"amount":2399,"amount_discounted":0,"cash_used":0,"coupon_code":null,"experience_amount":0,"experience_id":3084,"exp_original_price":2399,"experience_name":"Pastel And Rosegold Birthday Decor","quantity":1,"delivery_charges":0,"date":null,"slot_id":null,"task_surge":0,"customization_surge":0,"time":null,"pincode":null,"pincode_category":"cat1","customizations":{},"customer_id":null,"id":3084,"getCustomizations":[],"courier":null,"cod_available":null,"featured_image":"https://deowgxgt4vwfe.cloudfront.net/uploads/1680590693_small.jpg"}
// pincode
// visited_count	1
// _uetvid_exp	Fri, 01 Nov 2024 11:41:38 GMT
// wishlist	[4547]
// first_route	/
// rzp_checkout_user_id	+918287543363
// checkout_url	{"amount":999,"amount_discounted":0,"cash_used":0,"coupon_code":null,"experience_amount":0,"experience_id":2617,"exp_original_price":999,"experience_name":"Unconditional Love Frame","quantity":1,"delivery_charges":0,"date":null,"slot_id":null,"task_surge":0,"customization_surge":0,"time":null,"pincode":null,"pincode_category":"cat2","customizations":{},"customer_id":null,"id":2617,"getCustomizations":[],"courier":1,"cod_available":null,"featured_image":"https://deowgxgt4vwfe.cloudfront.net/uploads/1623413382_small.jpg"}
// checkout_redirect_check	true
// lastExternalReferrer	empty
// _uetsid_exp	Mon, 09 Oct 2023 11:41:38 GMT
// lastExternalReferrerTime	1696765066224
// selectedslots	[{"slot_id":10834859,"disabled_customizations":null,"date":"2023-08-16","start_time":"10:00:00","end_time":"14:00:00","task_dynamic_percentage":0,"customization_dynamic_percentage":0,"instruction":"","available_slots":4},{"slot_id":10834860,"disabled_customizations":null,"date":"2023-08-16","start_time":"14:00:00","end_time":"18:00:00","task_dynamic_percentage":0,"customization_dynamic_percentage":0,"instruction":"","available_slots":4},{"slot_id":10834861,"disabled_customizations":null,"date":"2023-08-16","start_time":"18:00:00","end_time":"22:00:00","task_dynamic_percentage":0,"customization_dynamic_percentage":0,"instruction":"","available_slots":4}]
// recent	[{"experience_page":{"experience":{"id":3084,"active":1,"cod_available":0,"courier":0,"name":"Pastel And Rosegold Birthday Decor","meta_description":"Thinking of what to do on your birthday? Well, get this Gorgeous Pastel Balloon Decor for your Birthday to make your party lit! Celebrate your 16th, 18th, 25th birthday and more with this exclusive and eye-appealing decor! Get our professional decorators right at your home to do the decorations anywhere in your city.","short_link":"pastel-and-rosegold-birthay-decor","description":"Birthdays are unforgettable as a result, every individual plans their birthday thinking much more ahead of the time. Getting Decorations becomes a must, which is why we have designed this beautiful Pastel Rose Gold Decor that you can have for birthdays! \n\nWhether you are planning for your siblings or friends, this unique and attractive decor is sure to make the party exciting! You can plan 16th, 18th, 20th birthdays and more with this eye-appealing decor. Inc…
// _uetvid	6512f7d01cc311eea235238966723462
// _uetsid	f919948065ce11ee9ef3bf5e476ba236
