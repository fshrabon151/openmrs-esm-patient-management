import { openmrsFetch, restBaseUrl } from '@openmrs/esm-framework';

export function findPatients(query: string, controller: AbortController) {
  const url = `${restBaseUrl}/patient?q=${query}&v=custom:(patientId,uuid,identifiers,display,patientIdentifier:(uuid,identifier),person:(gender,age,birthdate,birthdateEstimated,personName,addresses,display,dead,deathDate),attributes:(value,attributeType:(uuid,display)))&includeDead=false&totalCount=true`;

  return openmrsFetch(url, {
    method: 'GET',
    signal: controller.signal,
  });
}
