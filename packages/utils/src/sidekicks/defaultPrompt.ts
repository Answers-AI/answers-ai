import { Sidekick } from 'types';
const defaultPrompt: Sidekick = {
  departments: [
    'marketing',
    'sales',
    'customer support',
    'engineering',
    'product management',
    'legal',
    'hr',
    'education',
    'real estate',
    'administrative',
    'leadership'
  ],
  label: 'General Assistant',
  value: 'defaultPrompt',
  placeholder: 'I can help with general questions. Add data sources to help me understand more.',
  getSystemPromptTemplate: () => {
    return `You are a helpful and friendly assistant.You specialize in helping people ask better questions`;
  },
  getUserPromptTemplate: (query, context) => {
    return `
    Use following context to help with the users request:\n\n
    ###
    ${context}
    ###
    User Request:\n\n"${query}".\n\n

    You also have access to AI Sidekicks that can help you with the users request.
    ###
    List of Sidekicks:
    Account Manager Expert - I can answer questions about accounts 
    Blog Critic - I can give suggestions on how to make blog posts better
    Coding Expert - I can create code for you
    Contentful Expert - I can help you with Contentful
    Debugging Expert - I can debug code for you
    General Assistant - I can help with general questions
    Docs Creation - I can create documentation for you
    ChatGPT - I am just like ChatGPT
    Legal Expert - You are a legal assistant.
    Usecase Writing Expert - I can write great marketing use cases
    Product Manager - I will document the product and its features
    Project Manager Expert - you are a Jira project manager expert 
    Prompt Assistant - I can help you craft the perfect prompt
    Realtor Listing - I can make amazing realestate listings for you
    Refactoring Expert - I can create refactor code for you
    Research Assistant - I can help you research topics and provide insights
    Sales Proposal Expert - I can create sales proposals for you based on client requirements
    Customer Support - I can help with support issues
    Teacher - I will explain things easily and step by step 
    Outbound Email Creator - I can create outbound emails for you based on client requirements
    Meeting Analysis & Reply Expert - You can analyze a meeting transcript and create a reply email for a customer.
    Investor Outbound Email Expert - I can create outbound emails targeted towards venture capitalists and investors.
    Week Planner - I can help plan and prioritze your week
    Outbound Email Critic - I can make your outbound emails better
    Email Subject Brainstormer - I can brainstorm email subjects for you
    Contentful Entry Expert - I can help you post a blog in Contentful
    Root Cause Analysis - I can help you get to the root cause of a problem and help develop a plan
    API Docs Assistant - I can help you craft API docs
    QA Assistant - I can help you write tests for your code and check for bugs
    Blog Outline Expert - I can help you develop a great blog outline
    PRFAQ Creator - I can help you create a PRFAQ
    Image Prompt Creator - you are a Jira project manager expert 
    Image Concept Creator - I help you brainstorm concepts for images
    Decision Making - I can help you think through a decision and help look at a decision form all angels.
    Tiktok Script Writer - I can help you write a script for a tiktok video
    ###

    If another sidekick can help with the users request, then recommend them and in what order to use them.
    
    `;
  },
  contextStringRender: (context) => {
    return `source: ${context?.filePath || context?.url}\n${context.text}\n\n`;
  }
};

export default defaultPrompt;
