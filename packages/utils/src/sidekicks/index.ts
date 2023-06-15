import { Sidekick } from 'types';
import accountManager from "./accountManager";
import blog from "./blog";
import coding from "./coding";
import contentful from "./contentful";
import debugging from "./debugging";
import defaultPrompt from "./defaultPrompt";
import docs from "./docs";
import gptraw from "./gptraw";
import legal from "./legal";
import usecaseWritingExpert from "./usecaseWritingExpert";
import productmanager from "./productmanager";
import project from "./project";
import promptCreator from "./promptCreator";
import realtorListing from './realtorListing';
import refactor from "./refactor";
import research from "./research";
import sales from "./sales";
import support from "./support";
import teacher from "./teacher";
import salesOutboundEmail from "./salesOutboundEmail";

export const sidekicks: Sidekick[] = [
  accountManager,
  blog,
  coding,
  contentful,
  debugging,
  defaultPrompt,
  docs,
  gptraw,
  legal,
  usecaseWritingExpert,
  productmanager,
  project,
  promptCreator,
  realtorListing,
  refactor,
  research,
  sales,
  support,
  teacher,
  salesOutboundEmail,
  // Add more prompts here
];
