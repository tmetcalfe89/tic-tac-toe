import PropTypes from "prop-types";

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

Cell.propTypes = {
  cell: PropTypes.shape({
    taken: PropTypes.bool,
    x: PropTypes.number,
    y: PropTypes.number,
    value: PropTypes.string,
  }),
  onClick: PropTypes.func,
};
