// routes
import {atom} from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';

// ----------------------------------------------------------------------

export const patientIdAtom = atom("")
export const patientOriginalIdAtom = atom("")
// export const patientIdAtom = atomWithStorage("user","")
export const loginData = atom({id:'',token:'',userType:''})

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
    </ThemeProvider>
  );
}
