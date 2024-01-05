import { useSearchParams } from "react-router-dom";
export function UseUrlPosition() {
  const [searchParm] = useSearchParams();
  const lat = searchParm.get("lat");
  const lng = searchParm.get("lng");
  return [lat, lng];
}
