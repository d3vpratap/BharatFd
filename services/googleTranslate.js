const { TranslationServiceClient } = require("@google-cloud/translate");
const redis = require("./redis");
const client = new TranslationServiceClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});
const projectId = process.env.PROJECT_ID;
if (!projectId) {
  throw new Error("Missing PROJECT_ID in environment variables.");
}
const location = "global";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const translateText = async (
  text,
  targetLanguage,
  retries = 3,
  delayMs = 1000
) => {
  const cacheKey = `translation:${text}:${targetLanguage}`;

  try {
    const cachedTranslation = await redis.get(cacheKey);
    if (cachedTranslation) {
      return cachedTranslation;
    }
    const request = {
      parent: `projects/${projectId}/locations/${location}`,
      contents: [text],
      mimeType: "text/plain",
      sourceLanguageCode: "en",
      targetLanguageCode: targetLanguage,
    };

    let attempt = 0;
    while (attempt < retries) {
      try {
        const [response] = await client.translateText(request);
        if (!response.translations || response.translations.length === 0) {
          throw new Error("Empty response from Google Translate API");
        }
        const translatedText = response.translations[0].translatedText;
        await redis.setex(cacheKey, 86400, translatedText);
        return translatedText;
      } catch (error) {
        if (attempt < retries - 1) {
          console.warn(
            `Translate API failed. Retrying (${attempt + 1}/${retries})...`,
            error.message
          );
          await delay(delayMs * 2 ** attempt);
        } else {
          console.error("Translation API error after retries:", error.message);
          return `⚠️ Translation unavailable for: "${text}"`; // Fallback response
        }
      }
      attempt++;
    }
  } catch (error) {
    console.error("Critical error in translateText function:", error.message);
    return `⚠️ Translation unavailable for: "${text}"`; // Fallback message
  }
};

module.exports = translateText;
