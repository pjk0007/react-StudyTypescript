# React, Typescript 공부

## 설치 및 환경 설정

### 1. nodejs가 없으면 nodejs 홈페이지에 가서 설치

```powershell
choco install nodejs
```

chocolately가 있으면 choco로 설치

### 2. npm 패키지 매니저를 이용하여 react + typescript 설치

```powershell
npm install create-react-app --template typescript
```

### 3. 불필요한 파일 삭제

root폴더에서 _yarn.lock_ 삭제
src폴더에서 _App.tsx_, _index.tsx_, _react-app-env.d.ts_ 만 남기고 삭제

---

## 리엑트 훅, 라이브러리 설명

### 1. react, react-dom

#### 1) 기본 사용법

react를 사용하기 위한 기본적인 라이브러리
*index.tsx*에서 사용

```tsx
// index.tsx
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(<App />, document.getElementById("root"));
```

##### 2) react hooks

{useState, useEffect} 등이 있다.

```tsx
// 컴포넌트.tsx
import { useState, useEffect } from 'react';
...
[value, setValue] = useState<Interface>(initial);
...
useEffect(() => {
    effect
    return () => {
        cleanup
    }
}, [input])
```

- useState : state를 관리한다.
  Array를 리턴하며, 첫 번째는 변수, 두번쨰는 변수를 바꿀 함수명이 리턴된다.
- useEffect : 지정한 변수가 변할 때마다 실행된다.
  return을 지정하면 컴포넌트가 사라질 때 return이 실행된다.

#### 2) react 라이브러리

### 2. react-router, react-router-dom

라우터를 사용하여 페이지를 이동할 때 사용
TypeScript에서 설치위해서 @types를 붙여주어야 한다.

#### 1) 설치

```powershell
    npm install react-router-dom @types/react-router-dom
    npm install react-router @types/react-router
```

#### 2) 사용

routes 폴더를 만들어서 랜더링할 페이지의 컴포넌트를 만든다.
_Router.tsx_ 에서 불러온다.

```tsx
// Router.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path="/:coinId/*" element={<Coin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
```

각 페이지 컴포넌트에서 링크를 이용하여 네스팅(자식 컴포넌트 랜더링)이 가능하다.
Link 태그에 _반드시 to_ 를 사용하여 params를 전송한다.

```tsx
// Coin.tsx
import {Routes, Route, Link} from 'react-router-dom';
...
function Coin(){
    return(
        <>
            ...
            <Link to={`/${coinId}/price`}>Price</Link>
            <Link to={`/${coinId}/chart`}>Chart</Link>
            ...
            <Routes>
                <Route path="price" element={<Price />}/>
                <Route path="chart" element={<Chart />}/>
            </Routes>
            ...
        </>
    );
}
...

```

react-router를 이용하여 부모 컴포넌트에서 params를 받아올 수 있다.
interface를 이용해 params의 타입을 지정해주어야 한다.

- useParams : 부모에서 to로 전송한 pathname의 params를 받아온다. Link to={{}}
- useLocation : 부모에서 보낸 state를 받아온다.
- useMatch : 현재 pathname이 맞는지 확인 후 틀리면 null을 반환한다.

```tsx
// Coins.tsx (Coin.tsx의 부모 컴포넌트)
<Coin key={coin.id}>
  <Link
    to={{
      pathname: `/${coin.id}`,
    }}
    state={{
      name: coin.name,
    }}
  >
    링크 : Coin 컴포넌트로 이동
  </Link>
</Coin>
```

```tsx
// Coin.tsx
import { useLocation, useMatch, useParams} from 'react-router';
...
interface RouteParams{
    coinId: string;
}
...
function Coin(){
    const { coinId } = useParams() as RouteParams;
    const { state } = useLocation();
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");
    ...
}
...
```

### 3. styled-compoents

#### 1) 설치

```powershell
npm install styled-components @types/styled-components
```

#### 2) 사용

##### css를 사용할 때 styled

```tsx
// 해당 컴포넌트에서
import styled from "styled-components";
...
const Container = styled.div`
    padding: 0 20px;
    max-width: 480px;
    margin: 0 auto;
`;
```

##### Theme을 사용할 때 {ThemeProvider, createGlobalStyle, DefaultTheme}

```tsx
// theme.ts
import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  bgColor: "#2f3640",
  textColor: "#f5f6fa",
  accentColor: "#9c88ff",
};
```

```tsx
// index.tsx
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
...
ReactDOM.render(
    <React.StrictMode>
    ...
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    ...
    </React.StrictMode>,
    document.getElementById("root")
);

```

```tsx
// App.tsx
import { createGlobalStyle } from "styled-components";
...
function App() {
  return (
    <>
        ...
        <GlobalStyle />
        ...
    </>
  );
}
```

```tsx
// styled.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
  }
}
```

### 4. react-query, react-query/devtools

#### 1) 설치

```powershell
npm install react-query
```

#### 2) 사용

- _api.ts_ 를 만들어 모든 fetch 함수를 정의한다.

```ts
/// api.ts
const BASE_URL = `https://api.coinpaprika.com/v1`;

export async function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export async function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export async function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}
```

- _index.tsx_ 에 { QueryClient, QueryClientProvider }를 이용하여 감싸준다.

```tsx
// index.tsx
import { QueryClient, QueryClientProvider } from 'react-query';
...
const queryClient = new QueryClient();
...
ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>

  </React.StrictMode>,
  document.getElementById("root")
);

```

- (선택) *App.tsx*에서 ReactQueryDevtools 을 이용하면 디버깅이 편하다.

```tsx
// App.tsx
import {ReactQueryDevtools} from 'react-query/devtools';
...
function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
      <ReactQueryDevtools initialIsOpen={true}/>
    </>
  );
}
```

- 각 컴포넌트에서 useQuery를 이용하여 미리 정의한 fetch를 정의한다.

useQuery는 로딩상태와 데이터를 Object형태로 반환한다.
(로딩상태, 데이터는 중복되지 않도록 이름을 정해주는 것이 좋다.)
useQuery의 데이터는 미리 인터페이스로 정의하여 <>안에 넣어준다.
useQuery에 넣는 파라미터는 첫번째: 고유key값, 두번째: fetch할 함수

```tsx
// Coin.tsx
import { useQuery } from 'react-query';
import { fetchCoinInfo, fetchCoinTickers } from '../api';
...
function Coin(){
    ...
    const {isLoading: infoLoading, data: infoData} = useQuery<IInfoData>(["info",coinId], () => fetchCoinInfo(coinId));
    const {isLoading: tickersLoading, data: tickersData} = useQuery<ITickersData>(["tickers",coinId], () => fetchCoinTickers(coinId));

    const loading = infoLoading || tickersLoading;
    ...
}
```

### 5. react-helmet

자식 컴포넌트들에서 index.html의 header에 접근할 때 사용한다.

#### 1) 설치

```powershell
npm install @types/react-helmet
```

#### 2) 사용

자식컴포넌트에 helmet을 import한다.
return 함수 안에 Helmet 컴포넌트를 사용하고 그 안에 header태그 안의 내용을 작성한다.

```tsx
// Coins.tsx
import { Helmet } from "react-helmet";
...

function Coins() {
  ...
  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
    ...
    </Container>
  );
}

export default Coins;
```

### 6. recoil

글로벌로 스테이트를 관리하는 컴포넌트이다.
최상단 컴포넌트부터 최하단 컴포넌트까지 변수를 전달할 때 props를 보내는 것이 번거로워,
recoil을 사용하여 글로벌 변수로 선언하고 각 컴포넌트에서 접근이 가능하다.

#### 1) 설치

```powershell
npm install recoil
```

#### 2) 사용

- _index.tsx_ 에서 RecoilRoot 컴포넌트로 감싸준다.

```tsx
// index.tsx
import { RecoilRoot } from "recoil";
...

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      ...
        <App />
      ...
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root");
);

```

- 변수 선언
  _atoms.ts_ 파일을 만들어 글로벌로 사용할 변수들을 정의한다.

```ts
// atoms.ts
import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: true,
});
```

- 컴포넌트에서 변수 사용

recoil, atoms.tsx 를 import한다.
useRecoilValue를 이용하여 글로벌 변수를 가져온다.

```tsx
// App.tsx
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";
...

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
}

export default App;
```

- 컴포넌트에서 변수 변경

recoil과 atoms.tsx 를 import한다.
useSetRecoiState 함수를 이용하여 글로벌 변수를 변경해주는 함수를 가져온다.

```tsx
// Coins.tsx
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";
...

function Coins() {
  const setIsDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleIsDarkAtom = () => setIsDarkAtom((prev) => !prev);
  ...
  return (
    <Container>
      <Header>
        <Title>코인</Title>
        <button onClick={toggleIsDarkAtom}>Toggle Mode</button>
      </Header>
      ...
    </Container>
  );
}

export default Coins;
```
