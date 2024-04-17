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
  IconButton,
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
  const skeletonObjPrint = { name: '', phone: '', nid: '', sex: '' };
  const { t } = useTranslation();
  const layout = useLayoutType();
  const [patients, setPatient] = useState([]);
  const [printPage, setPrintPage] = useState(skeletonObjPrint);

  const searchPatient = async (value: string) => {
    if (value.length < 3) return;

    const controller = new AbortController();
    setTimeout(() => {
      findPatients(value, controller)
        .then((response) => {
          console.log('Patients data:', response.data.results);
          if (response.data.results.length > 0) {
            setPatient(response.data.results);
          } else {
            setPatient([]);
          }
        })
        .catch((error) => {
          setPatient([]);
          console.error('Failed to fetch patients:', error);
        });
    }, 1000);
  };

  useEffect(() => {
    console.log(patients, 'patients');
  }, [patients]);

  useEffect(() => {
    printPage.name && window.print();
    setPrintPage(skeletonObjPrint);
  }, [printPage]);

  const printHandler = async (value: any) => {
    setPrintPage(value);
  };

  const valueFromAttribute = (attributes: any, key: string) => {
    const singleAttribute = attributes.find((el) => el.attributeType.display === key);
    return singleAttribute?.value ? singleAttribute.value : 'N/A';
  };
  const patientChartUrl = '${openmrsSpaBase}/patient/${patientUuid}/edit';

  return (
    <>
      {!printPage.name && (
        <Layer style={{ margin: '0 20px' }}>
          <div className={!isDesktop(layout) ? styles.tabletHeading : styles.desktopHeading}>
            <h4>{t('patientList', 'Patient List')}</h4>
          </div>
          <div className={styles.backgroundDataFetchingIndicator}>
            <span>{false ? <InlineLoading /> : null}</span>
          </div>
          <br />
          <div className={styles.activeVisitsContainer}>
            <Search onChange={(e) => searchPatient(e.target.value)} placeholder="Search by Name/NID/Phone" />
            <TableContainer data-testid="encountersTable">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>NID</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                {patients.map((el, i) => {
                  return (
                    <TableBody style={{ height: '40px' }}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>
                        {' '}
                        <ConfigurableLink to={patientChartUrl} templateParams={{ patientUuid: el.uuid }}>
                          {el.person.display}
                        </ConfigurableLink>
                      </TableCell>
                      <TableCell>{valueFromAttribute(el.attributes, 'Telephone Number')}</TableCell>
                      <TableCell>{valueFromAttribute(el.attributes, 'NID')}</TableCell>
                      <TableCell>{el.person.gender}</TableCell>
                      <TableCell>
                        <IconButton
                          label="Print"
                          onClick={() =>
                            printHandler({
                              name: el.person.display,
                              sex: el.person.gender,
                              nid: valueFromAttribute(el.attributes, 'NID'),
                              phone: valueFromAttribute(el.attributes, 'Telephone Number'),
                            })
                          }>
                          {' '}
                          <Printer />
                        </IconButton>
                      </TableCell>
                    </TableBody>
                  );
                })}
              </Table>
            </TableContainer>
          </div>
        </Layer>
      )}
      {printPage.name && (
        <div className={styles.printable}>
          <h3 style={{ textDecoration: 'underline' }}>Patient Information</h3>
          <br />
          <table>
            <tr>
              <td>Name: </td>
              <td> {printPage.name}</td>
            </tr>
            <tr>
              <td>Sex: </td>
              <td> {printPage.sex}</td>
            </tr>
            <tr>
              <td>NID: </td>
              <td> {printPage.nid}</td>
            </tr>
            <tr>
              <td>Phone: </td>
              <td>{printPage.phone}</td>
            </tr>
          </table>
        </div>
      )}
    </>
  );
};

export default PatientListDataTable;
