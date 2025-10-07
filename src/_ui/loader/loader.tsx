import type { CSSProperties } from "react";
import { GridLoader } from "react-spinners";

export function Loader({ loading }: { loading: boolean }) {
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#c0a063",
  };
  return (
    <GridLoader color="#c0a063" loading={loading} cssOverride={override} />
  );
}
