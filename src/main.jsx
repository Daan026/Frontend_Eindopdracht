import React from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import ScrollToTop from '../../untitled9/src/Components/ScrollToTop/ScrollToTop.jsx'
import './index.css'
import App from '../App.jsx'

// Zet scroll restoration uit
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
}

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <ScrollToTop/>
            <App/>
        </BrowserRouter>
    </React.StrictMode>,
)
