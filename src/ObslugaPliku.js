import { useRef } from 'react';

export default function ObslugaPliku({ onDataLoaded }) {
    const plikDanych = useRef(null);

    const onButtonClick = () => {
        plikDanych.current.click();
    };

    const zmianaPliku = (e) => {
        const plik = e.target.files[0];
        if (!plik) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const tekst = event.target.result;
            const punkty = parsujPunkty(tekst);
            onDataLoaded(punkty);
        };
        reader.readAsText(plik);
    };

    const parsujPunkty = (text) => {
        return text
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0 && /^\d+/.test(line))
            .map(line => {
                const separator = line.includes(',') ? ',' : /\s+/;
                const [id, x, y] = line.split(separator);
                return { id: Number(id), x: Number(x), y: Number(y)};
            })
            .filter(p => !isNaN(p.x) && !isNaN(p.y));
    };

    return (
        <div>
            <h3>Obsługa Pliku</h3>
            <input type="file" ref={plikDanych} accept=".txt,.csv" style={{ display: 'none' }} onChange={zmianaPliku}/>
            <button onClick={onButtonClick}>Wczytaj plik</button>
        </div>
    );
}