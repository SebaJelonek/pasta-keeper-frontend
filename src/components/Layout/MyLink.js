import { useContext } from 'react';
import AuthContext from '../store/auth-context';

function MyLink({ children, className }) {
  const ctx = useContext(AuthContext);

  return (
    <div onClick={ctx.logoutHandler} className={className}>
      {children}
    </div>
  );
}

export default MyLink;
