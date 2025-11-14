import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });

export const generateFlagQuestions = async (count) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate ${count} multiple-choice questions about country flags. For each question, provide the country name, its two-letter ISO 3166-1 alpha-2 country code, four country names as options (one of which is the correct answer), and the correct country name as the correctAnswer. Ensure the countryCode is lowercase. Include a mix of well-known and lesser-known countries from various continents to make it challenging. Randomize the order of questions.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              countryName: { type: Type.STRING },
              countryCode: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctAnswer: { type: Type.STRING },
            },
            required: ["countryName", "countryCode", "options", "correctAnswer"],
          },
        },
      },
    });

    const parsedResponse = JSON.parse(response.text);
    return parsedResponse;
  } catch (error) {
    console.error("Error generating flag questions:", error);
    // Provide fallback data in case of API error
    return [
        { countryName: "Japan", countryCode: "jp", options: ["China", "Japan", "South Korea", "Vietnam"], correctAnswer: "Japan" },
        { countryName: "Canada", countryCode: "ca", options: ["USA", "Mexico", "Canada", "Brazil"], correctAnswer: "Canada" },
        { countryName: "Brazil", countryCode: "br", options: ["Argentina", "Chile", "Brazil", "Colombia"], correctAnswer: "Brazil" },
        { countryName: "Australia", countryCode: "au", options: ["New Zealand", "Australia", "Fiji", "Papua New Guinea"], correctAnswer: "Australia" },
        { countryName: "Germany", countryCode: "de", options: ["Belgium", "France", "Germany", "Austria"], correctAnswer: "Germany" },
        { countryName: "India", countryCode: "in", options: ["Pakistan", "Bangladesh", "India", "Sri Lanka"], correctAnswer: "India" },
        { countryName: "Italy", countryCode: "it", options: ["Spain", "Greece", "Italy", "France"], correctAnswer: "Italy" },
        { countryName: "South Africa", countryCode: "za", options: ["Nigeria", "Kenya", "South Africa", "Egypt"], correctAnswer: "South Africa" },
        { countryName: "Bhutan", countryCode: "bt", options: ["Nepal", "Bhutan", "Tibet", "Myanmar"], correctAnswer: "Bhutan" },
        { countryName: "Seychelles", countryCode: "sc", options: ["Maldives", "Mauritius", "Seychelles", "Comoros"], correctAnswer: "Seychelles" },
    ];
  }
};

export const generateRiddles = async (count) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate ${count} challenging IT or computer science-related riddles. The answer for each riddle should be a single word. The riddles should be clever and require some thought. Format the output as a JSON array of objects, with each object having a 'riddle' and an 'answer' property.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              riddle: { type: Type.STRING },
              answer: { type: Type.STRING },
            },
            required: ["riddle", "answer"],
          },
        },
      },
    });

    const parsedResponse = JSON.parse(response.text);
    return parsedResponse;
  } catch (error) {
    console.error("Error generating riddles:", error);
    // Provide fallback data in case of API error
    return [
        { riddle: "I have keys, but open no doors. I have a space, but no room. You can enter, but can't go outside. What am I?", answer: "Keyboard" },
        { riddle: "I am a network of networks, connecting millions of computers globally. What am I?", answer: "Internet" },
        { riddle: "I am the brain of the computer. What am I?", answer: "CPU" },
        { riddle: "I have no life, but I can die. I have no physical form, but I can get a virus. What am I?", answer: "File" },
        { riddle: "I am a type of memory that is volatile, meaning I lose my contents when the power is turned off. What am I?", answer: "RAM" },
        { riddle: "I am a small piece of code that can replicate itself and spread to other computers. What am I?", answer: "Virus" },
        { riddle: "I'm a language for creating web pages, but I'm not meant to be spoken. What am I?", answer: "HTML" },
        { riddle: "I'm a container for data that has a name and a value, used in almost every program. What am I?", answer: "Variable" },
        { riddle: "I'm an error in a program that causes it to behave unexpectedly. What am I?", answer: "Bug" },
        { riddle: "I protect a network by filtering incoming and outgoing traffic. What am I?", answer: "Firewall" },
    ];
  }
};

export const generateEmojiQuestions = async (count) => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Generate ${count} multiple-choice emoji puzzles. Each puzzle should consist of a sequence of emojis representing a common word, phrase, movie title, or object. For each puzzle, provide four options (one correct) and the correct answer as correctAnswer. Ensure the puzzles are clever, fun, and vary in difficulty. Format the output as a JSON array of objects, with each object having an 'emojis' string, an 'options' array, and a 'correctAnswer' string.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                emojis: { type: Type.STRING },
                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                correctAnswer: { type: Type.STRING },
              },
              required: ["emojis", "options", "correctAnswer"],
            },
          },
        },
      });
  
      const parsedResponse = JSON.parse(response.text);
      return parsedResponse;
    } catch (error) {
      console.error("Error generating emoji questions:", error);
      // Provide fallback data in case of API error
      return [
        { emojis: "🐍📚", options: ["Bookworm", "Snake Book", "Library Pet", "Worm Story"], correctAnswer: "Bookworm" },
        { emojis: "⭐🐟", options: ["Starfish", "Fish Star", "Lucky Fish", "Sea Star"], correctAnswer: "Starfish" },
        { emojis: "👻🎃🦇", options: ["Christmas", "Easter", "Thanksgiving", "Halloween"], correctAnswer: "Halloween" },
        { emojis: "🕷️👨", options: ["Batman", "Spiderman", "Iron Man", "Ant-Man"], correctAnswer: "Spiderman" },
        { emojis: "🔥🦊", options: ["Firefox", "Firewolf", "Red Panda", "Hot Dog"], correctAnswer: "Firefox" },
        { emojis: "🍎💻", options: ["Microsoft", "Apple", "Dell", "HP"], correctAnswer: "Apple" },
        { emojis: "⏰➡️🏃", options: ["Late", "Running out of time", "Fast Clock", "Jogging"], correctAnswer: "Running out of time" },
        { emojis: "👑🦁", options: ["The Lion King", "Jungle Book", "Zootopia", "Madagascar"], correctAnswer: "The Lion King" },
        { emojis: "🤔💡", options: ["Question", "Confused", "Bright Idea", "Thinking Cap"], correctAnswer: "Bright Idea" },
        { emojis: "🚗💨", options: ["Slow Car", "Traffic Jam", "Fast Car", "Car Wash"], correctAnswer: "Fast Car" },
      ];
    }
  };