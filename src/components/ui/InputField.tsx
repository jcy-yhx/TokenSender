export interface InputFormProps {
    label: string
    placeholder: string
    value?: string
    type?: string
    large?: boolean
    className?: string // 增加 className 支持自定义样式
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export default function InputForm({ label, placeholder, value, type, large, onChange, className }: InputFormProps) {
    // 提取公共样式，确保 input 和 textarea 视觉统一
    const baseStyles = `
        w-full bg-white 
        py-2.5 px-3.5 
        border border-gray-300 
        rounded-xl shadow-sm
        placeholder:text-gray-400 
        text-gray-900 
        transition-all duration-200
        hover:border-gray-400 
        focus:ring-[4px] focus:ring-indigo-500/10 focus:border-indigo-500 
        focus:outline-none
    `;

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <label className="text-gray-700 font-semibold text-sm ml-1">
                {label}
            </label>
            
            {large ? (
                <textarea
                    className={`${baseStyles} h-32 resize-y min-h-[100px] align-text-top`}
                    placeholder={placeholder}
                    value={value || ''}
                    onChange={onChange}
                />
            ) : (
                <input
                    className={baseStyles}
                    type={type || 'text'}
                    placeholder={placeholder}
                    value={value || ''}
                    onChange={onChange}
                />
            )}
        </div>
    )
}