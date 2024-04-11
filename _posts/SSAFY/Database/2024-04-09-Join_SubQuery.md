---
title: DDL
date: 2024-04-09
categories: [MySQL]
tags: [Join, SubQuery]
published: false
---

## 목차

- <a href ="#1" >Join</a>
- <a href ="#2" >SubQuery</a>

# <font id = "1">Join</font>

두 개 이상의 테이블의 데이터를 조회할 때 사용한다.

일반적으로 N - 1 개의 조인 조건을 포함한다.

조인 조건은 주로 PK와 FK로 조인한다.

INNER는 옵티마이저로 최적화, OUTER는 OUTER되는 테이블은 먼저 읽는다.

```sql
select employee_id, first_name, salary, department_name
from employees e, departments d
where employee_id = 100 and e.department_id = d.department_id;
```

### INNER JOIN

교집합, N - 1 개 조건 필요, inner 생략 가능, join을 `,`로 대체하고 on을 where로 조건 설정

```sql
select e.employee_id, e.first_name, l.street_address, l.city
from employees e inner join departments d
using(department_id)
join locations l
on d.location_id = l.location_id
where l.city = 'Seattle';
```

### NATURAL JOIN

중복되는 컬럼의 중복된 값을 기준으로 조인

```sql
select department_id, department_name, city
from departments natural join locations
```

| departments | department_id |
| ----------- | ------------- |
|             | 100           |
|             | 200           |

| employees | department_id |
| --------- | ------------- |
|           | 100           |
|           | 200           |
|           | 300           |

| NATURAL JOIN | department_id |
| ------------ | ------------- |
|              | 100           |
|              | 200           |

where department_id = 100

| NATURAL JOIN | department_id |
| ------------ | ------------- |
|              | 100           |

### OUTER JOIN

어느 한 쪽 테이블의 데이터가 다른 테이블에 존재하지 않는 값을 조회할 경우 사용한다.

#### LEFT JOIN

왼쪽 테이블을 기준으로 JOIN 조건에 일치 하지 않는 데이터까지 출력한다.

| employees | department_id |
| --------- | ------------- |
|           | 100           |
|           | 200           |
|           | null          |

| departments | department_id |
| ----------- | ------------- |
|             | 100           |
|             | 200           |
|             | 300           |

```sql
select *
from employees e left join departments d
using(department_id);
```

| departments | department_id |
| ----------- | ------------- |
|             | 100           |
|             | 200           |
|             | null          |

#### RIGHT JOIN

```sql
select *
from employees e right join departments d
using(department_id);
```

| departments | department_id |
| ----------- | ------------- |
|             | 100           |
|             | 200           |
|             | 300           |

#### FULL OUTER JOIN

MySQL에는 존재하지 않는다.

UNION으로 대체한다.

### SELF JOIN

동일한 본인 테이블을 join

```sql
select e.employee_id, e.first_name, e.manager_id, m.first_name
from employees e join employees m
using(manager_id);
```

### None-Equi Join

PK, FK가 아닌 일반 컬럼을 join 조건으로 지정하여 조회

| employees | department_id | salary |
| --------- | ------------- | ------ |
|           | 100           | 'A'    |
|           | 200           | 'B'    |
|           | 300           | 'C'    |

| departments | department_id | name |
| ----------- | ------------- | ---- |
|             | 100           | 'A'  |
|             | 200           | 'B'  |
|             | 400           | 'C'  |

```sql
select *
from employees e join departments d
where e.name = 'A'
and d.name = 'B';
```

| NATURAL JOIN | department_id |
| ------------ | ------------- |
|              | 100           |
|              | 200           |

# <font id = "2">SubQuery</font>

다른 쿼리 내부에 포함되어 있는 SELECT 문을 의미한다.

서브쿼리는 단일 행(`=`), 다중 행(`in`) 비교 연산자와 함께 사용한다.

- SELECT문에 작성되는 서브커리는 스칼라 서브쿼리
- FROM 안에 서브쿼리는 인라인 뷰
- WHERE문 안에 들어가는 서브쿼리를 Nested Subquery
  - 단일행, 복수(다중)행, 다중컬럼

**join -> SubQuery**

```sql
-- JOIN
select department_name
from employees join departments
using (department_id)
where employee_id = 100;
```

```sql
-- SUB QUERY (Nested Subquery - 단일 행)
select department_name
from departments
where department_id = (
  select department_id
  from employees
  from employee_id = 100
)
```

버전별 서브쿼리와 JOIN의 성능 차이가 발생한다.

> [서브쿼리 버전별 최적화 이슈 (5.5 vs 5.6)](https://jojoldu.tistory.com/520)

**다중 행**

```sql
-- SUB QUERY (Nested Subquery - 다중 행)
select department_id
from departments
where department_name in (
  ...
)

-- 적어도
where ... > any
-- 모든
where ... > all
```

## INLINE VIEW

```sql
select id
from (
  select distinct id
  from employees
  where salary < 10000
) join employees
using(id);
```

**변수**

```sql
-- 변수 초기화
set @pageno = 3

-- =는 비교연산자 이므로 := 키워드 사용 (set 뒤에 =는 대입연산자로 취급)
select @rownum := 0
```

## Scalar Subquery

Scalar Subquer는 하나의 컬럼만 리턴해야 한다.

```sql
-- Scalar Subquery
select id, (
  select d.name
  from departments d
  where e.id = d.id
)
from employees e
where job_id = 'IT';


-- JOIN
select e.id, d.name
from employees e join departments d
using (id)
where e.id = 'IT';

```

**dual**

더미 테이블

```sql
select
(select id from employees)
from dual
```
