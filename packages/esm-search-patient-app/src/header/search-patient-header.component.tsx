import React, { useContext } from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { DatePicker, DatePickerInput, Dropdown } from '@carbon/react';
import { Location } from '@carbon/react/icons';
import { useSession } from '@openmrs/esm-framework';
// import { useAppointmentServices } from '../hooks/useAppointmentService';
import SearchPatientIllustration from './search-patient-illustration.component';
import styles from './search-patient-header.scss';


interface AppointmentHeaderProps {
  title: string;
  appointmentServiceType?: string;
  onChange?: (evt) => void;
}

const SearchPatientHeader: React.FC<AppointmentHeaderProps> = ({ title, appointmentServiceType, onChange }) => {
  const { t } = useTranslation();
  const session = useSession();
  const location = session?.sessionLocation?.display;
  // const { serviceTypes } = useAppointmentServices();

  return (
    <div className={styles.header} data-testid="search-patient-header">
      <div className={styles['left-justified-items']}>
        <SearchPatientIllustration />
        <div className={styles['page-labels']}>
          <p>{t('searchPatient', 'Search Patient')}</p>
          <p className={styles['page-name']}>{title}</p>
        </div>
      </div>
    </div>
  );
};

export default SearchPatientHeader;
