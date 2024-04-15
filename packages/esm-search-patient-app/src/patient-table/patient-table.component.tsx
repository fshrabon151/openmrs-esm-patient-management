import React, { useEffect, useState, useMemo, useRef } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
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

interface PatientListProps {}

const PatientListDataTable: React.FC<PatientListProps> = ({}) => {
  const { t } = useTranslation();
  const layout = useLayoutType();
  return (
    <Layer style={{margin:'0 20px'}}>
      {/* <Tile> Patient Table</Tile> */}

      {/* <Grid condensed>
        <Column lg={3}>
          {' '}
          <Search />
        </Column>
        <Column lg={4}>
          <Button size="md" kind="tertiary">
            Search
          </Button>
        </Column>
      </Grid> */}
      <div className={styles.activeVisitsDetailHeaderContainer}>
          <div className={!isDesktop(layout) ? styles.tabletHeading : styles.desktopHeading}>
            <h4>{t('patientList', 'Patient List')}</h4>
          </div>
          <div className={styles.backgroundDataFetchingIndicator}>
            <span>{false ? <InlineLoading /> : null}</span>
          </div>
        </div>
      <br />
      <Search />
      <TableContainer data-testid="encountersTable">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell style={{width:"200px"}}>#</TableCell>
            <TableCell style={{width:"200px"}}>Name</TableCell>
            <TableCell style={{width:"200px"}}>Phone</TableCell>
            <TableCell style={{width:"200px"}}>NID</TableCell>
            <TableCell >Gender</TableCell>
          </TableRow>
          <TableBody>
          <TableCell style={{width:"200px"}}>1</TableCell>
            <TableCell style={{width:"200px"}}>Mr. X</TableCell>
            <TableCell style={{width:"200px"}}>015xxxxxxxx</TableCell>
            <TableCell style={{width:"200px"}}>xxxxxxxxxxxxx2</TableCell>
            <TableCell >Unknown</TableCell>
          </TableBody>
        </TableHeader>
      </Table>
      </TableContainer>
    </Layer>
  );
};

export default PatientListDataTable;
