# Module 12: Coding Assessment

**Total Questions in Module**: 1  
**Visual Diagrams**: 0 blueprints  
**Category**: Coding Assessments  
**Syllabus Items**: 13 lessons

---

### Q1. Rat Food Distribution Problem

*Quiz Set: Module 12 Key Concepts* | *Type: coding*

**Question Statement:**
```
A colony of `r` rats each needs `unit` amount of food. An array `arr` of size `n` represents the amount of food in each house. Return the minimum number of houses needed from left to right to feed all rats, or 0 if array is empty, or -1 if total food is insufficient.
```

**Options:**
- Single pass linear scan O(n)

<details>
<summary>🙈 <b>Tap to Reveal Answer &amp; Explanation (Spoiler)</b></summary>

> **✅ Correct Answer:** `Single pass linear scan O(n)`
>
> **💡 Explanation &amp; Walkthrough:**
> Python Implementation:
> ```python
> def solve_rat_food(r, unit, arr, n):
>     if n == 0 or len(arr) == 0: return 0
>     total_required = r * unit
>     current_sum = 0
>     for i in range(n):
>         current_sum += arr[i]
>         if current_sum >= total_required:
>             return i + 1
>     return -1
> ```
> Time Complexity: O(N) | Space Complexity: O(1).

</details>

---
