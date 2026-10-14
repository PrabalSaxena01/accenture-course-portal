# Module 09: Similar Questions SQL , HTML , JS

**Total Questions in Module**: 30  
**Category**: Web & Database Tech  
**Syllabus Items**: 5 lessons

---

### Q1. [SQL Mock-1] Question 1

*Quiz Set: SQL Mock-1* | *Type: exam_question*

**Question Statement:**
```
products priced above average.
```

**Options:**
- A) Contradictory hypothesis to SELECT * FROM Products WH
- B) SELECT * FROM Products WHERE Price > (SELECT AVG(Price) FROM Products);
- C) Both A and B
- D) Legacy standard alternative

**✅ Correct Answer:** `B) SELECT * FROM Products WHERE Price > (SELECT AVG(Price) FROM Products);`

**💡 Explanation & Solution Walkthrough:**
Verified Accenture placement test pattern.

---

### Q2. [SQL Mock-1] Question 2

*Quiz Set: SQL Mock-1* | *Type: exam_question*

**Question Statement:**
```
Furniture products, price descending.
```

**Options:**
- A) Contradictory hypothesis to ... WHERE Category = 'Fur
- B) Both A and B
- C) Legacy standard alternative
- D) ... WHERE Category = 'Furniture' ORDER BY Price DESC;

**✅ Correct Answer:** `D) ... WHERE Category = 'Furniture' ORDER BY Price DESC;`

**💡 Explanation & Solution Walkthrough:**
Verified Accenture placement test pattern.

---

### Q3. [SQL Mock-1] Question 3

*Quiz Set: SQL Mock-1* | *Type: exam_question*

**Question Statement:**
```
product names containing "Table".
```

**Options:**
- A) Both A and B
- B) ... WHERE Product_Name LIKE '%Table%';
- C) Legacy standard alternative
- D) Contradictory hypothesis to ... WHERE Product_Name LI

**✅ Correct Answer:** `B) ... WHERE Product_Name LIKE '%Table%';`

**💡 Explanation & Solution Walkthrough:**
Verified Accenture placement test pattern.

---

### Q4. [SQL Mock-1] Question 4

*Quiz Set: SQL Mock-1* | *Type: exam_question*

**Question Statement:**
```
products within 20% of max price.
```

**Options:**
- A) Both A and B
- B) ... WHERE Price >= 0.8 * (SELECT MAX(Price) FROM Products);
- C) Legacy standard alternative
- D) Contradictory hypothesis to ... WHERE Price >= 0.8 * 

**✅ Correct Answer:** `B) ... WHERE Price >= 0.8 * (SELECT MAX(Price) FROM Products);`

**💡 Explanation & Solution Walkthrough:**
Verified Accenture placement test pattern.

---

### Q5. [SQL Mock-1] Question 5

*Quiz Set: SQL Mock-1* | *Type: exam_question*

**Question Statement:**
```
products priced as multiple of 5000.
```

**Options:**
- A) Contradictory hypothesis to ... WHERE Price % 5000 = 
- B) Both A and B
- C) ... WHERE Price % 5000 = 0;
- D) Legacy standard alternative

**✅ Correct Answer:** `C) ... WHERE Price % 5000 = 0;`

**💡 Explanation & Solution Walkthrough:**
Verified Accenture placement test pattern.

---

### Q6. [SQL Mock-1] Question 6

*Quiz Set: SQL Mock-1* | *Type: exam_question*

**Question Statement:**
```
FIRST_NAME uppercased with alias.
```

**Options:**
- A) Both A and B
- B) SELECT upper(FIRST_NAME) as STUDENT_NAME from Student;
- C) Legacy standard alternative
- D) Contradictory hypothesis to SELECT upper(FIRST_NAME) 

**✅ Correct Answer:** `B) SELECT upper(FIRST_NAME) as STUDENT_NAME from Student;`

**💡 Explanation & Solution Walkthrough:**
Verified Accenture placement test pattern.

---

### Q7. [SQL Mock-1] Question 7

*Quiz Set: SQL Mock-1* | *Type: exam_question*

**Question Statement:**
```
unique MAJOR values.
```

**Options:**
- A) Legacy standard alternative
- B) SELECT DISTINCT MAJOR from STUDENT;
- C) Both A and B
- D) Contradictory hypothesis to SELECT DISTINCT MAJOR fro

**✅ Correct Answer:** `B) SELECT DISTINCT MAJOR from STUDENT;`

**💡 Explanation & Solution Walkthrough:**
Verified Accenture placement test pattern.

---

### Q8. [SQL Mock-1] Question 8

*Quiz Set: SQL Mock-1* | *Type: exam_question*

**Question Statement:**
```
unique MAJOR values + their length.
```

**Options:**
- A) Both A and B
- B) Contradictory hypothesis to SELECT MAJOR,LENGTH(MAJOR
- C) SELECT MAJOR,LENGTH(MAJOR) FROM Student GROUP BY(MAJOR);
- D) Legacy standard alternative

**✅ Correct Answer:** `C) SELECT MAJOR,LENGTH(MAJOR) FROM Student GROUP BY(MAJOR);`

**💡 Explanation & Solution Walkthrough:**
Verified Accenture placement test pattern.

---

### Q9. [SQL Mock-1] Question 9

*Quiz Set: SQL Mock-1* | *Type: exam_question*

**Question Statement:**
```
FIRST_NAME with 'a'→'A'.
```

**Options:**
- A) Contradictory hypothesis to SELECT REPLACE(FIRST_NAME
- B) SELECT REPLACE(FIRST_NAME, 'a', 'A') FROM Student;
- C) Legacy standard alternative
- D) Both A and B

**✅ Correct Answer:** `B) SELECT REPLACE(FIRST_NAME, 'a', 'A') FROM Student;`

**💡 Explanation & Solution Walkthrough:**
Verified Accenture placement test pattern.

---

### Q10. [SQL Mock-1] Question 10

*Quiz Set: SQL Mock-1* | *Type: exam_question*

**Question Statement:**
```
count of 'Computer Science' majors.
```

**Options:**
- A) Both A and B
- B) Contradictory hypothesis to SELECT Major, COUNT(*) as
- C) SELECT Major, COUNT(*) as TOTAL_COUNT FROM Student WHERE MAJOR = 'Computer Science';
- D) Legacy standard alternative

**✅ Correct Answer:** `C) SELECT Major, COUNT(*) as TOTAL_COUNT FROM Student WHERE MAJOR = 'Computer Science';`

**💡 Explanation & Solution Walkthrough:**
Verified Accenture placement test pattern.

---

### Q11. [SQL Mock-1] Question 11

*Quiz Set: SQL Mock-1* | *Type: exam_question*

**Question Statement:**
```
error in "SELECT Name, NULLIF(Age, 30) FROM Employees WHERE Age IS NOT NULL;".
```

**Options:**
- A) Legacy standard alternative
- B) Both A and B
- C) Remove 'WHERE Age IS NOT NULL'
- D) Contradictory hypothesis to Remove 'WHERE Age IS NOT 

**✅ Correct Answer:** `C) Remove 'WHERE Age IS NOT NULL'`

**💡 Explanation & Solution Walkthrough:**
unnecessary.

---

### Q12. [SQL Mock-1] Question 12

*Quiz Set: SQL Mock-1* | *Type: exam_question*

**Question Statement:**
```
main use of CASE.
```

**Options:**
- A) if-then-else logic
- B) Legacy standard alternative
- C) Contradictory hypothesis to if-then-else logic
- D) Both A and B

**✅ Correct Answer:** `A) if-then-else logic`

**💡 Explanation & Solution Walkthrough:**
conditional queries.

---

### Q13. [SQL Mock-1] Question 13

*Quiz Set: SQL Mock-1* | *Type: exam_question*

**Question Statement:**
```
fix "SELECT CURRENT_DATE FROM Employees;".
```

**Options:**
- A) Legacy standard alternative
- B) Contradictory hypothesis to Remove 'FROM Employees'
- C) Both A and B
- D) Remove 'FROM Employees'

**✅ Correct Answer:** `D) Remove 'FROM Employees'`

**💡 Explanation & Solution Walkthrough:**
unnecessary for this function.

---

### Q14. [SQL Mock-1] Question 14

*Quiz Set: SQL Mock-1* | *Type: exam_question*

**Question Statement:**
```
fix "SELECT Name, AGE(BirthDate) AS Age FROM Customers;".
```

**Options:**
- A) GE — not standard; combine other date functions
- B) Alternative configuration A for GE — not standard; c
- C) Standard default parameter
- D) None of the listed implementations

**✅ Correct Answer:** `A) GE — not standard; combine other date functions`

**💡 Explanation & Solution Walkthrough:**
Verified Accenture placement test pattern.

---

### Q15. [SQL Mock-1] Question 15

*Quiz Set: SQL Mock-1* | *Type: exam_question*

**Question Statement:**
```
fix "SELECT CONCAT(FirstName, ' ', LastName) FROM Employees;".
```

**Options:**
- A) dd 'AS FullName' for clarity
- B) Alternative configuration A for dd 'AS FullName' for
- C) Standard default parameter
- D) None of the listed implementations

**✅ Correct Answer:** `A) dd 'AS FullName' for clarity`

**💡 Explanation & Solution Walkthrough:**
Verified Accenture placement test pattern.

---

### Q16. [SQL Mock-2] Question 1

*Quiz Set: SQL Mock-2* | *Type: exam_question*

**Question Statement:**
```
scholarship recipients + name, amount, date.
```

**Options:**
- A) Contradictory hypothesis to INNER JOIN on STUDENT_ID 
- B) INNER JOIN on STUDENT_ID = STUDENT_REF_ID
- C) Legacy standard alternative
- D) Both A and B

**✅ Correct Answer:** `B) INNER JOIN on STUDENT_ID = STUDENT_REF_ID`

**💡 Explanation & Solution Walkthrough:**
only matching recipients.

---

### Q17. [SQL Mock-2] Question 2

*Quiz Set: SQL Mock-2* | *Type: exam_question*

**Question Statement:**
```
all students with scholarship amount or NULL.
```

**Options:**
- A) LEFT JOIN
- B) Both A and B
- C) Contradictory hypothesis to LEFT JOIN
- D) Legacy standard alternative

**✅ Correct Answer:** `A) LEFT JOIN`

**💡 Explanation & Solution Walkthrough:**
keeps all students.

---

### Q18. [SQL Mock-2] Question 3

*Quiz Set: SQL Mock-2* | *Type: exam_question*

**Question Statement:**
```
top 5 by GPA desc.
```

**Options:**
- A) Legacy standard alternative
- B) Both A and B
- C) SELECT * from Student ORDER BY GPA DESC LIMIT 5;
- D) Contradictory hypothesis to SELECT * from Student ORD

**✅ Correct Answer:** `C) SELECT * from Student ORDER BY GPA DESC LIMIT 5;`

**💡 Explanation & Solution Walkthrough:**
Verified Accenture placement test pattern.

---

### Q19. [SQL Mock-2] Question 4

*Quiz Set: SQL Mock-2* | *Type: exam_question*

**Question Statement:**
```
first 50% of records.
```

**Options:**
- A) SELECT * FROM Student LIMIT (SELECT COUNT(*) FROM Student) / 2;
- B) Legacy standard alternative
- C) Both A and B
- D) Contradictory hypothesis to SELECT * FROM Student LIM

**✅ Correct Answer:** `A) SELECT * FROM Student LIMIT (SELECT COUNT(*) FROM Student) / 2;`

**💡 Explanation & Solution Walkthrough:**
Verified Accenture placement test pattern.

---

### Q20. [SQL Mock-2] Question 5

*Quiz Set: SQL Mock-2* | *Type: exam_question*

**Question Statement:**
```
current date and time.
```

**Options:**
- A) Both A and B
- B) Legacy standard alternative
- C) SELECT NOW();
- D) Contradictory hypothesis to SELECT NOW();

**✅ Correct Answer:** `C) SELECT NOW();`

**💡 Explanation & Solution Walkthrough:**
CURDATE is date-only.

---

### Q21. [SQL Mock-2] Question 6

*Quiz Set: SQL Mock-2* | *Type: exam_question*

**Question Statement:**
```
clone table structure + data.
```

**Options:**
- A) REATE TABLE CloneTable AS GET * FROM Student;
- B) REATE TABLE CloneTable AS SELECT * FROM Student;
- C) REATE TABLE CloneTable AS SELECT * FROM Student;
- D) REATE TABLE CloneTable AS SELECT * FROM Student;

**✅ Correct Answer:** `C) REATE TABLE CloneTable AS SELECT * FROM Student;`

**💡 Explanation & Solution Walkthrough:**
Verified Accenture placement test pattern.

---

### Q22. [SQL Mock-2] Question 7

*Quiz Set: SQL Mock-2* | *Type: exam_question*

**Question Statement:**
```
student details with program names.
```

**Options:**
- A) Both A and B
- B) Contradictory hypothesis to JOIN Student s / Program 
- C) JOIN Student s / Program p ON s.STUDENT_ID = p.STUDENT_REF_ID
- D) Legacy standard alternative

**✅ Correct Answer:** `C) JOIN Student s / Program p ON s.STUDENT_ID = p.STUDENT_REF_ID`

**💡 Explanation & Solution Walkthrough:**
Verified Accenture placement test pattern.

---

### Q23. [SQL Mock-2] Question 8

*Quiz Set: SQL Mock-2* | *Type: exam_question*

**Question Statement:**
```
scholarship recipients with amounts.
```

**Options:**
- A) Contradictory hypothesis to SELECT s.STUDENT_ID, s.FI
- B) Both A and B
- C) SELECT s.STUDENT_ID, s.FIRST_NAME, s.LAST_NAME, sc.SCHOLARSHIP_AMOUNT FROM Student s JOIN Scholarship sc ON s.STUDENT_ID = sc.STUDENT_REF_ID;
- D) Legacy standard alternative

**✅ Correct Answer:** `C) SELECT s.STUDENT_ID, s.FIRST_NAME, s.LAST_NAME, sc.SCHOLARSHIP_AMOUNT FROM Student s JOIN Scholarship sc ON s.STUDENT_ID = sc.STUDENT_REF_ID;`

**💡 Explanation & Solution Walkthrough:**
Verified Accenture placement test pattern.

---

### Q24. [SQL Mock-2] Question 9

*Quiz Set: SQL Mock-2* | *Type: exam_question*

**Question Statement:**
```
names + program + scholarship (only students having both).
```

**Options:**
- A) Both A and B
- B) Legacy standard alternative
- C) triple INNER JOIN of Student, Program, Scholarship
- D) Contradictory hypothesis to triple INNER JOIN of Stud

**✅ Correct Answer:** `C) triple INNER JOIN of Student, Program, Scholarship`

**💡 Explanation & Solution Walkthrough:**
Verified Accenture placement test pattern.

---

### Q25. [SQL Mock-2] Question 10

*Quiz Set: SQL Mock-2* | *Type: exam_question*

**Question Statement:**
```
students in a program with no scholarship.
```

**Options:**
- A) Legacy standard alternative
- B) Contradictory hypothesis to LEFT JOIN ... WHERE sc.ST
- C) Both A and B
- D) LEFT JOIN ... WHERE sc.STUDENT_REF_ID IS NULL

**✅ Correct Answer:** `D) LEFT JOIN ... WHERE sc.STUDENT_REF_ID IS NULL`

**💡 Explanation & Solution Walkthrough:**
Verified Accenture placement test pattern.

---

### Q26. [SQL Mock-2] Question 11

*Quiz Set: SQL Mock-2* | *Type: exam_question*

**Question Statement:**
```
GPA + scholarship amount for holders.
```

**Options:**
- A) Contradictory hypothesis to SELECT s.FIRST_NAME, s.LA
- B) Both A and B
- C) Legacy standard alternative
- D) SELECT s.FIRST_NAME, s.LAST_NAME, s.GPA, sc.SCHOLARSHIP_AMOUNT FROM Student s JOIN Scholarship sc ON s.STUDENT_ID = sc.STUDENT_REF_ID;

**✅ Correct Answer:** `D) SELECT s.FIRST_NAME, s.LAST_NAME, s.GPA, sc.SCHOLARSHIP_AMOUNT FROM Student s JOIN Scholarship sc ON s.STUDENT_ID = sc.STUDENT_REF_ID;`

**💡 Explanation & Solution Walkthrough:**
Verified Accenture placement test pattern.

---

### Q27. [SQL Mock-2] Question 12

*Quiz Set: SQL Mock-2* | *Type: exam_question*

**Question Statement:**
```
fix "SELECT CEILING(Price) AS RoundedPrice FROM Products WHERE Price > 0;".
```

**Options:**
- A) Remove 'WHERE Price > 0'
- B) Contradictory hypothesis to Remove 'WHERE Price > 0'
- C) Legacy standard alternative
- D) Both A and B

**✅ Correct Answer:** `A) Remove 'WHERE Price > 0'`

**💡 Explanation & Solution Walkthrough:**
unnecessary.

---

### Q28. [SQL Mock-2] Question 13

*Quiz Set: SQL Mock-2* | *Type: exam_question*

**Question Statement:**
```
SQUARE vs POWER.
```

**Options:**
- A) SQUARE = square; POWER = any exponent
- B) Both A and B
- C) Contradictory hypothesis to SQUARE = square; POWER = 
- D) Legacy standard alternative

**✅ Correct Answer:** `A) SQUARE = square; POWER = any exponent`

**💡 Explanation & Solution Walkthrough:**
Verified Accenture placement test pattern.

---

### Q29. [SQL Mock-2] Question 14

*Quiz Set: SQL Mock-2* | *Type: exam_question*

**Question Statement:**
```
what CEILING does.
```

**Options:**
- A) Legacy standard alternative
- B) Both A and B
- C) smallest integer ≥ the number
- D) Contradictory hypothesis to smallest integer ≥ the nu

**✅ Correct Answer:** `C) smallest integer ≥ the number`

**💡 Explanation & Solution Walkthrough:**
Verified Accenture placement test pattern.

---

### Q30. [SQL Mock-2] Question 15

*Quiz Set: SQL Mock-2* | *Type: exam_question*

**Question Statement:**
```
fix FULL OUTER JOIN with "WHERE Departments.DepartmentName IS NULL".
```

**Options:**
- A) Contradictory hypothesis to Remove the WHERE
- B) Remove the WHERE
- C) Legacy standard alternative
- D) Both A and B

**✅ Correct Answer:** `B) Remove the WHERE`

**💡 Explanation & Solution Walkthrough:**
undermines the full outer join.

---
