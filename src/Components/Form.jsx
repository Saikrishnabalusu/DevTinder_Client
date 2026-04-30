import React from 'react'

const Form = ({ formType, formFields = [], submitText, handleChange, handleSubmit }) => {
    return (
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-96 border p-4">
            <legend className="fieldset-legend">{formType}</legend>


            {formFields && formFields.map((field, index) => (
                <div key={index}>
                    <label className="label">{field.label}</label>
                    {field.type === "textarea" ? (
                        <textarea className="textarea" placeholder={field.placeholder} value={field.value} onChange={(e) => handleChange(field, e.target.value)}></textarea>
                    ) : (
                        <input type={field.type} className="input" placeholder={field.placeholder} value={field.value} onChange={(e) => handleChange(field.label, e.target.value)} />
                    )}
                </div>
            ))}
            <button className="btn btn-neutral mt-4" onClick={() => handleSubmit()}>{submitText}</button>
        </fieldset>
    )
}

export default Form