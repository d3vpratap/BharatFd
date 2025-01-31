const { TranslationServiceClient } = require("@google-cloud/translate");
// Initialize the Google Translate client
const client = new TranslationServiceClient();
const projectId = "nodetalk-24565"; // Replace with your Google Cloud project ID
const location = "global"; // Default location for translation API

// Translate text using Google Cloud Translation API
const translateText = async (text, targetLanguage) => {
  try {
    const request = {
      parent: client.locationPath(projectId, location),
      contents: [text],
      mimeType: "text/plain", // Text type
      sourceLanguageCode: "en", // Source language (English)
      targetLanguageCode: targetLanguage, // Target language code
    };

    const [response] = await client.translateText(request);
    return response.translations[0].translatedText;
  } catch (error) {
    console.error("Error translating text:", error);
    throw new Error("Translation failed");
  }
};

module.exports = translateText;
