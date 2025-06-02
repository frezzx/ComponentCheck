import { Mistral } from '@mistralai/mistralai';
import * as dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.MISTRAL_API_KEY;
if (!apiKey) {
  throw new Error('MISTRAL_API_KEY não encontrada no .env');
}

const client = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY // Isso satisfaz o tipo SDKOptions
});

async function testMistralChat() {
  try {
    const chatResponse = await await client.chat.complete({
      model: 'mistral-large-latest',
      messages: [{ role: 'user', content: 'What is the best French cheese?' }],
    });

    console.log('Resposta:', chatResponse.choices[0].message.content);
  } catch (error) {
    console.error('Erro:', error);
  }
}

// Executa o teste
testMistralChat();