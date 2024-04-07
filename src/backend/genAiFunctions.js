const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
require("dotenv").config({ path: "./.env.local" }); // Specify the correct path to your .env file


let apiKey;

if (process.env.NODE_ENV === "production") {
    // Assuming this code is in the main process, you should use an alternative to localStorage.
    // You might use Electron's app.getPath to determine a safe place to store and retrieve sensitive data.
    const Store = require('electron-store');
    const store = new Store();
    apiKey = store.get('ApiKey'); // Ensure you set this key somewhere secure in production
} else {
    apiKey = process.env.API_KEY;
}

const genAI = new GoogleGenerativeAI(apiKey);

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
