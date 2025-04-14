// buttons/NavigationButton.jsx
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';

export const NavigationButton = ({ 
  to, 
  replace = false, 
  ...rest 
}) => {
  const navigate = useNavigate();

  return (
    <Button
      {...rest}
      onClick={() => navigate(to, { replace })}
      role="link"
    />
  );
};