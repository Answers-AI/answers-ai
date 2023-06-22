import { Sidekick } from 'types';
const marketing: Sidekick = {
  departments: ['marketing'],
  label: 'Landing Page Creator',
  value: 'landingPageCreator',
  placeholder: 'I can help you create a landing page for your product',
  getSystemPromptTemplate: () => {
    return `You are an digital marketing and English writing expert.
    You assist people to create landing pages for their websites.
    `;
  },
  getUserPromptTemplate: (query, context) => {
    return `
    You will be creative and write a landing page that is easy to understand for a non-technical audience.
    
    The landing page topic: ${query}

    Use this context for the landing page:
    ###
    ${context}
    ###

    You will write about these topics in a way that is easy to understand for a non-technical audience.
    You will create 5 sections for the landing page:
    - Strong hero image and supporting imagery.
    - Focused call to action without distracting links.
    - Unique value proposition in the header and subheader.
    - Tangible benefits emphasized, supported by features.
    - Social proof through testimonials, reviews, or partner logos.

    Only the hero must be at the top. The other 4 sections can be in any order. Be creative in the way you write the landing page.
    I want you to suggest image concepts for all images.
    
    you have the following design components available:
    - Hero with featured image, title, subtitle, and call to action as well as background image.
    - Logo Carousel
    - Testimonial Carousel
    - Feature List
    - Feature Grid
    - Half Media, Half Text
    - Full Width Media
    - Full Width Text
    - Video Background
    - Image Background

    use the following brand identity to assist the user in writing the use case:
  
    **Brand Tone and Voice:**
    Our brand tone is warm, approachable, and intelligent, mirroring the helpfulness of a friendly assistant. We aim to inspire and enable, underpinning our messages with an undercurrent of optimism and forward-thinking. 
    Our voice communicates clearly and confidently, without unnecessary jargon. We strive to make complex AI concepts accessible and relatable to our audience, fostering trust, and demonstrating our commitment to transparency.
    
    Example:
    # Hero:
    Title: AnswerAI
    Subtitle: The AI assistant that helps you write better
    Call to action: Get started
    Background image: A friedly Robot that is writing on a laptop

    # Logo Carousel:
    Logo 1: AnswerAI
    Logo 2: AnswerAI
    Logo 3: AnswerAI
    Logo 4: AnswerAI

    # Testimonial Carousel:
    Testimonial 1: AnswerAI is the best
    Testimonial 2: AnswerAI is the best
    Testimonial 3: AnswerAI is the best

    # Feature List:
    Feature 1: Marketing Use Cases
    Feature 2: Sales Use Cases
    Feature 3: Customer Support Use Cases

    # Half Media, Half Text:
    Image: A friedly Robot that is writing on a laptop
    Title: AnswerAI is the best
    Subtitle: AnswerAI is the best
    Call to action: Get started

    `;
  },
  contextStringRender: (context) => {
    return `filePath: ${context.filePath}\n${context.text}\n\n`;
  }
};

export default marketing;
