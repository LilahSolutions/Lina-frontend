import React, { useCallback } from 'react';
import useToggle from './useToggle';

type ConditionalComponent<P> = [
  Component: (props: P) => React.JSX.Element | null,
  toggleShow: () => void,
  showComponent: () => void,
  hideComponent: () => void
];

export interface ConditionalComponentProps {
  show?: boolean;
  shallow?: boolean;
  handleCancel: (_e: React.MouseEvent | React.ChangeEvent) => void;
  handleContinue?: (_e: React.MouseEvent | React.ChangeEvent) => void;
}

/**
 * Returns a conditional rendered Component and functions to show and hide it.
 * It controls if the component is shown or not.
 * @param initialState - init component on a visible state.
 * @param Component - Component to be rendered.
 * @returns Conditional Component and methods to show and hide it.
 */
function useConditionalComponent<P extends ConditionalComponentProps>(
  initialState: boolean = false,
  Component: React.FC<P>
): ConditionalComponent<P> {
  const [show, toggleShow, showComponent, hideComponent] =
    useToggle(initialState);

  /** Returns a conditional rendered Component.
   * @param {boolean} shallow If shallow is true, the component will be mounted but conditional render is delegated to the component itself. */
  const StatefulComponent = useCallback(
    (props: P) => {
      const handleCancel = (e: React.MouseEvent | React.ChangeEvent) => {
        if (props.handleCancel) props.handleCancel(e);
        hideComponent();
      };

      const handleContinue = (e: React.MouseEvent | React.ChangeEvent) => {
        if (props.handleContinue) props.handleContinue(e);
        hideComponent();
      };

      return props.shallow || show ? (
        <Component
          {...props}
          show={show}
          handleContinue={handleContinue}
          handleCancel={handleCancel}
        />
      ) : null;
    },
    [show, hideComponent, Component]
  );

  return [StatefulComponent, toggleShow, showComponent, hideComponent];
}

export default useConditionalComponent;
