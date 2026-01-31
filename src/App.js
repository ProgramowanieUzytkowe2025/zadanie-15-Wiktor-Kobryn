import './App.css';
import { useState } from 'react';
import ObslugaPliku from './ObslugaPliku';
import WizualizacjaKomiwojazer from './WizualizacjaKomiwojazer';
import RozwiazanieTSP from './RozwiazanieTSP';

export default function App() {
    const [punkty, setPunkty] = useState([]);

    return (
        <div>
            <ObslugaPliku onDataLoaded={setPunkty} />
            <WizualizacjaKomiwojazer punkty={punkty} />
            <RozwiazanieTSP punkty={punkty} />
        </div>
    );
}
