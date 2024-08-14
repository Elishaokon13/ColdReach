import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateAction = async (req, res) => {
  const baseCompletion = await openai.createCompletion({
    model: "gpt-4o-mini",
    prompt: `Write a cold message t the erson for the specified reason below. Make sure the message is tailored towards the person's experience & skillset. \nPerson: ${req.body.personInput} \nReason: ${req.body.reasonInput}. `,
    temperature: 0.7,
    max_tokens: 504,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;

// prompt: `Write a blog post to explain the importance of investment. Reason: ${req.body.reasonInput}. Person: ${req.body.personInput}`;
