import docs from './PrivacyConditions'
import MDBox from 'components/MDBox'
import '../App.css'
export default function Privacy() {
     return (
          <MDBox sx={{ m: 10 }} >
               <div dangerouslySetInnerHTML={{ __html: docs.Policy }} />;
          </MDBox>
     )
}