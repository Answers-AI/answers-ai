import Handlebars from 'handlebars';
const { precompile, compile } = Handlebars;

// Register the helper function
Handlebars.registerHelper('helperMissing', function () {
  return '';
});

export function precompileTemplate(templateString) {
  return precompile(templateString);
}

export function getTemplate(precompiled) {
  return Handlebars.template(eval('(' + precompiled + ')'));
}

export function renderContext(templateString, context) {
  // console.log(JSON.stringify(context, null, 2));
  const template = Handlebars.compile(templateString);
  const renderedTemplate = template(context);
  return renderedTemplate;
}
