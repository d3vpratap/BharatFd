const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
  },
  answer: {
    type: String,
  },
  translations: {
    bn: String,
    hi: String,
  },
  answerTranslations: {
    hi: String,
    bn: String,
  },
});
faqSchema.methods.getTranslation = function (lang) {
  return this.translations[lang] || this.question; // Fallback to English (default)
};

const FAQ = mongoose.model("FAQ", faqSchema);
module.exports = FAQ;
