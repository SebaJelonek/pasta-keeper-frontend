import classes from './Disabled.module.css';

function Disabled({ reason }) {
  return (
    <div className={classes.centered}>
      <h1>This page is disabled</h1>
      <h2>{reason}</h2>
    </div>
  );
}

export default Disabled;
