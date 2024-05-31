import PurpleHalo from "./PurpleHalo";

export default function PurpleHaloGroup({ hiddenIds }: { hiddenIds?: number[] }) {
  return (
    <div className="opacity-50">
      <PurpleHalo
        style={{
          marginLeft: "40vw",
          top: "40vh",
        }}
        id={1}
        hiddenIds={hiddenIds}
      />
      <PurpleHalo
        style={{
          marginLeft: "90vw",
          top: "80vh",
          zIndex: 20,
        }}
        id={2}
        hiddenIds={hiddenIds}
      />
      <PurpleHalo
        style={{
          marginLeft: "-15vw",
          top: "100vh",
          zIndex: 20,
        }}
        id={3}
        hiddenIds={hiddenIds}
      />
      <PurpleHalo
        style={{
          marginLeft: "40vw",
          top: "160vh",
        }}
        id={4}
        hiddenIds={hiddenIds}
      />
      <PurpleHalo
        style={{
          marginLeft: "-5vw",
          top: "220vh",
        }}
        id={5}
        hiddenIds={hiddenIds}
      />
    </div>
  );
}
