const natural = require("natural");
const tokenizer = new natural.WordTokenizer();
const OpenAI = require("../../openai/openai");
const Vector = require("../../utilities/vector");

const embeddingJoinSeparator = " ";

class JiraObject {
  constructor(object) {
    this.object = object;
  }

  getContext() {
    return this.createContextFromObject(this.object);
  }

  getTokenCount() {
    return tokenizer.tokenize(this.context);
  }

  createContextFromObject(obj) {
    const trimValues = ["", undefined, null, "indeterminate"];
    let context = Object.entries(obj)
      .filter(
        ([, value]) => !trimValues.includes(value) && typeof value !== "object"
      )
      .map(
        ([key, value]) =>
          `${key.replace(/([A-Z_])/g, " $1").toUpperCase()}: ${value}`
      )
      .join(embeddingJoinSeparator);

    return context;
  }

  static jiraAdfToMarkdown(node) {
    if (!node) return "";

    if (node.type === "doc") {
      return node.content
        .map((item) => `${JiraObject.jiraAdfToMarkdown(item)}`)
        .join("");
    } else if (node.type === "text") {
      return node.text;
    } else if (node.type === "hardBreak") {
      return "\n";
    } else if (node.type === "mention") {
      return `@${node.attrs.username}`;
    } else if (node.type === "emoji") {
      return ""; //`:${node.attrs.shortName}:`;
    } else if (node.type === "link") {
      return `[${node.text}](${node.attrs.url})`;
    } else if (node.type === "mediaGroup") {
      return node.content.map(JiraObject.jiraAdfToMarkdown).join("");
    } else if (node.type === "paragraph") {
      return `${node.content.map(JiraObject.jiraAdfToMarkdown).join("")}\n`;
    } else if (node.type === "bulletList") {
      return node.content
        .map((item) => `${JiraObject.jiraAdfToMarkdown(item)}`)
        .join("");
    } else if (node.type === "listItem") {
      return node.content
        .map((item) => `- ${JiraObject.jiraAdfToMarkdown(item)}`)
        .join("");
    } else if (node.type === "orderedList") {
      return node.content
        .map(
          (item, index) => `${index + 1}. ${JiraObject.jiraAdfToMarkdown(item)}`
        )
        .join("");
    } else if (node.type === "heading") {
      return `\n${"#".repeat(node.attrs.level)} ${node.content
        .map(JiraObject.jiraAdfToMarkdown)
        .join("")}\n`;
    } else if (node.type === "codeBlock") {
      return `\`\`\`\n${node.text}\n\`\`\`\n`;
    } else if (node.type === "blockquote") {
      return `> ${node.content.map(JiraObject.jiraAdfToMarkdown).join("")}\n`;
    } else {
      return "";
    }
  }

  async prepareForEmbedding() {
    this.context = await this.getContext();
    this.tokens = await this.getTokenCount();
    this.embedding = await this.createEmbedding();
    this.vector = this.createVector();
    return this.vector;
  }

  async createEmbedding() {
    const openAi = new OpenAI();
    const embedding = await openAi.createEmbedding(this.context);
    return embedding;
  }

  createVector() {
    const objectType = this.object.objectType.replace(/\s/g, "").toLowerCase();
    const uid = this.object.uid;
    const id = `${objectType}_${uid}`;
    const vector = new Vector(id, this.object, this.embedding);

    return vector;
  }
}

module.exports = JiraObject;
