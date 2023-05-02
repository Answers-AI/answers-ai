import { render } from 'preact';
import App from './App';

const AnswersAI = {
  init: ({ iframeSrc, targetId }: { iframeSrc: string; targetId: string }) => {
    if (!iframeSrc) {
      console.log('The Answer Chat Widget: No iframeSrc provided');
      return;
    }

    const targetElement = document.getElementById(targetId);
    if (!targetElement) {
      console.log(`The Answer Chat Widget: No element found with id: ${targetId}`);
      return;
    }

    render(<App iframeSrc={iframeSrc} />, targetElement);
  }
};
// @ts-expect-error
window.AnswersAI = AnswersAI;
