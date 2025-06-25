use('plp_bookstore');

// ===== Task 2: Basic CRUD Operations =====

// 1. Find all books in the genre "Programming"
db.books.find({ genre: "Programming" });

// 2. Find books published after 2010
db.books.find({ published_year: { $gt: 2010 } });

// 3. Find books by author "Cal Newport"
db.books.find({ author: "Cal Newport" });

// 4. Update the price of "Sapiens" to 20.00
db.books.updateOne(
  { title: "Sapiens" },
  { $set: { price: 20.00 } }
);

// 5. Delete the book titled "1984"
db.books.deleteOne({ title: "1984" });


// ===== Task 3: Advanced Queries =====

// 6. Find books that are in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

// 7. Project only title, author, and price
db.books.find({}, { _id: 0, title: 1, author: 1, price: 1 });

// 8. Sort all books by price (ascending)
db.books.find().sort({ price: 1 });

// 9. Sort all books by price (descending)
db.books.find().sort({ price: -1 });

// 10. Pagination - Page 1 (5 books)
db.books.find().limit(5).skip(0);

// 11. Pagination - Page 2 (next 5 books)
db.books.find().limit(5).skip(5);


// ===== Task 4: Aggregation Pipeline =====

// 12. Calculate average price of books by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" }
    }
  }
]);

// 13. Find the author with the most books
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      totalBooks: { $sum: 1 }
    }
  },
  { $sort: { totalBooks: -1 } },
  { $limit: 1 }
]);

// 14. Group books by publication decade and count them
db.books.aggregate([
  {
    $project: {
      decade: { $concat: [ { $substr: [ "$published_year", 0, 3 ] }, "0s" ] }
    }
  },
  {
    $group: {
      _id: "$decade",
      count: { $sum: 1 }
    }
  }
]);


// ===== Task 5: Indexing =====

// 15. Create an index on the "title" field
db.books.createIndex({ title: 1 });

// 16. Create a compound index on "author" and "published_year"
db.books.createIndex({ author: 1, published_year: -1 });

// 17. Use explain() to check performance of indexed query
db.books.find({ title: "Deep Work" }).explain("executionStats");
