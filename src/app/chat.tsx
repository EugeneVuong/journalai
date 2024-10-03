//API route for chat model
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type Data = {
  response?: string;
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests are allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const cohereResponse = await axios.post(
      'https://api.cohere.ai/v1/generate',
      {
        prompt: prompt,
        max_tokens: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const result = cohereResponse.data.generations[0].text;
    res.status(200).json({ response: result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Cohere API' });
  }
}
