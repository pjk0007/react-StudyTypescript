// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    name:string;
    textColor: string;
    boxColor:string,
    bgColor: string;
    accentColor: string;
  }
}