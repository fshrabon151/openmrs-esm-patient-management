import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Printer } from '@carbon/icons-react';
import {
  Layer,
  Search,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@carbon/react';
import { useLayoutType, ConfigurableLink } from '@openmrs/esm-framework';
import styles from './patient-table.scss';
import { findPatients } from './search.resource';

interface Patient {
  uuid: string;
  person: {
    display: string;
    gender: string;
  };
  nid: string;
  phone: string;
  attributes: Array<{ attributeType: { display: string }; value: string }>;
}

const PatientListDataTable: React.FC = () => {
  const { t } = useTranslation();
  const isDesktopView = useLayoutType();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [printPage, setPrintPage] = useState<Patient | null>(null);

  const searchPatient = async (query: string) => {
    if (query.length < 3) return;

    try {
      const controller = new AbortController();
      const response = await findPatients(query, controller);
      setPatients(response.data.results);
    } catch (error) {
      console.error('Failed to fetch patients:', error);
      setPatients([]);
    }
  };
  useEffect(() => {
    if (printPage) {
      window.print();
      setPrintPage(null);
    }
  }, [printPage]);

  const printHandler = (patient: Patient) => {
    setPrintPage(patient);
  };

  const valueFromAttribute = (
    attributes: Array<{ attributeType: { display: string }; value: string }>,
    key: string,
  ) => {
    const attribute = attributes.find((attr) => attr.attributeType.display === key);
    return attribute?.value || 'N/A';
  };
  const patientChartUrl = '${openmrsSpaBase}/patient/${patientUuid}/edit';
  return (
    <>
      {!printPage && (
        <Layer style={{ margin: '0 20px' }}>
          <div
            className={classNames({ [styles.tabletHeading]: !isDesktopView, [styles.desktopHeading]: isDesktopView })}>
            <h4>{t('patientList', 'Patient List')}</h4>
          </div>
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
              <TableBody>
                {patients.map((patient, index) => (
                  <TableRow key={patient.uuid}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                    <ConfigurableLink to={patientChartUrl} templateParams={{ patientUuid: patient.uuid }}>
                          {patient.person.display}
                        </ConfigurableLink>
                    </TableCell>
                    <TableCell>{valueFromAttribute(patient.attributes, 'Telephone Number')}</TableCell>
                    <TableCell>{valueFromAttribute(patient.attributes, 'NID')}</TableCell>
                    <TableCell>{patient.person.gender}</TableCell>
                    <TableCell>
                      <IconButton label="Print" onClick={() => printHandler(patient)}>
                        <Printer />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Layer>
      )}
      {printPage && (
        <div className={styles.printable}>
          <h3 style={{ textDecoration: 'underline' }}>Patient Information</h3>
          <table>
            <tbody>
              <tr>
                <td>Name:</td>
                <td>{printPage.person.display}</td>
              </tr>
              <tr>
                <td>Sex: {printPage.person.gender}</td>
              </tr>
              <tr>
                <td>NID:</td>
                <td>{printPage.nid}</td>
              </tr>
              <tr>
                <td>Phone:</td>
                <td>{printPage.phone}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default PatientListDataTable;
