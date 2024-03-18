import React from 'react';
import { PersonAttributeField } from '../person-attributes/person-attribute-field.component';
import { useConfig } from '@openmrs/esm-framework';
import { type RegistrationConfig } from '../../../config-schema';

export function OtherBirthInfo() {
  const config = useConfig<RegistrationConfig>();
  return (
    <div>
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
      />
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
      />
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
      />
    </div>
  );
}
