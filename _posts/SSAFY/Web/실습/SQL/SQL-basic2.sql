
-- 1. world db 사용
use world;

-- 2. world 데이터베이스를 사용하도록 설정
desc city;
desc country;
desc countrylanguage;

-- 3. city , country, countrylanguage 테이블의 구조를 파악
select *
from country
where code = "KOR";

-- 4. country table에서 code KOR인 자료
select code, name, gnp, gnpold, (GNP - GNPOld) as "gnp변동량"
from country
where GNP-GNPOld >= 0
order by GNP-GNPOLD;

-- 5. country에서 GNP변동량이 양수인 국가에 대해 GNP변동량의 오름차순 정렬
select distinct continent
from country
order by length(Continent);

-- 6. country에서 continent를 중복없이 조회하고, continent의 길이로 정렬
select concat(name , "은 ",  Region, "에 속하며 인구는 " , Population, "명이다.") as "정보"
from country
where Continent="asia"
order by name;

-- 7. country에서 asia 대륙의 정보를 출력 포멧에 맞게 출력 후, name으로 정렬
select name, continent, gnp, population
from country
where isnull(indepYear) and population >= 10000
order by population;

-- 8. country에서 인구가 1억 이상 2억 이하인 나라를 기준으로 인구 기준 내림차순으로 상위 3개 출력
select code, name, Population
from country
where population between 100000000 and 200000000
order by population desc
limit 3;

-- 9. country에서 800, 1810 ... 1901에 독립한 나라를 독립년 기준으로 오름차순 출력, 독립년이 같다면 code 기준 내림차순
select code, name, indepyear
from country
where indepYear in (800, 1810, 1811, 1901)
order by indepyear, code desc;

-- 10. country에서 region에 asia가 들어가면서 name의 두 번째 글자가 'o'인 정보 출력
select code, name, region
from country
where region like '%asia%' and name like '_o%';

-- 11. 홍길동과 hong의 글자 길이 출력
select char_length("홍길동") '한글', length('hong') '영문';

-- 12. country에서 governmentform에 republic이 들어있고 name >= 10을 name길이 기준 내림차순으로 상위 10개 출력
select code, name, governmentform
from country
where governmentform like '%republic%' and length(name) >= 10
order by length(name) desc
limit 10;

-- 13. country에서 code가 모음 출력, name 기준 오름차순으로 3번부터 3개 출력
select code, name
from country
where code like 'A%'or 'E%' or 'I%' or 'O%' or 'U%'
order by name 
limit 2, 3;

-- 14. country에서 name의 맨 앞 2글자와 맨 뒤 2글자를 제외하고 나머지는 *로 처리해서 출력
select name, concat (left(name,2), repeat("*", length(name) - 4), right(name, 2)) as guess
from country;

-- 15. country에서 region을 중복없이 가져오고 공백을 _로 대체, region 길이로 정렬
select distinct (replace(region, ' ', '_'))  as '지역들'
from country
order by length(지역들) desc;

-- 16. country에서 인구가 1억 이상인 국가들의 1인당 점유면적을 반올림해서 소수 3자리 표현, surfacesarea로 정렬
select name, surfacearea, population, round(surfacearea/ population, 3) as '인당점유면적'
from country
where Population > 100000000
order by surfacearea;
