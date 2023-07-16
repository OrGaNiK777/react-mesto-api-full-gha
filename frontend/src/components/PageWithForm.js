export default function PageWithForm({
	name,
	handleSubmit,
	title,
	nameBtn,
	children,
	question,
}) {
	return (
		<section className="access-page">
			<h2 className="access-page__title">{title}</h2>
			<form
				className="access-page__form"
				name={`${name}Form`}
				noValidate
				onSubmit={handleSubmit}
			>
				{children}
				<button className="access-page__button-submit" type="submit">
					{nameBtn}
				</button>
				{question}
			</form>
		</section>
	);
}
