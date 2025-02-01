const express = require("express");
const router = express.Router();
const FAQ = require("../models/faqModel");
const translateText = require("../services/googleTranslate");
// const isAutheticated = require("../middlewares/adminAuth");
const mongoose = require("mongoose");
const { RedisSearchLanguages } = require("redis");

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

    res.status(200).render("faq", { faqs: translatedFaqs });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//create new faqs
router.post("/api/faqs", async (req, res) => {
  const { question, answer } = req.body;
  if (
    !question ||
    typeof question !== "string" ||
    !answer ||
    typeof answer !== "string"
  ) {
    return res.status(422).json({ message: "Invalid Inputs!" });
  }

  try {
    // Automatically translate the question and answer into other languages
    const translatedQuestionHi = await translateText(question, "hi");
    const translatedQuestionBn = await translateText(question, "bn");
    const translatedAnswerHi = await translateText(answer, "hi");
    const translatedAnswerBn = await translateText(answer, "bn");

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
    res
      .status(201)
      .json({ message: "Created Faq succesfully!", newFAQ: newFAQ });
  } catch (error) {
    console.error("Error creating FAQ:", error);
    res
      .status(500)
      .json({ message: "Error creating FAQ", error: error.message });
  }
});

//display edit form to edit existing faq
router.get("/api/faqs/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid FAQ ID" });
  }
  const faq = await FAQ.findById(id);
  if (!faq) {
    return res.status(404).json({ message: "No Faq exist with this Id" });
  }
  res.render("edit", { faq });
});

// register changes inside existing faq
router.patch("/api/faqs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;
    if (
      !question ||
      typeof question !== "string" ||
      !answer ||
      typeof answer !== "string"
    ) {
      return res.status(422).json({ message: "Invalid Inputs!" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid FAQ ID" });
    }

    const translatedQuestionHi = await translateText(question, "hi");
    const translatedQuestionBn = await translateText(question, "bn");
    const translatedAnswerHi = await translateText(answer, "hi");
    const translatedAnswerBn = await translateText(answer, "bn");
    if (
      !translatedQuestionHi ||
      !translatedQuestionBn ||
      !translatedAnswerHi ||
      !translatedAnswerBn
    ) {
      return res.status(500).send({ message: "Translation Failed" });
    }
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
    res.status(200).json({ message: "FAQ updated successfully", faq });
  } catch (error) {
    res.status(500).json({ message: "Error Updtaing FAQ", error });
  }
});

// delete existing faq
router.delete("/api/faqs/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const faq = await FAQ.findByIdAndDelete(id);
    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    // res.status(204).send();
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting FAQ", error });
  }
});

module.exports = router;
