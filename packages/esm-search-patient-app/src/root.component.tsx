/**
 * From here, the application is pretty typical React, but with lots of
 * support from `@openmrs/esm-framework`. Check out `Greeter` to see
 * usage of the configuration system, and check out `PatientGetter` to
 * see data fetching using the OpenMRS FHIR API.
 *
 * Check out the Config docs:
 *   https://openmrs.github.io/openmrs-esm-core/#/main/config
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
// import { Boxes } from "./boxes/slot/boxes.component";
// import Greeter from "./greeter/greeter.component";
// import PatientGetter from "./patient-getter/patient-getter.component";
import Resources from './resources/resources.component';
import styles from './root.scss';

const Root: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <p>Search Patient</p>
    </div>
  );
};

export default Root;
