select * from movie;

select title from movie;

select *
from movie
where title = "이터널스";

select *
from movie
where title like "해리%";

select *
from movie
where title like "%포터%";

select title
from movie
where ID in(1004, 1000);

select ucase("touppercase") "대문자";

select concat("해리포터와","마법사의 돌") "연결";

select left(title, 2)
from movie
where releaseDate >= 20180101;

select replace(title, "해리포터", "말포이")
from movie
where title like "%해리%";

select round(pi(), 2);

commit;
