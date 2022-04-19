import { createGlobalStyle } from 'styled-components';
import PretendardVariable from './PretendardVariable.woff2';

const GlobalFont = createGlobalStyle`
@font-face {
  font-family: "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;";
  src: local('Pretendard'),
  url(${PretendardVariable}) format('woff');
  font-weight: 400;
  font-style: normal;
}
`;

export default GlobalFont;
