import { Column, DatePicker, DatePickerInput, Grid } from '@carbon/react';
import { useConfig } from '@openmrs/esm-framework';
import { useField } from 'formik';
import React, { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { type RegistrationConfig } from '../../../config-schema';
import { generateFormatting } from '../../date-util';
import { PatientRegistrationContext } from '../../patient-registration-context';
import { PersonAttributeField } from '../person-attributes/person-attribute-field.component';

export function OtherInfo() {
  const config = useConfig<RegistrationConfig>();
  const { t } = useTranslation();
  const { setFieldValue, values } = useContext(PatientRegistrationContext);
  const [registrationDate, registrationDateMeta] = useField('registrationDate');
  const { format, placeHolder, dateFormat } = generateFormatting(['d', 'm', 'Y'], '/');
  const onDateChange = useCallback(
    (registrationDate: Date[]) => {
      setFieldValue('registrationDate', registrationDate[0]);
    },
    [setFieldValue],
  );

  const otherInputFields = [
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
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'mobileNoOwner',
        type: 'person attribute',
        uuid: config.fieldConfigurations.mobileNoOwner.personAttributeUuid, // "fcb2bcac-78a0-4cef-be7c-d51fa90d62e5",
        showHeading: false,
        customConceptAnswers: [
          { uuid: '5bf0d7ab-09c3-4825-a58e-94e256b13222', label: 'Self' },
          { uuid: 'd595904d-943d-46fd-a008-5f50942b5b97', label: 'Parents' },
        ],
        // answerConceptSetUuid: '5be5ff99-f938-4577-a477-821bca28222b',
        validation: {
          required: true,
          matches: null,
        },
        label: 'Mobile No Owner',
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'alternateMobileNo',
        type: 'person attribute',
        uuid: config.fieldConfigurations.birthDistrict.personAttributeUuid,
        showHeading: false,
        label: 'Alternate Mobile No',
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'preferredCallingTime',
        type: 'person attribute',
        uuid: config.fieldConfigurations.birthUpazilla.personAttributeUuid,
        showHeading: false,
        label: 'Preferred Calling Time',
      }}
    />,
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
    />,
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
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'maritalStatus',
        type: 'person attribute',
        uuid: config.fieldConfigurations.maritalStatus.personAttributeUuid,
        showHeading: false,
        answerConceptSetUuid: '652e876c-5ee3-499d-8fff-245049220c42',
        label: 'Marital Status',
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'spouseOrFathersName',
        type: 'person attribute',
        uuid: config.fieldConfigurations.birthRank.personAttributeUuid,
        showHeading: false,
        label: 'Spouse/Fathers Name',
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'occupation',
        type: 'person attribute',
        uuid: config.fieldConfigurations.occupation.personAttributeUuid,
        showHeading: false,
        label: 'Occupation',
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'idType',
        type: 'person attribute',
        uuid: config.fieldConfigurations.idType.personAttributeUuid,
        answerConceptSetUuid: '6ba4afe6-da39-4fcd-a250-a4d61955177c',
        showHeading: false,
        label: 'Id Type',
      }}
    />,
    <DatePicker dateFormat={dateFormat} datePickerType="single" onChange={onDateChange} maxDate={format(new Date())}>
      <DatePickerInput
        {...registrationDate}
        labelText={t('registrationDate', 'Registration Date')}
        id="registrationDate"
        value={format(registrationDate.value)}
        size="sm"
      />
    </DatePicker>,
  ];

  return (
    <div>
      <Grid>
        {otherInputFields.map((field, index) => (
          <Column key={index} lg={4} md={4} sm={2}>
            {field}
          </Column>
        ))}
      </Grid>
    </div>
  );
}
