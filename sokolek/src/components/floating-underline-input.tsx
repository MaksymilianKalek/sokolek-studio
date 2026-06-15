import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function FloatingUnderlineInput({ label, ...props }: InputProps) {
  return (
    <div className="relative z-0 w-full mb-8 group">
      <input
        {...props}
        type={props.type || "text"}
        placeholder=" "
        className="block py-3 px-0 w-full text-base text-neutral-900 bg-transparent border-0 border-b border-neutral-200 appearance-none focus:outline-none focus:ring-0 focus:border-neutral-900 transition-colors duration-300 peer"
      />
      <label className="absolute text-sm text-neutral-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-neutral-900 font-medium">
        {label}
      </label>
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function FloatingUnderlineTextarea({ label, ...props }: TextareaProps) {
  return (
    <div className="relative z-0 w-full mb-8 group">
      <textarea
        {...props}
        placeholder=" "
        className="block py-3 px-0 w-full text-base text-neutral-900 bg-transparent border-0 border-b border-neutral-200 appearance-none focus:outline-none focus:ring-0 focus:border-neutral-900 transition-colors duration-300 peer resize-none"
      />
      <label className="absolute text-sm text-neutral-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-neutral-900 font-medium">
        {label}
      </label>
    </div>
  );
}
