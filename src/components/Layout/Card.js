import classes from './Card.module.css';

function Card({ children, size, padding }) {
  return (
    <div
      className={
        padding === 'p0' ? classes[`card-${size}__p0`] : classes[`card-${size}`]
      }
    >
      {children}
    </div>
  );
}

export default Card;
