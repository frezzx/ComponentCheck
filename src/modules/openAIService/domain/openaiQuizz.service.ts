import { Injectable, Logger } from '@nestjs/common';
import { Mistral } from '@mistralai/mistralai';
import * as dotenv from 'dotenv';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

dotenv.config();

const apiKey = process.env.MISTRAL_API_KEY;
if (!apiKey) {
  throw new Error('MISTRAL_API_KEY não encontrada no .env');
}

const client = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY, 
});

@Injectable()
export class MistralAIService {
  private readonly mistral: Mistral;
  private readonly logger = new Logger(MistralAIService.name);

  constructor() {
    if (!process.env.MISTRAL_API_KEY) {
      throw new Error('MISTRAL_API_KEY não encontrada no .env');
    }

    this.mistral = new Mistral({
      apiKey: process.env.MISTRAL_API_KEY,
    });
  }

  async generateQuizQuestions(): Promise<QuizQuestion[]> {
    const contentPrompt = `
        Crie 1 pergunta de múltipla escolha sobre componentes eletrônicos no formato:

        {
          "question": "Texto da pergunta",
          "options": ["A", "B", "C", "D"],
          "correctAnswer": "Texto exato da alternativa correta"
        }
        Retorne apenas o JSON válido, sem markdown ou comentários.
            `;
    try {
      const chatResponse = await await client.chat.complete({
        model: 'mistral-large-latest',
        messages: [{ role: 'user', content: contentPrompt }],
        temperature: 0.7,
      });


      const content = chatResponse.choices?.[0]?.message?.content;
      if (!content) {
        throw new Error('Resposta da Mistral vazia ou malformada');
      }

      const questions = JSON.parse(content as any);

      if (!Array.isArray(questions)) {
        return [questions];
      }

      return questions;
    } catch (error: any) {
      this.logger.error('Erro ao gerar perguntas via Mistral AI');

      if (error.name === 'SyntaxError') {
        this.logger.error('Erro ao parsear JSON da resposta');
        this.logger.debug(`Conteúdo recebido: ${error.message}`);
        throw new Error('Formato de resposta inválido da Mistral AI');
      }

      if (error.status) {
        this.logger.error(`Status: ${error.status}`);
      }

      if (error.code) {
        this.logger.error(`Código: ${error.code}`);
      }

      if (error.message) {
        this.logger.error(`Mensagem: ${error.message}`);
      }

      if (error.name === 'APIConnectionTimeoutError') {
        this.logger.error('A requisição expirou. Tente novamente mais tarde.');
      }

      throw new Error('Falha ao gerar perguntas com Mistral AI');
    }
  }
}
