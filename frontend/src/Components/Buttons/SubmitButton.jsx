// buttons/SubmitButton.jsx
import { Button } from './Button';

export const SubmitButton = ({ width = "w-[50%]", margin = "mx-auto", children, ...props }) => (
<div className='text-center'>
<Button 
    type="submit" 
    className={`flex items-center justify-center gap-2 mt-4 mx-auto ${width} ${margin}`} 
    {...props}
  >
    {children}
  </Button>
</div>
);
