package com.example.bookmanagement.repository;
 
import java.util.List;
 
import org.springframework.data.jpa.repository.JpaRepository;
 
import com.example.bookmanagement.model.Book;
 
public interface BookRepository extends JpaRepository<Book, Long> {
 
    List<Book> findByPublishedYear(int publishedYear);
}