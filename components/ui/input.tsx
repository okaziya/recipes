import Image from "next/image";
import i18n from "../../libs/i18n";
import s from "../../styles/components/ui/input.module.sass";
import React from "react";

type Props = {
    label?: string;
    name?: string;
    loading?: boolean;
    value?: string;
    error?: string;
    icon?: any;
};

export default function Input({
                                  disabled,
                                  label,
                                  name = "",
                                  loading,
                                  value,
                                  error,
                                  icon,
                                  ...rest
                              }: Props &
    React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
        >) {
    return (
        <>
            {label && (
                <>
                    <label className={s.label} htmlFor={name}>{`${label}:`}</label>

                    {rest.required && (
                        <span className={s.required}>{i18n.t("asterisk")}</span>
                    )}
                </>
            )}

            <div className={s.wrap}>
                {icon && (
                    <div className={s.icon}>
                        <Image src={icon} alt="user" />
                    </div>
                )}

                <input
                    aria-label={name}
                    className={s.input}
                    type="text"
                    disabled={disabled || loading}
                    id={name}
                    name={name}
                    onChange={rest.onChange}
                    value={value as string | string[] | number}
                    {...rest}
                />
            </div>

            {error && <span className={s.error}>{error}</span>}
        </>
    );
}
