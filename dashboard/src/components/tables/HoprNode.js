import React from 'react';
import PropTypes from 'prop-types';
import { Table, Tag } from 'antd';
//Hooks
import { useNodeColumns } from '../../hooks/Columns.hook';
import { useNavigation } from '../../hooks/Nav.hook';

const HoprNodeTable = props => {
  const [, getCol] = useNodeColumns();
  const [, nav] = useNavigation();
  const tableProps = {
    columns: [
      {
        title: '#',
        dataIndex: 'hopr_address',
        width: 100,
        render() {
          return 'Channel: ';
        },
      },
      {
        ...getCol('hopr_channel_id'),
        dataIndex: 'id',
        render(value) {
          return (
            <span
              className="hopr-address"
              onClick={() => nav(`/node?address=${value}`)}
            >
              {value}
            </span>
          );
        },
      },
      {
        ...getCol('hopr_status'),
        align: 'center',
        dataIndex: 'status',
        width: 100,
        render(value) {
          return (
            <div>
              <Tag
                color="#A2EEAE"
                text="Open"
                style={{ width: '100%', height: '100%' }}
              >
                <span style={{ color: '#000' }}>{value}</span>
              </Tag>
            </div>
          );
        },
      },
      {
        ...getCol('hopr_epoch'),
        align: 'center',
        dataIndex: 'ticketEpoch',
        render(value) {
          // Maybe parse to data
          return value;
        },
      },
      {
        ...getCol('deposit'),
        align: 'center',
        dataIndex: 'balance',
      },
      {
        ...getCol('party'),
        align: 'center',
        dataIndex: 'destination',
        render(value) {
          return value.id;
        },
      },
    ],
    onRow: (record, rowIndex) => {
      return {
        className: rowIndex % 2 === 0 ? 'row-pt' : 'row-wt',
      };
    },
    rowKey: e => e._id || e.hopr_address,
    scroll: { y: '50vh' },
    pagination: {
      simple: true,
      position: ['bottomCenter'],
      pageSize: 7,
    },
    ...props,
  };
  return <Table {...tableProps} />;
};

HoprNodeTable.propTypes = {
  props: PropTypes.object,
};

export default HoprNodeTable;