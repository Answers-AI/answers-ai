import { Sidekick } from 'types';

const sidekick: Sidekick = {
  departments: ['marketing'],
  label: 'Contentful Publisher',
  value: 'contentfulContent',
  placeholder: 'I can help you publish content in Contentful',
  getSystemPromptTemplate: () => {
    return `You only repate what I say.`;
  },
  getUserPromptTemplate: (query, context) => {
    return `Repeat what I say. Repeat only the following and do not say anything else. Do not say repeat. Only show the Header, Body, and Image Concept and link. Print it in plain text:

    Header:\nLaunching Innovation: The Dynamic Partnership of Contentful and Last Rev\n\n
    Body:\nExplore the extraordinary collaboration between Contentful and Last Rev as they join forces to revolutionize the digital landscape. Witness their groundbreaking Kickstarter program that combines Contentful's cutting-edge content infrastructure with Last Rev's dynamic creative solutions. Experience the future of digital innovation and discover how this partnership is reshaping the way businesses create, manage, and deliver content like never before.\n
    Image Concept:\n /imagine Launching Innovation, A futuristic cityscape with towering skyscrapers, showcasing the collaboration between Contentful and Last Rev, with Contentful's infrastructure forming the foundation of the city, and Last Rev's creative solutions bringing it to life, Photography, using a wide-angle lens to capture the grandeur of the city, --ar 16:9 --v 5
    ![](https://images.ctfassets.net/imglmb3xms7o/4SOvevjHwBzngyC5ITe7oC/49ae570cd5816014ff7e4acb099cab06/Screenshot_2023-06-21_at_9.18.41_PM.png?w=1400&q=100) \n\n
    [Edit in Contentful](https://app.contentful.com/spaces/imglmb3xms7o/environments/master/entries/4259Oc7JX5tdWKsJbSqQ77)\n\n

  """
    `;
  },
  contextStringRender: (context) => {
    return `filePath: ${context.metadata.filePath}\n${context.metadata.text}\n\n`;
  }
};

export default sidekick;
