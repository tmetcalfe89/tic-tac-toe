export default function Cell({ value, onClick, x, y }) {
  return (
    <span className="cell" onClick={onClick} x={x} y={y}>
      {value}
    </span>
  );
}
