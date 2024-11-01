import React from 'react';
import PropTypes from 'prop-types';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import ButtonStatus from '../ButtonStatus';

const TableGeneric = ({ data, headers, actions }) => {

    return (
        <div>
            <MDBTable align="middle" className="shadow-md rounded-lg">
                <MDBTableHead className="bg-gray-100 text-gray-600 uppercase font-semibold">
                    <tr>
                        {headers.map((header) => (
                            <th scope='col' className="px-6 py-3 align-middle text-center" key={header.key}>{header.label}</th>
                        ))}
                        <th className='text-center'>Accion</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className='aling-middle text-center'>
                            {headers.map((header) => (
                                <td key={header.key}>
                                    {header.key === 'status' ? (
                                        <ButtonStatus status={row[header.key]} />
                                    ) : (
                                        <p>{row[header.key]}</p>
                                    )}
                                </td>
                            ))}
                            <td>
                                {actions &&  actions[rowIndex]?.map((action, index) => (
                                    <MDBBtn
                                        key={index}
                                        color={action.color || 'primary'}
                                        size='sm'
                                        onClick={action.onClick}
                                        className='mx-1'
                                    >
                                        <MDBIcon fas icon={action.icon} />
                                    </MDBBtn>
                                ))} 
                            </td>
                        </tr>
                    ))}
                </MDBTableBody>
            </MDBTable >
        </div>
    )
}

TableGeneric.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    headers: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
    })).isRequired,
    actions: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
        color: PropTypes.string,
        icon: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    })))
};

export default TableGeneric