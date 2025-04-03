import { useState } from "react";
import {
    ConfirmSchema,
    getErrors,
    getFieldError,
} from "../../lib/validationForm";
import supabase from "../../supabase/supabase-client";
import { useNavigate } from "react-router";

export default function RegisterPage() {

    const navigate = useNavigate();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const [formState, setFormState] = useState({
        email: "",
        firstName: "",
        lastName: "",
        userName: "",
        password: "",
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        setFormSubmitted(true);
        const { error, data } = ConfirmSchema.safeParse(formState);
        if (error) {
            const errors = getErrors(error);
            setFormErrors(errors);
            console.log(errors);
        } else {
            let { error } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        first_name: data.firstName,
                        last_name: data.lastName,
                        username: data.userName
                    }
                }
            });
            if (error) {
                alert("C'è un errore 👎🏻!");
            } else {
                alert("Registrato 👍🏻!");
                await new Promise((resolve) => setTimeout(resolve, 1000));
                navigate("/");
            }
        }
        console.log(data);
    };

    const onBlur = (property) => () => {
        const message = getFieldError(property, formState[property]);
        setFormErrors((prev) => ({ ...prev, [property]: message }));
        setTouchedFields((prev) => ({ ...prev, [property]: true }));
    };

    const isInvalid = (property) => {
        if (formSubmitted || touchedFields[property]) {
            return !!formErrors[property];
        }
        return undefined;
    };

    const setField = (property, valueSelector) => (e) => {
        setFormState((prev) => ({
            ...prev,
            [property]: valueSelector ? valueSelector(e) : e.target.value
        }));
    };

    return (
        <div className="container-fluid main-custom pb-5">
            <div className="d-flex justify-content-center col-12">
                <h1 className="text-white py-5 display-1">Register</h1>
            </div>
            <div className="d-flex justify-content-center">
                <div className="conatiner-fluid col-11 col-md-4 d-flex justify-content-center container-form-custom">
                    <form onSubmit={onSubmit} noValidate className="d-flex flex-column justify-content-center align-items-center">
                        <label htmlFor="email" className="text-white mt-3 mb-2">Email:</label>
                        <input
                            className="rounded-3"
                            type="email"
                            id="email"
                            name="email"
                            value={formState.email}
                            onChange={setField("email")}
                            onBlur={onBlur("email")}
                            aria-invalid={isInvalid("email")}
                            required
                        />
                        {formErrors.email &&
                            <small className="error">{formErrors.email}</small>
                        }

                        <label htmlFor="firstName" className="text-white mt-3 mb-2">Nome:</label>
                        <input
                            className="rounded-3"
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formState.firstName}
                            onChange={setField("firstName")}
                            onBlur={onBlur("firstName")}
                            aria-invalid={isInvalid("firstName")}
                            required
                        />
                        {formErrors.firstName &&
                            <small className="error">{formErrors.firstName}</small>
                        }

                        <label htmlFor="lastName" className="text-white mt-3 mb-2">Cognome:</label>
                        <input
                            className="rounded-3"
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formState.lastName}
                            onChange={setField("lastName")}
                            onBlur={onBlur("lastName")}
                            aria-invalid={isInvalid("lastName")}
                            required
                        />
                        {formErrors.lastName &&
                            <small className="error">{formErrors.lastName}</small>
                        }

                        <label htmlFor="userName" className="text-white mt-3 mb-2">Username:</label>
                        <input
                            className="rounded-3"
                            type="text"
                            id="userName"
                            name="userName"
                            value={formState.userName}
                            onChange={setField("userName")}
                            onBlur={onBlur("userName")}
                            aria-invalid={isInvalid("userName")}
                            required
                        />
                        {formErrors.userName &&
                            <small className="error">{formErrors.userName}</small>
                        }

                        <label htmlFor="password" className="text-white mt-3 mb-2">Password:</label>
                        <input
                            className="rounded-3"
                            type="password"
                            id="password"
                            name="password"
                            value={formState.password}
                            onChange={setField("password")}
                            onBlur={onBlur("password")}
                            aria-invalid={isInvalid("password")}
                            required
                        />
                        {formErrors.password &&
                            <small className="error">{formErrors.password}</small>
                        }

                        <button type="submit" className="mt-3 mb-3 rounded-3 button-custom-login-register">Registrati</button>
                    </form>
                </div>
            </div>
        </div>

    );
}   