import { Column, DatePicker, DatePickerInput, Grid } from '@carbon/react';
import { useConfig } from '@openmrs/esm-framework';
import { useField } from 'formik';
import React, { useCallback, useContext, useEffect } from 'react';
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

  useEffect(() => {
    setFieldValue('registrationDate', new Date());
  }, []);

  const otherInputFields = [
    <PersonAttributeField
      fieldDefinition={{
        id: 'nid',
        type: 'person attribute',
        uuid: config.fieldConfigurations.nid.personAttributeUuid,
        showHeading: false,
        validation: {
          required: true,
        },
        label: 'NID',
      }}
    />,
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
        // customConceptAnswers: [
        //   { uuid: '5bf0d7ab-09c3-4825-a58e-94e256b13222', label: 'Self' },
        //   { uuid: 'd595904d-943d-46fd-a008-5f50942b5b97', label: 'Parents' },
        // ],
        answerConceptSetUuid: 'f1dbd267-06de-43d9-b550-6c8a7b0fb28e',
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
        uuid: config.fieldConfigurations.alternateMobileNo.personAttributeUuid,
        showHeading: false,
        label: 'Alternate Mobile No',
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'preferredCallingTime',
        type: 'person attribute',
        uuid: config.fieldConfigurations.preferredCallingTime.personAttributeUuid,
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
        answerConceptSetUuid: 'cbe08c07-b37f-4edf-bc93-aaaf70c8f781',
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
        answerConceptSetUuid: 'aceb64ca-7ad3-4f4a-8de7-a1f7f1d9fa59',
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
        answerConceptSetUuid: 'e6a03739-fe8b-4d29-bc8e-5e5d836f1506',
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
        answerConceptSetUuid: '6b7ba36f-fa60-4918-a770-312d8ca976cd',
        label: 'Occupation',
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'idType',
        type: 'person attribute',
        uuid: config.fieldConfigurations.idType.personAttributeUuid,
        answerConceptSetUuid: '6ebd3115-6a54-474c-836d-73cccccf0ce3',
        showHeading: false,
        label: 'Id Type',
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'registrationDate',
        readOnly: true,
        type: 'person attribute',
        uuid: config.fieldConfigurations.registrationDate.personAttributeUuid,
        showHeading: false,
        defaultValue: new Date(),
        label: 'Registration Date',
        range: {
          maxDate: new Date(),
        },
      }}
    />,
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
