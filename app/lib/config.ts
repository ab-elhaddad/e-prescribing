const config = {
  mongoUri: process.env.MONGO_URI,
  mongoDb: process.env.MONGO_DB || "test",
  ocrApi: process.env.OCR_API,
  ocrApiKey: process.env.OCR_API_KEY,
};

export default config;
