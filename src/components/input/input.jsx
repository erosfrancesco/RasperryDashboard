import { useEffect, useState } from 'react';
import { InputLabel } from '../typography';
import './input.css'

export function Label({ children, className, ...args }) {
    const classNames = 'app-label-wrapper' + (className ? ' ' + className : '');

    return <label className={classNames} {...args}>
        <InputLabel>{children}</InputLabel>
    </label>
}

export function Input({
    className,
    initialValue, value: v,
    prefix, suffix, label,
    onChange = () => { }, onEnter = () => { }, onKeyDown = () => { }, onValueChange = () => { },
    ...args
} = {}) {
    const [value, setValue] = useState(initialValue || "");
    const classNames = "app app-input-wrapper" + (className ? " " + className : "");

    useEffect(() => {
        onValueChange(value);
        // eslint-disable-next-line
    }, [value]);

    useEffect(() => {
        if (v !== undefined && v !== null) {
            setValue(v);
        }
    }, [v]);

    return (
        <div className={classNames}>
            <Label>{label}</Label>
            <div className="app app-row app-input-content">
                {prefix && <InputLabel>{prefix}</InputLabel>}
                <input
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            onEnter(e.target.value);
                        }

                        onKeyDown(e);
                    }}

                    onChange={(e) => {
                        setValue(e.target.value);
                        onChange(e.target.value);
                    }}

                    value={value}
                    {...args}
                />
            </div>
        </div>
    );
}

export default Input;
