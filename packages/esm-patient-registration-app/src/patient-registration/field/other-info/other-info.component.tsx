import React, { useContext, useCallback } from 'react';
import { PersonAttributeField } from '../person-attributes/person-attribute-field.component';
import { useConfig } from '@openmrs/esm-framework';
import { type RegistrationConfig } from '../../../config-schema';
// import { useField } from 'formik';
// import styles from '../field.scss';
// import { ContentSwitcher, DatePicker, DatePickerInput, Layer, Switch, TextInput } from '@carbon/react';
// import { PatientRegistrationContext } from '../../patient-registration-context';
// import { generateFormatting } from '../../date-util';
// import { useTranslation } from 'react-i18next';

export function OtherInfo() {
  const config = useConfig<RegistrationConfig>();
  // const { t } = useTranslation();
  //const { setFieldValue } = useContext(PatientRegistrationContext);
  // const [registrationDate, registrationDateMeta] = useField('registrationDate');
  // const { format, placeHolder, dateFormat } = generateFormatting(['d', 'm', 'Y'], '/');
  // const onDateChange = useCallback(
  //   (registrationDate: Date[]) => {
  //     console.log(registrationDate);
  //     setFieldValue('registrationDate', registrationDate[0]);
  //   },
  //   [setFieldValue],
  // );

  return (
    <div>
      <div
      // style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '10px' }}
      >
        <PersonAttributeField
          fieldDefinition={{
            id: 'mobileNo',
            type: 'person attribute',
            uuid: config.fieldConfigurations.phone.personAttributeUuid,
            showHeading: false,
            validation: {
              required: true,
            },
            label: 'Mobile No',
          }}
        />
        <PersonAttributeField
          fieldDefinition={{
            id: 'mobileNoOwner',
            type: 'person attribute',
            uuid: config.fieldConfigurations.mobileNoOwner.personAttributeUuid,
            showHeading: false,
            answerConceptSetUuid: '5be5ff99-f938-4577-a477-821bca28222b',
            validation: {
              required: true,
            },
            label: 'Mobile No Owner',
          }}
        />
      </div>
      <PersonAttributeField
        fieldDefinition={{
          id: 'alternateMobileNo',
          type: 'person attribute',
          uuid: config.fieldConfigurations.birthDistrict.personAttributeUuid,
          showHeading: false,
          label: 'Alternate Mobile No',
        }}
      />
      <PersonAttributeField
        fieldDefinition={{
          id: 'preferredCallingTime',
          type: 'person attribute',
          uuid: config.fieldConfigurations.birthUpazilla.personAttributeUuid,
          showHeading: false,
          label: 'Preferred Calling Time',
        }}
      />
      <PersonAttributeField
        fieldDefinition={{
          id: 'financialStatus',
          type: 'person attribute',
          uuid: config.fieldConfigurations.finacialStatus.personAttributeUuid,
          showHeading: false,
          answerConceptSetUuid: 'eb261aa6-e59a-44bc-bb0f-3a52edcfde93',
          validation: {
            required: true,
          },
          label: 'Financial Status',
        }}
      />
      <PersonAttributeField
        fieldDefinition={{
          id: 'registrationPoint',
          type: 'person attribute',
          uuid: config.fieldConfigurations.registrationPoint.personAttributeUuid,
          showHeading: false,
          answerConceptSetUuid: '9ba85b27-57e5-410d-81d7-c18653f5392c',
          validation: {
            required: true,
          },
          label: 'Registration Point',
        }}
      />
      <PersonAttributeField
        fieldDefinition={{
          id: 'maritalStatus',
          type: 'person attribute',
          uuid: config.fieldConfigurations.maritalStatus.personAttributeUuid,
          showHeading: false,
          answerConceptSetUuid: '652e876c-5ee3-499d-8fff-245049220c42',
          label: 'Marital Status',
        }}
      />
      <PersonAttributeField
        fieldDefinition={{
          id: 'spouseOrFathersName',
          type: 'person attribute',
          uuid: config.fieldConfigurations.birthRank.personAttributeUuid,
          showHeading: false,
          label: 'Spouse/Fathers Name',
        }}
      />
      <PersonAttributeField
        fieldDefinition={{
          id: 'occupation',
          type: 'person attribute',
          uuid: config.fieldConfigurations.occupation.personAttributeUuid,
          showHeading: false,
          label: 'Occupation',
        }}
      />
      <PersonAttributeField
        fieldDefinition={{
          id: 'idType',
          type: 'person attribute',
          uuid: config.fieldConfigurations.idType.personAttributeUuid,
          answerConceptSetUuid: '6ba4afe6-da39-4fcd-a250-a4d61955177c',
          showHeading: false,
          label: 'Id Type',
        }}
      />
      <PersonAttributeField
        fieldDefinition={{
          id: 'idNumber',
          type: 'person attribute',
          uuid: config.fieldConfigurations.idNumber.personAttributeUuid,
          showHeading: false,
          label: 'Id Number',
        }}
      />
      <PersonAttributeField
        fieldDefinition={{
          id: 'registrationDate',
          type: 'person attribute',
          uuid: config.fieldConfigurations.registrationDate.personAttributeUuid,
          showHeading: false,
          validation: {
            required: true,
          },
          disabled: true,
          label: 'Registration Date',
        }}
      />

      {/* <div className={styles.dobField}>
        <DatePicker
          dateFormat={dateFormat}
          datePickerType="single"
          onChange={onDateChange}
          maxDate={format(new Date())}>
          <DatePickerInput
            {...registrationDate}
            labelText={t('registrationDate', 'Registration Date')}
            id="registrationDate"
            value={format(registrationDate.value)}
          />
        </DatePicker>
      </div> */}
    </div>
  );
}
