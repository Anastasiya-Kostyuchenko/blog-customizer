import { useEffect } from 'react';

type UseModalClose = (params: {
	containerRef: React.RefObject<HTMLElement>;
	isOpened: boolean;
	setClosed: () => void;
}) => void;

export const useModalClose: UseModalClose = ({
	containerRef,
	isOpened,
	setClosed,
}) => {
	useEffect(() => {
		if (!isOpened) return;

		const handleEvent = (e: MouseEvent | KeyboardEvent) => {
			if (e instanceof MouseEvent) {
				if (
					containerRef.current &&
					!containerRef.current.contains(e.target as Node)
				) {
					setClosed();
				}
			}
			if (e instanceof KeyboardEvent && e.key === 'Escape') {
				setClosed();
			}
		};

		window.addEventListener('mousedown', handleEvent);
		window.addEventListener('keydown', handleEvent);

		return () => {
			window.removeEventListener('mousedown', handleEvent);
			window.removeEventListener('keydown', handleEvent);
		};
	}, [isOpened, setClosed]);
};
