import React from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from './HomePage';

export default function App() {
    return (
        <main>
            <HomePage />
        </main>
    );
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);