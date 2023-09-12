---
title: MarkDown 정리 - Extended Syntax
toc: true
---

# OverView

앞서 글에서는 일반적으로 많이 사용하고, 모든 마크다운 프로세서에서 동작하는  기본 구문을 나열하였습니다. 

몇몇 기간과 단체가 표, 코드 블록,  URL 자동 연결 삭제, 각주와 같은 추가 요소들을 추가함으로써 기본 구문을 확장하였습니다.

사용하는 마크다운 프로세서가 확장된 마크다운 언어를 지원하는지 확인하고 사용해야 합니다.

> 마크다운 지원 프로세서 목록 <br/>
> https://github.com/markdown/markdown.github.com/wiki/Implementations

## Table
```
| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text      |
```
테이블임을 표기하는 --- 기호의 개수는 몇 개든 상관 없습니다.

| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |


---
### Alignment
```
| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |
```

| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this    |
| Paragraph   | Text        | And more      |


### Formatting Text in Tables
테이블 안의 텍스트에 포멧을 줄 수 있습니다. 링크나 코드를 표기하기 위해서는 backticks 기호로 단어를 묶어서 사용할 수 있습니다. 

그러나 Heading(# h1 ..), Blockquotes( \>), Lists(- , 1.), 수평선 (---), 이미지들 이나 HTML 태그는 불가능 합니다.

그럼에도 특수한 포멧을 사용하고 싶다면 공식 문서에 [Breaking Rule](https://www.markdownguide.org/hacks/#line-breaks-within-table-cells)이 있으니 이를 참고하기시 바랍니다.


---
## Code Blocks
앞서 Code Block을 탭으로 만든다고 배웠습니다.
지금 설명드릴 방법은 특정 영역을 모두 코드 블럭으로 만드는 문법입니다.

\`\`\` 혹은 \~\~\~를 사용해서 특정 영역을 감쌉니다.

Syntax Highlight를 적용하려면, \`\`\` 뒤에 특정 언어를 넣어줍니다.

> Syntax Highlight 지원 언어 목록<br/>
	https://github.com/jincheng9/markdown_supported_languages

 \`\`\`c<br/>
 #include \<stdio.h\><br/>

int main(void)<br/>
{<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;printf("hello world!");<br/>
}<br/>
 \`\`\`

```c
 #include <stdio.h>

int main(void)
{
   printf("hello world!");
}
```

---

## Definition Lists
### MarkDown
```
First Term
: This is the definition of the first term.

Second Term
: This is one definition of the second term.
: This is another definition of the second term.
```

### HTML
```
<dl>
  <dt>First Term</dt>
  <dd>This is the definition of the first term.</dd>
  <dt>Second Term</dt>
  <dd>This is one definition of the second term. </dd>
  <dd>This is another definition of the second term.</dd>
</dl>

```
### 결과

First Term
: This is the definition of the first term.

Second Term
: This is one definition of the second term.
: This is another definition of the second term.

---

## 취소선
취소선을 표시하고자 하는 문장의 앞 뒤에 틸드(~)를 두 개씩 달아줍니다.

	이 문장은 \~\~취소선\~\~ 입니다.

이 문장은 ~~취소선~~ 입니다.

---

## 체크리스트
체크리스트를 생성하기 위해서는 - 기호와 뒤에 []를 추가하여서 아이템 리스트를 만듭니다.

선택된 리스트는 [x]를 표기하여서 작성합니다.
```
- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media
```
- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media


___

## 이모지(이모티콘)
이모지를 삽입하거나, 마크다운 포멧을 통해 이모지를 작성합니다.

> 이모지 목록 <br/>
> https://gist.github.com/rxaviers/7360908

```
:house: 가고 싶다.
🏠 밖은 위험해!
```
🏠 가고 싶다.<br/>
🏠 밖은 위험해!

---

## URL Link

마크다운에서는 기본적으로 URL에 하이퍼링크를 달아줍니다.

이를 비활성화 하기 위해서는 링크를 백틱(\`)으로 묶어줍니다.

`http://www.example.com`


___
## 각주
```
김시온[^1]
25[^2]


[^1]: 작성자의 이름
[^2]: 작성자의 나이

```

김시온[^1] <br/>
25[^2]


아래 각주는 항상 페이지의 최하단에 위치하게 됩니다.

[^1]: 작성자의 이름
[^2]: 작성자의 나이


---
