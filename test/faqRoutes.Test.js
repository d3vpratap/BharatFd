const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const app = require("../app");
const FAQ = require("../models/faqModel");
chai.use(chaiHttp);
const { expect } = chai;

describe("FAQ API Tests", () => {
  let faqId;

  it("should create a new FAQ", async () => {
    const res = await chai.request(app).post("/api/faqs").send({
      question: "What is Node js?",
      answer: "A JavaScript runtime",
    });
    expect(res).to.have.status(201);
    expect(res.body)
      .to.have.property("message")
      .that.equals("Created Faq succesfully!");
    console.log(res.body);
    faqId = res.body.newFAQ._id; // Store ID for next tests
  });

  it("should handle empty input for /api/faqs", async () => {
    const res = await chai.request(app).post("/api/faqs").send({
      question: "",
      answer: "",
    });
    expect(res).to.have.status(422);
    expect(res.body).to.have.property("message").that.equals("Invalid Inputs!");
  });

  it("should fetch all FAQ", async () => {
    const res = await chai.request(app).get("/api/faqs?lang=");
    expect(res).to.have.status(200);
  });

  it("should update a FAQ", async () => {
    const res = await chai.request(app).patch(`/api/faqs/${faqId}`).send({
      question: "Updating question",
      answer: "updated answere as well",
    });
    expect(res).to.have.status(200);
    expect(res.body)
      .to.have.property("message")
      .that.equals("FAQ updated successfully");
  });

  it("should delete a FAQ", async () => {
    const res = await chai.request(app).delete(`/api/faqs/${faqId}`);
    expect(res).to.have.status(200);
  });
});
