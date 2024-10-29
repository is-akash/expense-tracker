// src/context/index.ts
import { useContext } from "react";
import { Context } from "./AppContext";

const useProjectContext = () => useContext(Context);

export { useProjectContext };
