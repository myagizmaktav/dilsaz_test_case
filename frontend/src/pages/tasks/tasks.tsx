import React, { Dispatch, useCallback, useEffect, useReducer } from "react";
import "devextreme/data/odata/store";
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  Lookup,
  Editing,
  Form,
  Popup,
  DataGridTypes,
} from "devextreme-react/data-grid";

import {
  saveChange,
  loadOrders,
  setChanges,
  setEditRowKey,
} from "../../utils/action";
import reducer, { State } from "../../utils/reducer";

const initialState: State = {
  data: [],
  changes: [],
  editRowKey: null,
  isLoading: false,
};

export default function Task() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    loadOrders(dispatch as Dispatch<{ type: any; payload?: any }>);
  }, []);

  const onSaving = useCallback(async (e: DataGridTypes.SavingEvent) => {
    e.cancel = true;
    const changes = e.changes[0];
    await saveChange(
      dispatch as Dispatch<{ type: any; payload?: any }>,
      changes
    );
    loadOrders(dispatch as Dispatch<{ type: any; payload?: any }>);
  }, []);
  const onChangesChange = useCallback((changes: DataGridTypes.DataChange[]) => {
    setChanges(dispatch as Dispatch<{ type: any; payload?: any }>, changes);
  }, []);

  const onEditRowKeyChange = useCallback((editRowKey: any) => {
    setEditRowKey(
      dispatch as Dispatch<{ type: any; payload?: any }>,
      editRowKey
    );
  }, []);

  return (
    <React.Fragment>
      <h2 className={"content-block"}>Görevler</h2>

      <DataGrid
        className={"dx-card wide-card"}
        dataSource={state.data}
        onSaving={onSaving}
        showBorders={false}
        focusedRowEnabled={true}
        defaultFocusedRowIndex={0}
        columnAutoWidth={true}
        columnHidingEnabled={true}
        onRowInserting={function (e) {
          e.data.id = Math.random();
          e.data.created_at = new Date().toISOString();
          e.data.updated_at = new Date().toISOString();
        }}
        onEditorPreparing={function (e) {
          if (e.parentType === "dataRow" && e.dataField === "id") {
            // https://supportcenter.devexpress.com/ticket/details/t638658/how-to-disable-editing-of-a-cell-after-changing-another-cell-of-lookup-editor-s-value
            e.editorOptions.disabled = true;
          }
          if (e.parentType === "dataRow" && e.dataField === "created_at") {
            e.editorOptions.disabled = true;
          }
          if (e.parentType === "dataRow" && e.dataField === "updated_at") {
            e.editorOptions.disabled = true;
          }

          if (e.parentType === "dataRow" && e.dataField === "description") {
            if (e.row && !e.row.isNewRow) {
              e.editorOptions.disabled = true;
            }
          }

          return;
        }}
      >
        <Paging defaultPageSize={10} />
        <Pager showPageSizeSelector={true} showInfo={true} />
        <FilterRow visible={true} />

        <Column dataField={"id"} width={90} hidingPriority={2} />
        <Column
          dataField={"description"}
          width={190}
          caption={"Açıklama"}
          hidingPriority={8}
          calculateCellValue={(e) => {
            if (e?.description?.length > 255) {
              return e.description.substring(0, 255);
            }

            return e.description;
          }}
        />
        <Column
          dataField={"status"}
          caption={"Durum"}
          hidingPriority={9}
          cellRender={(e) => {
            if (e.data.status === "Urgent") {
              return (
                <span
                  style={{
                    color: "#fff",
                    background: "red",
                    padding: 5,
                    borderRadius: 5,
                  }}
                >
                  {e.data.status}
                </span>
              );
            }
            if (e.data.status === "Regular") {
              return (
                <span
                  style={{
                    color: "#fff",
                    background: "orange",
                    padding: 5,
                    borderRadius: 5,
                  }}
                >
                  {e.data.status}
                </span>
              );
            }
            if (e.data.status === "Trivial") {
              return (
                <span
                  style={{
                    color: "#fff",
                    background: "blue",
                    padding: 5,
                    borderRadius: 5,
                  }}
                >
                  {e.data.status}
                </span>
              );
            }
            return <span>{e.data.status}</span>;
          }}
          calculateCellValue={(e) => {
            if (e?.status === "Urgent") {
              return "Urgent";
            }
            if (e?.status === "Regular") {
              return "Regular";
            }
            if (e?.status === "Trivial") {
              return "Trivial";
            }
            return "Trivial";
          }}
        >
          <Lookup
            dataSource={priorities}
            valueExpr={"name"}
            displayExpr={"name"}
          />
        </Column>
        <Column
          dataField={"created_at"}
          caption={"Oluşturulma Tarihi"}
          dataType={"date"}
          hidingPriority={10}
        />
        <Column
          dataField={"updated_at"}
          caption={"Güncellenme Tarihi"}
          dataType={"date"}
          hidingPriority={11}
        />

        <Editing
          mode="popup"
          allowUpdating={true}
          allowDeleting={true}
          allowAdding={true}
          changes={state.changes}
          onChangesChange={onChangesChange}
          editRowKey={state.editRowKey}
          onEditRowKeyChange={onEditRowKeyChange}
          confirmDelete={true}
        >
          <Form labelLocation="top" />
          <Popup showTitle={true} title="Row in the editing state" />
        </Editing>
      </DataGrid>
    </React.Fragment>
  );
}

const priorities = [
  { name: "Urgent", value: 4 },
  { name: "Trivial", value: 2 },
  { name: "Regular", value: 3 },
];
