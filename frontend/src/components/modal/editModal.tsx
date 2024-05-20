import { useZustandStore } from "../../data/data";
import { status } from "../../utils/sortStatusData";

export const EditModal = () => {
  const popup = useZustandStore((state) => state.popup);

  const data = useZustandStore((state) => state.data);
  const setData = useZustandStore((state) => state.setData);

  const rawData = useZustandStore((state) => state.rawData);

  const popupData = popup.data;

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "start",
      }}
    >
      <div>
        <select
          name="status"
          id="status"
          onChange={(e) => {
            const index = data.findIndex((d) => d.id === popupData.id);
            const newData = [...data];
            newData[index].status = e.target.value;
            setData(newData);
            const indexRaw = rawData.findIndex((d) => d.id === popupData.id);
            const newRawData = [...rawData];
            newRawData[indexRaw].status = e.target.value;
          }}
        >
          {status.map((s) => {
            return (
              <option key={s.name} value={s.name}>
                {s.name}
              </option>
            );
          })}
        </select>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <p
            style={{
              color: "gray",
              fontWeight: "bold",
            }}
          >{`ID :`}</p>{" "}
          {popupData?.id}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <p
            style={{
              color: "gray",
              fontWeight: "bold",
            }}
          >{`Description :`}</p>{" "}
          {popupData?.description}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <p
            style={{
              color: "gray",
              fontWeight: "bold",
            }}
          >{`Updated At :`}</p>
          {popupData?.updated_at}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <p
            style={{
              color: "gray",
              fontWeight: "bold",
            }}
          >{`Created At :`}</p>{" "}
          {popupData?.created_at}
        </div>
      </div>
    </div>
  );
};
