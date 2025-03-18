const SortButton = ({ sortTodos }) => {
  return (
    <select className="sort-todo" onChange={(e) => sortTodos(e.target.value)}>
      <option value="default">Sort by default </option>
      <option value="alphabetical">A - Z </option>
      <option value="reverse">Z - A</option>
      <option value="date">Date</option>
      <option value="completed">Completed</option>
      <option value="incompleted">Incompleted</option>
    </select>
  );
};
export default SortButton;
