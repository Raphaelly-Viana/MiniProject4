import BookList from "../Components/bookList";

 function BookListPage() {
  return (
    <div className="page-container">
            <p className="page-subtitle">Our Collection</p>
      <BookList />
    </div>
  );
}

export default BookListPage