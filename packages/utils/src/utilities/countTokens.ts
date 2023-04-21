// import { TokenTextSplitter } from 'langchain/text_splitter';
import { CharacterTextSplitter } from 'langchain/text_splitter';
// an exported function that will accept a string and return the number of tokens in that string
export const countTokens = (text: string): number => {
  return text.split(' ').length;
};
