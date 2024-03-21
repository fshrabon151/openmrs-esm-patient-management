import React from 'react';
import { PersonAttributeField } from '../person-attributes/person-attribute-field.component';
import { useConfig } from '@openmrs/esm-framework';
import { type RegistrationConfig } from '../../../config-schema';
import { Column, Grid } from '@carbon/react';

export function OtherBirthInfo() {
  const config = useConfig<RegistrationConfig>();
  const otherBirthInfo = [
    <PersonAttributeField
      fieldDefinition={{
        id: 'birthRank',
        type: 'person attribute',
        uuid: config.fieldConfigurations.birthRank.personAttributeUuid,
        showHeading: false,
        validation: {
          required: true,
        },
        label: 'Birth Rank',
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'birthDistrict',
        type: 'person attribute',
        uuid: config.fieldConfigurations.birthDistrict.personAttributeUuid,
        showHeading: false,
        validation: {
          required: true,
        },
        label: 'Birth District',
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'birthUpazilla',
        type: 'person attribute',
        uuid: config.fieldConfigurations.birthUpazilla.personAttributeUuid,
        showHeading: false,
        validation: {
          required: true,
        },
        label: 'Birth Upazilla',
      }}
    />,
  ];
  return (
    <div style={{ marginTop: '20px' }}>
      {' '}
      <Grid>
        {otherBirthInfo.map((field, index) => (
          <Column key={index} lg={5} md={4} sm={2}>
            {field}
          </Column>
        ))}
      </Grid>
    </div>
  );
}
