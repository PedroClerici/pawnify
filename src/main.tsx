import { render } from 'preact';
import { App } from './App.tsx';
import './index.css';
// import 'uno.css';
import 'virtual:uno.css';

render(<App />, document.getElementById('app') as HTMLElement);
