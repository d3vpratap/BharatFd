const express = require("express");
const router = express.Router();
const FAQ = require("../models/faqModel");
const isAutheticated = require("../middlewares/adminAuth");
const translateText = require("../services/googleTranslate");

// fetches all the faqs
router.get("/api/faqs", async (req, res) => {
  const { lang } = req.query;
  try {
    const faqs = await FAQ.find();

    const translatedFaqs = faqs.map((faq) => ({
      _id: faq._id,
      question:
        lang && faq.translations[lang] ? faq.translations[lang] : faq.question,
      answer:
        lang && faq.answerTranslations[lang]
          ? faq.answerTranslations[lang]
          : faq.answer,
    }));
    res.render("faq", { faqs: translatedFaqs });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//create new faqs
router.post("/api/faqs", async (req, res) => {
  const { question, answer } = req.body;

  try {
    // Automatically translate the question and answer into other languages
    const translatedQuestionHi = await translateText(question, "hi");
    const translatedQuestionBn = await translateText(question, "bn");
    const translatedAnswerHi = await translateText(answer, "hi");
    const translatedAnswerBn = await translateText(answer, "bn");

    // console.log("Translated Question (Hindi):", translatedQuestionHi);
    // console.log("Translated Question (Bengali):", translatedQuestionBn);
    // console.log("Translated Answer (Hindi):", translatedAnswerHi);
    // console.log("Translated Answer (Bengali):", translatedAnswerBn);

    const newFAQ = await FAQ.create({
      question,
      answer,
      translations: {
        hi: translatedQuestionHi,
        bn: translatedQuestionBn,
      },
      answerTranslations: {
        hi: translatedAnswerHi,
        bn: translatedAnswerBn,
      },
    });
    console.log(newFAQ);
    res.redirect("/api/faqs");
  } catch (error) {
    res.status(500).json({ message: "Error creating FAQ" });
  }
});

//display edit form to edit existing faq
router.get("/api/faqs/:id", async (req, res) => {
  const { id } = req.params;
  const faq = await FAQ.findById(id);
  res.render("edit", { faq });
});

// register changes inside existing faq
router.patch("/api/faqs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;
    const translatedQuestionHi = await translateText(question, "hi");
    const translatedQuestionBn = await translateText(question, "bn");
    const translatedAnswerHi = await translateText(answer, "hi");
    const translatedAnswerBn = await translateText(answer, "bn");

    const faq = await FAQ.findByIdAndUpdate(
      id,
      {
        question,
        answer,
        translations: {
          bn: translatedQuestionBn,
          hi: translatedQuestionHi,
        },
        answerTranslations: {
          bn: translatedAnswerBn,
          hi: translatedAnswerHi,
        },
      },
      { new: true }
    );
    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }
    res.redirect("/api/faqs");
  } catch (error) {
    res.status(500).json({ message: "Error updating FAQ" });
  }
});

// delete existing faq
router.delete("/api/faqs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    try {
      const faq = await FAQ.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }

    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }
    res.redirect("/api/faqs");
  } catch (error) {
    res.status(500).json({ message: "Error deleting FAQ" });
  }
});

module.exports = router;
