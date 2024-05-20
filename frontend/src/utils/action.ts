// https://js.devexpress.com/React/Demos/WidgetsGallery/Demo/DataGrid/EditStateManagement/MaterialBlueLight/
import React from "react";
import { sendRequest } from "./sendRequest";
import { Todo } from "../../../backend/src/types/todoTypes";

const URL = "http://localhost:3001/api/database/post/getJobListWithFilter";

export const FETCH_PENDING = "FETCH_PENDING";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_ERROR = "FETCH_ERROR";
export const SAVING_PENDING = "SAVING_PENDING";
export const SAVING_SUCCESS = "SAVING_SUCCESS";
export const SAVING_ERROR = "SAVING_ERROR";
export const SAVING_CANCEL = "SAVING_CANCEL";
export const SET_CHANGES = "SET_CHANGES";
export const SET_EDIT_ROW_KEY = "SET_EDIT_ROW_KEY";

type dispatchType = React.Dispatch<{ type: any; payload?: any }>;

export async function loadOrders(dispatch: dispatchType) {
  dispatch({ type: FETCH_PENDING });

  try {
    const tempData = localStorage.getItem("data");
    if (tempData) {
      dispatch({
        type: FETCH_SUCCESS,
        payload: {
          data: JSON.parse(tempData),
        },
      });
    }

    const { data } = (await sendRequest(`${URL}`, "POST")) as {
      data: { value: Todo[] };
    };
    const value = data.value;

    dispatch({
      type: FETCH_SUCCESS,
      payload: {
        data: value,
      },
    });
    localStorage.setItem("data", JSON.stringify(value));
  } catch (err) {
    console.error(err);
  }
}

export async function saveChange(
  dispatch: dispatchType,
  change: { type: any; data: any; key: any; insertBeforeKey?: any }
) {
  if (change && change.type) {
    let data;

    dispatch({ type: SAVING_PENDING });

    try {
      data = await sendChange(change);

      change.data = data;
      dispatch({
        type: SAVING_SUCCESS,
        payload: {
          change,
        },
      });

      return data;
    } catch (err) {
      dispatch({ type: SAVING_ERROR });
      throw err;
    }
  } else {
    dispatch({ type: SAVING_CANCEL });
    return null;
  }
}

async function sendChange(change: {
  type: any;
  data: any;
  key: any;
  insertBeforeKey?: any;
  insertAfterKey?: any;
}) {
  switch (change.type) {
    case "insert":
      // const formData = new FormData(change.data);

      return sendRequest(
        "http://localhost:3001/api/database/post/createJobListWithFilter",
        "POST",
        {
          values: JSON.stringify({
            description: change.data?.description,
            status: change.data?.status || "Trivial",
          }),
        }
      );
    case "update":
      return sendRequest(
        "http://localhost:3001/api/database/post/editJobListWithFilter",
        "POST",
        {
          values: {
            ...change.key,
            ...change.data,
            updated_at: new Date().toISOString(),
          },
        }
      );
    case "remove":
      return sendRequest(
        "http://localhost:3001/api/database/post/removeJobListWithFilter",
        "POST",
        {
          values: {
            ...change.key,
            ...change.data,
            updated_at: new Date().toISOString(),
          },
        }
      );

    default:
      return null;
  }
}

export function setChanges(dispatch: dispatchType, changes: any) {
  dispatch({
    type: SET_CHANGES,
    payload: changes,
  });
}

export function setEditRowKey(dispatch: dispatchType, editRowKey: any) {
  dispatch({
    type: SET_EDIT_ROW_KEY,
    payload: editRowKey,
  });
}
