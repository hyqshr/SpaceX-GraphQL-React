import React from "react";
import { Multiselect } from "multiselect-react-dropdown";
import { Controller, useForm } from "react-hook-form";

interface FormProps {
  fields: string[];
  onSubmit: (selected: any) => void;
}

const FieldSelectionBar: React.FC<FormProps> = ({ fields, onSubmit }) => {
  const { control, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex justify-between py-5">
      <label htmlFor="Field" className="text-gray-700 text-xl font-bold">
        Select the field you want to see:
      </label>
      <Controller
        control={control}
        name="Field"
        render={({ field: { value, onChange } }) => (
          <Multiselect
            options={fields}
            isObject={false}
            showCheckbox={true}
            hidePlaceholder={true}
            closeOnSelect={false}
            onSelect={onChange}
            onRemove={onChange}
            selectedValues={value}
          />
        )}
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Search
      </button>
    </form>
  );
};

export default FieldSelectionBar;
