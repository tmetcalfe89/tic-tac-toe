export default function Cell({ cell, onClick }) {
  return (
    <span
      className={`cell ${!cell.taken && "hidden"}`}
      onClick={onClick}
      x={cell.x}
      y={cell.y}
    >
      {cell.value}
    </span>
  );
}
