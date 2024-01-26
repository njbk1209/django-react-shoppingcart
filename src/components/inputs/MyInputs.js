import { useField } from 'formik';


export const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label className="block text-sm font-medium text-gray-700" htmlFor={props.id || props.name}>{label}</label>
            <input className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-600 focus:border-yellow-600 sm:text-sm" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className='text-xs text-red-600 pt-1'>{meta.error}</div>
            ) : null}
        </>
    );
};

export const MyCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
        <div className="flex items-center">
            <input className="h-4 w-4 text-yellow-700 focus:ring-yellow-600 border-gray-300 rounded" type="checkbox" {...field} {...props} />
            <label className="ml-2 block text-sm text-gray-900">
                {children}
            </label>
            {meta.touched && meta.error ? (
                <div className='text-xs text-red-600 pt-1'>{meta.error}</div>
            ) : null}
        </div>
    );
};