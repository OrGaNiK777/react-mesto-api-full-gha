function Input({
	name,
	placeholder,
	handleChange,
	value,
	maxLength,
	minLength,
	id,
	classNameInput,
	classNameValid,
	TextValid,
	type,
	useRef,
}) {
	return (
		<>
			<input
				className={classNameInput}
				id={id}
				name={name}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
				maxLength={maxLength}
				minLength={minLength}
				required
				ref={useRef}
			/>
			<span className={classNameValid}>{TextValid}</span>
		</>
	);
}

export default Input;
