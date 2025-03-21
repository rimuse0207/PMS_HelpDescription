import Loader from './Loader/Loader';
import RouterMainPage from './Routers/RouterMainPage';

function App() {
    return (
        <div className="App">
            <RouterMainPage></RouterMainPage>
            {/* 로딩 컴포넌트 시작 */}
            <Loader loading={false}></Loader>
            {/* 로딩 컴포넌트 끝 */}
        </div>
    );
}

export default App;
