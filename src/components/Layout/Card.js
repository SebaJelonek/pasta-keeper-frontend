import classes from './Card.module.css';

function Card({ children, size }) {
  return <div className={classes[`card-${size}`]}>{children}</div>;
}

export default Card;
