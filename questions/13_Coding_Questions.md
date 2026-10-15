# Module 13: Coding Questions

**Total Questions in Module**: 10  
**Visual Diagrams**: 8 blueprints  
**Category**: Coding Questions  
**Syllabus Items**: 8 lessons

---

### Q1. [LINK] Web Compiler Link

*Quiz Set: Section 13 Interactive Coding Lab* | *Type: coding_lab*

**Question Statement:**
```
Task Scenario:
not a question. Embedded OneCompiler web IDE (HTML/CSS/JS live preview). Purpose: free compiler link for practice. No problem, no solution.

Objectives & Problem Context:
...
```

<details>
<summary>📸 <b>Tap to Reveal Visual Diagram (Spoiler)</b></summary>

![[LINK] Web Compiler Link](./images/code_superior_elements.svg)

</details>

**Options:**
- A) Implement optimal algorithm using standard libraries
- B) Brute-force nested loops O(N²)
- C) Recursive DFS without memoization
- D) Non-deterministic heuristic

<details>
<summary>🙈 <b>Tap to Reveal Answer &amp; Explanation (Spoiler)</b></summary>

> **✅ Correct Answer:** `A) Implement optimal algorithm using standard libraries`
>
> **💡 Explanation &amp; Walkthrough:**
> Optimal Solution Code & Walkthrough:
> ```
> Complete optimal code implementation provided.
> ```

</details>

---

### Q2. [ARTICLE] SQL - 1

*Quiz Set: Section 13 Interactive Coding Lab* | *Type: coding_lab*

**Question Statement:**
```
Task Scenario:
E-Commerce DB scenario (customers, orders, order_items with sample rows). Intent: list New York customers who bought more than 1 product in total across all orders, showing customer name, total spending, distinct-product count. Key approach: join three tables, filter city='New York', GROUP BY customer, HAVING SUM(quantity) > 1.

Objectives & Problem Context:
```sql
SELECT c.customer_name,
       SUM(oi.quantity * oi.price) AS total_spending,
       COUNT(DISTINCT oi.product_name) AS distinct_products
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
WHERE c.city = 'New York'
GROUP BY c.customer_id, c.customer_name
HAVING SUM(oi.quantity) > 1...
```

<details>
<summary>📸 <b>Tap to Reveal Visual Diagram (Spoiler)</b></summary>

![[ARTICLE] SQL - 1](./images/sql_orders_schema.svg)

</details>

**Options:**
- A) Implement optimal algorithm using standard libraries
- B) Brute-force nested loops O(N²)
- C) Recursive DFS without memoization
- D) Non-deterministic heuristic

<details>
<summary>🙈 <b>Tap to Reveal Answer &amp; Explanation (Spoiler)</b></summary>

> **✅ Correct Answer:** `A) Implement optimal algorithm using standard libraries`
>
> **💡 Explanation &amp; Walkthrough:**
> Optimal Solution Code & Walkthrough:
> ```
> SELECT c.customer_name,
>        SUM(oi.quantity * oi.price) AS total_spending,
>        COUNT(DISTINCT oi.product_name) AS distinct_products
> FROM customers c
> JOIN orders o ON c.customer_id = o.customer_id
> JOIN order_items oi ON o.order_id = oi.order_id
> WHERE c.city = 'New York'
> GROUP BY c.customer_id, c.customer_name
> HAVING SUM(oi.quantity) > 1;
> ```

</details>

---

### Q3. [CODE EXERCISE] Coding Mock Test - 14

*Quiz Set: Section 13 Interactive Coding Lab* | *Type: coding_lab*

**Question Statement:**
```
Task Scenario:
Story: Detective Reva's suspect hideouts numbered; only prime-numbered addresses suspicious. Intent: read limits L and R, print all primes between them inclusive; print "No primes found" if none. Sample: 10..20 → 11, 13, 17, 19. Key approach: trial-division primality per number in [L, R].

Objectives & Problem Context:
```python
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True
L, R = int(input()), int(input())
primes = [x for x in range(L, R + 1) if is_prime(x)]
print(", ".join(map(str, primes)) if primes else "No primes found")
```...
```

<details>
<summary>📸 <b>Tap to Reveal Visual Diagram (Spoiler)</b></summary>

![[CODE EXERCISE] Coding Mock Test - 14](./images/code_prime_sieve.svg)

</details>

**Options:**
- A) Implement optimal algorithm using standard libraries
- B) Brute-force nested loops O(N²)
- C) Recursive DFS without memoization
- D) Non-deterministic heuristic

<details>
<summary>🙈 <b>Tap to Reveal Answer &amp; Explanation (Spoiler)</b></summary>

> **✅ Correct Answer:** `A) Implement optimal algorithm using standard libraries`
>
> **💡 Explanation &amp; Walkthrough:**
> Optimal Solution Code & Walkthrough:
> ```
> def is_prime(n):
>     if n < 2:
>         return False
>     for i in range(2, int(n ** 0.5) + 1):
>         if n % i == 0:
>             return False
>     return True
> L, R = int(input()), int(input())
> primes = [x for x in range(L, R + 1) if is_prime(x)]
> print(", ".join(map(str, primes)) if primes else "No primes found")
> ```

</details>

---

### Q4. [ARTICLE] Web Based

*Quiz Set: Section 13 Interactive Coding Lab* | *Type: coding_lab*

**Question Statement:**
```
Task Scenario:
Screenshot of Mercer/Mettl-style web task: build/fix a chatbot widget. Objectives: (a) make the welcome message a bot message (add `bot-message` class); (b) user chat color #cfe2ff; (c) bot responds to every user input. Constraint: don't modify id/class attributes. Key fixes: add `bot-message` class to welcome div; CSS `.user-message { background-color: #cfe2ff; }`; in sendMessage(), append automated bot reply (e.g., via setTimeout) after each user message.

Objectives & Problem Context:
...
```

<details>
<summary>📸 <b>Tap to Reveal Visual Diagram (Spoiler)</b></summary>

![[ARTICLE] Web Based](./images/web_chatbot_widget.svg)

</details>

**Options:**
- A) Implement optimal algorithm using standard libraries
- B) Brute-force nested loops O(N²)
- C) Recursive DFS without memoization
- D) Non-deterministic heuristic

<details>
<summary>🙈 <b>Tap to Reveal Answer &amp; Explanation (Spoiler)</b></summary>

> **✅ Correct Answer:** `A) Implement optimal algorithm using standard libraries`
>
> **💡 Explanation &amp; Walkthrough:**
> Optimal Solution Code & Walkthrough:
> ```
> Complete optimal code implementation provided.
> ```

</details>

---

### Q5. [ARTICLE] SQL Query 2

*Quiz Set: Section 13 Interactive Coding Lab* | *Type: coding_lab*

**Question Statement:**
```
Task Scenario:
Employees table (EMP_ID, NAME, DEPARTMENT, SALARY; 7 rows). Intent: name and salary of the highest-paid employee(s) per department. Expected: Alice/HR 50000; Frank/IT 72000; Eva/Finance 60000. Key approach: MAX(salary) per department subquery, join back on department + salary.

Objectives & Problem Context:
```sql
SELECT e.name, e.salary
FROM Employees e
JOIN (SELECT department, MAX(salary) AS max_sal
      FROM Employees GROUP BY department) m
  ON e.department = m.department AND e.salary = m.max_sal;
```...
```

<details>
<summary>📸 <b>Tap to Reveal Visual Diagram (Spoiler)</b></summary>

![[ARTICLE] SQL Query 2](./images/sql_student_scholarship_join.svg)

</details>

**Options:**
- A) Implement optimal algorithm using standard libraries
- B) Brute-force nested loops O(N²)
- C) Recursive DFS without memoization
- D) Non-deterministic heuristic

<details>
<summary>🙈 <b>Tap to Reveal Answer &amp; Explanation (Spoiler)</b></summary>

> **✅ Correct Answer:** `A) Implement optimal algorithm using standard libraries`
>
> **💡 Explanation &amp; Walkthrough:**
> Optimal Solution Code & Walkthrough:
> ```
> SELECT e.name, e.salary
> FROM Employees e
> JOIN (SELECT department, MAX(salary) AS max_sal
>       FROM Employees GROUP BY department) m
>   ON e.department = m.department AND e.salary = m.max_sal;
> ```

</details>

---

### Q6. [CODE EXERCISE] Coding Mock Test - 15

*Quiz Set: Section 13 Interactive Coding Lab* | *Type: coding_lab*

**Question Statement:**
```
Task Scenario:
Story: year 3025, spaceship "Voyager Armstrong" scans asteroids; Armstrong-numbered IDs are safe zones. Intent: check if a number is an Armstrong number; else print "Not an Armstrong Number". Sample: 153 → Armstrong Number. Key approach: count digits d, sum each digit^d, compare.

Objectives & Problem Context:
```python
n = int(input())
d = len(str(n))
total = sum(int(x) ** d for x in str(n))
print("Armstrong Number" if total == n else "Not an Armstrong Number")
```...
```

<details>
<summary>📸 <b>Tap to Reveal Visual Diagram (Spoiler)</b></summary>

![[CODE EXERCISE] Coding Mock Test - 15](./images/code_armstrong_number.svg)

</details>

**Options:**
- A) Implement optimal algorithm using standard libraries
- B) Brute-force nested loops O(N²)
- C) Recursive DFS without memoization
- D) Non-deterministic heuristic

<details>
<summary>🙈 <b>Tap to Reveal Answer &amp; Explanation (Spoiler)</b></summary>

> **✅ Correct Answer:** `A) Implement optimal algorithm using standard libraries`
>
> **💡 Explanation &amp; Walkthrough:**
> Optimal Solution Code & Walkthrough:
> ```
> n = int(input())
> d = len(str(n))
> total = sum(int(x) ** d for x in str(n))
> print("Armstrong Number" if total == n else "Not an Armstrong Number")
> ```

</details>

---

### Q7. [ARTICLE] Coding Mock - 3

*Quiz Set: Section 13 Interactive Coding Lab* | *Type: coding_lab*

**Question Statement:**
```
Task Scenario:
Screenshot of Mettl-style web task: enhance interactive product rating interface. Objectives: (a) add five star icons (class "star") in rating-stars div; (b) style `filled` class gold (#ffd700); (c) implement setRating() updating star display on click. Constraints: don't modify class names/IDs; use Font Awesome "fa-star"; rating updates immediately. Key fixes: five `<i class="fa fa-star star" onclick="setRating(n)">`; CSS `.filled { color: #ffd700; }`; setRating() toggles 'filled' for indices below clicked rating.

Objectives & Problem Context:
...
```

<details>
<summary>📸 <b>Tap to Reveal Visual Diagram (Spoiler)</b></summary>

![[ARTICLE] Coding Mock - 3](./images/web_star_rating_widget.svg)

</details>

**Options:**
- A) Implement optimal algorithm using standard libraries
- B) Brute-force nested loops O(N²)
- C) Recursive DFS without memoization
- D) Non-deterministic heuristic

<details>
<summary>🙈 <b>Tap to Reveal Answer &amp; Explanation (Spoiler)</b></summary>

> **✅ Correct Answer:** `A) Implement optimal algorithm using standard libraries`
>
> **💡 Explanation &amp; Walkthrough:**
> Optimal Solution Code & Walkthrough:
> ```
> Complete optimal code implementation provided.
> ```

</details>

---

### Q8. [ARTICLE] SQL Query 1

*Quiz Set: Section 13 Interactive Coding Lab* | *Type: coding_lab*

**Question Statement:**
```
Task Scenario:
Employees (John/10/60000, Alice/10/80000, Bob/20/70000, Mike/20/40000, Carol/30/90000) and Departments (10/HR, 20/IT, 30/Finance). Intent: department names whose average salary exceeds the overall average. Expected: HR and Finance (70000, 90000 vs 68000). Key approach: GROUP BY department, HAVING AVG(salary) > (SELECT AVG(salary) FROM employees).

Objectives & Problem Context:
```sql
SELECT d.department_name
FROM departments d
JOIN employees e ON e.department_id = d.department_id
GROUP BY d.department_name
HAVING AVG(e.salary) > (SELECT AVG(salary) FROM employees);
```...
```

<details>
<summary>📸 <b>Tap to Reveal Visual Diagram (Spoiler)</b></summary>

![[ARTICLE] SQL Query 1](./images/sql_table_clone.svg)

</details>

**Options:**
- A) Implement optimal algorithm using standard libraries
- B) Brute-force nested loops O(N²)
- C) Recursive DFS without memoization
- D) Non-deterministic heuristic

<details>
<summary>🙈 <b>Tap to Reveal Answer &amp; Explanation (Spoiler)</b></summary>

> **✅ Correct Answer:** `A) Implement optimal algorithm using standard libraries`
>
> **💡 Explanation &amp; Walkthrough:**
> Optimal Solution Code & Walkthrough:
> ```
> SELECT d.department_name
> FROM departments d
> JOIN employees e ON e.department_id = d.department_id
> GROUP BY d.department_name
> HAVING AVG(e.salary) > (SELECT AVG(salary) FROM employees);
> ```

</details>

---

### Q9. [CODE EXERCISE] Coding Mock Test - 16

*Quiz Set: Section 13 Interactive Coding Lab* | *Type: coding_lab*

**Question Statement:**
```
Task Scenario:
Story: Spell Bee Championship; score = vowel count in the word. Intent: count vowels (a,e,i,o,u) in a lowercase English word. Sample: "education" → 5. Key approach: count character membership in "aeiou".

Objectives & Problem Context:
```python
word = input().strip()
print(sum(1 for ch in word if ch in "aeiou"))
```...
```

**Options:**
- A) Implement optimal algorithm using standard libraries
- B) Brute-force nested loops O(N²)
- C) Recursive DFS without memoization
- D) Non-deterministic heuristic

<details>
<summary>🙈 <b>Tap to Reveal Answer &amp; Explanation (Spoiler)</b></summary>

> **✅ Correct Answer:** `A) Implement optimal algorithm using standard libraries`
>
> **💡 Explanation &amp; Walkthrough:**
> Optimal Solution Code & Walkthrough:
> ```
> word = input().strip()
> print(sum(1 for ch in word if ch in "aeiou"))
> ```

</details>

---

### Q10. [ARTICLE] Web Based Question

*Quiz Set: Section 13 Interactive Coding Lab* | *Type: coding_lab*

**Question Statement:**
```
Task Scenario:
Screenshot of Mettl-style web task: finalize partially complete iPod interface. Objectives: (a) add "Next" button; (b) iPod color pink; (c) clicking a button displays its action text on screen. Constraints: don't modify id/class attributes; apply provided CSS correctly. Key fixes: Next button wired to action handler; iPod body background pink; button-click handler (displayAction/showAction) writing action text into screen element.

Objectives & Problem Context:
Side effects: none — read-only; nothing submitted, run, created, or changed....
```

**Options:**
- A) Implement optimal algorithm using standard libraries
- B) Brute-force nested loops O(N²)
- C) Recursive DFS without memoization
- D) Non-deterministic heuristic

<details>
<summary>🙈 <b>Tap to Reveal Answer &amp; Explanation (Spoiler)</b></summary>

> **✅ Correct Answer:** `A) Implement optimal algorithm using standard libraries`
>
> **💡 Explanation &amp; Walkthrough:**
> Optimal Solution Code & Walkthrough:
> ```
> Complete optimal code implementation provided.
> ```

</details>

---
