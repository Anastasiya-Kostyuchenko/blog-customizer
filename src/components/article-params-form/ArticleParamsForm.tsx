import clsx from 'clsx';
import { useState, useRef, useCallback } from 'react';

import styles from './ArticleParamsForm.module.scss';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { useModalClose } from './useModalClose';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

type ArticleParamsForm = (props: {
	setArticleStyleState: (articleState: ArticleStateType) => void;
}) => JSX.Element;

export const ArticleParamsForm: ArticleParamsForm = ({
	setArticleStyleState,
}) => {
	const [inputArticleStyleState, setInputArticleStyleState] =
		useState<ArticleStateType>(defaultArticleState);

	const [isOpened, setIsOpened] = useState<boolean>(false);

	const containerRef = useRef<HTMLDivElement>(null);

	useModalClose({
		isOpened,
		setClosed: () => setIsOpened(false),
		containerRef,
	});

	const closeForm = useCallback(() => {
		setIsOpened(false);
	}, []);

	const submitForm = useCallback((evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setArticleStyleState(inputArticleStyleState);
		closeForm();
	}, [inputArticleStyleState, setArticleStyleState, closeForm]);

	const resetForm = useCallback((evt: React.FormEvent) => {
		evt.preventDefault();
		setInputArticleStyleState(defaultArticleState);
		setArticleStyleState(defaultArticleState);
		closeForm();
	}, [setArticleStyleState, closeForm]);

	const onOptionSelected = useCallback((optionName: keyof ArticleStateType) => (selected: OptionType) => {
		setInputArticleStyleState(prevState => ({
			...prevState,
			[optionName]: selected,
		}));
	}, []);

	return (
		<div ref={containerRef} className={styles.formContainer}>
			<ArrowButton isOpen={isOpened} onClick={() => setIsOpened(!isOpened)} />
			<aside
				className={clsx(styles.container, isOpened && styles.container_open)}>
				<form className={styles.form} onSubmit={submitForm} onReset={resetForm}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={inputArticleStyleState.fontFamilyOption}
						onChange={onOptionSelected('fontFamilyOption')}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={inputArticleStyleState.fontSizeOption}
						onChange={onOptionSelected('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={inputArticleStyleState.fontColor}
						onChange={onOptionSelected('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={inputArticleStyleState.backgroundColor}
						onChange={onOptionSelected('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={inputArticleStyleState.contentWidth}
						onChange={onOptionSelected('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='clear' htmlType='reset' />
						<Button title='Применить' type='apply' htmlType='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
