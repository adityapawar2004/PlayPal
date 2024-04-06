const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
require("dotenv").config({ path: "./.env.local" }); // Specify the correct path to your .env file

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const path = require("path");

function fileToGenerativePart(fileName, mimeType) {
  const absolutePath = fileName;
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(absolutePath)).toString("base64"),
      mimeType,
    },
  };
}

async function screenshotOnly(filePath, searchValue) {
  console.log("aiFunction" + JSON.stringify(filePath));
  console.log(process.env.API_KEY);
  // For text-and-image input (multimodal), use the gemini-pro-vision model
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt = ` I am  playing ${searchValue} and the image attached shows what's currently on my screen. Based on this,what should I do`;

  const imageParts = [fileToGenerativePart(filePath, "image/png")];

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
}

module.exports = screenshotOnly;
