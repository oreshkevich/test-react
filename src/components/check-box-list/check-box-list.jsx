import { useState } from "react";
import brands from "../../db/brands.json";
import "./check-box-list.scss";
// import { IBrands } from "../../interface/IBrands";

function uncheckAll(brands) {
  return brands.map((option) => ({
    ...option,
    checked: false,
  }));
}

function toggleOption(brands, id, checked) {
  return brands.map((option) =>
    option.id === id ? { ...option, checked } : option
  );
}

const CheckBoxList = (props) => {
  const { handleCheckedBrand } = props;
  const [checkedList, setCheckedList] = useState(uncheckAll(brands));

  handleCheckedBrand(checkedList);
  const changeList = (id, checked) => {
    setCheckedList((checkedList) => toggleOption(checkedList, id, checked));
  };

  return (
    <form>
      {checkedList.map(({ id, title, checked }) => (
        <div className="checked-list" key={id}>
          <label className="checkbox-other">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => changeList(id, e.target.checked)}
            />
            <span> {title}</span>
          </label>
        </div>
      ))}
    </form>
  );
};
export { CheckBoxList };
