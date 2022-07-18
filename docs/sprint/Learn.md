
- [최종 일관성: Eventually Consistent][]
- [이벤트 소싱: Event Sourcing][]
- [EagerReadDerivation] 쿼리 측 모델 단순화
- [인증]
  - 세션
    1. 악의적인 공격자가 브라우저에 저장된 데이터를 탈취할 수 있음. 
    2. 비록 세션을 알 수 없는 문자열로 만들었다고 해도, http 는 보안에 취약하기 때문에 중간에 전달되는 데이터 역시 가로챌 가능성이 있음.
       이를 방지하기 위해 https 로 암호화 된 통신을 하고 세션에 유효시간을 둠. `session = { expire: now(), https }`
    3. 세션은 서버의 저장소에 저장되고 빠른 응답을 위해 메모리에 상주시키는 경우가 많음.
       -> 트래픽이 많은 경우 요청마다 세션 확인을 해야하므로 데이터베이스의 부하가 심해지고 메모리 부족 현상이 일어남. 이를 위해 redis 를 이용해 메모리에 상주하는 세션을 이용하기도 함.
  - 토큰
    1. 토큰은 사용자가 로그인 했을 때 서버에서 토큰을 생성해서 전달하고 저장소에 저장하지 않음. 이후 요청에 대해 클라이언트가 전달한 토큰에 대해 검증만 수행을 하게 됌.
    2. JWT 방식을 많이 사용함.
    3. 세션처럼 상태를 관리할 필요가 없어 어느 도메인의 서비스로 보내더라도 같은 인증을 수행할 수 있게 됌.
        - JWT
          - prop
            - URL Safe, 간결함
            - 클레임을 디지털 방식으로 서명 또는 MAC(Message Authentication Code) 로 암호화되어 무결성을 보호
            - JSON 사용
          - 구성 요소
            - Header -> Base64 encoding `{"typ": "JWT", "alg": "HS256"}`
            - Payload -> Base64 encoding
              1. 등록된 클레임(Registered Claims)
                  iss: issuer(발급지)           -> 앱에서 정한 임의의 문자열 또는 URI 형식
                  sub: subject(주제)           -> 앱에서 정한 문자열 또는 URI 형식, 발급자가 정의하는 문맥상 또는 전역으로 유일한 값을 가져야 함
                  aud: Audience(수신자)         -> 누구에게 토큰이 전달되는 가를 나타냄. 주로 보호된 리소스의 URL 값으로 설정함.
                  exp: Expiration(만료 시간)    -> 언제 토큰이 만료되는 지 나타냄. 주로 UNIX EPOCH 시간을 사용함.
                  nbf: Not Before             -> 정의 된 시간 이후에 토큰이 활성화 됨. 토큰이 유효해지는 시간 이전에 미리 발급되는 경우 사용함. 주로 UNIX EPOCH 시간을 사용함. 
                  iat: Issued At(토큰 발급 시간) -> 언제 토큰이 발급되었는지를 나타냄. 주로 UNIX EPOCH 시간을 사용함.
                  jti: JWT ID, 토큰 식별자      -> 토큰의 고유 식별자로서 같은 값을 가질 확률이 없는 암호학적 방법으로 생성되어야 함. 탈취 방지
              2. 공개 클레임(Public Claims) JWT 발급자는 표준 클레임에 덧붙여 공개되어도 무방한 페이로드를 공개 클레임으로 정의 함. 이름 충돌을 방지하기 위해 IANA_JWT 클레임 레지스트리에 클레임 이름을
                                         등록하거나 합리적인 예방 조치를 취해야 함. 보통 URI 형식으로 함.
              3. 비공개 클레임(Private Claims) JWT 발급자와 사용자간에 사용하기로 약속한 클레임을 말함. 이름 충돌이 발생하지 않도록 주의해야 함.
            - Signature 생성된 토큰이 유효한 지 검증하는 장치임. 보통 secret 키를 말함.
    4. 로그인 시나리오
       로그인은 사용자가 이메일과 비밀번호를 입력하고 해당 서비스를 이용할 수 있도록 Resource 접근 권한을 주는 것이다. 토큰은 해커가 토큰을 탈취한 경우 토큰을 즉시 무효화 시키지 못하는 치명적인 보안 취약점을 가진다.
       따라서 사용자가 사용하는 토큰은 가능한 유효시간을 짧게 두게 된다. 하지만 너무 짧게두면, 만료된 토큰으로 유저가 접속할 경우 재 로그인 요청을 보내야 한다. 이런 경우들을 대비해 JWT 전략을 이용하게 된다.
       1. 슬라이딩 세션 -> 재 로그인을 하지 않고 현재 가지고 있는 토큰을 새로운 토큰으로 재발급하는 방식
       2. 리프레시 토큰 -> 이때 재발급하는 과정에서 필요한 토큰 유효시간은 리프레쉬 토큰으로 해결한다.
          1. 우선 사용자가 회원가입 할 때 토큰(AccessToken, RefreshToken)을 생성해 클라이언트에게 전달한다.
          2. 클라이언트는 Access Token 의 만료 여부를 판단하고, 만료 되었을 경우 Refresh Token 으로 로그인 요청을 하게 된다.
          3. 만약 만료되지 않았을 경우 Access Token 으로 서비스를 이용한다.
          4. 로그인 요청 시, 헤더에 AccessToken: expired 라면, 토큰 서비스에 Access Token 을 재발급하라는 이벤트를 남긴다.
          5. 로그인 성공 시, 유저는 새 Access Token 을 발급받게 된다. 만약 헤더에 RefreshToken: expired 라면 토큰 서비스의 Refresh Token 을 재 발급하라는 이벤트를 남긴다.
          6. 여기서 RTR 기법을 적용해, 만약 Access Token 이 만료가 되었을 때, Refresh Token 으로 로그인 요청을 하게 되면,
             1. Access Token 을 재 발급하고,
             2. Refresh Token 도 재 발급해서,
             3. 클라이언트의 안전한 보관소에 있는 Refresh Token 을 업데이트 한다 <- 해커가 가지고 있는 Refresh Token 과 현재 재발급받은 유저의 Refresh Token 은 서로 다르다.
          7. Access Token 의 만료 시간은 현재 테스트 중이므로 10분으로 둔다. (Production: 24 hour)
          8. Refresh Token 의 만료 시간은 현재 테스트 중이므로 1시간으로 둔다. (Production: 6 month)
          9. 여기서 RTR 기법을 적용하면, 만료시간은 어떻게 되지?, Refresh Token 탈취가 아니라 지속적인 Access Token 탈취가 이루어지면 어떻게 되지?
          10. 클라이언트는 Access Token 과 Refresh Token 의 보안 취약점으로부터 벗어나기 위해 안전한 저장소에 토큰을 담아 둔다.
              1. Mobile application:
              2. Web application:
          11. 만약 토큰이 탈취되었을 경우
              1. 모든 토큰을 전부 무효화 해야 한다. -> 해커가 유효한 Refresh Token 으로 Resource 접근을 할 수 있으므로
              2. 만약 해킹 당했을 경우 -> 유저가 직접 토큰을 삭제할 수 있어야 한다 (방안 마련)
              3. 토큰을 탈취당했다는 것을 알 수 있는 방법 또는 기준이 무엇인가? (애플리케이션 보안에 대해 공부)
              4. RTR(Refresh Token Rotation) 기법 -> One Time Use Only 
  - [csrf](https://junhyunny.github.io/information/security/spring-boot/spring-security/cross-site-reqeust-forgery/)
    1. 사용자가 보안이 취약 서버로부터 이미 인증을 받은 상태.
    2. 쿠키 기반으로 서버 세션 정보를 획득할 수 있어야 함.
    3. 공격자는 서버를 공격하기 위한 요청 방법에 대해 미리 파악하고 있어야 함. url 파라미터에 대해 미리 숙지 필요.
    4. 시나리오
       1. 사용자 로그인
       2. 사용자의 세션 정보가 브라우저 쿠키에 담김
       3. 해커는 인증된 사용자가 악성 스크립트 페이지를 누르도록 유도.
            1. 악성 게시글 클릭
            2. 스팸 메일
       4. 누르면, 세션 아이디는 브라우저에 의해서 자동으로 서버로 요청됌.
       5. 서버는 쿠키에 담긴 세션 정보를 보고 사용자를 허용해줌. (해커는 내가 원하는 정보를 사용자의 세션정보를 이용해서 탈취하는 것을 말함. 악성 스크립트는 해커가 심어 놓은 fetch(url) 라고 생각해도 무방함.)
       6. fetch 또는 요청이 담긴 스크립트를 사용자가 클릭했을 떄, 브라우저는 서버로 요청을 보내게 되는데, 인증된 사용자의 이름으로 악성 스크립트 api 를 보내는거임. 기본적으로 HTTP 메서드의 기본 CSRF 탈취 시나리오가 존재함.
       7. 탈취 예방: 
          1. Referrer 검증: Request Header 의 Referer === Host 와 같기 때문에 이것만 검증해도 거의 방어가 가능
          2. CSRF 토큰 검증
          3. Double Submit Cookie 검증
  - [xss]()
    - Reflected XSS
    - Stored XSS
    - DOM Based XSS
  - [sql injection]()
    - 웹 응용 프로그램에 SQL 구문을 삽입해서, 내부 데이터베이스 서버의 데이터를 유출하거나 변조하는 공격을 말함.
    - 쿼리 조작, 마스터 계정으로 접근해서 데이터 베이스 조작을 하는 것을 말함.

- [데이터베이스]
  - [isolation level]
  - [transaction]
  - [basic query]
    - ALL: 서브 쿼리의 여러 개의 결과를 모두 만족 시켜야 함
      - New York 도시보다 인구 수가 많은 도시를 리스트로 보여줘.
      - `SELECT * FROM City WHERE population > ALL ( SELECT population FROM City WHERE district = 'New York');`
    - ORDER BY: 결과가 출력되는 순서를 조절하는 구문
      - 기본적으로 오름차순(Ascending) 정렬, 내림차순(Descending) 으로 정렬하고 싶다면 뒤에 DESC 명령문 작성, 오름차순 시 명령어 생략 가능
      - 인구 수를 내림차순으로 보여줘.
      - `SELECT * FROM City ORDER BY population DESC;`
      - 혼용해서 사용 가능.
      - `SELECT * FROM City ORDER BY countryCode ASC, population DESC`
    - DISTINCT: 중복된 것은 1개씩만 보여주면서 출력하는 명령문. 테이블의 크기가 클수록 효율적임.
      - `SELECT DISTINCT countryCode FROM City;`
    - LIMIT: 출력 개수를 제한.
      - 상위의 N개만 출력하는 `LIMIT N` 구문
      - 서버의 처리량을 많이 사용해 서버의 전반적인 성능을 나쁘게 하는 악성 쿼리문을 개선할 때 사용함.
      - `SELECT * FROM City ORDER BY population DESC LIMIT 10`
    - GROUP BY:
      - 그룹으로 묶어주는 역할.
      - 효율적으로 데이터를 그룹화 함.
      - 읽기 좋게 하기 위해 별칭을 사용함.
        - `SELECT countryCode, Max(population) AS 'population' FROM City GROUP BY countryCode;`
      - 도시의 개수를 구하기
        - `SELECT COUNT(*) FROM City;`
        - `SELECT AVG(population) FROM City;`
      - 집계 함수(Aggregate Function)을 함께 사용함.
        - AVG(): 평균 구하는 함수
        - MIN(): 최소값을 구하는 함수
        - MAX(): 최댓값을 구하는 함수
        - COUNT(): 행의 개수를 구하는 함수
        - COUNT(DISTINCT): 중복을 제외한 행의 개수를 구하는 함수
        - STDEV(): 표준 편차를 구하는 함수
        - VARIANCE(): 분산
    - HAVING:
      - WHERE 절과 비슷한 개념으로 조건을 제한함.
      - 집계 함수에 대해서 조건을 제한하는 편리한 개념임.
      - HAVING 절은 반드시 GROUP BY 구문 뒤에 나와야 함.
      - `SELECT countryCode, MAX(Population) FROM City GROUP BY countryCode HAVING MAX(population) > 8000000;`
    - ROLLUP:
      - 총합 또는 중간 합계가 필요할 경우 사용함.
      - GROUP BY 구문과 함께 WITH ROLLUP 문을 사용함.
      - `SELECT countryCode, Name, SUM(population) FROM City GROUP BY countryCode, Name WITH ROLLUP;`
    - JOIN:
      - 데이터베이스 내의 여러 테이블에서 가져온 레코드를 조합하여 하나의 테이블이나 결과 집합으로 표현하는 것.
        - `SELECT * FROM City JOIN country ON city.countryCode = country.Code;`
        - `SELECT * FROM City JOIN country ON city.countryCode = country.Code CountryLanguage ON city.CountryCode = countryLanguage.country ;`
    - 
    
  - 내장 함수
    - LENGTH():
      - 전달 받은 문자열의 길이를 반환
      - `SELECT LENGTH('abcdefg')`;
    - CONCAT():
      - 전달 받은 문자열을 모두 결합하여 하나의 문자열로 반환
      - 전달 받은 문자열 중 하나라도 NULL 이 존재하면 NULL 을 반환
      - `SELECT CONCAT("My", "Love", NULL, "is", "YOU");` 
    - LOCATION():
      - 문자열 내에서 찾는 문자열이 처음으로 나타나는 위치를 찾아서 해당 위치를 반환함.
      - 찾는 문자열이 문자열 내에 존재하지 않으면 0을 반환
      - MySQL 에서는 문자열의 시작 인덱스를 **1**부터 계산함.
      - `SELECT LOCATE('abc', 'ababababababcababab');`
    - LEFT()
      - 문자열의 왼쪽부터 지정한 개수만큼의 문자를 반환함.
      - `SELECT LEFT('Mysql is an open source', 5) RIGHT('Mysql is an open source', 3);`
    - RIGHT()
      - 문자열의 오른쪽부터 지정한 개수만큼의 문자를 반환함.
    - LOWER():
      - 문자열의 문자를 모두 소문자로 변경
      - `SELECT LOWER('abcde') UPPER('abcde');`
    - UPPER():
      - 문자열의 문자를 모두 대문자로 변경
    - REPLACE():
      - 문자열에서 특정 문자열을 대체 문자열로 교체함.
      - `SELECT REPLACE ('MSSQL', 'MS', 'My');` 
    - TRIM():
      - 문자열의 앞이나 뒤 또는 양쪽 모두에 있는 특정 문자를 제거할 때 사용함.
      - TRIM() 함수에서 사용할 수 있는 지정자는 다음과 같음:
        - BOTH: 전달 받은 문자열의 양 끝에 존재하는 특정 문자를 제거할 수 있음.
        - LEADING: 전달 받은 문자열 앞에 존재하는 특정 문자를 제거할 수 있음.
        - TRAILING: 전달 받은 문자열 뒤에 존재하는 특정 문자를 제거할 수 있음.
      - 만약 지정자를 명시하지 않으면, 자동으로 BOTH 로 설정 됌.
      - 제거할 문자를 명시하지 않으면 자동으로 공백을 제거함.
      - `SELECT TRIM('                  MySQL   ');`
      - `SELECT TIM('                   MySQL   '), TRIM(LEADING '#' FROM '####MySQL@#'), TRIM(TRAILING '#' FROM '####MySQL@#');`
    - FORMAT():
      - 숫자 타입의 데이터를 세 자리마다 쉼표(,) 를 사용하는 '#,###,###.##' 형식으로 변경함.
      - 반환되는 데이터의 형식은 문자열 타입임.
      - 두 번째 인수는 반올림할 소수 부분의 자릿수를 말함.
      - `SELECT FORMAT(123123123123.123123123, 6);`
    - FLOOR(): 내림
    - CEIL(): 올림
    - ROUND(): 반올림
    - SQRT(): 양의 제곱근
    - POW(): 첫 번째 인수로는 밑수를 전달하고, 두번째 인수로는 지수를 전달하여 거듭제곱 계산함
    - EXP(): 인수로 지수를 전달받아 e 의 거듭제곱을 계산함.
    - LOG(): 자연 로그 값을 계산함.
    - SIN(): 사인 값 반환
    - COS(): 코사인 값 반환
    - TAN(): 탄젠트 값 반환 `TAN(PI() / 4);`
    - ABS(): 절대 값 반환
    - RAND(): 0.0 보다 크거나 같고 1.0 보다 작은 하나의 실수를 무작위로 생성.
      - `SELECT ABS(-3), RAND(), ROUND(RAND() * 100, 0);`
  - 날짜 함수
    - NOW(): 현재 날짜와 시간을 반환함
    - CURDATE(): 현재 날짜를 반환
    - CURTIME(): 현재 시각을 반환
    - DATE(): 전달 받은 값에 해당하는 날짜 정보를 반환
    - MONTH(): 월에 해당하는 값을 반환. 0 ~ 12 사이의 값을 가짐.
    - DAY(): 일에 해당하는 값을 반환.
    - HOUR(): 시간에 해당하는 값을 반환. 0 ~ 23 사이의 값을 가짐.
    - MINUTE(): 분에 해당하는 값을 반환. 0 ~ 59 사이의 값을 가짐.
    - SECOND(): 초에 해당하는 값을 반환, 0 ~ 59 사이의 값을 가짐.
    - MONTHNAME(): 월에 해당하는 이름을 반환.
    - DAYNAME(): 요일에 해당하는 이름을 반환.
    - DAYOFWEEK(): 일자가 해당 주에서 몇 번째 날짜인지를 반환함. 1부터 7 사이의 값을 반환함. 일요일 = 1, 토요일 = 7
    - DAYOFMONTH(): 일자가 해당 월에서 몇 번째 날인지를 반환함. 0 ~ 31 사이의 값을 반환함
    - DAYOFYEAR(): 일자가 해당 연도에서 몇번째 날 인지를 반환함. 1부터 366 사이의 값을 반환함.
    - DATE_FORMAT(): 전달 받은 형식에 맞춰 날짜와 시간 정보를 문자열로 반환함.
      - `SELECT DATE_FORMAT(NOW(), '%D %y %a %d %m %n %j');`
  - [advanced query]
    - CREATE TABLE AS SELECT: 기존 테이블 복제 후 새 테이블 만들기: `CREATE TABLE City2 AS SELECT * FROM City;`
    - 데이터베이스 만들고 사용하기: CREATE DATABASE Test; Use Test;
    - ALTER TABLE: 
      - ALTER TABLE 문과 ADD 명령어 같이 사용 가능
      - ALTER TABLE 문과 MODIFY 명령 같이 사용 가능
    - INSERT INTO: 
      - 테이블 이름 다음에 나오는 열 생략 가능함
      - 생략할 경우 VALUES 다음에 나오는 값들의 순서 및 개수가 테이블에 정의된 컬럼 및 개수와 동일해야 함.
      - `INSERT INTO test VALUES(1,123,1,1 "test");`
      - `INSERT INTO test2 SELECT * FROM test;` -> test 테이블에 로우를 test2 로 복사 삽입
    - UPDATE:
      - `UPDATE test SET col1 = 1, col2 = 1.0, col3 = 'test' WHERE id = 1`
    - DELETE:
      - `DELETE FROM test WHERE id = 1;` -> 데이터는 지웠지만, 롤백 가능 -> 디스크에서 용량 자체는 삭제되지 않음(휴지통에 넣었다 생각)
      - `TRUNCATE TABLE test`; -> 껍데기 빼고 다 삭제함. 복구 안됌. 영구 삭제시켜버림.
      - `DROP TABLE test` -> 테이블 삭제.
      - `DROP DATABASE test` -> 데이터베이스 삭제
      - 
        





- 
  - [query planning]
  - [schema design]
  - [indexing]
    - 테이블에서 원하는 데이터를 빠르게 찾기 위해 사용
    - 일반적으로 데이터를 검색할 때 순서대로 테이블 전체를 검색하므로 데이터가 많으면 많을수록 탐색하는 시간이 늘어남.
    - 검색과 질의를 할 때 테이블 전체를 읽지 않기 때문에 빠름
    - 설정된 컬럼 값을 포함한 데이터의 삽입, 삭제, 수정 작업이 원본 테이블에서 이루어 질 경우, 인덱스도 함께 수정되어야 함. (검색 테이블이냐, 수정, 삭제, 생성이 빈번한 테이블이냐)
    - 인덱스가 있는 테이블은 처리 속도가 느려질 수 있으므로 수정보다는 검색이 자주 사용되는 테이블에서 사용하는 것이 좋음.
    - `CREATE INDEX colum1_idx ON test (col1);`
    - 중복값이 허용되지 않는 인덱스
      - `CREATE UNIQUE INDEX colum1_idx ON test (col1);`
    - `SHOW INDEX FROM test;`
    - FULLTEXT INDEX: 
      - 일반적인 인덱스와는 달리 매우 빠르게 테이블의 모든 텍스트 컬럼을 검색함
      - `ALTER TABLE test ADD FULLTEXT col3Idx(col3);`
    - `ALTER TABLE test DROP INDEX Col3Idx;`
    - `DROP INDEX Col2Idx ON test;`
  - [View]
    - View 는 데이터베이스에 존재하는 일종의 가상 테이블(내가 필요한 정보만 있는 테이블을 만들자!)
    - 실제 테이블처럼 행과 열을 가지고 있지만, 실제로 데이터를 저장하진 않음
    - MySQL 에서 뷰는 다른 테이블이나 다른 뷰에 저장되어 있는 데이터를 보여주는 역할만 수행
    - 뷰를 사용하면 여러 테이블이나 뷰를 하나의 테이블처럼 볼 수 있음.
      - 장점:
        - 특정 사용자에게 테이블 전체가 아닌 필요한 컬럼만 보여줄 수 있음.
        - 복잡한 쿼리를 단순화해서 사용함.
        - 쿼리 재사용 가능함.
      - 단점:
        - 한 번 정의된 뷰는 변경할 수 없음.
        - 삽입, 삭제, 수정 작업에 많은 제한 사항을 가짐.
        - 자신만의 인덱스를 가질 수 없음.
    - `CREATE VIEW testView AS SELECT col1, col2 FROM test;`
    - `SELECT * FROM testView;`
    - `ALTER VIEW testView AS SELECT col1, col2, col3 FROM test;`
    - `DROP VIEW testView;`
    
    - `CREATE VIEW allView AS 
       SELECT City.Name, country.surface, city.population FROM City 
       JOIN Country ON city.countryCode = country.code 
       JOIN countryLanguage ON city.countryCode = countryLanguage.countryCode;
       WHERE city.countryCode = 'KOR';`
  - [reverse indexing]
  - [normalization]

