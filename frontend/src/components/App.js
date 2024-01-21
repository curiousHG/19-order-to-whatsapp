import React, {Component} from 'react';
import {render} from 'react-dom';
import HomePage from './HomePage';

export default function App() {
    return (
        <main>
            <HomePage />
        </main>
    );
}

const appDiv = document.getElementById('app');
render(<App/>, appDiv);