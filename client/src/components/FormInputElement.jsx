const FormInputElement = ({ name, label, type, error, placeholder }) => {
  return (
    <div className='w-full mt-2'>
      <label htmlFor={name} className='capitalize text-sm'>
        {label || name}
      </label>
      <input
        type={type || name}
        id={name}
        placeholder={placeholder}
        required={true}
        className='block h-8 w-[100%] px-2 border border-gray-300 rounded-sm focus:border-green-500 focus:outline-none'
      />
      <span>{error}</span>
    </div>
  );
};

export default FormInputElement;
