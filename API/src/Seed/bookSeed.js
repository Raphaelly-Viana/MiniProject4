const { addBook, getAllBooksFromService } = require("../Services/bookService");
const mongoose = require("mongoose");
const Book = require("../Models/booksModel");



let seedbooks = [
  { title: "The Hobbit", author: "J.R.R. Tolkien", category: "Fantasy", year: 1937, price: 19.99, image: "/images/the-hobbit.jpg" },
  { title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling", category: "Fantasy", year: 1997, price: 24.99, image: "/images/hp-stone.jpg" },
  { title: "Atomic Habits", author: "James Clear", category: "Self-Help", year: 2018, price: 17.5, image: "/images/atomic-habits.jpg" },
  { title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson", category: "Self-Help", year: 2016, price: 18.0, image: "/images/the-subtle-art.jpg" },
  { title: "The Pragmatic Programmer", author: "Andrew Hunt", category: "Technology", year: 1999, price: 39.9, image: "/images/the-pragmatic-programmer.jpg" },
  { title: "Clean Code", author: "Robert C. Martin", category: "Technology", year: 2008, price: 42.0, image: "/images/clean-code.jpg" },
  { title: "It Ends With Us", author: "Colleen Hoover", category: "Romance", year: 2016, price: 14.99, image: "/images/it-ends-with-us.jpg" },
  { title: "Pride and Prejudice", author: "Jane Austen", category: "Romance", year: 1813, price: 9.99, image: "/images/pride-and-prejudice.jpg" },
  { title: "The Girl on the Train", author: "Paula Hawkins", category: "Thriller", year: 2015, price: 14.5, image: "/images/the-girl-on-the-train.jpg" },
  { title: "Gone Girl", author: "Gillian Flynn", category: "Thriller", year: 2012, price: 15.2, image: "/images/gone-girl.jpg" },
  { title: "Sapiens", author: "Yuval Noah Harari", category: "History", year: 2011, price: 22.99, image: "/images/sapiens.jpg" },
  { title: "Educated", author: "Tara Westover", category: "Biography", year: 2018, price: 16.8, image: "/images/educated.jpg" },
  { title: "Harry Potter and the Chamber of Secrets", author: "J.K. Rowling", category: "Fantasy", year: 1998, price: 31.99, image: "/images/harry-potter.jpg" },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Fiction", year: 1925, price: 19.99, image: "/images/the-great-gatsby.jpg" },
  { title: "The Very Hungry Caterpillar", author: "Eric Carle", category: "Kids", year: 1969, price: 12.5, image: "/images/the-very-hungry-caterpillar.jpg" },
];


const seedBooks = async () => { 
    const books = await getAllBooksFromService();
  
    if  ( books.length == 0 ){
        await Promise.all(seedbooks.map(book => Book.create(book))); // promisse all return  a single promisses from a list of promisses.
  console.log("📚 Books seeds loaded!"); 
}
};


module.exports = seedBooks;

