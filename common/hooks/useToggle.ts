import { useState } from 'react';

const useToggle = (initialState: boolean = false) => {
  const [show, setShow] = useState(initialState);

  const showComponent = () => {
    setShow(true);
  };

  const hideComponent = () => {
    setShow(false);
  };

  return {
    show,
    showComponent,
    hideComponent,
  };
};

export default useToggle;
