import React, { useEffect, useState } from "react";
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa";
import NoInformationToDisplay from "../NoInformationToDisplay/NoInformationToDisplay";
import "./Table.scss";

export type ColsType = {
  label: string;
  id: string;
  sort?: boolean;
  dropdownConfig?: {
    visible: boolean;
    content: React.ReactNode;
  };
};
export type RowsType = any[];
export type TableProps = {
  cols?: ColsType[];
  rows?: any[];
};

const Table: React.FC<TableProps> = (props) => {
  const [rows, setRows] = useState<RowsType[]>([]);
  const [sorted, setSorted] = useState({ sorted: "id", reversed: false });

  useEffect(() => {
    setRows(props.rows ?? []);
  }, [props.rows]);

  useEffect(() => {}, [rows]);

  const renderArrow = (id: string) => {
    if (sorted.reversed) {
      return (
        <button className="sort-icon" onClick={() => sortByKey(id)}>
          <FaSortAmountUpAlt />
        </button>
      );
    }
    return (
      <button className="sort-icon" onClick={() => sortByKey(id)}>
        <FaSortAmountDownAlt />
      </button>
    );
  };

  const sortByKey = (key: string) => {
    const copiedRows = [...(rows ?? [])];
    copiedRows.sort((rowA: any, rowB: any) => {
      const keyA: string = `${rowA[key]}`;
      const keyB: string = `${rowB[key]}`;
      if (sorted.reversed) {
        return keyB.localeCompare(keyA);
      }
      return keyA.localeCompare(keyB);
    });
    setRows(copiedRows);
    setSorted({ sorted: key, reversed: !sorted.reversed });
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {props.cols?.map((col, index) => {
              return (
                <th
                  key={index}
                  onClick={() => (col.sort ? sortByKey(col.id) : null)}
                  className={`th-head ${col.sort ? "sort" : ""}`}
                >
                  {col.dropdownConfig?.visible ? (
                    <div className="dropdown-content">
                      {col.dropdownConfig.content}
                    </div>
                  ) : null}
                  <span>
                    {col.label}{" "}
                    {col.dropdownConfig?.visible ? (
                      <span className="hover-instruction">
                        Hover to show dropdown
                      </span>
                    ) : null}
                  </span>
                  {col.sort
                    ? sorted.sorted === col.id
                      ? renderArrow(col.id.toString())
                      : null
                    : null}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={props.cols?.length}>
                <NoInformationToDisplay showNull={true} />
              </td>
            </tr>
          ) : (
            rows?.map((row: any, index) => {
              return (
                <tr key={index}>
                  {props.cols?.map((col: any, index) => {
                    return (
                      <td key={index}>
                        <span>{row[col.id]}</span>
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
