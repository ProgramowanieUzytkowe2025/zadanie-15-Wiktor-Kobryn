export default function WizualizacjaKomiwojazer({ punkty }) {
    if (!punkty || punkty.length === 0) return null;

    const szerokosc = 600;
    const wysokosc = 600;
    const padding = 30;
    const ticks = 5;

    const xs = punkty.map(p => p.x);
    const ys = punkty.map(p => p.y);

    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    const scaleX = (szerokosc - 2 * padding) / (maxX - minX);
    const scaleY = (wysokosc - 2 * padding) / (maxY - minY);
    const scale = Math.min(scaleX, scaleY);

    const dataWidth = (maxX - minX) * scale;
    const dataHeight = (maxY - minY) * scale;

    const offsetX = (szerokosc - 2 * padding - dataWidth) / 2;
    const offsetY = (wysokosc - 2 * padding - dataHeight) / 2;

    const mapX = x => padding + offsetX + (x - minX) * scale;
    const mapY = y => wysokosc - padding - offsetY - (y - minY) * scale;

    return (
        <div>
            <h3>Wizualizacja problemu</h3>
            <svg width={szerokosc} height={wysokosc} style={{ border: '1px solid black' }}>
                <line x1={padding + offsetX} y1={padding + offsetY} x2={padding + offsetX} y2={wysokosc - padding - offsetY} stroke="black" />
                <line x1={padding + offsetX} y1={wysokosc - padding - offsetY} x2={szerokosc - padding - offsetX} y2={wysokosc - padding - offsetY} stroke="black" />

                {Array.from({ length: ticks + 1 }).map((_, i) => {
                    const value = minX + (i / ticks) * (maxX - minX);
                    const x = mapX(value);
                    return (
                        <g key={`x-${i}`}>
                            <line x1={x} y1={wysokosc - padding - offsetY} x2={x} y2={wysokosc - padding - offsetY + 5} stroke="black" />
                            <text x={x} y={wysokosc - padding - offsetY + 15} fontSize="10" textAnchor="middle">{value.toFixed(0)}</text>
                        </g>
                    );
                })}

                {Array.from({ length: ticks + 1 }).map((_, i) => {
                    const value = maxY - (i / ticks) * (maxY - minY);
                    const y = mapY(value);
                    return (
                        <g key={`y-${i}`}>
                            <line x1={padding + offsetX - 5} y1={y} x2={padding + offsetX} y2={y} stroke="black" />
                            <text x={padding + offsetX - 8} y={y + 3} fontSize="10" textAnchor="end">{value.toFixed(0)}</text>
                        </g>
                    );
                })}

                {punkty.map(p => (
                    <g key={p.id}>
                        <circle cx={mapX(p.x)} cy={mapY(p.y)} r={4} fill="blue" />
                        <text x={mapX(p.x) + 6} y={mapY(p.y) - 6} fontSize="10"> {p.id}</text>
                    </g>
                ))}
            </svg>
        </div>
    );
}
