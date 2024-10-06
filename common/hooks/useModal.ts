import useConditionalModal from './useConditionalModal';
import Modal from '@/common/components/Modal/Modal';

//Add Props Modal if you add a new modal

/**
 * Returns a stateful Modal component and functions to update it.
 * @param {boolean} initialState init component on a visible state.
 * @returns Modal Component and methods to show and hide it.
 */

const useModal = (
  initialState: boolean = false,
  CustomModal: any = Modal as any
) => {
  const { StatefulComponent, hideComponent, showComponent, show } =
    useConditionalModal(initialState, CustomModal);

  return {
    Modal: StatefulComponent,
    showModal: showComponent,
    hideModal: hideComponent,
    show,
  };
};

export default useModal;
