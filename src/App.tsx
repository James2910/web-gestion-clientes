import styles from '../src/theme/globalStyles.module.css'
import { RouteApp } from './route/RouteApp';

function App() {
  return (
    <div className={ styles.main }>
      <RouteApp />
    </div>
  );
}

export default App;
