import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { usePopper } from 'react-popper';
import { useDispatch } from 'react-redux';
import { ReactComponent as TableRowKebabIcon } from '../../../../assets/images/svg/table-row-kebab-icon.svg';
import {
	openIsRemoveAllPoliciesModalOpen,
	openIsUpdateTaskModalOpen,
} from '../../slice';

export default function RowMenu({ rowData }) {
	const [referenceElement, setReferenceElement] = useState(null);
	const [popperElement, setPopperElement] = useState(null);
	const { styles, attributes } = usePopper(referenceElement, popperElement, {
		placement: 'bottom-end',
		modifiers: [
			{
				name: 'offset',
				options: {
					offset: [16, 8],
				},
			},
		],
	});

	const dispatch = useDispatch();

	const handleEditUserDetails = () => {
		dispatch(openIsUpdateTaskModalOpen(rowData));
	};

	const handleDeactivateUser = () => {
		dispatch(openIsRemoveAllPoliciesModalOpen(rowData));
	};

	return (
		<Menu as="div" className="relative flex">
			<Menu.Button
				className="flex w-full justify-center focus:outline-none"
				ref={(ref) => setReferenceElement(ref)}
			>
				<TableRowKebabIcon className="text-[#5048ED]" />
			</Menu.Button>
			<Transition
				as={Fragment}
				// @ts-ignore
				ref={(ref) => setPopperElement(ref)}
				style={styles['popper']}
				{...attributes['popper']}
			>
				<Menu.Items className="absolute right-0 top-[30px] w-[186px] origin-top-right rounded-[4px] bg-white shadow-table-menu focus:outline-none">
					<div className="p-[4px]">
						<Menu.Item>
							{({ active }) => (
								<button
									data-cy="update_task_button"
									type="button"
									className="flex w-full"
									onClick={handleEditUserDetails}
								>
									<div
										className={`${
											active ? 'bg-[#F0F3F4]' : ''
										} flex w-full flex-col rounded-[2px] px-[12px] py-[8px]`}
									>
										<span className="text-start font-lato text-[14px] font-bold leading-[20px] tracking-[0.2px] text-[#212429]">
											Update Task
										</span>
										<span className="text-start font-lato text-[12px] leading-[16px] tracking-[0.2px] text-[#6C747D]">
											edit, delete policy, schedule
										</span>
									</div>
								</button>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<button
									data-cy="remove_all_policies_button"
									type="button"
									className="flex w-full disabled:opacity-[0.38]"
									onClick={handleDeactivateUser}
									disabled={!rowData?.attached_policies?.length}
								>
									<div
										className={`${
											active ? 'bg-[#F0F3F4]' : ''
										} flex w-full flex-col rounded-[2px] px-[12px] py-[8px]`}
									>
										<span className="text-start font-lato text-[14px] font-bold leading-[20px] tracking-[0.2px] text-[#AA2113]">
											Remove all Policies
										</span>
										<span className="text-start font-lato text-[12px] leading-[16px] tracking-[0.2px] text-[#6C747D]">
											this will not delete the task but only remove all
											associated policies
										</span>
									</div>
								</button>
							)}
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
