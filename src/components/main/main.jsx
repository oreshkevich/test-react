import cards from "../../db/products.json";
import { Card } from "../card/card";
import "./main.scss";
import { CheckBoxList } from "../check-box-list/check-box-list";
import { Pagination } from "../pagination/pagination";

import { useState, useEffect } from "react";

const Main = ({ addToOrder }) => {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [cardFilterCheck, setCardFilterCheck] = useState(cards);
  const [onShow, setOnShow] = useState(true);

  const clickHide = (change) => {
    setOnShow(change);
  };
  const handleCheckedBrand = (checkedList) => {
    setFilteredPosts(checkedList);
  };
  const handleSort = () => {
    const cardArrCheck = filteredPosts.filter((elem) => elem.checked);
    const cardFilter = cardArrCheck.map((a) => a.id);
    const cardsFilter = cards.filter((item) => cardFilter.includes(item.id));
    setCardFilterCheck(cardsFilter);
    clickHide(false);
  };

  const handleThrow = () => {
    setCardFilterCheck(cards);
    clickHide(true);
    updateVisible(currentPage);
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [pageCountSize, setPageCountSize] = useState(1);

  const pageSize = 6;

  const pageCount = () => {
    let lengthTodos = cards.length,
      lengthPageSize = pageSize;
    setPageCountSize(Math.ceil(lengthTodos / lengthPageSize));
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const updateVisible = (currentPage) => {
    const start = currentPage * pageSize,
      end = start + pageSize;
    let sizeUpdate = cards.slice(start, end);

    setCardFilterCheck(sizeUpdate);
  };

  useEffect(() => {
    pageCount();
    updateVisible(currentPage);
  }, [currentPage]);
  return (
    <div className="grid">
      <div>
        <h2>Бренды</h2>

        <CheckBoxList handleCheckedBrand={handleCheckedBrand} />
        <div className="button-wrap">
          <button onClick={handleSort} className="button">
            Применить
          </button>
          <button onClick={handleThrow} className="button-throw">
            х Сбросить
          </button>
        </div>
      </div>
      <div className="card">
        <div className="card__wrap">
          {cardFilterCheck.map((value) => (
            <Card key={value.id} {...value} addToOrder={addToOrder} />
          ))}
        </div>
        {onShow && (
          <Pagination
            currentPage={currentPage}
            prevPage={prevPage}
            pageCountSize={pageCountSize}
            nextPage={nextPage}
          />
        )}
      </div>
    </div>
  );
};

export { Main };
