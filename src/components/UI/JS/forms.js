import React from "react";

export const renderInputField = field => {
	const className = `${
		field.meta.touched && field.meta.error ? field.error : field.className
	}`;
	return (
		<input
			type={field.type}
			className={className}
			placeholder={field.placeholder}
			{...field.input}
			autoFocus={field.autoFocus}
			onClick={() => field.onClick}
		/>
	);
};

export const renderTextArea = field => {
	const className = `${
		field.meta.touched && field.meta.error ? field.error : field.className
	}`;
	return (
		<textarea
			className={className}
			placeholder={field.placeholder}
			rows={field.rows}
			{...field.input}
			autoFocus={field.autoFocus}
		/>
	);
};

export const renderSelectField = field => {
	const className = `${
		field.meta.touched && field.meta.error ? field.error : field.className
	}`;
	return (
		<select className={className} {...field.input}>
			{field.options.map((option, index) => {
				return <option key={index}>{option}</option>;
			})}
		</select>
	);
};
