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
import { findPatients } from './search.resource';

interface PatientListProps {}

const PatientListDataTable: React.FC<PatientListProps> = ({}) => {
  const { t } = useTranslation();
  const layout = useLayoutType();
  const [patients, setPatient] = useState([]);

  const searchPatient = async (e) => {
    console.log(e.target.value);

    if (e.target.value.length < 3) return;

    const controller = new AbortController();
    await findPatients(e.target.value, controller)
      .then((response) => {
        console.log('Patients data:', response.data.results);
        if (response.data.results.length > 0) {
          setPatient(response.data.results);
        }else{
          setPatient([]);
        }
      })
      .catch((error) => {
        setPatient([]);
        console.error('Failed to fetch patients:', error);
      });
  };

  useEffect(() => {
    console.log(patients, 'patients');
  }, [patients]);


  const valueFromAttribute=(attributes,key)=>{
    const singleAttribute = attributes.find(el=>el.attributeType.display===key)
    return singleAttribute?.value?singleAttribute.value:"N/A"
  }

  return (
    <Layer style={{ margin: '0 20px' }}>
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
      <Search onChange={(e) => searchPatient(e)} />
      <TableContainer data-testid="encountersTable">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell style={{ width: '200px' }}>#</TableCell>
              <TableCell style={{ width: '200px' }}>Name</TableCell>
              <TableCell style={{ width: '200px' }}>Phone</TableCell>
              <TableCell style={{ width: '200px' }}>NID</TableCell>
              <TableCell>Gender</TableCell>
            </TableRow>
            {patients.map((el,i) => {
              return (
                <TableBody>
                  <TableCell style={{ width: '200px' }}>{i+1}</TableCell>
                  <TableCell style={{ width: '200px' }}>{el.person.display}</TableCell>
                  <TableCell style={{ width: '200px' }}>{valueFromAttribute(el.attributes,"Telephone Number")}</TableCell>
                  <TableCell style={{ width: '200px' }}>{valueFromAttribute(el.attributes,"NID")}</TableCell>
                  <TableCell>{el.person.gender}</TableCell>
                </TableBody>
              );
            })}
          </TableHeader>
        </Table>
      </TableContainer>
    </Layer>
  );
};

export default PatientListDataTable;
