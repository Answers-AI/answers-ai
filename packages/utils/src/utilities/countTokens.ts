const GPT3Tokenizer = require('gpt3-tokenizer').default;
const tokenizer = new GPT3Tokenizer({ type: 'gpt3' });
export const countTokens = async (text: string): Promise<number> => {
  const encoded = tokenizer.encode(text);
  const tokensInFile = encoded.bpe.length;
  return tokensInFile;
};
