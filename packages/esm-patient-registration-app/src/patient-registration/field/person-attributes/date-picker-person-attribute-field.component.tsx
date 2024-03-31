import { Field } from 'formik';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { type PersonAttributeTypeResponse } from '../../patient-registration.types';
import { DatePicker, DatePickerInput } from '@carbon/react';
import { generateFormatting } from '../../date-util';
import { PatientRegistrationContext } from '../../patient-registration-context';

export interface DatePickerPersonAttributeFieldProps {
  id: string;
  personAttributeType: PersonAttributeTypeResponse;
  validationRegex?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: any;
}

export function DatePickerPersonAttributeField({
  id,
  personAttributeType,
  validationRegex,
  label,
  required,
  disabled,
  defaultValue,
}: DatePickerPersonAttributeFieldProps) {
  const { t } = useTranslation();
  const { format, placeHolder, dateFormat } = generateFormatting(['d', 'm', 'Y'], '/');
  const today = new Date();
  const fieldName = `attributes.${personAttributeType.uuid}`;

  const { setFieldValue } = useContext(PatientRegistrationContext);

  useEffect(() => {
    if (defaultValue) {
      setFieldValue(fieldName, format(defaultValue));
    }
  }, []);

  return (
    <div>
      <Field name={fieldName}>
        {({ field, form: { touched, errors }, meta }) => {
          const value = field.value && field.value.includes('T') ? new Date(field.value.split('T')[0]) : field.value;
          return (
            <>
              <DatePicker
                dateFormat={dateFormat}
                datePickerType="single"
                maxDate={format(today)}
                {...field}
                onChange={([date]) => setFieldValue(fieldName, format(date))}
                required={required}
                readOnly={disabled}>
                <DatePickerInput
                  labelText={label ?? personAttributeType?.display}
                  id={id}
                  invalid={errors[fieldName] && touched[fieldName]}
                  {...field}
                  value={value ? format(value) : defaultValue}
                  size="sm"
                />
              </DatePicker>
            </>
          );
        }}
      </Field>
    </div>
  );
}
