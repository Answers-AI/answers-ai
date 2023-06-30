import * as fs from 'fs';
import * as cheerio from 'cheerio';
import * as cssParser from 'css';
import * as collections from 'typescript-collections';

// Constants
const DEBUG = 0;
const MIN_SPAN_SIZE = 8; // remove spans less than this width (in px)
const MAX_LINE_HEIGHT = 18; // lines over this height indicate new paragraphs
const TABLES = 1; // reconstruct tables
// remove styles when done to show off the naked semantic HTML
// and get ready for custom CSS, also removes paging data attributes
const STRIP_CSS = 1;
const BR = 1; // place break rules at original line endings
const REMOVE_HEADERS = 1;
const BULLETS = ['•', '○', '■']; // list item bullets
const REMOVE_BEFORE: RegExp[] = [
  /<span class="_ _[a-f0-9]{1,2}"><\/span>/g, // empty spans
  /<script.*?<\/script>/gs, // scripts
  /<link.*?\.css"\/>/g, // css file links
  /<meta (name|http-equiv).*?>/g, // meta tags
  /<!--.*?-->/g, // html comments
  /<img alt="" src="pdf2htmlEX-64x64.png"\/>/g,
  /<a class=".*?<\/a>/g
];
const REMOVE_AFTER: string[] = [
  '<table></table>',
  '<title></title>',
  '<span>',
  '</span>',
  '<div>',
  '</div>'
];
const REPLACE_AFTER: string[] = [];
const HTML_DIR = './';
const ENCODING = 'UTF-8';

// Global variables
let REMOVE_BEFORE_REGEXP: RegExp[] = [...REMOVE_BEFORE];
let REPLACE_AFTER_STRING: string[] = [...REPLACE_AFTER];
let BULLETS_GLOBAL: string[] = [...BULLETS];
let HTML_DIR_GLOBAL: string = HTML_DIR;

// import custom configuration
try {
  const config = require('./config');
  REMOVE_BEFORE_REGEXP = [...REMOVE_BEFORE_REGEXP, ...config.REMOVE_BEFORE];
  REPLACE_AFTER_STRING = [...REPLACE_AFTER_STRING, ...config.REPLACE_AFTER];
  BULLETS_GLOBAL = [...BULLETS_GLOBAL, ...config.BULLETS];
  HTML_DIR_GLOBAL = config.HTML_DIR;
} catch (e) {
  console.log('config.js not found. Using default configuration.');
}

// More constants
// pdf2htmlEX convention for CSS class names and corresponding properties
const CSS_CLASS_MAP: { [key: string]: string } = {
  _: 'display:.*?',
  m: 'transform',
  w: 'width',
  h: 'height',
  x: 'left',
  y: 'bottom',
  ff: 'font-family',
  fs: 'font-size',
  fc: 'color',
  sc: 'text-shadow',
  ls: 'letter-spacing',
  ws: 'word-spacing'
};

// Function to remove an element from the cheerio object
function removeElement($: cheerio.Root, el: cheerio.Element) {
  $(el).remove();
}

// Function to get the value of a CSS property from a string of CSS
function getCssProp(prop: string, css: string): string {
  let regex = new RegExp(prop + ': (.*?);');
  let match = regex.exec(css);
  return match ? match[1] : '';
}

// Function to create a CSS rule
function createCssRule(selector: string, properties: string[]): string {
  return `${selector} { ${properties.join('; ')} }`;
}

// Function to parse CSS
function parseCss(css: string, classMap: any): any {
  let cssObj = cssParser.parse(css).stylesheet.rules;
  let newRules: any[] = [];

  for (let rule of cssObj) {
    let selectors = rule.selectors;
    let properties = rule.declarations;

    for (let selector of selectors) {
      let newProps: string[] = [];
      let className = selector.split('.')[1];

      for (let prop of properties) {
        let newProp = classMap[className] + ': ' + prop.value;
        newProps.push(newProp);
      }

      let newRule = createCssRule(selector, newProps);
      newRules.push(newRule);
    }
  }

  return newRules.join('\n');
}

// Function to get the height of an element
function getHeight($: cheerio.Root, el: cheerio.Element): number {
  let css = $(el).attr('style') || '';
  return parseFloat(getCssProp('height', css)) || 0;
}

// Function to get the bottom of an element
function getBottom($: cheerio.Root, el: cheerio.Element): number {
  let css = $(el).attr('style') || '';
  return parseFloat(getCssProp('bottom', css)) || 0;
}

// Function to compare the bottom of two elements
function compareBottom(a: cheerio.Element, b: cheerio.Element): number {
  let bottomA = getBottom($, a);
  let bottomB = getBottom($, b);
  return bottomB - bottomA;
}

// Function to compare the height of two elements
function compareHeight(a: cheerio.Element, b: cheerio.Element): number {
  let heightA = getHeight($, a);
  let heightB = getHeight($, b);
  return heightB - heightA;
}

// The main function that performs the HTML modifications
const semantifyHtml = (html: string): string => {
  let $ = cheerio.load(html);

  // First, clean up the HTML by removing unnecessary elements and comments
  for (let remove of REMOVE_BEFORE) {
    $.root().html($.root().html().replace(remove, ''));
  }

  // Then, parse the CSS and replace the class names with the corresponding CSS properties
  $('style').each((i, el) => {
    let css = $(el).html() || '';
    let newCss = parseCss(css, CSS_CLASS_MAP);
    $(el).html(newCss);
  });

  // After that, fix the layout of the HTML elements
  // This is a simplified version of the Python code that does not handle nested elements, tables, etc.

  $('div').each((i, el) => {
    let height = getHeight($, el);

    if (height < MIN_SPAN_SIZE) {
      removeElement($, el);
    } else {
      $(el).children().sort(compareBottom).appendTo($(el));
    }
  });

  // Finally, return the modified HTML as a string
  return $.html();
};

export default semantifyHtml;

// Main body of code
// TODO: Need to convert functions here
