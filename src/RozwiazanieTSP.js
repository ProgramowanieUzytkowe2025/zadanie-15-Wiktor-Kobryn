import { useState, useEffect } from 'react';

export default function RozwiazanieTSP({ punkty }) {
    const [kolejnosc, setKolejnosc] = useState([]);
    const [dlugosc, setDlugosc] = useState(0.0);

    // wczytywanie punktów i losowanie kolejności
    useEffect(() => {
        if (!punkty || punkty.length === 0) return;
        // losowa kolejność
        const shuffled = [...punkty].sort(() => Math.random() - 0.5);
        setKolejnosc(shuffled);

        let total = 0;
        for (let i = 0; i < shuffled.length; i++) {
            const a = shuffled[i];
            const b = shuffled[(i + 1) % shuffled.length];

            // obliczanie odległości euklidesowa
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            total += Math.sqrt(dx * dx + dy * dy);
        }
        setDlugosc(total);
    }, [punkty]);

    if (!punkty || punkty.length === 0) return null;

    return (
        <div>
            <h3>Rozwiązanie</h3>
            <label>kolejność losowana (wstępna)</label>
            <p>
                {kolejnosc.map((p, i) => (i === kolejnosc.length - 1 ? p.id : `${p.id} -> `))}
            </p>
            <label>Długość do pokonania przechodząc punkty w takiej kolejności: {dlugosc.toFixed(2)} (odległość euklidesowa)</label>
        </div>
    );
}
