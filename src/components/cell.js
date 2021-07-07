export default function Cell({ value, onClick, key, x, y }) {
  return (
    <span className="cell" onClick={onClick} key={key} x={x} y={y}>
      {value}
    </span>
  );
}
