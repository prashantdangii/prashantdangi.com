export function SiteFoot({ year }) {
  const y = year ?? new Date().getFullYear();
  return <p className="quiet rail-foot">© {y} Prashant Dangi</p>;
}
