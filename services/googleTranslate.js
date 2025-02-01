const { TranslationServiceClient } = require("@google-cloud/translate");
const redis = require("./redis");
// Initialize the Google Translate client
const client = new TranslationServiceClient();
const ID = process.env.PROJECT_ID;
const projectId = ID;
const location = "global";

// Translate text using Google Cloud Translation API
const translateText = async (text, targetLanguage) => {
  const cacheKey = `translation:${text}:${targetLanguage}`;
  const cachedTranslation = await redis.get(cacheKey);
  if (cachedTranslation) {
    return cachedTranslation; // Return cached translation
  }
  try {
    const request = {
      parent: client.locationPath(projectId, location),
      contents: [text],
      mimeType: "text/plain",
      sourceLanguageCode: "en", // Source language (English)
      targetLanguageCode: targetLanguage, // Target language code
    };
    const [response] = await client.translateText(request);
    const translatedText = response.translations[0].translatedText;
    redis.setex(cacheKey, 86400, translatedText);
    return translatedText;
  } catch (error) {
    console.error("Error translating text:", error);
    throw new Error("Translation failed");
  }
};

module.exports = translateText;
