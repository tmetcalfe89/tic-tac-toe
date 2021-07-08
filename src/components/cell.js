export default function Cell({ value, onClick, x, y, taken }) {
  return (
    <span
      className={`cell ${!taken && "hidden"}`}
      onClick={onClick}
      x={x}
      y={y}
    >
      {value}
    </span>
  );
}
