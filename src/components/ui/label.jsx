import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva } from 'class-variance-authority';

import { cn } from '../../lib/utils';
import PropTypes from 'prop-types';

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
);

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

Label.propTypes = {
  className: PropTypes.string,
  // Include other prop types that LabelPrimitive.Root accepts, if they're used.
  // For example, if you pass 'for' prop to associate the label with an input:
  htmlFor: PropTypes.string,
};

export { Label };
