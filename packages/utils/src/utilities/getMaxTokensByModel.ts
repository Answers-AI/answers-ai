const getMaxTokensByModel = (gptModel?: string) => {
  switch (gptModel) {
    case 'gpt-3.5-turbo':
      return 4000;
    case 'gpt-4':
      return 8192;
    case 'gpt-3.5-turbo-16k':
      return 16000;
    default:
      return 4000;
  }
};

export default getMaxTokensByModel;
