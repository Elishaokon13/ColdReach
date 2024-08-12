import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `Write me a detailed table of contents for a blog post with the title below.

Title:`;

const generateAction = async (req, res) => {
  try {
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`);

    const baseCompletion = await openai.createCompletion({
      model: "text-davinci-004",
      prompt: `${basePromptPrefix}${req.body.userInput}`,
      temperature: 0.8,
      max_tokens: 1774,
    });

    const basePromptOutput = baseCompletion.data.choices && baseCompletion.data.choices[0] ? baseCompletion.data.choices[0].text : "";

    // I build Prompt #2.
    const secondPrompt = `Take the table of contents and title of the blog post below and generate a blog post written in the style of Paul Graham. Make it feel like a story. Don't just list the points. Go deep into each one. Explain why.

    Title: ${req.body.userInput}

    Table of Contents: ${basePromptOutput}

    Blog Post:`;

    // I call the OpenAI API a second time with Prompt #2
    const secondPromptCompletion = await openai.createCompletion({
      model: "text-davinci-004",
      prompt: secondPrompt,
      // I set a higher temperature for this one.
      temperature: 0.85,
      max_tokens: 2500,
    });

    // Get the output
    const secondPromptOutput = secondPromptCompletion.data.choices && secondPromptCompletion.data.choices[0] ? secondPromptCompletion.data.choices[0].text : "";

    // Send over the Prompt #2's output instead of Prompt #1's.
    res.status(200).json({ output: secondPromptOutput });

  } catch (error) {
    console.error("Error generating blog post:", error);
    res.status(500).json({ error: "An error occurred while generating the blog post." });
  }
};

export default generateAction;
