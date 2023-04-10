import { render } from 'preact';
import App from './App';

const targetElement = document.createElement('div');
document.currentScript.parentNode.insertBefore(targetElement, document.currentScript.nextSibling);

render(<App />, targetElement);
