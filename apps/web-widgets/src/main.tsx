import { render } from 'preact';
import App from './App';

const AnswersAI = {
  init: ({ iframeSrc }: { iframeSrc: string }) => {
    if (!iframeSrc) {
      console.log('No iframeSrc provided');
      return;
    }
    const targetElement = document.createElement('div');
    document.currentScript.parentNode.insertBefore(
      targetElement,
      document.currentScript.nextSibling
    );

    render(<App iframeSrc={iframeSrc} />, targetElement);
  }
};
// @ts-expect-error
window.AnswersAI = AnswersAI;
