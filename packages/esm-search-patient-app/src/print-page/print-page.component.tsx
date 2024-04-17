import React, { useEffect, useState, useMemo, useRef } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Printer } from '@carbon/icons-react';

import {
  Layer,
  Tile,
  TextInput,
  Grid,
  Column,
  Button,
  InlineLoading,
  Pagination,
  Search,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from '@carbon/react';
import {
  useLayoutType,
  isDesktop,
  useConfig,
  usePagination,
  ExtensionSlot,
  ErrorState,
  ConfigurableLink,
} from '@openmrs/esm-framework';
import styles from './patient-table.scss';


interface PrintProps {
}

const PrintPage: React.FC<PrintProps> = ({}) => {
  const { t } = useTranslation();
  const layout = useLayoutType();
  const [patients, setPatient] = useState([]);

  useEffect(() => {
    console.log(patients, 'patients');
  }, [patients]);

  const printHandler=()=>{
    window.print()
  }

  const patientChartUrl = '${openmrsSpaBase}/patient/${patientUuid}/edit';

  return (
    <div style={{ margin: '0 20px' }}>
        <h1>Hello ..............</h1>
    </div>
  );
};

export default PrintPage;
